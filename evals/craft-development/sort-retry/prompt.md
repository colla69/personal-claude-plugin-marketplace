---
name: sort-retry
description: A bug after a failed fix the user already tried.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

`sortByName` in `src/users.js` sorts wrongly: names in lower case or with accents, such as "émile", end up after "Zoe". I added `.trim()` to the comparison, but that didn't help. Fix it. The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
