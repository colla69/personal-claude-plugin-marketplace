---
name: doc-scope
description: A one-line fix in a document that has other visible problems.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Fix the misspelled heading in `docs/setup.md`.
