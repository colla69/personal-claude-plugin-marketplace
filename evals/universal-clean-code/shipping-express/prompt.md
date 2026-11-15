---
name: shipping-express
description: Express shipping added next to an existing standard shipping rule.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/shipping.js`, add express shipping. It costs 9.90 on top of the standard price, except for members, who pay no express charge on orders of 50 or more. On Saturdays and Sundays express costs 2 more.

When you are done, show every file you changed, whole, in your reply.
