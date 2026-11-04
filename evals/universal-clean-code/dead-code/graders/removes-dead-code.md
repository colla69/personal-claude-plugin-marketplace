---
type: regex
target: { source: file, path: src/sync.js }
pattern: '(?<![\s\S])(?![\s\S]*(//\s*(await\s+)?legacyPush|//\s*const old\b))[\s\S]+'
---
The commented-out code is gone.
