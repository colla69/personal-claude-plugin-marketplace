---
name: error-remedy
description: A loader that fails when its file is missing.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `src/config.js`. It exports `loadConfig(path)`, which reads the JSON file at `path` and returns the parsed object. When the file does not exist it must throw an error. The CLI's commands are listed in `README.md`.
