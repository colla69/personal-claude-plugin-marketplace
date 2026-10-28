# Measurement: plan

How the marketplace gets numbers that show whether a skill, a hook or the steward helps,
and what it costs. D and M numbers here are proposals. They enter `decisions.md` when the
plan is approved.

**Status:** direction approved 2026-10-28, on branch `feature/measurement-plan`. The
maintainer added two checks (section 4a): a single-skill check for working and for
contributing, and a benchmark that docks four real open-source projects with the old and
the new steward, then runs tasks on them. The maintainer agreed with the dependency rule
(M1), relaxed the project-name rule (M7) and chose the version before (M9). Nothing is
built. Phase 0 starts after the maintainer reads this version.

---

## 1. Why

The checks in this repo say a thing is well formed. None says it helps.

| Tool | It measures | The gap |
|---|---|---|
| `check-catalog.mjs`, `check-docs.mjs`, `claude plugin validate` | Shape: registrations, layers, links | Nothing about output quality |
| `claude plugin details` | Always-on and on-invoke tokens | Run by hand, never compared between commits |
| `measure-setup.mjs` | The cost of one project's setup | No real project measured |
| `evaluate-skills` | A model's opinion of a skill | An opinion, not a measurement |
| `claude plugin eval` | Output with the plugin against output without it | One case, for one plugin |

So a change merges on feel. This plan replaces the feel with a number.

## 2. Principles

1. **A skill earns its place by lift.** It stays when its evals score higher with it than
   without it, by more than the run-to-run noise.
2. **Cost is half the verdict.** Each result shows the always-on tokens and the tokens per
   task, next to the score.
3. **Deterministic graders first.** A pattern, a file or a tool call beats a judge. A judge
   is allowed only where nothing deterministic exists. It has a fixed rubric and a pinned
   model.
4. **Noise is measured.** Each suite runs on `main` twice first. A difference counts only
   when it is larger than that.
5. **Results are files in the repo.** Each line names a commit, a model and a CLI version.
6. **Start small.** Three skills measured well beat twenty measured badly.

## 3. The engine and its limits

`claude plugin eval` exists in the installed CLI. What it gives, and what it does not:

- The engine reads a case from a folder `<plugin>/evals/<case>/` with `prompt.md`, `graders/*.md` and an
  optional `case.yaml`. `context.scaffold_script` builds a fixture, and needs `--scaffold`.
- Free graders: `regex`, `tool_used`, `tool_order`, `file_exists`. Paid graders: `llm` and
  `baseline`. There is no custom code grader. To check that tests pass, the case asks
  Claude to write the result to a file, and a `regex` grades the file.
- Two arms by default, 3 runs each (`--runs` takes 1 to 50). Δ is with minus without.
  `tool_used: Skill` graders are not scored in two-arm runs, so a trigger suite uses
  `--ablation none`.
- `--json` writes a versioned result: scores, deltas, `costUsd`, `durationSeconds`,
  `claudeVersion`. `--max-cost-usd`, `--model`, `--judge-model` and `--trust-plugin` set
  the cost cap, the two models and the CI trust answer.
- There is no mode that compares a branch with `main`. We run the suite on both checkouts
  and compare the two files with our own script.

## 4. The seven layers

From cheap and certain to costly and real. Each answers one question a merge needs.

| # | Layer | Question | How | Runs |
|---|---|---|---|---|
| 1 | Static cost | What does this add to every session? | `plugin details` per plugin, diffed against `main` | Every PR, no model |
| 2 | Triggering | Does the skill load when it should, and stay quiet when it should not? | About 6 should-fire and 4 near-miss prompts, `tool_used: Skill`, `--ablation none`, with the plugins a typical project loads | PR that touches a description |
| 3 | Skill lift | Does the skill beat no skill? | 3 to 5 cases on synthetic fixtures, with and without | PR that touches a skill; weekly |
| 4 | Change lift | Is this version better than `main`? | The layer 3 suite on both checkouts, compared | PR that touches a skill |
| 5 | Benchmark | Does docking pick the right plugins, and is the new steward better than the old? | Four pinned public projects, docked with both versions (section 4a) | Before a `marketplace-` change merges; monthly |
| 6 | Guard | Does the guard catch breakage without wasting runs? | Synthetic fixture repos with a known answer | PR that touches the base plugin |
| 7 | Field | Does it help on real projects? | `measure-setup.mjs` and a one-line log, before and after docking | People's time |

Layer 3 cases carry one grader on the result and one on the process. A case prefers a
`regex` on file content: a Java 8 `pom.xml` and a data class must not contain `record `;
a commit must match the Conventional Commits pattern; a review of a seeded bug must name
its file and line.

Layers 2, 3 and 6 use synthetic fixtures built by a script, so a case sees the same input
every time. Layer 5 is the one place that uses real projects.

## 4a. Two checks

Two checks, for two jobs. They share the compare code, so a number in the terminal and a
number in a PR comment mean the same thing.

### The skill check: one skill, while working and when contributing

`node scripts/eval-skill.mjs <plugin>` runs layers 2 and 3 of one plugin, with its
dependencies, once the engine can load them (M1). It compares with `main`, not with nothing.

| | While working | When contributing |
|---|---|---|
| Flag | none | `--decide` |
| `--runs` | 3 | 5, and 10 when the interval straddles zero |
| Compares with | The last stored `main` result for the same model and CLI version. If none exists, it runs `main` in a temporary git worktree | A fresh `main` run, and the noise floor measured again |
| Cost | A cap of a few dollars, so it is fine to run often | A larger cap |
| Output | A table in the terminal. Nothing is kept | The table for the PR, and one line in `results.jsonl` |
| Counts for a decision | No. It tells you where to look | Yes |

`--case <glob>` runs one case, in seconds, while a rule is being rewritten.

The contribution part is a change to the curator's `contribute.md`: before it opens a
pull request that touches a skill, it runs `eval-skill.mjs --decide` and puts the table
in the description. That is a change to a `marketplace-` plugin, so it follows
`work-on-the-steward.md` and gets a decision entry. Until it lands, the PR author runs the
command by hand.

### The benchmark: the whole marketplace and the steward, on real projects

`node scripts/benchmark-dock.mjs` docks four public open-source projects with the
steward as it was and with the steward as it is now, and compares the two. It runs before
a change to a `marketplace-` plugin, to the catalog or to a hook merges, and monthly. It
costs far more than a skill check, so it never runs on every PR.

**The four projects.** Public repositories, each pinned to one commit, so every run sees
the same files. They differ in size and in kind. Proposed 2026-10-28; license and size
checked with `gh api` the same day, and the commits are pinned in phase 5:

| Kind | Candidate | License | Size | Why it is in the set |
|---|---|---|---|---|
| A small library in one language | `sindresorhus/ky` | MIT | 1 MB, TypeScript | The easy case. Docking should install little |
| A mid-size web app | `elk-zone/elk` | MIT | 18 MB, Vue and TypeScript | Tests the frontend standards and the pick between near neighbours (`tools-vue`, `tools-vue-typescript`, `tools-pinia`) |
| A mid-size backend service | `spring-petclinic/spring-petclinic-microservices` | Apache-2.0 | 8 MB, Java, several modules | Tests the language and build signals |
| A folder of prose with little or no code | `ossu/computer-science` | MIT | 1 MB, Markdown and HTML | Tests the claim that the marketplace is not only for code |

A large repo with several languages was in the first proposal (`apache/superset`) and is
left out for now: a shallow clone is still big, and a docking run on it is slow and
costs a lot. It would test over-installing, since the catalog has no Python standard.
Add it later if the four show docking installing too much.

Spares if one fails the first docking run: `sindresorhus/p-map` (a smaller library),
`spring-projects/spring-petclinic` (a single-module Java app) and `excalidraw/excalidraw`
(MIT, 106 MB, a larger TypeScript app). The Turing Way was considered for the prose slot
and dropped: its license shows no SPDX id and the repo is 700 MB.

Each entry in `measurements/benchmark/projects.json` holds the URL, the commit, the
license, the size, and a **hand-written expected set**: the plugins a person reading the
stack would install, and the ones that would be wrong. The curator who writes an expected
set is not the one who judges the steward against it.

**One run, per project and per steward version.**
1. Copy the project at its commit into a temporary folder. The copy is the only place
   anything is written. The clone cache sits outside this repo.
2. Dock the copy with that version of the steward, in dry-run mode (a prerequisite:
   section 9). The version before is a git worktree of `main`, or of the last tag, loaded
   with `--plugin-dir`.
3. Dock the copy a second time. `dock.md` says two runs on one project must install the
   same set, so a run that differs is a result.
4. Record the plugin set, the written `CLAUDE.md` and settings, the always-on tokens
   (from `measure-setup.mjs`), the questions asked, and the cost and time of docking.

**What the report compares.**

| Measure | How | Grader |
|---|---|---|
| Docking accuracy | Plugins installed against the expected set: missed, wrong, extra | Set comparison, free |
| Stability | Do two runs on the same project install the same set? | Set comparison, free |
| Setup cost | Always-on tokens of the docked setup, before and after | `measure-setup.mjs`, free |
| What changed since the last version | Plugin set, `CLAUDE.md` size and settings, diffed per project | A diff, free |
| Cost of docking | `costUsd` and wall time | From the result |

Stage 1 is only the table above, and needs no judge.

**Stage 2: tasks on the real projects.** Two tasks per project to start, run docked
against undocked, with Δ and its interval as for any skill. It answers the question stage
1 cannot: does the setup the steward chose make Claude better on that project?

- **Tasks that need no build.** Real projects need their dependencies installed, and that
  costs time and the network. So the tasks are chosen to be graded without a build: a
  seeded change to review (the final message names the file and line), a staged change to
  commit (the message matches the pattern the docked standards ask for), a test to add
  (the new file exists, and a `regex` finds the project's test idiom). A task that is best
  graded by running the project's tests waits until that project's dependencies are
  cached.
- **Seeded by script.** A script applies the same patch to the copy before each run, so
  the input is the same every time. The seeded patches are checked in. The projects are
  not.
- **No network during the run.** The pinned clone is fetched once by the benchmark script,
  and every case works on a copy of the local clone.
- **The arms.** Docked: the plugin set the steward chose, passed as the case's plugin
  list. Undocked: nothing. Phase 5 probes whether `claude plugin eval` takes the list per
  case. If it does not, the script drives `claude -p` itself, with the same graders.
- **Cost.** Two tasks, two arms, three runs, four projects is 48 agent runs, on large
  repos. Stage 2 runs only when stage 1 is stable, and under its own cap, set from what
  stage 1 cost.

**Safety.** Read-only clones. No push, no issue and no pull request against any of the
four. The collector is off. The steward's `claude plugin install` never runs, because the
dry-run mode writes the intended settings and stops.

## 5. Noise and the decision rules

**Measure the floor first.** Run each pilot suite on `main` twice, at `--runs 5`. Per case,
the floor is the absolute difference of the two scores. Per suite, the largest one is the
floor. It goes in `measurements/noise.json`, keyed by suite, model and CLI version, and is
measured again when any of the three changes.

**Hold the variables still.** Pin the agent and the judge by full model ID, not by alias.
The house rule that agents use aliases governs agent files, not eval config. A new CLI or
model means a new baseline before any comparison. Fixtures are synthetic and checked in.

**Statistics.** Use the per-run scores. Report a 90% bootstrap interval on Δ and on
branch-minus-`main`, with a few hundred resamples and no dependency. Explore at `--runs 3`.
Decide at `--runs 5` or more, and at 10 when the interval straddles zero.

| Situation | Rule |
|---|---|
| A skill's place | Keep when mean Δ is above the floor and the interval's lower bound is above 0. Otherwise rework once, then retire |
| A change to a skill | Merge when no case drops beyond the floor. Claim a gain only when a case rises beyond it |
| A change that adds always-on tokens | Needs a measured gain on layer 2 or 3 that a reviewer judges worth it. The PR states both numbers |
| A description change | Recall must not fall and false fires must not rise on layer 2 |
| A result with `partial: true` or `skippedPaidGraders` | Not used for any decision |
| No evals for the skill touched | The PR says so. After phase 4 it does not merge |

The thresholds are starting points. Revisit them after the pilot.

## 6. Storage and reporting

Raw output stays out of git. One summary line per suite run goes in.

| File | What it holds | Written by |
|---|---|---|
| Raw eval output | Kept in a temporary folder and deleted. CI keeps `aggregate-result.json` and `report.html` as artifacts | `claude plugin eval` |
| `measurements/results.jsonl` | One line per suite run: date, commit, suite, both model IDs, `claudeVersion`, runs, ablation, `overallScore`, `meanDelta`, cases with per-run scores, `costUsd`, `durationSeconds`, `partial` | `scripts/eval-summary.mjs` |
| `measurements/noise.json` | The noise floor per suite, model and CLI version | By hand, from two runs |
| `measurements/cost.json` | Always-on and on-invoke tokens per plugin, on `main` | `scripts/cost-report.mjs` |

`scripts/eval-compare.mjs` takes two result files and prints, per case, the score on each
side, the difference and whether it is beyond the floor. CI posts it as a PR comment.

## 7. Phases

Each phase is one pull request or a few. Phases 0 to 3 are the core, in order.

**Phase 0: harness and hygiene.**
- Create `measurements/` with an empty
  `results.jsonl` and a short README.
- Make sure no eval run can reach the collector. The engine loads only the plugin under
  test, with a temporary home and config, so no hook of `marketplace-base` runs in an eval
  of another plugin. `eval-skill.mjs` refuses a suite for `marketplace-base` or a plugin
  that builds on it. Phases 5 and 6 test that plugin, and `collect.mjs` must honor an
  `EVAL_*` switch before they run. A leak here files issues on the public repo.
- Write `eval-summary.mjs` and `eval-compare.mjs`: plain Node, no dependency.
- Write `eval-skill.mjs`, the skill check of section 4a, on top of them.
- Write one trivial case for `language-conventional-commits`.
- Done when that case runs with `--json`, its line lands in `results.jsonl`, comparing
  the file with itself prints zero differences, and `eval-skill.mjs
  language-conventional-commits` prints a table for it.

**Phase 1: static cost in CI.**
- Write `cost-report.mjs` over `claude plugin details`. Add a CI job that runs it on `main`
  and on the PR head, and comments the difference per plugin and for a typical docked
  project.
- Done when a test PR that lengthens one description shows the increase in its comment.

**Phase 2: pilot lift evals on three skills.** Chosen because a pattern can check them.

| Skill | Example case | Deterministic grader |
|---|---|---|
| `conventional-commits` | Commit a staged change in a scaffolded repo | `regex` on the last commit message |
| `java-conventions` | Add a data class to a project whose `pom.xml` targets Java 8 | No `record ` in the new file; `pom.xml` read before the file is written |
| `review-changes` | Review a branch with one seeded null dereference | `regex` on the final message for the seeded file and line |

- 3 to 5 cases per skill. Measure the floor. Run each suite with `with-without` at
  `--runs 5`.
- Done when each skill has a Δ with its interval, next to its floor, in `results.jsonl`,
  and a one-page note says keep, rework or retire for each.

First readings, from `evals/language-java/`, none stored. One run of the whole suite
at 5 runs per case, after the graders were corrected so that none passes the bug the
skill names (`Files.lines`, `orElse(null)`, a view for a copy, a post-8 API):

| Case | With | Without | Δ | Skill fired, with arm |
|---|---|---|---|---|
| `java8-data-class` | 1.00 | 1.00 | 0.00 | 0 of 5 |
| `defensive-copy` | 0.87 | 0.87 | 0.00 (interval -0.27 to 0.27) | 0 of 5 |
| `optional-nickname` | 1.00 | 1.00 | 0.00 | 0 of 5 |
| `read-first-line` | 1.00 | 1.00 | 0.00 | 0 of 5 |
| `wrap-with-context` | 1.00 | 1.00 | 0.00 | 0 of 5 |
| `java8-data-class-forced`, kept out of the gate | 1.00 | 1.00 | 0.00 | 2 of 5 |

Two things follow, and only these. The description did not make the skill load on any
plain prompt, 25 runs in all. And on these five tasks the model passes the checks
without the skill, so the cases show no lift to find. They do not show that the skill's
rules are useless: they show that these tasks do not need them. A rule worth keeping
must be one the model gets wrong without help, so the next cases are for the rules not
yet tried (the language level read from `pom.xml` before writing, `Process` handling,
field injection), each with a baseline that is below the ceiling. A skill that still
shows no Δ on such cases is a candidate to retire. The indicator is also not exact: the
forced case fired in 2 of 5 runs here and in 3 of 3 before, so read `skill-fired` as a
rough signal.

**Phase 3: triggering for every skill.**
- About 6 should-fire and 4 near-miss prompts per skill, run with the plugins a typical
  project loads, at `--ablation none`.
- Done when a table of recall and false-fire rate exists for all 19 standards, and every
  skill under 80% recall or with any false fire has an issue.

**Phase 4: make it the rule.**
- A CI job runs the evals of the plugins a PR touches, under `--max-cost-usd`, and posts
  the compare table. Lift suites run on the label `run-evals` and weekly on `main`.
  Trigger suites run on every PR that touches a description.
- Extend lift evals to the other skills, highest always-on cost first. Add a few lines to
  `CONTRIBUTING.md`.
- Change the curator's `contribute.md` so that a skill PR carries the `eval-skill.mjs
  --decide` table.
- Done when every standard has a trigger suite and three lift cases, a PR that touches a
  skill without evals fails CI, and the curator's PRs carry the table.

**Phase 5: the benchmark and the guard.**
- First, a dry-run mode for the steward: it writes the intended settings and `CLAUDE.md`
  into the folder it docks and runs no `claude plugin install`.
- Confirm the four projects. Write `projects.json` with the pinned commits, the licenses
  and the expected plugin sets.
- Write `benchmark-dock.mjs` and run it on `main` against itself. The two runs of the same
  version show how stable docking is.
- Guard fixtures: a change that breaks a test, and a README-only change. Measure how often
  Claude ends green, how often the guard blocks, how often it gives up after 3 tries, and
  the time it adds.
- Done when one report gives, per project, docking accuracy, stability, setup cost and the
  change since the version before, and a second report gives the guard's catch rate and
  added time.

**Phase 6: tasks on the benchmark projects (stage 2).**
- Probe whether `claude plugin eval` takes a plugin list per case. If not, build the
  `claude -p` driver.
- Two seeded tasks per project, with patches checked in, graded without a build.
- Run docked against undocked at `--runs 3`, and measure the noise floor first, as for
  any suite.
- Done when each of the four projects has a Δ with its interval for the plugin set the
  steward chose, and the report says where docking helped and where it did not.

**Phase 7: field.**
- Two or three real projects: two weeks without the marketplace, two weeks docked, collector
  off. `measure-setup.mjs` before and after, and a one-line correction log per session.
- Done when we can say, with numbers, whether corrections went down and what a session
  costs. That decides how much the collector is worth.

## 8. Budget and scope

- Every CI call passes `--max-cost-usd`. Set the first cap after phase 2, from the
  `costUsd` it recorded.
- Free graders first. The small judge by default. `--ablation none` wherever Δ is not the
  question.
- The API key is a repository secret, used only by the eval job and never on a fork's PR.
- Skill-check fixtures are synthetic and checked in. They reach nothing beyond the model.
- The benchmark clones four public repositories, read-only, into a cache outside this
  repo. Nothing is written to them or sent to them. Every docking run has a
  `--max-cost-usd` cap, because a large repo makes a long session.

Out of scope: the collector (off in every measurement until phase 7), the documentation
rewrite, and new skills until the pilot shows the measurement works.

## 9. What the repo shows that the plan did not say

Checked on 2026-10-28 against this checkout.

- **The engine reads cases from inside the plugin, and an install ships that folder.**
  Probed in phase 0: the install copies a plugin's `evals/` into the cache of each
  machine. The owner wants the tests outside the skills, so they live in
  `evals/<plugin>/` at the repo root, and `eval-skill.mjs` stages them beside a copy of
  the plugin for each run. The same cases then measure any version of the skill, which
  is what a before-and-after needs. `plugin-shape.md` says so, and `check-catalog.mjs`
  needs no change.
- **The collector has two switches today.** `STEWARD_COLLECT: off` in settings, and
  `STEWARD_COLLECTOR=1` inside the collector's own child process. Neither is an eval
  signal, and a fixture cannot set the first: the engine ignores a project-level
  `.claude/` and accepts only `EVAL_*` keys in `env`. The isolation of the engine is the
  guard until a suite tests `marketplace-base`. Probed in phase 0: a `SessionStart` hook
  in a scratch `CLAUDE_CONFIG_DIR` fired in a plain `claude -p` session and did not fire
  in an eval run, which then stopped at login. That is one probe, and a weak one; the
  engine's documentation says the same.
- **The sandbox denies `git`.** A fixture cannot stage a change. It writes the diff as a
  file, and the task reads that.
- **Docs pages go stale.** New scripts and a new folder change `checks.md`, `commands.md`,
  `development-loop.md`, the map in `docs/README.md` and `decisions.md`. The plan says the
  documentation rewrite is out of scope. These edits are not a rewrite, and the map's
  Sources rule asks for them in the same change. Done in phase 0 for `commands.md`,
  `development-loop.md` and `decisions.md`; `checks.md` and the map name no changed file.
- **A dry-run mode is a change to the steward.** Docking runs `claude plugin install`
  (`dock.md`), which the benchmark must not do. It follows `work-on-the-steward.md` and
  needs a decision entry.
- **The benchmark broke a repo rule as written.** `CLAUDE.md` banned any real project
  name. The benchmark needs a URL and a commit for each project, or nobody can repeat a
  run. The maintainer relaxed the rule on 2026-10-28 (M7), in `CLAUDE.md` and in
  `writing-docs.md`.
- **`dock.md` already asks for stable docking.** It says a pass without a verdict "is how
  two runs on one project install different sets". The benchmark turns that sentence into
  a number.
- **`.claude-plugin/marketplace.json` in the working tree is broken.** The comma after
  `owner` is gone, so the file is not valid JSON. This is not from this branch. The change
  stays uncommitted, with a model and a compaction setting in `.claude/settings.json`.

## 10. Open

| # | Question | Recommendation |
|---|---|---|
| M1 | Does a skill with dependencies, such as `review-changes` on `review-work` and `clean-code`, run with them in both arms or only in the with arm? | In both, so Δ is the skill's own part. **Agreed, but not yet possible:** `claude plugin eval` takes one target and loads only that plugin, so `eval-skill.mjs` runs without the dependencies and says so. Probe in phase 2 whether the engine can load more than one, or whether a case must carry the rule it needs |
| M2 | Who reviews a judge's rubric before it counts? | The curator who owns the skill |
| M3 | Where do `measurements/` and the scripts sit, given the product never depends on `docs/` and the scripts are not product? | `measurements/` and `scripts/` at the root, as proposed. They are CI tools, not plugin files |
| M4 | Does the `evals/` folder ship with the plugin? | Answered in phase 0: yes, the install copies it. So the cases live in `evals/<plugin>/` at the repo root and are staged at run time. Keep fixtures small and built by script |
| M5 | Which model IDs does the pilot pin, and who pays? | Pin today's `claude-sonnet-5-5` for the agent and `claude-haiku-5-5` for the judge. Set the cap after phase 2 |
| M6 | What does "before a release" mean? | **Settled.** It means contribution work: the skill check with `--decide` before a skill PR. The benchmark is the check for the whole marketplace and the steward |
| M7 | The repo banned real project names. The benchmark needs public projects by URL and commit. | **Settled 2026-10-28.** A public open-source project may be named, with its license checked. No client, person or private project. `CLAUDE.md` and `writing-docs.md` are changed |
| M8 | Which projects? | **Settled 2026-10-28.** Four: the candidates in section 4a, without `apache/superset`, which is too costly for now |
| M9 | What is "the version before" for the benchmark? | The last merge on `main` for a PR check. A tag for the monthly run, so the monthly trend compares like with like | **Agreed.**
| M10 | Should stage 2 (tasks on the real projects) be in this plan? | **Settled.** Yes, as phase 6, behind stage 1 being stable |

## 11. Risks

- **Noise larger than any lift.** Then no skill passes, and the plan reports that. It is a
  true result. The answer is more runs or sharper cases, not a lower bar.
- **Cases written to fit the skill.** A case where the skill's rule decides the outcome can
  flatter it. The reviewer of a case is not its writer, as for any change here.
- **Cost drift.** A weekly full run grows with the skill count. The cap and the
  highest-cost-first order bound it.
