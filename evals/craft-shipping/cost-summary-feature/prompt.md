---
name: cost-summary-feature
description: A support app with a ticket model; the task adds an AI summary per ticket, called from the Claude API.
tags: [lift]
runs: 5
max_turns: 20
allowed_tools: [Read, Glob, Grep, Write, Edit, Bash, Skill]
---

Add a feature that shows a short AI summary at the top of each support ticket, using the Anthropic API. Tickets are often long threads. Show the code in your reply.
