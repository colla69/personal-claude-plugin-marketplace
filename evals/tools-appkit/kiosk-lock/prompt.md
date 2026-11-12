---
name: kiosk-lock
description: An AppKit kiosk that visitors must not leave.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/Kiosk/main.swift` for a Swift package executable that runs a museum kiosk on a Mac: one fullscreen window showing a web page. Visitors must not be able to quit it, switch apps, or reach the Dock or the menu bar. Staff unlock it with Control-Option-Command-U. Also write `KIOSK.md` for the staff who set the Mac up.
