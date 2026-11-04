# craft-shipping

Before it judges whether an app is ready to ship, Claude asks what it is ready for and
what a failure would cost. When it hands an app to a developer, it marks where each
statement comes from, and gives environment variables by name, never by value. In an
empty folder, it proposes a stack and asks before it creates a file.

| | |
|---|---|
| Skills | `readiness-review`, `developer-handoff`, `new-project` |
| Layer | Craft |
| Builds on | nothing |

It holds only what a measurement showed the model skips without it. Asked "is my shop
ready to launch?", the model gave a verdict without asking in 5 of 5 runs, and asked
first in 4 of 5 with the skill. In a handoff, it marked where its statements came from
in 0 of 5 runs without the skill and 3 of 5 with it, and copied a password or key from
`.env.example` in 2 of 5 runs without it and none with it. Asked to start an app in an
empty folder, it built one without asking in 5 of 5 runs, and asked first in 5 of 5
with the skill.

## Fires when

- "is my app ready to launch?", "is this production-ready?", "can I ship this?"
- A launch or handoff audit
- "write a handoff", "document this for the next developer"
- "start me an app that…", "scaffold a new project", in a folder with no code

## Leaves to others

- How to review the code itself, to `craft-code-review`.
- The project's own launch checklist, which wins.

## Install

Docking installs it in a project with an app that people will use. By hand:

```bash
claude plugin install craft-shipping@personal-claude-plugin-marketplace --scope project
```

## More

- The standards themselves:
  [`skills/readiness-review/SKILL.md`](skills/readiness-review/SKILL.md),
  [`skills/developer-handoff/SKILL.md`](skills/developer-handoff/SKILL.md) and
  [`skills/new-project/SKILL.md`](skills/new-project/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
