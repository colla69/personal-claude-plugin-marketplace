#!/usr/bin/env node
// Turns the JSON that `claude plugin eval --json` writes into one summary line:
// the date, the commit, the models, the version of the CLI, and every case with
// the score of each run. The line is what measurements/results.jsonl keeps; the
// raw output stays out of git.
//
//   node scripts/eval-summary.mjs <result.json>            print the line
//   node scripts/eval-summary.mjs <result.json> --append   also add it to results.jsonl
//
// The model IDs are not in the result file. The line records the pinned ones unless
// the caller passes --model and --judge-model.

import { readFileSync, appendFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const RESULTS = join(root, 'measurements', 'results.jsonl')

// Pinned by full ID: the house rule that agents use aliases governs agent files,
// not the measurement, which has to hold the model still. A line made with other
// models says so with --model and --judge-model.
export const MODEL = 'claude-sonnet-5-5'
export const JUDGE = 'claude-haiku-5-5'

const round = (n) => (typeof n === 'number' ? Math.round(n * 1000) / 1000 : n)

function commit() {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}

export function summarize(result, { suite, model = MODEL, judgeModel = JUDGE, ref = commit() } = {}) {
  const cases = result.cases.map((c) => ({
    name: c.name,
    with: c.arms.with.map((r) => round(r.score)),
    without: (c.arms.without ?? []).map((r) => round(r.score)),
    score: round(c.aggregates.score),
    scoreWithout: round(c.aggregates.scoreWithout),
    delta: round(c.aggregates.delta),
  }))
  return {
    date: result.startedAt.slice(0, 10),
    commit: ref,
    suite: suite ?? result.suite.plugins?.[0]?.name ?? 'unknown',
    model,
    judgeModel,
    claudeVersion: result.claudeVersion,
    runs: Math.max(...cases.map((c) => c.with.length)),
    ablation: result.suite.ablation,
    overallScore: round(result.aggregates.overallScore),
    meanDelta: round(result.aggregates.meanDelta),
    cases,
    costUsd: round(result.costUsd),
    durationSeconds: result.durationSeconds,
    partial: Boolean(result.partial),
  }
}

export function append(line) {
  appendFileSync(RESULTS, JSON.stringify(line) + '\n')
}

function main(argv) {
  const flags = {}
  const files = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--append') flags.append = true
    else if (argv[i] === '--model') flags.model = argv[++i]
    else if (argv[i] === '--judge-model') flags.judgeModel = argv[++i]
    else if (argv[i] === '--suite') flags.suite = argv[++i]
    else files.push(argv[i])
  }
  if (files.length !== 1) {
    console.error('usage: eval-summary.mjs <result.json> [--append] [--model id] [--judge-model id] [--suite name]')
    process.exit(2)
  }
  const line = summarize(JSON.parse(readFileSync(files[0], 'utf8')), flags)
  console.log(JSON.stringify(line))
  if (flags.append) append(line)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2))
