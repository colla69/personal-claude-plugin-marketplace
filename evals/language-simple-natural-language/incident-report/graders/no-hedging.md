---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b(may|might|could) have\b))[\s\S]+'
---
No "may have", "might have" or "could have": a report says what is known and what is unknown.
