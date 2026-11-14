---
name: generated-css-source
description: A style fix asked for in a CSS file that a build script writes from sources.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

The Buy button is too small. In `public/app.css`, make the `.btn` padding `12px 20px`.
