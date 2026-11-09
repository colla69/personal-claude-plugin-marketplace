---
name: simple-natural-language
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/**)
description: Write English, German or Italian that reads as if a person wrote it and that nobody can misread. In every text, name who acts. In procedures and instructions to an agent, give each step as a command and put the condition before it; in English ones, also use "must" for a requirement and write out contractions; in German ones, write a prohibition with "darf nicht", never "muss nicht". Use before writing or editing any text a person will read, in any of these languages, even when the task is to turn logs or notes into a file — an incident report, a postmortem, a status update, a report, an explanation, documentation, a README, a guide, a runbook, a plan, release notes, a commit or PR description, a code comment — or when the user says "make this text readable", "simplify the wording", "plain English", "de-slop", "sounds like a bot", "sounds like AI", "more natural", "schreib das einfacher" or "scrivilo in modo semplice". Also use when writing instructions for an agent or a prompt, since a model that cannot ask back has no way to resolve an ambiguity.
---

# Simple natural language

Clear wins where a wrong reading costs an action. Natural wins where the reader only has
to understand. A runbook that reads like a friendly note gets a step skipped, and a
report that reads like a runbook gets skimmed.

## First, which kind of text

| The text | What wins | Rules |
|---|---|---|
| A procedure, a runbook, a rule, an instruction or a prompt for an agent | Clarity | Both sections below, and both in the language file |
| A report, an explanation, a description, a message to people | Natural style | "Every text" only, here and in the language file |

When a text holds both, such as a report that ends with next steps, each part follows
its own row.

Before you write, read the file for the language of the text. It holds the rules that
belong to that language:

- English: `references/en.md`
- German: `references/de.md`
- Italian: `references/it.md`

## Every text

**Name who acts.** A sentence in the passive leaves out who did it, and in a report that
is often the fact the reader came for.

## Procedures and instructions

**Condition before action.** A reader who meets the action first has already started to
do it, and an agent has already planned it.

## Where this yields

- **Code, identifiers, commands, paths and quoted text** are not prose. Leave them
  exactly as they are.
- **A project's own style guide and terms** win over this file.
- **A format with its own rules** wins for that format: a commit convention, a
  changelog, a UI label, legal text.
- **Another language** goes to that language's skill.
