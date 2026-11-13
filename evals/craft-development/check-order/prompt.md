---
name: check-order
description: A small change in a project with a typecheck, tests and a linter.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Add `discount(cents, percent)` to `src/price.js`: it returns the price in cents after the discount, rounded to whole cents. Check your work with the project's checks, and tell me which ones you ran.
