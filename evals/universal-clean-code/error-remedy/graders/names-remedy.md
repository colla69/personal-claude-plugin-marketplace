---
type: regex
target: { source: file, path: src/config.js }
pattern: 'new \w*Error\([^)]*\binit\b'
---
The error message names the command that creates the file.
