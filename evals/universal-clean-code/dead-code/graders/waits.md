---
type: regex
target: { source: file, path: src/sync.js }
pattern: '(?<![\s\S])(?=[\s\S]*\bpushChanges\b)[\s\S]*(setTimeout|\bsleep\(|\bdelay\()'
---
The retry waits, and the function is still there.
