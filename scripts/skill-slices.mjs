#!/usr/bin/env node
// Cuts a SKILL.md into slices, so a measurement can ask which part of a skill carries
// its lift. Reads files only, and writes only to --out.
//
//   node scripts/skill-slices.mjs <plugin>                   the blocks, with tokens
//   node scripts/skill-slices.mjs <plugin> --without <sel> --out <dir>
//                                                            a copy of the plugin cut
//
// A block is one paragraph, list item, table, code fence or heading, numbered from 1 in file
// order. A selector names the blocks to remove; join several with a comma:
//   section:<text>   every block under the H2 heading that contains <text>, heading too
//   type:<kind>      every block of that kind: code, table, list or prose
//   block:<n>        one block
// The description in the front matter is never cut: it decides whether the skill loads,
// which is a different question from what the body adds.

import { readFileSync, existsSync, readdirSync, cpSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = (text) => Math.round(text.length / 3.7)

export function split(text) {
  const m = /^---\n[\s\S]*?\n---\n?/.exec(text)
  const head = m ? m[0] : ''
  const blocks = []
  let section = '(intro)'
  let cur = null
  let fence = false
  let lists = 0
  const close = () => {
    if (!cur) return
    const first = cur.lines[0]
    cur.type = cur.fenced ? 'code'
      : /^#{1,6}\s/.test(first) ? 'heading'
      : /^\|/.test(first) ? 'table'
      : /^([-*]|\d+\.)\s/.test(first) ? 'list'
      : 'prose'
    // A list is cut into one block per item, so a single rule can be removed.
    const parts = cur.type === 'list' ? cur.lines.reduce((acc, l) => {
      if (/^([-*]|\d+\.)\s/.test(l) || !acc.length) acc.push([l]); else acc[acc.length - 1].push(l)
      return acc
    }, []) : [cur.lines]
    parts.forEach((lines, i) => {
      const text = lines.join('\n')
      blocks.push({ section: cur.section, type: cur.type, lines, text, tokens: tokens(text), list: i > 0 ? lists : ++lists, next: i > 0 })
    })
    cur = null
  }
  for (const line of text.slice(head.length).split('\n')) {
    const isFence = /^\s*```/.test(line)
    if (!cur && line.trim() === '') continue
    if (!cur) cur = { section, lines: [], fenced: false }
    if (isFence) {
      cur.lines.push(line)
      cur.fenced = true
      fence = !fence
      if (!fence) close()
      continue
    }
    if (fence) { cur.lines.push(line); continue }
    if (line.trim() === '') { close(); continue }
    // A heading is a block of its own, and a new H2 opens the next section.
    if (/^#{1,6}\s/.test(line) && cur.lines.length) { close(); cur = { section, lines: [], fenced: false } }
    cur.lines.push(line)
    if (/^#{1,6}\s/.test(line)) {
      if (/^##\s/.test(line)) { section = line.replace(/^##\s+/, ''); cur.section = section }
      close()
    }
  }
  close()
  blocks.forEach((b, i) => { b.n = i + 1 })
  return { head, blocks }
}

export function pick(blocks, selector) {
  const hit = new Set()
  for (const sel of selector.split(',').map((s) => s.trim()).filter(Boolean)) {
    const [kind, ...rest] = sel.split(':')
    const value = rest.join(':')
    let found = []
    if (kind === 'section') found = blocks.filter((b) => b.section.toLowerCase().includes(value.toLowerCase()))
    else if (kind === 'type') found = blocks.filter((b) => b.type === value)
    else if (kind === 'block') found = blocks.filter((b) => b.n === Number(value))
    else throw new Error(`Unknown selector "${sel}": use section:, type: or block:`)
    if (!found.length) throw new Error(`Selector "${sel}" matches no block`)
    found.forEach((b) => hit.add(b.n))
  }
  return hit
}

// The file's text with the selected blocks removed.
export function without(text, selector) {
  const { head, blocks } = split(text)
  const hit = pick(blocks, selector)
  let out = ''
  let last = null
  for (const b of blocks.filter((x) => !hit.has(x.n))) {
    // Items of one list stay on consecutive lines, as in the source.
    out += last ? (b.next && last.list === b.list && b.type === 'list' ? '\n' : '\n\n') : ''
    out += b.text
    last = b
  }
  return `${head}\n${out}\n`
}

function skillFile(plugin) {
  const dir = join(root, 'plugins', plugin, 'skills')
  const names = existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()) : []
  if (names.length !== 1) throw new Error(`${plugin} has ${names.length} skills; this tool cuts a plugin with one`)
  return join(dir, names[0].name, 'SKILL.md')
}

// A copy of the plugin whose skill is cut, for the engine to load.
export function cutCopy(plugin, selector, out) {
  const file = skillFile(plugin)
  const copy = join(out, plugin)
  cpSync(join(root, 'plugins', plugin), copy, { recursive: true })
  const target = join(copy, file.slice(join(root, 'plugins', plugin).length + 1))
  writeFileSync(target, without(readFileSync(file, 'utf8'), selector))
  return copy
}

function list(plugin) {
  const { blocks } = split(readFileSync(skillFile(plugin), 'utf8'))
  const total = blocks.reduce((n, b) => n + b.tokens, 0)
  const out = ['| # | Section | Type | Tokens | Starts with |', '|---|---|---|---|---|']
  for (const b of blocks) {
    out.push(`| ${b.n} | ${b.section} | ${b.type} | ${b.tokens} | ${b.lines[0].slice(0, 60).replace(/\|/g, '\\|')} |`)
  }
  const sum = (type) => blocks.filter((b) => b.type === type).reduce((n, b) => n + b.tokens, 0)
  out.push('', `Body: ${total} tokens. Code ${sum('code')}, tables ${sum('table')}, lists ${sum('list')}, prose ${sum('prose')}.`)
  return out.join('\n')
}

function main(argv) {
  const plugin = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--without' && argv[argv.indexOf(a) - 1] !== '--out')
  const get = (flag) => (argv.includes(flag) ? argv[argv.indexOf(flag) + 1] : null)
  if (!plugin) { console.error('usage: skill-slices.mjs <plugin> [--without <selector> --out <dir>]'); process.exit(2) }
  const sel = get('--without')
  if (!sel) return console.log(list(plugin))
  const out = get('--out')
  if (!out) { console.error('--without needs --out <dir>'); process.exit(2) }
  mkdirSync(out, { recursive: true })
  const copy = cutCopy(plugin, sel, resolve(out))
  const before = tokens(readFileSync(skillFile(plugin), 'utf8'))
  const after = tokens(readFileSync(join(copy, skillFile(plugin).slice(join(root, 'plugins', plugin).length + 1)), 'utf8'))
  console.log(`Wrote ${copy}\nSKILL.md: ${before} tokens, ${after} after the cut (${before - after} removed).`)
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  try { main(process.argv.slice(2)) } catch (e) { console.error(e.message); process.exit(1) }
}
