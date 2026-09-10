---
name: refactor-safely
description: Restructure code without changing its behavior, in small verifiable steps gated on a green test suite. Use whenever the user asks to refactor, clean up, restructure, extract, simplify, split a large file, reduce duplication, or pay down technical debt. Also use before adding a feature to code that's hard to change.
---

# Refactor safely

A refactor changes structure and preserves behavior. The moment behavior changes, it's a
rewrite, and it needs different care and a different conversation with the user.

## The precondition

**A refactor without tests is a rewrite with extra confidence.** Before restructuring
anything, establish how you will know behavior was preserved:

1. Run the existing tests. Confirm they pass *and* that they cover the code you're about
   to touch. Coverage of neighbouring files is not coverage of this one.
2. If coverage is thin, write characterization tests first — tests that assert current
   behavior, whatever it is, including the parts that look wrong. Their job is to detect
   change, not to judge correctness.
3. If you cannot establish a safety net, say so and ask before proceeding. Proceeding
   anyway is a decision the user should get to make.

Note anything that looks like a bug as you go, but do not fix it during the refactor. A
mixed diff makes it impossible to tell which change broke things.

## Working in steps

Each step is: one transformation, run the tests, commit. Small enough that a failure tells
you exactly what caused it.

Common transformations, roughly in order of safety:

- **Rename** — safest, and often the whole fix on its own
- **Extract function / variable** — pull a named concept out of a body
- **Inline** — remove an indirection that isn't earning its cost
- **Move** — relocate to the module it belongs to
- **Introduce parameter object** — bundle arguments that always travel together
- **Replace conditional with polymorphism** — highest value, highest risk, do it last

Never batch transformations "because they're related". Six small green steps take slightly
longer than one big one and cost nothing when something goes wrong.

## Knowing when to stop

Stop when the code is good enough for the change you're about to make. Refactoring is in
service of a goal, and refactoring past that goal is unpaid risk.

Specifically, don't:

- Extract an abstraction from two occurrences — wait for the third
- Restructure stable code nobody is about to touch
- Change public interfaces as part of a refactor without flagging it as a breaking change
- Reformat unrelated lines, which buries the real change in diff noise

## Report

State what you changed and what you deliberately left. Confirm the tests that were green
before are green after, and name any test you had to modify — a changed test during a
refactor is a claim that behavior changed, and it needs justification.
