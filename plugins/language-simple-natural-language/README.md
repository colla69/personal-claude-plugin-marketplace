# language-simple-natural-language

Text in English, German or Italian that reads as if a person wrote it and that nobody
can misread. Procedures and instructions to an agent put clarity first; reports and
explanations put natural style first.

| | |
|---|---|
| Skill | `simple-natural-language` |
| Layer | Language |
| Builds on | nothing |

> A runbook that reads like a friendly note gets a step skipped, and a report that reads
> like a runbook gets skimmed.

Every rule here was measured with and without the skill, in the language it is listed
for. A rule that showed lift in one language stays in that language only.

## Fires when

- Writing or editing English, German or Italian a person reads: docs, a README, a plan,
  a report, a runbook, release notes, a commit or PR description, a comment
- "make this text readable", "simplify the wording", "plain English", "de-slop",
  "sounds like a bot", "sounds like AI", "more natural", "schreib das einfacher",
  "scrivilo in modo semplice"
- Writing instructions or a prompt for an agent, the reader that cannot ask back

## Leaves to others

- **What the text says.** It governs how a fact is written, not which facts belong in
  it: what a review reports belongs to the review's own skill or agent.
- Code, identifiers, commands and quoted output, which stay exactly as they are.
- A project's own style guide and terms, and formats with their own rules, such as a
  commit convention, which win.
- Text in any other language, to that language's skill.

## Install

Docking installs it at project scope in every project, with code or without. By hand:

```bash
claude plugin install language-simple-natural-language@personal-claude-plugin-marketplace --scope project
```

The steward depends on it, so installing the steward at user scope brings it to every
project on that machine, and the base plugin's `reviewer` writes its report by it.

## More

- The standard itself:
  [`skills/simple-natural-language/SKILL.md`](skills/simple-natural-language/SKILL.md),
  with one file per language in `references/`
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
