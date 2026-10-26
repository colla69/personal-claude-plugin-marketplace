#!/usr/bin/env node
// Collects the corrections a person made in sessions and files them as one issue on the
// marketplace, for the curators. It reads only the conversation: what the person wrote
// and what Claude answered, never a tool's output, so files and command results never
// leave the machine. A project, or a person in their local settings, turns it off with
// `"STEWARD_COLLECT": "off"` under `env`.
//
// Nobody ends a session properly, so nothing here waits for an end. While a session
// runs, a small model keeps a list of possible corrections; the next session start
// turns the lists into an issue.
//
//   note   Stop, async. Starts `run` in the background when the last pass is old enough,
//          and returns at once.
//   run    Reads what a session added since the last pass, and adds the corrections the
//          model finds to that session's list.
//   file   SessionStart, async. Starts `list` in the background.
//   list   Finishes the unread end of this project's earlier sessions, then files their
//          lists as one issue.

import { spawn, spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, unlinkSync, rmSync, openSync, closeSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { readInput, readJson, writeJson, dataDir, insideCollector, marketplace, projectSettings, projectDir, withLock } from './lib.mjs'

const SELF = fileURLToPath(import.meta.url)
// A pass costs a model call, so a session gets one at most this often.
const INTERVAL_MS = 10 * 60 * 1000
// A session whose transcript changed this recently is still running, and its list is
// not finished.
const QUIET_MS = 2 * 60 * 1000
// A session's state is forgotten this long after its last pass, once its list is empty.
const KEEP_MS = 30 * 24 * 60 * 60 * 1000
// Earlier turns the model sees beside the new ones, so a short reply such as "no, the
// other way" has something to refer to.
const CONTEXT_TURNS = 4
const PERSON_CHARS = 3000
const CLAUDE_CHARS = 1500
const CONVERSATION_CHARS = 80_000

const notesDir = () => join(dataDir(), 'notes')
const notePath = (id) => join(notesDir(), `${id}.json`)

function background(...args) {
  const child = spawn(process.execPath, [SELF, ...args], {
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, STEWARD_COLLECTOR: '1' },
  })
  child.unref()
}

// Wrappers Claude Code puts around what it adds to a turn, which the person never wrote:
// reminders, command output, a background task's result, and a `!` shell command with
// its output.
const ADDED =
  /<(system-reminder|command-[a-z-]+|local-command-[a-z-]+|user-prompt-submit-hook|task-notification|bash-input|bash-stdout|bash-stderr)>[\s\S]*?<\/\1>/g

const clip = (text, max) => (text.length > max ? `${text.slice(0, max)} […]` : text)

// The turns of a transcript from line `from` on, and the few before them. The last line
// is never counted: it is empty, or still being written, and the next pass reads it.
function conversation(transcript, from) {
  const lines = readFileSync(transcript, 'utf8').split('\n')
  lines.pop()
  const turns = []
  lines.forEach((line, index) => {
    let entry
    try {
      entry = JSON.parse(line)
    } catch {
      return
    }
    // A compact summary is Claude Code's digest of the session so far, files included.
    if (entry.isMeta || entry.isSidechain || entry.isCompactSummary) return
    const content = entry.message?.content
    if (entry.type === 'user' && typeof content === 'string') {
      const text = content.replace(ADDED, '').trim()
      if (text) turns.push({ index, person: true, text: `PERSON: ${clip(text, PERSON_CHARS)}` })
    } else if (entry.type === 'assistant' && Array.isArray(content)) {
      const text = content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n')
        .trim()
      if (text) turns.push({ index, person: false, text: `CLAUDE: ${clip(text, CLAUDE_CHARS)}` })
    }
  })
  const fresh = turns.filter((turn) => turn.index >= from)
  const join2 = (list) => list.map((turn) => turn.text).join('\n\n')
  let text = join2(fresh)
  if (text.length > CONVERSATION_CHARS) text = text.slice(-CONVERSATION_CHARS)
  return {
    context: join2(turns.filter((turn) => turn.index < from).slice(-CONTEXT_TURNS)),
    text,
    personTurns: fresh.filter((turn) => turn.person).length,
    lines: lines.length,
  }
}

const PROMPT = `Below is part of a conversation between a person and Claude, an AI assistant, at
work. Find the possible corrections and problems in the NEW part: the moments the
person told Claude it did something the wrong way, or was unhappy with how it went,
where the right way could be a standard or a habit of how this person or their team
works. Examples: a naming rule, a template, a tone, a way to structure a document, a
tool to use instead of another. The CONTEXT part only explains the new part: list
nothing from it.

A change to the task itself is not a correction ("make it blue", "add a column"), and
neither is a bug Claude fixed when asked. The curators decide what a standard is, so
list what might be one; leave out what is plainly only about this task.

Write no names of people, companies, customers or products, and no secrets: use
placeholders such as <person>, <company> and <token>.

Answer with JSON only, in this shape, and with {"corrections": []} when there are none.
When the person did not say what they wanted, write "unclear" for person_wants.
{"corrections": [{"topic": "<two to five words>", "claude_did": "<one sentence>",
"person_wants": "<one sentence>", "quote": "<the person's words, at most 200 characters>"}]}

`

function ask(context, text) {
  // No tools, no MCP servers, and none of the person's CLAUDE.md, plugins or hooks: the
  // model only reads, and the conversation can't make it do anything.
  const args = ['-p', '--model', 'haiku', '--no-session-persistence', '--safe-mode', '--tools', '', '--strict-mcp-config', '--output-format', 'text']
  const result = spawnSync('claude', args, {
    input: `${PROMPT}CONTEXT:\n\n${context || '(none)'}\n\nNEW:\n\n${text}`,
    cwd: tmpdir(),
    encoding: 'utf8',
    timeout: 300_000,
    env: { ...process.env, STEWARD_COLLECTOR: '1' },
  })
  if (result.status !== 0) return null
  const json = result.stdout.match(/\{[\s\S]*\}/)?.[0]
  try {
    const corrections = JSON.parse(json).corrections
    return Array.isArray(corrections) ? corrections : null
  } catch {
    return null
  }
}

// Runs `fn` unless another run holds the lock `name`. A lock older than an hour is from
// a run that died.
function exclusive(name, fn) {
  const locks = join(dataDir(), 'locks')
  mkdirSync(locks, { recursive: true })
  const lock = join(locks, name)
  if (existsSync(lock) && Date.now() - statSync(lock).mtimeMs > 60 * 60 * 1000) unlinkSync(lock)
  try {
    closeSync(openSync(lock, 'wx'))
  } catch {
    return
  }
  try {
    return fn()
  } finally {
    rmSync(lock, { force: true })
  }
}

// One pass over what a session added since the last one. The session's state is its
// place in the transcript, the time of the last pass and its list. A session with
// nothing new, or a first look at fewer than two messages from the person, costs no
// model call and doesn't count as a pass.
function pass(id, transcript) {
  exclusive(`note-${id}`, () => {
    const state = readJson(notePath(id), { transcript, offset: 0, lastRun: 0, corrections: [] })
    const { context, text, personTurns, lines } = conversation(transcript, state.offset)
    if (personTurns === 0 || (state.offset === 0 && personTurns < 2)) return
    const found = ask(context, text)
    // A failed call leaves the place where it was, so the next pass reads it again.
    const next = found === null ? { ...state, lastRun: Date.now() } : { ...state, transcript, offset: lines, lastRun: Date.now(), corrections: [...state.corrections, ...found] }
    writeJson(notePath(id), next)
  })
}

function issueBody(corrections) {
  const parts = corrections.map((c) =>
    [`### ${c.topic}`, '', `- **Claude did:** ${c.claude_did}`, `- **The person wants:** ${c.person_wants}`, `- **In their words:** "${c.quote}"`].join('\n'),
  )
  return [
    'Possible corrections people made in their sessions, collected by `marketplace-base`. Each may be a standard the marketplace lacks or one a skill gets wrong; each may also be one person\'s taste, or only about one task. The curators decide.',
    ...parts,
  ].join('\n\n')
}

// The states of this project's earlier sessions. A session still running, or the one
// that has just started, is left alone: its list is not finished.
function earlier(dir, current) {
  if (!existsSync(notesDir())) return []
  return readdirSync(notesDir())
    .filter((name) => name.endsWith('.json'))
    .map((name) => ({ id: basename(name, '.json'), state: readJson(join(notesDir(), name), {}) }))
    .filter(({ id, state }) => id !== current && state.transcript && dirname(state.transcript) === dir)
    .filter(({ state }) => !existsSync(state.transcript) || Date.now() - statSync(state.transcript).mtimeMs > QUIET_MS)
}

// Files the lists of earlier sessions as one issue, and empties them once it is filed.
// A session keeps its place after that, so one that is resumed isn't read again from
// the start. Without `gh` or a repository, the lists wait for the next start.
function fileLists(dir, current) {
  exclusive('file', () => {
    for (const { id, state } of earlier(dir, current)) {
      if (existsSync(state.transcript)) pass(id, state.transcript)
    }
    const lists = earlier(dir, current)
      .map(({ id }) => ({ id, state: readJson(notePath(id), {}) }))
      .filter(({ state }) => state.corrections?.length > 0)
    const market = marketplace()
    if (lists.length > 0 && market?.repo) {
      const corrections = lists.flatMap(({ state }) => state.corrections)
      const topics = [...new Set(corrections.map((c) => c.topic))].join(', ')
      const bodyFile = join(tmpdir(), `marketplace-base-${process.pid}.md`)
      writeFileSync(bodyFile, issueBody(corrections))
      const result = spawnSync('gh', ['issue', 'create', '--repo', market.repo, '--title', clip(`Corrections: ${topics}`, 120), '--body-file', bodyFile], {
        encoding: 'utf8',
        timeout: 60_000,
      })
      rmSync(bodyFile, { force: true })
      if (result.status === 0) {
        for (const { id, state } of lists) {
          // A pass may have added to the list while the issue was being filed.
          withLock(notePath(id), () => {
            const now = readJson(notePath(id), state)
            writeJson(notePath(id), { ...now, corrections: now.corrections.slice(state.corrections.length) })
          })
        }
      }
    }
    for (const { id, state } of earlier(dir, current)) {
      const quiet = Date.now() - (state.lastRun ?? 0) > KEEP_MS
      if (state.corrections?.length === 0 && (quiet || !existsSync(state.transcript))) rmSync(notePath(id), { force: true })
    }
  })
}

const [mode, ...args] = process.argv.slice(2)

if (mode === 'note' || mode === 'file') {
  if (insideCollector()) process.exit(0)
  const input = readInput()
  const off = (process.env.STEWARD_COLLECT || projectSettings(projectDir(input)).env.STEWARD_COLLECT) === 'off'
  if (off || !input.transcript_path || !input.session_id) process.exit(0)
  if (mode === 'note') {
    const state = readJson(notePath(input.session_id), null)
    if (!state || Date.now() - state.lastRun > INTERVAL_MS) background('run', input.transcript_path, input.session_id)
  } else {
    background('list', dirname(input.transcript_path), input.session_id)
  }
} else if (mode === 'run' && args[0] && args[1]) {
  pass(args[1], args[0])
} else if (mode === 'list' && args[0]) {
  fileLists(args[0], args[1])
}
