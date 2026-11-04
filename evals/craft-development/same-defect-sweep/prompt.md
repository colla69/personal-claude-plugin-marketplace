---
name: same-defect-sweep
description: A paging bug that drops the last item, copied into three lists.
tags: [lift]
runs: 5
max_turns: 25
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

The orders list drops the last order on every page. Fix it, and tell me what you changed.
