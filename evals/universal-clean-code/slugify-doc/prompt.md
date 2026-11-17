---
name: slugify-doc
description: A public function added to a small library.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `slugify(title)` to the library in `src/index.js`. It turns a title into a URL slug: lower case, accents removed, anything other than letters and digits turned into single hyphens, no hyphen at either end.

When you are done, show every file you changed, whole, in your reply.
