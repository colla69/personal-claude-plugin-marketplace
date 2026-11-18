# How it works

## Standards are skills

Each standard is a skill in a plugin of its own. A skill's description loads in every
session, and its body loads only when the task needs it. So a project installs only the
standards its files show a need for, because each one costs tokens in every session.

The plugin names say how general a standard is: `universal-` holds everywhere,
`craft-` covers a kind of work, `language-` a language, and `tools-` one product. When
two standards apply, the more specific one wins.

## Three plugins of its own

- **The steward** (`marketplace-steward`) docks a project when someone asks, and answers
  questions about the standards. Each person installs it once, at user scope.
- **The base** (`marketplace-base`) runs in every docked project. It holds the index of
  standards, the build-and-test guard, the collector for corrections, and two agents:
  a test runner and a reviewer.
- **The curator** (`marketplace-curator`) runs only in this repo. It turns a lesson or
  a collected correction into a change on a pull request, and a person merges it.

## Every rule is measured

A rule earns its place only when the model breaks it without the rule. Each skill has
test tasks in [`evals/`](../evals/). `scripts/eval-skill.mjs` runs them with the skill
and without it, several times, and compares the results with `main`:

- A rule that changes the result stays.
- A rule the model already follows is cut, because it costs tokens and changes nothing.
- A change to a skill must not lose what `main` already gets.

[How a skill is measured](measuring.md) has the steps. The results are in
[`measurements/`](../measurements/), and the reason for each decision
is in [`measurements/decisions.md`](../measurements/decisions.md).

## How it grows

1. You correct Claude in a docked project.
2. The base plugin files the correction as an issue on this repo.
3. A curator runs the curator plugin on the issue. It finds where the rule belongs,
   writes the change and measures it.
4. A curator merges the pull request.
5. Every docked project gets the change at its next update.
