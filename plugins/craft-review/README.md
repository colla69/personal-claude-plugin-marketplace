# craft-review

A review is worth what its findings cost to ignore. Every finding names what it costs,
and the report says what was checked, so the author knows what wasn't.

| | |
|---|---|
| Skill | `review-work` |
| Layer | Craft |
| Builds on | nothing |

The report shape, Blocking, Should fix, Consider and Verified, lives here. Reviews of
one kind of work use it.

## Fires when

- "is this any good", "can you check this", a second opinion on a document, a plan, a
  report or a design
- Feedback on work that is not a code diff
- Checking work against the plan or the request it was meant to carry out

## Leaves to others

- **What to look for in a code change.** `review-changes` in `craft-code-review` holds
  the priority order for a diff and builds on this.
- What a good result looks like, which the standard for that kind of work holds, such as
  `clean-code`.
- A project's own review checklist, which replaces the ranking but not the need for a
  cost and a Verified section.

## Install

```bash
claude plugin install craft-review@personal-claude-plugin-marketplace --scope project
```

`craft-code-review` pulls it in. Install it on its own where work other than code gets
reviewed.
