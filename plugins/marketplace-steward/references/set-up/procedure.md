# Set up

Turn a project into a working setup, in a fixed order: read it, write the `CLAUDE.md`
that holds what reading cannot tell, install the skills that follow from it, and create
the trios that use those skills. Each phase builds on the one before it.

The goal is **not** one giant file describing the project. Claude can read the project.
The goal is to capture what it *cannot* derive by reading: commands that aren't
obvious, conventions that differ from the defaults, boundaries that must not be
crossed, and the reasons things are the way they are.

Every file named below sits in this folder unless it says otherwise. The front door's
rules hold throughout.

## Phase 1 — Preparation

Settle where skills may come from before looking at the project. A project under a
procurement or security policy looks identical to one with none.

Refresh every marketplace, read the live inventory, and then read the source policy,
or ask for one as a single checklist when none exists. Write it to
`.claude/plugin-sources.json`. Read `plugin-sources.md` first: it holds the commands,
the checklist, and the rules for the file.

## Phase 2 — Read the project

1. **What exists already.** `CLAUDE.md`, `AGENTS.md`, `.claude/`, `.cursor/rules/`,
   `.github/copilot-instructions.md`. A setup of the project's own, in `CLAUDE.md`,
   `AGENTS.md` or `.claude/`, is adopted, not set up over: the front door sends it to
   `../adopt.md`, which runs these phases with its own additions. Other tools' files
   are read for content worth carrying into `CLAUDE.md`, and left as they are.
2. **What the project is.** For a codebase, delegate the survey to
   `marketplace-steward:codebase-cartographer`, and give it the components you suspect
   from the manifest and the top-level tree. It holds the method, and its report has
   the fields phase 3 needs. Read the README and any docs yourself. For a folder
   without code, read its documents, templates and instructions, and find out what is
   produced here, for whom, and how it is checked.
3. **Its components.** The units someone would think about separately: what each is
   for, where to start, and what is local to it. `context-files.md` says when a
   component earns a file of its own.
4. **Its recurring tasks.** The kinds of work that happen here again and again. Each
   is a candidate trio; `trios.md` says how to choose them.

## Phase 3 — Decide

Decide, from what phase 2 found:

- the files to write, and roughly what goes in each;
- the skills to install: `plugin-catalog.md` says when a toolkit skill applies, and
  `plugin-sources.md` how to fill a gap;
- the trios, and which skill goes to which role, as `trios.md` says.

Nothing is shown before the work. The decisions go into the report, in the tables of
`report.md`, with a reason wherever a model or an effort differs from its default.

**A need nothing covers calls for a new skill.** When the project shows a need that
neither the toolkit nor a permitted gap-fill covers, and it would hold in other projects
too, it calls for a new skill. Don't stop the setup for it. Finish the other phases,
then propose every such skill together as the last part of the report, as section 5 of
`../place-knowledge.md` says, and wait for the answer.

## Phase 4 — Write CLAUDE.md

Read `context-files.md` first: the layout, the templates, what to leave out, and the
size limits. Write the content in `CLAUDE.md`, at the root and in every component that
earned one. Write no `AGENTS.md`, unless the user chose to keep theirs, as
`context-files.md` says. The root lists the trios. A convention that follows a
file type rather than a directory goes in a path-scoped rule in `.claude/rules/`.

## Phase 5 — Install the skills

1. Merge the marketplace entry from `assets/settings-template.json` into
   `.claude/settings.json`. Never replace the file; it often holds permissions and
   hooks already.
2. **Remove the dead keys**, by the rule in "Renamed and removed" in
   `plugin-catalog.md`.
3. Check every plugin you decided on against `.claude/plugin-sources.json`. If you have
   talked yourself into a plugin from a source the user unticked, drop the plugin; do
   not widen the file.
4. Install each one at project scope, and give every plugin a trio names its own line,
   even one that another plugin pulls in as a dependency. That writes the
   `enabledPlugins` entry phase 7 checks:

   ```bash
   claude plugin install <name>@<marketplace> --scope project
   ```

## Phase 6 — Create the trios

Read `trios.md` and the templates in `roles/`. For each trio you decided on, write
`.claude/agents/<task>-plan.md`, `<task>-do.md` and `<task>-check.md`, and the skill
that runs them, `.claude/skills/<task>/SKILL.md`. Write nothing for other tools. When
a file already exists at any of a trio's four paths, it is the user's: leave it, and
build the trio under a free task name or not at all, never in part. Report the clash.
A trio added to a project already set up also gets its row in the Trios table of the
root `CLAUDE.md`. That is one line, so it goes in whoever wrote the file.

Then write the record, `.claude/steward.json`, as `../record.md` describes: every file
phases 4 and 6 created, and every plugin phase 5 installed.

## Phase 7 — Verify

Do not declare success without checking:

1. **Every skill a trio names is enabled.** For each `plugin:skill` in a `skills:`
   list, the plugin is enabled in `.claude/settings.json`, and
   `claude plugin details <plugin>` lists the skill. A missing one is skipped with only
   a debug-log line, and the agent carries on without the standard.
2. **What you wrote parses.** Every JSON file is valid. The frontmatter of every agent,
   skill and `.claude/rules/*.md` file parses, and every rule's `paths:` globs match at
   least one real file. A rule whose globs match nothing never announces itself.
3. **Every `AGENTS.md` follows the answer.** With the swap, every one the project had is
   folded into its `CLAUDE.md`, or waits in the report for its rules' homes. With keep,
   every one has a `CLAUDE.md` beside it that imports it. An `AGENTS.md` that nothing
   imports never loads, and nothing reports that.
4. **The budget holds.** Every `CLAUDE.md` you wrote or folded into is within the
   limits in `context-files.md`.
5. **The record is complete.** Every file you created is in it, every hash matches
   the file on disk, and no file that existed before you came is listed.

Do **not** run `claude plugin validate` on the project's `.claude/` directory. It
expects a plugin or marketplace manifest, and fails with "No manifest found".

## Phase 8 — Report

Write the report in the shape of `report.md`. If phase 3 found a new skill to propose,
the proposal and its question end it. On a no, add the proposal to the record's
`declined`.

## Files

- `plugin-sources.md`: discovery, the source policy, filling gaps. Read before phase 1,
  and again for the gap-fills in phase 3.
- `context-files.md`: layout, templates, which components earn a file, what to leave
  out. Read before phases 2 and 4.
- `plugin-catalog.md`: the toolkit's skills by layer, when each applies, and the
  plugins that were renamed. Read before phase 3.
- `trios.md` and the templates in `roles/`: choosing and building a trio. Read before
  phases 3 and 6.
- `report.md`: the report. Read before phase 8.
- `../record.md`: the record of what was generated. Read before phase 6.
- `assets/settings-template.json`: the marketplace entry for `.claude/settings.json`.
- `assets/plugin-sources.json`: the starting shape for `.claude/plugin-sources.json`.
