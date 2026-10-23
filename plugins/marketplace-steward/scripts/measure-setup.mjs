#!/usr/bin/env node
// Measures what a project's Claude setup costs: what loads in every session, what loads
// only on demand, and, from the session transcripts Claude Code keeps for the project,
// how much of the setup was used. The steward reads the output, and its
// `references/cost.md` says what it does with it.
//
//   node measure-setup.mjs [project-dir]      the current directory by default
//
// It prints names and numbers only, never the text of a file or a conversation, and it
// writes nothing. Token counts from files are estimates; counts from transcripts are
// the API's own.
//
// Adapted from claude-context-optimizer, https://github.com/egorfedorov/claude-context-optimizer:
// the baseline read from a session's first request (src/overhead.js), usage counted
// once per message id (src/transcript-usage.js), the name of a project's transcript
// folder, and 3.7 characters per token for prose (src/utils.js). Its license:
//
//   MIT License
//
//   Copyright (c) 2026 Egor Fedorov
//
//   Permission is hereby granted, free of charge, to any person obtaining a copy
//   of this software and associated documentation files (the "Software"), to deal
//   in the Software without restriction, including without limitation the rights
//   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//   copies of the Software, and to permit persons to whom the Software is
//   furnished to do so, subject to the following conditions:
//
//   The above copyright notice and this permission notice shall be included in all
//   copies or substantial portions of the Software.
//
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//   SOFTWARE.

import { readFileSync, readdirSync, existsSync, statSync, openSync, readSync, closeSync } from 'node:fs'
import { join, resolve, relative, dirname, basename } from 'node:path'
import { homedir } from 'node:os'

const SESSIONS = 20
const MAX_TRANSCRIPT_BYTES = 256 * 1024 * 1024
// Folders that never hold a project's context files, and can be huge.
const SKIP_DIRS = new Set(['.git', 'node_modules', 'vendor', 'dist', 'build', 'target', '.venv', 'venv', '__pycache__'])

const tokens = (text) => Math.round((text || '').length / 3.7)
const fmt = (n) => n.toLocaleString('en-US')
const readText = (p) => { try { return readFileSync(p, 'utf8') } catch { return null } }
const mtimeOf = (p) => { try { return statSync(p).mtimeMs } catch { return 0 } }

// ── The setup on disk ────────────────────────────────────────────────────────

function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text || '')
  return m ? m[1] : ''
}

function fmField(text, key) {
  const m = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(frontmatter(text))
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
}

// Lines that start with `@path` import that file into the one that holds them, and
// the import resolves against that file's folder.
function withImports(file, seen = new Set()) {
  const text = readText(file)
  if (text === null || seen.has(file)) return { text: '', files: [] }
  seen.add(file)
  let all = text
  const files = [file]
  for (const m of text.matchAll(/^@(\S+)\s*$/gm)) {
    const target = m[1].startsWith('~/') ? join(homedir(), m[1].slice(2)) : resolve(dirname(file), m[1])
    const sub = withImports(target, seen)
    all += sub.text
    files.push(...sub.files)
  }
  return { text: all, files }
}

// The `##` sections of a context file, largest first, so a reader sees what to move.
function sections(text) {
  const out = []
  let current = { title: '(before the first heading)', text: '' }
  let fence = false
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence
    if (!fence && /^#{1,2}\s/.test(line)) {
      out.push(current)
      current = { title: line.replace(/^#+\s*/, ''), text: '' }
    }
    current.text += line + '\n'
  }
  out.push(current)
  return out.filter((s) => s.text.trim()).map((s) => ({ title: s.title, tokens: tokens(s.text) }))
    .sort((a, b) => b.tokens - a.tokens)
}

function nestedContextFiles(root, dir = root, depth = 0, found = []) {
  if (depth > 8) return found
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return found }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || (e.name.startsWith('.') && e.name !== '.claude')) continue
      nestedContextFiles(root, join(dir, e.name), depth + 1, found)
    } else if (e.name === 'CLAUDE.md' && dir !== root && dir !== join(root, '.claude')) {
      found.push(join(dir, e.name))
    }
  }
  return found
}

function markdownIn(dir) {
  const out = []
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return out }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...markdownIn(p))
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

function readSetup(root) {
  const rootFiles = [join(root, 'CLAUDE.md'), join(root, '.claude', 'CLAUDE.md')].filter(existsSync)
  const context = rootFiles.map((f) => {
    const { text, files } = withImports(f)
    return { path: relative(root, f), imports: files.slice(1).map((p) => relative(root, p)), tokens: tokens(text), sections: sections(text) }
  })

  const rules = markdownIn(join(root, '.claude', 'rules')).map((f) => {
    const text = readText(f) || ''
    return { path: relative(root, f), scoped: /^paths:/m.test(frontmatter(text)), tokens: tokens(text) }
  })

  const nested = nestedContextFiles(root).map((f) => ({ path: relative(root, f), tokens: tokens(withImports(f).text) }))

  // What an agent or a skill puts in every session is its name and description; the
  // body loads when it runs.
  const agents = markdownIn(join(root, '.claude', 'agents')).map((f) => {
    const text = readText(f) || ''
    const name = fmField(text, 'name') || basename(f, '.md')
    const skills = [...frontmatter(text).matchAll(/^\s*-\s*([\w.-]+:[\w.-]+)\s*$/gm)].map((m) => m[1])
    return { name, path: relative(root, f), tokens: tokens(`- ${name}: ${fmField(text, 'description')}`), model: fmField(text, 'model') || '(inherits)', skills }
  })
  const skills = []
  try {
    for (const e of readdirSync(join(root, '.claude', 'skills'), { withFileTypes: true })) {
      const f = join(root, '.claude', 'skills', e.name, 'SKILL.md')
      const text = e.isDirectory() ? readText(f) : null
      if (text === null) continue
      const name = fmField(text, 'name') || e.name
      skills.push({ name, path: relative(root, f), tokens: tokens(`- ${name}: ${fmField(text, 'description')}`), mtime: mtimeOf(f) })
    }
  } catch { /* no project skills */ }

  let settings = {}
  try { settings = JSON.parse(readText(join(root, '.claude', 'settings.json')) || '{}') } catch { /* unreadable */ }
  const plugins = Object.entries(settings.enabledPlugins || {}).filter(([, on]) => on).map(([key]) => key)

  let mcp = []
  try { mcp = Object.keys(JSON.parse(readText(join(root, '.mcp.json')) || '{}').mcpServers || {}) } catch { /* none */ }

  return { context, rules, nested, agents, skills, plugins, pluginsSince: mtimeOf(join(root, '.claude', 'settings.json')), mcp }
}

// ── The sessions ─────────────────────────────────────────────────────────────

// Claude Code keeps a project's transcripts in a folder named after its path, with
// every character but a letter or a digit replaced by `-`. Long paths are shortened,
// so when that folder is missing, find the one whose transcripts name this path.
function transcriptDir(root) {
  const projects = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude'), 'projects')
  const direct = join(projects, root.replace(/[^a-zA-Z0-9]/g, '-'))
  if (existsSync(direct)) return direct
  let dirs = []
  try { dirs = readdirSync(projects, { withFileTypes: true }).filter((e) => e.isDirectory()) } catch { return null }
  for (const d of dirs) {
    const first = readdirSync(join(projects, d.name)).find((f) => f.endsWith('.jsonl'))
    if (first && headCwd(join(projects, d.name, first)) === root) return join(projects, d.name)
  }
  return null
}

function headCwd(file) {
  const buf = Buffer.alloc(64 * 1024)
  let fd
  try {
    fd = openSync(file, 'r')
    const n = readSync(fd, buf, 0, buf.length, 0)
    const m = /"cwd":"((?:[^"\\]|\\.)*)"/.exec(buf.toString('utf8', 0, n))
    return m ? JSON.parse(`"${m[1]}"`) : null
  } catch { return null } finally { if (fd !== undefined) closeSync(fd) }
}

function jsonLines(file) {
  try {
    if (statSync(file).size > MAX_TRANSCRIPT_BYTES) return []
    return readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean)
  } catch { return [] }
}

// Claude Code writes one line per content block and repeats the message's usage on
// each, so a request is counted once per message id.
function requests(entries) {
  const byId = new Map()
  for (const e of entries) {
    const m = e.message
    if (e.type !== 'assistant' || !m || !m.usage || typeof m.usage.input_tokens !== 'number') continue
    byId.set(m.id || `line-${byId.size}`, { usage: m.usage, model: m.model || null })
  }
  return [...byId.values()].map(({ usage: u, model }) => ({
    context: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0),
    output: u.output_tokens || 0,
    model,
  }))
}

// The skill and agent listings are the exact text that put every skill and agent
// description into the session. They are Claude Code's internal format, so a session
// without them is measured from the files alone.
function listingEntries(text) {
  const out = []
  for (const line of (text || '').split('\n')) {
    const m = /^- ([^\s:(]+(?::[^\s:(]+)?)(?: \([^)]*\))?:/.exec(line)
    if (m) out.push({ name: m[1], text: line })
    else if (out.length) out[out.length - 1].text += '\n' + line
  }
  return out
}

function readSession(file) {
  const entries = jsonLines(file)
  const reqs = requests(entries)
  if (!reqs.length) return null
  const calls = { skill: new Map(), agent: new Map(), mcp: new Map() }
  const bump = (map, key) => map.set(key, (map.get(key) || 0) + 1)
  let skillListing = null
  let agentLines = null
  let compactions = 0
  const seen = new Set()
  for (const e of entries) {
    if (e.subtype === 'compact_boundary' || e.isCompactSummary) compactions++
    const a = e.attachment
    if (e.type === 'attachment' && a) {
      if (a.type === 'skill_listing' && skillListing === null) skillListing = a.content
      if (a.type === 'agent_listing_delta' && agentLines === null) agentLines = (a.addedLines || []).join('\n')
    }
    const content = e.message && e.message.content
    if (e.type === 'assistant' && Array.isArray(content)) {
      for (const c of content) {
        if (!c || c.type !== 'tool_use' || (c.id && seen.has(c.id))) continue
        seen.add(c.id)
        if (c.name === 'Skill' && c.input && c.input.skill) bump(calls.skill, c.input.skill)
        else if ((c.name === 'Agent' || c.name === 'Task') && c.input) bump(calls.agent, c.input.subagent_type || 'general-purpose')
        else if (c.name.startsWith('mcp__')) bump(calls.mcp, c.name.split('__')[1])
      }
    }
    // A skill the user runs by name, such as a trio's `/<task>`, arrives as a command.
    if (e.type === 'user' && typeof content === 'string') {
      const m = /<command-name>\/?([^<\s]+)<\/command-name>/.exec(content)
      if (m) bump(calls.skill, m[1])
    }
  }
  return {
    file, mtime: mtimeOf(file), baseline: reqs[0].context, requests: reqs.length, compactions,
    calls, skillListing: skillListing && listingEntries(skillListing), agentListing: agentLines && listingEntries(agentLines),
  }
}

// A subagent's transcript sits in `<session>/subagents/`, beside a `.meta.json` that
// names its agent type.
function readRoleRuns(dir, sessionFiles) {
  const runs = new Map()
  for (const file of sessionFiles) {
    const sub = join(dir, basename(file, '.jsonl'), 'subagents')
    let names = []
    try { names = readdirSync(sub).filter((f) => f.endsWith('.jsonl')) } catch { continue }
    for (const name of names) {
      let type = 'unknown'
      try { type = JSON.parse(readText(join(sub, name.replace(/\.jsonl$/, '.meta.json')))).agentType || type } catch { /* no meta */ }
      const reqs = requests(jsonLines(join(sub, name)))
      if (!reqs.length) continue
      const r = runs.get(type) || { runs: 0, context: 0, output: 0, models: new Set() }
      r.runs++
      for (const q of reqs) { r.context += q.context; r.output += q.output; if (q.model) r.models.add(q.model) }
      runs.set(type, r)
    }
  }
  return runs
}

// ── The report ───────────────────────────────────────────────────────────────

function report(root) {
  const setup = readSetup(root)
  const dir = transcriptDir(root)
  const files = dir ? readdirSync(dir).filter((f) => f.endsWith('.jsonl')).map((f) => join(dir, f)) : []
  const sessions = files.map((f) => ({ f, t: mtimeOf(f) })).sort((a, b) => b.t - a.t).slice(0, SESSIONS)
    .map((s) => readSession(s.f)).filter(Boolean)
  const latest = sessions.find((s) => s.skillListing) || null
  const agentListing = (sessions.find((s) => s.agentListing) || {}).agentListing || null

  const L = []
  const row = (...cells) => L.push(`| ${cells.join(' | ')} |`)
  const head = (...cells) => { row(...cells); row(...cells.map(() => '---')) }
  const callsOf = (kind, name, since = 0) => sessions.filter((s) => s.mtime >= since).reduce((n, s) => n + (s.calls[kind].get(name) || 0), 0)
  const sessionsSince = (since) => sessions.filter((s) => s.mtime >= since).length

  L.push(`# Setup cost: ${root}`, '')
  L.push(`Sessions read: ${sessions.length}${files.length > sessions.length ? ` (the latest of ${files.length})` : ''}${dir ? '' : ' (no transcript folder for this path)'}`, '')

  // Always on
  const pluginNames = new Set(setup.plugins.map((k) => k.split('@')[0]))
  const projectSkills = new Set(setup.skills.map((s) => s.name))
  const projectAgents = new Set(setup.agents.map((a) => a.name))
  const listed = (entries, test) => (entries || []).filter((e) => test(e.name)).reduce((n, e) => n + tokens(e.text), 0)
  const always = []
  for (const c of setup.context) always.push([`\`${c.path}\`${c.imports.length ? `, importing ${c.imports.map((p) => `\`${p}\``).join(', ')}` : ''}`, c.tokens, 'file'])
  const unscoped = setup.rules.filter((r) => !r.scoped)
  if (unscoped.length) always.push([`Rules without \`paths:\` (${unscoped.length})`, unscoped.reduce((n, r) => n + r.tokens, 0), 'file'])
  if (setup.agents.length) {
    const fromListing = listed(agentListing, (n) => projectAgents.has(n))
    always.push([`Project agents (${setup.agents.length})`, fromListing || setup.agents.reduce((n, a) => n + a.tokens, 0), fromListing ? 'session' : 'file'])
  }
  if (setup.skills.length) {
    const fromListing = latest ? listed(latest.skillListing, (n) => projectSkills.has(n)) : 0
    always.push([`Project skills (${setup.skills.length})`, fromListing || setup.skills.reduce((n, s) => n + s.tokens, 0), fromListing ? 'session' : 'file'])
  }
  const pluginTokens = new Map()
  for (const p of pluginNames) {
    const of = (n) => n.split(':')[0] === p && n.includes(':')
    pluginTokens.set(p, latest ? listed(latest.skillListing, of) + listed(agentListing, of) : null)
  }
  const knownPlugins = [...pluginTokens.values()].filter((n) => n !== null)
  if (pluginNames.size) always.push([`Plugins enabled here (${pluginNames.size})`, knownPlugins.reduce((n, t) => n + t, 0), latest ? 'session' : 'unknown: no session yet'])
  const setupTotal = always.reduce((n, [, t]) => n + t, 0)

  L.push('## Always on: paid in every session, then read again with every request', '')
  head('Part', 'Tokens', 'Measured from')
  for (const [part, t, from] of always) row(part, `~${fmt(t)}`, from)
  row('**This setup, in total**', `**~${fmt(setupTotal)}**`, '')
  L.push('')

  if (sessions.length) {
    const avg = (f) => Math.round(sessions.reduce((n, s) => n + f(s), 0) / sessions.length)
    const baseline = avg((s) => s.baseline)
    const outside = latest ? listed(latest.skillListing, (n) => !projectSkills.has(n) && !pluginNames.has(n.split(':')[0])) +
      listed(agentListing, (n) => !projectAgents.has(n) && !pluginNames.has(n.split(':')[0])) : 0
    L.push(`Context at the first request, on average: ${fmt(baseline)} tokens. This setup is ${setupTotal * 100 < baseline ? 'under 1%' : `about ${Math.round((setupTotal / baseline) * 100)}%`} of it.`)
    L.push(`Skills and agents from outside this setup (user scope, other plugins, built in): ~${fmt(outside)} tokens. The rest is Claude Code's own prompt and tools, and the first message.`)
    L.push(`Requests per session, on average: ${avg((s) => s.requests)}. Compactions in these sessions: ${sessions.reduce((n, s) => n + s.compactions, 0)}.`, '')
  }

  // On demand
  const scoped = setup.rules.filter((r) => r.scoped)
  if (setup.nested.length || scoped.length) {
    L.push('## On demand: paid only in a session that opens a matching file', '')
    head('File', 'Tokens')
    for (const n of setup.nested) row(`\`${n.path}\``, `~${fmt(n.tokens)}`)
    for (const r of scoped) row(`\`${r.path}\``, `~${fmt(r.tokens)}`)
    L.push('')
  }

  // Sections of the root files
  for (const c of setup.context) {
    if (c.sections.length < 2) continue
    L.push(`## \`${c.path}\` by section, largest first`, '')
    head('Section', 'Tokens')
    for (const s of c.sections.slice(0, 8)) row(s.title.replace(/\|/g, '\\|'), `~${fmt(s.tokens)}`)
    L.push('')
  }

  if (!sessions.length) {
    L.push('No sessions for this project yet, so nothing below the always-on table is measured.')
    return L.join('\n')
  }

  // Use
  // A part missing from the latest listing did not load in that session.
  const skillNames = latest ? new Set(latest.skillListing.map((e) => e.name)) : null
  const agentNames = agentListing ? new Set(agentListing.map((e) => e.name)) : null
  const yesNo = (set, test) => (set === null ? '?' : [...set].some(test) ? 'yes' : '**no**')

  L.push('## Use in the sessions read', '')
  L.push('Sessions counts only the sessions since the file that added the part last changed, so a part added recently has fewer. Loaded says whether the latest session listed it.', '')
  head('Part', 'Kind', 'Always-on tokens', 'Loaded', 'Calls', 'Sessions')
  for (const p of pluginNames) {
    const ofPlugin = (n) => n.includes(':') && n.split(':')[0] === p
    const calls = (s) => [...s.calls.skill.entries(), ...s.calls.agent.entries()].filter(([n]) => ofPlugin(n)).reduce((n, [, c]) => n + c, 0)
    const since = sessions.filter((s) => s.mtime >= setup.pluginsSince)
    const t = pluginTokens.get(p)
    const named = setup.agents.filter((a) => a.skills.some((s) => s.split(':')[0] === p)).map((a) => a.name)
    const loaded = skillNames === null ? '?' : yesNo(new Set([...skillNames, ...(agentNames || [])]), ofPlugin)
    row(p, `plugin${named.length ? `, preloaded by ${named.join(', ')}` : ''}`, t === null ? '?' : `~${fmt(t)}`, loaded, since.reduce((n, s) => n + calls(s), 0), since.length)
  }
  for (const s of setup.skills) row(s.name, 'project skill', `~${fmt(s.tokens)}`, yesNo(skillNames, (n) => n === s.name), callsOf('skill', s.name, s.mtime), sessionsSince(s.mtime))
  for (const a of setup.agents) {
    const since = mtimeOf(join(root, a.path))
    row(a.name, 'project agent', `~${fmt(a.tokens)}`, yesNo(agentNames, (n) => n === a.name), callsOf('agent', a.name, since), sessionsSince(since))
  }
  const mcpSince = mtimeOf(join(root, '.mcp.json'))
  for (const m of setup.mcp) row(m, 'MCP server in `.mcp.json`', '?', '?', callsOf('mcp', m, mcpSince), sessionsSince(mcpSince))
  L.push('')

  // Role runs
  const runs = readRoleRuns(dir, sessions.map((s) => s.file))
  if (runs.size) {
    L.push('## Agent runs in the sessions read', '')
    L.push('Tokens read is every request\'s context added up: what the run paid to read, mostly from the cache.', '')
    head('Agent', 'Kind', 'Runs', 'Model', 'Tokens read per run', 'Output per run')
    for (const [type, r] of [...runs.entries()].sort((a, b) => b[1].context - a[1].context)) {
      const declared = setup.agents.find((a) => a.name === type)
      row(type, declared ? `project, declares ${declared.model}` : 'outside this setup', r.runs, [...r.models].join(', ') || '?',
        fmt(Math.round(r.context / r.runs)), fmt(Math.round(r.output / r.runs)))
    }
    L.push('')
  }

  return L.join('\n')
}

console.log(report(resolve(process.argv[2] || process.cwd())))
