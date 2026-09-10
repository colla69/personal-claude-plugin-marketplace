#!/usr/bin/env node
// Fails when the plugin list in marketplace.json disagrees with the two
// hand-written lists that mirror it: the README table and the catalog that
// project-init reads to decide what to recommend.
//
// marketplace.json is the source of truth. The prose in the other two files
// stays hand-written — only presence is checked here.

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const README = 'README.md'
const CATALOG =
  'plugins/project-init/skills/init-agent-setup/references/plugin-catalog.md'

const problems = []
const fail = (msg) => problems.push(msg)
const read = (p) => readFileSync(join(root, p), 'utf8')

// Names appearing as `name` inside a markdown table row.
function namesInTable(text) {
  const found = new Set()
  for (const line of text.split('\n')) {
    if (!line.trimStart().startsWith('|')) continue
    for (const [, name] of line.matchAll(/`([a-z0-9][a-z0-9-]*)`/g)) found.add(name)
  }
  return found
}

const marketplace = JSON.parse(read('.claude-plugin/marketplace.json'))
const entries = marketplace.plugins ?? []
if (entries.length === 0) fail('marketplace.json lists no plugins')

const declared = new Set()
for (const entry of entries) {
  const { name, source } = entry
  if (!name) { fail(`marketplace.json has an entry with no name: ${JSON.stringify(entry)}`); continue }
  declared.add(name)

  for (const field of ['source', 'description', 'category', 'tags']) {
    if (entry[field] === undefined) fail(`${name}: marketplace entry is missing "${field}"`)
  }
  if (typeof source !== 'string') continue

  const dir = join(root, source)
  const manifest = join(dir, '.claude-plugin', 'plugin.json')
  if (!existsSync(dir)) { fail(`${name}: source "${source}" does not exist`); continue }
  if (!existsSync(manifest)) { fail(`${name}: no .claude-plugin/plugin.json under "${source}"`); continue }

  const plugin = JSON.parse(readFileSync(manifest, 'utf8'))
  if (plugin.name !== name) {
    fail(`${name}: plugin.json says name "${plugin.name}" — must match the marketplace entry`)
  }
  if (plugin.version !== undefined) {
    fail(`${name}: plugin.json declares a version. This toolkit resolves updates by commit SHA; a version pins users to a cached copy until it is bumped.`)
  }
  const readme = join(dir, 'README.md')
  if (!existsSync(readme)) {
    fail(`${name}: no README.md at the plugin root — every plugin documents itself`)
  } else {
    const heading = readFileSync(readme, 'utf8').split('\n').find((l) => l.startsWith('# '))
    if (heading?.slice(2).trim() !== name) {
      fail(`${name}: README.md heading is "${heading?.slice(2).trim() ?? '(none)'}" — must be "# ${name}"`)
    }
  }

  // skills/ and agents/ belong at the plugin root, not inside .claude-plugin/
  for (const stray of ['skills', 'agents', 'commands', 'hooks']) {
    if (existsSync(join(dir, '.claude-plugin', stray))) {
      fail(`${name}: "${stray}/" is inside .claude-plugin/ — it belongs at the plugin root, or it will load as empty`)
    }
  }
}

// Every directory under plugins/ must be catalogued.
const pluginsDir = join(root, 'plugins')
if (existsSync(pluginsDir)) {
  const { readdirSync } = await import('node:fs')
  for (const dirent of readdirSync(pluginsDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue
    if (!declared.has(dirent.name)) {
      fail(`plugins/${dirent.name}/ exists but is not listed in marketplace.json`)
    }
  }
}

// The two mirrors.
for (const [label, path] of [['README.md table', README], ['plugin-catalog.md table', CATALOG]]) {
  const present = namesInTable(read(path))
  for (const name of declared) {
    if (!present.has(name)) fail(`${name}: missing from the ${label} (${path})`)
  }
}

if (problems.length > 0) {
  console.error(`\n✗ catalog out of sync — ${problems.length} problem${problems.length > 1 ? 's' : ''}:\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error('')
  process.exit(1)
}

console.log(`✓ catalog in sync — ${declared.size} plugins listed in marketplace.json, README, and plugin-catalog.md`)
