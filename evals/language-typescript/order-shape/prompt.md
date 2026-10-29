---
name: order-shape
description: A plain data shape that code reads and does not change.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/order.ts`. It exports the shape `Order` of an order: an id, a customer name, and a list of lines, each with a product name and a price in cents. It also exports `total(order)`, the sum of the prices.
