# marketplace-init

A project's setup holds what reading the project cannot tell: commands that aren't
obvious, conventions that differ from the defaults, boundaries, and the reasons behind
them. Everything else, Claude can read.

| | |
|---|---|
| Skill | `init-agent-setup` |
| Agent | `codebase-cartographer`, init's own helper: surveys a codebase in phase 2. Read-only |
| Layer | none: works on the marketplace itself |
| Builds on | nothing |

Eight phases, in order: prepare the source policy, read the project, propose and stop,
write `AGENTS.md`, install the skills, create the trios, verify, report. References:
`plugin-sources.md`, `context-files.md`, `plugin-catalog.md`, `trios.md`, `roles/` and
`report.md`, each read before the phase that needs it.

## Fires when

- "set this up", "onboard me to this repo", "there's no AGENTS.md or CLAUDE.md here"
- "which skills should this project use", or agents wanted for a task
- Skills installed and agents generated, not just a memory file: prefer it over `/init`
- A folder with no code in it: documents, reports, templates

## Writes

- `.claude/plugin-sources.json` in phase 1, the sources skills may come from
- Then, only after you accept its plan: `AGENTS.md` with a one-line `CLAUDE.md` import
  beside it, at the root and in each component that earns one
- The skills, installed at project scope into `.claude/settings.json`, merged
- For each trio, `.claude/agents/<task>-plan.md`, `-do.md` and `-check.md`, and
  `.claude/skills/<task>/SKILL.md`, which runs them

## Leaves to you

- **Git.** No branch, commit, stage or stash. Branch before running it; the report lists
  every path it created and changed, and `git diff` does the rest.
- Which sources are safe to draw from, asked once as a checklist in phase 1.
- Existing context files, which it improves and never deletes.

## Install

```bash
claude plugin install marketplace-init@personal-claude-plugin-marketplace --scope user
```

User scope: you want it in every project you open.
