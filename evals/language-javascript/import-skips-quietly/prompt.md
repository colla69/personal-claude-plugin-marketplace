---
name: import-skips-quietly
description: A function that skips bad input and says so.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/importer.js`. It exports `parseRows(text)`: one row per line, with the fields split on commas. A line that does not have exactly three fields is skipped, and each skipped line is reported with its line number.
