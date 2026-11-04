---
name: test-only-fix
description: A change that repairs a broken test and touches no source file.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Skill]
---

The change in `change.diff` is ready to commit. Write a Conventional Commits message for it into `COMMIT_MSG.txt`.
