# universal-clean-code

Cleanliness is not an end in itself. Every rule answers to one test: does this make the
code cheaper to change next month? When a rule and that test disagree, the test wins.

| | |
|---|---|
| Skill | `clean-code` |
| Layer | Universal |
| Builds on | nothing |

**This is the file to edit when your taste changes.** The code Craft plugins and the
Language plugins judge against it, so one edit here moves every judgement downstream.

## Fires when

- Writing new code, or asking whether existing code is well written
- "is this clean enough", readability, maintainability, naming
- Before extracting an abstraction or adding a layer, since duplication is cheaper than
  the wrong abstraction

## Leaves to others

- **The code around it, for a small change.** Consistency within a file beats this
  standard. The mismatch is raised once, separately.
- A language's idioms and a framework's conventions, to the Language and Framework &
  Tools layers, such as `java-conventions` or `vue-conventions`.
- How code gets changed, reviewed and restructured: `development-standards`,
  `review-changes` and `refactor-safely`, which measure their results against this.

## Install

Docking installs it at project scope in any project with code, and the code Craft and
Language plugins pull it in. By hand:

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
