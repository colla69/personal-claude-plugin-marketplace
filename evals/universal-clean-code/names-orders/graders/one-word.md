---
type: regex
target: { source: file, path: src/orders.js }
pattern: '(?<![\s\S])(?![\s\S]*function\s+(get|fetch|load|retrieve|calc|compute)[A-Z])[\s\S]+'
---
The new function keeps the file's verb for a query, `find`, and adds no `get`, `fetch`, `load`, `retrieve` or `calc` beside it.
