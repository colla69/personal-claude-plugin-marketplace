---
name: cache-expiry-test
description: Tests for a class whose state is private.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Write tests for `TtlCache` in `src/cache.js`, including that an entry expires after its time to live. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
