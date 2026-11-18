# How a skill is measured

A skill stays only while it changes what the model does. Its description costs tokens
in every session, so a rule the model already follows is cut.

## Cases and graders

Each skill plugin has test cases in [`evals/<plugin>/`](../evals/). A case is a task,
such as "add express shipping to this checkout", and its graders. Each grader checks one
rule in the result, usually with a model as judge.

## Lift

Lift is how much more often the graders pass with the skill than without it.
`scripts/eval-skill.mjs` runs every case in two arms, with the plugin and without it,
several times each, and prints a table per case and per grader.

- **Keep a rule** when its grader passes in 2 or more runs more with the skill than
  without. One run is noise.
- **Cut a rule** that doesn't.
- **Read the failing runs** (`--fails`) before a verdict. A judge can fail a right
  answer.

The `skill-fired` grader shows whether the skill loaded. It is an indicator, not part of
the score.

## The steps

| Step | Command | Runs | Stores |
|---|---|---|---|
| Probe a new rule without the skill | `node scripts/eval-skill.mjs <plugin> --probe` | 3 | Nothing |
| Measure while working | `node scripts/eval-skill.mjs <plugin>` | 3 | Nothing |
| Decide, before the pull request | `node scripts/eval-skill.mjs <plugin> --decide` | 5 | One line |

A probe flags a case that already scores 0.8 or more without the skill. Rewrite it or
drop it, because it can't show a lift. The working run compares with the last stored
line for `main` or, with none, runs `main` now. A change must not lose what `main`
already gets.

`--decide` refuses uncommitted changes to the plugin or its cases. It stores one line
in [`measurements/results.jsonl`](../measurements/results.jsonl). The maintainer then
writes the reading into [`verdicts.md`](../measurements/verdicts.md), and the decision
and its reason into [`decisions.md`](../measurements/decisions.md).

## Cost

A large skill such as `universal-clean-code` costs about $9 for 3 runs, and about twice
that when `main` has to run too. The report prints the total. `--max-cost` caps each
engine call: $3 while working, $10 with `--decide`.
