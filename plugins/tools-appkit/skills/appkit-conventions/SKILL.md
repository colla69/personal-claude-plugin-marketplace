---
name: appkit-conventions
description: AppKit conventions for macOS apps written in code — a local monitor that swallows a key to stop the beep, and what refusing a quit does to log out, restart and shutdown. Use whenever writing or reviewing AppKit code, working with `NSApplication`, `NSWindow`, `NSView` or `NSEvent`, or when the user wants keyboard handling or an app that must not quit. Also use when a window gets no key events, or a key press beeps, since both mean the event stopped somewhere in AppKit's routing.
---

# AppKit conventions

AppKit routes an event in a fixed order: local monitors, then `NSApplication`, then the
key window, then its first responder and the responder chain. A key press that does
nothing, or that beeps, stopped somewhere in that order. Find where before you change
code.

## Keys that beep

AppKit plays the alert sound for a `keyDown` nobody handles. To keep a window quiet,
add `NSEvent.addLocalMonitorForEvents(matching:handler:)`: it runs before the app
dispatches the event. Return `nil` for every key the window takes, the ones it ignores
too: a key you pass on still beeps unless something down the chain handles it. Pass on
only a key with Command held, so the menus still get their shortcuts. A local monitor
sees no event that a menu, a control or a window drag has already taken.

## Refusing a quit

Returning `.terminateCancel` from `applicationShouldTerminate(_:)` also refuses the
quit the system asks for at log out, restart and shutdown, which can then stall. Refuse
only what you mean to refuse, tell the user what it blocks, and keep a way out that you
have tried.

## Where this yields

- **To the project.** Its window and event patterns win for anything already settled.
- **To the Language layer** for Swift itself, such as `@MainActor`, `Sendable` and
  optionals.
- **To SwiftUI's own conventions** when the app hosts or uses SwiftUI views. They
  outrank this for anything they cover.
