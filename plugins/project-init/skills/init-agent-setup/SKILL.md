---
name: init-agent-setup
description: Bootstrap a complete agentic setup for an unfamiliar or unconfigured codebase. Explores the repo, maps its components, writes layered CLAUDE.md context files plus path-scoped rules, and produces a wired-up list of toolkit plugins to enable. Use this whenever the user opens a new project and says anything like "set this up", "onboard me to this repo", "there's no CLAUDE.md here", "which plugins should I use for this project", or asks for project context/agent configuration to be generated. Prefer this over a bare /init when the user wants plugins and subagents configured, not just a single memory file.
---

# Project initializer

Turn a cold repository into a working agentic setup: context files Claude will actually
load, path-scoped rules, and the right plugins enabled.

The goal is **not** to write one giant file describing the whole codebase. Claude can
read code. The goal is to capture what Claude *cannot* derive by reading code — build
commands that aren't obvious, conventions that differ from framework defaults,
boundaries that must not be crossed, and the reason things are the way they are.

## Workflow

Run these phases in order. **No context file is written before phase 5** — that is the
rule, and it exists because a wrong context file loads into every session and quietly
misleads.

Phase 1 is preparation and writes the source policy it decides. That is not an exception
to the rule above, it is what preparation means.

**Touch git for nothing.** No branch, no commit, no stage, no stash — the developer
branches before calling you and decides afterwards what to keep. Your part is to say
exactly what you wrote so they can judge it, which is what phase 7's report is for.

### Phase 1 — Preparation

Settle where plugins may come from, before looking at the code. It is the one thing the
repo cannot tell you: a codebase under a procurement or security policy looks identical
to one with no policy at all.

**a. Discover what is reachable.**

```bash
claude plugin marketplace update
claude plugin list --available --json
```

The update is not optional, and it takes **no marketplace name on purpose** — bare, it
refreshes every configured marketplace. `list` reads a local cache, so without it you
are offering the user whatever those marketplaces looked like the last time anything
fetched them. Naming one refreshes that one and leaves the rest stale, which is worse
than skipping the step: the list then looks current and is current for only part of
itself.

**b. Ask only when no policy file exists** — `.claude/plugin-sources.json` in the
project, then `~/.claude/plugin-sources.json`. Either one is an answer already given:
say in one line what it permits and move on. Asking again is a toll on someone who has
already decided.

**c. Otherwise ask once, as a checklist** — not a question answered in prose:

```
Which sources may this repo draw plugins from?
[x] personal-claude-plugin-marketplace — your toolkit (9)
[x] claude-plugins-official — hosted in Anthropic's own repo (52)
[ ] claude-plugins-official — external, vendor repos pinned to a commit (244)
[ ] claude-community — automated screening, not configured here (~400)
```

**One question, never two**, and every count taken from the live JSON — a number you
invented is the only thing in that list that looks like evidence.
`references/plugin-sources.md` has the option cap, the pre-tick order and what to do
with sources that do not fit.

**d. Write `.claude/plugin-sources.json`** from the ticked boxes, shaped like
`assets/plugin-sources.json`, even when the answer matches the default exactly. **Every
key traces back to a row they ticked** — a file they cannot read back to the question
they answered is one they have to audit.

Do not hand them JSON to paste. They ticked boxes so they would not have to edit a
config file by hand, and handing one back undoes the exchange.

### Phase 2 — Survey (cheap, breadth-first)

Get the shape of the repo before reading anything deeply.

1. Check what already exists: `CLAUDE.md`, `.claude/`, `AGENTS.md`, `.cursor/rules/`,
   `.github/copilot-instructions.md`. If a `CLAUDE.md` is already there, you are
   **improving**, not replacing — say so and preserve what's still true.
2. Read the manifest(s): `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`,
   `composer.json`, `pom.xml`, `Gemfile`. These give you the stack, the scripts, and the
   test runner in one shot.
3. Read `README.md` and any `CONTRIBUTING.md` / `docs/`.
4. List the tree two or three levels deep, skipping `node_modules`, `dist`, `.venv`,
   `target`, `vendor`, and lockfiles.
5. Check CI config (`.github/workflows/`, `.gitlab-ci.yml`) — this is the most reliable
   source of truth for how the project is actually built, linted, and tested.

### Phase 3 — Map the components

Identify the **units of the codebase that a developer would think about separately**. In
a monorepo those are packages or apps. In a layered backend they might be `api/`,
`domain/`, `infra/`. In a Vue app: `components/`, `composables/`, `stores/`, `views/`. A
directory is a component worth its own context file when it has a distinct purpose, a
distinct set of conventions, or a boundary others shouldn't cross.

**Let the test above set the count, not a target.** A directory earns a context file
when there is something true to write about it that a developer cannot derive by opening
it — a boundary, a local convention, a command that differs. A twelve-package monorepo
genuinely has twelve; a small service has one, and a root file covers it.

The number is a signal to re-read the test, not a limit. Writing past the point where
you have something worth saying produces files that restate the directory listing, and
those load into every session in that subtree forever.

If the repo is large, delegate this phase to the `project-init:codebase-cartographer`
subagent so the exploration doesn't fill the main context window. Give it the component
list you suspect and ask it to report back a structured summary per component.

For each component, determine:

- What it is responsible for, in one sentence
- Its entry point(s) and the file a newcomer should read first
- What depends on it, and what it depends on
- Conventions that are local to it and differ from the rest of the repo
- Its test location and how to run just those tests

### Phase 4 — Propose, don't write

Present a plan to the user before touching the filesystem, because a wrong context file
is worse than no context file — it gets loaded into every session and quietly misleads.

Show:

- The component map (a short list, one line each)
- Which files you intend to create, and roughly what goes in each
- The plugins you recommend, drawn from the phase 1 inventory and bounded by the sources
  the user ticked there — rendered as the **Recommended — from your toolkit** and
  **Gap-fills — from other marketplaces** tables from the output format at the end of
  this file: same columns, same rule for dropping the gap-fill table

**The plan's plugin tables are the report's tables, not a bulleted list.** The user
approves the plan and later reads the report; when both share one shape, checking what
got enabled against what was agreed is a row-by-row comparison instead of a re-read, and
a table scans in the few seconds someone spends deciding to say "go". Take the columns
from the output format rather than copying them here — two copies of one table get
edited separately and then disagree.

Ask for confirmation or corrections. If the user says "just do it", proceed.

**What you could not figure out does not go here.** Build commands you couldn't verify,
ambiguous ownership, a test runner that isn't wired up — those go in the final report,
under **Unverified**. Buried in a plan someone is skimming to say "go", they get
skimmed; at the end, next to what was written, they are the list of things to fix.

### Phase 5 — Write the context files

Read `references/context-files.md` before writing. It covers the exact layout, what
belongs in each tier, and the size limits that matter.

Summary of the layout you are producing:

```
AGENTS.md                       # root context — the content lives here
CLAUDE.md                       # one line: @AGENTS.md
src/<component>/AGENTS.md       # per-component detail
src/<component>/CLAUDE.md       # one line: @AGENTS.md
.claude/rules/<topic>.md        # path-scoped rules, loaded only for matching files
.claude/settings.json           # marketplace + enabled plugins for this project
.claude/plugin-sources.json     # which marketplaces this repo may draw plugins from
```

**Write the content in `AGENTS.md`, always** — this is the default layout, not a special
case for repos that already have one. `CLAUDE.md` is a one-line `@AGENTS.md` import
beside it and nothing else, and the pairing is not optional.
`references/context-files.md` explains why and what breaks without it.

Three rules that matter more than the rest:

- **Keep the root under 200 lines.** It is loaded into every single session. Anything
  that only matters for one part of the tree belongs in a nested `AGENTS.md` or a
  path-scoped rule, both of which load lazily.
- **Write only what can't be derived, or what costs real time to rediscover.** Delete
  any line a competent developer learns in thirty seconds by opening the file. "The
  `api/` directory contains the API" is noise. "Handlers must not import from
  `domain/internal/` — use the port interfaces in `domain/ports.ts`" is signal.
- **Include an entry-point map.** Per component: the file to open first, and the two or
  three behaviours someone will hunt for with the file they live in. A tree listing is
  noise because `ls` reproduces it; "template resolution happens in
  `TemplateConfig.java` and collapses nested paths to basenames" is a search saved every
  session, forever.

Beyond context files, `.claude/` may earn a **project skill** — `.claude/skills/<name>/`
— when the repo has a multi-step procedure genuinely specific to it that costs real time
to reconstruct: bringing a full local stack up in the right order, a release checklist,
a smoke test with a fixed sequence. Write one only when you found such a procedure and
can state its steps concretely. A skill that restates `npm run dev` is noise. Propose it
in phase 4 like everything else.

If the repo already has an `AGENTS.md`, you are **improving it**, not replacing it —
preserve what is still true and add below. If it has `.cursor/rules/` or
`.github/copilot-instructions.md`, read them for content worth carrying into
`AGENTS.md`; do not delete them.

### Phase 6 — Recommend and wire up plugins

Read `references/plugin-sources.md` before this phase — discovery commands, the
permission file, and the gap rules live there. `references/plugin-catalog.md` holds the
trigger conditions for the toolkit's own plugins.

Recommend a stack-specific plugin only when something in the repo actually calls for it
— an unconfigured recommendation is a cost with no benefit, since every enabled plugin
adds its skill and agent descriptions to every session.

**a. Work from the phase 1 inventory.** You already fetched it and the user already
bounded it. Do not re-derive the list, and do not reach past what they ticked — the
answer to a source they left unchecked is no, not "no unless something good turns up".

The catalog reference says *when* a toolkit plugin applies; that inventory says *what
the toolkit currently contains*. When they disagree the live list wins on existence and
the catalog wins on triggers — recommend the plugin on its own `description` and note in
the report that the catalog is missing a row. A plugin the maintainer shipped last week
is useless if this skill only knows the list it was written against.

**b. Recommend from the toolkit first.** Its plugins win any overlap, because they are
the ones whose standards the user wrote. Only a need that no toolkit plugin covers is a
gap worth filling from anywhere else.

**The review trio is the exception to evidence-gating: `developer`, `code-review`, and
`refactoring` go together in any repo with code in it.** Do not gate `code-review` on
PR-workflow signals — the reviewer's value is catching logical errors and
inconsistencies before a commit, which has nothing to do with whether anyone opens pull
requests. Recommend all three or none; enabling part of the trio leaves either findings
with nobody to implement them, or a writer with nobody checking it.

**c. Fill the remaining gaps, within policy.** `.claude/plugin-sources.json` — the file
phase 1 wrote — decides which marketplaces and which source classes may be drawn from.
Obey it, and do not relitigate it in the report. This is deliberately not your
judgement: the user ticked those boxes knowing things about this repo that nothing in it
records.

Report provenance as fact, never as a ranking. `references/plugin-sources.md` explains
what the `source` field tells you and what it does not.

The last two steps make the recommendation actionable rather than advisory. **Both are
required.**

**d. Write `.claude/settings.json`** (merging, not overwriting, any existing file).
**Read `assets/settings-template.json` for the shape and copy it from there** — it is
the only place that shape is written down, so a copy quoted here or in a reference would
be a second version to keep in step, and the two would drift.

Add one `enabledPlugins` entry per plugin you recommended, keyed `name@marketplace`.
Once *they* commit it, the setup travels with the repo and anyone who clones it gets the
same configuration. Say that; do not do it.

`.claude/plugin-sources.json` is already on disk from phase 1. Check that what you are
about to enable is actually permitted by it before you write this file — if you have
talked yourself into a plugin from a source the user unticked, the answer is to drop the
plugin, not to widen the file.

**e. Put the install commands in the final report.** Enabling a plugin in settings does
**not** fetch it. A repo whose settings enable four plugins that aren't on the machine
is configured for a setup the user does not have, and nothing announces the gap — the
settings file looks correct and the plugins simply never load.

So the report ends with **one** block the user can paste, listing every plugin you
recommended, whatever marketplace it came from:

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install developer@personal-claude-plugin-marketplace
claude plugin install code-review@personal-claude-plugin-marketplace
claude plugin install refactoring@personal-claude-plugin-marketplace
claude plugin install typescript-dev@personal-claude-plugin-marketplace
claude plugin install typescript-lsp@claude-plugins-official
```

One block, not one per source. Splitting it by marketplace turns a paste into a decision
the user has to make five times, and the optional-looking half is the half that gets
skipped.

`references/plugin-catalog.md` has the rules for composing that block — read them before
writing it.

### Phase 7 — Verify

Do not declare success without checking:

1. **Parse what you wrote.** Confirm `.claude/settings.json` and
   `.claude/plugin-sources.json` are valid JSON, and that the YAML frontmatter of every
   `.claude/rules/*.md` you created parses and its `paths:` globs match at least one
   real file. A rule whose globs match nothing is dead weight that never announces
   itself.
2. **Check the pairing.** Every `AGENTS.md` you wrote has a `CLAUDE.md` beside it
   containing the `@AGENTS.md` import. Without it the file never loads, and nothing
   reports that.
3. **Check the budget.** Root under 200 lines, components within 30–70.
4. Ask the user to run `/context` in a fresh session and confirm the intended files
   appear under **Memory files**. This is the only real proof the setup loaded.
5. Report anything you wrote that you were unsure about — especially any command you
   could not execute — so they can correct it while it's still fresh.

Then list every path you created and every path you changed, separately. That list is
the whole handover: it is what the developer reads to decide what to keep, and `git
diff` does the rest. Do not run git, and do not tell them how to undo you — they know.

Do **not** run `claude plugin validate` on the project's `.claude/` directory. That
command expects a plugin or marketplace manifest; a project context directory is
neither, and it fails with "No manifest found" unless the directory happens to contain
plugin components.

## Output format for the final report

````
## Setup complete

**Toolkit version:** <the installed commit SHA of project-init, so a reader can tell
which version of this skill produced the output>
**Components mapped:** <n>

**Sources consulted:** <each marketplace you read, with how many plugins it offered —
proof the list is live rather than remembered>


### Written
- <path> — <one line>

### Changed
- <path that already existed and was edited — omit the section if there were none>

### Recommended — from your toolkit
| Plugin | Layer | Why — the evidence in this repo |
|---|---|---|
| <name> | <Universal / Craft / Language / Framework> | <what you found that calls for it> |

### Gap-fills — from other marketplaces
| Plugin | Hosted by | Fills | What it adds that no toolkit plugin does |
|---|---|---|---|
| <name@marketplace> | <the marketplace's own repo, or the owner of the repo it points at> | <the need in this repo> | <one line> |

<Drop this table entirely when the toolkit covered everything, and say that in one line
— it is the good outcome, not a shortfall. Say nothing at all about plugins from sources
that are switched off: they were never candidates, and counting them re-opens a question
the user already answered.>

### Install these
```bash
<one `claude plugin install` line per plugin from both tables, in one block, plus a
marketplace add line for any marketplace not configured yet>
```

Restart the session after installing — a plugin installed mid-session isn't
invocable until the next one.

### Unverified — please confirm
- <anything you guessed at, and any command you could not execute — build commands you
  could not run, ambiguous ownership, a test runner that is not wired up. This is the
  home for every unknown; phase 4 deliberately does not carry them>
- <any source that exists but was not offered in phase 1's single question, named once>
- <any toolkit plugin in the live list that `plugin-catalog.md` has no row for — the
  catalog is the maintainer's, and drift is theirs to fix>

Run `/context` in a new session to confirm the context files loaded.
````

The **Install these** block is not optional and not a footnote. It is the step that
turns a configured repo into a working one, and it is the one the user is most likely to
skip if you bury it in prose.

## Reference files

- `references/context-files.md` — layout, tiers, templates, and size rules. Read before
  phase 5.
- `references/plugin-sources.md` — how to discover what exists, what the permission file
  controls, and the gap-filling rules. Read before phases 1 and 6.
- `references/plugin-catalog.md` — the toolkit's plugins and when each applies. Read
  before phase 6.
- `assets/settings-template.json` — starting shape for `.claude/settings.json`.
- `assets/plugin-sources.json` — starting shape for `.claude/plugin-sources.json`.
