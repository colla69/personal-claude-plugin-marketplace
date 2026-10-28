---
name: wrap-with-context
description: A checked SQL failure crosses into the service layer. The cause must be kept and the message must say what was being done.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Edit, Skill]
---

In `UserStore.save`, deal with the TODO. The service layer above it should not have to
know about SQL.
