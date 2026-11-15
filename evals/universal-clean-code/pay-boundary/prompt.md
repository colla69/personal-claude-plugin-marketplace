---
name: pay-boundary
description: A payment step that calls a vendored payment library from three routes.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `src/checkout.js` with a function that charges an order through the payment library in `vendor/paylite.js` and returns the order marked as paid. The cart route, the subscription route and the admin route will all call it.

When you are done, show every file you changed, whole, in your reply.
