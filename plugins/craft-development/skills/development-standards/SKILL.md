---
name: development-standards
description: What careful work means for code — driving each change to behavior with a failing test, and verifying with typecheck, tests and lint in that order. Use whenever writing or modifying application code, or implementing a feature or a fix.
---

# Development standards

`work-discipline` holds the rule for any work done in someone else's space: unverified
is not done. This skill says what it means for code.

## Test first

Where the project has a test runner, a change to behavior starts with a failing test,
and the code follows it in a red, green, refactor cycle. Code written test
first is designed from its caller's side, because the test is its first caller. Where
there is no runner, say so in the report, so the missing check is visible.

## Verify in this order

1. The typecheck or compile step, if the language has one
2. The test suite, or the subset covering what you touched
3. The linter, if the project has one configured

## Where this yields

- **To the project.** Local convention beats this document for anything already settled
  here.
- **To the `clean-code` standard** for function shape. This skill covers how to change
  a codebase; that one covers what good code looks like.
- **To the Framework & Tools layer.** Where a framework's skill is enabled, its
  conventions are more specific than these and win.
