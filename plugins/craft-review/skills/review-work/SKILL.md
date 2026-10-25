---
name: review-work
description: How to review any piece of work — establish what it is meant to do, read it as written rather than as described, trace one concrete case through it, and report only findings that carry a cost. Use whenever the user asks for feedback, a second opinion, a check, or "is this any good" on a document, a plan, a report, a design, or other work that is not code. Also use when checking work against a plan or a request, since a review has to start from what the work was meant to do.
---

# Review work

A review is worth what its findings cost to ignore.

## Know what it is meant to do

Before reading the work, know what you are reviewing and what it is supposed to
achieve: the request it answers, the plan it carries out, or the standard it has to
meet. A review without that is a list of reactions.

## Read it as written

Read the work itself, not its summary. If the summary says a function validates its
input and the function does not, or a report says it covers three regions and it covers
two, the summary is wrong, and that is your finding.

Then trace one concrete case through it by hand: one reader with one question through
the document, or one request through the procedure. Do not conclude that anything is
sound until you have.

## What makes a finding

**A finding needs a cost.** "This section is long" is an observation. "This section puts
the decision after three pages of background, so a reader who needs only the decision
has to read the history first" is a finding: it names what the reader or the next
editor pays. If you cannot state the cost, drop the finding. A review with four real
problems is acted on; four real problems buried in twenty nitpicks get skimmed and
ignored.

**Be specific about location and trigger.** "Some numbers look off" sends the author
hunting. "Table 3 gives the Q2 total as 4.1M, but its rows add up to 3.8M" is fixable in
a minute.

**Say when you are unsure.** When a finding depends on something you cannot see, say
so, and name what would resolve it. A confident wrong finding costs more credibility
than an honest uncertain one.

## Report

Rank findings by what they cost if left, in this shape:

```
## Review — <what was reviewed>

**Summary:** <what the work does, in your own words — if you can't
state it clearly, that itself is the first finding>

### Blocking
<What is wrong, unsafe, or breaks someone who relies on it. Each with
its location, what goes wrong, and the case that shows it.>

### Should fix
<Real problems that aren't blocking: gaps, and unclear parts that will
change again.>

### Consider
<Suggestions the author can reasonably decline.>

### Verified
<What you checked and found sound. This tells the author what the
review covered, so they know what it didn't.>
```

Leave out a section that would be empty. Give each finding in as few lines as hold its
location, its cost and its case, and the Verified section in a few lines. A review is
read before anyone acts on it, and an agent's review is read again on every later turn
of the session that asked for it.

## Where this yields

- **To the Craft skill for the kind of work under review.** It says what to look for
  and in what order.
- **To the project.** Where it has its own review checklist or report form, use that.
  A finding still needs a cost, and the report still says what was verified.
