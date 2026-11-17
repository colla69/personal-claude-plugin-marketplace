---
name: customer-csv
description: A second CSV export beside an existing one.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `customersCsv(customers)` to `src/export.js`, with the columns name, email and city, escaped the same way as `ordersCsv`.

When you are done, show every file you changed, whole, in your reply.
