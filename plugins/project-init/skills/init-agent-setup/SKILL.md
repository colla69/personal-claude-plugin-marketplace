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

Run these phases in order. Do not write any file until phase 4.

### Phase 1 — Survey (cheap, breadth-first)

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

### Phase 2 — Map the components

Identify the **units of the codebase that a developer would think about separately**. In
a monorepo those are packages or apps. In a layered backend they might be `api/`,
`domain/`, `infra/`. In a Vue app: `components/`, `composables/`, `stores/`, `views/`. A
directory is a component worth its own context file when it has a distinct purpose, a
distinct set of conventions, or a boundary others shouldn't cross.

Aim for **3–8 components**. Fewer than 3 and a single root file is enough; more than 8
and you are describing directories, not components.

If the repo is large, delegate this phase to the `project-init:codebase-cartographer`
subagent so the exploration doesn't fill the main context window. Give it the component
list you suspect and ask it to report back a structured summary per component.

For each component, determine:

- What it is responsible for, in one sentence
- Its entry point(s) and the file a newcomer should read first
- What depends on it, and what it depends on
- Conventions that are local to it and differ from the rest of the repo
- Its test location and how to run just those tests

### Phase 3 — Propose, don't write

Present a plan to the user before touching the filesystem, because a wrong context file
is worse than no context file — it gets loaded into every session and quietly misleads.

Show:

- The component map (a short list, one line each)
- Which files you intend to create, and roughly what goes in each
- Which plugins you recommend enabling, each with a one-line reason
- Anything you could not figure out and want them to confirm — build commands you
  couldn't verify, ambiguous ownership, a test runner that isn't wired up

Ask for confirmation or corrections. If the user says "just do it", proceed.

### Phase 4 — Write the context files

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
```

**Write the content in `AGENTS.md`, always.** `CLAUDE.md` is a one-line `@AGENTS.md`
import beside it, and nothing else. This is not a special case for repos that already
have an `AGENTS.md` — it is the default layout, because the same context has to serve
other agents too, GitHub Copilot among them. A Claude-only file forecloses that.

The pairing is not optional: Claude Code lazy-loads nested `CLAUDE.md` but never
discovers a nested `AGENTS.md`, so a component directory with only `AGENTS.md` is
content that never loads.

Two rules that matter more than the rest:

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

If the repo already has an `AGENTS.md`, you are **improving it**, not replacing it —
preserve what is still true and add below. If it has `.cursor/rules/` or
`.github/copilot-instructions.md`, read them for content worth carrying into
`AGENTS.md`; do not delete them.

### Phase 5 — Recommend and wire up plugins

Read `references/plugin-catalog.md` for the available plugins and their trigger
conditions. Recommend a stack-specific plugin only when something in the repo actually
calls for it — an unconfigured recommendation is a cost with no benefit, since every
enabled plugin adds its skill and agent descriptions to every session.

**The review trio is the exception: `developer`, `code-review`, and `refactoring` go
together in any repo with code in it.** Do not gate `code-review` on PR-workflow signals
— the reviewer's value is catching logical errors and inconsistencies before a commit,
which has nothing to do with whether anyone opens pull requests. Recommend all three or
none; enabling part of the trio leaves either findings with nobody to implement them, or
a writer with nobody checking it.

Then make the recommendation actionable rather than advisory. Write
`.claude/settings.json` (merging, not overwriting, any existing file) using
`assets/settings-template.json` as the shape:

```json
{
  "extraKnownMarketplaces": {
    "personal-claude-plugin-marketplace": {
      "source": { "source": "github", "repo": "colla69/personal-claude-plugin-marketplace" }
    }
  },
  "enabledPlugins": {
    "developer@personal-claude-plugin-marketplace": true,
    "code-review@personal-claude-plugin-marketplace": true,
    "refactoring@personal-claude-plugin-marketplace": true,
    "unit-testing@personal-claude-plugin-marketplace": true
  }
}
```

Committing this means the setup travels with the repo. Tell the user to run `/plugin
install <name>@personal-claude-plugin-marketplace` for anything not already installed —
enabling a plugin in settings doesn't fetch it if it isn't on the machine yet.

### Phase 6 — Verify

Do not declare success without checking:

1. **Parse what you wrote.** Confirm `.claude/settings.json` is valid JSON, and that the
   YAML frontmatter of every `.claude/rules/*.md` you created parses and its `paths:`
   globs match at least one real file. A rule whose globs match nothing is dead weight
   that never announces itself.
2. **Check the pairing.** Every `AGENTS.md` you wrote has a `CLAUDE.md` beside it
   containing the `@AGENTS.md` import. Without it the file never loads, and nothing
   reports that.
3. **Check the budget.** Root under 200 lines, components within 30–70.
4. Ask the user to run `/context` in a fresh session and confirm the intended files
   appear under **Memory files**. This is the only real proof the setup loaded.
5. Report anything you wrote that you were unsure about — especially any command you
   could not execute — so they can correct it while it's still fresh.

Do **not** run `claude plugin validate` on the project's `.claude/` directory. That
command expects a plugin or marketplace manifest; a project context directory is
neither, and it fails with "No manifest found" unless the directory happens to contain
plugin components.

## Output format for the final report

```
## Setup complete

**Components mapped:** <n>
**Files written:**
- <path> — <one line>

**Plugins enabled:** <name> (<why>), ...

**Unverified — please confirm:**
- <anything you guessed at>

Run `/context` in a new session to confirm the memory files loaded.
```

## Reference files

- `references/context-files.md` — layout, tiers, templates, and size rules. Read before
  phase 4.
- `references/plugin-catalog.md` — the toolkit's plugins and when each applies. Read
  before phase 5.
- `assets/settings-template.json` — starting shape for `.claude/settings.json`.
