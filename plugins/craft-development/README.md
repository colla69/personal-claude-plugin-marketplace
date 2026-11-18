# craft-development

A change to code starts from a failing test, and typecheck, tests and lint run in that
order. A bug fix starts from a test that reproduces the bug.

| | |
|---|---|
| Skill | `development-standards` |
| Layer | Craft |
| Builds on | `universal-clean-code`, `universal-work-discipline` |

## Fires when

- Writing or modifying application code, in any language
- Implementing a feature or a fix

## Leaves to others

- **What good code looks like**, to `clean-code` in `universal-clean-code`.
- A framework's conventions and the project's own settled choices, which win.

## Install

Docking installs it at project scope in any project with code. By hand:

```bash
claude plugin install craft-development@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/development-standards/SKILL.md`](skills/development-standards/SKILL.md)
