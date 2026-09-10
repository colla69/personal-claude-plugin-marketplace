# code-review

Structured review of a diff, branch, or PR: the things that will actually cause a
problem, said in a way that's easy to act on.

| Component | Name | Role |
|---|---|---|
| Skill | `review-changes` | Method and report format |
| Agent | `code-reviewer` | Runs the review. **Read-only** |

Part of the review trio with `developer` and `refactoring`. This one finds what is
wrong; `refactoring-specialist` says what shape fixes it; `developer` is the only one
that edits.

Priority order is fixed: correctness → security → test adequacy → API and contract
impact → everything else. Style is last because it's the easiest to spot and the
cheapest to be wrong about.

## Fires when

- "review this PR", "look at my changes", "check this branch before I push"
- Before committing something substantial
- You want a second opinion on work another agent just produced — which is exactly when
  a review is most valuable and most likely to be rubber-stamped

## Does not

- **Edit.** Findings only.
- Review the hunks alone. It reads the changed files, because a diff hides the context
  that decides whether a change is correct.
- Rubber-stamp. It traces at least one concrete input through the changed path before
  concluding anything is sound.
- Pad. Listing every stylistic preference buries the findings that matter. When a change
  is genuinely fine it says so, states what it checked, and stops.

Reports include a **Verified** section — what the review actually covered, so you know
what it didn't.

## Install

```bash
claude plugin install code-review@personal-claude-plugin-marketplace
```

Project scope suits repos with a PR-based workflow; user scope is fine if you review
everywhere.
