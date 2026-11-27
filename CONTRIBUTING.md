# Contributing

Every change reaches `main` through a pull request that a curator merges. Most changes
start as an issue that the base plugin filed from a correction in a docked project.

## The bar

A standard is worth adding when you would apply it again, on another project, months
from now. One task is a prompt, not a standard. A rule stays only when a measurement
shows the model breaks it without the rule, because every installed skill costs tokens
in every session.

## Two ways in

- **Through the curator.** Open a session in this repo and say "work issue 12" or "turn
  this lesson into a rule". The `curate` skill finds where the rule belongs, writes and
  measures the change, and opens the pull request.
- **By hand.** Read
  [`place-knowledge.md`](plugins/marketplace-curator/references/place-knowledge.md) to
  decide where the rule goes, and
  [`style.md`](plugins/marketplace-curator/references/author-skills/style.md) for how
  it is written.

## Try and measure

```bash
claude --plugin-dir ./plugins/<name>           # load your working copy
node scripts/eval-skill.mjs <plugin>           # its lift against main
node scripts/eval-skill.mjs <plugin> --decide  # the stored run, before the pull request
```

[`CLAUDE.md`](CLAUDE.md) lists the other commands.

## Before you push

```bash
claude plugin validate .
node scripts/check-catalog.mjs
node scripts/check-docs.mjs
```

All three must pass. `claude plugin validate` warns "no version specified" and "no
description provided" for each plugin. Both are the policy. CI runs all three on every
pull request.

When you change a skill's description or its `evals/<plugin>/triggers.json`, also run
`node scripts/check-triggers.mjs`. It checks that every skill loads on its prompts and
stays quiet on the rest. It calls the model, about $49 for a full run, so CI doesn't
run it.

The repo is public. Search your change for the names of your clients, colleagues and
private projects before you push.

## Commits

One plugin or one standard per commit. The message says what judgement changed, and
why.
