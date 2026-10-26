# Authoring style

The marketplace is prose. The product's only code is the script the steward measures
a setup with and the base plugin's hooks: the whole product is how well the standards
are written and how cleanly they are cut. This guide covers the writing, and `place-knowledge.md` the cut.

## Contents

- [The cut](#the-cut)
- [Skills and agents](#skills-and-agents)
- [Substance](#substance)
- [Naming](#naming)
- [Writing descriptions](#writing-descriptions)
- [Voice](#voice)
- [Structure](#structure)
- [Report formats](#report-formats)
- [Mechanics](#mechanics)

## The cut

Decide where the knowledge goes before writing a word. `place-knowledge.md`, in the
folder above this one, holds the diagnosis, the strip test, the layers, and the
cutting rules as checks. Everything below assumes the cut is already made.

## Skills and agents

| | Skill | Agent |
|---|---|---|
| **Is** | Knowledge: a prose standard for one thing | A worker with one job, such as answering, running a check or reviewing |
| **Holds** | Every rule, example and ranking for that thing | Its job, its failure modes, what to do when there is nothing to report, a report skeleton |
| **Lives in** | Its own plugin, `plugins/<layer>-<topic>/` | A `marketplace-` plugin's `agents/`, and nowhere else |
| **Length** | 60–160 lines | 20–60 lines |
| **Edited when** | Your taste changes | The agent misbehaves |

The skill is the single source of knowledge. An agent never restates a skill. It names
its job, preloads the skills it applies, and spends its length on three things no skill
can cover.

**The failure mode this agent falls into.** It must be specific, because the specific
ones are the ones that work. For a reviewer, "agreeable review" is finding nothing
because nothing jumped out, and "padded review" is listing every preference so the
review looks thorough.

**The lane.** What the agent may and may not touch. Every agent the marketplace ships is
read-only, and the frontmatter keeps the edit tools out, with `disallowedTools: Write,
Edit, NotebookEdit`, not with a sentence in the body. Prose is a request; frontmatter is
a constraint. That line removes the edit tools and nothing else: an agent that keeps
`Bash` can still write with a redirect or `sed -i`. So an agent that needs the shell
gets a failure mode that says to use it to read.

**What to do when there is nothing to report.** Every agent says some version of "if
it's fine, say so and stop". Without that line, a report format is a demand for output,
and the agent will manufacture findings to fill it.

Skill plugins ship no `agents/`. `plugin-shape.md` says why, and what else a
`marketplace-` plugin does differently.

## Substance

**Write only the substance you were given.** In a contribution, that is the lesson as
the curator or the correction states it, or the rule as a docked project's setup states
it, after the strip test. A plausible rule nobody chose looks finished and is wrong in a way only the user
can see. So every judgement you had to fill in is listed as assumed, in the report or
in the pull request, where it can still be corrected cheaply.

**Don't write a second home**, even where restating a rule would read better in place.
The check is "One home" in `place-knowledge.md`: name the skill that holds the rule,
and declare its plugin.

**Don't over-produce.** A skill that says less and yields clearly beats one that
covers everything and commits to nothing. Read the neighbouring skills first, and
match their register. When the substance for a section is missing, leave the section
out and say so, rather than filling it because the template has one.

## Naming

- **Plugin:** `<layer>-<topic>`, for example `universal-clean-code`,
  `craft-unit-testing`, `language-java` or `tools-vue`. The prefix is the same word as
  the plugin's `category`: `universal`, `craft`, `language` or `tools`. A plugin that
  works on the marketplace itself is `marketplace-<name>`, with category `marketplace`.
- **Skill:** named for the activity, for example `write-unit-tests` or
  `vue-conventions`. It is invoked as `/<plugin>:<skill>`.
- **Wording that outlives code.** Every skill here is about code today, and the
  structure must not assume it stays that way. Language is "what the work is written
  in", not "the programming language": German and an enterprise report template are
  Language skills too.

## Writing descriptions

The `description` in frontmatter is not documentation. It is the only thing Claude sees
when deciding whether to load the skill, so it is a **trigger list**.

It has three parts, in this order:

1. **What it is**: one clause, the standard itself.
2. **Use whenever**: the phrasings a user actually types, quoted where they are
   distinctive.
3. **Also use**: the non-obvious second trigger, which catches the case the first
   clause misses.

```
description: Restructure code without changing its behavior, in small verifiable
steps gated on a green test suite. Use whenever the user asks to refactor, clean
up, restructure, extract, simplify, split a large file, reduce duplication, or pay
down technical debt. Also use before adding a feature to code that's hard to
change.
```

The last sentence is the valuable one. Anyone can catch "refactor this". Catching "this
code is hard to work with, I need to add a feature" is what makes the skill fire when it
should.

Write the triggers in the user's words, not yours. `write-unit-tests` lists "mentions
coverage, says code is untested, wants TDD", which are things people say. "Testing
scenarios" is not.

Two skills whose descriptions win the same prompt split the traffic between them by
luck. Before finishing, write three prompts a person would really type, and check that
this description wins them against every other skill in the marketplace.

Descriptions are one long line in the YAML. Do not wrap them.

## Voice

**State the position; don't describe the document.** No skill here opens with "this
skill helps you write clean code". `clean-code` opens with "cleanliness is not an end in
itself" and immediately gives the test that overrides every rule below it.

**Attach a cost to every rule.** A rule without a reason can only be applied to the
cases you anticipated. A rule with a reason can be applied to the ones you didn't.

> Never swallow an error to make a signature simpler. An empty `catch` is a bug with
> a delay fuse.

**Be concrete.** `retryableRequests` over `filteredList`. `returns empty list when the
user has no orders` over `test getOrders 2`. Named examples beat described ones.

**Compress the important claims into something that survives.** The lines that
actually change behavior are the short ones:

> A refactor without tests is a rewrite with extra confidence.
> A test you wrote but did not execute is a guess.
> Duplication is cheaper than the wrong abstraction.
> A `TODO` without a name and a reason is a wish, not a task.

Use one or two per document. A page of aphorisms is a page nobody can act on.

**Say when to ignore the standard.** Every skill here ends by yielding somewhere.
`clean-code` yields to local file consistency for small changes. `vue-conventions`
yields to the project's existing patterns, and says to name the mismatch out loud
rather than introduce a second style. A standard with no stated boundary gets applied
mechanically, which is worse than not being applied.

**Rank by cost, not by category.** When a skill produces findings, tell the reader how
to sort them. `clean-code` sorts by correctness risk, then change cost, then reading
cost, and says only the first two justify touching working code unprompted.

**Do not hedge.** No "you might want to consider", no "it's generally recommended". Say
the thing. If it is conditional, say the condition.

**Never describe a skill or an agent as enforcement.** A model may follow a skill,
ignore it, or follow it partly. A page that calls one a guarantee teaches its reader to
stop checking, which is when the gap shows. Say what it asks for, and leave the
guarantees to what really is one: frontmatter, permission rules, a hook's exit code, and
a person's merge.

## Structure

Sections follow the order someone works in. `write-unit-tests` goes: before writing
anything → test first → what to test → test shape → mocking → verify. That is the
sequence of the task, not a taxonomy of testing.

Target 60–160 lines for a skill. Past that, move detail into `references/`. A reference
file costs nothing until the skill tells the agent to read it, so the skill should say
exactly when: "Read `references/context-files.md` before writing."

Use `references/` for detail consulted at one specific moment, such as templates,
tables or layout rules. Use `assets/` for files the skill writes out or copies.

## Report formats

A report has two halves, and each has its own home:

- **The skeleton** belongs to the agent, because it is the same for every kind of work
  the agent sees. It covers what the reviewer found, or what the check failed on.
- **The report for one kind of work** belongs to that kind's Craft skill, because it
  is knowledge about the work. Examples are a refactoring plan, a test report, and
  clean-code findings grouped by cost.

Writing either half in both places gives it two homes.

Give a fenced block, with `<angle bracket placeholders>` describing what goes in each
section rather than example content:

```
### Blocking
<Bugs, security issues, breaking changes. Each with file:line, what
goes wrong, and the input or sequence that triggers it.>
```

Include a section for what was checked and found sound. `review-work` has
**Verified**, and says why: it tells the author what the review covered, so they know
what it didn't.

**Keep a report as short as what its reader acts on.** An agent's report stays in the
session that asked for it, so every later turn reads it again: a 10k-token report in a
50-turn session is read as 500k. So a skeleton asks for one line per item, numbers
items rather than repeating them, lists what needs action rather than everything that
passed, and lets a section that would be empty be left out. Short is not clipped: a line
read two ways costs a rework, which is far more than the words it saved.

Include a section for what was deliberately left, such as a test report's
"deliberately not covered" or a refactoring plan's "found, not fixed". Without one, a
worker either does out-of-scope work or drops what it noticed.

## Mechanics

- Write in English, so triggers fire on the phrases people type. A natural-language
  skill, such as German, is content: it is about the language, not written in it.
- Write that English the way `simple-english`, in `language-simple-english`, says, here
  as in every project. Text already here moves to it when it is next edited, not in a
  sweep, so each diff holds only the change it is for.
- Hard-wrap prose at **88 characters**. Frontmatter descriptions and table rows are
  exempt, since they cannot wrap.
- Use em dashes for asides, not parentheses.
- Backtick every filename, command, identifier and config key.
- **Skill frontmatter:** `name` and `description`, plus `allowed-tools` for a skill
  that reads its plugin's references by path, as `plugin-shape.md` describes.
- **Agent frontmatter** takes `name` and `description`, plus:
  - `model`, as an alias, never a full model ID, so that it follows new versions. It
    goes by the kind of work: `opus` for judgement, such as a review; `sonnet` for doing
    and answering; `haiku` for fetching and running, such as a test run.
  - `effort`, by the same measure: `medium` by default, `low` for running a command.
  - `disallowedTools`, for every read-only lane.
  - `skills:`, the skills it preloads, each as `plugin:skill`. A bare name resolves to
    nothing, and the agent runs without it.
- `description` lives in the marketplace entry, not in `plugin.json`. When a field is
  set in both, the manifest silently wins.
- Namespacing is automatic, as `/universal-clean-code:clean-code`. Do not put the
  namespace in the `name` field.
