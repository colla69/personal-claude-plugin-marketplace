---
name: host-setting
description: A value that the caller says is always there.
tags: [lift]
runs: 5
max_turns: 12
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Write `Sources/App/Host.swift` with `func host(from settings: [String: String]) -> String`, which returns the value of the key `"host"`. The loader of `settings` guarantees that the key is always there.
