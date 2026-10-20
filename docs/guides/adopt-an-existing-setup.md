# Adopt an existing setup

Bring a project that already has its own `CLAUDE.md`, rules, skills, agents or hooks
onto the marketplace, so every rule in it has one home and nothing is lost on the way.
Why adoption works rule by rule is in [the steward](../explanation/the-steward.md), and
what keeps your files safe is in [safety](../explanation/safety.md).

**Not yet tried on real projects.** This guide follows the steward's procedures; the
first trials will show where it behaves otherwise.

## Before you start

- The steward is installed for your user, as in [set up a project](set-up-a-project.md).
- **Branch, and commit what you have.** Adoption edits your own files. A committed file
  can be restored from git. Before it takes a rule out of a file that differs from
  git's `HEAD`, the steward is asked to copy that file to its backups; a clean tree is
  still simpler to review.

## Steps

1. **Open a session in the project's root** and say "set this project up" or "bring our
   existing setup onto the marketplace". The steward sees your setup and adopts it
   instead of setting up over it.
2. **Tick the sources**, if it asks, as for a set-up.
3. **Say whether to keep your `AGENTS.md` files or swap them for `CLAUDE.md`**, if the
   project has any. It asks once, and recommends the swap; keep them if people on the
   project also use another tool that reads them.
4. **Let it run.** It reads every Claude file of the project's own, splits them into
   single rules, and gives each rule a home. Then it sets the project up with those
   homes, and contributes the rules that would serve other projects.
5. **Answer the new-skill question, if there is one**, at the end.
6. **Read the report's Adopted table.** Every rule is there, grouped by the file it came
   from, quoted short, with its new home and what happened to the local copy.

## Reading the Adopted table

| Local copy | Means |
|---|---|
| **Moved** | The rule now lives in `CLAUDE.md` or a project skill, and was taken out of its old file |
| **Removed** | Its home already says it: a toolkit skill that is installed and preloaded by the roles that do that work, or a role template now in a trio. Dead keys, hooks that only injected text, and dead or machine-only rules go too |
| **Pending** | Its home is a pull request. It stays where it is until you merge, and keep-current removes it then |
| **Stays** | It is project mechanics, such as a hook or a permission, or no live home fits it yet |

The procedure removes a rule only once its new home is live, and a file only once every
rule in it has one. An old agent stays until its trio is written and everything it knew
has a home.

## Check it

- **Read the diff file by file** against the Adopted table. If a removed rule matters to
  you and its new home doesn't say the same thing, put it back and tell the steward:
  that is a lesson for its placement.
- **Find your backups.** Each file that differed from `HEAD` is copied to
  `~/.local/share/marketplace-steward/backups/<project>/<date>/` before the first rule
  is taken out of it. The report names each copy.
- **Review the pull requests.** Each contribution from the adoption is one. Its pending
  rules stay in your project, and keep-current is asked to remove them only after you
  merge it.

## What stays untouched

Hooks, MCP servers, commands that run a tool, permissions, and environment settings stay
as they are; a hook that only injects text is the exception, and goes once its text has
a home. Other tools' files, such as `.cursor/rules/`, are read and never changed, and so
are `CLAUDE.local.md` and `.claude/settings.local.json`.

An `AGENTS.md` is the exception among other tools' files: the steward asks once whether
to keep the project's `AGENTS.md` files or swap them for `CLAUDE.md`. With keep, each
stays the home of its content, behind a `CLAUDE.md` that imports it. With the swap, one
that a `CLAUDE.md` imports is folded into it first, and its rules are placed with the
rest; one that nothing imports goes once each of its rules has a home.

## Afterwards

Once you have merged the pull requests, say "update the setup" in the project.
[Keep-current](keep-a-setup-current.md) removes each pending rule whose home is now
live, and leaves one you have edited since, with a note.
