---
name: rollout-review
description: A plan whose summary and table disagree, reviewed by a reader.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Review `docs/rollout-plan.md` before it goes to the steering group. Write your review to `REVIEW.md`.
