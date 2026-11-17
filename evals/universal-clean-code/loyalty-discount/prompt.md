---
name: loyalty-discount
description: A loyalty discount at checkout.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add a loyalty discount: customers with 5 or more past orders get 10% off. Put it in `src/loyalty.js`, and make `checkout` in `src/cart.js` use it.

When you are done, show every file you changed, whole, in your reply.
