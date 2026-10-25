---
name: {{TASK}}
description: Runs {{WHAT_THE_TASK_DOES}} in this project in steps — a plan, your OK, the work, and a check against the plan. Start it with `/{{TASK}}` when the task deserves a plan and a check.
disable-model-invocation: true
---

# {{TASK}}

This task runs as a trio. `{{TASK}}-plan` proposes, the user accepts, `{{TASK}}-do`
carries out the accepted plan, and `{{TASK}}-check` compares the result with it. The
stop after the plan is the point of the pattern: without it, Do carries out a plan
nobody agreed to, and Check checks against it.

## Run it

1. **Plan.** Hand the request to `{{TASK}}-plan`. It returns a plan and changes nothing.
2. **Stop for the user's OK.** Show the plan as it came back, and wait. Answers to its
   questions, and any correction, go back to `{{TASK}}-plan` for a new version. Only an
   explicit OK moves on; a question is not one.
3. **Do.** Hand `{{TASK}}-do` the accepted plan word for word, with any change the
   user made. If Do returns a disagreement instead of the work, take it to the user:
   their answer amends the accepted plan, and goes back to Do.
4. **Check.** Hand `{{TASK}}-check` the accepted plan and Do's report.
5. **Back to Do, if needed.** When Check says "back to Do", hand Do Check's list. Then
   hand Check Do's new report, and tell it to cover only the items sent back and what
   the fix touched: checking the rest again repeats the first round at full cost. If the
   only gaps are wording or layout that change no plan item's meaning, Do fixes them and
   the run ends without another check; the report says which fixes nobody checked. After
   two rounds that still don't match, stop and show the user both reports rather than
   starting a third.

**Send everything that goes back to an agent with SendMessage, to the agent that ran
before.** It still holds what it read, so it doesn't read the project again. Start a new
run, with the plan and what came back, only when the agent can't be continued.

## Report

```
## {{TASK}} — <the request, in one line>

**Plan:** <accepted, with the user's changes if any>
**Done:** <Do's plan items, one line each>
**Check:** <matches the plan / matches, with cosmetic fixes not re-checked / the gaps
still open after two rounds>

### Outside the plan
<What Check found that the plan never covered, for the next plan.>

### Needs a decision
<What Do or Check could not resolve alone.>
```

Leave out a section that would be empty.

## Where this yields

- **To the user.** They can stop the run at any step, or change the plan before Do.
- **To the project.** A rule in `CLAUDE.md` about how this task runs wins over this
  file.
