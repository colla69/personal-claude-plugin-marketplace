# Werkstatt migration plan

How this marketplace gets from its current shape to the one in `concept.md`. Section
numbers (§) refer to that file.

**Status:** approved 2026-10-19 and merged to `main` the same day. Steps 0 to 8, the
first trial of step 9, and the merge of step 10 are done, and the audit is in
`audit.md`. The rest continues in `package-plan.md`: it replaces step 11, starts the
step 9 trials over, and finishes step 10's migration. Every step ends with a report
and a stop until it is approved: "one at a time, with approval, no big rebuilds".

---

## 1. Decided

D1 to D7 answer §13, D8 to D16 answer the questions this plan raised, D17 to D22
answer the audit's judgement calls (`audit.md`, section 3), D23 to D25 were
decided at the start of step 4, and D26 after step 8. All were decided on 2026-10-19.

| # | Decision | What it changes |
|---|---|---|
| D1 | Keep the shipped agents' knowledge and reorganise it | No agent file is deleted until every paragraph in it has a new home: standard text in a skill, role text in a role template |
| D2 | Init creates the agents in each project, from marketplace skills | Skill plugins ship no `agents/` |
| D3 | A trio solves a task. Effort differs per task. Plan and Check stay read-only, partly to spend fewer credits | Generated agents carry an `effort` that init chooses per role and task. This replaces the house rule "`effort` only where it enforces something" |
| D5 | The layer is part of the plugin name and is its `category` | Every plugin is renamed |
| D6 | Orchestrators are parked | Not in this plan |
| D7 | `development-standards` is Craft, and parts of it may split out as Universal | The audit checks which parts |
| D8 | All work happens on branch `marketplace/restructure`, one commit per step, with one PR to `main` at the end | `main`, and so every project, sees one change instead of eleven |
| D9 | Plugins are named `<layer>-<topic>`, with the prefixes `universal-`, `craft-`, `language-` and `tools-`. Each prefix is the same word as the `category`. Skill names stay as they are | Step 3 |
| D10 | The two plugins that work on the marketplace itself are `marketplace-init` (today `project-init`) and `marketplace-contributor`, both with category `marketplace`. "Werkstatt" does not appear in any plugin name | Step 3 |
| D11 | Init creates the trio's run pattern in each project, from the skills it installed. No separate plugin holds it | Steps 5 and 6 |
| D12 | The default effort is Plan `high`, Do `medium`, Check `medium`. Init adjusts them per task and explains why in its plan | Step 5 |
| D13 | Init installs the skills itself once its plan is approved. The paste block stays in the report, for other machines | Step 6 |
| D14 | Claude only: init writes `.claude/agents/` and nothing for Copilot. The files still contain no model names | Steps 5 and 6 |
| D15 | `marketplace-init` keeps `codebase-cartographer`, unchanged, as its own helper. It works for init, not for a project, which is the exception §5.3 describes. It becomes a skill only if a Plan agent turns out to need it | Step 4 |
| D16 | The run pattern is one project skill per trio, `.claude/skills/<task>/SKILL.md`, invoked as `/<task>`. It runs Plan, stops for your OK, runs Do, then runs Check, which can send the work back to Do. `AGENTS.md` lists the trios, because that is a project fact | Steps 5 and 6 |
| D17 | The parts of `development-standards` that hold for any work split into a new Universal skill: read before writing, match what is there, hold scope, and unverified is not done. `craft-development` keeps the code part. The name is decided in step 4 | Step 4 |
| D18 | A role's generic report skeleton lives in its role template. The report for one kind of work lives in that kind's Craft skill | Steps 2, 4 and 5 |
| D19 | Pinia and the query layer leave `vue-conventions` for a skill of their own, `tools-pinia` | Step 4 |
| D20 | The TypeScript parts leave `vue-conventions` for a skill of their own, `tools-vue-typescript`, which depends on `language-typescript`. Init installs it when a project shows both | Step 4 |
| D21 | `description` lives only in the marketplace entry, not in `plugin.json` | Step 3 |
| D22 | `craft-code-review` and `craft-refactoring` each refer to `clean-code` explicitly, so their dependency on it stays true without the agents | Step 4 |
| D23 | O2: the generic review skill is Craft, as `craft-review` with skill `review-work`. `craft-code-review` builds on it | Step 4 |
| D24 | The Universal skill from D17 is `universal-work-discipline`, with skill `work-discipline` | Step 4 |
| D25 | `tools-vue-typescript` depends on `tools-vue` as well as `language-typescript`, because it names `vue-conventions`. A dependency within one layer is allowed when it is unconditional | Step 4 |
| D26 | Step 10 merges as one squash commit, made locally on a fresh branch off `main`, and the PR comes from that branch. `marketplace/restructure` is never pushed: its earlier commits hold a project name that must not become public | Step 10 |

## 2. Still open

| # | Question | Recommendation | Step |
|---|---|---|---|
| O1 | Is the single-purpose agent (the monthly-report agent) the same thing as Do? (§13, question 4) | Yes. Until it is decided, the role templates treat it that way | 5 |

## 3. The target

### Plugins

This table includes the audit's decisions.

| Today | After | Layer |
|---|---|---|
| `clean-code` | `universal-clean-code` | Universal |
| `developer`, part | `universal-work-discipline` (D17, D24) | Universal |
| `developer` | `craft-development` | Craft |
| `code-review` and two agents, part | `craft-review` (D23) | Craft |
| `code-review` | `craft-code-review` | Craft |
| `refactoring` | `craft-refactoring` | Craft |
| `unit-testing` | `craft-unit-testing` | Craft |
| `java-dev` | `language-java` | Language |
| `typescript-dev` | `language-typescript` | Language |
| `vue-dev` | `tools-vue` | Framework & Tools |
| `vue-dev`, Pinia part | `tools-pinia` (D19) | Framework & Tools |
| `vue-dev`, TypeScript part | `tools-vue-typescript` (D20) | Framework & Tools |
| `project-init` | `marketplace-init` | marketplace |
| — | `marketplace-contributor`, as a draft (step 11) | marketplace |

### Where each shipped agent's knowledge goes

This table is provisional, from a first read. The audit confirms it paragraph by
paragraph.

| Agent | Standard text goes to | Role text goes to |
|---|---|---|
| `developer` | `craft-development`, which already holds most of it | Do: its three failure modes (silent scope expansion, reporting unverified work as done, rewriting instead of fitting), and raising disagreement before the edit, out loud |
| `code-reviewer` | `craft-code-review` | Check: its two failure modes (agreeable review, padded review), and reading the code as written rather than as described |
| `refactoring-specialist` | `craft-refactoring`: the four parts of a prescription and the order of steps | Plan, for refactoring tasks: the safety net comes first, and the prescription is the plan |
| `unit-tester` | `craft-unit-testing` | Do, for test tasks: edit test files only, and stop when production code would have to change |
| `clean-code-reviewer` | `universal-clean-code`: a finding needs a cost | Check: its failure mode (manufacturing findings) |
| `vue-developer` | `tools-vue`, which it mostly duplicates already | Do: nothing new expected |
| `codebase-cartographer` | Stays in `marketplace-init` (D15) | Init's helper |

### What init leaves in a project

```
AGENTS.md, CLAUDE.md               project facts, including which trios exist
.claude/settings.json              the marketplace and the enabled skill plugins
.claude/plugin-sources.json        the source policy (2026-09-17)
.claude/agents/<task>-plan.md      read-only; Universal, Craft and Language skills
.claude/agents/<task>-do.md        the only writer; adds the Framework & Tools skills
.claude/agents/<task>-check.md     read-only; checks the result against the plan
.claude/skills/<task>/SKILL.md     runs the trio: Plan, your OK, Do, Check (D16)
```

---

## 4. Steps

After every step, run `node scripts/check-catalog.mjs`, `claude plugin validate .`, and
`claude plugin validate` on each plugin. Then report briefly and stop.

The decisions are made with you in the main session. `@skill-writer` renders them,
`@skill-evaluator` and `@plugin-evaluator` review them, and `@marketplace-architect`
joins steps 1 and 7 (§12.3).

### Step 0: Prepare (done)

- Fast-forwarded `main` to `origin/main`, which holds the 2026-09-17 init work (PRs #1
  and #2). Every later step builds on that version.
- Created `marketplace/restructure` from it.
- Committed `docs/werkstatt/` and the pointer in `CLAUDE.md`.

### Step 1: Audit, read-only

Check each of the nine skills for:

- its layer;
- whether it governs one thing, in one layer (§4.2 rules 1 and 3);
- any project fact in it (rule 6);
- any rule it restates from another skill, with both locations (rule 2);
- whether its dependencies point only toward more general layers (rule 4).

For each of the seven agents, label every section as standard, role or project fact,
and name the home it moves to. That list becomes the checklist for step 7.

Some findings are already visible from a first read and need confirming:

- "Wait for the third occurrence" appears in `clean-code`, `refactor-safely` and
  `refactoring-specialist`.
- "Read the neighbours and match the project" appears in `development-standards`,
  `write-unit-tests`, `clean-code` and `vue-developer`.
- "Don't reformat unrelated lines" appears in `development-standards` and
  `refactor-safely`.
- The "Implement what was prescribed" section of `development-standards` describes the
  Do role, not a standard.
- "Unverified is not done", also in `development-standards`, holds for any kind of
  work, so it may be the Universal part that D7 expects.
- `review-changes` names `git` commands, which belong to a tool, inside a Craft skill.

The output is `docs/werkstatt/audit.md`. **Stop** until you approve its gap list and the
tables in section 3.

### Step 2: Rework the repo's own agentic setup (done)

Moved ahead of the content steps at your suggestion. Left as they were, the rules and
the maintainer agents would have pushed the old skill-plus-agent shape back in during
steps 3 to 7, and judged every step by it.

- `CLAUDE.md`: covers the layers, one skill per plugin, and Plan, Do, Check instead of
  the review trio.
- `authoring-style.md` and `.claude/rules/authoring.md`: cover the cut (§4.2 as
  checks), the skill/role split, naming, the report rule (D18), and `effort` (D3, D12).
- `/new-plugin` and its templates: place the knowledge first, and scaffold a
  skill-only plugin with no `description` in `plugin.json`. The agent template is
  gone.
- Maintainer agents:
  - `skill-agent-writer` is now `skill-writer`, and `skill-agent-evaluator` is now
    `skill-evaluator`. Both work on a skill or a role template, not on a pair.
  - `plugin-evaluator` checks the shape: layer prefix, one skill, no `agents/`, and
    whether the dependencies exist.
  - `marketplace-architect` judges layers, one home per rule, and the direction of
    dependencies.
  - `mcp-integrator` is retired.
- Memory: the review-trio memory is marked as superseded.

`check-catalog.mjs` is unchanged. Its new checks arrive with steps 3 and 7, which make
them true.

### Step 3: Rename the plugins and make the layers explicit (done)

- `git mv` each plugin, following D9 and D10. Update its `name` in `plugin.json`, its
  marketplace entry, its `category`, its README heading, the root README table, and its
  `dependencies`.
- Group `plugin-catalog.md` by layer and give it a layer column.
- Fix prose that names a plugin, such as `development-standards` yielding to "`vue-dev`
  and the like", or the README's install lines for `project-init`. This includes
  `.claude/` and `scripts/`: `/new-plugin` and `check-catalog.mjs` both hard-code
  `plugins/project-init/`.
- Extend `check-catalog.mjs`:
  - the name prefix must match the `category`;
  - the `category` must be one of `universal`, `craft`, `language`, `tools` or
    `marketplace`;
  - every name in `dependencies` must exist in `marketplace.json`. The renames in this
    step and the splits in step 4 are what would break them.

Done when every plugin installs locally under its new name.

What was done:

- The nine plugins carry their new names and categories. `marketplace.json` lists them
  in layer order. `plugin.json` no longer has a `description` (D21):
  `claude plugin list --available`, which init reads, already showed the marketplace
  entry's, so nothing init sees changed.
- The plugin table in `plugin-catalog.md` has a Layer column. Its layer section names
  Framework & Tools, defines the layers without assuming code, and no longer calls
  tooling "a fifth thing" (`audit.md`, section 4).
- `check-catalog.mjs` also fails on a `description` in `plugin.json`, and on a name in
  a table's Plugin column that the marketplace doesn't list. Each new check was tested
  by breaking a copy of the repo.
- Mentions of skills and agents keep their names. `clean-code` is still the skill, and
  `developer` is still the agent until step 7.
- Every plugin installed and enabled under its new name, in a throwaway config
  directory.

### Step 4: Fix the cuts (done)

- Split or merge wherever the audit found a skill covering two things or two layers.
- Give each rule one home: remove the restated copies and refer to the rule by name.
- Split out the Universal part of `development-standards`, if the audit confirms one
  (D7).
- Move standard text out of the agents and into its skill (the first half of D1).
- Declare dependencies in `plugin.json`, pointing only toward the more general layers.

Register each new plugin in all three places.

What was done:

- Four plugins split out: `universal-work-discipline` from `development-standards`
  (D17, D24), `craft-review` from `review-changes` and the two reviewer agents (D23),
  and `tools-pinia` and `tools-vue-typescript` from `vue-conventions` (D19, D20, D25).
  All four are registered in the three places.
- Every row of the audit's one-home table now lives in its home, and the other places
  name it. The standard text of the agents (the S rows of `audit.md`, section 2) moved
  into the skills. The agents keep only their skill pointers and role text for step 5.
- The descriptions that competed were reworded: `clean-code` no longer claims "clean
  up" or "review", `review-changes` is about code changes only, `review-work` leaves
  code to the code skills, `vue-conventions` leaves Pinia to `pinia-conventions`, and
  `java-conventions` no longer fires on a Kotlin or Scala build.
- `review-changes` names no `git` commands and no base branch. `refactor-safely` keeps
  "commit" and yields to the project for how steps are recorded.

Where this differs from the audit:

- `development-standards` still holds "Implement what was prescribed". It is role text,
  and it moves in step 5, when the Do template it goes to exists.
- "Read the result as written" (`code-reviewer`, lines 18–21) went to `review-work`,
  because J1 counts it as review knowledge. The Check template in step 5 names it and
  does not copy it.
- `development-standards` keeps one generic sentence on checking the language version,
  instead of deleting it. Without it, a language with no skill of its own has no
  version check. The Language skills say where the version lives: `java-conventions`
  already did, and `typescript-conventions` now names `target` and `lib`.
- `review-work` holds no failure modes: agreeable and padded review are Check's, for
  step 5. Its examples are not code, and `clean-code` triggers again on judging existing
  code that is not a diff.
- `tools-pinia` depends on `tools-vue`, by the same reasoning as D25.
- Two same-layer dependencies follow from naming a skill: `craft-code-review` on
  `craft-unit-testing`, which judges whether tests would fail, and `craft-refactoring`
  on `craft-development`, for reformatting and public interfaces. So every project with
  the trio also gets `craft-unit-testing`.
- The Vue TypeScript example declares props with `type`, not `interface`, to agree with
  `typescript-conventions`.

### Step 5: Role templates and the run pattern (done)

O1 matters here.

- Add `plan.md`, `do.md` and `check.md` to
  `plugins/marketplace-init/skills/init-agent-setup/references/roles/`. Each holds:
  - the frontmatter: `name`, `description`, `effort` (D12), `disallowedTools` for Plan
    and Check, and no `model`;
  - the role's lane;
  - the failure modes collected under D1, grouped by kind of work;
  - what to do when there is nothing to report;
  - the report shape.

  Plan's output is the contract, and Check reads it item by item.
- Add a template for the run pattern (D11): Plan, stop for your OK, Do, Check, and back
  to Do when Check finds a gap. Give it a lane in `@skill-writer` and
  `@skill-evaluator`, since neither covers it yet.
- Write down the assignment rules from §7.1: Framework & Tools skills go to Do only,
  the abstract layers go to Plan and Check, and shared skills go to all three.
- **Verify first** how a generated agent loads its skills: through a `skills:` list in
  the frontmatter, or by naming them in the body.

What was done:

- **Verified first:** a `skills:` list in the frontmatter preloads each skill's full
  text at startup. A plugin's skill must be written `plugin:skill`. In a probe, both
  namespaced names loaded, and one of two bare names silently loaded nothing.
  `trios.md` records this, because init writes those lists.
- `references/roles/` in `marketplace-init` holds `plan.md`, `do.md`, `check.md`, and
  the run pattern, `run.md`. Every R row of `audit.md`, section 2, has landed in one of
  them. "Implement what was prescribed" left `development-standards` for `do.md`.
- `references/trios.md` holds the assignment rules of §7.1. Check always gets
  `craft-review`, and Do always gets `universal-work-discipline`, because their
  templates rely on them.
- Plan and Do run as subagents and can't hold a conversation, so their questions and
  disagreements come back through the run skill to you. The run stops after two rounds
  of Check sending work back, and shows you both reports. That bound is an assumption;
  the concept says only "reiterate if necessary".
- `@skill-writer`, `@skill-evaluator` and `authoring-style.md` cover the run-pattern
  template and the `skills:` slot.
- O1 is still open. The templates treat the single-purpose agent as Do.

### Step 6: Extend init (done)

This builds on the 2026-09-17 version and keeps everything in it: the source policy,
refreshing first, no git, unknowns collected in the report, and the plugin tables. The
phases become:

1. Preparation: the source policy, as today.
2. Survey and map.
3. Propose: an outline of `AGENTS.md`, the skills by layer, and the trios with their
   skills and effort per role. **Hard stop.**
4. Write `AGENTS.md` and its `CLAUDE.md`.
5. Install the skills (D13).
6. Create the trios and their run pattern.
7. Verify that every skill an agent names is enabled. A missing one fails silently.
8. Write a short report.

The skill is already 374 lines against a 160-line target, so the detail of each phase
moves into `references/`. Its `description` still says "CLAUDE.md context files", so it
gets rewritten.

What was done:

- `SKILL.md` has the eight phases, in 144 lines. The detail of each phase lives in one
  reference: `plugin-sources.md` (now with the phase 1 checklist), `context-files.md`
  (which components earn a file, project skills, and a Trios section in the root
  template), `plugin-catalog.md`, `trios.md` (which trios to propose), and the new
  `report.md`, which holds the plan's tables and the report.
- Init installs at project scope after the plan is approved (D13). The settings
  template holds only the marketplace entry, because the installs write the
  `enabledPlugins` entries. The report keeps the paste block for other machines.
- The description and phase 2 cover a folder with no code. Phase 2 uses the
  cartographer's method for a codebase, so the survey has one home (D15).
- The review-trio wording is gone. The catalog's "Code" section keeps your rule that
  the three code Craft plugins go together, with the trios as the reason.
- Assumed, for you to confirm: the trio candidates for a code repo (`change`,
  `refactor`, and `test` where a runner exists).

### Step 7: Retire the shipped agents (done)

This happens only once every item on the step 1 checklist has landed. Then:

- Delete `agents/` from every skill plugin.
- Make `check-catalog.mjs` fail on an `agents/` directory outside a `marketplace-`
  plugin.

What was done: the reviews of steps 4 and 5 confirmed every row of `audit.md`, section
2. Six `agents/` directories are deleted, and only `marketplace-init` keeps its
cartographer (D15). `check-catalog.mjs` fails on the next one. The marketplace
descriptions and the catalog's Provides column no longer name agents.

### Step 8: Docs (done)

- Root `README.md`: explain the layers and the cycle, in wording that doesn't assume
  every skill is about code (§2).
- Update `CONTRIBUTING.md` and every plugin README. `CONTRIBUTING.md` still teaches
  the skill-plus-agent anatomy. The maintainer agents moved to step 2.

What was done: the root README explains the cycle and the layers, and its table has no
agents. `CONTRIBUTING.md` teaches skill-only plugins and role templates. `@skill-writer`
rendered the nine older plugin READMEs into the house template, from each plugin's
current skill, dependencies and catalog row. Every Craft install line uses
`--scope project`, which is how init installs them.

### Step 9: Try it for real

- Run init against this branch, not `main`: in a separate config directory with the
  local marketplace added, so your own config and every other project stay on `main`.
- Copy a project that uses Java, TypeScript and Vue into the scratchpad and run init on
  it. A stack like that touches all four layers. Check `AGENTS.md`, the skills by
  layer, the trio files, `effort`, the read-only frontmatter, the run pattern, and that
  the hard stop held.
- Do one run on a folder with no code in it, to test §2's claim that the concept is not
  only for code.
- Run `claude plugin eval --ablation with-without` on two or three skills.

What was done: one run, on a copy of a Vue 3 project written in plain
JavaScript, with no tests and no CI. Init asked the sources question once, handed the
reading to the cartographer, and stopped at its plan until the user said go. It
proposed `change` and `refactor`, and no `test`, because there is no test runner.
Phase 7 found every `skills:` name enabled, and the report followed `report.md`. One
fix came out of it: init wrote facts about the machine into `AGENTS.md`, such as
where npm is installed, and `context-files.md` now leaves them out.

The run covered Universal, Craft and Framework & Tools, but not Language, since no
Language skill fits plain JavaScript. The Language run, the no-code run and the eval
are set aside: init gets reworked later, and they will be run against that version.
They don't block step 10.

### Step 10: Merge and migrate

- Squash `marketplace/restructure` onto a fresh branch off `main`, and open the PR from
  that branch (D26). Never push `marketplace/restructure` itself.
- Re-run init in every project that already uses the marketplace. Their settings enable
  `clean-code`, `unit-testing`, `refactoring` and `vue-dev`. After the rename those keys
  match nothing, and nothing reports it.
- In your own config, replace `project-init` with `marketplace-init`. The old name is
  installed at user scope, and after the merge it matches nothing either.
- A project set up during step 9 already enables the new names, which `main` does not
  have yet. In your own config its trios can't load their skills until the merge is
  pushed and the marketplace updated.

### Step 11: The contributor (replaced)

Replaced by `package-plan.md` (D27): one package sets projects up, keeps them current,
and grows the marketplace, instead of an init plugin and a separate contributor.

---

## 5. Risks

| Risk | Why nothing reports it | Guard |
|---|---|---|
| Projects still enable plugins under their old names | The settings file looks right, but the plugin never loads | Merge once (D8); step 10 re-runs init |
| A generated agent names a skill that isn't enabled | The agent carries on with generic judgement instead | Step 6, phase 7 |
| Some of an agent's knowledge is lost in the move | Deleted text leaves no trace | Step 7 waits for the step 1 checklist |
| The maintainer agents judge by the old skill-plus-agent model | Their reviews approve the wrong shape | Resolved in step 2 |
| More, smaller plugins add descriptions to every session | The cost grows without anyone seeing it | Init enables only what the project shows (§4.2 rule 8) |
