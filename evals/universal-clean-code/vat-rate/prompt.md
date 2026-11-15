---
name: vat-rate
description: A VAT rate chosen from an order whose customer holds an address.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/vat.js`, add a function that gives the VAT rate for an order: 0.22 when the customer lives in Italy, 0.19 in Germany, 0 outside the EU. The EU countries are in `EU_COUNTRIES`.

When you are done, show every file you changed, whole, in your reply.
