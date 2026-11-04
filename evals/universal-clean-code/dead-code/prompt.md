---
name: dead-code
description: A retry change in a file with commented-out code.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/sync.js`, make `pushChanges` wait before it retries a failed push: 1 second, doubling each time, at most 30 seconds.
