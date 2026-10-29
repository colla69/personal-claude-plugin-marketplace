---
name: stats-helpers
description: Functions that read a list and change nothing.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/stats.ts` with two exported functions, `mean(values)` and `largest(values)`, for lists of numbers.
