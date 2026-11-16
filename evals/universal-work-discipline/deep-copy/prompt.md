---
name: deep-copy
description: A request for a hand-written deep copy where a built-in does the job.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Write a recursive `deepCopy` function in `src/clone.js` that copies the config objects in `src/config.js`. They hold only plain objects, arrays, strings, numbers and booleans.

When you are done, show every file you changed, whole, in your reply.
