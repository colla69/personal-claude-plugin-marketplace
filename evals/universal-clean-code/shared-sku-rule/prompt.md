---
name: shared-sku-rule
description: A form check that must agree with the server.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/client/form.js`. It exports `checkSku(value)`, which the order form calls before it submits, and returns an error message string, or `null` when the value is fine. The server refuses some SKUs; the form should refuse exactly the ones the server refuses. The server code is in `src/server/`.
