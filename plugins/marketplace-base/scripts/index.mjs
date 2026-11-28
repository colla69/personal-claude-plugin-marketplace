#!/usr/bin/env node
// SessionStart: prints a compact index of every standard in the marketplace, installed
// here or not, so the session can say "there's a standard for that" without anyone
// asking. Claude Code adds a SessionStart hook's output to the session's context.
// It also says when the project's choice of standards is behind the marketplace: a
// standard added since the last docking, or a plugin enabled here that no longer exists.

import { readInput, readJson, insideCollector, marketplace, projectSettings, projectDir, userSettings } from './lib.mjs'

if (insideCollector()) process.exit(0)

const market = marketplace()
if (!market) process.exit(0)

const catalog = readJson(market.catalog, { plugins: [] })
// Enabled for the person everywhere, or in this project; the project's word wins.
const project = projectSettings(projectDir(readInput()))
const enabled = { ...(userSettings().enabledPlugins ?? {}), ...project.enabledPlugins }
const isEnabled = (name) => enabled[`${name}@${market.name}`] === true

// The marketplace's own parts are not standards anyone applies to the work.
const standards = (catalog.plugins ?? []).filter((p) => p.category !== 'marketplace')
if (standards.length === 0) process.exit(0)

const lines = standards.map((p) => `${isEnabled(p.name) ? '✓' : '-'} ${p.name}: ${p.description ?? ''}`)

// The standards the steward weighed when it last docked or refreshed this project.
const docked = project.env.STEWARD_DOCKED_WITH === undefined ? undefined : String(project.env.STEWARD_DOCKED_WITH)
const weighed = new Set((docked ?? '').split(',').map((s) => s.trim()).filter(Boolean))
const added = docked === undefined ? [] : standards.map((p) => p.name).filter((n) => !weighed.has(n))
const known = new Set((catalog.plugins ?? []).map((p) => p.name))
const gone = Object.keys(project.enabledPlugins)
  .filter((key) => project.enabledPlugins[key] === true && key.endsWith(`@${market.name}`))
  .map((key) => key.slice(0, -market.name.length - 1))
  .filter((n) => !known.has(n))

const behind = []
if (docked === undefined) behind.push('this project was docked before the marketplace recorded which standards it weighed')
if (added.length) behind.push(`new since the last docking: ${added.join(', ')}`)
if (gone.length) behind.push(`enabled here but no longer in the marketplace: ${gone.join(', ')}`)
const update = behind.length
  ? [
      `The setup needs an update: ${behind.join('; ')}. Tell the user so in one line at the start of your first reply, and offer to have the steward refresh the setup.`,
    ]
  : []

console.log(
  [
    `Standards in the ${market.name} marketplace. ✓ marks the ones enabled in this project.`,
    ...lines,
    'When a task falls under a standard that is not enabled here, say so in one line and offer to add it; the steward does that. For hard, open-ended work, suggest planning in plan mode first.',
    ...update,
  ].join('\n'),
)
