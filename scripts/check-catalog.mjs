#!/usr/bin/env node
// Fails when the plugin list in marketplace.json disagrees with the two
// hand-written lists that mirror it: the plugin tables in the docs, and the
// catalog the steward reads to decide what to install. Also fails on the
// mistakes nothing else reports: a name that doesn't match its layer, a
// dependency on a plugin that doesn't exist, and a field with two homes.
//
// marketplace.json is the source of truth. The prose in the other two files
// stays hand-written — only the plugin names in their tables are checked here.

import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PLUGINS_PAGE = 'docs/reference/plugins.md'
const CATALOG = 'plugins/marketplace-steward/references/catalog.md'
// The four layers, general to specific, then one team's own plugins, then the
// plugins that work on the marketplace itself. Each is a category and the name prefix that goes with it.
// The order is the dependency direction: a plugin may depend on its own
// category or an earlier one, never a later one.
const CATEGORIES = ['universal', 'craft', 'language', 'tools', 'team', 'marketplace']

const problems = []
const fail = (msg) => problems.push(msg)
const read = (p) => readFileSync(join(root, p), 'utf8')

// Names appearing as `name` in the Plugin column, one set per markdown table that
// has one. Other columns name skills and agents, which are not plugins.
function namesInPluginColumns(text) {
  const tables = []
  let column = null // index of the Plugin column in the current table; null outside one
  for (const line of text.split('\n')) {
    const row = line.trim()
    if (!row.startsWith('|')) { column = null; continue }
    const cells = row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
    if (column === null) {
      column = cells.findIndex((c) => /^plugins?$/i.test(c))
      if (column >= 0) tables.push(new Set())
      continue
    }
    if (column < 0 || /^:?-+:?$/.test(cells[0])) continue
    for (const [, name] of (cells[column] ?? '').matchAll(/`([a-z0-9][a-z0-9-]*)`/g)) tables.at(-1).add(name)
  }
  return tables
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

  // Skill plugins ship knowledge only. The agents and the hooks every project shares
  // live in the marketplace- plugins, so knowledge in a skill plugin's agent or hook
  // would have a second home, and a hook would run in every project that installs it.
  for (const shipped of ['agents', 'hooks', '.mcp.json']) {
    if (category !== 'marketplace' && existsSync(join(dir, shipped))) {
      fail(`${name}: ships ${shipped}. Only marketplace- plugins ship agents and hooks; a skill plugin ships its skill.`)
    }
  }
  for (const key of ['hooks', 'mcpServers', 'agents', 'commands']) {
    if (category !== 'marketplace' && plugin[key] !== undefined) {
      fail(`${name}: plugin.json declares "${key}". A skill plugin ships its skill only.`)
    }
  }
}

// Every directory under plugins/ must be catalogued.
const pluginsDir = join(root, 'plugins')
if (existsSync(pluginsDir)) {
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
// Every plugin table in the docs lists every plugin. The catalog splits them across
// one table per layer, so there the tables together list every plugin.
const docsTables = namesInPluginColumns(read(PLUGINS_PAGE))
const mirrors = [
  ...docsTables.map((t, i) => [`plugins.md table ${i + 1}`, PLUGINS_PAGE, t]),
  ['catalog.md tables', CATALOG, new Set(namesInPluginColumns(read(CATALOG)).flatMap((t) => [...t]))],
]
if (docsTables.length === 0) fail(`${PLUGINS_PAGE} has no table with a Plugin column`)
for (const [label, path, present] of mirrors) {
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

console.log(`✓ catalog in sync — ${declared.size} plugins listed in marketplace.json, plugins.md, and catalog.md`)
