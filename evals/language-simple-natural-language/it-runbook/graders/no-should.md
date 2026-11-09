---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b[Dd]ovr(esti|ebbe|ebbero|este)\b))[\s\S]+'
---
A rule says "devi" or "deve", never "dovresti" or "dovrebbe".
