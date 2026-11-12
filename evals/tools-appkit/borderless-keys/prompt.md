---
name: borderless-keys
description: A bare AppKit executable with a borderless window and keyboard input.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/Pad/main.swift` for a Swift package executable, no app bundle and no storyboard. It opens a borderless window that fills the main screen. The arrow keys move a square drawn in the window, holding Shift makes it move faster, and the window must not beep on any key. Escape quits.
