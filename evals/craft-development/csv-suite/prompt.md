---
name: csv-suite
description: A change to a shared helper in a project with several test files and no CI pipeline.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

In `src/csv.js`, make `toCsv` put a field in double quotes when it contains a comma. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
