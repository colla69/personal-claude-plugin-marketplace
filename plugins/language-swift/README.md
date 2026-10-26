# language-swift

The compiler checks what the types say. Every `!`, `try!` and `@unchecked` is a place
where it was told to stop, and each one needs a reason a reader can see.

| | |
|---|---|
| Skill | `swift-conventions` |
| Layer | Language |
| Builds on | `universal-clean-code` |

The language mode is read first: in Swift 6 mode a data race is a compile error, and in
Swift 5 mode the same code compiles.

## Fires when

- Writing or reviewing Swift, or working in a `.swift` file or a `Package.swift`
- Optionals, `guard`, `struct` or `class`, `throws`, `Sendable`, actors or `@MainActor`
  come up
- A Swift 6 build fails with an isolation or `Sendable` error, where the fix is a
  decision about who owns the data

## Leaves to others

- **UI frameworks.** A framework's skill, such as one for AppKit or SwiftUI, outranks
  this where both apply: required superclasses and delegate patterns are theirs.
- Naming by intent, function shape, error handling and comments, to `clean-code`.
- How tests are written, to `write-unit-tests`.
- Formatting, to the project's formatter.
- The language mode, which is named, never raised as a side effect.

## Install

Docking installs it at project scope when the project has a `Package.swift`, an
`.xcodeproj` or `.swift` sources. By hand:

```bash
claude plugin install language-swift@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/swift-conventions/SKILL.md`](skills/swift-conventions/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
