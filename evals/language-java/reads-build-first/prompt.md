---
name: reads-build-first
description: A new class in a project whose language level is set in pom.xml. The build file is read before the class is written.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Skill]
---

Add a `Money` class to this project, in `src/main/java/com/example/Money.java`. It holds
an amount in cents and a currency code.
