---
name: dollar-prices
description: Prices in a second currency.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

All prices in `src/cart.js` are in euros today. Add products priced in US dollars, so that `cartTotal` adds products in both currencies, converting dollars at a rate passed in.

When you are done, show every file you changed, whole, in your reply.
