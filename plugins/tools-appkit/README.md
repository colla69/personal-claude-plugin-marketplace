# tools-appkit

AppKit decides who gets an event by a fixed order of monitors, window, responder and
chain. A key press that does nothing, or beeps, stopped somewhere in that order, and the
fix starts with finding where.

| | |
|---|---|
| Skill | `appkit-conventions` |
| Layer | Framework & Tools |
| Builds on | nothing |

## Fires when

- Writing or reviewing AppKit code: `NSApplication`, `NSWindow`, `NSView`, `NSEvent`
- Keyboard handling, or an app that must not quit
- A window gets no key events, or a key press beeps

## Leaves to others

- **Swift itself**, to the Language layer.
- **SwiftUI**, which follows its own conventions.

## Install

Docking installs it at project scope when the project's `.swift` sources import
`AppKit` or `Cocoa`. By hand:

```bash
claude plugin install tools-appkit@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/appkit-conventions/SKILL.md`](skills/appkit-conventions/SKILL.md)
