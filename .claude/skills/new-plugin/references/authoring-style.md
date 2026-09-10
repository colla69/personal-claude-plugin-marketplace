# Authoring style

The toolkit is prose. There is no code in it — the entire product is how well the
standards are written. These are the patterns the existing six plugins hold to.

## Contents

- [The skill/agent split](#the-skillagent-split)
- [Writing descriptions](#writing-descriptions)
- [Voice](#voice)
- [Structure](#structure)
- [Report formats](#report-formats)
- [Mechanics](#mechanics)

## The skill/agent split

| | Skill | Agent |
|---|---|---|
| **Is** | A document loaded into context | A separate context that reads it |
| **Holds** | Every rule, example, and ranking | Its own failure mode and lane |
| **Length** | 60–160 lines | 20–50 lines |
| **Edited when** | Your taste changes | The agent misbehaves |

The skill is the single source. When the standard changes you edit one file and both the
main conversation and the subagent pick it up — that is the entire reason the split
exists.

So an agent file must not restate its skill. It opens by naming the job and pointing at
the skill, then spends its length on the three things the skill cannot cover:

**The failure mode this agent specifically falls into.** Not generic. The existing ones
are specific and that is why they work: `code-reviewer` names "agreeable review"
(finding nothing because nothing jumped out) and "padded review" (listing every
preference so it looks thorough). `unit-tester` names silently refactoring production
code while "adding tests". `refactoring-specialist` names fixing a bug mid-refactor, and
says why — a mixed diff can no longer answer "did I break anything".

**The lane.** What it may and may not touch. `unit-tester` constrains edits to test
files and stops to ask if the implementation needs changing. Read-only agents declare
`disallowedTools: Write, Edit, NotebookEdit` in frontmatter, not just in prose — prose
is a request, frontmatter is a constraint.

**What to do when there is nothing to report.** Every agent here says a version of "if
it's fine, say so and stop". Without that line, a report format is a demand for output,
and the agent will manufacture findings to fill it.

## Writing descriptions

The `description` in frontmatter is not documentation. It is the only thing Claude sees
when deciding whether to load this skill, so it is a **trigger list**.

Three parts, in order:

1. **What it is** — one clause, the standard itself
2. **Use whenever** — the phrasings a user actually types, quoted where they are
   distinctive
3. **Also use** — the non-obvious second trigger, the one that catches the case the
   first clause misses

```
description: Restructure code without changing its behavior, in small verifiable
steps gated on a green test suite. Use whenever the user asks to refactor, clean
up, restructure, extract, simplify, split a large file, reduce duplication, or pay
down technical debt. Also use before adding a feature to code that's hard to
change.
```

That last sentence is the valuable one. Anyone can catch "refactor this". Catching "this
code is hard to work with, I need to add a feature" is what makes the skill fire when it
should.

Write the triggers as the user's words, not yours. `write-unit-tests` lists "mentions
coverage, says code is untested, wants TDD" — those are things people say. "Testing
scenarios" is not.

Descriptions are one long line in the YAML. Do not wrap them.

## Voice

**State the position; don't describe the document.** No skill here opens with "this
skill helps you write clean code". `clean-code` opens with "cleanliness is not an end in
itself" and immediately gives the test that overrides every rule below it.

**Attach a cost to every rule.** A rule without a reason can only be applied to cases
you anticipated. A rule with a reason can be applied to the ones you didn't.

> Never swallow an error to make a signature simpler. An empty `catch` is a bug with
> a delay fuse.

**Be concrete.** `retryableRequests` over `filteredList`. `returns empty list when the
user has no orders` over `test getOrders 2`. Named examples beat described ones.

**Compress the important claims into something that survives.** The lines that actually
change behavior are the short ones:

> A refactor without tests is a rewrite with extra confidence.
> A test you wrote but did not execute is a guess.
> Duplication is cheaper than the wrong abstraction.
> A `TODO` without a name and a reason is a wish, not a task.

One or two per document. A page of aphorisms is a page nobody can act on.

**Say when to ignore the standard.** Every skill here ends by yielding somewhere.
`clean-code` yields to local file consistency for small changes. `vue-conventions`
yields to the project's existing patterns and says to name the mismatch out loud rather
than introducing a second style. A standard with no stated boundary gets applied
mechanically, which is worse than not being applied.

**Rank by cost, not by category.** When a skill produces findings, tell the reader how
to sort them — `clean-code` sorts by correctness risk, then change cost, then reading
cost, and says only the first two justify touching working code unprompted.

**Do not hedge.** No "you might want to consider", no "it's generally recommended". Say
the thing. If it is conditional, say the condition.

## Structure

Sections follow the order someone works in. `write-unit-tests` goes: before writing
anything → what to test → test shape → mocking → verify. That is the sequence of the
task, not a taxonomy of testing.

Target 60–160 lines for a skill. Past that, move detail into `references/` — a reference
file costs nothing until the skill tells the agent to read it, and the skill should say
exactly when: "Read `references/context-files.md` before writing."

Use `references/` for detail consulted at one specific moment (templates, tables, layout
rules). Use `assets/` for files the skill writes out or copies.

## Report formats

Give a fenced block with `<angle bracket placeholders>` describing what goes in each
section, not example content:

```
### Blocking
<Bugs, security issues, breaking changes. Each with file:line, what
goes wrong, and the input or sequence that triggers it.>
```

Include a section for what the agent checked and found sound. `review-changes` has
**Verified**, and the reason is stated: it tells the author what the review covered, so
they know what it didn't.

Include a section for what was deliberately left. `unit-tester` has "deliberately not
covered", `refactoring-specialist` has "left alone" and "found, not fixed". Without
those sections an agent either does out-of-scope work or drops what it noticed.

## Mechanics

- Hard-wrap prose at **88 characters**. Frontmatter descriptions and table rows are
  exempt — they cannot wrap.
- Em dashes for asides, not parentheses.
- Backtick every filename, command, identifier, and config key.
- Frontmatter: skills take `name` and `description`. Agents take those plus `effort`
  (`medium`, or `high` for review and refactoring where thoroughness is the value) and
  `disallowedTools` for read-only agents. **Never a `model` field** — naming a vendor's
  model hard-codes one runtime into a file that has to stay portable across agents.
- Namespacing is automatic: `/clean-code:clean-code` for the skill,
  `@clean-code:clean-code-reviewer` for the agent. Do not put the namespace in the
  `name` field.
