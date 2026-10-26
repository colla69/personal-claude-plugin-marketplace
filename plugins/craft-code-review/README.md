# craft-code-review

A code change is reviewed in a fixed order: correctness, security, test adequacy, API
and contract impact, then everything else. Style comes last because it is the easiest
thing to spot.

| | |
|---|---|
| Skill | `review-changes` |
| Layer | Craft |
| Builds on | `universal-clean-code`, `craft-review`, `craft-unit-testing` |

It reads the changed files, not just the hunks, because a diff hides the context that
decides whether a change is correct.

## Fires when

- "review this PR", "look at my changes", "check this branch before I push"
- Feedback on code in progress
- Before committing a substantial change

## Leaves to others

- **How any review is done, and its report.** Tracing one case, a cost per finding, and
  the Blocking, Should fix, Consider and Verified shape are `review-work`, in
  `craft-review`.
- Whether the tests would fail if the change were wrong, judged by `write-unit-tests`,
  in `craft-unit-testing`.
- Naming, structure and style, judged by `clean-code`.
- What is idiomatic in the code under review, to the Language and Framework & Tools
  layers.
- The project's own review checklist and definition of a breaking change, which win.

## Install

Docking installs it at project scope in any project with code, whether or not anyone
opens pull requests. By hand:

```bash
claude plugin install craft-code-review@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/review-changes/SKILL.md`](skills/review-changes/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
