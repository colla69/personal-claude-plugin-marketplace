---
type: regex
target: { source: file, path: src/order.ts }
pattern: '(?<![\s\S])(?![\s\S]*\binterface\s)[\s\S]*total'
---
The shapes are `type` aliases: `interface` is for declaration merging.
