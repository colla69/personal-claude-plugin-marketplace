---
name: line-cancel
description: A request that uses a term the glossary defines otherwise.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add support for cancelling a single line of an order after it has been delivered.

When you are done, show every file you changed, whole, in your reply.
