---
type: regex
target: { source: file, path: Sources/Pad/main.swift }
pattern: 'canBecomeKey[\s\S]{0,80}true'
---
The borderless window overrides `canBecomeKey`, or it never gets key events.
