#!/usr/bin/env node
// Fails when the plugin list in marketplace.json disagrees with the two
// hand-written lists that mirror it: the README table and the catalog that
// marketplace-init reads to decide what to recommend. Also fails on the
// mistakes nothing else reports: a name that doesn't match its layer, a
// dependency on a plugin that doesn't exist, and a field with two homes.
//
// marketplace.json is the source of truth. The prose in the other two files
// stays hand-written — only the plugin names in their tables are checked here.

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const README = 'README.md'
const CATALOG =
  'plugins/marketplace-init/skills/init-agent-setup/references/plugin-catalog.md'
// The four layers, general to specific, plus the plugins that work on the
// marketplace itself. Each is a category and the name prefix that goes with it.
// The order is the dependency direction: a plugin may depend on its own
// category or an earlier one, never a later one.
const CATEGORIES = ['universal', 'craft', 'language', 'tools', 'marketplace']

const problems = []
const fail = (msg) => problems.push(msg)
const read = (p) => readFileSync(join(root, p), 'utf8')

// Names appearing as `name` in the Plugin column of any markdown table that has
// one. Other columns name skills and agents, which are not plugins.
function namesInPluginColumns(text) {
  const found = new Set()
  let column = null // index of the Plugin column in the current table; null outside one
  for (const line of text.split('\n')) {
    const row = line.trim()
    if (!row.startsWith('|')) { column = null; continue }
    const cells = row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
    if (column === null) { column = cells.findIndex((c) => /^plugins?$/i.test(c)); continue }
    if (column < 0 || /^:?-+:?$/.test(cells[0])) continue
    for (const [, name] of (cells[column] ?? '').matchAll(/`([a-z0-9][a-z0-9-]*)`/g)) found.add(name)
  }
  return found
}

const marketplace = JSON.parse(read('.claude-plugin/marketplace.json'))
const entries = marketplace.plugins ?? []
if (entries.length === 0) fail('marketplace.json lists no plugins')

const declared = new Set()
const categories = new Map() // plugin name → its category
const dependencies = new Map() // plugin name → the names its plugin.json depends on
for (const entry of entries) {
  const { name, source, category } = entry
  if (!name) { fail(`marketplace.json has an entry with no name: ${JSON.stringify(entry)}`); continue }
  declared.add(name)
  categories.set(name, category)

  for (const field of ['source', 'description', 'category', 'tags']) {
    if (entry[field] === undefined) fail(`${name}: marketplace entry is missing "${field}"`)
  }
  if (category !== undefined && !CATEGORIES.includes(category)) {
    fail(`${name}: category "${category}" is not one of ${CATEGORIES.join(', ')}`)
  } else if (category !== undefined && !name.startsWith(`${category}-`)) {
    fail(`${name}: category is "${category}", so the name must start with "${category}-"`)
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
  if (plugin.description !== undefined) {
    fail(`${name}: plugin.json declares a description. It lives in the marketplace entry only; set in both, the manifest silently wins.`)
  }
  dependencies.set(name, (plugin.dependencies ?? []).map((d) => (typeof d === 'string' ? d : d?.name)))
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

  // Skill plugins ship knowledge only. A shipped agent competes with the ones init
  // generates in each project, and the knowledge in it has a second home.
  if (category !== 'marketplace' && existsSync(join(dir, 'agents'))) {
    fail(`${name}: ships agents/. Only marketplace- plugins ship agents; init generates the workers in each project.`)
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

// claude plugin validate passes a dependency on a plugin that doesn't exist, and
// nothing else checks which way a dependency points.
const rank = (name) => CATEGORIES.indexOf(categories.get(name))
for (const [name, deps] of dependencies) {
  for (const dep of deps) {
    if (!declared.has(dep)) {
      fail(`${name}: depends on "${dep}", which marketplace.json does not list`)
    } else if (rank(name) >= 0 && rank(dep) > rank(name)) {
      fail(`${name}: depends on "${dep}", which is ${categories.get(dep)}, more specific than ${categories.get(name)}. Dependencies point toward the general layers only.`)
    }
  }
}

// The two mirrors, both ways: a stale name left in a table passes the presence check.
for (const [label, path] of [['README.md table', README], ['plugin-catalog.md table', CATALOG]]) {
  const present = namesInPluginColumns(read(path))
  for (const name of declared) {
    if (!present.has(name)) fail(`${name}: missing from the ${label} (${path})`)
  }
  for (const name of present) {
    if (!declared.has(name)) fail(`${name}: listed in the ${label} (${path}) but not in marketplace.json`)
  }
}

if (problems.length > 0) {
  console.error(`\n✗ catalog out of sync — ${problems.length} problem${problems.length > 1 ? 's' : ''}:\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error('')
  process.exit(1)
}

console.log(`✓ catalog in sync — ${declared.size} plugins listed in marketplace.json, README, and plugin-catalog.md`)
