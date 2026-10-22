---
name: appkit-conventions
description: AppKit conventions for macOS apps written in code — a bare executable that must make itself a foreground app, main-thread rules, key events read by `keyCode` through a local monitor, borderless windows that need `canBecomeKey`, and presentation options and quit guards for fullscreen and kiosk apps. Use whenever writing or reviewing AppKit code, working with `NSApplication`, `NSWindow`, `NSView`, `NSEvent` or `presentationOptions`, or when the user wants an AppKit window, keyboard handling, a fullscreen or kiosk mode, or an app that must not quit. Also use when a window shows but gets no key events, or a key press beeps, since both mean the event stopped somewhere in AppKit's routing.
---

# AppKit conventions

AppKit routes an event in a fixed order: local monitors, then `NSApplication`, then the
key window, then its first responder and the responder chain. A key press that does
nothing, or that beeps, stopped somewhere in that order. Find where before you change
code.

## Starting without a bundle

- A bare executable starts with the `.prohibited` activation policy. It cannot be
  activated, so it gets no foreground and no keyboard. Call
  `NSApplication.shared.setActivationPolicy(.regular)` first, then activate the app.
- `NSApplication.delegate` is a weak reference. Keep your own strong reference to the
  delegate, or it is released and its callbacks never run.

## The main thread

Windows, views and the application are main-actor isolated. Create them and change them
on the main actor only. Work that is slow, such as drawing a frame, runs off the main
thread into an image or a buffer, and the result goes to a view on the main thread.
A UI call from another thread fails now and then, at the worst moment, not every time.

## Windows

A borderless window answers `false` to `canBecomeKey`, so it never receives key events.
Subclass `NSWindow` and override `canBecomeKey` to return `true`. A titled window needs
no override.

## Keyboard

- `NSEvent.keyCode` is the hardware key and does not change with the keyboard layout.
  Use it for where a key sits. Use `charactersIgnoringModifiers` for what it types. A
  table keyed on characters breaks on the next layout.
- A modifier key sends `flagsChanged`, not `keyDown`. Read `modifierFlags` from that
  event. Mask it with `.deviceIndependentFlagsMask` before you compare it. The mask
  still holds caps lock, `fn` and the numeric-pad flag, so an exact comparison has to
  name them or remove them.
- `isARepeat` is `true` for the `keyDown`s of auto-repeat. Decide on purpose whether a
  held key counts once or many times.
- `NSEvent.addLocalMonitorForEvents(matching:handler:)` runs before the app dispatches
  an event. Return the event to pass it on, or `nil` to swallow it. A swallowed
  `keyDown` also stops the beep that AppKit plays for a key nobody handles. A local
  monitor sees no event that a menu, a control or a window drag has already taken.
- To see or block keys meant for other apps you need more than a local monitor. A global
  monitor only observes. Swallowing keys system-wide takes an event tap and the user's
  Accessibility permission.

## Fullscreen and kiosk

- `NSApp.presentationOptions` sets what the system hides or disables while this app is
  the active app: the Dock, the menu bar, app switching, Force Quit, and, with
  `.disableSessionTermination`, the power-key panel and the log out, restart and shut
  down commands. Only some combinations are valid. An invalid one raises an exception at
  the assignment, for example `.hideMenuBar` without `.hideDock`. Run the app with the
  options before you trust them.
- Return `.terminateCancel` from `applicationShouldTerminate(_:)` to refuse a quit. That
  also refuses the quit the system asks for at log out, restart and shutdown, which can
  then stall. To keep those commands away from the app, prefer
  `.disableSessionTermination` to refusing every quit. Refuse only what you mean to
  refuse, and keep a way out that you have tried.
- A kiosk cannot block everything. Idle sleep, closing the lid and a hard power-off act
  below any presentation option, and shortcuts that the options do not cover stay live.
  Write down what the app does not block, where its owner will read it.

## Where this yields

- **To the project.** Its window and event patterns win for anything already settled.
- **To the Language layer** for Swift itself, such as `@MainActor`, `Sendable` and
  optionals.
- **To SwiftUI's own conventions** when the app hosts or uses SwiftUI views. They
  outrank this for anything they cover.
