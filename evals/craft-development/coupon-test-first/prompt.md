---
name: coupon-test-first
description: A feature added to code that has a test runner.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Add coupon support to the cart in `src/cart.js`: `total(items, coupon)` takes 10% off the subtotal when the coupon is `SAVE10`, and ignores any other code. The tests run with `node --test`.
