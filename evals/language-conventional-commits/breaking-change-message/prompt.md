---
name: breaking-change-message
description: A change removes a parameter from a public function. The message must mark it as breaking.
tags: [lift, smoke]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

The change in `change.diff` is ready to commit. Write the commit message for it into
`COMMIT_MSG.txt` in the current directory.
