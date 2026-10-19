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

Note anything that looks like a bug as you go, and leave it: it is out of scope, as
`work-discipline` says. Here the cost is sharper. A mixed diff can no longer answer "did
I break anything", which is the only reason the refactor was safe.

## Planning the steps

Each step of a refactoring plan carries four things, or it is not actionable:

1. **The seam** — exactly what moves, with file and line range
2. **The shape after** — the new name and signature, not a description of one
3. **The reason** — what the current structure costs whoever edits it next
4. **The order** — which step comes first, and what must be green before the next one

Write it for a human. "Extract lines 40–58 into `resolveTemplatePath(name)` because the
enclosing function currently mixes path resolution with file writing, so changing where
files are written means re-reading the resolution logic" is a prescription. "Reduce
complexity" is not. Every step names the change it makes cheaper.

```
## Refactor plan — <scope>

**Safety net:** <tests covering this / characterization tests needed first / none —
and what that means for the plan below>
**Makes cheaper:** <the change this is in service of>

### Steps
1. **<transformation>** — `<file:lines>`
   - Now: <what the code does today>
   - After: <the new shape, named concretely>
   - Why: <what the current structure costs>
   - Verify: <what must be green before step 2>

### Deliberately not recommended
<What you looked at and left, and why — stable code, too few occurrences,
out of scope.>

### Found, not fixed
<Bugs and smells noticed. Out of scope for a refactor; listed so they aren't lost.>
```

## Working in steps

Each step is: one transformation, run the tests, commit. Small enough that a failure tells
you exactly what caused it. Every step leaves working code, so the work can stop after
any one of them.

Common transformations, roughly in order of safety, which is also the order to do them
in:

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

The general limits hold here too: `clean-code` on waiting for the third occurrence and
leaving stable code alone, and `development-standards` on reformatting and public
interfaces.

## Report

State what you changed and what you deliberately left. Confirm the tests that were green
before are green after, and name any test you had to modify — a changed test during a
refactor is a claim that behavior changed, and it needs justification.

## Where this yields

- **To the project** for how steps are recorded and reviewed: its own commit and review
  conventions.
- **To the `clean-code` standard** for what "better" means. This skill says how to
  change structure safely; that one says which structure to aim for.
