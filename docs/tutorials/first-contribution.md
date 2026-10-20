# Your first contribution

Give a lesson from a project back to the marketplace, and watch each safeguard on the
way: the diagnosis, the strip test, the checker, the leak check, and your merge. It uses
`tally`, the sample project from [your first setup](first-setup.md), and step 1 makes it
if you don't have it.

**Not yet tried.** This tutorial is written from the steward's procedures; the first
trials will run it end to end.

**It opens a real pull request** on the marketplace. Close it at the end, unless you
want the change.

## 1. Before you start

- **Push rights** to the marketplace's GitHub repository, with git able to push over SSH
  or HTTPS.
- **`gh`, signed in**, with `gh auth login`. Without it the steward gives you a link to
  open the pull request yourself, and the tutorial still works.
- **Branch protection on `main`**, requiring a pull request. The steward pushes only
  `contrib/` branches, and this makes your merge the only way into `main`.
- **The steward and `tally`.** If you did your first setup, both are there. If not:

  ```bash
  claude plugin marketplace add colla69/personal-claude-plugin-marketplace
  claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
  mkdir tally && cd tally && git init -q && npm init -y > /dev/null
  mkdir src
  printf 'export const tally = (amounts: number[]) =>\n  amounts.reduce((s, a) => s + a, 0)\n' > src/tally.ts
  git add -A && git commit -qm "A tiny tally tool"
  ```

  Then start Claude Code in `tally` and say "set this project up", as in step 3 of
  your first setup.

## 2. Have something to learn

In `tally`, add up three amounts that a person would expect to make 0.60:

```bash
node -e "console.log(0.1 + 0.2 + 0.3)"
```

It prints `0.6000000000000001`. Money stored as binary floating-point numbers doesn't
add up exactly. That is a lesson, and not only for `tally`.

## 3. Tell the steward

In a session in `tally`, say what happened, not what the fix should be:

```
the skills should have warned us: tally adds money as floats, and 0.1 + 0.2 + 0.3
came out as 0.6000000000000001
```

## 4. Watch it place the lesson

The steward places the lesson before it writes anything:

1. **Diagnose.** Did a skill have the rule and never load, or does no skill say it? Here
   nothing says it, and it would hold in any project that handles money.
2. **Strip.** It replaces every name with its role. "`tally` adds money as floats"
   becomes "an amount of money stored as a binary floating-point number". The project's
   name, `tally`, goes on its list of what was stripped, so the leak check can look for
   it later.
3. **Place.** It finds the layer and the skill that should have said it. A rule like
   this is most likely an extension of an existing skill rather than a new one, because
   extending beats creating.
4. **Ask, if it must.** If its answer is a new skill, it stops and shows you the layer,
   the name, what the skill leaves to others, and the exact public text. Try answering
   "no, extend clean-code instead": that is an overrule, and it carries on with your
   placement and records the case as an example. A change to an existing skill goes
   ahead without asking.

## 5. Watch it write and check

1. **Its own clone.** The first time, it clones the marketplace into
   `~/.local/share/marketplace-steward/clone/`; Claude Code asks once for that. Your own
   checkout of the marketplace, if you have one, is never touched.
2. **A worktree.** It makes `worktrees/<topic>/` on a new `contrib/<topic>` branch off
   `main`, and writes the change there, in the house style.
3. **The drafts.** Once `claude plugin validate` and the two repo checks pass on the
   worktree, it writes the commit message, the pull request's title and its description
   into `drafts/<topic>/`, before the checker reads anything.
4. **The checker.** A separate, read-only agent reads the diff, the commit messages, the
   branch name and the drafts. It runs the house review, and the leak check: does
   `tally`, or anything else from the stripped list, appear anywhere that will be
   public?

If the leak check finds something, or couldn't run, the procedure asks the steward to
stop before the push, and to name the finding and the worktree in its report. Nothing is
public yet.

## 6. Read the pull request

With the leak check clean, it pushes the branch and opens the pull request, or gives
you the link. Any other finding the checker still had after two rounds is in the
description, under its verdict. Read it the way you would anyone's:

| Look at | Ask |
|---|---|
| The change | Does it say the rule once, with its reason, in the skill that should hold it? |
| The placement | Is that the right skill, and the right layer? |
| The assumptions | What did the steward have to decide that you didn't tell it? |
| The checker's verdict | Is anything still open? |
| The text | Is there anything in it that points back to `tally`? |
| The docs | Does the change make a page wrong? The map's Sources column names the pages each changed file feeds |

Close it, and delete its `contrib/` branch on GitHub, if you only wanted to see the
flow. Merge it if you want the rule.

## 7. Afterwards

- **The project part.** If the lesson had a part that is only true for `tally`, the
  steward already wrote it into `tally`'s `AGENTS.md`.
- **The other projects.** After a merge, say "update the setup" in each project, and
  the change arrives.
- **Your correction.** If you moved the lesson somewhere else in review, tell the
  steward. The case becomes an example of where its rules ran out, and the next lesson
  is placed better.

## Where to go next

- [Contribute a lesson](../guides/contribute-a-lesson.md), for the everyday version of
  this.
- [Placing knowledge](../explanation/placing-knowledge.md), for why it diagnosed and
  stripped first.
- [Safety](../explanation/safety.md), for every guard you saw, and the ones you didn't.
