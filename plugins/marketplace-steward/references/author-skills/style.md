# Authoring style

The marketplace is prose. There is no code in it: the whole product is how well the
standards are written and how cleanly they are cut. This guide covers the writing, and
`place-knowledge.md` the cut.

## Contents

- [The cut](#the-cut)
- [Skills and roles](#skills-and-roles)
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

## Skills and roles

| | Skill | Role template |
|---|---|---|
| **Is** | Knowledge: a prose standard for one thing | A worker's lane: Plan, Do or Check |
| **Holds** | Every rule, example and ranking for that thing | Its lane, its failure modes, what to do when there is nothing to report, a report skeleton |
| **Lives in** | Its own plugin, `plugins/<layer>-<topic>/` | `plugins/marketplace-steward/references/set-up/roles/`, from which set-up generates agents in each project |
| **Length** | 60–160 lines | 20–50 lines |
| **Edited when** | Your taste changes | A generated agent misbehaves |

The skill is the single source of knowledge. A role template never restates a skill.
It names the job, leaves a slot for the skills set-up assigns, and spends its length on
three things no skill can cover.

**The failure mode this role falls into.** It must be specific, because the specific
ones are the ones that work. For Check, "agreeable review" is finding nothing because
nothing jumped out, and "padded review" is listing every preference so the review looks
thorough. For Do, silent scope expansion: you are in the file, you fix something
unrelated, and now one diff holds two changes.

**The lane.** What the role may and may not touch. Plan and Check are read-only; Do is
the only writer. A read-only lane is `disallowedTools: Write, Edit, NotebookEdit` in the
frontmatter, not a sentence in the body. Prose is a request; frontmatter is a
constraint.

**What to do when there is nothing to report.** Every role says some version of "if
it's fine, say so and stop". Without that line, a report format is a demand for output,
and the agent will manufacture findings to fill it.

The run-pattern template, `roles/run.md`, is the third kind of file: the project skill
that runs one trio. It holds the order, the stop for the user's OK, and when Check sends
the work back to Do. It holds no lane and no standard, which live in the role templates
and the skills it runs.

Skill plugins ship no `agents/`. Only `marketplace-` plugins do, and their agents follow
the role shape above; `plugin-shape.md` says why, and what else such a plugin does
differently.

## Substance

**Write only the substance you were given.** In a contribution, that is the lesson as
the user described it, or the rule as the adopted setup states it, after the strip
test. A plausible rule nobody chose looks finished and is wrong in a way only the user
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

**Never describe a skill, a trio or a stop as enforcement.** A model may follow a skill,
ignore it, or follow it partly. A page that calls one a guarantee teaches its reader to
stop checking, which is when the gap shows. Say what it asks for, and leave the
guarantees to what really is one: frontmatter, permission rules, and a person's merge.

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

- **The skeleton** belongs to the role template, because it is the same for every
  kind of work. It covers what Plan proposes, what Do changed, and what Check compared
  against the plan.
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
- **Agent frontmatter** applies to role templates, the agents set-up generates, and the
  `marketplace-` plugins' own agents. They take `name` and `description`, plus:
  - `effort`, chosen per role and task. The defaults are `high` for Plan and `medium`
    for Do and Check; set-up raises or lowers them per task and says why in its report.
  - `disallowedTools`, for every read-only lane.
  - In a role template, a `skills:` slot that set-up fills. How each skill is named
    there is in `set-up/trios.md`, in the steward's references.
  - `model`, as an alias (`opus`, `sonnet`, `haiku`), never a full model ID, so that it
    follows new versions. It is chosen per role like `effort`, and the role templates
    carry the defaults.
- `description` lives in the marketplace entry, not in `plugin.json`. When a field is
  set in both, the manifest silently wins.
- Namespacing is automatic, as `/universal-clean-code:clean-code`. Do not put the
  namespace in the `name` field.
