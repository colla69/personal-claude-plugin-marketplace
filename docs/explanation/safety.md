# Safety

What keeps you in control while the steward docks a project, while the base plugin runs
in your sessions, and while the curators change the marketplace, and why each guard is
there. Read this before you dock a project you care about.

**Not yet tried on real projects.** The guards are described as the plugins' files set
them out; the first trials will show where they behave otherwise.

> "The developer makes a branch and gives you the possibility to run free without
> breaking shit, then looks at what you produced and decides how to handle it. You are
> his faithful expert companion… he still needs to feel in control of what is
> happening."

## When the steward docks a project

| Guard | What it prevents |
|---|---|
| **It docks only when you ask** | A project's settings and `CLAUDE.md` changing without its owner deciding |
| **It never touches git in your project.** No branch, commit, stage or stash | A change you didn't see becoming history. You branch before, and decide after, with `git diff` |
| **Its report lists every file it wrote and every file it changed** | Not knowing what happened. The report is your handover |
| **It asks once each for the sources, for keeping or swapping an `AGENTS.md`, and for Conventional Commits in a project with code** | A decision about the project made for you |
| **It edits an existing `CLAUDE.md`, never replaces it** | Losing what the project wrote |
| **It writes for Claude only** | Another tool's files changing under you |
| **Your private files stay yours.** `CLAUDE.local.md`, `.claude/settings.local.json` and everything under `~/.claude` are read and never changed | The steward reaching into what is only yours. The measuring script reads the project's transcripts to count tokens, and prints names and numbers, never what was said |

## When it tidies a setup

The tidy removes rules from your own files, so it has the strictest guards:

- **Only a rule a standard states word for word goes.** A rule that adds a condition,
  an exception or a different default is your quirk, and stays. When in doubt, it
  stays.
- **Only this marketplace's standards count.** A rule another marketplace covers stays,
  because that standard can change outside the curators' hands.
- **Files that git can't restore are copied first.** Any file with untracked or
  uncommitted content is backed up to `~/.local/share/marketplace-steward/backups/`
  before the first rule is taken out of it, and never over an earlier backup.
- **A rule that would travel stays where it is.** It is filed for the curators, with
  placeholders for names, and stays in force in your project.

## While you work

| Guard | What it prevents |
|---|---|
| **The guard runs only the command docking wrote**, only after a change, and gives up after three failures in a row | A session trapped by a check that cannot pass. Remove `STEWARD_CHECK`, and it does nothing |
| **Every agent the marketplace ships has no edit tools**, by frontmatter | A reviewer that fixes instead of reporting. The shell stays open to them, and their text asks them to use it only to read |
| **A review runs only when you ask** | Tokens spent on a review nobody wanted |
| **The collector reads only the conversation**, never a tool's output, a shell command's output or a compact summary | A file's contents or a command's result, which can hold secrets nobody typed, leaving your machine |
| **It writes placeholders for the names and secrets it notices** | A name in a correction reaching the issue. It is a model, not a filter, and the issue is as public as the marketplace's repository |
| **`STEWARD_COLLECT` set to `off` stops it**, for a project or for your machine | Corrections from a project that must keep them, reaching the marketplace at all |

## When the marketplace changes

The marketplace may be public, so a change has guards against leaking as well as
against breaking:

| Guard | What it prevents |
|---|---|
| **The strip test** replaces every name, path and value with its role | A client, a system or a colleague reaching a public repo |
| **The leak check** compares everything a change will publish, its diff, commit messages, branch name and pull request text, with what identifies its source | A name the strip test missed |
| **A leak, or a check that couldn't run, stops the job before the push** | Publishing first and noticing after |
| **The checker is a separate agent with no edit tools** | The writer approving its own change |
| **A curator merges** | Anything reaching every docked project, which updates by itself, without review |

One guard is yours to set up: **protect `main` on GitHub.** The curator pushes only
`contrib/…` branches, but a push written as `contrib/x:main` is still a push. Branch
protection is the guard that holds regardless.
[Permissions](../reference/permissions.md) lists every rule.

## Why prose guards at all

Nothing in a skill is a technical control: a model may follow it or not. That is why the
guards that matter most are the ones outside the prose: frontmatter that removes the
Write tool, permission rules that name commands, a hook's exit code, git history, and a
curator's merge. The prose guards are there to make the right behaviour the easy one.

The rules behind this page are in the steward's front door,
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md),
in [`tidy.md`](../../plugins/marketplace-steward/references/tidy.md), in [the base's
reference](../reference/the-base.md), and in the curator's
[`contribute.md`](../../plugins/marketplace-curator/references/contribute.md).
