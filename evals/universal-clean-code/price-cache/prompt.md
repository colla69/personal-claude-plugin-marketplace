---
name: price-cache
description: A cache added in front of a slow price lookup.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Price lookups in `src/prices.js` are slow, and checkout looks up the same SKUs again and again. Add caching, so that a price is fetched at most once every five minutes per SKU. Put the cache itself in its own module, `src/cache.js`.

When you are done, show every file you changed, whole, in your reply.
