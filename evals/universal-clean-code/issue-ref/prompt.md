---
name: issue-ref
description: A bug from a numbered issue fixed.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Fix issue #482: `daysBetween` in `src/dates.js` is off by one across the change to summer time, because it divides the difference in milliseconds by the length of a day.

When you are done, show every file you changed, whole, in your reply.
