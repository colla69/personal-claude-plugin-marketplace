# Dock

Bring a project onto the company's standards, in a fixed order: settle where standards
may come from, read the project, decide, write the `CLAUDE.md` that holds what reading
cannot tell, install the standards and the base plugin, tidy what the project already
had, verify, and report. Each step builds on the one before it.

The goal is **not** one giant file describing the project. Claude can read the project.
The goal is the standards it needs, plus what it *cannot* derive by reading: commands
that aren't obvious, conventions that differ from the defaults, boundaries that must not
be crossed, and the reasons things are the way they are.

Every file named below sits in this folder unless it says otherwise. The front door's
rules hold throughout.

## 1. Sources

Settle where standards may come from before looking at the project. A project under a
procurement or security policy looks identical to one with none.

Refresh every marketplace, read the live inventory, and then read the source policy, or
ask for one as a single checklist when none exists. Write it to
`.claude/plugin-sources.json`. Read `plugin-sources.md` first: it holds the commands,
the checklist, and the rules for the file.

## 2. Read the project

1. **What exists already.** `CLAUDE.md` and `AGENTS.md` at every level, `.claude/`
   (rules, skills, agents, commands, settings and hooks), `.mcp.json`, and other tools'
   files, such as `.cursor/rules/` and `.github/copilot-instructions.md`. Note them all:
   step 6 tidies the project's own, and other tools' files are read for content worth
   carrying into `CLAUDE.md` and left as they are. `CLAUDE.local.md`,
   `.claude/settings.local.json` and everything under `~/.claude` are the user's own:
   read them, and change nothing in them.
2. **What the project is.** For a codebase, start the built-in `Explore` agent for the
   survey, and ask for these fields: the stack and where each version is pinned; the
   commands, taken from CI first, each marked verified or inferred; the components, each
   with its purpose, the file to start from and what is local to it; conventions that
   differ from the framework's default; boundaries, and whether a lint rule enforces
   them; and the test runner. Read the README and any docs yourself. For a folder without
   code, read its documents, templates and instructions, and find out what is produced
   here, for whom, and how it is checked.
3. **Its components.** The units someone would think about separately. `context-files.md`
   says when a component earns a file of its own.

## 3. Decide

Decide, from what step 2 found:

- **The standards to install.** Walk every row of the table in `catalog.md`, top to
  bottom, and settle each one: install it on the signal you found, or leave it out on
  the signal you looked for and didn't find, or on a mismatch the row names. A row you
  pass without a verdict is how two runs on one project install different sets.
  `plugin-sources.md` says how to fill a gap. Every docked project gets
  `marketplace-base`.
- **The commit question.** In a project with code, ask the one question in "Commit
  messages" in `catalog.md` now, and wait for the answer.
- **The agents' models.** When the project has agents in `.claude/agents/` that name no
  model or say `inherit`, read `agent-models.md` and ask its one question now, together
  with the commit question.
- **The check command.** In a project with code, the one command that proves the build
  and the tests pass, such as `npm run build && npm test`. Take it from CI; with no CI,
  from the command the project's own documents name for checking its work. Step 7 runs
  it once. Choose none when it can't run here, and say so in the report: a wrong command
  blocks every turn that edits a file. Decide too which paths it covers, as step 5 says.
  A project where the command covers only part of the work, such as a built site beside
  data and documents, gets the paths, so edits outside them cost no check.
- **The files to write**, and roughly what goes in each.

Nothing else is shown before the work. The decisions go into the report.

**A need nothing covers is a lesson, not a new skill here.** When the project shows a
need that neither the catalog nor a permitted gap-fill covers, and it would hold in
other projects too, name it in the report under "For the curators" and file it as
`tidy.md` files a rule that travels. Curators decide whether it becomes a standard.

## 4. Write CLAUDE.md

Read `context-files.md` first: the layout, the templates, what to leave out, and the
size limits. Write the content in `CLAUDE.md`, at the root and in every component that
earned one. Write no `AGENTS.md`, unless the user chose to keep theirs, as
`context-files.md` says. A convention that follows a file type rather than a directory
goes in a path-scoped rule in `.claude/rules/`.

A file the project already has is edited, not replaced: add what is missing, and leave
every line the project wrote. Step 6 decides what of it goes.

When step 3 chose a check command, add one line under the Commands table: a long check
runs through the `marketplace-base:test-runner` agent, which runs it on Haiku and
reports only what failed, so the output stays out of the session.

## 5. Install

1. **Merge `assets/settings-template.json` into `.claude/settings.json`.** Never
   replace the file; it often holds permissions and hooks already. The template declares
   the marketplace, which Claude Code then updates by itself, so a merged change reaches
   the project, and sets the session's model to `opusplan`: Opus in plan mode, Sonnet
   otherwise. When the file already names a `model`, keep the project's, and say so in
   the report.
2. **Write the check command**, when step 3 chose one, as `"STEWARD_CHECK"` under `env`
   in the same file. The base plugin's guard reads it. When part of the project is not
   covered by the command, such as `jobs/` or `CV/` beside a built `frontend/`, also
   write `"STEWARD_CHECK_PATHS"`: the globs of what the command covers, relative to the
   project's root and separated by commas, such as `frontend/**,infra/**`. The guard
   then runs only when a file in those paths changed. Leave it out when the command
   covers the whole project.
3. **Remove the dead keys**, by the rule in "Renamed and removed" in `catalog.md`, and
   report every plugin at user scope that "Scope" there doesn't allow.
4. **Check every plugin you decided on against `.claude/plugin-sources.json`.** If you
   have talked yourself into a plugin from a source the user unticked, drop it; do not
   widen the file.
5. **Install each one at project scope**, as "Scope" in `catalog.md` says,
   `marketplace-base` first:

   ```bash
   claude plugin install <name>@<marketplace> --scope project
   ```

## 6. Tidy

When step 2 found a setup of the project's own, or files an earlier steward generated,
read `tidy.md` and run it. It removes only what an installed standard says word for
word, keeps every other rule as the project's own, and files the rules that would serve
other projects as issues for the curators. Run it on every file step 2 noted, not only
the ones you expect to change: its table has one row for each file read, and a file
without a row was not read.

Then write the models the user accepted in step 3, as `agent-models.md` says.

## 7. Verify

Do not declare success without checking:

1. **Every plugin is enabled and loads.** Each one you installed has its key in
   `.claude/settings.json`, and `claude plugin details <plugin>` lists its skills.
2. **What you wrote parses.** Every JSON file is valid. The frontmatter of every
   `.claude/rules/*.md` file parses, and every rule's `paths:` globs match at least one
   real file. A rule whose globs match nothing never announces itself.
3. **Every `AGENTS.md` follows the answer**, as `context-files.md` says. An `AGENTS.md`
   that nothing imports never loads, and nothing reports that.
4. **The budget holds.** Every `CLAUDE.md` you wrote or edited is within the limits in
   `context-files.md`.
5. **The check command runs.** Run it once. When it fails before you changed anything,
   remove it from `env` and report it: the guard would send every turn back to fix a
   failure nobody caused.
6. **Updates arrive.** When `~/.claude/settings.json` sets `autoUpdate` to `false` for
   the marketplace, say so in the report: the project then stays on today's standards
   until someone updates by hand. Change nothing there.
7. **What it costs.** Run the measuring script, as `cost.md` says. This session started
   before you installed anything, so it shows the new parts as "not yet". Take their
   always-on tokens from `claude plugin details`, and put the total in the report.

8. **The report is complete.** Count the rows. Every file step 2 noted has a row of its
   own in the Tidied table, never one row for a group, and the count in "Read <n> files"
   equals the rows. Every row of the catalog has a verdict in the Standards table or is
   counted in its closing line. A gap here is a step you skipped: go back and do it.

Do **not** run `claude plugin validate` on the project's `.claude/` directory. It
expects a plugin or marketplace manifest, and fails with "No manifest found".

## 8. Report

````
## Docked

**Always on:** <the tokens this setup adds to every session, measured in step 7>
**Sources consulted:** <each marketplace you read, with how many plugins it offered>
**Check command:** <the command, or "none", and why>

### Written
- <path> — <one line>

### Changed
- <path that already existed> — <what changed>

### Standards
| Plugin | Verdict | Evidence in this project |
|---|---|---|
| <name> | <install, kept, or left out> | <the signal you found, or the one you looked for and didn't find> |

<A closing line counts the rows whose signal is plainly absent, such as a language the
project doesn't use, instead of listing each.>

### Tidied
<Only when step 6 ran: its tables, from `tidy.md`.>

### For the curators
<Each issue filed, with its link, or the rules waiting on disk and why. Left out when
there is none.>

### On another machine
```bash
<a marketplace add line for any marketplace not configured yet, then one
`claude plugin install <name>@<marketplace> --scope project` line per plugin>
```

<Each plugin at user scope that "Scope" in `catalog.md` doesn't allow, with the
`claude plugin uninstall <name>@<marketplace> --scope user` line for the user to run.>

Run `/reload-plugins`, or start a new session: plugins installed mid-session aren't
active until then. Once you commit `.claude/`, the setup travels with the project.

### Unverified
- <anything you guessed at, any command you could not run, any toolkit plugin in the
  live list that `catalog.md` has no row for>
````

Leave out a section that would be empty. The block under "On another machine" is never
left out: it is what turns the next machine's clone into a working setup.
