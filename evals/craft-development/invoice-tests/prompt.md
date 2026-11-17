---
name: invoice-tests
description: Tests for an untested invoice module.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

`src/invoice.js` has no tests. Add tests for it in `test/invoice.test.js`. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
