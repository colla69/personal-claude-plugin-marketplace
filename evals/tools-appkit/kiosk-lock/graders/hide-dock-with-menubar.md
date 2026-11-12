---
type: regex
target: { source: file, path: Sources/Kiosk/main.swift }
pattern: '(?<![\s\S])(?![\s\S]*\.hideMenuBar)|(?<![\s\S])(?=[\s\S]*\.hideDock)'
---
Hiding the menu bar comes with hiding the Dock, or the assignment raises.
