# universal-clean-code

Cleanliness is not an end in itself. Every rule answers to one test: does this make the
code cheaper to change next month? When a rule and that test disagree, the test wins.

It holds only the rules a measurement showed the model breaks without them: callers
above helpers, no flag arguments, commands apart from queries, no comment noise, no
reaching through chains, one reason to change per unit, side tasks kept out of business
rules, wrapped third-party libraries, and tests without the real clock.

| | |
|---|---|
| Skill | `clean-code` |
| Layer | Universal |
| Builds on | nothing |

**This is the file to edit when your taste changes.** The code Craft plugins judge
against it, so one edit here moves every judgement downstream.

## Fires when

- Writing new code or tests, or changing a function
- Fixing a bug in a file, or calling a third-party library
- Readability, maintainability, "clean code"

## Leaves to others

- **The code around it, for a small change, in style.** Consistency within a file beats
  this standard. The comment rules are the exception: a file it changes loses its
  comment noise.
- A language's idioms and a framework's conventions, to the Language and Framework &
  Tools layers, such as `vue-conventions`.
- How code gets changed: `development-standards`, which measures its results against
  this.

## Install

Docking installs it at project scope in any project with code, and the code Craft
plugins pull it in. By hand:

```bash
claude plugin install universal-clean-code@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/clean-code/SKILL.md`](skills/clean-code/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
