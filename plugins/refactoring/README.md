# refactoring

Behavior-preserving change, in small steps, each gated on a green test suite.

| Component | Name | Role |
|---|---|---|
| Skill | `refactor-safely` | Precondition, step size, transformations, when to stop |
| Agent | `refactoring-specialist` | Prescribes the refactor as an ordered plan. **Read-only** |

> A refactor without tests is a rewrite with extra confidence.

Establishing the safety net comes first — run the existing tests and confirm they cover
the code you're about to touch, or write characterization tests that assert current
behavior, whatever it is. If no safety net can be built, it stops and asks rather than
proceeding carefully; care is not a substitute for verification.

## Fires when

- "refactor", "clean up", "restructure", "extract", "split this file", "reduce
  duplication", "pay down tech debt"
- Before adding a feature to code that's hard to change

## Does not

- **Edit code.** It produces a plan; `developer` implements it. Two agents advise, one
  executes — a refactorer that can edit produces a diff nobody prescribed.
- **Change behavior.** The moment behavior changes it's a rewrite, and that's a
  different conversation.
- Fix bugs it finds. They get noted and left — a mixed diff can no longer answer "did I
  break anything", which is the only reason the refactor was safe.
- Batch transformations. One change, run the tests, commit. A red suite should point at
  a single step.
- Refactor past the goal. Stopping point is "good enough for the change you're about to
  make"; anything beyond that is unpaid risk.
- Modify a test quietly. A changed test during a refactor is a claim that behavior
  changed, and the report has to justify it.

## Install

```bash
claude plugin install refactoring@personal-claude-plugin-marketplace
```

Needs a working test suite to be useful. Without one it will tell you so.
