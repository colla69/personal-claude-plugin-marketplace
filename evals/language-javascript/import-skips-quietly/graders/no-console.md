---
type: regex
target: { source: file, path: src/importer.js }
pattern: '(?<![\s\S])(?![\s\S]*console\.)[\s\S]*parseRows'
---
The library code does not write with `console`.
