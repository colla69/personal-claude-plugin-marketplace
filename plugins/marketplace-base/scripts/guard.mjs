#!/usr/bin/env node
// The one rule for development work: the build and the tests stay green. When Claude is
// about to stop, `check` finds the files this session changed, and when they matter it
// runs the project's check command from the project's root. A failure keeps Claude
// working, with the output to fix it from.
//
//   start  SessionStart. Notes which files were already changed, and how, so a project
//          with uncommitted work is not blamed for it.
//   mark   After a write or an edit tool. Notes that file. A change made through the
//          shell is not seen here; `check` finds it by comparing with the start.
//   check  Stop. Runs the command when a changed file matches `STEWARD_CHECK_PATHS`,
//          or when any file changed and the project sets no paths.
//
// The command is the project's `STEWARD_CHECK`, in `env` of `.claude/settings.json` or
// of the local file over it. `STEWARD_CHECK_PATHS` there is a comma-separated list of
// globs, relative to the project's root: `frontend/**,infra/**`. A project without a
// command is never checked.

import { execSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, statSync } from 'node:fs'
import { join, relative, isAbsolute } from 'node:path'
import { readInput, readJson, writeJson, dataDir, insideCollector, projectSettings, projectDir, withLock } from './lib.mjs'

if (insideCollector()) process.exit(0)

// After this many failures in a row Claude is let go, with a word to the person, so a
// check that cannot pass never traps a session.
const MAX_TRIES = 3
const TIMEOUT_MS = 540_000
const OUTPUT_LINES = 60
// A session's state is forgotten after a day, so the file never grows without end.
const STALE_MS = 24 * 60 * 60 * 1000
// Beyond this many changed files, or this size of one, a comparison costs more than it
// is worth: the tool marks stand alone.
const MAX_FILES = 2000
const MAX_BYTES = 5 * 1024 * 1024

const mode = process.argv[2]
const input = readInput()
const root = projectDir(input)
const session = input.session_id || root
const statePath = join(dataDir(), 'guard.json')
const settings = projectSettings(root).env

const globToRegExp = (glob) =>
  new RegExp(
    `^${glob
      .split('**')
      .map((part) => part.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*').replace(/\?/g, '[^/]'))
      .join('.*')}$`,
  )

const paths = (settings.STEWARD_CHECK_PATHS || process.env.STEWARD_CHECK_PATHS || '')
  .split(',')
  .map((glob) => glob.trim())
  .filter(Boolean)
  .map(globToRegExp)

// Reads, changes and writes the state under its lock, since sessions run side by side.
const update = (change) =>
  withLock(statePath, () => {
    const state = readJson(statePath, {})
    for (const [key, value] of Object.entries(state)) {
      if (Date.now() - (value.at ?? 0) > STALE_MS) delete state[key]
    }
    const next = change(state[session] ?? { marks: [], base: null, fails: 0 })
    if (next) state[session] = { ...next, at: Date.now() }
    else delete state[session]
    writeJson(statePath, state)
  })

// Every file git sees as changed, with a hash of its content, or null when the project
// is not a git repository. A file git has stopped listing is a file back at its
// committed state, and it is compared as such.
function fingerprint() {
  const top = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8' })
  if (top.status !== 0) return null
  const status = spawnSync('git', ['status', '--porcelain=v1', '-z', '--untracked-files=all'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
  if (status.status !== 0) return null
  const entries = status.stdout.split('\0').filter(Boolean)
  const found = []
  for (let i = 0; i < entries.length; i++) {
    found.push(entries[i].slice(3))
    // A rename lists the old path after the new one.
    if (entries[i][0] === 'R' || entries[i][0] === 'C') i++
  }
  if (found.length > MAX_FILES) return null
  const map = {}
  for (const path of found) {
    const absolute = join(top.stdout.trim(), path)
    const inside = relative(root, absolute)
    if (inside.startsWith('..') || isAbsolute(inside)) continue
    try {
      const size = statSync(absolute).size
      map[inside] = size > MAX_BYTES ? `big:${size}` : createHash('sha1').update(readFileSync(absolute)).digest('hex')
    } catch {
      map[inside] = 'gone'
    }
  }
  return map
}

if (mode === 'start') {
  // A session that goes on after a compaction keeps the start it already has.
  const base = fingerprint()
  update((current) => (current.base || current.marks.length > 0 ? current : { ...current, base }))
  process.exit(0)
}

if (mode === 'mark') {
  const file = input.tool_input?.file_path || input.tool_input?.notebook_path
  if (!file) process.exit(0)
  const inside = relative(root, isAbsolute(file) ? file : join(root, file))
  if (inside.startsWith('..')) process.exit(0)
  update((current) => ({ ...current, marks: [...new Set([...current.marks, inside])] }))
  process.exit(0)
}

if (mode !== 'check') process.exit(0)

const command = settings.STEWARD_CHECK || process.env.STEWARD_CHECK
if (!command) process.exit(0)

const current = readJson(statePath, {})[session]
if (!current) {
  // The start never ran here, such as in a session that began before the plugin was
  // installed: this is the earliest state the session can be compared with.
  update((fresh) => ({ ...fresh, base: fingerprint() }))
  process.exit(0)
}

const now = fingerprint()
const changed = new Set(current.marks)
if (now && current.base) {
  for (const [path, hash] of Object.entries(now)) if (current.base[path] !== hash) changed.add(path)
  for (const path of Object.keys(current.base)) if (!(path in now)) changed.add(path)
}
const matters = [...changed].filter((path) => paths.length === 0 || paths.some((glob) => glob.test(path)))
if (matters.length === 0) process.exit(0)

let output = ''
let passed = true
try {
  execSync(command, { cwd: root, stdio: 'pipe', timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 })
} catch (error) {
  passed = false
  output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim() || String(error.message)
}

// What is changed now is the new start: it has been checked, or Claude is let go of it.
const settled = () => ({ marks: [], base: now ?? current.base, fails: 0 })

if (passed) {
  update(settled)
  process.exit(0)
}

const fails = (current.fails ?? 0) + 1
if (fails >= MAX_TRIES) {
  update(settled)
  console.log(
    JSON.stringify({
      systemMessage: `\`${command}\` still fails after ${MAX_TRIES} tries. The build or the tests are broken; look before you go on.`,
    }),
  )
  process.exit(0)
}

update((latest) => ({ ...latest, fails }))
const tail = output.split('\n').slice(-OUTPUT_LINES).join('\n')
process.stderr.write(
  `The build or the tests fail after your changes: \`${command}\` exited with an error. Fix the cause, not the test, then finish. The last lines:\n\n${tail}\n`,
)
process.exit(2)
