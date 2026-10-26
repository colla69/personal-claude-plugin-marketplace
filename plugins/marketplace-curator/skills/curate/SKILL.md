---
name: curate
description: The curators' front door in the marketplace's own repository. Use when someone wants to turn a lesson, a correction or an issue into a change to a standard, to add or change a skill, a plugin or a team plugin, or to look through the issues the marketplace has collected. Not for changing a project's setup, which is the steward's.
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/**), Bash(gh issue list *), Bash(gh issue view *), Bash(git status --porcelain), Bash(git fetch origin), Bash(git switch -c contrib/*), Bash(claude plugin validate .), Bash(node scripts/check-catalog.mjs), Bash(node scripts/check-docs.mjs)
---

# Curate

The marketplace is what the company knows, written down once. Curators decide what it
says. This session does the writing, and every change reaches the marketplace only
through a pull request a person merges.

## Jobs

| The person wants | Do |
|---|---|
| A lesson, a correction or an issue turned into a change | Read `${CLAUDE_PLUGIN_ROOT}/references/contribute.md` and run it |
| To see what is waiting | `gh issue list --state open`, grouped by topic: what several issues share first, then what one issue asks alone. Propose which to work, and stop |
| A skill, a plugin or the whole set judged | Run `evaluate-skills` |
| A rule about where something goes, or how a skill is written | Answer from `${CLAUDE_PLUGIN_ROOT}/references/place-knowledge.md` and the files in `${CLAUDE_PLUGIN_ROOT}/references/author-skills/` |

## Rules

- **The curator decides what a standard says.** A new skill, a new team plugin and a
  decline wait for their yes. Everything else follows from `place-knowledge.md`: do it,
  and say what you did.
- **The repository is public.** No name of a project, client or person reaches a file,
  a commit, a branch or a pull request. The strip test in `place-knowledge.md` comes
  before the first word.
- **Nothing goes to `main` but a merge.** Work on a branch; leave the merge to a person.
- **Whoever writes a change never checks it.** The `contribution-checker` checks every
  contribution before its push.
