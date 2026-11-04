---
type: regex
target: { source: file, path: src/orders.js }
pattern: 'function refund[\s\S]*new OrderError\('
---
The refund rejects bad input with the codebase's own `OrderError`.
