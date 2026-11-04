---
name: review-changes
description: Review a code change — a diff, a branch, or a pull request — for correctness, test adequacy, and API impact, with every finding located by file and line. Use whenever the user says "look at my changes", "review this PR", "check this branch before I push", or wants feedback on code in progress. Also use before committing when the change is substantial.
---

# Review changes

Review a code change the way a careful colleague would.

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
failure of the thing being called.

**Test adequacy.** Would the tests fail if the change were wrong? New branches with no
corresponding test are the gap worth naming.

**API and contract impact.** Signature changes, response shape changes, migration
compatibility, anything a caller outside this diff depends on. This is where the expensive
mistakes live, because they surface in someone else's code.

**Everything else.** Naming, structure and style, judged against the code around the
change, and function shape by the `clean-code` standard.
Real, but last, and easy to over-index on because it's the easiest to spot.

## Report

Sort the findings by what they cost if left:

- **Blocking** holds bugs and breaking changes, each located by
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
