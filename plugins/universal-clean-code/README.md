# universal-clean-code

Every rule answers to one test: does this make the code cheaper to change next month?
When a rule and that test disagree, the test wins. It holds only the rules a
measurement showed the model breaks without them.

| | |
|---|---|
| Skill | `clean-code` |
| Layer | Universal |
| Builds on | nothing |

## Fires when

- Writing new code, designing a module, or changing a function
- Fixing a bug in a file, or calling a third-party library
- Readability, maintainability, "clean code"

## Leaves to others

- **The style of the code around a small change**, which wins, except for comment noise.
- How code gets changed, to `development-standards`; idioms, to the Language and
  Framework & Tools layers.

## Install

Docking installs it at project scope in any project with code. By hand:

```bash
claude plugin install universal-clean-code@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/clean-code/SKILL.md`](skills/clean-code/SKILL.md)
