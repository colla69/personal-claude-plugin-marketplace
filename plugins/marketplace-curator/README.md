# marketplace-curator

The marketplace is what the company knows, written down once, and curators decide what
it says. This plugin is their workbench: it turns a lesson, or a correction a session
collected, into a change to a standard, checked, on a pull request a curator merges.

**Not tried for real yet.** It is written; trying it on real issues comes next.

| | |
|---|---|
| Skills | `curate`, the front door; `evaluate-skills`, which judges a skill, an agent, a plugin or the whole set |
| Agent | `contribution-checker`, on Opus, which checks a contribution before its pull request, the leak check first. Read-only |
| References | `contribute.md`, `place-knowledge.md`, and `author-skills/` with `style.md`, `plugin-shape.md` and the templates, read by path |
| Layer | None: it is part of the marketplace itself |
| Builds on | `craft-review`, `language-simple-english` |

## Fires when

- "work issue 12", "turn this correction into a rule", "add a standard for X"
- "what's in the queue?", "which corrections came in?"
- "is this skill any good?", "review the whole set"
- "where does this rule go?"

## Writes

- A branch, `contrib/<topic>`, in this checkout, with the change, a commit and a pull
  request
- A comment on an issue, and the issue closed, only after the curator says yes

## Leaves to you

- **What a standard says.** A new skill, a new team plugin and a decline wait for your
  yes.
- **The merge.** Nothing reaches `main` but your merge.
- **The projects.** A lesson that is only true in one project is that project's to keep.

## Install

Enabled only in the marketplace's own repository, in its `.claude/settings.json`. It
is never installed in a docked project.

## More

- How a lesson becomes a change:
  [`docs/guides/contribute-a-lesson.md`](../../docs/guides/contribute-a-lesson.md)
- Why it is a plugin of its own:
  [`docs/explanation/the-steward.md`](../../docs/explanation/the-steward.md)
