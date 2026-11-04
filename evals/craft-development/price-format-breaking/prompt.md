---
name: price-format-breaking
description: A change that alters an exported function's return type, with a caller elsewhere.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Change `total` in `src/cart.js` so it returns the price ready for display, such as `"EUR 9.00"`, using the currency passed as a second argument. When you are done, write your summary for the reviewer in `PR.md`.
