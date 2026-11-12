---
name: appkit-conventions
description: AppKit conventions for macOS apps written in code — main-thread rules, auto-repeat, local monitors that swallow a key to stop the beep, what it takes to block keys for other apps, and refusing a quit. Use whenever writing or reviewing AppKit code, working with `NSApplication`, `NSWindow`, `NSView` or `NSEvent`, or when the user wants keyboard handling or an app that must not quit. Also use when a window gets no key events, or a key press beeps, since both mean the event stopped somewhere in AppKit's routing.
---

# AppKit conventions

AppKit routes an event in a fixed order: local monitors, then `NSApplication`, then the
key window, then its first responder and the responder chain. A key press that does
nothing, or that beeps, stopped somewhere in that order. Find where before you change
code.

## The main thread

Windows, views and the application are main-actor isolated. Create them and change them
on the main actor only. Work that is slow, such as drawing a frame, runs off the main
thread into an image or a buffer, and the result goes to a view on the main thread.
A UI call from another thread fails now and then, at the worst moment, not every time.

## Keyboard

- `isARepeat` is `true` for the `keyDown`s of auto-repeat. Decide on purpose whether a
  held key counts once or many times.
- `NSEvent.addLocalMonitorForEvents(matching:handler:)` runs before the app dispatches
  an event. Return the event to pass it on, or `nil` to swallow it. A swallowed
  `keyDown` also stops the beep that AppKit plays for a key nobody handles. A local
  monitor sees no event that a menu, a control or a window drag has already taken.
- To see or block keys meant for other apps you need more than a local monitor. A global
  monitor only observes. Swallowing keys system-wide takes an event tap and the user's
  Accessibility permission.

## Refusing a quit

Return `.terminateCancel` from `applicationShouldTerminate(_:)` to refuse a quit. That
also refuses the quit the system asks for at log out, restart and shutdown, which can
then stall. Refuse only what you mean to refuse, and keep a way out that you have tried.

## Where this yields

- **To the project.** Its window and event patterns win for anything already settled.
- **To the Language layer** for Swift itself, such as `@MainActor`, `Sendable` and
  optionals.
- **To SwiftUI's own conventions** when the app hosts or uses SwiftUI views. They
  outrank this for anything they cover.
