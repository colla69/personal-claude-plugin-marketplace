---
name: cancel-counts
description: A per-customer count of cancelled orders in a file with set names.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add a function to `src/customers.js` that gives, for each customer, the number of orders they cancelled in the last 30 days. Orders have `customerId`, `status` and `placedAt`, a Date. Support wants to call the customers with three or more.

When you are done, show every file you changed, whole, in your reply.
