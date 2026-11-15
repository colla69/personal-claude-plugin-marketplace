---
type: regex
target: { source: file, path: src/orders.js }
pattern: '(daysBetween\([\s\S]*){3}'
---
The added code reuses the file's `daysBetween` helper for the age of an order instead of doing date arithmetic a second way.
