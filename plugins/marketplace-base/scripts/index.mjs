#!/usr/bin/env node
// SessionStart: prints a compact index of every standard in the marketplace, installed
// here or not, so the session can say "there's a standard for that" without anyone
// asking. Claude Code adds a SessionStart hook's output to the session's context.

import { readInput, readJson, insideCollector, marketplace, projectSettings, projectDir, userSettings } from './lib.mjs'

if (insideCollector()) process.exit(0)

const market = marketplace()
if (!market) process.exit(0)

const catalog = readJson(market.catalog, { plugins: [] })
// Enabled for the person everywhere, or in this project; the project's word wins.
const enabled = { ...(userSettings().enabledPlugins ?? {}), ...projectSettings(projectDir(readInput())).enabledPlugins }
const isEnabled = (name) => enabled[`${name}@${market.name}`] === true

// The marketplace's own parts are not standards anyone applies to the work.
const standards = (catalog.plugins ?? []).filter((p) => p.category !== 'marketplace')
if (standards.length === 0) process.exit(0)

const lines = standards.map((p) => `${isEnabled(p.name) ? '✓' : '-'} ${p.name}: ${p.description ?? ''}`)

console.log(
  [
    `Standards in the ${market.name} marketplace. ✓ marks the ones enabled in this project.`,
    ...lines,
    'When a task falls under a standard that is not enabled here, say so in one line and offer to add it; the steward does that. For hard, open-ended work, suggest planning in plan mode first.',
  ].join('\n'),
)
