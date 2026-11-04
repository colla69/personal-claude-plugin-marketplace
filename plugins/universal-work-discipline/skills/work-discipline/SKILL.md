---
name: work-discipline
description: How to report a piece of work done in a place someone else maintains — run the checks the place itself uses, and never report unverified work as done. Use whenever changing, extending or fixing existing work of any kind — code, a document, a template, a configuration — or when the user says "just add", "quick fix" or "small change". Also use when the task looks simple, since that is when the check gets skipped.
---

# Work discipline

You are changing something other people have to live with. The next person needs to
know whether the change was checked, not only that it is finished.

These rules hold for any kind of work. The Craft skill for a kind of work says what a
check is there.

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

- **To the project.** Its own definition of done wins.
- **To the Craft skill for the kind of work.** It says which checks run and in what
  order.
