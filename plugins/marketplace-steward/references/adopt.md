# Adopt

A project that already has a setup of its own holds knowledge in the wrong places:
rules a central skill already states, rules that would serve every project but live in
this one, and facts that belong in its `CLAUDE.md`. Adopting it gives every rule one
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
the user's own, not the project's: read them, and leave them as they are. When you found
an `AGENTS.md`, ask the keep-or-swap question in `set-up/context-files.md` now, unless
the record already holds the answer. Then run the rest of phase 2.

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
| A toolkit skill already says it | That skill | Removed once the home is live; from a context file, on the user's word (step 6) |
| Right in general, different here | The project's `CLAUDE.md`, as a local exception | Moved |
| The local version is better than the skill's, or no skill has it and it travels | A contribution | Stays until the merge |
| A fact about this project, or a boundary only it has | The project's `CLAUDE.md`, where `set-up/context-files.md` puts it | Moved |
| A procedure only this project runs | A project skill, as "Project skills" in `set-up/context-files.md` describes | Stays, or moves into one |
| A lane or a failure mode a role template already states | That role template, in the trio | Removed once the trio is written; from a context file, on the user's word (step 6) |
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
An `AGENTS.md` is not one of them: it goes the way the user's answer to the keep-or-swap
question says, as "An AGENTS.md found in the project" in `set-up/context-files.md`
describes.

## 4. Set it up with those homes

Run set-up's phases 3 to 7 with the homes from step 3:

- **Phase 3** decides the plugins the covered rules call for, the trios the agents
  become, and the contributions, one for each skill or role template the travelling
  rules touch. Step 5 runs them.
- **Phase 4** writes into `CLAUDE.md` the rules step 3 gave it. With the swap, it
  first folds each `AGENTS.md` that a `CLAUDE.md` imports into it. Every other rule in a
  `CLAUDE.md` stays where it is until step 6 removes it. The same holds for each nested
  `CLAUDE.md`. This rewrites a `CLAUDE.md`, so back it up first, by the rule in step 6.
- **Phase 6** builds the trios. An old agent stays until step 6.

Leave out phase 8: the report comes in step 7, after the contributions and the removals.

## 5. Contribute

The rules that travel are half of what an adoption is for. Skipped, they stay in this
one project, and the report still looks complete, so nobody finds out. Run the
contribute job, `contribute.md`, for each contribution phase 3 decided, now, after phase
7 and before anything is removed.

- **A change to an existing skill or role template goes ahead without asking**, as the
  front door says. Step 3 placed its rules already, so the job skips its placement, as
  its step 1 says for an adoption.
- **A new skill waits for the OK**, asked at the end of the report together with any
  others, as the front door says. On a yes, run the job for it then, give the user its
  outcome as the Contributions table would, and add its rules to the record's `pending`
  or `declined`.

Each contribution ends in one of three ways, and the report's Contributions table gives
it a row:

- **A pull request.** Its rules go in the record's `pending`, with the pull request.
- **A stop**, such as a leak finding, a house marketplace that isn't on GitHub, or a
  pushed branch with only the compare link because `gh` couldn't open the pull request.
  Its rules stay as project rules for now, and the row says where it stopped and what
  is left, such as the worktree's path or the link to open.
- **The user's no to a new skill.** Its rules stay as project rules, and the proposal
  goes in the record's `declined`.

A rule whose home is a contribution never becomes "stays" without one of these.

## 6. Remove what has a live home

**Nothing is removed before its new home is live.** That is how the marketplace's own
agents were retired: no paragraph went until it had a home. A home is live when:

- **it is `CLAUDE.md`, a trio or a project skill**, and it has been written;
- **it is a toolkit skill**, its plugin passes set-up's phase 7 check 1, and the skill
  is in the `skills:` of every trio role whose step applies the rule. Ask it of Plan,
  Do and Check one by one. A rule about where logic lives is applied by a plan that
  places it and a check that compares the result with that plan, as well as by the
  role that writes it. A rule about syntax is applied by the writer alone. A rule from
  a root `CLAUDE.md` was in force for all three roles, and one from a nested
  `CLAUDE.md` or a rule with `paths:` was in force for every role that reads there.
  Removing it on the strength of the writers' skills leaves the others without it,
  and nothing reports the gap. Where a role that applies the rule lacks the skill,
  add it when `set-up/trios.md` lets that role take it and the role's file matches
  the record. When either fails, the rule stays, and the report names the role. Each
  role that takes the skill pays for it in every run;
- **it is a contribution**, it has been merged, and the installed copy of the skill or
  template says the same thing as the rule. Until then the rule stays where it is, and
  goes in the record's `pending` once its pull request exists. A rule in another
  tool's file never goes there.

**A rule in a context file waits for the user's word when its home is a toolkit skill, a
merged contribution or a role template.** A `CLAUDE.md`, a nested `CLAUDE.md` and a rule file are read in the main
session. That session preloads no skill, reads no role template, and gets a skill only
when its description wins the prompt, so the role-by-role test above leaves it out. A
rule that guards against a failure the project has already had has the most to lose from
that. The rule stays and goes in the record's `pending`, without a pull request. The
report lists it under "Waiting for your word" with the sentence that covers it, and each
keep-current run lists it again until the user answers. It goes when the user says so,
and on "keep it" it becomes a project rule and loses its entry. A rule moved into a
`CLAUDE.md` or a project skill keeps its own words in a file the project owns, where the
toolkit's wording would replace them, so it moves at once. A rule in an agent
file or a project skill reached its readers by a preload or a description, as the skill
does, so it goes by the test above.

Remove a rule, not a file: edit the rule out of the file it is in. A file goes only once
every rule in it has a live home, and an agent file the same way. When a contribution
is declined or its pull request is closed, the rule stays where it is as a project rule.

**Back up before removing anything** from a file whose working copy differs from git's
`HEAD`, which includes every untracked file and every uncommitted edit. Copy the whole
file to `~/.local/share/marketplace-steward/backups/<project folder>/<date>/<its path>`,
and never over an existing backup: add a number to the name instead.

With keep, an `AGENTS.md` that nothing imported gets its `CLAUDE.md` import now, after
the removals, so only the rules whose home it is come into force.

Then write the record, or refresh it, by `record.md`. That happens after this step, not
in phase 6, because adoption keeps changing files until here.

## 7. Report

Set-up's report, with its Adopted and Contributions sections filled as
`set-up/report.md` describes. Before you write it, match the two: every rule the Adopted
table gives a contribution as its home has a row in Contributions, and every row there
has its outcome. A contribution with no row was skipped. Run it now, then report.
