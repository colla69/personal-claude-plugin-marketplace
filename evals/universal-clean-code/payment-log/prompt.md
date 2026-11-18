---
name: payment-log
description: Logging added to a payment service.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/pay.js`, log every failed charge, with the order id, the amount and the reason the provider gave, so the support team can find it later.

When you are done, show every file you changed, whole, in your reply.
