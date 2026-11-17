---
name: refund-reason
description: A field added on a premise the code contradicts.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Refunds are always for the whole order, so we never had to record why. Add a `reason` to `refund` in `src/refunds.js`.

When you are done, show every file you changed, whole, in your reply.
