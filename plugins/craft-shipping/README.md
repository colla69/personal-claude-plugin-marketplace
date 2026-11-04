# craft-shipping

Before it judges whether an app is ready to ship, Claude asks what it is ready for and
what a failure would cost. The answer decides how hard each finding weighs.

| | |
|---|---|
| Skill | `readiness-review` |
| Layer | Craft |
| Builds on | nothing |

It holds only what a measurement showed the model skips without it. Asked "is my shop
ready to launch?", the model gave a verdict without asking in 5 of 5 runs, and asked
first in 4 of 5 with the skill.

## Fires when

- "is my app ready to launch?", "is this production-ready?", "can I ship this?"
- A launch or handoff audit

## Leaves to others

- How to review the code itself, to `craft-code-review`.
- The project's own launch checklist, which wins.

## Install

Docking installs it in a project with an app that people will use. By hand:

```bash
claude plugin install craft-shipping@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/readiness-review/SKILL.md`](skills/readiness-review/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
