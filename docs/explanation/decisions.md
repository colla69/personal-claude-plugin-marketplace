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
- [The rebuild: D62 to D76](#the-rebuild-d62-to-d76)
- [Collecting as the session goes: D77](#collecting-as-the-session-goes-d77)
- [Docking that shows its work: D78](#docking-that-shows-its-work-d78)
- [A guard that sees every change: D79](#a-guard-that-sees-every-change-d79)
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
| 2026-10-07 | Four layers, with examples. An agent is a role plus a set of skills. A task is solved by a trio, Plan, Do and Check, with a hard stop. Some skills are shared by all three | The layers hold, with a fifth for teams (D64). The trio is **superseded** by D63 |
| 2026-10-08 | One skill per plugin. Init creates the trio in the project. Agents local, skills central | One skill per plugin holds. Local agents are **superseded** by D63 and D69: the few agents ship centrally |
| 2026-10-09 | Check checks against the plan. Plan and Check are read-only and hold only abstract knowledge. Tool skills go to Do. The company vision goes to Plan | **Superseded** by D63 |
| 2026-10-13 | Init writes `AGENTS.md`, then installs skills, then creates agents. Init installs the skills itself. The contributor only touches knowledge. It proposes, and a human approves | Holds: every change waits for the maintainer's merge. The file is `CLAUDE.md` since D53. "Only touches knowledge" is **superseded** by D34 |

## The restructure: D1 to D26

All decided on 2026-10-19, while the marketplace was restructured into layers. D1 to D7
answer the author's open questions; question 4 stayed open, so there is no D4 (see O1).

| # | Decision | Why | Now |
|---|---|---|---|
| D1 | Keep the knowledge of the agents the plugins shipped, and reorganise it | "We should keep the knowledge and reorganize it." No paragraph is deleted until it has a new home | Done. Adoption gave way to a light tidy (D73), which removes only what a standard states word for word |
| D2 | Agents are created in each project, from marketplace skills | Workers local: an agent belongs to the project and task it serves | **Superseded** by D63 |
| D3 | A trio solves a task; effort differs per task; Plan and Check stay read-only | Different efforts for different tasks, and read-only roles spend fewer credits | **Superseded** by D63; the model now follows the kind of work (D66) |
| D5 | The layer is part of the plugin's name, and its `category` | The author wanted the categories visible in the names | Holds |
| D6 | Orchestrators are parked | "We will rethink that later, if at all" | Holds |
| D7 | `development-standards` is Craft; parts may split out as Universal | Not generic enough to be Universal as a whole | Done in D17 |
| D8 | The restructure happens on one branch, merged in one PR | `main`, and so every project, sees one change instead of eleven | Done |
| D9 | Plugins are named `<layer>-<topic>`; skill names stay | Follows D5 | Holds |
| D10 | Two marketplace plugins: `marketplace-init` and `marketplace-contributor` | Both work on the marketplace itself | **Superseded** by D27 |
| D11 | Set-up creates each trio's run pattern in the project; no separate plugin holds it | — | **Superseded** by D63 |
| D12 | Default effort: Plan `high`, Do `medium`, Check `medium`, adjusted per task with a reason | Follows D3: effort differs per task | **Superseded** by D63 and D66 |
| D13 | Set-up installs the skills itself, and the report keeps a paste block for other machines | The paste block lets another machine reproduce the same installs | Holds; "once its plan is approved" was superseded by D33 |
| D14 | Claude only: agents go to `.claude/agents/`; files name no model | No model name, because the knowledge must outlive any one vendor's tool. No reason is recorded for Claude only | Claude only holds; no model name is **superseded** by D46 |
| D15 | Init keeps `codebase-cartographer` as its own helper | It works for set-up, not for a project | **Superseded** by D70: docking reads a project with the built-in Explore agent |
| D16 | One project skill per trio, invoked as `/<task>`, runs Plan, stops, runs Do and Check; `AGENTS.md` lists the trios | Which tasks a project has is a project fact | **Superseded** by D63 |
| D17 | What holds for any work splits out of `development-standards` into a Universal skill: read before writing, match what is there, hold scope, verify | Those parts hold for any work, so they are Universal | Became `universal-work-discipline` (D24) |
| D18 | A role's generic report lives in its role template; a kind of work's report in its Craft skill | Each half of a report has one home | Holds, with the agent in place of the role template (D63) |
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
| D27 | One package, `marketplace-steward`, replaces init and the planned contributor | "Initialize and also keep working in his project", and keep what a project teaches for the next one | **Superseded** by D69 and D74: three plugins, the steward, the base and the curator |
| D28 | The maintainer is the only contributor for now: a contribution is a branch in their repo, with no forks | — | Holds, with curators in the maintainer's place (D74) |
| D29 | The steward's scope is the setup and the knowledge, not the project's own work | The project's trios do the work; a broader trigger competes with every trio | Holds: the project's sessions do the work, with the base plugin (D69) |
| D30 | A lesson is placed by four moves: diagnose, strip, let the user decide where it is taste, keep corrections as examples | Most knowledge arrives tangled with its project | Holds, in the curator's `place-knowledge.md` |
| D31 | A project's existing setup is adopted, not set up over | Two sets of instructions agree today and drift apart tomorrow | **Superseded** by D73 |
| D32 | The name is `marketplace-steward` | The proposed name, accepted: it sets up, keeps current and grows | Holds |
| D33 | No trio for the steward; it asks only before creating a new skill, besides the one-time sources checklist | A trio would make the process too difficult; a new skill is a decision about the cut, which is taste | Holds; supersedes init's plan stop. D53 adds a question: keep or swap a project's `AGENTS.md` files. D58 adds another: whether a project with code writes Conventional Commits. The new-skill question moved to the curator (D74) |
| D34 | No lanes: the steward is the only writer, and its helpers are read-only | One writer has no lane to keep | Holds: in a project, the steward is the only writer it starts, and every agent the marketplace ships is read-only |
| D35 | Hooks, MCP servers, tool commands and permissions stay in the project; a hook that only injects text is knowledge | The marketplace ships knowledge, not mechanics | **Superseded** by D65 |
| D36 | Two visible skills, the front door and `evaluate-skills`; the rest is reference files read by path | Every visible skill costs a description in every session of every project; a hidden skill can't be preloaded | **Superseded** by D74: the steward has one skill, and `evaluate-skills` moved to the curator |
| D37 | No plugin option: the steward keeps its own clone in `~/.local/share/marketplace-steward/` | An option isn't filled from its default, and Claude Code asks before every write under `~/.claude`, whatever a skill allows | **Superseded** by D74: the curator works in the marketplace's own checkout. The steward keeps only backups there |

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
| D46 | Every agent names its model as an alias beside its `effort`, set per role; every role starts on `opus` | The setup is Claude only, so a model name costs no portability, and the model is where a role's cost is decided | **Superseded** by D66: the model follows the kind of work |

## The repo's own setup: D47 and D48

Decided on 2026-10-20, when the token cost of the setup came under review.

| # | Decision | Why | Now |
|---|---|---|---|
| D47 | The repo has no path-scoped rules; `CLAUDE.md` alone points to the files that hold the rules | Both rules repeated the table `CLAUDE.md` already loads in every session, so they cost tokens and a second place to keep in sync | Holds |
| D48 | The repo keeps one agent of its own, `change-reviewer`, read-only, preloading `evaluate-skills` and `review-work` | A change made by hand is reviewed by a separate agent, which otherwise had to be briefed from scratch each time. It costs a description only in sessions in this repo | Holds; it preloads `marketplace-curator:evaluate-skills` since D74 |

## Borrowed ideas: D49 to D52

Decided on 2026-10-20, after comparing the marketplace with a larger skill library that
installs one person's whole workflow everywhere. Its lifecycle, state files and quality
gates stayed out: the steward chooses per project, and they assume one way of working
in every one. Plain English is the exception, because every project has text to read.

| # | Decision | Why | Now |
|---|---|---|---|
| D49 | A Language skill for English, `language-simple-english`, after Simplified Technical English, installed in every project and given to every role | Every project has text a person reads, and every role writes for one. "I want it everywhere" | Holds, in the catalog. The steward depends on it, so it also reaches every machine, the base plugin's `reviewer` writes by it, and `style.md` applies it to this repo, text moving to it as it is edited |
| D50 | Plan looks facts up itself, and asks only what the user alone can answer, each decision with the answer it recommends | A question about a fact Plan could look up costs the user a round trip | **Superseded** by D63; the steward and the curator ask the same way |
| D51 | `clean-code` asks for names a search can find, and error messages that name the remedy | Whoever changes the code next, often an agent, finds callers by searching and acts on what an error says | Holds |
| D52 | Development is test first: `write-unit-tests` holds the red, green, refactor cycle, and `development-standards` makes it the way code changes where a test runner exists | A test written after the code has never been seen to fail. "That is actually a very good way to do things" | Holds; `craft-development` depends on `craft-unit-testing`, unconditionally, because the skill carries the rule and reports a missing runner |

## Claude only: D53

Decided on 2026-10-20, once the setup was Claude only.

| # | Decision | Why | Now |
|---|---|---|---|
| D53 | The steward writes a project's context into `CLAUDE.md` and creates no `AGENTS.md`. When a project has `AGENTS.md` files, it asks once whether to keep them, each behind a `CLAUDE.md` that imports it, or swap them for `CLAUDE.md`, and records the answer. A kept one takes what the steward adds there; new component files are `CLAUDE.md` either way. An `AGENTS.md` that nothing imports goes through adoption either way | "We are Claude only now, let us get rid of the agents.md." Claude Code reads `CLAUDE.md`, so an `AGENTS.md` kept only for other tools costs an import line in every directory and a second file to keep true. But only the user knows whether another tool still reads a project's files: "if you find existing AGENTS.md ask if they are to be kept" | Holds, in `context-files.md`; docking asks, in a new project and in one an earlier steward set up. Other tools' own files still stay as they are |

## Contributions that finish: D54

Decided on 2026-10-20, after a test run ended without the contribution part. "That is
not ok."

| # | Decision | Why | Now |
|---|---|---|---|
| D54 | Adoption contributes in a step of its own, after set-up's checks and before any removal, and every contribution ends in a pull request, a reported stop, or the user's no to a new skill. A pushed branch with only a compare link is a stop, so `pending` holds only real pull requests. The report gives each one a row in a Contributions table, which an adoption never leaves out. The front door says a change to an existing skill opens its pull request without a pause | The step was one sentence at the end of another step, outside the set-up phases the steward follows, and no section of the report would show it missing. A model also tends to pause before a public pull request, and the pause became the end of the run | **Superseded** by D73: a docking files a rule that would travel as an issue, and the curators take it from there |

## The repo's own plugins: D55

Decided on 2026-10-23, when the repo was set up from its own marketplace, to try the
plugins in the desktop app and to have simple English here.

| # | Decision | Why | Now |
|---|---|---|---|
| D55 | The repo enables `universal-work-discipline`, `craft-review` and `language-simple-english` at project scope, and leaves out the steward, the code Craft plugins and `language-javascript`. Its `CLAUDE.md` says that nothing under `plugins/` is a project rule or evidence of the stack, and that no rule in it travels | The steward reads its own source here, and without those lines a later run could take the product for the project's rules, remove the gist of "What breaks silently", or install the code plugins on the signal of two scripts. The steward belongs to the machine, as everywhere | Holds, in the section "This repo's own setup" of `CLAUDE.md`, with `marketplace-curator` enabled here too (D74) |

## Measured cost: D56

Decided on 2026-10-23, after reading claude-context-optimizer, a plugin that measures
what Claude Code sessions cost: "I want the steward to be able to do this kind of
analysis and make the setups of the docked projects more performant and cheaper."

| # | Decision | Why | Now |
|---|---|---|---|
| D56 | The steward measures what a project's setup costs, with a script it ships, `measure-setup.mjs`, adapted from that plugin under its MIT license. Keep-current measures in a step of its own and set-up after it writes. It moves only what it wrote and nobody edited, to where it loads on demand. It reports a plugin, trio or MCP server that no session used, and changes no model on the numbers. Taken: the baseline from a session's first request, usage counted once per message, the transcript folder's name, and the rule that too few sessions are no verdict. Left out: its hooks, subagents, session board, prompt coach and prices. The script carries the upstream copyright and license notice, which the license requires, so it is the one allowed real name in the repo | Every request reads the always-on context again, so the setup is where a cut repays in every session. Transcripts are megabytes, which a model can't add up by reading, so the steward is the one plugin that ships code. What was left out changes how a person works, not the setup, and hooks stay in the project (D35). Prices go stale, and no decision here depends on them | Holds, in `cost.md` and step 7 of `dock.md`, except that the steward now proposes and changes nothing (D72), and hooks no longer stay out (D65) |

## Documentation on Sonnet: D57

Decided on 2026-10-23: "I think we should always run documentations on Sonnet low
effort."

| # | Decision | Why | Now |
|---|---|---|---|
| D57 | A trio whose work is documentation runs all three roles on `sonnet` at `low`. A trio that produces a deliverable, such as a monthly report, or writes code and its documentation together keeps the defaults. No documentation skill is added | The maintainer's choice, made ahead of the measuring D46 waits for. No documentation skill or role existed to pin, so the rule goes where set-up chooses each role's model | **Superseded** by D63 and D66 |

## Conventional Commits: D58

Decided on 2026-10-24: "add a skill for conventional commits", "a developer should use
it", and, for which projects, "every repo with code, but you should ask".

| # | Decision | Why | Now |
|---|---|---|---|
| D58 | A Language skill for commit messages, `language-conventional-commits`, after the Conventional Commits 1.0.0 specification. In a repo with code, the steward asks once whether the project writes the format, and does not ask when the project already shows it. A no goes in the record's `declined`. Wherever the project enables it, it goes to Do | The format is a notation the work is written in, as English is, so it is Language and not an addition to a Craft skill. It changes every commit message, and a release tool may read it, so the project chooses it: the steward asks. Do is the developer of a trio, and its work is what becomes a commit | Holds, in the skill, "Commit messages" in `catalog.md` and step 3 of `dock.md`. With no record (D72), a no leaves the skill out, and with no trios (D63), every session that writes a commit has it |

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
| D59 | A trio's run skill carries `disable-model-invocation: true`, so only the user starts a trio, by typing `/<task>`; its description is a summary for the command list. Each role's description says never to start it outside that run. The trio is tuned: Plan names each item's files, an agent that gets an answer or Check's list back is continued with SendMessage, Check starts from what Do changed, and Do runs on `sonnet`. Keep-current rebuilds a Do recorded on `opus` on `sonnet` | A trio started while the user was still thinking, and ran at full depth for a one-line note. Its cost was each agent reading the task's files again from an empty context: in one measured project, Plan run three times from the start and Do twice were about 1.5M of the trio's 1.8M tokens read. The skills themselves are 500 to 1,700 tokens each. A probe on 2026-10-25 showed that a finished agent continued with SendMessage keeps its context. Do carries out a plan that names what changes and where, and Check on `opus` compares the result with it | **Superseded** by D63. What it found carries on: an agent costs most in reading again what the session already read, so the marketplace ships few agents, and each one does a job whose input is short |

## Short reports: D60

Decided on 2026-10-25, the same day as D59. The maintainer asked whether agents should
talk in a clipped, telegraphic style to save tokens, and then: "we want everything to
be as concise as possible. I meant all agents."

| # | Decision | Why | Now |
|---|---|---|---|
| D60 | Every report an agent returns is as short as what its reader acts on: one line per item, items numbered rather than repeated, what needs action rather than everything that passed, and an empty section left out. Check lists only the gaps. The reports stay in full sentences; no clipped style | A report stays in the session that asked for it and is read again on every later turn, so a 10k-token report in a 50-turn session is read as 500k. A clipped style shortens only what an agent writes, which is a small share of what it costs, and it breaks `simple-english`: a line read two ways costs a rework, which is far more than the words it saved | Holds, in "Report formats" in `style.md`, the report of each agent the marketplace ships, `review-work` and `evaluate-skills`. Not yet measured |

## Project scope only: D61

Decided on 2026-10-25, the same day as D59: "The steward should install plugins always
with project scope", then "The Steward should be the only plugin with user scope", and,
for the two plugins the steward depends on, "ok those too".

| # | Decision | Why | Now |
|---|---|---|---|
| D61 | Every plugin the steward installs or updates for a project goes in at project scope, with `--scope project` on each command. The report no longer suggests user scope for any plugin, and no plugin README offers it. Only the steward and its two dependencies, `craft-review` and `language-simple-english`, sit at user scope. Set-up and keep-current report any other plugin at user scope, with the line that uninstalls it, and never run it themselves | `install` defaults to user scope, which writes nothing to the project's settings, so the next clone runs without the plugin. A plugin at user scope also loads in every project on the machine, where it costs descriptions and can be noise. `update` without a scope picks one by itself. A probe on 2026-10-25 showed that dependencies follow the scope of the plugin that pulls them in, so the steward's two come with it at user scope, and that a project-scope install still writes the project's key when the plugin is at user scope too | Holds, in "Scope" in `catalog.md` and step 5 of `dock.md`, with one dependency fewer at user scope (D76) |

## The rebuild: D62 to D76

Decided on 2026-10-26, in one interview with the maintainer about how to build the
steward better. It began: "I am looking for a way to normalize and unify knowledge and
centralize ways of working between teams." The rebuild shipped as one pull request.

| # | Decision | Why | Now |
|---|---|---|---|
| D62 | The marketplace keeps a company's knowledge and ways of working, and spreads them across its teams, for beginners and experts alike. Users, contributors and curators are different groups. Anyone can talk to the steward; nobody has to | "A tool that is able to keep knowledge and distribute it across an enterprise, for people with no knowledge and experts alike" | Holds, in `README.md` and [The idea](the-idea.md) |
| D63 | No trios and no generated agents. The steward writes no agent and no run skill into a project; it removes those an earlier steward wrote | The trios were what started the interview. They were expensive, and they fit focused feature work only | Holds, in `dock.md` and `tidy.md` |
| D64 | A way of working is a standard, and a standard is a skill: a way to annotate code, a template, a quality standard for prose, emails or presentations. A quirk lives in the project's `CLAUDE.md`. A team whose projects share a quirk gets a `team-<name>` plugin, in the marketplace only as a last resort. One marketplace | "Every organization or team has its quirks, we want to account for that." A team plugin costs a description in every session of every project that enables it, so it has to earn it | Holds, in `place-knowledge.md`, the catalog's Layers and `check-catalog.mjs` |
| D65 | Settings and hooks are allowed where they fit | "We want to always work smart, not necessarily cheap. We still want high quality while keeping the waste to a minimum." A hook does what a skill can only ask for | Holds, in `marketplace-base`; supersedes D35 |
| D66 | The model follows the kind of work, and ships centrally: Opus plans, Sonnet does, Haiku fetches and runs. Docking sets `"model": "opusplan"`, which plans on Opus in plan mode and works on Sonnet. A person can override it | "Complex work is not the standard, so I would like to find balance between models. Some things may even be made using Haiku" | Holds, in `settings-template.json` and each agent's frontmatter; supersedes D46 |
| D67 | In development, the one imperative is that the build and the tests stay green, kept by a hook. A review runs only when someone asks, on Opus. Other kinds of work get no automatic review | "For some different kind of work automatic review is not really necessary, as a human will do that anyway, so those would be wasted tokens" | Holds, in the base plugin's guard and `reviewer` |
| D68 | The corrections a person makes are collected in the background, at the end of every session, and filed as one issue on the marketplace. The collector reads only the conversation, never a tool's output, and runs on Haiku. A session that ended without its hook is caught up at the next session start. What the curators do with them comes later | "Every session writes back a list of them as a GitHub issue in the background." Only the conversation, because a tool's output can hold secrets nobody typed. A session-end hook gets about a second and a half, so it only starts the work | Holds, in the base plugin's `collect.mjs`, except that the trigger is **superseded** by D77 |
| D69 | One base plugin, `marketplace-base`, installed in every docked project, carries the hooks and two read-only helpers: a `test-runner` on Haiku and a `reviewer` on Opus | "Ok, we use plugins." A plugin's hooks run only where it is enabled, and update with it | Holds |
| D70 | The steward is a companion for beginners and advanced users alike: one small skill that docks, and a `guide` agent on Sonnet that answers. A compact index of every standard reaches every session at its start, so the right standard comes up when someone just types. Docking reads a project with the built-in Explore agent | "People are lazy. They just blurt into the editor." The index costs about 800 tokens a session; the guide runs in its own context | Holds, in the steward and the base plugin's `index.mjs` |
| D71 | A project is docked only when someone asks | The person chooses which projects to dock | Holds, in the steward's description |
| D72 | A docked project updates by itself. The merge is the gate. There is no keep-current job and no record file | The marketplace changes by reviewed merges only, so what reaches a project has been read | Holds. Claude Code updates a marketplace by itself and ignores `autoUpdate` in a project's settings, as its own debug message says, so the template sets none, and docking reports a person's settings that turn it off |
| D73 | A project with a setup of its own gets a light tidy: only rules a standard states word for word are removed; quirks stay; a rule that would serve other projects stays and is filed as an issue; files an earlier steward generated are removed, after a backup when someone edited them | The rest of an adoption cost more than it saved, and only the project's people know a quirk's reason | Holds, in `tidy.md`; supersedes D31 and D54 |
| D74 | The curator is a plugin of its own, `marketplace-curator`, enabled only in the marketplace's repository. It works issues and lessons into pull requests in that checkout. A nightly routine over the issues may come later; it is not part of the rebuild | "Separated curator." Curating is a different group's work from docking, and its knowledge costs nothing in a docked project | Holds; supersedes D27, D36 and D37 |
| D75 | The rebuild ships as one pull request | `main`, and every project that follows it, sees one change | Done |
| D76 | Only the steward and `language-simple-english` sit at user scope. The base plugin and every standard go in at project scope | The steward no longer depends on `craft-review`; the base plugin and the curator do, at their own scope | Holds, in "Scope" in `catalog.md`; refines D61 |

## Collecting as the session goes: D77

Decided on 2026-10-26, after the first trial of the base plugin on a real project.

| # | Decision | Why | Now |
|---|---|---|---|
| D77 | The collector keeps a list of possible corrections while a session runs, and the next session start in the project files the lists as one issue. No hook waits for a session to end. After an answer, a background run on Haiku reads what is new, at most once in ten minutes; at session start, the unread end of earlier sessions is read first, and the lists are filed with no model call | "People are lazy and never end session correctly, if at all." A killed terminal skips the session-end hook, and a catch-up that waited for a quiet session filed late, in bursts, and no more than five at a time. A list on disk survives any way a session can end, and a pass reads only what is new, so a long session costs little | Holds, in `collect.mjs` and `hooks.json`; supersedes the trigger in D68 |

## Docking that shows its work: D78

Decided on 2026-10-26, after two docking runs on one project gave different results.

| # | Decision | Why | Now |
|---|---|---|---|
| D78 | The report proves the steps were done. The Standards table gives a verdict for every row of the catalog, and the Tidied table has a row for every file read, with the rules it holds. The project's own agents get a model by the kind of work (D66): docking proposes one for each agent that names none, asks once, and writes only what is ticked | Two runs on one project differed: one installed `language-typescript` for the infrastructure code and one didn't. Both runs left the project's agents and rules unread and said so in one line of the report, where nothing forced the step. A nightly search agent ran at `inherit` and high effort, because D66 set the model only for the agents the marketplace ships. A report that must show a row for each file and each catalog row can't skip the step without the gap showing | Holds, in `dock.md`, `tidy.md` and `agent-models.md` |

## A guard that sees every change: D79

Decided on 2026-10-26, after the first trial of the guard on a real project.

| # | Decision | Why | Now |
|---|---|---|---|
| D79 | The guard finds a change by comparing the files git lists with how they stood at the session's start, and also by the tools' own marks. A project may limit it to paths with `STEWARD_CHECK_PATHS`, and docking writes them when the command covers only part of the project | In the trial, every edit went through the shell, and the guard, which saw only the edit tools, ran nothing. On the same project, a docking run chose no check command, because a full build after every edit would also run for edits to documents and data | Holds, in `guard.mjs`, `dock.md` and the base plugin's README; refines D67 |

## Settings that stay current: D80

Decided on 2026-10-27.

| # | Decision | Why | Now |
|---|---|---|---|
| D80 | Docking sets `autoCompactWindow` to 180000 in the project's `.claude/settings.json`, from the settings template. The steward brings the project's copy up to date when asked: it compares each key of the template with the project's value and changes the ones the user ticks | A long session that runs to the model's limit sends its largest requests last, and what it compacts from is far from the start. A plugin can't ship this key, so it has to live in the project's file, and a copy goes stale. The steward keeps no record of what it wrote (D62), so it can't tell an old value from the project's own choice, and asks | Holds, in `settings-template.json` and `dock.md` |

## Still open

| # | Question | Working answer |
|---|---|---|
| O1 | Is a single-purpose agent, such as the one that produces a monthly report, the same thing as Do? | Closed by D63: there is no Do |
| O2 | Should each project choose a shape for its trios: full, with Plan, Do and Check as agents and a check every run, or light, with the session planning in plan mode, doing the work, and checking only when asked? The steward would ask once per project and recommend from the project's own checks | Closed by D63 and D66: every project works the light way, planning in plan mode on Opus |
