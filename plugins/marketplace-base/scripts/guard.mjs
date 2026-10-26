#!/usr/bin/env node
// The one rule for development work: the build and the tests stay green. `mark` runs
// after every edit and notes that this session changed something; `check` runs when
// Claude is about to stop, and when the session changed something it runs the
// project's check command from the project's root. A failure keeps Claude working,
// with the output to fix it from.
//
// The command is the project's `STEWARD_CHECK`, in `env` of `.claude/settings.json`
// or of the local file over it. A project without one is never checked.

import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { readInput, readJson, writeJson, dataDir, insideCollector, projectSettings, projectDir, withLock } from './lib.mjs'

if (insideCollector()) process.exit(0)

// After this many failures in a row Claude is let go, with a word to the person, so a
// check that cannot pass never traps a session.
const MAX_TRIES = 3
const TIMEOUT_MS = 540_000
const OUTPUT_LINES = 60
// A session's state is forgotten after a day, so the file never grows without end.
const STALE_MS = 24 * 60 * 60 * 1000

const mode = process.argv[2]
const input = readInput()
const root = projectDir(input)
const session = input.session_id || root
const statePath = join(dataDir(), 'guard.json')

// Reads, changes and writes the state under its lock, since sessions run side by side.
const update = (change) =>
  withLock(statePath, () => {
    const state = readJson(statePath, {})
    for (const [key, value] of Object.entries(state)) {
      if (Date.now() - (value.at ?? 0) > STALE_MS) delete state[key]
    }
    const next = change(state[session] ?? { dirty: false, fails: 0 })
    if (next) state[session] = { ...next, at: Date.now() }
    else delete state[session]
    writeJson(statePath, state)
  })

if (mode === 'mark') {
  update((current) => ({ ...current, dirty: true }))
  process.exit(0)
}

const current = readJson(statePath, {})[session]
if (mode !== 'check' || !current?.dirty) process.exit(0)

const command = projectSettings(root).env.STEWARD_CHECK || process.env.STEWARD_CHECK
if (!command) process.exit(0)

let output = ''
let passed = true
try {
  execSync(command, { cwd: root, stdio: 'pipe', timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 })
} catch (error) {
  passed = false
  output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim() || String(error.message)
}

if (passed) {
  update(() => null)
  process.exit(0)
}

const fails = (current.fails ?? 0) + 1
if (fails >= MAX_TRIES) {
  update(() => null)
  console.log(
    JSON.stringify({
      systemMessage: `\`${command}\` still fails after ${MAX_TRIES} tries. The build or the tests are broken; look before you go on.`,
    }),
  )
  process.exit(0)
}

update(() => ({ dirty: true, fails }))
const tail = output.split('\n').slice(-OUTPUT_LINES).join('\n')
process.stderr.write(
  `The build or the tests fail after your changes: \`${command}\` exited with an error. Fix the cause, not the test, then finish. The last lines:\n\n${tail}\n`,
)
process.exit(2)
