---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b[Ss]oll(te|test|ten)?\b))[\s\S]+'
---
A rule says "muss", never "soll" or "sollte".
