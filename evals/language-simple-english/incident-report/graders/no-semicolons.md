---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*(;))[\s\S]+'
---
No semicolons: two facts are two sentences.
