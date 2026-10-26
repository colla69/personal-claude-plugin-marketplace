# tools-appkit

AppKit decides who gets an event by a fixed order of monitors, window, responder and
chain. A key press that does nothing, or that beeps, stopped somewhere in that order,
and the fix starts with finding where.

| | |
|---|---|
| Skill | `appkit-conventions` |
| Layer | Framework & Tools |
| Builds on | nothing |

It is written for macOS apps built in code, with Swift spellings. A project that
keeps nibs or storyboards gets the event routing and the kiosk rules, and skips the
start-up section.

## Fires when

- Writing or reviewing AppKit code, or working with `NSApplication`, `NSWindow`,
  `NSView`, `NSEvent` or `presentationOptions`
- An AppKit window, keyboard handling, a fullscreen or kiosk mode, or an app that must
  not quit is wanted
- A window shows but gets no key events, or a key press beeps

## Leaves to others

- **Swift itself.** `@MainActor`, `Sendable` and optionals belong to the Language layer.
- **SwiftUI.** An app that hosts or uses SwiftUI views follows SwiftUI's own conventions
  for what they cover.
- Drawing, audio and the other frameworks an app links. No skill covers them yet.
- Objective-C. The examples are Swift.

## Install

Docking installs it at project scope when the project's `.swift` sources import
`AppKit` or `Cocoa`. By hand:

```bash
claude plugin install tools-appkit@personal-claude-plugin-marketplace --scope project
```

Project scope only: it is noise in a project with no macOS app.

## More

- The standard itself:
  [`skills/appkit-conventions/SKILL.md`](skills/appkit-conventions/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
