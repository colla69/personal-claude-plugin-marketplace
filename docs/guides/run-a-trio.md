# Run a trio

Use one of your project's trios, such as `/change`, from request to checked result.
What each role does, and why the run stops after Plan, is in
[trios](../explanation/trios.md).

**Not yet tried on real projects.** This guide follows the role templates and the run
skill the steward writes; the first trials will show where a run behaves otherwise.

## Steps

1. **Ask with the command.** Run `/<task>` with your request, such as `/change add a
   dark mode toggle to the settings page`. Only the command starts a trio: when you
   just ask for the work, or are still thinking it through, the session answers and
   does the work itself, without a plan or agents. Use the command when the task
   deserves a plan and a check.
2. **Read the plan.** Plan reads what the task touches and returns a plan with its
   items, each saying what changes, in which files, and how anyone can tell it is done.
   It also lists its questions, its assumptions, and what it deliberately left out.
   Nothing has changed yet.
3. **Answer, correct, or accept.**
   - Answer its questions, or correct an item: the plan goes back to Plan, which still
     holds what it read, for a new version.
   - Say OK when it is right. The run asks for an explicit OK before Do starts; a
     question is not one.
4. **Let Do work.** Do carries out the plan you accepted, word for word. If it disagrees
   with an item, it stops before touching anything and tells you; your answer amends the
   plan, and goes back to Do.
5. **Read the check.** Check compares the result with the accepted plan, item by item,
   starting from what Do changed.
   A gap goes back to Do. A problem the plan never covered goes to you, for the next
   plan.

## The report

| Section | Holds |
|---|---|
| **Plan** | The plan as you accepted it, with your changes |
| **Done** | How many items are done, and each one not done or different |
| **Check** | Whether the result matches the plan, or the gaps still open |
| **Outside the plan** | What Check found that the plan never covered |
| **Needs a decision** | What Do or Check couldn't settle alone |

## When it loops

When Check sends the work back, Do gets Check's list, and Check looks again, but only
at the items it sent back and what the fix touched. Both are continued, not started
again, so neither reads the project a second time. If the only gaps
were wording or layout that change no plan item's meaning, Do fixes them, the run ends
without another check, and the report says which fixes nobody checked. After two
rounds that still don't match, the run stops and shows you both reports, instead of
spending credits on a third. Decide there: amend the plan, accept the result as it is,
or start over.

## Stopping and steering

You can stop a run at any step, or change the plan before Do starts. A rule in the
project's `CLAUDE.md` about how a task runs wins over the trio's own skill, so a project
that always wants, say, a migration check in its plans can say so there.
