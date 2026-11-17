---
name: slow-report
description: A report that became slow on big inputs.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

`buildReport` in `src/report.js` has become slow on big inputs since the last release. Make it faster. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
