---
name: first-word
description: Indexing into a list under a strict config.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/words.ts` with `firstWord(text)`, which returns the first word of the text in upper case, and `lastWord(text)`, which returns the last. A word ends at a space.
