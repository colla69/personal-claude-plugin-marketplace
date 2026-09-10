---
paths:
  - "plugins/**/SKILL.md"
  - "plugins/**/agents/*.md"
  - "plugins/**/references/*.md"
  - "plugins/**/README.md"
  - ".claude/agents/*.md"
  - ".claude/rules/*.md"
  - ".claude/skills/**/*.md"
---

# Authoring a skill, agent, or plugin README

The canonical guide is `.claude/skills/new-plugin/references/authoring-style.md`. Read
it before a substantial edit. These are the constraints that are checkable at the moment
of writing:

## Vendor neutrality

This product is intended to support **GitHub Copilot as well as Claude**, so generated
and authored config must not be Claude-specific where a neutral form exists.

- **Never put a model reference in agent frontmatter.** No `model: sonnet`, no other
  vendor's model name. It hard-codes one runtime into a file that should be portable.
- Agent frontmatter is `name` and `description`. `effort` and `disallowedTools` are
  Claude Code extensions — keep them only where they enforce something real, which today
  means the read-only lanes below.
- Context files: `AGENTS.md` holds the content; `CLAUDE.md` is a one-line `@AGENTS.md`
  import. Claude Code lazy-loads nested `CLAUDE.md` but never nested `AGENTS.md`, so a
  component directory needs both files.

## Lanes

Read-only is a frontmatter constraint, never a prose request. An agent whose description
says "read-only" without `disallowedTools: Write, Edit, NotebookEdit` is not read-only.

The review trio is the load-bearing case:

| Agent | Lane |
|---|---|
| `code-reviewer` | read-only — logical errors, inconsistencies, code quality |
| `refactoring-specialist` | read-only — prescribes improvements in human-readable form |
| `developer` | **the only one that edits code** |

Reviewers and refactorers give opinions. The developer implements them.

## Mechanics

- Hard-wrap prose at **88 columns**. Frontmatter `description:` lines and markdown table
  rows are exempt — they cannot wrap.
- A `description` is a trigger list in the user's words, structured as: what it is →
  "Use whenever <phrasings people type>" → "Also use <the non-obvious second trigger>".
  That last clause is what makes a skill fire when it should.
- An agent must not restate its skill. It names the job, points at the skill, then
  covers only its own failure mode, its lane, and what to do when there is nothing to
  report.
- Plugin README headings must be exactly `# <plugin-name>` — `scripts/check-catalog.mjs`
  enforces it.
- Attach a cost to every rule. A rule without a reason can only be applied to the cases
  its author anticipated.

## After any change here

Re-read `CLAUDE.md` and this file and reconcile them with what changed. A stale rule
keeps prescribing the old standard and loads into every session that touches these
paths, so it works against the change rather than being merely out of date.
