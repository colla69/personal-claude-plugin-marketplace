# Safety

What keeps you in control while the steward and the trios work, and why each guard is
there. Read this before you run the steward on a project you care about, or before you
let it open pull requests on your marketplace.

**Not yet tried on real projects.** The guards are described as the steward's files
set them out; the first trials will show where it behaves otherwise.

> "The developer makes a branch and gives you the possibility to run free without
> breaking shit, then looks at what you produced and decides how to handle it. You are
> his faithful expert companion… he still needs to feel in control of what is
> happening."

## In your project

| Guard | What it prevents |
|---|---|
| **The steward never touches git in your project.** No branch, commit, stage or stash | A change you didn't see becoming history. You branch before, and decide after, with `git diff` |
| **Its report lists every file it created and every file it changed** | Not knowing what happened. With no plan shown up front, the report is your handover |
| **It asks before creating a new skill**, and once each for the sources and for keeping or swapping an `AGENTS.md` | A decision about taste made for you |
| **A trio stops after Plan** until you say OK | Work carried out on a plan nobody accepted |
| **Plan and Check lose the edit tools**, by frontmatter | A planner that starts editing, or a checker that fixes instead of reporting. The shell stays open to both, and their text asks them to use it only to read |
| **The record**, `.claude/steward.json` | A later run overwriting a file you edited, or bringing back a trio or plugin you removed |
| **It writes for Claude only** | Another tool's files changing under you |

## When it adopts a setup

Adopting moves rules out of your own files, so it has the strictest guards:

- **Nothing is removed before its new home is live**, and a rule goes, never a file,
  until every rule in that file has one. What counts as live, for a skill, a trio or a
  pull request, is defined in step 6 of
  [`adopt.md`](../../plugins/marketplace-steward/references/adopt.md).
- **A rule in a context file waits for your word** once its home is live, because the
  main session preloads no skill. The report quotes the sentence that covers it.
- **Only a skill that says the same thing counts.** A similar rule isn't the same rule;
  when in doubt, yours stays.
- **Files that git can't restore are copied first.** Any file with untracked or
  uncommitted content is to be backed up to
  `~/.local/share/marketplace-steward/backups/` before the first rule is taken out of
  it, and never over an earlier backup.
- **Your private files stay yours.** `CLAUDE.local.md`, `.claude/settings.local.json`
  and everything under `~/.claude` are read and never changed. That includes the
  project's session transcripts under `~/.claude/projects/`, which the measuring script
  reads to count tokens and calls. It prints names and numbers, never what was said.

## When it contributes to the marketplace

The marketplace is public, so a contribution has guards against leaking as well as
against breaking:

| Guard | What it prevents |
|---|---|
| **The strip test** replaces every name, path and value with its role | A client, a system or a colleague reaching a public repo |
| **The leak check** compares everything a change will publish, its diff, commit messages, branch name and pull request text, with what identifies your project | A name the strip test missed |
| **A leak, or a check that couldn't run, stops the job before the push** | Publishing first and noticing after |
| **The checker is a separate agent with no edit tools** | The writer approving its own change |
| **It works in its own clone**, one worktree per change | Your checkout of the marketplace changing while you work in it |
| **Its permissions name each command it may run unasked** | A command it was never meant to run going through without a prompt: anything else asks first |
| **You merge** | Anything reaching every project without your review |

One guard is yours to set up: **protect `main` on GitHub.** The steward's push rule
allows only `contrib/…` branches, but a rule matches text, and a push written as
`contrib/x:main` would still match it. Branch protection is the guard that holds
regardless. [Permissions](../reference/permissions.md) lists every rule.

## Why prose guards at all

Nothing in a skill is a technical control: a model may follow it or not. That is why the
guards that matter most are the ones outside the prose: frontmatter that removes the
Write tool, permission rules that name commands, a record with hashes, git history, and
your merge. The prose guards are there to make the right behaviour the easy one.

The rules behind this page are in the front door,
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md),
and in [`record.md`](../../plugins/marketplace-steward/references/record.md),
[`adopt.md`](../../plugins/marketplace-steward/references/adopt.md) and
[`contribute.md`](../../plugins/marketplace-steward/references/contribute.md). "You" on
this page is the maintainer, who is the only contributor for now.
