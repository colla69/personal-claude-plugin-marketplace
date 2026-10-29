---
type: regex
target: { source: file, path: src/order.ts }
pattern: 'readonly\s+\w+\s*:[\s\S]*readonly\s+\w+\s*:'
---
The fields are `readonly`, since `total` only reads them.
