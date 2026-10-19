# marketplace-steward

What a project teaches should reach the next project. The steward is one package for
the whole cycle: it sets a project up and keeps that setup current, and it will adopt
setups a project already has and turn lessons into changes to the marketplace, by
pull request.

**Still being built.** Set-up and keep-current work. Adoption and contributing back
come next, as `docs/werkstatt/package-plan.md` lays out.

| | |
|---|---|
| Skills | `steward`, the front door, and `evaluate-skills` |
| Agents | `codebase-cartographer`, which surveys a codebase for set-up. Read-only |
| References | `set-up/`, `keep-current.md`, `record.md`, `place-knowledge.md` and `author-skills/`, read by path |
| Layer | None: it works on the marketplace itself |
| Builds on | `craft-review` |

## Fires when

- "set this up", "onboard me to this repo", "there's no AGENTS.md or CLAUDE.md here"
- "which skills should this project use", or agents wanted for a task
- "update the setup", "refresh the skills", or a project's skill or agent not loading
- A folder with no code in it: documents, reports, templates
- `evaluate-skills`: "is this skill well written?", "why isn't this skill triggering?",
  or a change to this skills marketplace before its pull request

## Writes

- `.claude/plugin-sources.json`, the sources skills may come from, asked once as a
  checklist
- `AGENTS.md` with a one-line `CLAUDE.md` import beside it, at the root and in each
  component that earns one
- The skills, installed at project scope into `.claude/settings.json`, merged. Plugin
  keys that no longer exist are removed
- For each trio, `.claude/agents/<task>-plan.md`, `-do.md` and `-check.md`, and
  `.claude/skills/<task>/SKILL.md`, which runs them
- `.claude/steward.json`, the record of what it generated

It stops only to ask before it would create a new skill, and reports everything else.

## Leaves to you

- **Git.** No branch, commit, stage or stash. Branch before running it; the report
  lists every path it created and changed, and `git diff` does the rest.
- **Your edits.** A file you changed after the steward wrote it is never overwritten.
- **What makes a review finding at all.** `craft-review:review-work`.

## Install

```bash
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

User scope: it belongs to the machine and works in every project you open. The first
time it runs, Claude Code asks once whether it may, because it reads its own reference
files.
