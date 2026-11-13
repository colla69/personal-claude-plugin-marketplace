#!/usr/bin/env node
// The skill check: runs one plugin's cases with and without the plugin, then
// compares with `main`, not with nothing. The cases are in evals/<plugin>/, outside
// the plugin, so an install carries none; each run stages them next to a copy of the
// plugin, because the engine reads cases from inside it.
//
//   node scripts/eval-skill.mjs <plugin>            while working: 3 runs, prints only
//   node scripts/eval-skill.mjs <plugin> --decide   when contributing: 5 runs, fresh
//                                                   baseline, one line in results.jsonl
//
//   --case <glob>      run one case
//   --runs <n>         override the runs per case
//   --max-cost <usd>   the cost cap of each engine call (3 working, 10 deciding)
//   --allow-tools <t>  tools the cases may use (default: Write,Edit)
//   --against <spec>   compare with this result instead of the stored one; see
//                      eval-compare.mjs for the forms
//   --ref <ref>        the baseline version (default: main)
//   --save <dir>       keep the engine's raw output (result.json, report.html) in <dir>
//                      (default: a new folder per run under <tmp>/eval-skill-runs/,
//                      so a later run never overwrites one you still have to read)
//   --fails            under the lift, print every failing run of every grader: its
//                      judge votes and the start of the reply. Read them before a
//                      verdict, because a judge can fail a plain right answer
//   --probe            run the cases WITHOUT the skill only, at 3 runs: a case whose
//                      baseline is already high cannot show a lift. Stores nothing.
//   --ablate <sel>     run the skill whole, then with the slices <sel> cut (selectors in
//                      skill-slices.mjs), both with the skill only, and compare. A case
//                      that gets worse beyond noise is a case the slice carries. Only a
//                      case where the whole skill beats the baseline can show this, so
//                      read it beside the lift table. Stores nothing.
//
// The baseline while working is the last line of measurements/results.jsonl with the
// same suite and models. With none, or with --decide, the cases run against <ref> in
// a temporary worktree: the cases of this checkout, the skill of <ref>.
//
// --decide measures this checkout, so it refuses a dirty plugin or cases folder, --case, and
// fewer than 5 runs: a stored line must be a whole, committed suite. The line it stores
// is the branch's. Once the branch merges, it is `main`'s, and the working mode
// compares with the stored lines whose commit is already on <ref>. Raising the runs
// to 10 when the interval straddles zero, and measuring the floor again, wait for
// phase 2.
//
// The lift prints a second table, passes per grader and arm, since a grader is one rule
// and a rule is kept or cut on its own.
//
// A result with `partial: true` is printed but marked, and --decide does not store it.
// The collector of marketplace-base would file issues on the public repo from inside a
// run, so a suite for that plugin is refused here.

import { readFileSync, existsSync, mkdtempSync, cpSync, rmSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawnSync, execFileSync } from 'node:child_process'
import { summarize, append, RESULTS, MODEL, JUDGE } from './eval-summary.mjs'
import { compare, table, load, interval } from './eval-compare.mjs'
import { cutCopy } from './skill-slices.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'marketplace-base'

const args = { plugin: null, decide: false, probe: false, ablate: null, ref: 'main', allowTools: 'Write,Edit' }
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--decide') args.decide = true
  else if (a === '--probe') args.probe = true
  else if (a === '--ablate') args.ablate = argv[++i]
  else if (a === '--case') args.case = argv[++i]
  else if (a === '--runs') args.runs = Number(argv[++i])
  else if (a === '--max-cost') args.maxCost = Number(argv[++i])
  else if (a === '--allow-tools') args.allowTools = argv[++i]
  else if (a === '--against') args.against = argv[++i]
  else if (a === '--ref') { args.ref = argv[++i]; args.refGiven = true }
  else if (a === '--save') args.save = resolve(argv[++i])
  else if (a === '--fails') args.fails = true
  else if (a.startsWith('--')) usage(`unknown flag ${a}`)
  else if (!args.plugin) args.plugin = a
  else usage('one plugin at a time')
}
if (!args.plugin) usage()
args.runs ??= args.decide ? 5 : 3
args.maxCost ??= args.decide ? 10 : 3
args.save ??= join(tmpdir(), 'eval-skill-runs', `${args.plugin}-${new Date().toISOString().replace(/[:.]/g, '-')}`)

function usage(why) {
  if (why) console.error(why)
  console.error('usage: eval-skill.mjs <plugin> [--decide|--probe|--ablate sel] [--case glob] [--runs n] [--max-cost usd] [--against spec] [--ref ref] [--save dir] [--fails]')
  process.exit(2)
}

const dir = join(root, 'plugins', args.plugin)
// The cases live beside the plugins, never in them, so an install carries none.
const cases = join(root, 'evals', args.plugin)
if (!existsSync(cases)) usage(`${args.plugin} has no cases in evals/${args.plugin}/`)

const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
if (args.probe && args.decide) usage('--probe measures the baseline only; --decide stores a lift')
if (args.ablate && (args.decide || args.probe || args.against || args.refGiven)) usage('--ablate compares two cuts of this checkout; drop --decide, --probe, --against and --ref')
if (args.probe && (args.against || args.refGiven)) usage('--probe has no baseline version to compare with; drop --against and --ref')
if (args.decide) {
  if (args.case || args.runs < 5) usage('--decide runs the whole suite, at 5 runs or more')
  if (git('status', '--porcelain', '--', `plugins/${args.plugin}`, `evals/${args.plugin}`).trim()) {
    usage(`--decide measures what is committed: commit the changes to plugins/${args.plugin} and evals/${args.plugin} first`)
  }
}

const manifest = JSON.parse(readFileSync(join(dir, '.claude-plugin', 'plugin.json'), 'utf8'))
const dependencies = (manifest.dependencies ?? []).map((d) => (typeof d === 'string' ? d : d.name))
if (args.plugin === BASE || dependencies.includes(BASE)) {
  console.error(`Refused: ${args.plugin} is or builds on ${BASE}, whose collector could file an issue from inside a run.`)
  process.exit(2)
}
if (dependencies.length) {
  console.error(`Note: ${args.plugin} builds on ${dependencies.join(', ')}. The engine loads only the plugin under test, so a rule from those plugins is missing in both arms.`)
}

// One engine call. The engine reads its cases from inside the plugin, so each call runs
// on a copy of `plugin` with this checkout's cases put in. The same cases then measure
// any version of the skill, and the skill's own folder holds no test.
function runEngine(plugin, outDir) {
  const stage = mkdtempSync(join(tmpdir(), 'eval-stage-'))
  try {
    const copy = join(stage, args.plugin)
    cpSync(plugin, copy, { recursive: true })
    rmSync(join(copy, 'evals'), { recursive: true, force: true })
    cpSync(cases, join(copy, 'evals'), { recursive: true })
    // The engine loads no dependency, and a plugin with one it can't meet fails to load
    // in most runs. The copy declares none, so the plugin under test loads on its own.
    const manifestPath = join(copy, '.claude-plugin', 'plugin.json')
    const { dependencies: _, ...own } = JSON.parse(readFileSync(manifestPath, 'utf8'))
    writeFileSync(manifestPath, JSON.stringify(own, null, 2))
    if (args.probe) stripSkill(copy)
    return engine(copy, outDir)
  } finally {
    rmSync(stage, { recursive: true, force: true })
  }
}

// The baseline arm: the same plugin with no skill in it, run as one arm. A grader that
// asks whether the skill fired would fail by design, so those go too.
function stripSkill(copy) {
  rmSync(join(copy, 'skills'), { recursive: true, force: true })
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (d.endsWith('graders') && /^tool:\s*['"]?Skill['"]?\s*$/m.test(readFileSync(p, 'utf8'))) rmSync(p)
    }
  }
  walk(join(copy, 'evals'))
}

function engine(plugin, outDir) {
  const out = join(outDir, 'result.json')
  const cmd = [
    'plugin', 'eval', plugin, '--scaffold', '--trust-plugin', '--no-publish',
    '--runs', String(args.runs), '--max-cost-usd', String(args.maxCost),
    '--model', MODEL, '--judge-model', JUDGE, '--allow-tools', ...args.allowTools.split(','),
    '--json', out, '--output-dir', outDir, '--report', join(outDir, 'report.html'),
  ]
  if (args.probe || args.ablate) cmd.push('--ablation', 'none')
  if (args.case) cmd.push('--case', args.case)
  const run = spawnSync('claude', cmd, { stdio: ['ignore', 'ignore', 'inherit'], cwd: root })
  if (!existsSync(out)) throw new Error(`The engine wrote no result (exit ${run.status}).`)
  if (args.save) cpSync(outDir, join(args.save, basename(outDir)), { recursive: true })
  const line = summarize(JSON.parse(readFileSync(out, 'utf8')), { suite: args.plugin, model: MODEL, judgeModel: JUDGE })
  // A case that fails to load is dropped without a word, and the table looks whole.
  const wanted = readdirSync(cases, { withFileTypes: true }).filter((d) => d.isDirectory()).length
  if (!args.case && !line.partial && line.cases.length !== wanted) {
    throw new Error(`${wanted} cases in evals/${args.plugin}/, but the engine ran ${line.cases.length}. A case file is invalid; see the lines above.`)
  }
  return line
}

function existsAt(ref) {
  try { git('cat-file', '-e', `${ref}:plugins/${args.plugin}/.claude-plugin/plugin.json`); return true } catch { return false }
}

// The cases of this checkout against the skill of <ref>, read from a temporary worktree.
function runBaseline(outDir) {
  try {
    git('cat-file', '-e', `${args.ref}:plugins/${args.plugin}/.claude-plugin/plugin.json`)
  } catch {
    throw new Error(`${args.plugin} does not exist at ${args.ref}, so there is no baseline to compare with. Read the lift table.`)
  }
  const tree = mkdtempSync(join(tmpdir(), 'eval-base-'))
  try {
    git('worktree', 'add', '--detach', tree, args.ref)
    return runEngine(join(tree, 'plugins', args.plugin), outDir)
  } finally {
    try { git('worktree', 'remove', '--force', tree) } catch { /* never added */ }
    rmSync(tree, { recursive: true, force: true })
  }
}

function stored(suite, claudeVersion) {
  if (!existsSync(RESULTS)) return null
  const onRef = (commit) => {
    try { git('merge-base', '--is-ancestor', commit, args.ref); return true } catch { return false }
  }
  const lines = readFileSync(RESULTS, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
  return lines.reverse().find((l) => l.suite === suite && l.model === MODEL && l.judgeModel === JUDGE
    && l.claudeVersion === claudeVersion && !l.partial && onRef(l.commit)) ?? null
}

const f2 = (n) => (Number.isFinite(n) ? n.toFixed(2) : '-')
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1)

function lift(line) {
  const out = ['| Case | With | Without | Δ | 90% interval |', '|---|---|---|---|---|']
  for (const c of line.cases) {
    const [lo, hi] = interval(c.without, c.with)
    out.push(`| ${c.name} | ${f2(mean(c.with))} | ${f2(mean(c.without))} | ${f2(mean(c.with) - mean(c.without))} | ${f2(lo)} to ${f2(hi)} |`)
  }
  return out.join('\n')
}

// Passes per grader and arm, from the engine's raw result. A grader that only the arm
// with the skill has, such as "the skill fired", shows "-" without.
function byGrader(result) {
  const out = ['| Case | Grader | With | Without |', '|---|---|---|---|']
  const fails = []
  for (const c of result.cases) {
    const t = new Map()
    for (const [arm, runs] of Object.entries(c.arms)) {
      runs.forEach((run, i) => {
        for (const g of run.graders ?? []) {
          if (!t.has(g.name)) t.set(g.name, {})
          const cell = (t.get(g.name)[arm] ??= [0, 0])
          cell[1]++
          if (g.passed) cell[0]++
          else fails.push(`- ${c.name} / ${g.name} / ${arm} run ${i + 1}: ${g.explanation ?? ''}\n  ${String(g.evidence ?? '').replace(/\s+/g, ' ').slice(0, 300)}`)
        }
      })
    }
    for (const [name, a] of t) {
      const cell = (x) => (x ? `${x[0]}/${x[1]}` : '-')
      out.push(`| ${c.name} | ${name} | ${cell(a.with)} | ${cell(a.without)} |`)
    }
  }
  return { table: out.join('\n'), fails }
}

const CEILING = 0.8

function probe(line) {
  const out = ['| Case | Baseline | Runs | Reading |', '|---|---|---|---|']
  let high = 0
  for (const c of line.cases) {
    const m = mean(c.with)
    const hard = m < CEILING
    if (!hard) high++
    out.push(`| ${c.name} | ${f2(m)} | ${c.with.map(f2).join(' ')} | ${hard ? 'room for a lift' : 'model passes without the skill: rewrite or drop'} |`)
  }
  return out.join('\n') + `\n\n${high} of ${line.cases.length} cases are at or above ${CEILING} without the skill.`
}

const work = mkdtempSync(join(tmpdir(), 'eval-skill-'))
// A signal skips `finally`, so turn it into an exit that runs it.
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130))
function liftCheck() {
  const now = runEngine(dir, join(work, 'now'))
  console.log(`## ${args.plugin}: lift of the skill (${now.runs} runs, ${now.claudeVersion}, $${f2(now.costUsd)})\n`)
  console.log(lift(now))
  if (now.partial) console.log('\nPartial result: the cost cap or a time-out cut the run. Not used for any decision.')
  const graders = byGrader(JSON.parse(readFileSync(join(work, 'now', 'result.json'), 'utf8')))
  console.log(`\n## Passes per grader\n\n${graders.table}\n\nKeep a rule whose grader passes 2 or more runs more with the skill than without; one is noise.`)
  if (args.fails) console.log(`\n## Failing runs\n\n${graders.fails.join('\n') || 'None.'}`)
  console.log(`\nEvery run's output is in ${join(args.save, 'now')}.`)

  let before = null
  let label = ''
  if (args.against) {
    before = load(args.against)
    label = args.against
  } else if (!args.decide) {
    before = stored(args.plugin, now.claudeVersion)
    label = `the last stored result on ${args.ref}`
  }
  if (!before && !existsAt(args.ref)) {
    console.log(`\n${args.plugin} does not exist at ${args.ref}, so there is nothing to compare with. The tables above are the measurement.`)
  } else {
    if (!before) {
      before = runBaseline(join(work, 'base'))
      label = `${args.ref} (run now, $${f2(before.costUsd)})`
    }
    console.log(`\n## Compared with ${label}\n`)
    console.log(table(compare(before, now)))
  }

  if (args.decide && !now.partial) {
    append(now)
    console.log(`\nStored one line in ${RESULTS.replace(root + '/', '')}. Put the tables above in the pull request.`)
  } else if (!args.decide) {
    console.log('\nNothing stored. This tells you where to look; a decision needs --decide.')
  }
}

function probeCheck() {
  const base = runEngine(dir, join(work, 'now'))
  console.log(`## ${args.plugin}: baseline without the skill (${base.runs} runs, ${base.claudeVersion}, $${f2(base.costUsd)})\n`)
  console.log(probe(base))
  console.log('\nNothing stored.')
}

function ablateCheck() {
  // Cut first: a selector that matches nothing must fail before any run is paid for.
  const cutDir = cutCopy(args.plugin, args.ablate, join(work, 'cut-src'))
  const full = runEngine(dir, join(work, 'full'))
  const cut = runEngine(cutDir, join(work, 'cut'))
  console.log(`## ${args.plugin}: the skill with "${args.ablate}" cut (${full.runs} runs, ${full.claudeVersion}, $${f2(full.costUsd + cut.costUsd)})\n`)
  console.log(table(compare(full, cut)))
  console.log('\nBefore is the whole skill, After is the cut skill. "worse" means the slice carries that case; "within noise" means the cut cost nothing the cases can see.')
  console.log('Nothing stored. Run it after the lift table: a case the whole skill does not lift cannot show what a slice adds.')
}

try {
  if (args.ablate) ablateCheck()
  else if (args.probe) probeCheck()
  else liftCheck()
} finally {
  rmSync(work, { recursive: true, force: true })
}
