---
name: model-name
description: A fourth call to a model whose name is repeated in three files.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `src/summarize.js`, exporting `summarize(text)`, which asks the model for a three-sentence summary the same way `src/translate.js` asks for a translation.

When you are done, show every file you changed, whole, in your reply.
