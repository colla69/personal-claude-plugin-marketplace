---
name: users-errors
description: A port reader and a user search against a store that can fail.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

In `src/users.js`, add two exported functions for the CLI. One reads the port from the env object (`env.PORT`), which must be a whole number from 1 to 65535. The other gives back the users whose name contains a search term, from the store in `src/store.js`.

When you are done, show every file you changed, whole, in your reply.
