# craft-development

A change to code is careful when it starts from a failing test, and typecheck, tests
and lint ran in that order.

| | |
|---|---|
| Skill | `development-standards` |
| Layer | Craft |
| Builds on | `universal-clean-code`, `universal-work-discipline` |

The general rule, unverified is not done, lives in `work-discipline`. This skill says
what it means for code.

## Fires when

- Writing or modifying application code, in any language
- Implementing a feature or a fix

## Leaves to others

- **What good code looks like.** Naming, function shape and structure are `clean-code`,
  in `universal-clean-code`.
- The rules for any work in someone else's space, to `work-discipline`, in
  `universal-work-discipline`.
- A framework's conventions, to its Framework & Tools skill, which wins where enabled.
- Anything the project has already settled, which beats all of it.

## Install

Docking installs it at project scope in any project with code, together with
`craft-code-review`. By hand:

```bash
claude plugin install craft-development@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/development-standards/SKILL.md`](skills/development-standards/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
