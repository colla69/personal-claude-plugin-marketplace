# universal-work-discipline

Work done in a place someone else maintains is judged by whether the next person can
tell what changed and why, and whether anything they relied on moved without warning.
Unverified is not done.

| | |
|---|---|
| Skill | `work-discipline` |
| Layer | Universal |
| Builds on | nothing |

## Fires when

- Changing, extending or fixing existing work: code, a document, a configuration
- "just add", "quick fix", "small change"
- The task looks simple, which is when the check gets skipped

## Leaves to others

- **Which checks run for one kind of work**, to its Craft skill, such as
  `development-standards` for code.
- The project's own conventions and definition of done, which win.

## Install

Docking installs it at project scope in any project, with code or without. By hand:

```bash
claude plugin install universal-work-discipline@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/work-discipline/SKILL.md`](skills/work-discipline/SKILL.md)
