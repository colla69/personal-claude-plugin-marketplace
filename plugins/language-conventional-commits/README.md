# language-conventional-commits

A commit message is read by a person and by a tool that turns it into a version and a
changelog. The type says what the change does for a user. It follows Conventional
Commits 1.0.0.

| | |
|---|---|
| Skill | `conventional-commits` |
| Layer | Language |
| Builds on | nothing |

## Fires when

- Writing, amending, squashing or reviewing a commit message
- commitlint, semantic-release, a changelog generated from commits, a `feat:` prefix
- A pull request title in a project that squash-merges

## Leaves to others

- **What goes into one commit**, to the Universal and Craft skills.
- The project's own types, scopes and format, set in its linter or contributing guide,
  which win.

## Install

Docking asks once, in every repo with code, whether the project writes Conventional
Commits, and installs it on a yes. By hand:

```bash
claude plugin install language-conventional-commits@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/conventional-commits/SKILL.md`](skills/conventional-commits/SKILL.md)
