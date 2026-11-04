---
type: regex
target: { source: file, path: src/orders.js }
pattern: '(?<![\s\S])(?![\s\S]*console\.)'
---
Nothing logs with `console`.
