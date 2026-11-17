---
name: order-shipping
description: Shipping cost added to a checkout.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add the shipping cost to `checkout` in `src/checkout.js`: 5 for orders under 2 kg and 9 from 2 kg up, both doubled outside Italy.

When you are done, show every file you changed, whole, in your reply.
