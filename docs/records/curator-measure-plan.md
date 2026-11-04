# Teach the curator to measure: plan

The cleanup and the shipping plan of 2026-11-04 were done by hand: measure each rule,
keep what shows lift, cut the rest, record it. That is curation, so it belongs to
`marketplace-curator`. Today the curator only judges prose, and names the ablation as
one command among five.

**Status:** approved 2026-11-04, on branch `feature/measurement-plan`.

---

## 1. The method, as it worked

1. **Rules are candidates.** A new rule, a new skill, or an existing one under audit:
   each rule is tested on its own. The rules also go in the description, because the
   description is often all that loads.
2. **One case, a grader per rule.** One fixture can carry several graders. Each grader
   gets a good and a bad probe. An LLM grader judges the reply, so the prompt asks for
   the answer in the reply, not in a file.
3. **Check the sandbox first** for a rule about asking before acting: the eval does not
   load the user's `CLAUDE.md`, so both arms start equal.
4. **One run, with and without, 5 runs each.** The outputs of every run are kept in a
   folder of their own, so a surprising number can be read afterwards.
5. **Read the failing runs before a verdict.** An LLM judge can be wrong on a plain
   answer: in the rerun of the launch check, a reply that opened "Not ready to launch"
   failed `not-ready` on two of three judge votes.
6. **Keep a rule at +2 or more out of 5. Cut the rest.** A difference of one is noise.
   Never measure again after a cut.
7. **A rule no case covers does not enter a new skill.** In an audit of an existing
   skill, the curator asks.
8. **Record it.** A row in `measurements/verdicts.md`, a decision in `decisions.md`, a
   Renamed row for a removal, and every file that named a cut rule or a removed skill.
9. **Phases with a cost.** Say the estimate before a run, and the real cost after. Each
   phase waits for the curator's go.

## 2. Where it goes

| Step | Change |
|---|---|
| 1 | New `references/measure.md` in the curator: the method above, in house style, with the commands |
| 2 | `contribute.md`: a "Measure" step between Write and Check. A change that adds or changes a rule is measured before its pull request |
| 3 | `evaluate-skills`: "Does it change anything" points to `measure.md`; the ablation stops being one command among five |
| 4 | `curate`: a new job, "audit the set": `skill-audit.mjs` gives the order, `measure.md` the method |
| 5 | `scripts/eval-skill.mjs`: print passes per grader and arm, as the hand script did, and keep each run's output in its own folder |
| 6 | Docs: the curator's README, and the pages the map's Sources column names for these files (`contribute-a-lesson.md`, `review-a-skill.md`, `the-steward.md` reference, `first-contribution.md`, `cost.md`); a decision row |

Each step is one commit. Then the `change-reviewer` agent reviews the whole change.

## 3. Open

- **Step 5 is code.** It could also stay a scratch script. Recommendation: put it in
  `eval-skill.mjs`, because the curator can only run what the repo ships.
- **Measuring the curator itself.** Not planned: the steward was never measured
  either, by decision.
