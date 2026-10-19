---
name: init-agent-setup
description: Set a project up for agentic work — read it, write its AGENTS.md, install the marketplace skills it needs, and generate a Plan/Do/Check trio for each kind of task it repeats. Use whenever the user opens a new or unconfigured project and says "set this up", "onboard me to this repo", "there's no AGENTS.md or CLAUDE.md here", "which skills should this project use", or asks for agents to be created for a task. Prefer this over a bare /init when the user wants skills installed and agents generated, not just a single memory file. Also use on a folder with no code in it, such as documents, reports or templates, since the setup works for any kind of work.
---

# Project initializer

Turn a project into a working setup, in a fixed order: read it, write the `AGENTS.md`
that holds what reading cannot tell, install the skills that follow from it, and create
the trios that use those skills. Each step builds on the one before it.

The goal is **not** one giant file describing the project. Claude can read the project.
The goal is to capture what it *cannot* derive by reading: commands that aren't
obvious, conventions that differ from the defaults, boundaries that must not be
crossed, and the reasons things are the way they are.

## Rules for the whole run

- **Nothing is written before the user accepts the plan in phase 3**, apart from the
  source policy that phase 1 decides. A wrong context file or agent loads into every
  session and quietly misleads.
- **Touch git for nothing.** No branch, no commit, no stage, no stash. The user branches
  before calling you and decides afterwards what to keep; your part is to say exactly
  what you wrote.
- **Unknowns go to the report**, under Unverified. In a plan someone is skimming to say
  "go", they get skimmed; next to what was written, they are the list of things to fix.
- **Keep it short.** Plans and reports are tables and one-liners.

## Phase 1 — Preparation

Settle where skills may come from before looking at the project. A project under a
procurement or security policy looks identical to one with none.

Refresh every marketplace, read the live inventory, and then read the source policy,
or ask for one as a single checklist when none exists. Write it to
`.claude/plugin-sources.json`. Read `references/plugin-sources.md` first: it holds the
commands, the checklist, and the rules for the file.

## Phase 2 — Read the project

1. **What exists already.** `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.cursor/rules/`,
   `.github/copilot-instructions.md`. If any of them is there, you are **improving**,
   not replacing: say so, keep what is still true, and delete nothing. Read
   `.cursor/rules/` and the Copilot file for content worth carrying into `AGENTS.md`.
2. **What the project is.** For a codebase, delegate the survey to
   `marketplace-init:codebase-cartographer`, and give it the components you suspect
   from the manifest and the top-level tree. It holds the method, and its report has
   the fields phase 3 needs. Read the README and any docs yourself. For a folder
   without code, read its documents, templates and instructions, and find out what is
   produced here, for whom, and how it is checked.
3. **Its components.** The units someone would think about separately: what each is
   for, where to start, and what is local to it. `references/context-files.md` says
   when a component earns a file of its own.
4. **Its recurring tasks.** The kinds of work that happen here again and again. Each
   is a candidate trio; `references/trios.md` says how to propose them.

## Phase 3 — Propose, then stop

Show the plan before touching the filesystem:

- the files you will write, and roughly what goes in each;
- the skills you will install, as the **From your toolkit** and **Gap-fills** tables in
  `references/report.md`, with the same columns and the same rule for dropping the
  gap-fill table;
- the trios, as the **Trios** table in the same file: each role's skills, and its
  effort, with a reason wherever it differs from the default.

`references/plugin-catalog.md` says when a toolkit skill applies, and
`references/trios.md` which skill goes to which role.

**Then stop, and wait for the user's OK or corrections.** An OK can be as short as
"go" or "just do it", but only as an answer to a plan you have shown.

## Phase 4 — Write AGENTS.md

Read `references/context-files.md` first: the layout, the templates, what to leave
out, and the size limits. Write the content in `AGENTS.md`, with a one-line `CLAUDE.md`
containing `@AGENTS.md` beside it, at the root and in every component that earned one.
The root lists the trios. A convention that follows a file type rather than a directory
goes in a path-scoped rule in `.claude/rules/`.

## Phase 5 — Install the skills

1. Merge the marketplace entry from `assets/settings-template.json` into
   `.claude/settings.json`. Never replace the file; it often holds permissions and
   hooks already.
2. Check every plugin in the accepted plan against `.claude/plugin-sources.json`. If
   you have talked yourself into a plugin from a source the user unticked, drop the
   plugin; do not widen the file.
3. Install each one at project scope, and give every plugin a trio names its own line,
   even one that another plugin pulls in as a dependency. That writes the
   `enabledPlugins` entry phase 7 checks:

   ```bash
   claude plugin install <name>@<marketplace> --scope project
   ```

## Phase 6 — Create the trios

Read `references/trios.md` and the templates in `references/roles/`. For each trio in
the accepted plan, write `.claude/agents/<task>-plan.md`, `<task>-do.md` and
`<task>-check.md`, and the skill that runs them, `.claude/skills/<task>/SKILL.md`.
Write nothing for other tools.

## Phase 7 — Verify

Do not declare success without checking:

1. **Every skill a trio names is enabled.** For each `plugin:skill` in a `skills:`
   list, the plugin is enabled in `.claude/settings.json`, and
   `claude plugin details <plugin>` lists the skill. A missing one is skipped with only
   a debug-log line, and the agent carries on without the standard.
2. **What you wrote parses.** Both JSON files are valid. The frontmatter of every agent,
   skill and `.claude/rules/*.md` file parses, and every rule's `paths:` globs match at
   least one real file. A rule whose globs match nothing never announces itself.
3. **The pairing holds.** Every `AGENTS.md` has a `CLAUDE.md` beside it containing the
   import. Without it the file never loads, and nothing reports that.
4. **The budget holds.** Every `AGENTS.md` is within the limits in
   `references/context-files.md`.

Do **not** run `claude plugin validate` on the project's `.claude/` directory. It
expects a plugin or marketplace manifest, and fails with "No manifest found".

## Phase 8 — Report

Write the report in the shape of `references/report.md`. List every path you created
and every path you changed, separately. That list is the whole handover: it is what the
user reads to decide what to keep, and `git diff` does the rest. Do not run git, and do
not tell them how to undo you.

## Reference files

- `references/plugin-sources.md` — discovery, the source policy, filling gaps. Read
  before phase 1, and again for the gap-fills in phase 3.
- `references/context-files.md` — layout, templates, which components earn a file,
  what to leave out. Read before phases 2 and 4.
- `references/plugin-catalog.md` — the toolkit's skills by layer, and when each
  applies. Read before phase 3.
- `references/trios.md` and the templates in `references/roles/` — proposing and
  building a trio. Read before phases 3 and 6.
- `references/report.md` — the plan's tables and the final report. Read before phases
  3 and 8.
- `assets/settings-template.json` — the marketplace entry for `.claude/settings.json`.
- `assets/plugin-sources.json` — the starting shape for `.claude/plugin-sources.json`.
