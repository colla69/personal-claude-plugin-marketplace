# craft-shipping

Before Claude judges whether an app is ready to ship, it asks what the app is ready for
and what a failure would cost. It also covers handoffs to a developer, new projects in
an empty folder, replacing files on a live server with no deploy tool, and the cost
of model calls.

| | |
|---|---|
| Skills | `readiness-review`, `developer-handoff`, `new-project`, `replace-live-files`, `llm-cost` |
| Layer | Craft |
| Builds on | nothing |

## Fires when

- "is my app ready to launch?", "can I ship this?", "write a handoff"
- "start me an app that…", in a folder with no code
- "put this on the server", "publish over SFTP", on a server with no deploy tool
- code that calls a language model API, "the API bill is too high"

## Leaves to others

- The project's own launch checklist, which wins.
- Replacing the site in one step, to a deploy tool where the project has one.
- Model choice and limits, to the project's own rules.

## Install

Docking installs it in a project with an app that people will use, in an empty folder
where one is planned, in a repo that uploads over SFTP or FTP, and in one that
calls a language model API. By hand:

```bash
claude plugin install craft-shipping@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/readiness-review/SKILL.md`](skills/readiness-review/SKILL.md),
  [`skills/developer-handoff/SKILL.md`](skills/developer-handoff/SKILL.md),
  [`skills/new-project/SKILL.md`](skills/new-project/SKILL.md),
  [`skills/replace-live-files/SKILL.md`](skills/replace-live-files/SKILL.md),
  [`skills/llm-cost/SKILL.md`](skills/llm-cost/SKILL.md)
