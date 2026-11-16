---
name: review-reply
description: Review comments to address, one wrong, one unclear, one asking for unused work.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

A reviewer left comments on my change in `review.md`. Address them.

When you are done, show every file you changed, whole, in your reply.
