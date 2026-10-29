---
type: regex
target: { source: file, path: Sources/App/Counter.swift }
pattern: '(?<![\s\S])(?![\s\S]*(@unchecked|nonisolated\(unsafe\)))[\s\S]*Counter'
---
The data is owned by an `actor` or kept in a value, and the compiler is not told to stop checking.
