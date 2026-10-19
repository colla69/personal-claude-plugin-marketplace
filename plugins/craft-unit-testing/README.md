# craft-unit-testing

A test earns its keep by failing when the code is wrong. Everything else, count,
coverage percentage and arrangement, is secondary to that.

| | |
|---|---|
| Skill | `write-unit-tests` |
| Layer | Craft |
| Builds on | `universal-work-discipline` |

The check includes breaking the code on purpose. A suite that passes against broken
code is worse than none, because it is trusted.

## Fires when

- "add tests", coverage, untested code, TDD
- A function has just been written and needs verifying
- Asking whether an existing suite is any good, rather than extending it

## Leaves to others

- **Making a unit testable.** Changing its implementation is a separate change, named
  and not made inside the test work.
- A test framework's runner and assertions, to its Framework & Tools skill, for JUnit,
  Vitest and the like.
- Read before writing, applied here to existing tests, is `work-discipline`'s rule.
- The project's runner, test layout and naming, which win where they are settled.

## Install

```bash
claude plugin install craft-unit-testing@personal-claude-plugin-marketplace --scope project
```

Init installs it at project scope where a test runner is configured, most strongly where
coverage is thin. `craft-code-review` pulls it in.
