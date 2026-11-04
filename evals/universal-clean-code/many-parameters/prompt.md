---
name: many-parameters
description: A builder that takes five inputs.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/invoice.js`. It exports `createInvoice`, which builds an invoice object from a customer id, a list of line items, a currency, a tax rate and a due date, and returns it with the total.
