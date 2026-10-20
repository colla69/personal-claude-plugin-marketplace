# Run a trio

Use one of your project's trios, such as `/change`, from request to checked result.
What each role does, and why the run stops after Plan, is in
[trios](../explanation/trios.md).

**Not yet tried on real projects.** This guide follows the role templates and the run
skill the steward writes; the first trials will show where a run behaves otherwise.

## Steps

1. **Ask.** Run `/<task>` with your request, or just ask for the work: each trio's skill
   fires on the phrases for its task. "Add a dark mode toggle to the settings page" runs
   `/change` in a project that has one.
2. **Read the plan.** Plan reads what the task touches and returns a plan with its
   items, each saying what changes, where, and how anyone can tell it is done. It also
   lists its questions, its assumptions, and what it deliberately left out. Nothing has
   changed yet.
3. **Answer, correct, or accept.**
   - Answer its questions, or correct an item: the plan goes back to Plan for a new
     version.
   - Say OK when it is right. The run asks for an explicit OK before Do starts; a
     question is not one.
4. **Let Do work.** Do carries out the plan you accepted, word for word. If it disagrees
   with an item, it stops before touching anything and tells you; your answer amends the
   plan, and Do runs again.
5. **Read the check.** Check compares the result with the accepted plan, item by item.
   A gap goes back to Do. A problem the plan never covered goes to you, for the next
   plan.

## The report

| Section | Holds |
|---|---|
| **Plan** | The plan as you accepted it, with your changes |
| **Done** | Do's items, one line each |
| **Check** | Whether the result matches the plan, or the gaps still open |
| **Outside the plan** | What Check found that the plan never covered |
| **Needs a decision** | What Do or Check couldn't settle alone |

## When it loops

When Check sends the work back, Do gets the plan and Check's list, and Check looks
again. After two rounds that still don't match, the run stops and shows you both
reports, instead of spending credits on a third. Decide there: amend the plan, accept
the result as it is, or start over.

## Stopping and steering

You can stop a run at any step, or change the plan before Do starts. A rule in the
project's `AGENTS.md` about how a task runs wins over the trio's own skill, so a project
that always wants, say, a migration check in its plans can say so there.
