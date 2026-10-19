# craft-development

A change to code is careful when it follows the neighbours that already do the same
thing, its diff holds only the lines it needs, and typecheck, tests and lint ran in that
order.

| | |
|---|---|
| Skill | `development-standards` |
| Layer | Craft |
| Builds on | `universal-clean-code`, `universal-work-discipline` |

The general rules, read first, match, hold scope and verify, live in `work-discipline`.
This skill says what they mean for code.

## Fires when

- Writing or modifying application code, in any language
- Implementing a feature or a fix
- Before changing a function signature, an exported type or an API response, since
  those changes break callers outside the diff

## Leaves to others

- **What good code looks like.** Naming, function shape and structure are `clean-code`,
  in `universal-clean-code`.
- The rules for any work in someone else's space, to `work-discipline`, in
  `universal-work-discipline`.
- Where a language declares its version and what each version allows, to the Language
  layer.
- A framework's conventions, to its Framework & Tools skill, which wins where enabled.
- Anything the project has already settled, which beats all of it.

## Install

```bash
claude plugin install craft-development@personal-claude-plugin-marketplace --scope project
```

Set-up installs it at project scope in any repo with code, together with
`craft-code-review` and `craft-refactoring`.
