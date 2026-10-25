# Decisions

Every decision that shaped this marketplace, with its date and where it lives now, so
you can tell why something is the way it is before you change it.

A decision marked **superseded** names the one that replaced it. Its row stays, because
the reason it was made is often the reason its replacement has the shape it has.

## Contents

- [The author's statements](#the-authors-statements)
- [The restructure: D1 to D26](#the-restructure-d1-to-d26)
- [The steward: D27 to D37](#the-steward-d27-to-d37)
- [The documentation: D38 to D45](#the-documentation-d38-to-d45)
- [Models: D46](#models-d46)
- [The repo's own setup: D47 and D48](#the-repos-own-setup-d47-and-d48)
- [Borrowed ideas: D49 to D52](#borrowed-ideas-d49-to-d52)
- [Claude only: D53](#claude-only-d53)
- [Contributions that finish: D54](#contributions-that-finish-d54)
- [The repo's own plugins: D55](#the-repos-own-plugins-d55)
- [Measured cost: D56](#measured-cost-d56)
- [Documentation on Sonnet: D57](#documentation-on-sonnet-d57)
- [Conventional Commits: D58](#conventional-commits-d58)
- [Only you start a trio: D59](#only-you-start-a-trio-d59)
- [Short reports: D60](#short-reports-d60)
- [Project scope only: D61](#project-scope-only-d61)
- [Still open](#still-open)

## The author's statements

The idea was developed between 2026-09-08 and 2026-10-13, across six working sessions
and a presentation, "Enterprise AI marketplace: Plugins für einen Einstieg in Agentic
AI". These are its statements, by date.

| Date | Statement | Now |
|---|---|---|
| 2026-09-08 | A starter plugin with init agents, a list of skills, and orchestrators, built by contribution | Holds as the steward; the orchestrators are parked (D6) |
| 2026-09-15 | One plugin with many skills to choose from; skills hold knowledge of technologies and their best practices | **Superseded** by one skill per plugin (2026-10-08) |
| 2026-09-17 | Init refreshes the marketplaces first, and asks for the sources once, as a checklist. The house marketplace comes first. It never touches git in the project; the developer stays in control. Unknowns go in the report. Less text. It shows a plan and waits | Holds, except the plan stop: **superseded** by D33 |
| 2026-09-29 | Centralise the knowledge and normalise how it is used; everyone contributes and refines; developers still develop | Holds |
| 2026-10-06 | "It is not a tool, it is a tooling fabric." A lego knowledge base. It works for non-technical work too. A contributor that turns problems into skill changes | Holds; the contributor is part of the steward (D27) |
| 2026-10-07 | Four layers, with examples. An agent is a role plus a set of skills. A task is solved by a trio, Plan, Do and Check, with a hard stop. Some skills are shared by all three | Holds |
| 2026-10-08 | One skill per plugin. Init creates the trio in the project. Agents local, skills central | Holds; the steward is the one exception (D27) |
| 2026-10-09 | Check checks against the plan. Plan and Check are read-only and hold only abstract knowledge. Tool skills go to Do. The company vision goes to Plan | Holds |
| 2026-10-13 | Init writes `AGENTS.md`, then installs skills, then creates agents. Init installs the skills itself. The contributor only touches knowledge. It proposes, and a human approves | Holds: every change waits for the maintainer's merge. The file is `CLAUDE.md` since D53. "Only touches knowledge" is **superseded** by D34 |

## The restructure: D1 to D26

All decided on 2026-10-19, while the marketplace was restructured into layers. D1 to D7
answer the author's open questions; question 4 stayed open, so there is no D4 (see O1).

| # | Decision | Why | Now |
|---|---|---|---|
| D1 | Keep the knowledge of the agents the plugins shipped, and reorganise it | "We should keep the knowledge and reorganize it." No paragraph is deleted until it has a new home | Done; the same rule guards adoption |
| D2 | Agents are created in each project, from marketplace skills | Workers local: an agent belongs to the project and task it serves | Holds |
| D3 | A trio solves a task; effort differs per task; Plan and Check stay read-only | Different efforts for different tasks, and read-only roles spend fewer credits | Holds |
| D5 | The layer is part of the plugin's name, and its `category` | The author wanted the categories visible in the names | Holds |
| D6 | Orchestrators are parked | "We will rethink that later, if at all" | Holds |
| D7 | `development-standards` is Craft; parts may split out as Universal | Not generic enough to be Universal as a whole | Done in D17 |
| D8 | The restructure happens on one branch, merged in one PR | `main`, and so every project, sees one change instead of eleven | Done |
| D9 | Plugins are named `<layer>-<topic>`; skill names stay | Follows D5 | Holds |
| D10 | Two marketplace plugins: `marketplace-init` and `marketplace-contributor` | Both work on the marketplace itself | **Superseded** by D27 |
| D11 | Set-up creates each trio's run pattern in the project; no separate plugin holds it | — | Holds, in the steward |
| D12 | Default effort: Plan `high`, Do `medium`, Check `medium`, adjusted per task with a reason | Follows D3: effort differs per task | Holds; the reason now goes in the report (D33) |
| D13 | Set-up installs the skills itself, and the report keeps a paste block for other machines | The paste block lets another machine reproduce the same installs | Holds; "once its plan is approved" was superseded by D33 |
| D14 | Claude only: agents go to `.claude/agents/`; files name no model | No model name, because the knowledge must outlive any one vendor's tool. No reason is recorded for Claude only | Claude only holds; no model name is **superseded** by D46 |
| D15 | Init keeps `codebase-cartographer` as its own helper | It works for set-up, not for a project | Holds, in the steward |
| D16 | One project skill per trio, invoked as `/<task>`, runs Plan, stops, runs Do and Check; `AGENTS.md` lists the trios | Which tasks a project has is a project fact | Holds; the root `CLAUDE.md` lists them since D53 |
| D17 | What holds for any work splits out of `development-standards` into a Universal skill: read before writing, match what is there, hold scope, verify | Those parts hold for any work, so they are Universal | Became `universal-work-discipline` (D24) |
| D18 | A role's generic report lives in its role template; a kind of work's report in its Craft skill | Each half of a report has one home | Holds |
| D19 | Pinia leaves `vue-conventions` for `tools-pinia` | A project can use Vue without Pinia | Holds |
| D20 | The TypeScript parts leave `vue-conventions` for `tools-vue-typescript` | A project can use Vue without TypeScript | Holds |
| D21 | `description` lives only in the marketplace entry | Set in both places, the manifest silently wins | Holds; `check-catalog.mjs` enforces it |
| D22 | `craft-code-review` and `craft-refactoring` name `clean-code` explicitly | Their dependency stays true without the old agents | Holds |
| D23 | The generic review skill is `craft-review`, with `review-work` | Reviewing is a kind of work, and not only code gets reviewed | Holds |
| D24 | The Universal skill from D17 is `universal-work-discipline` | — | Holds |
| D25 | `tools-vue-typescript` also depends on `tools-vue` | It names `vue-conventions`; a dependency within one layer is allowed when unconditional | Holds |
| D26 | The restructure merges as one squash commit from a fresh branch | The old branch's history held a project name that must not become public | Done |

## The steward: D27 to D37

All decided on 2026-10-19, while the steward was built.

| # | Decision | Why | Now |
|---|---|---|---|
| D27 | One package, `marketplace-steward`, replaces init and the planned contributor | "Initialize and also keep working in his project", and keep what a project teaches for the next one | Holds |
| D28 | The maintainer is the only contributor for now: a contribution is a branch in their repo, with no forks | — | Holds |
| D29 | The steward's scope is the setup and the knowledge, not the project's own work | The project's trios do the work; a broader trigger competes with every trio | Holds |
| D30 | A lesson is placed by four moves: diagnose, strip, let the user decide where it is taste, keep corrections as examples | Most knowledge arrives tangled with its project | Holds, in `place-knowledge.md` |
| D31 | A project's existing setup is adopted, not set up over | Two sets of instructions agree today and drift apart tomorrow | Holds, in `adopt.md` |
| D32 | The name is `marketplace-steward` | The proposed name, accepted: it sets up, keeps current and grows | Holds |
| D33 | No trio for the steward; it asks only before creating a new skill, besides the one-time sources checklist | A trio would make the process too difficult; a new skill is a decision about the cut, which is taste | Holds; supersedes init's plan stop. D53 adds a third question: keep or swap a project's `AGENTS.md` files. D58 adds a fourth: whether a project with code writes Conventional Commits |
| D34 | No lanes: the steward is the only writer, and its helpers are read-only | One writer has no lane to keep | Holds; supersedes "the contributor only touches knowledge" |
| D35 | Hooks, MCP servers, tool commands and permissions stay in the project; a hook that only injects text is knowledge | The marketplace ships knowledge, not mechanics | Holds |
| D36 | Two visible skills, the front door and `evaluate-skills`; the rest is reference files read by path | Every visible skill costs a description in every session of every project; a hidden skill can't be preloaded | Holds |
| D37 | No plugin option: the steward keeps its own clone in `~/.local/share/marketplace-steward/` | An option isn't filled from its default, and Claude Code asks before every write under `~/.claude`, whatever a skill allows | Holds; the location moved there while contributing was built |

## The documentation: D38 to D45

All decided on 2026-10-19, while this documentation was planned.

| # | Decision | Why | Now |
|---|---|---|---|
| D38 | Plain Markdown on GitHub, with Mermaid, and no build | The repo has no build and no dependencies on purpose | Holds |
| D39 | The concept page is dissolved: its explanations into the docs, its rules into the product and `CLAUDE.md` | "The concept can now live in the new documentation and agentic setup" | Done |
| D40 | The full plugin table lives in `reference/plugins.md`, checked by `check-catalog.mjs` | The landing page names the layers; the list belongs in reference, where a check reads it | Done |
| D41 | `.claude/rules/authoring.md` becomes a pointer | It loads whenever a skill file is touched, and should restate nothing | **Superseded** by D47 |
| D42 | A docs check, `scripts/check-docs.mjs`, runs in CI | Broken links are the docs' silent failure | Done |
| D43 | Writing the documentation stops for the maintainer twice: once the structure is laid, and once the whole set is done | The structure is what every later page sits in | Holds |
| D44 | No page refers to the working records the marketplace was built from: the docs carry what they need | The docs stand on their own | Holds |
| D45 | The working records' folder has a name that says what it holds | — | Holds |

## Models: D46

Decided on 2026-10-20, when the token cost of the setup came under review.

| # | Decision | Why | Now |
|---|---|---|---|
| D46 | Every agent names its model as an alias beside its `effort`, set per role; every role starts on `opus` | The setup is Claude only, so a model name costs no portability, and the model is where a role's cost is decided | Holds; measuring decides which roles move to a cheaper model, except a documentation trio's (D57) and Do, which runs on `sonnet` (D59) |

## The repo's own setup: D47 and D48

Decided on 2026-10-20, when the token cost of the setup came under review.

| # | Decision | Why | Now |
|---|---|---|---|
| D47 | The repo has no path-scoped rules; `CLAUDE.md` alone points to the files that hold the rules | Both rules repeated the table `CLAUDE.md` already loads in every session, so they cost tokens and a second place to keep in sync | Holds |
| D48 | The repo keeps one agent of its own, `change-reviewer`, read-only, preloading `evaluate-skills` and `review-work` | A change made by hand is reviewed by a separate agent, which otherwise had to be briefed from scratch each time. It costs a description only in sessions in this repo | Holds; starts on `opus` until measuring says otherwise |

## Borrowed ideas: D49 to D52

Decided on 2026-10-20, after comparing the marketplace with a larger skill library that
installs one person's whole workflow everywhere. Its lifecycle, state files and quality
gates stayed out: the steward chooses per project, and they assume one way of working
in every one. Plain English is the exception, because every project has text to read.

| # | Decision | Why | Now |
|---|---|---|---|
| D49 | A Language skill for English, `language-simple-english`, after Simplified Technical English, installed in every project and given to every role | Every project has text a person reads, and every role writes for one. "I want it everywhere" | Holds, in the catalog and rule 6 of `set-up/trios.md`. The steward depends on it, so it also reaches every machine, and `style.md` applies it to this repo, text moving to it as it is edited |
| D50 | Plan looks facts up itself, and asks only what the user alone can answer, each decision with the answer it recommends | A question about a fact Plan could look up costs the user a round trip | Holds, in `roles/plan.md` |
| D51 | `clean-code` asks for names a search can find, and error messages that name the remedy | Whoever changes the code next, often an agent, finds callers by searching and acts on what an error says | Holds |
| D52 | Development is test first: `write-unit-tests` holds the red, green, refactor cycle, and `development-standards` makes it the way code changes where a test runner exists | A test written after the code has never been seen to fail. "That is actually a very good way to do things" | Holds; `craft-development` depends on `craft-unit-testing`, unconditionally, because the skill carries the rule and reports a missing runner; rule 7 of `set-up/trios.md` gives it to Do |

## Claude only: D53

Decided on 2026-10-20, once the setup was Claude only.

| # | Decision | Why | Now |
|---|---|---|---|
| D53 | The steward writes a project's context into `CLAUDE.md` and creates no `AGENTS.md`. When a project has `AGENTS.md` files, it asks once whether to keep them, each behind a `CLAUDE.md` that imports it, or swap them for `CLAUDE.md`, and records the answer. A kept one takes what the steward adds there; new component files are `CLAUDE.md` either way. An `AGENTS.md` that nothing imports goes through adoption either way | "We are Claude only now, let us get rid of the agents.md." Claude Code reads `CLAUDE.md`, so an `AGENTS.md` kept only for other tools costs an import line in every directory and a second file to keep true. But only the user knows whether another tool still reads a project's files: "if you find existing AGENTS.md ask if they are to be kept" | Holds, in `set-up/context-files.md`; keep-current asks in projects that earlier setups wrote. Other tools' own files still stay as they are |

## Contributions that finish: D54

Decided on 2026-10-20, after a test run ended without the contribution part. "That is
not ok."

| # | Decision | Why | Now |
|---|---|---|---|
| D54 | Adoption contributes in a step of its own, after set-up's checks and before any removal, and every contribution ends in a pull request, a reported stop, or the user's no to a new skill. A pushed branch with only a compare link is a stop, so `pending` holds only real pull requests. The report gives each one a row in a Contributions table, which an adoption never leaves out. The front door says a change to an existing skill opens its pull request without a pause | The step was one sentence at the end of another step, outside the set-up phases the steward follows, and no section of the report would show it missing. A model also tends to pause before a public pull request, and the pause became the end of the run | Holds, in step 5 of `adopt.md`, `set-up/report.md` and the front door |

## The repo's own plugins: D55

Decided on 2026-10-23, when the repo was set up from its own marketplace, to try the
plugins in the desktop app and to have simple English here.

| # | Decision | Why | Now |
|---|---|---|---|
| D55 | The repo enables `universal-work-discipline`, `craft-review` and `language-simple-english` at project scope, and leaves out the steward, the code Craft plugins and `language-javascript`. Its `CLAUDE.md` says that nothing under `plugins/` is a project rule or evidence of the stack, and that no rule in it travels | The steward reads its own source here, and without those lines a later run could take the product for the project's rules, remove the gist of "What breaks silently", or install the code plugins on the signal of two scripts. The steward belongs to the machine, as everywhere | Holds, in the section "This repo's own setup" of `CLAUDE.md` |

## Measured cost: D56

Decided on 2026-10-23, after reading claude-context-optimizer, a plugin that measures
what Claude Code sessions cost: "I want the steward to be able to do this kind of
analysis and make the setups of the docked projects more performant and cheaper."

| # | Decision | Why | Now |
|---|---|---|---|
| D56 | The steward measures what a project's setup costs, with a script it ships, `measure-setup.mjs`, adapted from that plugin under its MIT license. Keep-current measures in a step of its own and set-up after it writes. It moves only what it wrote and nobody edited, to where it loads on demand. It reports a plugin, trio or MCP server that no session used, and changes no model on the numbers. Taken: the baseline from a session's first request, usage counted once per message, the transcript folder's name, and the rule that too few sessions are no verdict. Left out: its hooks, subagents, session board, prompt coach and prices. The script carries the upstream copyright and license notice, which the license requires, so it is the one allowed real name in the repo | Every request reads the always-on context again, so the setup is where a cut repays in every session. Transcripts are megabytes, which a model can't add up by reading, so the steward is the one plugin that ships code. What was left out changes how a person works, not the setup, and hooks stay in the project (D35). Prices go stale, and no decision here depends on them | Holds, in `cost.md`, step 9 of `keep-current.md` and phase 7 of `set-up/procedure.md` |

## Documentation on Sonnet: D57

Decided on 2026-10-23: "I think we should always run documentations on Sonnet low
effort."

| # | Decision | Why | Now |
|---|---|---|---|
| D57 | A trio whose work is documentation runs all three roles on `sonnet` at `low`. A trio that produces a deliverable, such as a monthly report, or writes code and its documentation together keeps the defaults. No documentation skill is added | The maintainer's choice, made ahead of the measuring D46 waits for. No documentation skill or role existed to pin, so the rule goes where set-up chooses each role's model | Holds, in "Model and effort" in `set-up/trios.md`. A trio built before it keeps its recorded model, because keep-current rebuilds from the recorded `fill` |

## Conventional Commits: D58

Decided on 2026-10-24: "add a skill for conventional commits", "a developer should use
it", and, for which projects, "every repo with code, but you should ask".

| # | Decision | Why | Now |
|---|---|---|---|
| D58 | A Language skill for commit messages, `language-conventional-commits`, after the Conventional Commits 1.0.0 specification. In a repo with code, the steward asks once whether the project writes the format, and does not ask when the project already shows it. A no goes in the record's `declined`. Wherever the project enables it, it goes to Do | The format is a notation the work is written in, as English is, so it is Language and not an addition to a Craft skill. It changes every commit message, and a release tool may read it, so the project chooses it: the steward asks. Do is the developer of a trio, and its work is what becomes a commit | Holds, in the skill, "Commit messages" in `set-up/plugin-catalog.md`, rule 8 of `set-up/trios.md`, step 5 of `keep-current.md` and the front door's questions |

## Only you start a trio: D59

Decided on 2026-10-25, after the maintainer had used the setup for some time: "the
skills are doing their job, but the trio is incredibly expensive." What should change:
"I would like the project setup to be supportive to my thought and work, give me the
impression of being in control, while being cheap. Not just take control and do things
they think are right, spending my money in the process." And: "not all projects need a
trio. The trio is good for very focused feature work, or fixes. It does not combine
well with research and progressive growth loops." On research: "I decide how we get
from research to plan."

| # | Decision | Why | Now |
|---|---|---|---|
| D59 | A trio's run skill carries `disable-model-invocation: true`, so only the user starts a trio, by typing `/<task>`; its description is a summary for the command list. Each role's description says never to start it outside that run. The trio is tuned: Plan names each item's files, an agent that gets an answer or Check's list back is continued with SendMessage, Check starts from what Do changed, and Do runs on `sonnet`. Keep-current rebuilds a Do recorded on `opus` on `sonnet` | A trio started while the user was still thinking, and ran at full depth for a one-line note. Its cost was each agent reading the task's files again from an empty context: in one measured project, Plan run three times from the start and Do twice were about 1.5M of the trio's 1.8M tokens read. The skills themselves are 500 to 1,700 tokens each. A probe on 2026-10-25 showed that a finished agent continued with SendMessage keeps its context. Do carries out a plan that names what changes and where, and Check on `opus` compares the result with it | Holds, in `roles/`, "What a trio is made of" in `set-up/trios.md` and step 4 of `keep-current.md`. Not yet tried on a real project. Do on `sonnet` goes ahead of the measuring D46 waits for, as D57 did |

## Short reports: D60

Decided on 2026-10-25, the same day as D59. The maintainer asked whether agents should
talk in a clipped, telegraphic style to save tokens, and then: "we want everything to
be as concise as possible. I meant all agents."

| # | Decision | Why | Now |
|---|---|---|---|
| D60 | Every report an agent returns is as short as what its reader acts on: one line per item, items numbered rather than repeated, what needs action rather than everything that passed, and an empty section left out. Check lists only the gaps. The reports stay in full sentences; no clipped style | A report stays in the session that asked for it and is read again on every later turn, so a 10k-token report in a 50-turn session is read as 500k. A clipped style shortens only what an agent writes, which is a small share of what it costs, and it breaks `simple-english`: a line read two ways costs a rework, which is far more than the words it saved | Holds, in "Report formats" in `style.md`, the report of each role in `roles/`, the cartographer, `review-work` and `evaluate-skills`. Not yet measured |

## Project scope only: D61

Decided on 2026-10-25, the same day as D59: "The steward should install plugins always
with project scope", then "The Steward should be the only plugin with user scope", and,
for the two plugins the steward depends on, "ok those too".

| # | Decision | Why | Now |
|---|---|---|---|
| D61 | Every plugin the steward installs or updates for a project goes in at project scope, with `--scope project` on each command. The report no longer suggests user scope for any plugin, and no plugin README offers it. Only the steward and its two dependencies, `craft-review` and `language-simple-english`, sit at user scope. Set-up and keep-current report any other plugin at user scope, with the line that uninstalls it, and never run it themselves | `install` defaults to user scope, which writes nothing to the project's settings, so the next clone runs without the plugin. A plugin at user scope also loads in every project on the machine, where it costs descriptions and can be noise. `update` without a scope picks one by itself. A probe on 2026-10-25 showed that dependencies follow the scope of the plugin that pulls them in, so the steward's two come with it at user scope, and that a project-scope install still writes the project's key when the plugin is at user scope too | Holds, in "Scope" in `set-up/plugin-catalog.md`, phase 5 of `set-up/procedure.md`, the Installed section of `set-up/report.md`, and steps 2 and 8 of `keep-current.md` |

## Still open

| # | Question | Working answer |
|---|---|---|
| O1 | Is a single-purpose agent, such as the one that produces a monthly report, the same thing as Do? | Yes: `set-up/trios.md` treats it as the Do of its trio until the author decides |
| O2 | Should each project choose a shape for its trios: full, with Plan, Do and Check as agents and a check every run, or light, with the session planning in plan mode, doing the work, and checking only when asked? The steward would ask once per project and recommend from the project's own checks | Not now, by the maintainer, 2026-10-25, to come back to: with D59, asking in the session is already the light way, and `/<task>` the full one |
