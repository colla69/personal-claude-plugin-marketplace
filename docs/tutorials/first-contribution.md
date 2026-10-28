# Your first contribution

Follow one lesson from a project to the marketplace, and watch each safeguard on the
way: the collector, the diagnosis, the strip test, the checker, the leak check, and a
curator's merge. It uses `tally`, the sample project from [your first
docking](first-setup.md).

**Not yet tried.** This tutorial is written from the plugins' files; the first trials
will run it end to end.

**It files a real issue and opens a real pull request** on the marketplace. Close both
at the end, unless you want the change.

## 1. Before you start

- **`tally`, docked.** If you haven't, do [your first docking](first-setup.md) first.
- **`gh`, signed in**, with `gh auth login`, and allowed to file issues on the
  marketplace's repository.
- **A checkout of the marketplace's repository**, with push rights. Its
  `.claude/settings.json` enables the curator.
- **Branch protection on `main`**, requiring a pull request. The curator pushes only
  `contrib/` branches, and this makes a merge the only way into `main`.

## 2. Have something to learn

In `tally`, add up three amounts that a person would expect to make 0.60:

```bash
node -e "console.log(0.1 + 0.2 + 0.3)"
```

It prints `0.6000000000000001`. Money stored as binary floating-point numbers doesn't
add up exactly. That is a lesson, and not only for `tally`.

## 3. Correct Claude

In a session in `tally`, ask for something that adds money, and when Claude adds it as
floats, correct it:

```
no: amounts of money are never added as floats here. Keep them in whole cents.
```

Close the session, or leave it. The base plugin's collector has already started in the
background: after Claude's answer, Haiku read only what you wrote and what Claude
answered, found the correction, and put it on a list with placeholders for names. Wait
two minutes, then start a new session in `tally`. At its start, the base plugin files
the list as an issue titled "Corrections: …" on the marketplace. Within a minute, it is
in the repository's issues.

If `gh` couldn't file it, the list stays on your machine, and the next session start in
`tally` tries again.

## 4. Work it as a curator

Open a session in your checkout of the marketplace, on a clean working tree, and say:

```
what's in the queue?
```

The curator lists the open issues by topic. Then say "work the corrections issue about
money". Before it writes anything, it places the lesson:

1. **Diagnose.** Did a skill have the rule and never load, or does no skill say it? Here
   nothing says it, and it would hold in any project that handles money.
2. **Strip.** It replaces every name with its role, and keeps a list of what it
   stripped, from the issue, so the leak check can look for it later.
3. **Place.** It finds the layer and the skill that should have said it. A rule like
   this is most likely an extension of an existing skill rather than a new one, because
   extending beats creating.
4. **Ask, if it must.** If its answer is a new skill, it stops and shows you the layer,
   the name, what the skill leaves to others, and the exact public text. Try answering
   "no, extend clean-code instead": that is an overrule, and it carries on with your
   placement and records the case as an example. A change to an existing skill goes
   ahead without asking.

## 5. Watch it write and check

1. **A branch.** It fetches `origin` and makes `contrib/<topic>` off `main`, in your
   checkout, and writes the change there, in the house style.
2. **The checks.** `claude plugin validate .` and the two repo checks must pass.
3. **The drafts.** It writes the commit message, the pull request's title and its
   description into `~/.local/share/marketplace-curator/drafts/<topic>/`, before the
   checker reads anything. The description closes the issue.
4. **The checker.** A separate, read-only agent reads the diff, the commit messages, the
   branch name and the drafts. It runs the house review, and the leak check: does
   anything from the stripped list appear anywhere that will be public?

If the leak check finds something, or couldn't run, the curator stops before the push,
and names the finding. Nothing is public yet.

## 6. Read the pull request

With the leak check clean, it pushes the branch and opens the pull request, or gives
you the link. Any other finding the checker still had after two rounds is in the
description, under its verdict. Read it the way you would anyone's:

| Look at | Ask |
|---|---|
| The change | Does it say the rule once, with its reason, in the skill that should hold it? |
| The placement | Is that the right skill, and the right layer? |
| The assumptions | What did the curator's session have to decide that nobody told it? |
| The checker's verdict | Is anything still open? |
| The text | Is there anything in it that points back to `tally`? |
| The docs | Does the change make a page wrong? The map's Sources column names the pages each changed file feeds |

Close it, delete its `contrib/` branch on GitHub, and close the issue, if you only
wanted to see the flow. Merge it if you want the rule.

## 7. Afterwards

- **The project part.** If the lesson had a part that is only true for `tally`, ask a
  session in `tally` to put it in its `CLAUDE.md`. The curator doesn't touch projects.
- **The other projects.** After a merge, every docked project picks the change up by
  itself.
- **Your overrule.** If you moved the lesson somewhere else in review, say so in the
  pull request. The case becomes an example of where the placing rules ran out.

## Where to go next

- [Contribute a lesson](../guides/contribute-a-lesson.md), for the everyday version of
  this.
- [Placing knowledge](../explanation/placing-knowledge.md), for why it diagnosed and
  stripped first.
- [Safety](../explanation/safety.md), for every guard you saw, and the ones you didn't.
