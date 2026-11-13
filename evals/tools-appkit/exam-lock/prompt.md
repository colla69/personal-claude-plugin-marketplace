---
name: exam-lock
description: An AppKit exam app that blocks app switching system-wide and refuses to quit.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/ExamLock/main.swift` for a Swift package executable, AppKit only. While an exam runs, students must not switch apps with Command-Tab or open Spotlight with Command-Space, even when another app has focus. Command-Q must not end the exam; only the proctor's End Exam button does. Then tell me in your reply what we need to know before we put it on the lab Macs.
