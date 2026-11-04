---
type: regex
target: { source: file, path: src/orders.js }
pattern: 'function refund[\s\S]*audit\('
---
The refund logs through the codebase's `audit`, not `console`.
