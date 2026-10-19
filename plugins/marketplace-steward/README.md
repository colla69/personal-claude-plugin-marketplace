# marketplace-steward

What a project teaches should reach the next project. The steward is one package for
the whole cycle: it sets a project up, keeps that setup current, and turns lessons
into changes to the marketplace, by pull request. It will also adopt setups a project
already has.

**Still being built.** Set-up, keep-current and contributing work. Adoption comes
next, as `docs/werkstatt/package-plan.md` lays out.

| | |
|---|---|
| Skills | `steward`, the front door, and `evaluate-skills` |
| Agents | `codebase-cartographer`, which surveys a codebase for set-up, and `contribution-checker`, which checks a change before its pull request. Both read-only |
| References | `set-up/`, `keep-current.md`, `contribute.md`, `record.md`, `place-knowledge.md` and `author-skills/`, read by path |
| Layer | None: it works on the marketplace itself |
| Builds on | `craft-review` |

## Fires when

- "set this project up", "onboard this repo", "set up agents for this repo"
- A trio wanted for one more task
- "update the setup", or a skill or agent in a project's setup not loading
- "remember this for other projects", "a skill got this wrong", "make a skill out of
  this"
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
- For a contribution: a branch and a pull request on the marketplace, from its own
  clone in `~/.local/share/marketplace-steward/`, never from a checkout of yours

It asks two things only: the sources checklist, once, and an OK before it creates a
new skill. Everything else it does and reports.

## Leaves to you

- **Git.** No branch, commit, stage or stash. Branch before running it; the report
  lists every path it created and changed, and `git diff` does the rest.
- **Your edits.** A file you changed after the steward wrote it is never overwritten.
- **The merge.** Every change to the marketplace waits for you in a pull request.
- **What makes a review finding at all.** `craft-review:review-work`.

## Install

```bash
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

User scope: it belongs to the machine and works in every project you open. The first
time it runs, Claude Code asks once whether it may, because it reads its own reference
files.
