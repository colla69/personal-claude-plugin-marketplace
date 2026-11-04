# Measure

A rule earns its place by changing what the model does. Most rules don't: the model
already follows them, and the rule only costs tokens in every session. A rule that
reads well tells you nothing. So no rule enters the marketplace, and no rule stays in
it, without a run that shows the model breaks it when the rule is missing.

This file is the method. Read it before you add a rule, change one, or go through the
skills that exist. Commands run from the root of this checkout.

## Contents

- [1. Rules are candidates](#1-rules-are-candidates)
- [2. Write the case](#2-write-the-case)
- [3. Check before you pay](#3-check-before-you-pay)
- [4. Run it once](#4-run-it-once)
- [5. Read, then decide](#5-read-then-decide)
- [6. Record it](#6-record-it)
- [7. Audit the set](#7-audit-the-set)
- [Where this yields](#where-this-yields)

## 1. Rules are candidates

Test each rule on its own, not the skill as a whole. A skill with one rule that works
and five that don't shows a lift, and the five ride along for free.

Put every rule in the description too, not only in the body. In a run, the skill
often never loads, and the description is all the model sees.

## 2. Write the case

One case is a fixture, a prompt and graders, in `evals/<plugin>/<case>/`. One fixture
can carry several rules, with **one grader per rule**: a grader that checks two rules
can't tell you which one carries the lift.

- **A fixture where the rule matters.** Plant the thing the rule is about: a key in the
  code, a README that disagrees with it, a folder with nothing in it.
- **An LLM grader judges the reply**, never a file: it takes no `target`. So the prompt
  asks for the answer in the reply.
- **A good and a bad probe for every grader**, in `probes/<grader>.good.x.md` and
  `probes/<grader>.bad.x.md`: a short answer that passes and one that fails.
- **A rule about asking before acting** passes in both arms if the run sees a
  `CLAUDE.md` that already says "ask first". The eval doesn't load the user's own
  `CLAUDE.md`; check that a fixture doesn't plant one.

## 3. Check before you pay

- `node scripts/grader-probe.mjs <plugin>` tries every regex grader against its
  probes. It costs nothing. A grader that passes the bad probe measures nothing.
- `node scripts/eval-skill.mjs <plugin> --probe` runs the cases without the skill, at
  three runs. A case the model already passes can't show a lift: rewrite it or drop it.

## 4. Run it once

```bash
node scripts/eval-skill.mjs <plugin> --runs 5 --fails --allow-tools <tools>
```

It runs every case with and without the skill, five runs each, and prints the passes
per grader. Give the tools the case needs; the default is only `Write,Edit`.

- **Say the cost before the run.** About $1 for one case at five runs per arm. A plan
  of several runs goes in phases, and each phase waits for the curator's go.
- **Every run's output is kept**, in a new folder the script names. A number you
  can't explain later is a number you pay for twice.
- **Never run it again after a cut.** A second run that hopes for a different number
  is the cost of the first one, paid again.

## 5. Read, then decide

Before a verdict, read the failing runs that `--fails` prints. An LLM judge can fail a
plain right answer: one failed a reply that opened "Not ready to launch" on a grader
that asked for exactly that verdict. Count a run like that as passed, and say so.

Then decide each rule on its own:

| With the skill, against without | Verdict |
|---|---|
| Two or more runs out of five better | Keep the rule |
| One run better, the same, or worse | Cut the rule. One run is noise |
| No grader checks it | It doesn't enter a new skill. In an existing skill, ask the curator |

A skill with no rule left is removed, and so is a plugin with no skill left.

## 6. Record it

In the same change:

- **A row in `measurements/verdicts.md`**: the case, the passes in each arm, and what
  was kept or cut.
- **A decision in `docs/explanation/decisions.md`**, with the numbers as its reason.
- **For a removal, a row in "Renamed and removed"** in
  `plugins/marketplace-steward/references/catalog.md`, saying it was measured. The
  steward then knows the subject is covered on purpose, and recommends no outside
  plugin for it.
- **Every file that names what was cut.** Grep for the rule and the skill name: a skill
  that points at a cut rule sends the model looking for something that isn't there.
- **The cost**, in the report: the estimate and what the run cost.

## 7. Audit the set

To go through the skills that exist, `node scripts/skill-audit.mjs` lists them in the
order to measure them, by cost and by what is known. Take one skill at a time, through
sections 2 to 6, and report after each. The marketplace's own plugins are not measured
this way.

## Where this yields

- **To the curator.** A verdict is advice; the curator can keep a rule the numbers
  don't support, and the decision then says why.
- **To `place-knowledge.md`** on where a kept rule goes, and to
  `author-skills/style.md` on how it is written. This file decides only whether it
  goes in.
