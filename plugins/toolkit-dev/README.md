# toolkit-dev

Authoring workflow for this marketplace. The repo uses itself to grow.

| Component | Name | Role |
|---|---|---|
| Skill | `new-plugin` | Decide, scaffold, write, register, verify |
| Agent | — | None. Authoring is a conversation, not a delegation |

Reference: `authoring-style.md` — the canonical guide to the house voice, the
skill/agent split, and how to write a `description` that actually triggers.

Assets: annotated `SKILL.md`, `agent.md`, `README.md`, and `plugin.json` templates.

## Fires when

- "add a plugin for X" while working in this repo
- You're asking how to write a skill or subagent for the toolkit
- You're editing `marketplace.json` by hand

## Does not

- **Scaffold on request alone.** A plugin is warranted only when it carries a standard
  you'd apply repeatedly across projects. One task is a prompt; conventions that belong
  in an existing skill belong there. It says so and proposes the alternative instead.
- Skip the registrations. A plugin missing from `plugin-catalog.md` installs fine and is
  never recommended to any project, ever. `scripts/check-catalog.mjs` fails CI on it.
- Add a `version`. Updates here resolve by commit SHA; a version pins users to a cached
  copy until it's bumped.

## Install

```bash
claude plugin install toolkit-dev@personal-claude-plugin-marketplace --scope project
```

Project scope, in this repo only. It's noise everywhere else.
