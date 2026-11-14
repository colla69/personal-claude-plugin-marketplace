---
name: space-counter
description: An AppKit window that counts space presses and renders a slow image.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/Counter/main.swift` for a Swift package executable, AppKit only, no SwiftUI. It opens one window with a big number in it. Each press of the space bar adds one, and a player who holds the space bar down must not rack up points. Our last draft made the system alert sound on every other key, which drove testers mad, so the window must stay quiet. There is also a Render button that draws a 4000 by 4000 Mandelbrot image into an image view; that takes a few seconds and the window must keep counting while it runs.
