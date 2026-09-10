# clean-code

The house standard for readable, maintainable code — and the reference the rest of the
toolkit judges against.

| Component | Name | Role |
|---|---|---|
| Skill | `clean-code` | Naming, function shape, error handling, comments, dependency direction |
| Agent | `clean-code-reviewer` | Audits code against the standard. Read-only |

**This is the file to edit when your taste changes.** `code-review`, `unit-testing`, and
`refactoring` all defer to it, so one edit here moves every downstream judgement.

## Fires when

- Writing new code, or reviewing existing code
- "is this clean enough", readability, maintainability, naming, "tidy this up"
- Another agent needs to justify a quality judgement rather than assert taste

## Does not

- **Edit.** The reviewer reports; you decide what to act on.
- Treat cleanliness as an end in itself. Every rule answers to one test: *does this make
  the code cheaper to change next month?* When a rule and that test disagree, the test
  wins.
- Flag everything. Findings are ranked by cost of leaving them — correctness risk, then
  change cost, then reading cost — and only the first two justify touching working code
  unprompted.
- Override the file you're in. Consistency within a file beats correctness against an
  external guide for small changes; the divergence gets noted once, not per instance.

## Install

```bash
claude plugin install clean-code@personal-claude-plugin-marketplace --scope user
```

User scope — the standard should not depend on which repo you're in.
