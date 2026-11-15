---
name: tax-comments
description: A rounding bug fixed in a file full of comment noise and dead code.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Invoices in `src/tax.js` are off by a cent sometimes: `invoiceTax` should round the tax to cents once, on the total, not per line. Fix it.

When you are done, show every file you changed, whole, in your reply.
