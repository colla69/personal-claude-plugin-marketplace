---
name: defensive-copy
description: A class that takes a list from its caller. It must not keep the caller's list as its own state.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Skill]
---

Add a `Customer` class to this project, in `src/main/java/com/example/Customer.java`. A
customer has a name and a list of tags, and the caller passes the list in.
