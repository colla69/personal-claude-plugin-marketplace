---
name: incident-report
description: An incident report written from a log and notes.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write the incident report for yesterday's checkout outage to `INCIDENT.md`. The log excerpt and the on-call notes are in `logs/`.
