---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b(has|have|had) been\b|\b(is|are|was|were) being\b))[\s\S]+'
---
Simple tenses: no "has been", "have been", "had been" or "is being".
