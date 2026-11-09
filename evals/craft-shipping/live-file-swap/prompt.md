---
name: live-file-swap
description: A request for a script that puts new files on a live site reached only over SFTP, with no shell and no deploy tool.
tags: [lift]
runs: 5
max_turns: 25
allowed_tools: [Read, Glob, Grep, Write, Bash, Skill]
---

Our site is live on shared hosting. We only have SFTP to it: no shell and no deploy tool. dist/ holds the new version. Write scripts/publish.sh, which puts the new files on the server. The login is in .env as SFTP_HOST, SFTP_USER and SFTP_ROOT, with a key already set up. You can't reach the server from here, so just write it, and show the script in your reply.
