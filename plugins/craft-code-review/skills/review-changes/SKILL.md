---
name: review-changes
description: Review a code change — a diff, a branch, or a pull request — for correctness, security, test adequacy, and API impact. Use whenever the user says "look at my changes", "review this PR", "check this branch before I push", or wants feedback on code in progress. Also use before committing when the change is substantial.
---

# Review changes

Review a code change the way a careful colleague would. `review-work` holds how any
review is done: know what the work is meant to do, read it as written, trace one case,
give every finding a cost, and report in its shape. This skill says what that means for
a diff.

## Establish the scope first

- The change itself: the diff against the base the user names, whether that is a
  branch, the staged work, or a range of commits
- The intent the author declared, in the commit messages or the pull request
  description
- If the diff is large, review by commit rather than as one blob — commits usually
  encode a logical grouping the author already made

Read the changed files, not just the hunks. A diff hides the context that determines
whether a change is correct.

## What to look for, in priority order

**Correctness.** Does it do what the commit message claims? For the case you trace,
take one realistic input through the changed path. Then check the edges the author
probably didn't: empty collections, null, concurrent access, the second call, the
failure of the thing being called. Then look for what a diff cannot show: when the change
adds or alters a rule on one of two paths that must agree — a writer and its reader,
client and server validation, a batch job and its online twin — check the same rule on
the other path. A missing rule has no line to comment on, so it ships unless the
reviewer goes to look for it.

**Security.** Untrusted input reaching a query, a shell, a path, or a template. Authz
checks that happen after the expensive operation rather than before. Secrets in code or
logs. Anything that widens what an unauthenticated caller can reach.

**Test adequacy.** Judge the tests by the `write-unit-tests` standard: would they fail
if the change were wrong? New branches with no corresponding test are the gap worth
naming.

**API and contract impact.** Signature changes, response shape changes, migration
compatibility, anything a caller outside this diff depends on. This is where the expensive
mistakes live, because they surface in someone else's code.

**Everything else.** Naming, structure and style, judged by the `clean-code` standard.
Real, but last, and easy to over-index on because it's the easiest to spot.

## Report

Use the report shape in `review-work`. For a code change:

- **Blocking** holds bugs, security issues and breaking changes, each located by
  `file:line`, with the input or sequence that triggers it. "Potential null
  dereference" sends the author hunting; "`parseUser` at line 42 dereferences
  `profile.name`, and `profile` is null for accounts created before the migration" is
  fixable in a minute.
- **Should fix** holds missing tests for new branches, error-handling gaps, and unclear
  code in a path that will change again.

## Where this yields

- **To the project.** Its own review checklist and its own definition of a breaking
  change win where it has them.
- **To the Language and Framework & Tools layers** for what is idiomatic in the code
  under review.
