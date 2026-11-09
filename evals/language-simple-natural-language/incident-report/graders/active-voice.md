---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b(was|were|is|are)\s+(rolled|deployed|released|restored|detected|reverted)\b))[\s\S]+'
---
Active voice: name who did it. A passive is for when nobody knows who acts.
