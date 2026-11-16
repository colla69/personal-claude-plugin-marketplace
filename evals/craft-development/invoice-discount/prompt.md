---
name: invoice-discount
description: A bug whose symptom shows in one file and whose cause is in a shared helper.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

The invoice for an order of exactly 100.00 shows a 10.00 discount. The discount is only for orders over 100. Fix it. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
