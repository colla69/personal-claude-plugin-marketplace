---
type: regex
target: { source: file, path: src/invoice.js }
pattern: '(function\s+createInvoice|createInvoice\s*=\s*(async\s*)?)\(\s*(\{[^}]*\}|\w+(\s*=\s*[^,)]+)?)\s*(,\s*(\{[^}]*\}|\w+(\s*=\s*[^,)]+)?)\s*){0,2}\)'
---
`createInvoice` takes three parameters at most, an object counting as one.
