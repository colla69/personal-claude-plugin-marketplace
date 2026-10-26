# Contribute a lesson

Turn something a project taught you into a change to the marketplace, so every other
project gets it: a skill that got something wrong, a rule worth having everywhere, or a
new standard. Most lessons arrive by themselves, as issues; this guide is for the
curators who work them. Why a lesson is diagnosed and stripped first is in [placing
knowledge](../explanation/placing-knowledge.md).

**Not yet tried on real issues.** This guide follows the curator's procedure; the first
trials will show where it behaves otherwise.

## How a lesson arrives

| From | How |
|---|---|
| Anyone working in a docked project | They correct Claude. At the end of the session, the base plugin files the corrections as an issue titled "Corrections: …" |
| A docking | The tidy found a rule that would serve other projects, and filed it as an issue |
| A curator | They describe it in a session in the marketplace's repository |

Nobody has to do anything for the first two. A correction is not yet a standard: it may
be one person's taste, and the curators decide.

## Before you start

- **A checkout of the marketplace's repository**, with push rights. The curator plugin
  is enabled in its `.claude/settings.json`, so a session there has it.
- **`gh`, signed in**, to read the issues and open the pull request. Without it, the
  curator gives you a link to open it yourself.
- **Branch protection on `main`**, as [permissions](../reference/permissions.md)
  explains, so a merge is the only way in.

## Steps

1. **Open a session in the checkout**, on a clean working tree, and say "what's in the
   queue?" to see the open issues grouped by topic, or "work issue 12", or describe a
   lesson. Say what happened, not what the fix should look like.
2. **Answer, if it asks.** It diagnoses each lesson first. A lesson that is only true in
   one project, a fact about a machine, or one person's taste changes nothing here: it
   proposes a closing comment, and closes the issue only on your yes. A lesson that
   needs a new skill or a new team plugin waits for your OK on the layer, the name,
   what it leaves to others and the exact public text. A change to an existing skill
   goes ahead without asking.
3. **Let it work.** It writes the change on a `contrib/` branch, with every name from
   the source replaced by its role, and runs the three checks. The checker reviews it,
   and its leak check looks for anything from the source in what would go public. On a
   leak, or a leak check that couldn't run, it stops before anything is pushed.
4. **Review the pull request.** Read it as you would anyone's: the change, the
   placement, the judgements it had to assume, and the checker's verdict. A rename or a
   removal carries its migration. The pull request closes the issues it answers.
5. **Merge, or change it.** If you move the lesson somewhere else in review, say so, and
   the case becomes an example of where the placing rules ran out.

After the merge, every docked project picks the change up by itself.

## A no

| You say | It does |
|---|---|
| "No, extend X instead" | Places the lesson there, carries on, and records the case as an example |
| "No" | Stops, and proposes a closing comment for the issue |

## Where things are

| Thing | Where |
|---|---|
| The change while it is worked on | A `contrib/<topic>` branch in your checkout |
| Its commit message, title and description | `~/.local/share/marketplace-curator/drafts/<topic>/`, outside the checkout |
| Corrections that couldn't be filed | On the machine they came from, in the base plugin's data folder, retried at its next session start |
