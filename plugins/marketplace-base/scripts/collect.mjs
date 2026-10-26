#!/usr/bin/env node
// Collects the corrections a person made in a session and files them as one issue on
// the marketplace, for the curators. It reads only the conversation: what the person
// wrote and what Claude answered, never a tool's output, so files and command results
// never leave the machine. A project, or a person in their local settings, turns it off
// with `"STEWARD_COLLECT": "off"` under `env`.
//
//   end       SessionEnd. Starts `run` in the background and returns at once, because
//             a session-end hook has about a second and a half.
//   catch-up  SessionStart, async. Starts `sweep` for sessions that ended without
//             their hook: a killed terminal, a crash.
//   run       Collects one transcript.
//   sweep     Collects up to a few uncollected transcripts of this project, and retries
//             the issues that could not be filed.

import { spawn, spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, unlinkSync, renameSync, rmSync, openSync, closeSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { readInput, readJson, writeJson, dataDir, insideCollector, marketplace, projectSettings, projectDir, withLock } from './lib.mjs'

const SELF = fileURLToPath(import.meta.url)
const SWEEP_LIMIT = 5
// A transcript the model couldn't answer for is tried this many times, then given up.
const MAX_ATTEMPTS = 3
const QUIET_MS = 30 * 60 * 1000
const PERSON_CHARS = 3000
const CLAUDE_CHARS = 1500
const CONVERSATION_CHARS = 80_000

const donePath = () => join(dataDir(), 'collected.json')
const pendingDir = () => join(dataDir(), 'pending')

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

function conversation(transcript) {
  const turns = []
  for (const line of readFileSync(transcript, 'utf8').split('\n')) {
    let entry
    try {
      entry = JSON.parse(line)
    } catch {
      continue
    }
    // A compact summary is Claude Code's digest of the session so far, files included.
    if (entry.isMeta || entry.isSidechain || entry.isCompactSummary) continue
    const content = entry.message?.content
    if (entry.type === 'user' && typeof content === 'string') {
      const text = content.replace(ADDED, '').trim()
      if (text) turns.push(`PERSON: ${clip(text, PERSON_CHARS)}`)
    } else if (entry.type === 'assistant' && Array.isArray(content)) {
      const text = content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n')
        .trim()
      if (text) turns.push(`CLAUDE: ${clip(text, CLAUDE_CHARS)}`)
    }
  }
  let joined = turns.join('\n\n')
  if (joined.length > CONVERSATION_CHARS) joined = joined.slice(-CONVERSATION_CHARS)
  return { text: joined, personTurns: turns.filter((t) => t.startsWith('PERSON:')).length }
}

const PROMPT = `Below is a conversation between a person and Claude, an AI assistant, at work.
Find the corrections: the moments the person told Claude it did something the wrong way
and said how it should be done, where the right way is a standard or a habit of how
this person or their team works. Examples: a naming rule, a template, a tone, a way to
structure a document, a tool to use instead of another.

A change to the task itself is not a correction ("make it blue", "add a column"), and
neither is a bug Claude fixed when asked. When unsure, leave it out.

Write no names of people, companies, customers or products, and no secrets: use
placeholders such as <person>, <company> and <token>.

Answer with JSON only, in this shape, and with {"corrections": []} when there are none:
{"corrections": [{"topic": "<two to five words>", "claude_did": "<one sentence>",
"person_wants": "<one sentence>", "quote": "<the person's words, at most 200 characters>"}]}

The conversation:

`

function ask(text) {
  // No tools, no MCP servers, and none of the person's CLAUDE.md, plugins or hooks: the
  // model only reads, and the conversation can't make it do anything.
  const args = ['-p', '--model', 'haiku', '--no-session-persistence', '--safe-mode', '--tools', '', '--strict-mcp-config', '--output-format', 'text']
  const result = spawnSync('claude', args, {
    input: PROMPT + text,
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

function issueBody(corrections) {
  const parts = corrections.map((c) =>
    [`### ${c.topic}`, '', `- **Claude did:** ${c.claude_did}`, `- **The person wants:** ${c.person_wants}`, `- **In their words:** "${c.quote}"`].join('\n'),
  )
  return [
    'Corrections a person made in one session, collected by `marketplace-base`. Each may be a standard the marketplace lacks or one a skill gets wrong; each may also be one person\'s taste. The curators decide.',
    ...parts,
  ].join('\n\n')
}

// Files one pending issue, once: the run that renames the file first owns it, so a
// session's end and the next session's catch-up never file it twice.
function file(pendingFile) {
  const market = marketplace()
  if (!market?.repo || !existsSync(pendingFile)) return
  const claimed = `${pendingFile}.${process.pid}`
  try {
    renameSync(pendingFile, claimed)
  } catch {
    return
  }
  const { title, body } = readJson(claimed, {})
  if (!title || !body) return unlinkSync(claimed)
  const bodyFile = join(tmpdir(), `marketplace-base-${basename(pendingFile, '.json')}-${process.pid}.md`)
  writeFileSync(bodyFile, body)
  const result = spawnSync('gh', ['issue', 'create', '--repo', market.repo, '--title', title, '--body-file', bodyFile], {
    encoding: 'utf8',
    timeout: 60_000,
  })
  rmSync(bodyFile, { force: true })
  if (result.status === 0) rmSync(claimed, { force: true })
  else renameSync(claimed, pendingFile)
}

// The record, per transcript folder: when collecting began there, and what it has
// collected. Sessions older than the start are never collected, so installing the plugin
// never files a backlog.
function record(dir) {
  const all = readJson(donePath(), {})
  return { all, entry: all[dir] ?? { since: Date.now(), done: [] } }
}

// Changes one folder's record under the record's lock, since runs go side by side.
function changeRecord(dir, change) {
  withLock(donePath(), () => {
    const { all, entry } = record(dir)
    all[dir] = change(entry)
    writeJson(donePath(), all)
  })
}

function markDone(transcript) {
  const name = basename(transcript)
  changeRecord(dirname(transcript), (entry) => {
    const { [name]: _, ...attempts } = entry.attempts ?? {}
    return { ...entry, done: [...new Set([...entry.done, name])], attempts }
  })
}

// Counts a failed attempt, and gives the transcript up after the last one.
function markFailed(transcript) {
  const name = basename(transcript)
  const tries = (record(dirname(transcript)).entry.attempts?.[name] ?? 0) + 1
  if (tries >= MAX_ATTEMPTS) return markDone(transcript)
  changeRecord(dirname(transcript), (entry) => ({ ...entry, attempts: { ...(entry.attempts ?? {}), [name]: tries } }))
}

// Collects one transcript, under a lock so a session's end and the next session's
// catch-up never collect it twice.
function collect(transcript) {
  const id = basename(transcript, '.jsonl')
  const locks = join(dataDir(), 'locks')
  mkdirSync(locks, { recursive: true })
  const lock = join(locks, id)
  // A lock older than an hour is from a run that died.
  if (existsSync(lock) && Date.now() - statSync(lock).mtimeMs > 60 * 60 * 1000) unlinkSync(lock)
  try {
    closeSync(openSync(lock, 'wx'))
  } catch {
    return
  }
  try {
    if (record(dirname(transcript)).entry.done.includes(basename(transcript))) return
    const { text, personTurns } = conversation(transcript)
    // A session of one or two messages has no correction worth a model call.
    if (personTurns < 2) return markDone(transcript)
    const corrections = ask(text)
    if (corrections === null) return markFailed(transcript)
    if (corrections.length > 0) {
      const topics = corrections.map((c) => c.topic).join(', ')
      mkdirSync(pendingDir(), { recursive: true })
      const pendingFile = join(pendingDir(), `${id}.json`)
      writeJson(pendingFile, { title: clip(`Corrections: ${topics}`, 120), body: issueBody(corrections) })
      file(pendingFile)
    }
    markDone(transcript)
  } finally {
    rmSync(lock, { force: true })
  }
}

function sweep(dir, current) {
  if (existsSync(pendingDir())) {
    for (const name of readdirSync(pendingDir()).filter((n) => n.endsWith('.json'))) file(join(pendingDir(), name))
  }
  if (!dir || !existsSync(dir)) return
  const { all, entry } = record(dir)
  if (!all[dir]) return changeRecord(dir, (fresh) => fresh)
  const now = Date.now()
  const waiting = readdirSync(dir)
    .filter((name) => name.endsWith('.jsonl') && name !== `${current}.jsonl` && !entry.done.includes(name))
    .filter((name) => {
      const changed = statSync(join(dir, name)).mtimeMs
      return changed > entry.since && now - changed > QUIET_MS
    })
    .slice(0, SWEEP_LIMIT)
  for (const name of waiting) collect(join(dir, name))
}

const [mode, ...args] = process.argv.slice(2)

if (mode === 'end' || mode === 'catch-up') {
  if (insideCollector()) process.exit(0)
  const input = readInput()
  const off = (process.env.STEWARD_COLLECT || projectSettings(projectDir(input)).env.STEWARD_COLLECT) === 'off'
  if (off || !input.transcript_path) process.exit(0)
  if (mode === 'end') background('run', input.transcript_path)
  else background('sweep', dirname(input.transcript_path), input.session_id ?? '')
} else if (mode === 'run' && args[0]) {
  collect(args[0])
} else if (mode === 'sweep') {
  sweep(args[0], args[1])
}
