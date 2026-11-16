---
name: price-rounding
description: A rounding change to a function whose comment states the old rounding.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Finance found that `grossCents` in `src/pricing.js` loses a cent on some refunds: it rounds down, and the refund code rounds the other way. Change it to round to the nearest cent, with halves rounded up.

When you are done, show every file you changed, whole, in your reply.
