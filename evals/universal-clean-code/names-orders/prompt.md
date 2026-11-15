---
name: names-orders
description: A new query added to a small orders module that already has its own verbs and a date helper.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/orders.js`, add an exported function that takes the orders, a customer id and today's date, and gives back the customer's unpaid orders that are more than 30 days old, plus whether the customer owes more than 500 in total on them. An order has `customerId`, `placedAt` (a Date), `paidAt` (a Date or null) and `amount`.

When you are done, show every file you changed, whole, in your reply.
