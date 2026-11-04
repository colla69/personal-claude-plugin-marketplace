---
type: regex
target: { source: file, path: src/orders.js }
pattern: '(?<![\s\S])(?![\s\S]*(\?\?|\?\.|\.at\(|structuredClone|replaceAll|\|\|=|&&=|\bexport\b|\bimport\b))'
---
No syntax or API newer than the pinned Node 12, and no switch away from CommonJS.
