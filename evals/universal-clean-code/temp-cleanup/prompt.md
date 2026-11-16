---
name: temp-cleanup
description: A cleanup command that removes temporary files, some already gone.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add a `cleanup` command to `src/cli.js`. It reads the list of temporary files from `.tmpfiles.json`, an array of paths, removes each of them, and then empties the list. Add the removal of one file to `src/storage.js` as `removeFile(file)`. Some of the files may already be gone.

When you are done, show every file you changed, whole, in your reply.
