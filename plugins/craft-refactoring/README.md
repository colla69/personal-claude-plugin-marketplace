# craft-refactoring

A refactor changes structure and preserves behavior, in small steps, each gated on a
green test suite. The moment behavior changes, it is a rewrite.

| | |
|---|---|
| Skill | `refactor-safely` |
| Layer | Craft |
| Builds on | `universal-clean-code`, `universal-work-discipline`, `craft-development` |

> A refactor without tests is a rewrite with extra confidence.

The safety net comes first: existing tests that cover the code, or characterization
tests that assert what it does now. Without one, it says so and asks.

## Fires when

- "refactor", "clean up", "restructure", "extract", "simplify", "split this file",
  "reduce duplication", "pay down tech debt"
- Before adding a feature to code that's hard to change

## Leaves to others

- **What "better" means.** Which structure to aim for is `clean-code`'s call; this says
  how to get there safely.
- Bugs found on the way, which are noted and left, out of scope as `work-discipline`
  says.
- Reformatting and public interfaces, to `development-standards`, in
  `craft-development`.
- How steps are recorded and reviewed, to the project's commit and review conventions.

## Install

Docking installs it at project scope in any project with code. By hand:

```bash
claude plugin install craft-refactoring@personal-claude-plugin-marketplace --scope project
```

It needs no test suite; without one, its plans start with characterization tests.

## More

- The standard itself:
  [`skills/refactor-safely/SKILL.md`](skills/refactor-safely/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
