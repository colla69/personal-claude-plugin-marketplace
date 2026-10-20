#!/usr/bin/env node
// Fails on the documentation's silent mistakes: a relative link to a file that
// doesn't exist, a page in docs/ that the map doesn't link, a prose line past 88
// columns, and a skill, reference or agent that links into docs/, which the
// installed plugin doesn't contain.
//
// The working records in docs/records/ are left alone: they are history, not pages.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MAP = 'docs/README.md'
const RECORDS = 'docs/records/'
const WIDTH = 88

const problems = []
const fail = (msg) => problems.push(msg)
const read = (p) => readFileSync(join(root, p), 'utf8')

// Every .md file under a folder, as paths from the repo root.
function markdownUnder(dir) {
  const found = []
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) found.push(...markdownUnder(path))
    else if (entry.name.endsWith('.md')) found.push(path)
  }
  return found
}

// The text outside fenced code blocks, line by line, with each line's number.
function proseLines(text) {
  const lines = []
  let fence = false
  text.split('\n').forEach((line, i) => {
    if (line.trimStart().startsWith('```')) { fence = !fence; return }
    if (!fence) lines.push([i + 1, line])
  })
  return lines
}

// Relative link targets in the prose, without their #anchor.
function linkTargets(text) {
  const targets = []
  for (const [n, line] of proseLines(text)) {
    for (const [, target] of line.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(target)) continue
      targets.push([n, target.split('#')[0]])
    }
  }
  return targets
}

const pages = markdownUnder('docs').filter((p) => !p.startsWith(RECORDS))
const entryPoints = ['README.md', 'CONTRIBUTING.md', 'CLAUDE.md']
const pluginReadmes = readdirSync(join(root, 'plugins'))
  .map((name) => `plugins/${name}/README.md`)
  .filter((p) => existsSync(join(root, p)))

// Links resolve, in every page a reader opens.
for (const file of [...pages, ...entryPoints, ...pluginReadmes]) {
  for (const [n, target] of linkTargets(read(file))) {
    const path = resolve(join(root, dirname(file)), target)
    if (!existsSync(path)) fail(`${file}:${n}: link to "${target}", which doesn't exist`)
  }
}

// Every page is on the map, so it can be found.
const mapped = new Set(
  linkTargets(read(MAP)).map(([, target]) => relative(root, resolve(join(root, 'docs'), target))),
)
for (const page of pages) {
  if (page !== MAP && !mapped.has(page)) fail(`${page}: not linked from ${MAP}`)
}

// Prose wraps at 88 columns. Tables, code, and a line that is one link too long to
// break are exempt.
for (const file of [...pages, ...entryPoints]) {
  for (const [n, line] of proseLines(read(file))) {
    if (line.length <= WIDTH || line.trimStart().startsWith('|')) continue
    if (/^\s*(- )?\[`[^\s]*`\]\([^\s)]+\)[.,;]?$/.test(line)) continue
    fail(`${file}:${n}: ${line.length} columns, past ${WIDTH}`)
  }
}

// The product never depends on the docs: the plugin cache holds no docs/.
for (const name of readdirSync(join(root, 'plugins'))) {
  for (const part of ['skills', 'references', 'agents']) {
    const dir = `plugins/${name}/${part}`
    if (!existsSync(join(root, dir)) || !statSync(join(root, dir)).isDirectory()) continue
    for (const file of markdownUnder(dir)) {
      for (const [n, target] of linkTargets(read(file))) {
        if (/(^|\/)docs\//.test(target)) fail(`${file}:${n}: links into docs/, which the installed plugin doesn't contain`)
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`\n✗ docs out of shape — ${problems.length} problem${problems.length > 1 ? 's' : ''}:\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error('')
  process.exit(1)
}

console.log(`✓ docs in shape — ${pages.length} pages, every link resolves, every page on the map`)
