# language-conventional-commits

A commit message has two readers: a person who searches the history, and a tool that
turns it into a version and a changelog. The tool forgives nothing, so the type says
what the change does for a user, and a breaking change is always marked.

| | |
|---|---|
| Skill | `conventional-commits` |
| Layer | Language |
| Builds on | nothing |

> A breaking change that is not marked releases a minor or a patch version, and every
> user who trusts the version number upgrades into the break.

It follows the Conventional Commits 1.0.0 specification, with the type list most
projects take from the Angular convention.

## Fires when

- Writing, amending, squashing or reviewing a commit message, or committing a change
- "conventional commits", commitlint, semantic-release, a changelog generated from
  commits, a `feat:` or `fix:` prefix
- Writing a pull request title in a project that squash-merges, where the title
  becomes the commit, and deciding which version a set of commits releases

## Leaves to others

- **What goes into one commit.** How much work belongs in one change is the
  business of the Universal and Craft skills. This skill only says that a commit with
  two types holds two changes.
- The English of the description and the body, to the skill for the project's natural
  language, which applies where the format leaves room.
- The project's own types, scopes, case and length, set in its linter configuration or
  contributing guide, which win.
- Another commit format that the project's instructions name, which wins.

## Install

Set-up asks once, in every repo with code, whether the project writes Conventional
Commits, and installs it at project scope on a yes. It does not ask when the project
already shows the format, such as a commitlint configuration. In every trio, it goes
to Do, the role whose work becomes a commit. By hand:

```bash
claude plugin install language-conventional-commits@personal-claude-plugin-marketplace --scope project
```

Project scope only: the format is a choice each project makes.

## More

- The standard itself:
  [`skills/conventional-commits/SKILL.md`](skills/conventional-commits/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
