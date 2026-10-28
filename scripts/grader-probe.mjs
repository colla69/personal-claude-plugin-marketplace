#!/usr/bin/env node
// Tests the regex graders of a plugin's cases against code that is known to be good
// and code that is known to be bad, so a grader that passes the bug it exists to
// catch is found before a run is paid for.
//
//   node scripts/grader-probe.mjs <plugin>        every case in evals/<plugin>/
//   node scripts/grader-probe.mjs <plugin> <case> one case
//
// A case keeps its snippets in probes/ beside its graders:
//
//   probes/<grader>.good.<anything>   the grader must match this text
//   probes/<grader>.bad.<anything>    the grader must not match this text
//
// Each one is tried with and without the `m` flag, because the engine's flags are not
// documented and a `^` that means "start of file" in one reading means "start of a
// line" in the other. A grader with no bad snippet has never been seen to fail, and one
// with no good snippet has never been seen to pass, so each is reported with a `?`, as
// is a grader the script cannot read (not `type: regex`, not `source: file`). Only the
// snippets that exist are checked. Exit 1 on any wrong verdict; a `?` does not fail.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [plugin, only] = process.argv.slice(2)
if (!plugin) {
  console.error('usage: grader-probe.mjs <plugin> [case]')
  process.exit(2)
}
const suite = join(root, 'evals', plugin)
if (!existsSync(suite)) {
  console.error(`${plugin} has no cases in evals/${plugin}/`)
  process.exit(2)
}

// A single-quoted YAML scalar: '' stands for one quote.
const pattern = (text) => {
  const m = /^pattern: '(.*)'\s*$/m.exec(text)
  return m ? m[1].replace(/''/g, "'") : null
}
// A lone quote ends a single-quoted scalar early: the engine rejects the file and drops
// the case without a word.
const loneQuote = (text) => /^pattern: '(.*)'\s*$/m.test(text) && /(^|[^'])'([^']|$)/.test(/^pattern: '(.*)'\s*$/m.exec(text)[1])

let wrong = 0
let untested = 0
let checked = 0
const cases = readdirSync(suite, { withFileTypes: true }).filter((d) => d.isDirectory() && (!only || d.name === only))
for (const c of cases) {
  const graders = join(suite, c.name, 'graders')
  const probes = join(suite, c.name, 'probes')
  const snippets = existsSync(probes) ? readdirSync(probes) : []
  for (const file of existsSync(graders) ? readdirSync(graders) : []) {
    const text = readFileSync(join(graders, file), 'utf8')
    const name = file.replace(/\.md$/, '')
    if (!/^type:\s*regex\s*$/m.test(text) || !/source:\s*file/.test(text)) {
      console.log(`? ${c.name}/${name}: not a regex grader on a file, so it is not tested`)
      untested++
      continue
    }
    if (loneQuote(text)) {
      console.log(`✗ ${c.name}/${name}: a lone ' inside the pattern ends the YAML string; double it or use \\x27`)
      wrong++
      continue
    }
    const source = pattern(text)
    if (!source) {
      console.log(`✗ ${c.name}/${name}: no single-quoted pattern: line to test`)
      wrong++
      continue
    }
    const mine = snippets.filter((s) => s.startsWith(`${name}.good.`) || s.startsWith(`${name}.bad.`))
    if (!mine.some((s) => s.startsWith(`${name}.bad.`))) {
      console.log(`? ${c.name}/${name}: no bad snippet, so it has never been seen to fail`)
      untested++
    }
    if (!mine.some((s) => s.startsWith(`${name}.good.`))) {
      console.log(`? ${c.name}/${name}: no good snippet, so it has never been seen to pass`)
      untested++
    }
    for (const s of mine) {
      const want = s.startsWith(`${name}.good.`)
      const body = readFileSync(join(probes, s), 'utf8')
      for (const flags of ['', 'm']) {
        checked++
        if (new RegExp(source, flags).test(body) !== want) {
          console.log(`✗ ${c.name}/${name}: ${s} should ${want ? '' : 'not '}match (flags '${flags}')`)
          wrong++
        }
      }
    }
  }
}
console.log(`${wrong ? '✗' : '✓'} ${checked} checks, ${wrong} wrong, ${untested} graders not fully tested`)
process.exit(wrong ? 1 : 0)
