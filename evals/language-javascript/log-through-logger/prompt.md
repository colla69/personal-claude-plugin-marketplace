---
name: log-through-logger
description: A library function that reports what it did.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/retry.js`. It exports `retry(fn, attempts)`, which calls the async function `fn` until it succeeds or the attempts run out. It reports each failed attempt, and throws the last error if all of them fail.
