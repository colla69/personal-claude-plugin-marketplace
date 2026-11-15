---
name: order-notifier
description: A confirmation email sent when an order is placed.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

When an order is placed, the customer should get a confirmation email listing the items and the total. Add this to the project. The SMTP client is in `src/smtp.js`, and `src/main.js` is where the app starts.

When you are done, show every file you changed, whole, in your reply.
