# One package: plan

How `marketplace-init` and the planned contributor become one package that sets a
project up, adopts a setup the project already has, keeps the setup current, and grows
the marketplace. Section numbers (§) refer to `concept.md`. D and O numbers continue
the ones in `plan.md`.

**Status:** draft, 2026-10-19, on branch `marketplace/one-package`, waiting for
approval. It replaces step 11 of `plan.md` and starts its step 9 trials over. Every
step ends with a report and a stop until it is approved. Nothing on this branch names
a project, so it merges as a normal PR.

---

## 1. What the package is

One plugin, installed once at user scope, so that it works in every project, including
one that was never set up. You talk to it, and it works out which of four jobs you
mean:

| Job | What it does | Writes to |
|---|---|---|
| Set up | What init does today: read the project, propose and stop, write `AGENTS.md`, install the skills, create the trios, verify, report | The project |
| Adopt | Set up a project that already has a setup of its own: skills, agents, rules, hooks, commands, a long `CLAUDE.md`. Every piece gets a home: a central skill that already covers it, a central skill that is extended or created for it, the project's `AGENTS.md`, a trio, or it stays as project mechanics | The project and the marketplace |
| Keep current | Finds where the setup has drifted, and proposes the fix: enabled plugins that no longer exist, `skills:` names that don't resolve, trios built from older templates, catalog plugins the project now calls for, `AGENTS.md` lines that are no longer true | The project |
| Grow the knowledge | Turns a problem described in conversation into a change to a skill, or a new skill, on a branch of the marketplace, and opens a PR | The marketplace |

Its scope is the setup and the knowledge. The project's own work stays with its trios.

Adopting and growing stand or fall on one judgement: does a lesson belong to this
project, or does it travel? Growing applies it to a problem you describe, adopting to
every rule an existing setup holds. The package makes it in four moves.

1. **Diagnose before writing.** The cause decides where the fix goes, and only some
   causes mean the knowledge should change:

   | What is really going on | Where the fix goes |
   |---|---|
   | The skill has the rule, but it never loaded | The wiring: the skill's trigger, or the project's setup. Not the content |
   | The knowledge is wrong everywhere | The skill |
   | Right in general, wrong in this project | The project's `AGENTS.md`, as a local exception, and maybe a sharper yield in the skill. The general rule stays |
   | Missing, and it would hold anywhere | A skill, in the layer §4.3 gives |
   | Missing, but only true here | The project's `AGENTS.md` |
   | A fact about this machine | Nowhere |

2. **The strip test.** Replace every name, path and value in the lesson with its role.
   What is still true and useful travels; what was stripped stays in the project. The
   stripped text is the only text that may reach the public repo.
3. **You decide at the plan.** The plan shows the project part and the marketplace
   part separately, with the exact public text.
4. **Corrections become examples.** Each split you overrule becomes a stripped, worked
   example in the skill, so the judgement grows from real decisions.

Two more parts wait until the package has handled a few real cases (step 10): a list of
candidates, for lessons that stay local until they show up in a second project, and
evals.

---

## 2. Decided

All decided on 2026-10-19.

| # | Decision | What it changes |
|---|---|---|
| D27 | One package replaces `marketplace-init` and the planned `marketplace-contributor` | Supersedes D10. A `marketplace-` plugin may ship several skills, not only agents (§5.1, §5.3) |
| D28 | You are the only contributor for now. A contribution is a branch in your repo, with no fork flow | The package needs push rights to your repo, nothing more |
| D29 | The scope is the setup and the knowledge, not the project's own work | The front door triggers only on those |
| D30 | The judgement is the four moves in section 1. The candidates list and the evals come later | Steps 3 and 10 |
| D31 | Set-up adopts an existing setup instead of adding to it. What a central skill covers is removed locally, what should be central becomes a contribution, and only what belongs to the project stays | Section 4, step 6 |

## 3. Open: yours to decide

| # | Question | Recommendation |
|---|---|---|
| O3 | The package's name | `marketplace-steward`: it sets up, keeps current and grows. `marketplace-companion` is the plainer alternative |
| O4 | Does the package ship its own contribution trio, or does set-up generate one into each project like any other trio? | **Ship it.** It works on the marketplace, not on the project, which is the §5.3 exception, and it then works in a project that was never set up. The cost: its agents are filled-in copies of the role templates, so Check compares the two |
| O5 | The §9 rule of 2026-10-13 says the contributor never edits a project's `AGENTS.md`. With one package, does it hold? | **Keep it, as two lanes.** The project job and the marketplace job stay separate. A request that needs both shows both in the plan, and each part is written by its own lane |
| O6 | In an adoption, what happens to hooks, MCP servers, and commands that run a tool? | **They stay in the project.** The concept leaves hooks and MCP servers out (§3), and the marketplace ships knowledge. A hook that only injects text is the exception: its text is knowledge, and is adopted like any rule. Revisit if the same hook shows up in a second project |

---

## 4. The shape

```
plugins/marketplace-<name>/
  .claude-plugin/plugin.json
  README.md
  skills/
    <front door>/        routes a request to one of the four jobs
    set-up/              today's init-agent-setup, with its references and assets,
                         and adoption
    keep-current/        the drift checks, and the plan for fixing them
    contribute/          runs the contribution trio, then pushes and opens the PR
    place-knowledge/     the four moves and §4.3: the one home of the cut
    author-skills/       the house voice, the templates, the three registrations
    evaluate-skills/     the checks on one skill, on one plugin, and on the whole set
  agents/
    codebase-cartographer.md
    contribute-plan.md   preloads place-knowledge; read-only
    contribute-do.md     preloads author-skills and work-discipline
    contribute-check.md  preloads evaluate-skills and review-work; read-only
```

The cut into skills is fixed. How they are packaged is not: M1 decides how many of
them add a description to every session, and the ones that shouldn't may merge into
references of fewer skills.

The package depends on `universal-work-discipline` and `craft-review`, whose skills its
Do and Check preload. `check-catalog.mjs` allows that: `marketplace` comes last in its
order, so it may depend on every layer.

### What moves where

| Today | After |
|---|---|
| `plugins/marketplace-init/` | `set-up`, and the cartographer |
| The cut: §4.2 and §4.3, the "decide where the knowledge goes" part of `new-plugin`, and `.claude/rules/authoring.md` | `place-knowledge`. The concept keeps the principle and points to the skill |
| `.claude/skills/new-plugin/`, with `authoring-style.md` and the templates | `author-skills` |
| `.claude/agents/skill-writer.md` | `contribute-do` |
| `.claude/agents/skill-evaluator.md` and `plugin-evaluator.md` | `evaluate-skills`, used by `contribute-check` |
| `.claude/agents/marketplace-architect.md` | The whole-set checks in `evaluate-skills`, used by `contribute-plan` before the work and by `contribute-check` after it |
| This repo's `.claude/` | Enables the package, and keeps only what is about this repo |

### A contribution, end to end

1. The front door hears a problem and diagnoses it. If the fix isn't knowledge, it
   says so, and hands it to keep-current or to the project's `AGENTS.md`.
2. `contribute-plan` runs the strip test and places the knowledge: an existing skill
   first (rule 2), a new one only where none fits. It checks the whole set for
   overlaps, competing triggers and dependency direction, and flags a breaking change:
   a rename, a removal, a split.
3. You accept the plan, or correct it.
4. `contribute-do` works in a git worktree of your marketplace clone, on a new branch
   off `origin/main`, so your own checkout is never touched. It writes, registers in
   all three places, validates, runs `check-catalog.mjs`, and commits.
5. `contribute-check` compares the result with the plan, checks the house standard,
   and runs the leak check: it compares the diff with the identifiers of the project
   the lesson came from, such as its folder and package names, its git remote, and
   the names in its `AGENTS.md`. At most two rounds go back to Do.
6. The package pushes the branch and opens the PR with `gh`. Without `gh`, it prints
   the compare link with the title and description filled in. A breaking change
   carries its migration in the PR description.
7. If the plan had a project part, the set-up lane writes it into the project.
8. After you merge, keep-current picks the change up in each project.

### Adopting an existing setup

1. **Take stock** of everything the setup holds: `CLAUDE.md` and `AGENTS.md` at every
   level, `.claude/rules/`, `.claude/skills/`, `.claude/agents/`, `.claude/commands/`,
   hooks, `.mcp.json`, the settings (permissions, plugins, environment), and other
   tools' files such as `.cursor/rules/`.
2. **Split it into rules, not files.** One rules file usually mixes rules a central
   skill already has, facts about the project, and rules nobody has written down
   centrally yet.
3. **Give each rule a home**, with the four moves of section 1:

   | What the rule is | Where it goes |
   |---|---|
   | A central skill already says it | Removed here; the central skill is enabled instead |
   | A central skill says it differently, because this project is different | The project's `AGENTS.md`, as a local exception |
   | A central skill says it differently, and the local version is better | A contribution that improves the skill, then removed here |
   | No central skill has it, and it travels | A contribution that extends a skill or creates one, then removed here |
   | A fact about this project | The project's `AGENTS.md` |
   | A worker's lane, in an existing agent | The agent becomes a trio, or the Do of one. The knowledge inside it goes through the rows above |
   | A hook, an MCP server, a command that runs a tool, a permission | Stays: it is project mechanics (O6) |
   | Dead, or about this machine | Removed |

4. **The plan shows every rule**, grouped by the file it came from, quoted, with its
   new home. You approve it like any other plan.
5. **Nothing is removed before its new home is live**, as D1 required of the
   marketplace's own agents. A rule that waits for a contribution stays where it is
   until the PR is merged and the central skill is installed and loads. Set-up records
   it as pending, and keep-current removes the local copy once the central one is
   live.

This repo's own `.claude/` is the first adoption: its tooling moves into the package
in steps 3 and 5.

---

## 5. Steps

### Step 0: This plan

Approved, with O3 to O6 answered.

### Step 1: The concept

Rewrite §9 as the package, and bring §3, §5.1, §5.3, §8, §10, §12 and §13 in line with
it. Add the four moves to §4.3 as the principle; the skill becomes their working home.
Record D27 to D31 and the answers to O3 to O6. Stop for approval, because every later
step builds on it.

### Step 2: Probe the mechanics

In a separate config directory, as in the first trial, and with nothing named after a
project:

- **M1.** Can a plugin skill be hidden from the model's skill list
  (`disable-model-invocation`) and still be preloaded by the plugin's own agents, and
  run by the front door? The answer decides how many descriptions the package adds to
  every session in every project.
- **M2.** How does a skill read a plugin option set with `claude plugin configure`?
  The option holds the path of your marketplace clone.
- **M3.** Do the package's agents preload the package's own skills, and keep their
  `disallowedTools` and `effort`?
- **M4.** Worktree, branch off `origin/main`, push and PR, with `gh` and without it.
- **M5.** Does `claude --plugin-dir` let this repo work on the package while the
  installed copy stays on `main`?

Each answer goes into this plan before step 3.

### Step 3: The knowledge skills

Write `place-knowledge`, `author-skills` and `evaluate-skills` from the material in
section 4. Seed `place-knowledge` with stripped cases from the first trial and from
`audit.md`. The current `.claude/` agents review the new skills, and are retired only
after step 5.

### Step 4: Set up, and keep current

Move `marketplace-init` into the package as `set-up`, and fold in what the first trial
found: on an existing setup, plugin keys that no longer exist are proposed for removal
instead of kept. Add `keep-current`. To find trios built from older templates, set-up
records which version of the package built each generated file.

### Step 5: Contribute

The contribution trio, the `contribute` skill and the front door, as in section 4.
Then retire the `.claude/` agents and the `new-plugin` skill they replace.

### Step 6: Adopt

Adoption, as in section 4: taking stock, the split into rules, the plan, the pending
list, and keep-current removing a local copy once its central home is live. It needs
both set-up and contribute, so it comes after them.

### Step 7: Register and guard

The package goes into all three registrations, and `marketplace-init` comes out.
`check-catalog.mjs` gets the new catalog path, and whatever M1 decides about several
skills in one plugin. Update `CLAUDE.md`, `CONTRIBUTING.md` and the root README. This
repo's `.claude/settings.json` enables the package.

### Step 8: Trials, from scratch

In a fresh config directory:

- Set up a copy of a project that uses a Language skill, and a folder with no code.
- Adopt a copy of a project with its own skills, agents, rules and hooks. Check that
  every rule got a home, and that nothing was removed before its home was live.
- Run keep-current on a copy of a project set up by the old init.
- Make one real contribution end to end, from a lesson found in a trial to a PR.
- Check that the front door stays quiet during ordinary project work.

### Step 9: Merge and migrate

Merge by PR. In your own config, uninstall `marketplace-init` and install the package
at user scope. No generated project file names init, so projects need nothing for the
rename. Then, in each project that uses the marketplace, run keep-current, or an
adoption where the project still has a setup of its own.

### Step 10: After a few real contributions

Add the candidates list, and evals for `place-knowledge` built from the cases so far,
run with `--ablation with-without`.

---

## 6. Risks

| Risk | Why nothing reports it | Guard |
|---|---|---|
| A project's details leak into the public marketplace | The diff looks like any other change | The strip test at Plan, the leak check at Check, and you read the public text twice: at the plan and in the PR |
| Every skill of the package costs context in every session of every project | Descriptions load without a trace | M1; one front door; any other skill hidden from the list where it can be |
| A contribution renames or removes a plugin, and projects lose it | The settings still look right (the lesson of 2026-10-19) | Plan flags breaking changes, the PR carries the migration, keep-current finds the dead keys |
| The shipped contribution agents drift from the role templates | They are two copies | Check compares them (if O4 is "ship") |
| A contribution changes your own checkout while you work in it | Uncommitted work, or the wrong branch checked out | One worktree per contribution, never your checkout |
| The package approves its own work | The same context writes and judges | Do and Check are separate agents, and the merge is yours |
| The front door fires during ordinary project work | A broad trigger competes with every trio | D29; its description names only setup and knowledge; step 8 checks it |
| An adoption loses a local rule | A deleted rule leaves no trace | The plan quotes every rule with its new home, and nothing is removed before that home is live |
| A local rule differs from the central skill, and the difference disappears | The two look like the same rule | Adoption has separate homes for "different because the project is" and "the local one is better" |
| Work on the package runs the installed copy of itself, from `main` | This repo uses the package too | `--plugin-dir` (M5) |
