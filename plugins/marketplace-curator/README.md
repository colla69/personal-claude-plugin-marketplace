# marketplace-curator

The curators' workbench. It turns a lesson, or a correction a session collected, into a
change to a standard, measured and checked, on a pull request a curator merges. A rule
enters, and stays, only when a run shows the model breaks it without the rule.

| | |
|---|---|
| Skills | `curate`, the front door; `evaluate-skills`, which judges a skill, an agent, a plugin or the whole set |
| Agent | `contribution-checker`, which checks a contribution before its pull request, the leak check first. Read-only |
| Layer | None: it is part of the marketplace itself |
| Builds on | `language-simple-natural-language` |

## Fires when

- "work issue 12", "turn this correction into a rule", "add a standard for X"
- "what's in the queue?", "is this skill any good?", "review the whole set"
- "where does this rule go?"

## Writes

- A `contrib/<topic>` branch in this checkout, with the change, a commit and a pull
  request
- A comment on an issue, and the issue closed, only after the curator says yes

## Leaves to you

- **What a standard says.** A new skill, a new team plugin and a decline wait for your
  yes.
- **The spending.** Each run is priced before it starts.
- **The merge.** Nothing reaches `main` but your merge.

## Install

Enabled only in the marketplace's own repository, in its `.claude/settings.json`. It is
never installed in a docked project.

## More

- [How it works](../../docs/how-it-works.md)
