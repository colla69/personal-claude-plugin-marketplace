# universal-work-discipline

Work done in a place someone else maintains is judged by whether the next person can
tell what changed and why, and whether anything they relied on moved without warning.

| | |
|---|---|
| Skill | `work-discipline` |
| Layer | Universal |
| Builds on | nothing |

Four rules, for any kind of work: read before writing, match what is there, hold scope,
and unverified is not done.

## Fires when

- Changing, extending or fixing existing work: code, a document, a template, a
  configuration
- "just add", "quick fix", "small change", "while you're in there"
- The task looks simple, which is when scope quietly expands and the check gets skipped

## Leaves to others

- **What the rules mean for one kind of work.** Which neighbours to read, which checks
  run and in what order: the Craft skill for that work, such as `development-standards`
  for code.
- What good work looks like — to `clean-code` for code, and to the more specific
  layers.
- The project's own conventions and definition of done, which win over all of it.

## Install

Docking installs it at project scope in any project, with code or without, and most Craft
plugins pull it in. By hand:

```bash
claude plugin install universal-work-discipline@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/work-discipline/SKILL.md`](skills/work-discipline/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
