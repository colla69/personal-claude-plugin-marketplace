---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b[Ee]\.[Gg]\.|\b[Ii]\.[Ee]\.|\betc\.))[\s\S]+'
---
No "e.g.", "i.e." or "etc.".
