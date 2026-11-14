#!/usr/bin/env node
// Lists every skill with what it costs and what is known about it, and puts them in the
// order to go through them. Reads files only: no model runs, nothing is written.
//
//   node scripts/skill-audit.mjs            a table, in review order
//   node scripts/skill-audit.mjs --json     the same rows as JSON
//
// Token counts are estimates (3.7 characters per token, as in measure-setup.mjs).
//
// Review order, first group first, and by total size inside a group:
//   1 decide    measured, and the lift is not beyond noise: keep, rework or retire
//   2 measure   no cases yet: the cost is paid and the value is not known
//   3 ablate    measured, with a lift: find which part carries it (skill-slices.mjs)
//   4 cheap     no cases, and small: low stakes, measure last
//   5 rules     measured rule by rule, with no single number: verdicts.md has the reading
//   6 own       the marketplace's own plugins: judged by the work-on-the-steward route
// A skill with no cases is "measure" when its body and references pass SMALL tokens.
// The mean Δ is the last stored line of results.jsonl, else the number that starts the
// plugin's row in verdicts.md, for a suite that was run and not stored. When that row
// reads no stored line, the stored line is older than the verdict and is ignored.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SMALL = 900
const LIFT = 0.1

const tokens = (text) => Math.round(text.length / 3.7)
const read = (p) => readFileSync(p, 'utf8')
const dirs = (p) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name) : [])

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}

export function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text)
  const out = {}
  if (!m) return { meta: out, body: text }
  let key = null
  for (const line of m[1].split('\n')) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(line)
    if (kv) { key = kv[1]; out[key] = kv[2].replace(/^[>|]-?$/, '') }
    else if (key) out[key] += ` ${line.trim()}`
  }
  for (const k of Object.keys(out)) out[k] = out[k].trim()
  return { meta: out, body: text.slice(m[0].length) }
}

// Counts what a reader is told to do: list items and table rows outside code fences,
// and the tokens in code fences, which are examples.
export function shape(body) {
  let fence = false
  let rules = 0
  let code = ''
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) { fence = !fence; continue }
    if (fence) { code += `${line}\n`; continue }
    if (/^\s*([-*]|\d+\.)\s+\S/.test(line)) rules++
    else if (/^\|.*\|\s*$/.test(line) && !/^\|[\s:|-]+\|\s*$/.test(line)) rules++
  }
  return { rules, codeTokens: tokens(code) }
}

function latestResults() {
  const file = join(root, 'measurements', 'results.jsonl')
  const out = new Map()
  if (!existsSync(file)) return out
  for (const l of read(file).split('\n').filter(Boolean)) {
    const line = JSON.parse(l)
    if (!line.partial) out.set(line.suite, line)
  }
  return out
}

// The first verdict row of each plugin: whether it reads a stored line, and the number
// that starts its reading, if any. A row read rule by rule has no number. A row whose
// reading starts "Not measured" records runs that measured nothing, such as a plugin
// that failed to load, and counts as no verdict.
function verdicts() {
  const file = join(root, 'measurements', 'verdicts.md')
  const out = new Map()
  if (!existsSync(file)) return out
  for (const l of read(file).split('\n')) {
    const m = /^\|\s*`([^`]+)`\s*\|([^|]*)\|\s*([^|]*)\|/.exec(l)
    if (!m || out.has(m[1])) continue
    if (/^not measured/i.test(m[3].trim())) continue
    const n = /^([+\u2212-]?\d+(?:\.\d+)?)/.exec(m[3].trim())
    out.set(m[1], {
      stored: /line \d/.test(m[2]),
      delta: n ? Number(n[1].replace('\u2212', '-')) : null,
    })
  }
  return out
}

export function audit() {
  const results = latestResults()
  const verdict = verdicts()
  const rows = []
  for (const plugin of dirs(join(root, 'plugins'))) {
    const pdir = join(root, 'plugins', plugin)
    const shared = walk(join(pdir, 'references')).filter((p) => p.endsWith('.md'))
    for (const skill of dirs(join(pdir, 'skills'))) {
      const sdir = join(pdir, 'skills', skill)
      const file = join(sdir, 'SKILL.md')
      if (!existsSync(file)) continue
      const { meta, body } = frontmatter(read(file))
      const refs = [...shared, ...walk(join(sdir, 'references')).filter((p) => p.endsWith('.md'))]
      const refTokens = refs.reduce((n, p) => n + tokens(read(p)), 0)
      const s = shape(body)
      const cases = dirs(join(root, 'evals', plugin)).length
      // A verdict that reads no stored line supersedes the stored line, which is older.
      const v = verdict.get(plugin)
      const res = v && !v.stored ? null : results.get(plugin)
      const row = {
        plugin,
        skill,
        layer: plugin.split('-')[0],
        alwaysOn: tokens(`${meta.name ?? skill} ${meta.description ?? ''}`),
        body: tokens(body),
        refs: refTokens,
        rules: s.rules,
        codeShare: tokens(body) ? s.codeTokens / tokens(body) : 0,
        cases,
        meanDelta: res ? res.meanDelta : (v?.delta ?? null),
        measured: Boolean(res || v),
      }
      const total = row.body + row.refs
      row.group = row.meanDelta !== null ? (row.meanDelta > LIFT ? 'ablate' : 'decide') : v ? 'rules' : total > SMALL ? 'measure' : 'cheap'
      if (plugin.startsWith('marketplace-')) row.group = 'own'
      rows.push(row)
    }
  }
  const order = { decide: 1, measure: 2, ablate: 3, cheap: 4, rules: 5, own: 6 }
  rows.sort((a, b) => order[a.group] - order[b.group] || b.body + b.refs - (a.body + a.refs))
  return rows
}

function render(rows) {
  const sign = (r) => (r.meanDelta === null ? (r.measured ? 'rules' : '-') : (r.meanDelta > 0 ? '+' : '') + r.meanDelta.toFixed(2))
  const out = [
    '| # | Group | Skill | Layer | Always-on | Body | Refs | Rules | Code | Cases | Mean Δ |',
    '|---|---|---|---|---|---|---|---|---|---|---|',
  ]
  rows.forEach((r, i) => {
    out.push(`| ${i + 1} | ${r.group} | ${r.plugin}/${r.skill} | ${r.layer} | ${r.alwaysOn} | ${r.body} | ${r.refs} | ${r.rules} | ${Math.round(r.codeShare * 100)}% | ${r.cases || '-'} | ${sign(r)} |`)
  })
  const sum = (k) => rows.reduce((n, r) => n + r[k], 0)
  const measured = rows.filter((r) => r.measured).length
  out.push('', `${rows.length} skills, ${measured} measured. Always-on if all were enabled: ${sum('alwaysOn')} tokens. Body: ${sum('body')}. References: ${sum('refs')}.`)
  out.push('', 'Always-on is the name and description, loaded every session. Body and refs load when the skill fires. Code is the share of the body that is code examples.')
  return out.join('\n')
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const rows = audit()
  console.log(process.argv.includes('--json') ? JSON.stringify(rows, null, 2) : render(rows))
}
