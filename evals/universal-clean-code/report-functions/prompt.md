---
name: report-functions
description: A monthly text report with a plain and a marked variant.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `src/report.js`. It exports a function that builds the monthly report from the orders and a month (`"2026-10"`): a header line with the month; one line per customer with their total and number of orders, highest total first; a last line with the grand total and the average order value. Customers with any refunded order get a `!` at the start of their line. The email version of the report is the same but without the `!` marks, so export that too. An order has `customerId`, `customerName`, `month`, `amount` and `refunded` (a boolean).

When you are done, show every file you changed, whole, in your reply.
