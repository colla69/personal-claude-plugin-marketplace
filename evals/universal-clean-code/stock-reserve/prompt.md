---
name: stock-reserve
description: Reserving stock from the checkout route against an async store.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/inventory.js`, add a function the checkout route calls to reserve a quantity of a product. It must not reserve more than is in stock.

When you are done, show every file you changed, whole, in your reply.
