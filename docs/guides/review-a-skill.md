# Review a skill

Get a skill, an agent, a plugin, a change, or the whole set of skills reviewed against
the house standard, and read the result. The review is `evaluate-skills`, in the
curator plugin, the same one the curator's checker runs before every pull request.

## Steps

1. **Open a session in a checkout of the marketplace.** Its `.claude/settings.json`
   enables the curator, from `main`. To review with your working copy of the curator
   instead:

   ```bash
   claude --plugin-dir ./plugins/marketplace-curator --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english
   ```

   `craft-review` and `language-simple-english` come along because the curator
   depends on them, and a plugin whose dependency is missing doesn't load at all.
2. **Ask:** "is this skill well written?", "why isn't `vue-conventions` triggering?",
   "is `craft-refactoring` ready to merge?", "review my change to `clean-code`", or
   "how do the skills fit together?". The first time, Claude Code asks whether the skill
   may read its own files. For a change you wrote yourself, ask for the
   `change-reviewer` agent instead: it runs the same review without the evals, in a
   context of its own, so the reviewer isn't the writer.
3. **Read the report.**

## What it looks at

| You ask about | It checks |
|---|---|
| A skill | Whether its description wins the prompts it is for and stays quiet on others; the cut; one home per rule; that every skill it names is declared; its opening, the cost of each rule, its yield, its size |
| An agent | That it restates no skill, names a specific failure mode, enforces its lane in frontmatter, and names its model by the kind of work |
| A hook | That it returns fast, does nothing where it isn't wanted, can't trap a session, and says what it sends off the machine |
| A plugin | That it loads in the right shape, fires, what it costs, and whether it changes anything |
| A change | All of the above for what it touches, plus the leak check, which needs the source project's names from you: without them, it hasn't run |
| The whole set | A map: every skill's layer, every reference and its dependency, every rule stated twice, every pair of descriptions that compete |

It runs the instruments first: `claude plugin validate`, the token estimate,
`check-catalog.mjs`, and the plugin's evals with and without it, where there are any.

## The report

It uses `review-work`'s shape, sorted by what a finding does at runtime:

| Section | Holds |
|---|---|
| **Blocking** | What changes behaviour: a skill that won't fire or fires where it shouldn't, a rule with two homes, a lane missing from frontmatter, an undeclared skill, a leak, a renamed plugin with no migration |
| **Should fix** | What degrades it: no yield, rules without a reason, a skill across two layers, a report that asks for more than its reader acts on |
| **Consider** | Wording, order and length, and the house style where a file departs from it the way the rest of the repo does |
| **Verified** | What it checked and found right |

Only the first two justify editing prose that works. When a skill is sound, the report
says so and what was checked, and stops.

## By hand

Anyone can review by hand against the same three files the review quotes:
[`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) for
the writing,
[`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md)
for the cut, and
[`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md)
for a plugin's files, dependencies and registrations.
