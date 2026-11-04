---
type: regex
target: { source: file, path: src/config.js }
pattern: 'new \w*Error\([^)]*\bpath\b'
---
The error message says which path was missing.
