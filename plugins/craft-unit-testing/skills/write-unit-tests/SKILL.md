---
name: write-unit-tests
description: Write or strengthen unit tests — behavior-first cases, meaningful edge coverage, and assertions that actually fail when the code is wrong. Use whenever the user asks for tests, mentions coverage, says code is untested, wants TDD, or has just written a function that needs verifying. Also use when asked to review whether existing tests are any good.
---

# Write unit tests

A test earns its keep by failing when the code is wrong. Everything else — count,
coverage percentage, arrangement — is secondary to that.

## Before writing anything

1. Find the existing tests and read two or three. Copy their structure, naming, and helper
   usage: `work-discipline`'s read-before-writing, applied to tests.
2. Identify the runner and how to run a single file. You will run the tests, not just
   write them.
3. Check for existing fixtures, factories, and builders before writing new setup.

## What to test

Test behavior through the public interface. Tests bound to internals break on every
refactor, which trains the team to delete tests rather than fix code.

For each unit, cover:

- **The contract** — the thing the function promises, with a realistic input
- **The boundaries** — empty, zero, one, maximum, exactly-at-the-limit
- **The failures** — invalid input, the dependency throwing, the timeout
- **The regressions** — every bug that was ever fixed here gets a test named after it

Skip: getters, framework glue, generated code, and anything where the test would restate
the implementation line for line.

## Test shape

```
test('<subject> <behavior> when <condition>')
```

Name the behavior, not the method. `returns empty list when the user has no orders`
tells you what broke from the failure output alone; `test getOrders 2` does not.

Structure each test as arrange / act / assert, with the assert section as the shortest
part. One behavior per test — when a test has four unrelated assertions, a failure in the
first hides the rest.

Assert on outcomes, not on interactions. `expect(repo.save).toHaveBeenCalled()` passes
whether or not the saved data was correct. Prefer checking what was actually written.

## Mocking

Mock at the boundary of your system — network, clock, filesystem, randomness — and use the
real thing everywhere else. Every internal mock is a place where the test can keep passing
while production breaks.

If a unit needs five mocks to test, the design is the problem and the test is telling you
so. Say that rather than writing the five mocks.

Making a unit testable by changing its implementation is a separate change from testing
it. Name the change and why it is needed, rather than making it inside the test work.

## Verify

Run the tests. A test you wrote but did not execute is a guess.

Then confirm they mean something: change the implementation to be wrong in a small way
and check that a test actually fails. A suite that passes against broken code is worse
than no suite, because it's trusted. When you find one, report it prominently, ahead of
the tests you were asked to add.

## Report

```
## Tests added — <scope>

**Run:** `<command>` — <n passed, n failed>

### Covered
- <behavior> — <test name>

### Deliberately not covered
- <what and why>

### Gaps I couldn't close
- <what would be needed: a seam, a fixture, an implementation change>
```

## Where this yields

- **To the project.** Its runner, test layout and naming, read first as above, win for
  anything already settled there.
- **To the Framework & Tools layer.** A test framework's own skill, for JUnit or Vitest
  and the like, is more specific about its runner and its assertions.
