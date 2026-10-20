#!/usr/bin/env node
// Fails on the documentation's silent mistakes: a relative link to a file or a heading
// that doesn't exist, a page in docs/ that the map doesn't link, a prose line past 88
// columns, a skill, reference or agent that links into docs/, which the installed
// plugin doesn't contain, and a page that links into the working records.
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
  if (!existsSync(join(root, dir))) return found
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) found.push(...markdownUnder(path))
    else if (entry.name.endsWith('.md')) found.push(path)
  }
  return found
}

// The text outside fenced code blocks, line by line, with each line's number. A fence
// closes only on the same character, at least as many times as it opened.
function proseLines(text) {
  const lines = []
  let fence = null
  // Frontmatter, as in an agent file, is exempt: a description can't wrap.
  const front = text.startsWith('---\n') ? text.indexOf('\n---', 3) : -1
  const skip = front === -1 ? 0 : text.slice(0, front).split('\n').length + 1
  text.split('\n').forEach((line, i) => {
    if (i < skip) return
    const marker = line.trimStart().match(/^(`{3,}|~{3,})/)?.[1]
    if (fence === null && marker) { fence = marker; return }
    if (fence !== null) {
      if (marker && marker[0] === fence[0] && marker.length >= fence.length && line.trim() === marker) fence = null
      return
    }
    lines.push([i + 1, line])
  })
  return lines
}

// Relative link targets in the prose, split into the file and its #anchor. A link
// written inside inline code is an example, not a link.
function links(text) {
  const found = []
  for (const [n, line] of proseLines(text)) {
    const prose = line.replace(/``[^`]*``|`[^`]*`/g, (code) => (code.includes('](') ? '' : code))
    for (const [, target] of prose.matchAll(/\]\(<?([^)\s>]+)>?(?:\s+"[^"]*")?\)/g)) {
      if (/^(https?:|mailto:)/.test(target)) continue
      const [file, anchor] = target.split('#')
      found.push([n, file, anchor])
    }
  }
  return found
}

// The anchors GitHub gives a page's headings.
const anchorCache = new Map()
function anchorsOf(path) {
  if (anchorCache.has(path)) return anchorCache.get(path)
  const anchors = new Set()
  const seen = new Map()
  for (const [, line] of proseLines(readFileSync(path, 'utf8'))) {
    const heading = line.match(/^#{1,6}\s+(.*?)\s*#*\s*$/)?.[1]
    if (!heading) continue
    const base = heading
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s/g, '-')
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    anchors.add(count === 0 ? base : `${base}-${count}`)
  }
  anchorCache.set(path, anchors)
  return anchors
}

const pages = markdownUnder('docs').filter((p) => !p.startsWith(RECORDS))
const entryPoints = ['README.md', 'CONTRIBUTING.md', 'CLAUDE.md']
const local = markdownUnder('.claude')
const pluginReadmes = readdirSync(join(root, 'plugins'))
  .map((name) => `plugins/${name}/README.md`)
  .filter((p) => existsSync(join(root, p)))

// Links resolve, to the file and to the heading, in every page a reader opens. None
// leads into the working records.
for (const file of [...pages, ...entryPoints, ...local, ...pluginReadmes]) {
  for (const [n, target, anchor] of links(read(file))) {
    if (target.startsWith('/')) { fail(`${file}:${n}: link to "${target}" is absolute; make it relative`); continue }
    const path = target === '' ? join(root, file) : resolve(join(root, dirname(file)), target)
    if (!existsSync(path)) { fail(`${file}:${n}: link to "${target}", which doesn't exist`); continue }
    if (relative(root, path).startsWith(RECORDS) || relative(root, path) === RECORDS.slice(0, -1)) {
      fail(`${file}:${n}: links into ${RECORDS}, the working records; the docs stand on their own`)
    }
    if (anchor && path.endsWith('.md') && !anchorsOf(path).has(anchor)) {
      fail(`${file}:${n}: link to "#${anchor}" in ${target || file}, which has no such heading`)
    }
  }
}

// Every page is on the map, so it can be found.
const mapped = new Set(
  links(read(MAP)).map(([, target]) => relative(root, resolve(join(root, 'docs'), target))),
)
for (const page of pages) {
  if (page !== MAP && !mapped.has(page)) fail(`${page}: not linked from ${MAP}`)
}

// Prose wraps at 88 columns. Tables, code, and a line that is nothing but one link
// whose text can't break, such as [`style.md`](…), are exempt.
for (const file of [...pages, ...entryPoints, ...local]) {
  for (const [n, line] of proseLines(read(file))) {
    if (line.length <= WIDTH || line.trimStart().startsWith('|')) continue
    if (/^\s*([-*]|\d+\.)?\s*\[(`[^`]*`|[^\s\]]+)\]\([^\s)]+\)[.,;:]?$/.test(line)) continue
    fail(`${file}:${n}: ${line.length} columns, past ${WIDTH}`)
  }
}

// The product never depends on the docs: the plugin cache holds no docs/.
for (const name of readdirSync(join(root, 'plugins'))) {
  for (const part of ['skills', 'references', 'agents']) {
    const dir = `plugins/${name}/${part}`
    if (!existsSync(join(root, dir)) || !statSync(join(root, dir)).isDirectory()) continue
    for (const file of markdownUnder(dir)) {
      for (const [n, target] of links(read(file))) {
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

console.log(`✓ docs in shape — ${pages.length} pages on the map, every link and anchor resolves, prose within ${WIDTH} columns, no product file links into docs/`)
