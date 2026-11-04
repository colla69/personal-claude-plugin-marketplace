---
name: user-list
description: A Vue component that fetches, filters and selects.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Write `src/components/UserList.vue`. It loads users from `/api/users`, shows only the active ones, filters them by a name typed in a text box, and lets the parent read and set which user is selected.
