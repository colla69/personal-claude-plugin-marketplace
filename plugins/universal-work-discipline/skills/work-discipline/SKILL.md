---
name: work-discipline
description: How to do a piece of work in a place someone else maintains — read before you write, match what is already there, hold the scope you were given, and never report unverified work as done. Use whenever changing, extending or fixing existing work of any kind — code, a document, a template, a configuration — or when the user says "just add", "quick fix", "small change", or "while you're in there". Also use when the task looks simple, since that is when scope quietly expands and the check gets skipped.
---

# Work discipline

You are changing something other people have to live with. The measure of good work is
not that it is finished — it is that the next person can tell what changed and why, and
that nothing they relied on moved without warning.

These rules hold for any kind of work. The Craft skill for a kind of work says what they
mean there: which neighbours to read, what a check is, what counts as a side effect.

## Read before writing

The existing patterns of the place you are working in outrank any general best
practice, this document included.

1. Read what you are about to change in full, not just the part you are editing.
2. Read two neighbours: how does this place already do the thing you are about to do?
   In code that is error handling, naming and file layout; in a document it is the
   headings, the terms and the tone.

## Match what is there

Introducing a second way to do something already solved here is worse than following a
pattern you would not have chosen. Work that looks foreign is work nobody maintains.

If the existing pattern is genuinely wrong, say so and propose changing it
deliberately. Do not fork it by doing your own version in parallel.

## Hold scope

The change you were asked for is the change you make.

- Do what is in scope. Note what is not, and leave it. A problem you spot while doing
  something else is a finding, not a task.
- Unrequested improvements are not free. Whoever reviews the work has to read them, its
  owner has to understand them, and they may conflict with work in flight.

Two changes in one piece of work means nobody can tell which one broke something.

## Unverified is not done

**Never report work as done without running the checks the project itself uses.** Not
your judgement that it looks right: the checks this place actually relies on.

- If a check does not exist, say so rather than assuming the work is verified.
- If a check fails for a reason unrelated to your change, say that too, with the
  output. A failure you did not cause is still a fact the caller needs.
- When the work cannot be verified — no checks, or an environment you cannot run —
  state that plainly in the report. Unverifiable work is not a failure; presenting it
  as verified is.

## Where this yields

- **To the project.** Its own conventions and its own definition of done win for
  anything already settled there.
- **To the Craft skill for the kind of work.** It says what these rules mean in
  practice: which neighbours matter, which checks run and in what order, and which
  side effects need naming.
