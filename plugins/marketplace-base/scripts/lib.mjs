// What the base plugin's hooks share: their input, their state, and where the
// marketplace they came from lives. Plain Node, no dependencies.

import { readFileSync, writeFileSync, mkdirSync, existsSync, openSync, closeSync, statSync, rmSync } from 'node:fs'
import { join, dirname, resolve, sep } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

// A hook that the collector's own Claude run would fire does nothing, so the
// collector never collects itself.
export const insideCollector = () => process.env.STEWARD_COLLECTOR === '1'

export function readInput() {
  try {
    return JSON.parse(readFileSync(0, 'utf8') || '{}')
  } catch {
    return {}
  }
}

export function readJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

export function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(value, null, 2))
}

const configDir = () => process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude')

// Kept across plugin updates, unlike the plugin's own folder.
export const dataDir = () =>
  process.env.CLAUDE_PLUGIN_DATA || join(configDir(), 'plugins', 'data', 'marketplace-base')

// The project's root. A hook's `cwd` is wherever the session's shell is, which may be a
// subfolder after a `cd`.
export const projectDir = (input) => process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()

// The person's own settings, which say what is enabled for them in every project.
export const userSettings = () => readJson(join(configDir(), 'settings.json'), {})

// Waits for the lock on a file the hooks share, runs `fn`, and lets go. A lock older
// than a minute is from a run that died.
export function withLock(path, fn) {
  const lock = `${path}.lock`
  mkdirSync(dirname(lock), { recursive: true })
  for (let tries = 0; ; tries++) {
    try {
      closeSync(openSync(lock, 'wx'))
      break
    } catch {
      if (existsSync(lock) && Date.now() - statSync(lock).mtimeMs > 60_000) rmSync(lock, { force: true })
      if (tries > 100) break
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50)
    }
  }
  try {
    return fn()
  } finally {
    rmSync(lock, { force: true })
  }
}

// The project's settings, with the local file over the shared one.
export function projectSettings(cwd) {
  const shared = readJson(join(cwd, '.claude', 'settings.json'), {})
  const local = readJson(join(cwd, '.claude', 'settings.local.json'), {})
  return {
    env: { ...(shared.env ?? {}), ...(local.env ?? {}) },
    enabledPlugins: { ...(shared.enabledPlugins ?? {}), ...(local.enabledPlugins ?? {}) },
  }
}

// The marketplace this plugin was installed from: its name, its catalog file, and
// its GitHub repository when it has one. An installed copy sits under
// plugins/cache/<marketplace>/; a working copy loaded with --plugin-dir sits inside
// the marketplace's own checkout.
export function marketplace() {
  const root = process.env.CLAUDE_PLUGIN_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const known = readJson(join(configDir(), 'plugins', 'known_marketplaces.json'), {})
  let name = null
  let catalog = null

  const parts = root.split(sep)
  const cache = parts.lastIndexOf('cache')
  if (cache > 0 && parts[cache - 1] === 'plugins') name = parts[cache + 1]
  if (name && known[name]?.installLocation) {
    catalog = join(known[name].installLocation, '.claude-plugin', 'marketplace.json')
  }
  if (!catalog || !existsSync(catalog)) {
    for (let dir = root; dir !== dirname(dir); dir = dirname(dir)) {
      const candidate = join(dir, '.claude-plugin', 'marketplace.json')
      if (existsSync(candidate)) {
        catalog = candidate
        name = readJson(candidate, {}).name ?? name
        break
      }
    }
  }
  if (!catalog || !existsSync(catalog)) return null

  const source = known[name]?.source ?? {}
  let repo = null
  if (source.source === 'github' && source.repo) repo = source.repo
  else if (typeof source.url === 'string') {
    repo = source.url.match(/github\.com[:/]([^/]+\/[^/]+?)(\.git)?\/?$/)?.[1] ?? null
  }
  return { name, catalog, repo }
}
