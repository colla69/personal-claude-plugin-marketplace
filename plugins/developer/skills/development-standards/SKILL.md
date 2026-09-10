---
name: development-standards
description: How to implement a change in someone else's codebase — reading before writing, matching local conventions over general best practice, verifying with the project's own commands, and holding scope. Use whenever writing or modifying application code, implementing a feature or fix, or acting on findings from a reviewer or refactorer. Also use when the change looks simple, since that is when scope quietly expands.
---

# Development standards

You are changing code someone else has to live with. The measure of a good change is not
that it works — it is that the next person can tell what it does and why, and that
nothing they relied on moved without warning.

## Read before writing

The project's existing patterns outrank anything in this document.

1. Read the files you are about to change, in full, not just the region you are editing.
2. Read two neighbours — how does this codebase already do the thing you are about to
   do? Error handling, logging, validation, naming, file layout, test placement.
3. Check the actual language version and dialect before using a feature. A repo pinned
   to an older standard will not compile against your assumptions, and the build error
   is the good case; the silent behavioural difference is not.

Introducing a second way to do something already solved here is worse than following a
pattern you would not have chosen. If the existing pattern is genuinely wrong, say so
and propose changing it deliberately — do not fork it by writing your own in parallel.

## Implement what was prescribed

You are often acting on a reviewer's or refactorer's findings. Implement them.

- **Do not silently substitute your own design.** If you think a finding is wrong,
  incomplete, or more expensive than it looks, say that **before** you implement, and
  say what you would do instead. Then do what is agreed.
- **Do not relitigate what was already decided.** A finding you disagree with but cannot
  argue against is one you implement.
- **Do not implement half of it.** A partially applied refactor leaves the code in a
  state neither shape explains, which is worse than either.

## Hold scope

The change you were asked for is the change you make.

- Fix what is in scope. Note what is not, and leave it. A bug you spot while
  implementing a feature is a finding, not a task.
- Do not reformat lines you did not otherwise touch. Diff noise buries the real change
  and makes review cost more than the change was worth.
- Do not change a public interface as a side effect. If the work requires it, that is a
  breaking change and it needs to be named as one.

Unrequested improvements are not free: the reviewer has to read them, the author has to
understand them, and they may conflict with work in flight.

## Verify with the project's own commands

**Never report a change as done without running the project's own verification.** Not
your judgement that it looks right — the commands the project actually uses.

In order:

1. The typecheck or compile step, if the language has one
2. The test suite, or the subset covering what you touched
3. The linter, if the project has one configured

If a command does not exist, say so rather than assuming the change is verified. If a
command fails for a reason unrelated to your change, say that too, with the output — a
pre-existing failure you did not cause is still a fact the caller needs.

When a change cannot be verified — no tests, no typecheck, an environment you cannot run
— state that plainly in the report. An unverifiable change is not a failure, but
presenting one as verified is.

## Where this yields

- **To the project.** Local convention beats this document for anything already settled
  here.
- **To the `clean-code` standard** for questions of naming, function shape, and
  structure. This skill covers how to work in a codebase; that one covers what good code
  looks like.
- **To the stack's own conventions.** Where a framework plugin is enabled — `vue-dev`
  and the like — its conventions are more specific than these and win.
