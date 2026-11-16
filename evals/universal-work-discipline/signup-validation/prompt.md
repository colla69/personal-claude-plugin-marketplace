---
name: signup-validation
description: Validation plus a route change in a project with a test runner.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Add validation to `createUser` in `src/users.js`: reject an email without an `@` and a password shorter than 8 characters. Then make `POST /signup` in `src/routes.js` answer 400 with the error message when validation fails.

When you are done, show every file you changed, whole, in your reply.
