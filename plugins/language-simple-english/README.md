# language-simple-english

Text is good when nobody can read it two ways. Short sentences, one instruction each,
one word per meaning, and no filler, after the rules of Simplified Technical English,
ASD-STE100.

| | |
|---|---|
| Skill | `simple-english` |
| Layer | Language |
| Builds on | nothing |

> Two actions in one sentence of a procedure is the step a reader skips.

The words of your field are allowed, as long as each one keeps one meaning. The skill
leaves out the standard's controlled dictionary.

## Fires when

- Writing or editing English a person reads: docs, a README, a plan, a report, a
  runbook, release notes, a commit or PR description, a comment
- "make this text readable", "simplify the wording", "plain English", "de-slop", "STE",
  "for non-native readers"
- Writing instructions or a prompt for an agent, the reader that cannot ask back

## Leaves to others

- **What the text says.** It governs how a fact is written, not which facts belong in
  it: what an error message must contain is `clean-code`'s, and what a review reports
  is `review-work`'s.
- Code, identifiers, commands and quoted output, which stay exactly as they are.
- A project's own style guide and terms, and formats with their own rules, such as a
  commit convention, which win.
- Text in another language, to that language's skill.

## Install

Docking installs it at project scope in every project, with code or without. By hand:

```bash
claude plugin install language-simple-english@personal-claude-plugin-marketplace --scope project
```

The steward depends on it, so installing the steward at user scope brings it to every
project on that machine, and the base plugin's `reviewer` writes its report by it.

## More

- The standard itself:
  [`skills/simple-english/SKILL.md`](skills/simple-english/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
