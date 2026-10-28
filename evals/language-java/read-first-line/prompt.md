---
name: read-first-line
description: A small file-reading helper. A person would expect the stream to be closed and no null returned.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Skill]
---

Write `src/main/java/com/example/FirstLine.java` with a static method that returns the
first line of a text file, given its path. If the file is empty, the caller gets no line.
