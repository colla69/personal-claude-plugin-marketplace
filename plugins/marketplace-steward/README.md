# marketplace-steward

**Draft, being built.** It is not ready to install. The steps are in
`docs/werkstatt/package-plan.md`, and until they are done, `marketplace-init` sets
projects up.

What a project teaches should reach the next project. The steward is one package for
the whole cycle: it sets a project up, adopts the setup a project already has, keeps
that setup current, and turns lessons into changes to the marketplace, by pull request.

| | |
|---|---|
| Skills | `evaluate-skills`. The front door comes later |
| References | `place-knowledge.md`, and `author-skills/` with the style guide, the plugin shape and the templates |
| Agents | None yet. The cartographer and the contribution checker come later |
| Layer | None: it works on the marketplace itself |
| Builds on | `craft-review` |

## What is here so far

- **`references/place-knowledge.md`**: where a lesson from a project belongs. Diagnose
  the cause, strip the project out of it, find its layer, and know when the call is the
  user's.
- **`references/author-skills/`**: the house voice, the shape of a plugin and its three
  registrations, and the templates.
- **`skills/evaluate-skills/`**: the checks on a skill, a role template, a plugin, a
  change, and the whole set, including the leak check before a pull request.

## Fires when

- "is this skill well written?", "why isn't this skill firing?"
- "is this plugin ready?", or a change to the marketplace needs a review
- Before a pull request to the marketplace

## Leaves to others

- **What makes a finding at all.** `craft-review:review-work`.
- **Setting projects up**, until the steward does it. `marketplace-init`.
