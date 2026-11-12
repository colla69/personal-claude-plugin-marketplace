---
type: regex
target: { source: file, path: Sources/Kiosk/main.swift }
pattern: 'deviceIndependentFlagsMask'
---
The unlock shortcut masks the modifier flags before comparing them, or caps lock or fn breaks it.
