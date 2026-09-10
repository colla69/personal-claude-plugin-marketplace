---
name: review-changes
description: Review a diff, branch, or pull request for correctness, security, test adequacy, and API impact. Use whenever the user asks for a review, says "look at my changes", "review this PR", "check this branch before I push", or wants feedback on work in progress. Also use before committing when the change is substantial.
---

# Review changes

Review a diff the way a careful colleague would: find the things that will actually cause
a problem, and say so in a way that's easy to act on.

## Establish the scope first

Before reading any code, know what you're reviewing and what it's meant to do.

- `git diff main...HEAD` for a branch, `git diff --staged` for staged work, or the range
  the user names
- `git log --oneline main..HEAD` for the intent the author declared
- If the diff is large, review by commit rather than as one blob — commits usually encode
  a logical grouping the author already made

Read the changed files, not just the hunks. A diff hides the context that determines
whether a change is correct.

## What to look for, in priority order

**Correctness.** Does it do what the commit message claims? Trace one realistic input
through the changed path by hand. Check the edges the author probably didn't: empty
collections, null, concurrent access, the second call, the failure of the thing being
called.

**Security.** Untrusted input reaching a query, a shell, a path, or a template. Authz
checks that happen after the expensive operation rather than before. Secrets in code or
logs. Anything that widens what an unauthenticated caller can reach.

**Test adequacy.** Not coverage percentage — whether the tests would fail if the change
were wrong. A test that asserts the function was called is not a test of behavior. New
branches with no corresponding test are the gap worth naming.

**API and contract impact.** Signature changes, response shape changes, migration
compatibility, anything a caller outside this diff depends on. This is where the expensive
mistakes live, because they surface in someone else's code.

**Everything else.** Naming, structure, style. Real, but last, and easy to over-index on
because it's the easiest to spot.

## Report format

```
## Review — <branch or scope>

**Summary:** <what this change does, in your own words — if you can't
state it clearly, that itself is the first finding>

### Blocking
<Bugs, security issues, breaking changes. Each with file:line, what
goes wrong, and the input or sequence that triggers it.>

### Should fix
<Real problems that aren't blocking: missing tests for new branches,
error handling gaps, unclear code in a path that will change again.>

### Consider
<Suggestions the author can reasonably decline.>

### Verified
<What you checked and found sound. This tells the author what your
review actually covered, so they know what it didn't.>
```

Be specific about location and trigger. "Potential null dereference" sends the author
hunting; "`parseUser` at line 42 dereferences `profile.name`, and `profile` is null for
accounts created before the migration" is fixable in a minute.

When you're unsure whether something is a bug — because it depends on a caller you can't
see — say that, and name what would resolve it. A confident wrong finding costs more
credibility than an honest uncertain one.
