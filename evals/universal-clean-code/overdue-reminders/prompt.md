---
name: overdue-reminders
description: Reminder emails for overdue invoices.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `sendOverdueReminders` in `src/reminders.js`. It emails every customer whose invoice is unpaid and more than 30 days past its due date.

When you are done, show every file you changed, whole, in your reply.
