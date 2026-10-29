---
name: shared-counter
description: A class that many tasks update at once.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/App/Counter.swift`: a `Counter` with `increment()` and a `value` to read. Many tasks call `increment()` at the same time, and each one must be counted.
