---
name: csv-crash
description: An import that crashes on one line of a large file.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Importing `data/export.csv` with `node src/import.js data/export.csv` crashes with `Error: line 137: expected 3 columns, got 4`. Find and fix the bug. The tests run with `npm test`. Write the commit message in `COMMIT_MSG.txt`.

When you are done, show every file you changed, whole, in your reply.
