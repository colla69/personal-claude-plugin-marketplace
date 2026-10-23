# Keep a setup current

Bring a project's setup up to date after the marketplace or the project has changed: a
plugin was renamed, a skill doesn't load, a role template improved, the project gained a
test runner. Nothing of this announces itself, so run it from time to time, and after
you merge a contribution.

**Not yet tried on real projects.** This guide follows the steward's procedures; the
first trials will show where it behaves otherwise.

## Steps

1. **In the project, say "update the setup"**, or name the symptom: "the review skill
   isn't loading in this project", or "this setup costs too many tokens". Asking to set
   up a project the steward set up before does the same.
2. **Let it run.** It first refreshes the marketplaces and updates the steward's own
   copy, so that your files are compared with the current templates. With a symptom
   named, it checks only that; otherwise it runs every check below. It asks only
   before a new skill, and once whether to keep or swap the project's `AGENTS.md`
   files if it hasn't asked before.
3. **Read the report**, and run `/reload-plugins` if anything was installed or rebuilt.

## What it checks

| Check | What it does about it |
|---|---|
| **Plugin keys that no longer exist** | Removes each dead toolkit key from `.claude/settings.json`, and installs the plugin's successor when the project still shows its signal. Keys of other marketplaces and of `settings.local.json` are only reported. It runs this check again after the last install, because installing rewrites the settings file |
| **Skills the trios can't load** | Installs a missing plugin, or corrects a skill name that was renamed. A name it can't resolve is reported, because that agent is running without its standard |
| **Trios from older templates** | Rebuilds each trio file whose template changed, if you haven't edited it since. A file you edited stays, and the report says a newer template exists |
| **What the project now calls for** | Installs a toolkit plugin whose signal has appeared, and builds a trio a task now has the tools for. A plugin whose signal has gone stays, and is named as possibly unneeded |
| **`AGENTS.md` from an older setup** | Asks once whether to keep the `AGENTS.md` files or swap them for `CLAUDE.md`. With the swap, it moves each `AGENTS.md` that a `CLAUDE.md` imports into that `CLAUDE.md`, whole, and removes it. With keep, they stay. One that nothing imports never loaded, so it stays and is listed under Unverified, for adoption |
| **`CLAUDE.md` lines that are no longer true** | Fixes a path or a command it can verify by reading. One it can't verify stays, and is listed under Unverified |
| **Rules waiting for a merge** | After an adoption: removes each pending rule once its pull request is merged and the skill says the same thing, but only if you haven't edited the rule since |
| **What the setup costs** | Measures what the setup adds to every session, and how much of it your sessions used. It moves a section of a context file it wrote, and you haven't edited, to where it loads only on demand. A plugin, trio or MCP server your sessions never used is named, with its cost, and stays. It changes no agent's model unless you ask |

## The report

| Section | Holds |
|---|---|
| **Checks run** | All of them, or the ones your symptom called for, and which were skipped |
| **Changed** | Each file it changed, and the check that called for it |
| **Removed** | Each key, file or rule it removed, and the backup if there is one |
| **Left alone** | Each file you changed since the steward wrote it, and what a newer template would have changed |
| **Possibly unneeded** | Each plugin whose signal is gone |
| **Cost** | The tokens the setup adds to every session, its share of a session's start and of an average request, and each finding with what was done about it |
| **Unverified** | What it couldn't check or resolve |

When nothing has drifted, the report says so and lists the checks it ran.

## What it is asked not to do

- Rebuild or rewrite whole a file you changed since the steward wrote it. A check may
  still fix one line in it, such as a skill name that was renamed.
- Bring back a trio or a plugin you removed, or propose a skill you declined.
- Delete a line from `CLAUDE.md` it can't replace. A line it can verify as wrong, such
  as a path that moved, it fixes, whoever wrote the file.
- Run on a project it never set up: there, it hands over to set-up or adoption.

A project set up before the steward kept a record has nothing it can tell apart, so
keep-current treats every file there as yours and rebuilds nothing.
