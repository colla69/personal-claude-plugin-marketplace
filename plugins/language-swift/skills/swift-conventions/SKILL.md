---
name: swift-conventions
description: Swift language conventions — reading the language mode before judging concurrency code, optionals handled rather than forced, value types by default, errors thrown rather than swallowed, access control that starts narrow, and thread-safety stated in types. Use whenever writing or reviewing Swift, working in a `.swift` file or a `Package.swift`, or when the user mentions optionals, `guard`, `struct` or `class`, `throws`, `Sendable`, actors, `@MainActor`, or data-race errors. Also use when a Swift 6 build fails with an isolation or `Sendable` error, since the fix there is a decision about who owns the data, not a keyword.
---

# Swift conventions

The compiler checks what the types say. Every `!`, `try!`, `@unchecked` and
`nonisolated(unsafe)` is a place where you told it to stop checking, so each one needs
a reason a reader can see.

## Read the language mode first

The language mode decides what the compiler enforces. A package sets it in
`Package.swift`: `swift-tools-version` gives the default, and a target can override it.
An Xcode project sets it with the Swift Language Version build setting. In Swift 6 mode
a data race is a compile error. In Swift 5 mode the
same code compiles, with at most a warning. Code written for one mode breaks, or hides
its bugs, in the other.

Write within the project's mode. Say so when the mode is 5 and the code you write would
fail in 6. Do not raise the mode as a side effect of an unrelated change.

## Optionals

- Unwrap with `guard let` at the top of the function and return early. The rest of the
  function then reads without nesting.
- Do not use `!` or `try!` in code that ships. A wrong assumption becomes a crash that
  names no cause. Where a value cannot be `nil`, unwrap it with `guard let` and call
  `fatalError` with the reason. `fatalError` prints its message in every build mode, so
  the crash says why. `preconditionFailure` prints nothing in an optimised build.
- Return `nil` or throw. Do not return a sentinel such as `-1` or `""` for "not found".
  A sentinel passes the type checker and fails later, far from the cause.

## Types

- Use `struct` and `enum` by default. Use `class` when identity matters or a framework
  requires one. Two references to one object see each other's changes, and every call
  site pays for that.
- Model states as an `enum` with associated values, not as several optional properties.
  Two fields that are only ever filled together belong in one case.
- Switch over your own enums without `default`. Then a new case is a compile error at
  every switch, not a case that `default` handles by accident.
- Name by the Swift API Design Guidelines. A call reads as a phrase, and argument labels
  explain it. The method that returns a changed copy takes the `-ed` or `-ing` form
  (`sorted()`), and the in-place one is the bare verb (`sort()`). Types are
  `UpperCamelCase` and everything else `lowerCamelCase`.

## Errors

- A function that can fail throws. Declare the failures as an `enum` that conforms to
  `Error`, one case per way it can fail, so a caller can switch over them.
- `try?` turns a reason into `nil`. Use it only where the caller does not care why.
  Otherwise never swallow an error, as `clean-code` says.
- Use `fatalError` for a state that means the program itself is wrong, not for a
  failure a caller could handle.

## Access control

Start narrow, because a narrower surface means fewer callers to break when you change
it. Mark a member `private` unless something else needs it. Leave `internal` for what
the module's own files share. Mark a declaration `public` only when another
module uses it. A library target that an executable target imports needs `public` on
everything the executable touches, initialisers included: the memberwise initialiser of
a `public struct` is `internal`, so write it out.

## Concurrency

- Mark UI types, and the code that touches them, `@MainActor`. Do not hop by hand with
  `DispatchQueue.main.async`. The compiler then checks every caller.
- A value that crosses threads is `Sendable`. A `struct` that is not `public`, and whose
  members are `Sendable`, gets it for free, which is one more reason to prefer `struct`.
  A `public` type declares `: Sendable` itself.
- Fix an isolation or `Sendable` error by changing who owns the data: move it into an
  actor, make it a value type, or pass a copy. `@unchecked Sendable` and
  `nonisolated(unsafe)` silence the compiler and fix nothing. Each one needs a comment
  that names the lock, or the reason, that makes it safe.
- Prefer `async`/`await` and structured concurrency (`async let`, task groups) to a
  loose `Task`. A `Task` that nobody awaits drops its error.
- A closure that a type stores, and that can outlive the call, captures `self` with
  `[weak self]`. A strong capture in a stored closure is a retain cycle.

## Where this yields

- **To the project.** Its formatter's output, its patterns and its language mode win for
  anything already settled there.
- **To `clean-code`** for naming by intent, function shape, error handling and comments.
- **To the Framework & Tools layer** when a framework's skill is enabled. A UI
  framework has idioms that outrank these for what it covers, such as required
  superclasses and delegate patterns.
