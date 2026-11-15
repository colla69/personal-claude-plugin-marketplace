---
name: session-store
description: A session store designed from scratch.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

The web app needs a session store. A session is created at login, read on every request, and expires after 30 minutes without use. Design its interface and write it in `src/sessions.js`.

When you are done, show every file you changed, whole, in your reply.
