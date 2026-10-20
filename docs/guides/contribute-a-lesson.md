# Contribute a lesson

Turn something a project taught you into a change to the marketplace, so every other
project gets it: a skill that got something wrong, a rule worth having everywhere, or a
new skill. Why the steward diagnoses and strips a lesson first is in
[placing knowledge](../explanation/placing-knowledge.md).

**Not yet tried on real projects.** This guide follows the steward's procedures; the
first trials will show where it behaves otherwise.

## Before you start

- **Push rights to the marketplace's GitHub repository**, and git set up to push over
  SSH or HTTPS. For now the maintainer is the only contributor, so contributions are
  branches in the maintainer's repository.
- **`gh`, signed in**, if you want the steward to open the pull request. Without it, the
  steward gives you a link to open it yourself.
- **Branch protection on `main`**, as [permissions](../reference/permissions.md)
  explains, so your merge is the only way in.

## Steps

1. **Tell the steward the lesson, in the project where you learned it.** "The review
   skill should have caught that we compare money as floats." "Make this a marketplace
   skill: how we reconcile a report with the previous month." Say what happened, not
   what the fix should look like.
2. **Answer, if it asks.** It diagnoses the lesson first. If a skill never loaded
   because of the project's setup, it fixes the setup and stops; if the skill's
   description didn't match your words, that is a change to the skill, and it goes on.
   If the lesson needs a new skill, it shows you the layer, the name, what the skill
   leaves to others and the exact public text, and waits for your OK. A change to an
   existing skill goes ahead without asking.
3. **Let it work.** It writes the change in its own clone, on a `contrib/` branch, with
   every name from your project replaced by its role. The checker reviews it, and its
   leak check looks for anything from your project in what would go public. On a leak,
   or a leak check that couldn't run, the procedure asks the steward to stop before
   anything is pushed.
4. **Review the pull request.** Read it as you would anyone's: the change, the
   placement, the judgements the steward had to assume, and the checker's verdict. A
   rename or a removal carries its migration. Then the docs: the steward never reads
   them, so check whether the change makes a page wrong. The map's Sources column names
   the pages each changed file feeds.
5. **Merge, or change it.** If you move the lesson somewhere else in review, tell the
   steward, and the case becomes an example of where its rules ran out.
6. **Update your projects.** After the merge, "update the setup" in each project picks
   the change up.

## A no

| You say | It does |
|---|---|
| "No, extend X instead" | Places the lesson there, carries on, and records the case as an example |
| "No" | Stops. In a project it set up, the record notes the skill as declined, and it isn't proposed again |

## The project part

When a lesson also holds something only true in your project, such as which client uses
which export, the steward writes that part into the project's `CLAUDE.md` straight away.
It doesn't wait for the merge, because it is already true there.

## Where things are

| Thing | Where |
|---|---|
| The clone | `~/.local/share/marketplace-steward/clone/` |
| The change while it is worked on | `~/.local/share/marketplace-steward/worktrees/<topic>/`, removed after the push |
| Its commit message, title and description | `~/.local/share/marketplace-steward/drafts/<topic>/` |

When a job stops, after a leak or a failed push, the report gives the worktree's path,
and the change is still there for you to look at.
