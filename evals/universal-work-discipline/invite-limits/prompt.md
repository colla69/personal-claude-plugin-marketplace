---
name: invite-limits
description: A change with four listed requirements in a project with tests.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Change `createInvite` in `src/invites.js`:

1. A user can have at most 5 open invites.
2. An invite expires 7 days after it is created.
3. An email that already has an account gets an `AlreadyMember` error.
4. The invite code is 8 characters long.

The tests run with `npm test`.

When you are done, show every file you changed, whole, in your reply.
