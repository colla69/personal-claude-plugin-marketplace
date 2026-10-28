---
type: regex
target: { source: file, path: src/retry.js }
pattern: '(?<![\s\S])(?![\s\S]*console\.)[\s\S]*retry'
---
The library code does not write with `console`.
