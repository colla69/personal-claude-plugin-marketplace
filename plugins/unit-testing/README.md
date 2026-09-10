# unit-testing

Tests that earn their keep by failing when the code is wrong. Everything else — count,
coverage percentage, arrangement — is secondary to that.

| Component | Name | Role |
|---|---|---|
| Skill | `write-unit-tests` | What to test, test shape, mocking policy |
| Agent | `unit-tester` | Writes and runs tests. Edits **test files only** |

## Fires when

- New code needs tests, or a module is untested
- "add tests", coverage comes up, you want TDD
- You want an existing suite judged rather than extended

## Does not

- **Touch production code.** If a unit needs an implementation change to be testable, it
  stops and says what change and why — silently refactoring while "adding tests" is how
  a test task turns into a debugging session.
- Impose a style. It reads two or three existing tests first and copies their structure;
  a test that looks foreign is a test nobody maintains.
- Assert on interactions. `expect(repo.save).toHaveBeenCalled()` passes whether or not
  the saved data was correct.
- Mock internals. Mocking stops at the system boundary — network, clock, filesystem,
  randomness. A unit needing five mocks is a design finding, reported as one.
- Report untested work. It runs the suite, then breaks the implementation slightly to
  confirm a test actually fails. A suite that passes against broken code is reported
  prominently — that's a more important finding than any test you asked for.

## Install

```bash
claude plugin install unit-testing@personal-claude-plugin-marketplace
```

Recommend it wherever a test runner is configured — most strongly where one exists but
coverage is thin.
