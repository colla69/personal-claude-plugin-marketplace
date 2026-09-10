---
name: write-unit-tests
description: Write or strengthen unit tests — behavior-first cases, meaningful edge coverage, and assertions that actually fail when the code is wrong. Use whenever the user asks for tests, mentions coverage, says code is untested, wants TDD, or has just written a function that needs verifying. Also use when asked to review whether existing tests are any good.
---

# Write unit tests

A test earns its keep by failing when the code is wrong. Everything else — count,
coverage percentage, arrangement — is secondary to that.

## Before writing anything

Match the project, don't impose a style on it.

1. Find the existing tests and read two or three. Copy their structure, naming, and helper
   usage. A test that looks foreign is a test nobody maintains.
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

## Verify

Run the tests. Then confirm they mean something: change the implementation to be wrong in
a small way and check that a test actually fails. A suite that passes against broken code
is worse than no suite, because it's trusted.

Report what you covered, what you deliberately left uncovered, and why.
