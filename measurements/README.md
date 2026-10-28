# Measurements

What the marketplace's checks keep. Raw eval output stays out of git, in
`plugins/*/evals/results/`; one summary line per suite run is kept here.

| File | Holds | Written by |
|---|---|---|
| `results.jsonl` | One line per suite run: date, commit, suite, both model IDs, `claudeVersion`, runs, ablation, scores per run for every case, cost, duration, `partial` | `node scripts/eval-skill.mjs <plugin> --decide`, or `scripts/eval-summary.mjs --append` |

Compare two results with `node scripts/eval-compare.mjs <before> <after>`. A result is
a file from `claude plugin eval --json` or a line of `results.jsonl`, named as
`measurements/results.jsonl:<n>`.

A line with `"partial": true` is kept for the cost record and never used for a decision.
