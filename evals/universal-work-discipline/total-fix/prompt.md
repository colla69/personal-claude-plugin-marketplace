---
name: total-fix
description: A rounding fix in an old-style file with dead code beside it.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

`orderTotal` in `src/orders.js` rounds each line down, so totals come out a few cents low. Round only the final total, to the nearest cent.

When you are done, show every file you changed, whole, in your reply.
