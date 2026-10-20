# Context file layout

How project context actually loads, and what to put where.

## Contents

- [CLAUDE.md holds the context](#claudemd-holds-the-context)
- [An AGENTS.md found in the project](#an-agentsmd-found-in-the-project)
- [The tiers](#the-tiers)
- [Which components earn a file](#which-components-earn-a-file)
- [Root CLAUDE.md template](#root-claudemd-template)
- [Component CLAUDE.md template](#component-claudemd-template)
- [Path-scoped rules](#path-scoped-rules)
- [Project skills](#project-skills)
- [What to leave out](#what-to-leave-out)

## CLAUDE.md holds the context

**Write the content in `CLAUDE.md`, at the root and in each component directory that
earns a file. Write no `AGENTS.md`.** The setup is Claude only, and Claude Code reads
`CLAUDE.md`. It finds a nested `CLAUDE.md` and loads it when it opens a file in that
subtree, but it never finds an `AGENTS.md` by itself. A second file only for other
tools costs an import line in every directory, and one file more to keep true.

Other tools read their own files. GitHub Copilot reads
`.github/copilot-instructions.md`, and Cursor reads `.cursor/rules/`. Leave those files
as they are.

## An AGENTS.md found in the project

Claude Code loads an `AGENTS.md` only when a `CLAUDE.md` imports it with a line such as
`@AGENTS.md`. An import resolves against the file that holds it, so `client/CLAUDE.md`
holding `@AGENTS.md` imports `client/AGENTS.md`, not the root one.

- **An `AGENTS.md` that a `CLAUDE.md` imports** was already in force, so move it whole.
  Put its content into that `CLAUDE.md` in place of the import line, keep every other
  line of the `CLAUDE.md` where it was, and remove the `AGENTS.md`. The move itself
  loses nothing and places nothing again; in an adoption, its rules are then placed
  with the rest of that `CLAUDE.md`.
- **An `AGENTS.md` that nothing imports** never loaded. Its rules are not yet in force,
  so they go through adoption, rule by rule, as `../adopt.md` says, and the file goes
  once every rule in it has a home.

Before you remove an `AGENTS.md` whose working copy differs from git's `HEAD`, back it
up by the rule in step 5 of `../adopt.md`. Then update the record, as "Using it" in
`../record.md` says for a file folded into another.

## The tiers

| File | When it loads | Use it for |
|---|---|---|
| Root `CLAUDE.md` | Every session, always | Stack, commands, map, cross-cutting rules |
| `.claude/rules/*.md` with `paths:` | Only when a matching file is read | Language- or area-specific conventions |
| `.claude/rules/*.md` without `paths:` | Every session | Same priority as root — use sparingly |
| `<subdir>/CLAUDE.md` | When a file in that subtree is read | Per-component detail |

The lazy-loading of nested files is the whole reason to split. A component file costs
nothing until someone actually opens a file in that directory, so you can afford to be
specific there in a way you cannot afford at the root.

Files are concatenated, not overridden. A nested file that contradicts the root produces
two competing instructions in context and either may win. Nested files should *add*
detail, never reverse a root rule.

## Which components earn a file

A component is a unit someone would think about separately: a package or an app in a
monorepo; `api/`, `domain/` and `infra/` in a layered backend; `components/`,
`composables/`, `stores/` and `views/` in a Vue app; the templates and the data
sources in a reporting folder. It earns its own `CLAUDE.md` when it has a distinct
purpose, a distinct set of conventions, or a boundary others shouldn't cross.

**Let that test set the count, not a target.** A directory earns a file when there is
something true to write about it that nobody can derive by opening it: a boundary, a
local convention, a command that differs. A twelve-package monorepo genuinely has
twelve; a small service has one, and the root covers it. Writing past the point where
you have something worth saying produces files that restate the directory listing, and
those load into every session in that subtree forever.

## Root CLAUDE.md template

Target 80–160 lines. Hard ceiling 200. For a folder without code, Stack and Commands
become what the work is made with and how it gets checked. Leave out any section that
has nothing true to say.

```markdown
# <Project name>

<One paragraph: what this is and who uses it. Include the non-obvious part —
"a billing service that fronts Stripe and must stay idempotent across retries"
beats "a Node.js service".>

## Stack

- <Language + version, and where it's pinned>
- <Framework + version>
- <Package manager — say which, especially if it isn't the default one>
- <Database / queue / external services that matter>

## Commands

| Task | Command |
|---|---|
| Install | `<cmd>` |
| Dev server | `<cmd>` |
| Test (all) | `<cmd>` |
| Test (single file) | `<cmd>` |
| Lint | `<cmd>` |
| Typecheck | `<cmd>` |
| Build | `<cmd>` |

<Take these from CI, not from the README — CI is what actually runs. Mark any
command you could not verify.>

## Map

| Component | Responsibility | Start here |
|---|---|---|
| `<path>` | <one line> | `<the file to read first>` |

<Only the components you mapped. The "start here" column is the point: it is the
one thing that cannot be recovered by listing the directory.>

## Conventions

<Only where this project differs from the framework default or from what a
competent developer would assume. Each line concrete enough to verify.>

- <e.g. "Errors cross module boundaries as `Result<T, AppError>`, never thrown">
- <e.g. "Migrations are append-only; never edit a file in `migrations/`">

## Boundaries

<Things that must not happen. These earn their place in the root because a
violation is expensive.>

- <e.g. "Nothing under `web/` may import from `server/db/` — go through `server/api/`">

## Trios

| Task | Run it with | Agents |
|---|---|---|
| <task> | `/<task>` | `<task>-plan`, `<task>-do`, `<task>-check` |
```

## Component CLAUDE.md template

Target 30–70 lines. Lives at the component root, e.g. `src/billing/CLAUDE.md`.

```markdown
# <Component name>

<What it's responsible for, one or two sentences. Then the thing a newcomer
gets wrong on their first attempt.>

**Start here:** `<the file to read first>`

## Map

| What | Where |
|---|---|
| <the behaviour someone will go looking for> | `<file>` or `<file:line>` |

<Two to five rows. Name the things people actually hunt for and cannot find by
filename — where the request is validated, where the template is resolved, which
class owns the retry. Not an inventory of the directory.>

## Local conventions

- <Only what's specific to this component and differs from the root>

## Tests

`<command to run just this component's tests>`

## Gotchas

- <The bug someone already shipped once. This is the highest-value line in the file.>
```

## Path-scoped rules

Use these when a convention follows a *file type* rather than a directory. They live in
`.claude/rules/` and load only when a matching file is touched.

```markdown
---
paths:
  - "src/**/*.{ts,tsx}"
  - "tests/**/*.test.ts"
---

# TypeScript conventions

- Prefer `type` over `interface` except when declaration merging is needed
- No `any`. Use `unknown` and narrow.
```

A rule file with no `paths:` frontmatter loads every session at the same priority as the
root file — so if you write one, it needs to earn its context budget like root content
does.

Glob patterns support brace expansion (`*.{ts,tsx}`), `**` for any depth, and directory
prefixes (`src/api/**/*`).

## Project skills

Besides the skill that runs each trio, `.claude/` may earn a **project skill**,
`.claude/skills/<name>/SKILL.md`, when the project has a multi-step procedure of its own
that costs real time to reconstruct: bringing a full local stack up in the right order,
a release checklist, a smoke test with a fixed sequence. Write one only when you found
such a procedure and can state its steps concretely. A skill that restates
`npm run dev` is noise. List it in the report like everything else.

## What to leave out

Every line costs context in every session, so the bar is: *would this be got wrong
without the line, or cost real time to rediscover?*

Leave out:

- **Tree restatements** — a listing of directories that `ls` reproduces exactly
- Dependency lists that restate `package.json`
- Architecture prose that describes what the code plainly shows
- Generic advice ("write clean code", "add tests") — that belongs in a skill, not
  context
- Anything already stated in an enabled plugin's skill
- **Facts about this machine**, such as where a tool is installed or that credentials
  aren't set up yet. `CLAUDE.md` is committed: on the next machine those lines are
  wrong, and on this one they go stale the day someone fixes them

Keep:

- Commands, especially non-obvious ones
- **An entry-point map** — which file to open first per component, and where the two or
  three behaviours people hunt for actually live. This is not a tree restatement: a tree
  is recoverable in one command, whereas "template resolution happens in
  `TemplateConfig.java`, and it collapses nested paths to basenames" costs a real search
  to rediscover, every session, forever.
- Conventions that differ from the framework default
- Boundaries and invariants
- Rationale for decisions that look wrong but aren't
- Gotchas that have already bitten someone
