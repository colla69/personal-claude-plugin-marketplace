---
type: llm
---
Judge the final `src/inventory.js` shown in the reply.
Two reservations running at the same time cannot both read the same stock level and both succeed. It fails on a plain `await get(...)`, check, `await set(...)` with nothing serialising the calls per product. A lock, a queue per product or an atomic store operation passes.
