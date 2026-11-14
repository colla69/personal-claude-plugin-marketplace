---
name: dock-with-cursor-rules
description: Dock a small Node project that already has Cursor rules and Claude settings, with the steward's questions answered up front.
tags: [lift]
runs: 5
max_turns: 40
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Dock this project onto our skills marketplace. The answers to your questions: take standards only from our own marketplace, and yes, we write Conventional Commits. Don't ask me anything else; go ahead and report what you did.
