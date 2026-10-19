# Safety

What keeps you in control while the steward and the trios work, and why each guard is
there. Read this before you run the steward on a project you care about, or before you
let it open pull requests on your marketplace.

> "The developer makes a branch and gives you the possibility to run free without
> breaking shit, then looks at what you produced and decides how to handle it. You are
> his faithful expert companion… he still needs to feel in control of what is
> happening."

## In your project

| Guard | What it prevents |
|---|---|
| **The steward never touches git in your project.** No branch, commit, stage or stash | A change you didn't see becoming history. You branch before, and decide after, with `git diff` |
| **Its report lists every file it created and every file it changed** | Not knowing what happened. With no plan shown up front, the report is your handover |
| **It asks before creating a new skill**, and for the sources once | A decision about taste made for you |
| **A trio stops after Plan** until you say OK | Work carried out on a plan nobody accepted |
| **Plan and Check are read-only by frontmatter** | A planner that starts working, or a checker that fixes instead of reporting |
| **The record**, `.claude/steward.json` | A later run overwriting a file you edited, or bringing back a trio or plugin you removed |
| **It writes for Claude only** | Another tool's files changing under you |

## When it adopts a setup

Adopting moves rules out of your own files, so it has the strictest guards:

- **Nothing is removed before its new home is live.** A rule that a skill now holds
  stays until that skill is installed and the trio roles that do the work preload it. A
  rule waiting for a pull request stays until the merge.
- **A rule goes, never a file,** until every rule in that file has a live home.
- **Only a skill that says the same thing counts.** A similar rule isn't the same rule;
  when in doubt, yours stays.
- **Files that git can't restore are copied first.** Any file with untracked or
  uncommitted content is backed up to `~/.local/share/marketplace-steward/backups/`
  before anything is removed from it, and no backup is ever overwritten.
- **Your private files stay yours.** `CLAUDE.local.md`, `.claude/settings.local.json`
  and everything under `~/.claude` are read and never changed.

## When it contributes to the marketplace

The marketplace is public, so a contribution has guards against leaking as well as
against breaking:

| Guard | What it prevents |
|---|---|
| **The strip test** replaces every name, path and value with its role | A client, a system or a colleague reaching a public repo |
| **The leak check** compares everything a change will publish, its diff, commit messages, branch name and pull request text, with what identifies your project | A name the strip test missed |
| **A leak, or a check that couldn't run, stops the job before the push** | Publishing first and noticing after |
| **The checker is a separate, read-only agent** | The writer approving its own change |
| **It works in its own clone**, one worktree per change | Your checkout of the marketplace changing while you work in it |
| **Its permissions name each git command exactly** | A command it was never meant to run, such as a push to `main` |
| **You merge** | Anything reaching every project without your review |

One guard is yours to set up: **protect `main` on GitHub.** The steward's push rule
allows only `contrib/…` branches, but a rule matches text, and a push written as
`contrib/x:main` would still match it. Branch protection is the guard that holds
regardless. `reference/permissions.md` lists every rule.

## Why prose guards at all

Nothing in a skill is a technical control: a model may follow it or not. That is why the
guards that matter most are the ones outside the prose: frontmatter that removes the
Write tool, permission rules that name commands, a record with hashes, git history, and
your merge. The prose guards are there to make the right behaviour the easy one.
