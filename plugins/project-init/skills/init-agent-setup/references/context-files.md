# Context file layout

How Claude Code actually loads project context, and what to put where.

## Contents

- [The four tiers](#the-four-tiers)
- [Root CLAUDE.md template](#root-claudemd-template)
- [Component CLAUDE.md template](#component-claudemd-template)
- [Path-scoped rules](#path-scoped-rules)
- [What to leave out](#what-to-leave-out)

## The four tiers

| File | When it loads | Use it for |
|---|---|---|
| `CLAUDE.md` (root) | Every session, always | Stack, commands, cross-cutting rules |
| `.claude/rules/*.md` with `paths:` | Only when Claude reads a matching file | Language- or area-specific conventions |
| `.claude/rules/*.md` without `paths:` | Every session | Same priority as root — use sparingly |
| `<subdir>/CLAUDE.md` | When Claude reads a file in that subtree | Per-component detail |

The lazy-loading of nested files is the whole reason to split. A component file costs
nothing until Claude actually opens a file in that directory, so you can afford to be
specific there in a way you cannot afford at the root.

Files are concatenated, not overridden. A nested file that contradicts the root produces
two competing instructions in context and Claude may follow either one. Nested files
should *add* detail, never reverse a root rule.

## Root CLAUDE.md template

Target 60–150 lines. Hard ceiling 200.

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

<Take these from CI, not from the README — CI is what actually runs.>

## Layout

| Path | Responsibility |
|---|---|
| `<path>` | <one line> |

<Only list the components you mapped. Skip anything self-evident.>

## Conventions

<Only where this project differs from the framework default or from what a
competent developer would assume. Each line concrete enough to verify.>

- <e.g. "Errors cross module boundaries as `Result<T, AppError>`, never thrown">
- <e.g. "Migrations are append-only; never edit a file in `migrations/`">

## Boundaries

<Things that must not happen. These earn their place in the root because a
violation is expensive.>

- <e.g. "Nothing under `web/` may import from `server/db/` — go through `server/api/`">
```

## Component CLAUDE.md template

Target 20–60 lines. Lives at the component root, e.g. `src/billing/CLAUDE.md`.

```markdown
# <Component name>

<What it's responsible for, one or two sentences. Then the thing a newcomer
gets wrong on their first attempt.>

**Start here:** `<the file to read first>`

## Local conventions

- <Only what's specific to this component and differs from the root>

## Tests

`<command to run just this component's tests>`

## Gotchas

- <The bug someone already shipped once. This is the highest-value line in the file.>
```

## Path-scoped rules

Use these when a convention follows a *file type* rather than a directory. They live in
`.claude/rules/` and load only when Claude touches a matching file.

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

## What to leave out

Every line costs context in every session, so the bar is: *would Claude get this wrong
without the line?*

Leave out:

- Directory listings that restate the tree — Claude can run `ls`
- Dependency lists that restate `package.json`
- Architecture prose that describes what the code plainly shows
- Generic advice ("write clean code", "add tests") — that belongs in a skill, not context
- Anything already stated in an enabled plugin's skill

Keep:

- Commands, especially non-obvious ones
- Conventions that differ from the framework default
- Boundaries and invariants
- Rationale for decisions that look wrong but aren't
- Gotchas that have already bitten someone
