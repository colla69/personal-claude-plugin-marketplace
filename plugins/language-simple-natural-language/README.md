# language-simple-natural-language

Text in English, German or Italian that reads as if a person wrote it and that nobody
can misread. Procedures and agent instructions put clarity first; reports and
explanations put natural style first.

| | |
|---|---|
| Skill | `simple-natural-language` |
| Layer | Language |
| Builds on | nothing |

## Fires when

- Writing or editing text a person reads: docs, a README, a report, a runbook, a commit
  or PR description
- "plain English", "de-slop", "sounds like AI", "schreib das einfacher"
- Writing instructions or a prompt for an agent

## Leaves to others

- **What the text says.** It governs how a fact is written, not which facts belong.
- A project's own style guide, and formats with their own rules, which win.

## Install

Docking installs it at project scope in every project, with code or without. By hand:

```bash
claude plugin install language-simple-natural-language@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/simple-natural-language/SKILL.md`](skills/simple-natural-language/SKILL.md),
  with one file per language in `references/`
