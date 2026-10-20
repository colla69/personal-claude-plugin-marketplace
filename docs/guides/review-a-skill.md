# Review a skill

Get a skill, a role template, a plugin, a change, or the whole set of skills reviewed
against the house standard, and read the result. The review is `evaluate-skills`, the
same one the steward's checker runs before every pull request.

## Steps

1. **Open a session in a checkout of the marketplace**, with the steward installed or
   loaded:

   ```bash
   claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/craft-review
   ```

   `craft-review` comes along because the steward depends on it, and a plugin whose
   dependency is missing doesn't load at all.
2. **Ask:** "is this skill well written?", "why isn't `vue-conventions` triggering?",
   "is `craft-refactoring` ready to merge?", "review my change to `clean-code`", or
   "how do the skills fit together?". The first time, Claude Code asks whether the skill
   may read its own files.
3. **Read the report.**

## What it looks at

| You ask about | It checks |
|---|---|
| A skill | Whether its description wins the prompts it is for and stays quiet on others; the cut; one home per rule; that every skill it names is declared; its opening, the cost of each rule, its yield, its size |
| A role template | That it restates no skill, names a specific failure mode, enforces its lane in frontmatter, and keeps the stop |
| A plugin | That it loads in the right shape, fires, what it costs, and whether it changes anything |
| A change | All of the above for what it touches, plus the leak check |
| The whole set | A map: every skill's layer, every reference and its dependency, every rule stated twice, every pair of descriptions that compete |

It runs the instruments first: `claude plugin validate`, the token estimate,
`check-catalog.mjs`, and the plugin's evals with and without it, where there are any.

## The report

It uses `review-work`'s shape, sorted by what a finding does at runtime:

| Section | Holds |
|---|---|
| **Blocking** | What changes behaviour: a skill that won't fire or fires where it shouldn't, a rule with two homes, a lane missing from frontmatter, an undeclared skill, a leak, a renamed plugin with no migration |
| **Should fix** | What degrades it: no yield, rules without a reason, a skill across two layers |
| **Consider** | Wording, order and length, and the house style where a file departs from it the way the rest of the repo does |
| **Verified** | What it checked and found right |

Only the first two justify editing prose that works. When a skill is sound, the report
says so and what was checked, and stops.

## Without the steward

Anyone can review by hand against the same two files the review quotes:
[`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) for
the writing, and
[`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md)
for the cut.
