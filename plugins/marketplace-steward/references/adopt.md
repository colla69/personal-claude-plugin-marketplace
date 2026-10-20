# Adopt

A project that already has a setup of its own holds knowledge in the wrong places:
rules a central skill already states, rules that would serve every project but live in
this one, and facts that belong in its `AGENTS.md`. Adopting it gives every rule one
home. A new setup laid on top would leave two sets of instructions that agree today and
drift apart from tomorrow.

Adoption is set-up with more to read. Run `set-up/procedure.md`, with the changes
below. Files named here sit beside this file, and the front door's rules hold
throughout.

## 1. Take stock

This replaces step 1 of set-up's phase 2. Read everything the project's setup holds:

- `CLAUDE.md` and `AGENTS.md`, at every directory level of the project;
- `.claude/rules/`, `.claude/skills/`, `.claude/agents/` and `.claude/commands/`;
- the settings: hooks, in `.claude/settings.json` and `.claude/hooks/`, `.mcp.json`,
  permissions, environment, and enabled plugins;
- other tools' files, such as `.cursor/rules/` and `.github/copilot-instructions.md`.

`CLAUDE.local.md`, `.claude/settings.local.json` and everything under `~/.claude` are
the user's own, not the project's: read them, and leave them as they are. Then run the
rest of phase 2.

## 2. Split it into rules

Work rule by rule, never file by file. A rule is one instruction someone could follow
or break: a bullet, a line, a short paragraph. One file usually mixes rules a central
skill already has, facts about the project, and rules nobody has written down centrally
yet. An agent splits the same way: its lane and its failure modes are rules, and so is
every piece of knowledge it carries.

## 3. Give each rule a home

Run `place-knowledge.md` on each rule. Its diagnosis decides the home; this table adds
what happens to the local copy:

| What the rule is | Its home | Its local copy |
|---|---|---|
| A toolkit skill already says it | That skill | Removed once the home is live |
| Right in general, different here | The project's `AGENTS.md`, as a local exception | Moved |
| The local version is better than the skill's, or no skill has it and it travels | A contribution | Stays until the merge |
| A fact about this project, or a boundary only it has | The project's `AGENTS.md`, where `set-up/context-files.md` puts it | Moved |
| A procedure only this project runs | A project skill, as "Project skills" in `set-up/context-files.md` describes | Stays, or moves into one |
| A lane or a failure mode a role template already states | That role template, in the trio | Removed once the trio is written |
| A failure mode no role template has, and it would hold for any project's role | A contribution to the role template | Stays until the merge |
| A hook, an MCP server, a command that runs a tool, a permission, an environment setting | Stays: it is project mechanics | Stays |
| A hook that only injects text | Its text goes through the rows above | The hook goes once its text's home is live |
| A key for a plugin that no longer exists | Set-up's phase 5 removes it | Removed |
| Dead, or about the machine | Nowhere | Removed |

**A skill "already says it" only when it says the same thing, and only a toolkit skill
counts.** When in doubt, it differs, and why it differs decides the row. A skill from
another marketplace changes outside the user's hands, so a rule it covers stays.

**Other tools read some of these files.** Rules in other tools' own files go through
the table, but those files stay as they are, because the steward writes for Claude only.
When the project has other tools' files, a covered rule in an existing `AGENTS.md`
stays too, because those tools read `AGENTS.md` and have no skills.

## 4. Set it up with those homes

Run set-up's phases 3 to 7 with the homes from step 3:

- **Phase 3** decides the plugins the covered rules call for, the trios the agents
  become, and the contributions, one for each skill or role template the travelling
  rules touch.
- **Phase 4** writes into `AGENTS.md` the rules step 3 gave it. Every other rule in a
  `CLAUDE.md` stays there, below the one-line import, until step 5 removes it. The same
  holds for each nested `CLAUDE.md` and its own `AGENTS.md`. This already takes rules
  out of a `CLAUDE.md`, so back it up first, by the rule in step 5.
- **Phase 6** builds the trios. An old agent stays until step 5.

After phase 7, run the contribute job for each contribution. A new skill waits for the
OK at the end of the run, with any others.

## 5. Remove what has a live home

**Nothing is removed before its new home is live.** That is how the marketplace's own
agents were retired: no paragraph went until it had a home. A home is live when:

- **it is `AGENTS.md`, a trio or a project skill**, and it has been written;
- **it is a toolkit skill**, its plugin passes set-up's phase 7 check 1, and the skill
  is in the `skills:` of every trio role that does the work the rule governs, so it
  reaches where the local copy was in force;
- **it is a contribution**, it has been merged, and the installed copy of the skill or
  template says the same thing as the rule. Until then the rule stays where it is, and
  goes in the record's `pending` once its pull request exists. A rule in another
  tool's file never goes there.

Remove a rule, not a file: edit the rule out of the file it is in. A file goes only once
every rule in it has a live home, and an agent file the same way. When a contribution
is declined or its pull request is closed, the rule stays where it is as a project rule.

**Back up before removing anything** from a file whose working copy differs from git's
`HEAD`, which includes every untracked file and every uncommitted edit. Copy the whole
file to `~/.local/share/marketplace-steward/backups/<project folder>/<date>/<its path>`,
and never over an existing backup: add a number to the name instead.

Then write the record, or refresh it, by `record.md`. That happens after this step, not
in phase 6, because adoption keeps changing files until here.

## 6. Report

Set-up's report, with its Adopted section filled as `set-up/report.md` describes.
