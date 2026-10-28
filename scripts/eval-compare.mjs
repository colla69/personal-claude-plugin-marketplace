#!/usr/bin/env node
// Compares two eval results, case by case, and says whether a difference is more
// than noise. Both the terminal table of eval-skill.mjs and a PR comment come from
// here, so the same number means the same thing in both.
//
//   node scripts/eval-compare.mjs <before> <after> [--floor 0.2]
//
// A file is either the JSON that `claude plugin eval --json` writes or a line
// from measurements/results.jsonl (a path with `:<n>` takes line n; the last line
// is the default). The scores to compare are the per-run scores of the arm with
// the plugin. A case is "beyond noise" when the difference is larger than the floor
// and the 90% bootstrap interval of the difference leaves out zero. The floor comes
// from --floor, else from measurements/noise.json, else it is zero.

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { summarize } from './eval-summary.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const RESAMPLES = 500

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN)

// A seeded generator, so the same two files give the same table every time.
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const resample = (xs, next) => xs.map(() => xs[Math.floor(next() * xs.length)])

// 90% percentile interval of mean(b) - mean(a), resampling each side on its own.
export function interval(a, b, seed = 1) {
  if (!a.length || !b.length) return [NaN, NaN]
  const next = rng(seed)
  const diffs = []
  for (let i = 0; i < RESAMPLES; i++) diffs.push(mean(resample(b, next)) - mean(resample(a, next)))
  diffs.sort((x, y) => x - y)
  return [diffs[Math.floor(0.05 * RESAMPLES)], diffs[Math.ceil(0.95 * RESAMPLES) - 1]]
}

// Accepts a result file, a summary line, or a path into results.jsonl.
export function load(spec) {
  const m = /^(.*\.jsonl):(\d+)$/.exec(spec)
  const path = m ? m[1] : spec
  const text = readFileSync(path, 'utf8')
  if (path.endsWith('.jsonl')) {
    const lines = text.split('\n').filter(Boolean)
    const line = lines[m ? Number(m[2]) - 1 : lines.length - 1]
    if (!line) throw new Error(`${spec}: no such line`)
    return JSON.parse(line)
  }
  const data = JSON.parse(text)
  return data.cases?.[0]?.arms ? summarize(data) : data
}

export function floorFor(line) {
  const file = join(root, 'measurements', 'noise.json')
  if (!existsSync(file)) return 0
  const noise = JSON.parse(readFileSync(file, 'utf8'))
  return noise[`${line.suite}|${line.model}|${line.claudeVersion}`] ?? 0
}

export function compare(before, after, floor = floorFor(after)) {
  const names = [...new Set([...before.cases.map((c) => c.name), ...after.cases.map((c) => c.name)])]
  const rows = names.map((name) => {
    const a = before.cases.find((c) => c.name === name)
    const b = after.cases.find((c) => c.name === name)
    if (!a || !b) return { name, verdict: a ? 'removed' : 'added' }
    const diff = mean(b.with) - mean(a.with)
    const [lo, hi] = interval(a.with, b.with)
    const beyond = Math.abs(diff) > floor && (lo > 0 || hi < 0)
    return {
      name,
      before: mean(a.with),
      after: mean(b.with),
      diff,
      lo,
      hi,
      verdict: beyond ? (diff > 0 ? 'better' : 'worse') : 'within noise',
    }
  })
  const comparable = ['suite', 'model', 'judgeModel', 'claudeVersion'].filter((k) => before[k] !== after[k])
  return { rows, floor, mismatched: comparable }
}

const f2 = (n) => (Number.isFinite(n) ? n.toFixed(2) : '-')
const sign = (n) => (Number.isFinite(n) ? (n > 0 ? '+' : '') + n.toFixed(2) : '-')

export function table({ rows, floor, mismatched }) {
  const out = []
  if (mismatched.length) out.push(`Not comparable: ${mismatched.join(', ')} differ between the two results.`)
  out.push(`Floor: ${f2(floor)}${floor ? '' : ' (none measured)'}`)
  out.push('', '| Case | Before | After | Diff | 90% interval | Verdict |', '|---|---|---|---|---|---|')
  for (const r of rows) {
    out.push(
      r.before === undefined
        ? `| ${r.name} | | | | | ${r.verdict} |`
        : `| ${r.name} | ${f2(r.before)} | ${f2(r.after)} | ${sign(r.diff)} | ${sign(r.lo)} to ${sign(r.hi)} | ${r.verdict} |`,
    )
  }
  const differing = rows.filter((r) => r.verdict !== 'within noise').length
  out.push('', `${differing} of ${rows.length} cases differ beyond noise.`)
  return out.join('\n')
}

function main(argv) {
  const files = []
  let floor
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--floor') floor = Number(argv[++i])
    else files.push(argv[i])
  }
  if (files.length !== 2) {
    console.error('usage: eval-compare.mjs <before> <after> [--floor n]')
    process.exit(2)
  }
  const after = load(files[1])
  console.log(table(compare(load(files[0]), after, floor ?? floorFor(after))))
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2))
