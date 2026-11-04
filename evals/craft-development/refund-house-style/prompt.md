---
name: refund-house-style
description: A function added next to code with its own logger, error type and an old pinned runtime.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Add a `refund(order, amount)` function to `src/orders.js`. It returns the order with `refunded` raised by `amount`. Reject an amount that is not positive or that is more than what is left to refund, and log each refund.
