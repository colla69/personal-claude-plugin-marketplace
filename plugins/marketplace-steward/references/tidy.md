# Tidy

A project that already has a setup of its own holds rules a standard now also states,
and files an earlier steward generated. Two copies of one rule agree today and drift
apart tomorrow, and each copy costs tokens in every session. Tidying removes only what
is certainly a copy, keeps everything else as the project's own, and sends what would
serve other projects to the curators.

Run it in step 6 of `dock.md`, after the standards are installed: a rule goes only once
the standard that states it loads here. The front door's rules hold throughout.

## Back up first

**Back up before removing anything** from a file whose working copy differs from git's
`HEAD`, which includes every untracked file and every uncommitted edit. Copy the whole
file to `~/.local/share/marketplace-steward/backups/<project folder>/<date>/<its path>`,
and never over an existing backup: add a number to the name instead. A file that matches
`HEAD` needs no copy, because git has it.

## Work rule by rule

A rule is one instruction someone could follow or break: a bullet, a line, a short
paragraph. Read `CLAUDE.md` and `AGENTS.md` at every level, `.claude/rules/`,
`.claude/skills/`, `.claude/agents/`, `.claude/commands/`, and every hook that only
prints text. Remove a rule, not a file: edit the rule out of the file it is in, and
remove a file only once nothing is left in it.

| What it is | What happens |
|---|---|
| A rule an installed standard states word for word, or says the same thing in other words with nothing added or changed | Removed. The report names the standard |
| A rule that is right in general and different here | Stays: it is the project's quirk |
| A fact about the project, or a boundary only it has | Stays, in its `CLAUDE.md` |
| A rule that would hold in other projects, and no standard has it | Stays, and is filed for the curators, below |
| A procedure only this project runs | Stays |
| A hook, an MCP server, a command, a permission, an environment setting | Stays: it is the project's mechanics |
| A hook that only prints text | Its text goes through these rows; the hook goes once none of its text is left |
| A file an earlier steward generated, below | Removed |
| Dead, or about the machine | Removed |

**"States it word for word" is the bar, and when in doubt, it differs.** A rule that
adds a condition, an exception or a different default is the project's quirk, even when
most of it matches. Only a standard from this marketplace counts: one from another
marketplace changes outside the curators' hands, so a rule it covers stays.

**Other tools' files stay as they are.** Their rules are read, and a rule that travels
is filed, but nothing in them is removed. An `AGENTS.md` is not one of them: it goes the
way the keep-or-swap answer in `context-files.md` says.

## Files an earlier steward generated

Earlier versions of the steward generated a Plan, Do and Check agent and a run skill for
each recurring task, and kept a record of them in `.claude/steward.json`. Their
standards are in the skills now, and the base plugin's reviewer replaces Check.

- **Remove** each file the record lists under `files` with a `from`, the record itself,
  and the Trios table in the root `CLAUDE.md`. Back up first a file whose hash no longer
  matches the record, as above: someone edited it, and the edit may be a rule worth
  filing.
- **Without a record**, a file is generated only when it has the shape of one: agents
  named `<task>-plan.md`, `<task>-do.md` and `<task>-check.md` beside a
  `.claude/skills/<task>/SKILL.md` that runs them. Treat each as edited: back it up,
  remove it, and put its rules through the table above.

## Filing a rule for the curators

A rule that would serve other projects goes to the curators as an issue on the
marketplace's repository. It also stays where it is, because it is in force here and
nobody has decided yet whether it becomes a standard.

1. Find the repository: the source of the marketplace that `marketplace-base` came
   from, in `claude plugin marketplace list --json`. When it isn't on GitHub, list the
   rules under "For the curators" in the report, and stop.
2. Write one issue for the rules of one project: a title that names the subject, and a
   body that gives each rule, says what kind of file it was found in, and why it looks
   general. The repository may be public, so write each rule with placeholders, such as
   `<client>` and `<service>`, for the names of people, clients, systems and products,
   and leave the project's own name and paths out.
3. File it with `gh issue create --repo <owner>/<repo> --title "<title>" --body-file
   <file>`, from a file in the scratch folder. When `gh` is missing or fails, give the
   text in the report under "For the curators", for the user to file.

## Report

```
### Tidied
| From | Rule | Outcome |
|---|---|---|
| <file> | <the rule, quoted short> | <removed: duplicate of plugin:skill / removed: generated / kept / kept and filed: the issue> |

Backups: <each backup path, or "none needed">
```

One row per rule removed or filed. Rules kept without filing are counted in one line,
not listed: the report is for what changed.
