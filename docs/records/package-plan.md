# The steward: plan

How `marketplace-init` and the planned contributor become one package,
`marketplace-steward`. It sets a project up, adopts a setup the project already has,
keeps the setup current, and grows the marketplace. Section numbers (§) refer to
`concept.md`. D and O numbers continue the ones in `plan.md`.

**Status:** approved 2026-10-19, on branch `marketplace/one-package`. Steps 0 to 6 are
done. The documentation half of step 7 moved to `docs-plan.md`, which runs next; the
rest of step 7, the trials and the merge follow it. The plan replaces step 11 of
`plan.md` and starts its step 9 trials over. Every step ends with a report and a stop
until it is approved. Nothing on this branch names a project, so it merges as a normal
PR.

---

## 1. What the steward is

One plugin, installed once at user scope, so that it works in every project, including
one that was never set up. You talk to it, and it works out which of four jobs you
mean:

| Job | What it does | Writes to |
|---|---|---|
| Set up | What init does today: read the project, write `AGENTS.md`, install the skills, create the trios, verify, report. Where the project needs knowledge no central skill has, it proposes a new skill | The project, and the marketplace for a new skill |
| Adopt | Set up a project that already has a setup of its own: skills, agents, rules, hooks, commands, a long `CLAUDE.md`. Every piece gets a home: a central skill that already covers it, a central skill that is extended or created for it, the project's `AGENTS.md`, a trio, or it stays as project mechanics | The project and the marketplace |
| Keep current | Finds where the setup has drifted, and fixes it: enabled plugins that no longer exist, `skills:` names that don't resolve, trios built from older templates, catalog plugins the project now calls for, `AGENTS.md` lines that are no longer true | The project |
| Grow the knowledge | Turns a problem described in conversation into a change to a skill, or a new skill, on a branch of the marketplace, and opens a PR | The marketplace |

Its scope is the setup and the knowledge. The project's own work stays with its trios.

**It stops for your OK only before it creates a new skill** (D33). A new skill is a
decision about the cut, which is taste: its layer, its name, and where it stops.
Everything else goes ahead and is reported. What it writes in a project is a diff you
review, because it never commits there. What it changes in the marketplace reaches
`main` only through a PR you merge.

Adopting and growing stand or fall on one judgement: does a lesson belong to this
project, or does it travel? Growing applies it to a problem you describe, adopting to
every rule an existing setup holds. The steward makes it in four moves.

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
3. **You decide where it is taste**: before a new skill, and in the PR. Both show the
   exact public text.
4. **Corrections become examples.** Each split you overrule, at the OK or in the PR,
   becomes a stripped, worked example in the skill, so the judgement grows from real
   decisions.

Two more parts wait until the steward has handled a few real cases (step 10): a list
of candidates, for lessons that stay local until they show up in a second project, and
evals.

---

## 2. Decided

All decided on 2026-10-19.

| # | Decision | What it changes |
|---|---|---|
| D27 | One package replaces `marketplace-init` and the planned `marketplace-contributor` | Supersedes D10. A `marketplace-` plugin may ship several skills, not only agents (§5.1, §5.3) |
| D28 | You are the only contributor for now. A contribution is a branch in your repo, with no fork flow | The steward needs push rights to your repo, nothing more |
| D29 | The scope is the setup and the knowledge, not the project's own work | The front door triggers only on those |
| D30 | The judgement is the four moves in section 1. The candidates list and the evals come later | Steps 3 and 10 |
| D31 | Set-up adopts an existing setup instead of adding to it. What a central skill covers is removed locally, what should be central becomes a contribution, and only what belongs to the project stays | Section 4, step 6 |
| D32 | The package is named `marketplace-steward` | Its path, its registrations, and its skills' `plugin:skill` names |
| D33 | No trio for the steward. It does the work itself, and stops for your OK only before it creates a new skill, whether in set-up, in adoption, or from a conversation | Replaces init's plan stop (§8.2, 2026-09-17). The rule from the same day stays: it never touches git in the project, so you review its work as a diff |
| D34 | No lanes. The steward is the only writer, and the agents it ships are helpers, read-only by frontmatter | Supersedes the §9 rule of 2026-10-13 that the contributor never edits `AGENTS.md` |
| D35 | Hooks, MCP servers, and commands that run a tool stay in the project. A hook that only injects text is knowledge, and is adopted like any rule | The mechanics row of adoption |
| D36 | Two skills are visible: the front door, and `evaluate-skills`, which the checker preloads. The jobs and the rest of the knowledge are reference files at the plugin root, read by path | From M1. Section 4 |
| D37 | No plugin option. The steward keeps its own clone of the marketplace in `~/.local/share/marketplace-steward/`, and works in one worktree per contribution there. Not in its data folder: Claude Code treats every file under `~/.claude` as sensitive and asks before each write, whatever a skill allows (found in step 5) | From M2 and M4, and step 5. Section 4 |

## 3. Open

Nothing right now. O3 to O6 were answered on 2026-10-19 and became D32 to D35.

---

## 4. The shape

```
plugins/marketplace-steward/
  .claude-plugin/plugin.json
  README.md
  references/                shared by the front door, evaluate-skills and the checker
    set-up/                  today's init-agent-setup, with its references and assets,
                             and adoption
    keep-current.md          the drift checks and their fixes
    record.md                `.claude/steward.json`: what was generated, and its hash
    contribute.md            the change on a branch, the check, the PR
    place-knowledge.md       the four moves and §4.3: the one home of the cut
    author-skills/           the house voice, the plugin shape and its registrations,
                             and the templates
  skills/
    steward/SKILL.md         the front door: routes a request to one of the four jobs
    evaluate-skills/SKILL.md the checks on a skill, a plugin, a change and the whole set
  agents/
    codebase-cartographer.md   surveys a project; read-only
    contribution-checker.md    checks a change before its PR; read-only
```

Only the two skills add a description to every session (D36). The references sit at
the plugin root because three readers share them. The front door reads them by path,
and its frontmatter allows that:
`allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/**)`. The rule needs the leading `/`,
because after substitution it must start with `//` to be an absolute path. The cost is
one approval to run the front door, which Claude Code asks for once and can remember.

The checker exists because the writer shouldn't judge its own work: it is the same
split as `@skill-writer` and `@skill-evaluator` today, without adding a stop for you.
It preloads `evaluate-skills` and `craft-review:review-work`, so the steward depends on
`craft-review`. `check-catalog.mjs` allows that: `marketplace` comes last in its
order, so it may depend on every layer.

### What moves where

| Today | After |
|---|---|
| `plugins/marketplace-init/` | `set-up`, and the cartographer |
| The cut: §4.2 and §4.3, the "decide where the knowledge goes" part of `new-plugin`, and `.claude/rules/authoring.md` | `place-knowledge`. The concept keeps the principle and points to the reference |
| `.claude/skills/new-plugin/`, with `authoring-style.md` and the templates | `author-skills`, and `contribute` for the steps |
| `.claude/agents/skill-writer.md` | The steward itself, with `author-skills` |
| `.claude/agents/skill-evaluator.md` and `plugin-evaluator.md` | `evaluate-skills`, used by the checker |
| `.claude/agents/marketplace-architect.md` | The whole-set checks in `evaluate-skills`, used by the steward when it places knowledge and by the checker after the change |
| This repo's `.claude/` | Enables the steward, and keeps only what is about this repo |

### A contribution, end to end

1. The front door hears a problem and diagnoses it. If the fix isn't knowledge, it
   says so, and hands it to keep-current or to the project's `AGENTS.md`.
2. The steward runs the strip test and places the knowledge: an existing skill first
   (rule 2), a new one only where none fits. It checks the whole set for overlaps,
   competing triggers and dependency direction, and flags a breaking change: a rename,
   a removal, a split.
3. **A new skill waits for your OK.** The steward shows its layer, its name and the
   public text, and waits. A change to an existing skill goes ahead.
4. The steward works in its own clone of the marketplace, kept in
   `~/.local/share/marketplace-steward/clone` and cloned from the marketplace's GitHub
   source on first use (D37). Each contribution gets a worktree there, on a new branch
   off `origin/main`, so your own checkout is never touched. It writes, registers in
   all three places, validates, runs `check-catalog.mjs`, and commits. It pushes only
   after the check, in step 6.
5. The checker reviews the change: the house standard, the whole set, and the leak
   check, which compares the diff with the identifiers of the project the lesson came
   from, such as its folder and package names, its git remote, and the names in its
   `AGENTS.md`. Its findings go back to the steward, for at most two rounds. Anything
   still open goes into the PR description.
6. The steward pushes the branch and opens the PR with `gh`. Without `gh`, it prints
   the compare link with the title and description filled in. A breaking change
   carries its migration in the PR description.
7. If the lesson had a project part, the steward writes it into the project.
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
   | A hook, an MCP server, a command that runs a tool, a permission | Stays: it is project mechanics (D35) |
   | Dead, or about this machine | Removed |

4. **The report shows every rule**, grouped by the file it came from, quoted, with its
   new home. The steward stops only before a new skill.
5. **Nothing is removed before its new home is live**, as D1 required of the
   marketplace's own agents. A rule that waits for a contribution stays where it is
   until the PR is merged and the central skill is installed and loads. Set-up records
   it as pending, and keep-current removes the local copy once the central one is
   live. A file git doesn't track is copied before it is removed, and the report says
   where the copy is.

This repo's own `.claude/` is the first adoption: its tooling moves into the steward
in steps 3 and 5.

---

## 5. Steps

### Step 0: This plan

Approved.

### Step 1: The concept

Rewrite §9 as the steward, and bring §3, §5.1, §5.3, §8 (the plan stop goes, D33),
§10, §12 and §13 in line with it. Add the four moves to §4.3 as the principle; the
skill becomes their working home. Record D27 to D35. Stop for approval, because every
later step builds on it.

### Step 2: Probe the mechanics

In a separate config directory, as in the first trial, and with nothing named after a
project:

- **M1.** Can a plugin skill be hidden from the model's skill list
  (`disable-model-invocation`) and still be preloaded by the plugin's own agents, and
  run by the front door? The answer decides how many descriptions the steward adds to
  every session in every project.
- **M2.** How does a skill read a plugin option set with `claude plugin configure`?
  The option holds the path of your marketplace clone.
- **M3.** Does the checker preload the steward's own skills, and keep its
  `disallowedTools` and `effort`?
- **M4.** Worktree, branch off `origin/main`, push and PR, with `gh` and without it.
- **M5.** Does `claude --plugin-dir` let this repo work on the steward while the
  installed copy stays on `main`?

Each answer goes into this plan before step 3.

What was done: probes on 2026-10-19, with a probe plugin loaded by `--plugin-dir`, so
nothing was written to your config. A canary string in each place showed whether it
reached the model's context.

| | Result | What it changes |
|---|---|---|
| M1 | `disable-model-invocation: true` does keep a skill's description out of context, but such a skill can't be preloaded by an agent, and Claude can't run it: the Skill tool refuses, and tells Claude not to reproduce its workflow another way. `claude plugin details` still counts its description, so its estimate is high. A reference file read by path works, once the front door allows the read | D36: two visible skills; everything else becomes references |
| M2 | `${user_config.KEY}` is not filled from the option's `default` when no value is saved, and saved values live only in user or managed settings. A saved value wasn't tested, because that writes to your settings. `${CLAUDE_PLUGIN_DATA}` is filled in skill text | D37: no option; the steward's own clone lives in its data folder |
| M3 | The plugin's agent preloads the plugin's own visible skills, `${CLAUDE_PLUGIN_ROOT}` is filled in its body, and `disallowedTools` removes Write. `effort` is supported by the docs; nothing in a run shows it | None |
| M4 | Clone, fetch, a worktree on a branch off `origin/main`, commit, push and remove the worktree all work against a stand-in remote, and a checkout on another branch with an uncommitted edit stays as it was. `gh` isn't installed; the compare link works without it | In step 5, the front door's `allowed-tools` should allow the exact git commands, so they run without a prompt each |
| M5 | `--plugin-dir` replaces the installed plugin of the same name for that session, silently; the debug log says `overrides installed version`. Found in step 3: a plugin whose dependency isn't installed doesn't load at all, so a session on the steward also needs `--plugin-dir ./plugins/craft-review` | Working on the steward takes one `--plugin-dir` per plugin it depends on |

### Step 3: The knowledge

Write `place-knowledge` and `author-skills` as references at the plugin root, and
`evaluate-skills` as a skill, from the material in section 4. Seed `place-knowledge`
with stripped cases from the first trial and from `audit.md`. The current `.claude/`
agents review the new files, and are retired only after step 5.

What was done:

- `references/place-knowledge.md`: the four moves, the layers, the cut as checks, when
  it is taste, and nine stripped cases.
- `references/author-skills/`: `style.md` is the old `authoring-style.md`, moved with
  its history. The cut left it for `place-knowledge.md`, and it gained the writer's
  rules on substance and how a `marketplace-` plugin packages its knowledge.
  `plugin-shape.md` holds what `new-plugin` knew: the files, dependencies, the README,
  the three registrations, no version, and verifying. The templates moved with it.
- `skills/evaluate-skills/`: the checks of the three evaluator agents, without their
  role text, and the leak check.
- Every file that named the old paths now names the new ones. `new-plugin` is only
  the order of the steps, pointing to the knowledge.
- The steward is registered in all three places, as a draft, so `check-catalog.mjs`
  passes. The catalog row tells set-up never to install it yet.
- Two more probes: an agent started from inside the front door may read the
  references under the front door's `allowed-tools` rule, with no prompt of its own,
  and `${CLAUDE_PLUGIN_ROOT}` is filled in inside a preloaded skill. That is what
  lets the checker read the same standard the steward writes by.
- Until step 5, the three evaluator agents in `.claude/agents/` keep their own copies
  of the checks. They review this step's files, so they stay as they were.
- `@skill-evaluator` and `@marketplace-architect` reviewed the step, and their
  findings are fixed: `evaluate-skills` names Claude Code plugins in its description,
  so it stays quiet in projects that build other kinds of plugins. It also has the
  `allowed-tools` read rule, uses `review-work`'s report shape, points to the cut
  instead of restating it, and reports a leak check without inputs as not run. The
  dependency rule has one home, with "needed unconditionally" in it. What a
  `marketplace-` plugin does differently moved from `style.md` to `plugin-shape.md`.
  The concept says two visible skills and reference files, as D36 does.

### Step 4: Set up, and keep current

Move `marketplace-init` into the steward as `set-up`, without its plan stop (D33): it
stops only before a new skill, and it proposes one where the project needs knowledge
no central skill has. Fold in what the first trial found: on an existing setup, plugin
keys that no longer exist are removed instead of kept. Add `keep-current`. To find
trios built from older templates, set-up records which version of the steward built
each generated file.

What was done:

- **The front door was built now, not in step 5,** and `marketplace-init` left now, not
  in step 7. Set-up became a reference file, which nothing can run without the front
  door, and copying init's files instead of moving them would have given everything
  two homes. The front door, `skills/steward/`, routes the two jobs that exist and
  holds the rules every job shares: the one stop, no git, Claude only, the record, and
  unknowns in the report. Step 5 adds contributing to it, and step 6 adoption.
- **Set-up** is init's skill and references, moved with their history to
  `references/set-up/`. Phase 3 decides instead of proposing, and a new skill is asked
  once, at the end. Phase 5 removes plugin keys that no longer exist, and phase 6
  writes the record. The report carries what the plan used to show, and gains Proposed
  skills.
- **The record**, `.claude/steward.json`, holds every file the steward created, with
  its hash, its template's hash and the values it was filled with, plus the plugins it
  installed and the skills the user declined. A file whose hash no longer matches was
  changed by the user and is never rebuilt. What the record holds and the project
  lacks was removed by the user and is not added back. With no record, as in every
  project set up by the old init, nothing is rebuilt.
- **Keep-current** removes dead plugin keys, using a new Renamed table in the catalog
  that maps every old plugin name to its successor. It also repairs `skills:` names,
  rebuilds untouched trios from newer templates, installs what the project now calls
  for, and fixes `AGENTS.md` lines it can verify.
- **The registrations, `check-catalog.mjs` and every path** name the steward. Step 7
  keeps the rest of its list.
- **The always-on cost is about 460 tokens**, by `claude plugin details`: the front
  door about 200, `evaluate-skills` about 170, the cartographer about 90. That compares
  with about 360 for `marketplace-init` and its cartographer. The cartographer's
  description now names the steward, so it no longer competes with ordinary
  exploration in every project.
- A smoke test loaded the front door with `--plugin-dir`, and it read its references
  with no prompt of its own. A full run is for the step 8 trials.
- `@skill-evaluator` reviewed the step, and its findings are fixed:
  - **The record:** it decides a rebuild by the template's hash, not the marketplace
    version, which changes on every push. An entry is refreshed only when its file
    matched before the edit, and set-up never writes over a file that exists.
  - **One home each:** the dead-key rule now lives in the catalog, and the front door
    names both questions it may ask, the sources checklist and the OK for a new skill.
  - **The description** no longer catches a bare "set this up" or "onboard me", and it
    says it is not for setting up a tool, a service or CI.
  - **Routing:** asking for one more trio has its own route, and a project with a
    record goes to keep-current.
  - **Keep-current** has its own report shape, and when the user names one symptom it
    checks only that one.

### Step 5: Contribute

The `contribute` skill, the checker and the front door, as in section 4. Then retire
the `.claude/` agents and the `new-plugin` skill they replace. Two things the step 3
review handed on: the steward passes the checker the strip list and the source
project's identifiers, without which the leak check can't run, and the checker's own
file holds only its lane and failure modes, not what `evaluate-skills` already says.

What was done:

- **`references/contribute.md`** runs a lesson end to end:
  - place it, and ask only for a new skill;
  - write it in a worktree of the steward's own clone, with a Renamed row for any
    breaking change and a §6 case for any overruled placement;
  - draft every public text, the commit message, the title and the description, before
    the check;
  - check it, then push the branch and open the pull request, or give the compare link
    when `gh` is missing;
  - remove the worktree and the local branch.

  A leak, or a leak check that didn't run, stops the job before the push. Proposals
  accepted at the end of set-up arrive already placed, and run once each.
- **`agents/contribution-checker.md`**, read-only, preloads `evaluate-skills` and
  `review-work`, and holds only its lane and failure modes. It reads and searches the
  worktree, never the project, and checks the commit messages, the branch name and the
  drafted texts as well as the diff.
- **The front door** routes the contribute job, and a placement the user changed in a
  pull request. Its description takes the contribution triggers, and leaves out
  remembering a preference for Claude, which is memory. Its `allowed-tools` names each
  command the procedure and the checker run, in the exact form they run it.
- **D37's clone moved** to `~/.local/share/marketplace-steward/`. A probe showed that
  every write under `~/.claude` is refused as sensitive whatever a skill allows, while
  home-relative rules outside it work without prompts. A wildcard in the middle of a
  rule works, and a command it doesn't cover is refused. So the git rules name
  `fetch`, `worktree`, `add`, `commit -F`, `diff`, `log` and `push -u origin
  contrib/*` only. A push to `main` written as `contrib/x:main` would still match, so
  branch protection on `main` is the real guard.
- **`evaluate-skills`'s leak check** covers everything a change will publish, and a
  plugin or skill name that leaves the catalog without a Renamed row is Blocking.
- **Retired:** the four agents in `.claude/agents/` and `/new-plugin`. `CLAUDE.md`, the
  README and `CONTRIBUTING.md` now point to the steward.
- `@skill-evaluator` reviewed the step before it was retired, and its findings are
  fixed.
- **The always-on cost is about 580 tokens** by `claude plugin details`. The front
  door's description carries the triggers of four jobs.

### Step 6: Adopt

Adoption, as in section 4: taking stock, the split into rules, the report, the pending
list, and keep-current removing a local copy once its central home is live. It needs
both set-up and contribute, so it comes after them.

What was done:

- **`references/adopt.md`** runs set-up with more to read. It takes stock of every
  Claude file of the project's and splits it into rules. A table gives each rule its
  home and says what happens to the local copy. Set-up's phases then run with those
  homes, and each local copy goes only once its home is live.
- **"Live" is defined once:**
  - a file the steward wrote, once written;
  - a toolkit skill, once it loads and is in the `skills:` of the roles that do that
    work;
  - a contribution, once merged, with the installed copy saying the same thing.

  Until then a rule stays where it is, and goes in the record's new `pending` once its
  pull request exists.
- **Nothing is lost:**
  - a rule is removed, never a file, until every rule in the file has a live home;
  - a lane or a "must not" goes only when the role template says the same thing;
    otherwise it goes to `AGENTS.md`, or to a contribution to the template;
  - only a toolkit skill can cover a rule;
  - a covered rule in an `AGENTS.md` that other tools read stays;
  - every file that differs from git's `HEAD` is backed up first, to
    `~/.local/share/marketplace-steward/backups/`, never over an earlier backup.
- **Keep-current's new step 7** clears `pending` after the merge, installing the
  plugin if the project lacks it. It removes the rule only when the file still holds
  it exactly as recorded, and reports an edited one as a possible lesson. A closed
  pull request leaves the rule as a project rule.
- **Set-up's phase 6** builds a trio whole or not at all when one of its paths is
  taken. **The front door** decides by what the project has: a Claude setup with no
  record is adopted first, also when only a trio was asked for.
- **Adoption was reviewed** by a separate agent applying `evaluate-skills`, because
  the old reviewer agents are retired. Its findings are fixed: four ways knowledge
  could be lost, the `pending` lifecycle, a stale record, backups a second run could
  overwrite, partial trios, and one routing case.

### Step 7: Register and guard

The registrations and the catalog path in `check-catalog.mjs` were done in step 4.
Update `CLAUDE.md`, `CONTRIBUTING.md`, `.claude/rules/authoring.md` and the root
README: they keep this repo's own mechanics, such as CI, the commands and the layout,
and point to the steward's references for the cut and the style instead of restating
them. This repo's `.claude/settings.json` enables the steward. Its README gets an
install line.

### Step 8: Trials, from scratch

In a fresh config directory:

- Set up a copy of a project that uses a Language skill, and a folder with no code.
- Set up a project that needs knowledge no central skill has, and check that the
  steward stops before the new skill.
- Adopt a copy of a project with its own skills, agents, rules and hooks. Check that
  every rule got a home, and that nothing was removed before its home was live.
- Run keep-current on a copy of a project set up by the old init.
- Make one real contribution end to end, from a lesson found in a trial to a PR.
- Check that the front door and `evaluate-skills` stay quiet during ordinary project
  work, including in a project that builds plugins of another kind.

### Step 9: Merge and migrate

Merge by PR. In your own config, uninstall `marketplace-init` and install the steward
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
| A project's details leak into the public marketplace | The diff looks like any other change | The strip test when placing, the checker's leak check, and you read the public text in the PR, and before any new skill |
| Set-up or adoption makes a wrong call in the project, with no plan stop before it | The result looks like a finished setup | It never commits in the project: everything it wrote is a diff you review, and the report lists every file |
| Every skill of the steward costs context in every session of every project | Descriptions load without a trace | D36: two visible skills and two agents; the rest are references |
| A contribution renames or removes a plugin, and projects lose it | The settings still look right (the lesson of 2026-10-19) | The steward flags breaking changes, the PR carries the migration, keep-current finds the dead keys |
| A contribution changes your own checkout while you work in it | Uncommitted work, or the wrong branch checked out | One worktree per contribution, never your checkout |
| The steward approves its own work | The same context writes and judges | The checker is a separate, read-only agent, and the merge is yours |
| The front door fires during ordinary project work | A broad trigger competes with every trio | D29; its description names only setup and knowledge; step 8 checks it |
| An adoption loses a local rule | A deleted rule leaves no trace | The report quotes every rule with its new home, nothing is removed before that home is live, and an untracked file is copied first |
| A local rule differs from the central skill, and the difference disappears | The two look like the same rule | Adoption has separate homes for "different because the project is" and "the local one is better" |
| Work on the steward runs the installed copy of itself, from `main` | This repo uses the steward too | `--plugin-dir` (M5) |
