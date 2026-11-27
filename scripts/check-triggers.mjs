#!/usr/bin/env node
// The trigger check: does each skill load on the prompts it is for, and stay quiet on
// the ones it isn't? A description costs tokens in every session, and a skill that
// never fires is that cost for nothing. A lift run can't tell: in it, the plugin under
// test is the only one loaded. Here every skill plugin is loaded at once, so the
// descriptions compete the way they do in a real session.
//
//   node scripts/check-triggers.mjs               every plugin's prompts, 5 runs each
//   node scripts/check-triggers.mjs <plugin>...   only these plugins' prompts; the
//                                                 others still load and compete
//
//   --runs <n>      runs per prompt (default 5). A prompt passes when 4 in 5 are right
//   --model <m>     the session model (default opus, the one the maintainer works with)
//   -j <n>          runs at once (default 4)
//   --list          print the prompts and exit, at no cost
//
// The prompts are in evals/<plugin>/triggers.json:
//
//   { "<skill>": { "fire": ["a prompt it must load on"], "quiet": ["one it must not"] } }
//
// A "quiet" prompt is one that sits near the skill, so a loose description would win
// it. Each run is one turn with only the Skill tool allowed, in an empty folder, with no
// user or local settings: it sees which skill the model reaches for first, and it can
// change nothing. marketplace-base is never loaded, because its hooks run in every
// session and its collector could file an issue from a run.
//
// Exits 1 when any prompt fails. A full run costs about $49, so it runs by hand, not in CI.

import { readFileSync, existsSync, readdirSync, mkdtempSync, mkdirSync, cpSync, rmSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'marketplace-base'
// A skill that loads in 3 of 5 runs is luck, not a trigger.
const PASS = 0.8
const BLOCKED = ['Bash', 'Read', 'Write', 'Edit', 'NotebookEdit', 'Glob', 'Grep', 'Agent', 'WebFetch', 'WebSearch']

const args = { plugins: [], runs: 5, model: 'opus', jobs: 4, list: false }
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--runs') args.runs = Number(argv[++i])
  else if (a === '--model') args.model = argv[++i]
  else if (a === '-j') args.jobs = Number(argv[++i])
  else if (a === '--list') args.list = true
  else if (a.startsWith('-')) usage(`unknown flag ${a}`)
  else args.plugins.push(a)
}

function usage(why) {
  if (why) console.error(why)
  console.error('usage: check-triggers.mjs [plugin...] [--runs n] [--model m] [-j n] [--list]')
  process.exit(2)
}

const all = readdirSync(join(root, 'plugins')).filter((p) => p !== BASE && existsSync(join(root, 'plugins', p, 'skills')))
for (const p of args.plugins) if (!all.includes(p)) usage(`no plugin ${p} with skills`)
const tested = args.plugins.length ? args.plugins : all

// One entry per prompt: which skill, whether it must fire, and the text.
const prompts = []
const missing = []
for (const plugin of tested) {
  const file = join(root, 'evals', plugin, 'triggers.json')
  const skills = readdirSync(join(root, 'plugins', plugin, 'skills'))
  if (!existsSync(file)) { missing.push(...skills.map((s) => `${plugin}:${s}`)); continue }
  const spec = JSON.parse(readFileSync(file, 'utf8'))
  for (const skill of skills) {
    const s = spec[skill]
    if (!s?.fire?.length || !s?.quiet?.length) { missing.push(`${plugin}:${skill}`); continue }
    for (const text of s.fire) prompts.push({ skill: `${plugin}:${skill}`, fire: true, text })
    for (const text of s.quiet) prompts.push({ skill: `${plugin}:${skill}`, fire: false, text })
  }
  for (const name of Object.keys(spec)) if (!skills.includes(name)) usage(`evals/${plugin}/triggers.json names ${name}, which is not a skill of ${plugin}`)
}

if (args.list) {
  for (const p of prompts) console.log(`${p.fire ? 'fire ' : 'quiet'}  ${p.skill}  ${p.text}`)
  process.exit(0)
}

// Copies of every plugin with their dependencies dropped: a plugin whose dependency
// isn't loaded doesn't load at all, and the one dependency left out is the base.
const stage = mkdtempSync(join(tmpdir(), 'triggers-'))
const empty = join(stage, 'project')
mkdirSync(empty)
const dirs = all.map((p) => {
  const copy = join(stage, 'plugins', p)
  cpSync(join(root, 'plugins', p), copy, { recursive: true })
  const manifest = join(copy, '.claude-plugin', 'plugin.json')
  const { dependencies: _, ...own } = JSON.parse(readFileSync(manifest, 'utf8'))
  writeFileSync(manifest, JSON.stringify(own, null, 2))
  return copy
})
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { rmSync(stage, { recursive: true, force: true }); process.exit(130) })

// One run: the skills the model called on its first turn, and what it cost.
function run(text) {
  return new Promise((done) => {
    const cmd = [
      '-p', text, '--model', args.model, '--max-turns', '1',
      '--output-format', 'stream-json', '--verbose',
      '--setting-sources', 'project', '--no-session-persistence', '--strict-mcp-config',
      '--allowedTools', 'Skill', '--disallowedTools', ...BLOCKED,
      ...dirs.flatMap((d) => ['--plugin-dir', d]),
    ]
    const child = spawn('claude', cmd, { cwd: empty, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { err += d })
    child.on('close', () => {
      const called = []
      let cost = 0
      let ok = false
      for (const line of out.split('\n')) {
        let j
        try { j = JSON.parse(line) } catch { continue }
        if (j.type === 'assistant') {
          for (const c of j.message?.content ?? []) if (c.type === 'tool_use' && c.name === 'Skill') called.push(c.input?.skill)
        }
        if (j.type === 'result') { cost = j.total_cost_usd ?? 0; ok = true }
      }
      done({ called, cost, error: ok ? null : (err.trim().split('\n').pop() || 'no result') })
    })
  })
}

const jobs = prompts.flatMap((p, i) => Array.from({ length: args.runs }, () => i))
const results = prompts.map(() => [])
let cost = 0
let next = 0
async function worker() {
  while (next < jobs.length) {
    const i = jobs[next++]
    const r = await run(prompts[i].text)
    cost += r.cost
    results[i].push(r)
    process.stderr.write('.')
  }
}

try {
  await Promise.all(Array.from({ length: Math.min(args.jobs, jobs.length) }, worker))
} finally {
  rmSync(stage, { recursive: true, force: true })
}
process.stderr.write('\n')

// A skill counts as called under its full name or its bare one.
const matches = (called, skill) => called.some((c) => c === skill || c === skill.split(':')[1])
let failed = 0
let broken = 0
const rows = ['| Skill | Should | Right | Prompt | Loaded instead |', '|---|---|---|---|---|']
prompts.forEach((p, i) => {
  const runs = results[i].filter((r) => !r.error)
  broken += results[i].length - runs.length
  const right = runs.filter((r) => matches(r.called, p.skill) === p.fire).length
  // Judged on the runs that ended, but never on fewer than the bar itself: an outage
  // that leaves 2 of 5 runs must not pass a prompt.
  const pass = runs.length >= Math.ceil(args.runs * PASS) && right >= Math.ceil(runs.length * PASS)
  if (!pass) failed++
  const others = [...new Set(runs.flatMap((r) => r.called).filter((c) => c && !matches([c], p.skill)))]
  rows.push(`| ${p.skill} | ${p.fire ? 'fire' : 'quiet'} | ${pass ? '' : '**'}${right}/${runs.length}${pass ? '' : '**'} | ${p.text.replace(/\s+/g, ' ').replace(/\|/g, '\\|')} | ${others.join(', ') || '-'} |`)
})

console.log(`## Trigger check (${args.runs} runs per prompt, ${args.model}, $${cost.toFixed(2)})\n`)
console.log(rows.join('\n'))
console.log(`\n${prompts.length - failed} of ${prompts.length} prompts pass. A prompt passes when ${PASS * 100}% of its runs are right.`)
if (broken) console.log(`${broken} runs ended without a result and were not counted.`)
if (missing.length) console.log(`\nNo fire and quiet prompts for: ${missing.join(', ')}. Add them to evals/<plugin>/triggers.json.`)
process.exit(failed || missing.length ? 1 : 0)
