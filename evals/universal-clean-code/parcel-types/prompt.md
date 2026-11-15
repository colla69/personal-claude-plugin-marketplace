---
name: parcel-types
description: Price and delivery days for three parcel types.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add `src/parcels.js`. A parcel has a `type`: `letter`, `small` or `large`. Export one function that gives its price (1.20, 4.90, 12.50) and one that gives its delivery days (1, 2, 4).

When you are done, show every file you changed, whole, in your reply.
