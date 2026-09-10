---
name: new-plugin
description: Add a plugin to the personal-claude-plugin-marketplace toolkit, or extend an existing one. Scaffolds the directory, writes the skill and agent in the house voice, and registers the plugin in all three places it has to appear. Use whenever the user wants to add, create, or extend a plugin in this marketplace, says "add a plugin for X", asks how to write a skill or subagent for the toolkit, or is editing marketplace.json by hand.
---

# New plugin

Adding a plugin to this toThe contribution patternolkit is four files and three registrations. The files
are the easy part. The registrations are where plugins get lost, and the writing
is where they get useless.

## First, decide it should exist

A new plugin is warranted when it carries **a standard you would apply repeatedly
across projects**. That is the whole bar. Two things that fail it:

- **A single task.** "Migrate this service to Postgres" is a prompt, not a plugin.
  A plugin is worth writing when you will want the same judgement again in six
  months on a different repo.
- **Something an existing plugin should absorb.** Testing conventions for Vue
  components belong in `vue-conventions` or `write-unit-tests`, not in a seventh
  plugin. Splitting a standard across two plugins means neither one is the
  reference, and the whole point of the skill/agent split is that there is exactly
  one.

Every enabled plugin adds its skill and agent descriptions to every session in
every project that enables it. That cost is paid continuously; the plugin has to
earn it continuously.

Say so and stop if the answer is no. Proposing the alternative — which existing
skill should grow a section — is more useful than scaffolding something that will
sit unused.

## The shape

```
plugins/<name>/
  .claude-plugin/plugin.json      # manifest — only .json goes in here
  README.md                       # what this is, for a human in the directory
  skills/<skill>/SKILL.md         # the standard
  skills/<skill>/references/*.md  # optional: detail loaded on demand
  skills/<skill>/assets/*         # optional: templates the skill writes out
  agents/<agent>.md               # the worker that applies the standard
```

`skills/` and `agents/` sit at the **plugin root**, not inside `.claude-plugin/`.
Putting them inside is the single most common reason a plugin validates, loads,
and appears empty.

Name the plugin for the domain (`vue-dev`, `refactoring`), the skill for the
activity (`vue-conventions`, `refactor-safely`), and the agent for the role
(`vue-developer`, `refactoring-specialist`). Skill and plugin names may collide —
`clean-code` is both — and that is fine when the plugin is the standard.

## Write the skill and the agent as a pair

Read `references/authoring-style.md` before writing either. It covers the voice,
what belongs in a description, and the split between the two files.

The short version, because it is the thing that goes wrong most:

**The skill is the standard. The agent is a worker that reads it.** The skill
holds every rule, every example, every ranking. The agent holds only what changes
when the work happens in a separate context — the failure mode it falls into and
the lane it must stay in. An agent that restates its skill has doubled the
maintenance cost of the standard and guaranteed the two copies will drift.

Start from `assets/SKILL.md.template` and `assets/agent.md.template`. They are
annotated with what each section is for.

## Then write the README

`README.md` at the plugin root, from `assets/README.md.template`. It is the only file
here written for a person rather than for Claude — what GitHub renders when someone
opens the directory.

Keep it to about 40 lines: what the plugin is, a table of its skill and agent, when it
fires, and **what it does not do**. That last section is the one worth the effort. The
marketplace entry already says what the plugin is for; only the README says the reviewer
never edits, the tester never touches production code, the refactorer notes bugs and
leaves them. Those constraints are what someone actually needs to know before enabling it.

The heading must be exactly `# <plugin-name>` — `check-catalog.mjs` enforces it, because
a copy-pasted README with the wrong name is the failure this catches.

## Register it in three places

This is the step that gets skipped, and skipping it is silent.

1. **`.claude-plugin/marketplace.json`** — add an entry to the `plugins` array
   with `name`, `source` (`"./plugins/<name>"`), `description`, `category`, and
   `tags`. Without this the plugin does not exist.

2. **`README.md`** — add a row to the plugin table. This is what a human reads.

3. **`plugins/project-init/skills/init-agent-setup/references/plugin-catalog.md`**
   — add a row with the **signals that justify recommending it**: what
   `project-init` should find in a repo before it suggests the plugin. Not "use
   this for Django work" but "`django` in `requirements.txt` or
   `pyproject.toml`". A recommendation trigger that isn't checkable produces
   plugins recommended on vibes.

   This is the registration that matters most and is easiest to forget. A plugin
   missing here still installs fine — it just never gets recommended to any
   project, forever.

`scripts/check-catalog.mjs` fails CI when these three disagree, so a miss is
caught. Run it yourself rather than waiting for CI:

```bash
node scripts/check-catalog.mjs
```

## Do not add a version

No plugin here declares `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so every push is
picked up as an update — which is what you want for standards you refine
continuously. Adding a version means bumping it on every release or users keep the
cached copy.

If a plugin does stabilize enough to pin, set the version in `plugin.json` **or**
the marketplace entry, never both. The manifest silently wins.

## Verify before reporting

```bash
claude plugin validate .                  # the marketplace and every plugin
node scripts/check-catalog.mjs            # the three lists agree
```

Both must pass. `claude plugin validate` warns about the missing `version` on
every plugin — that is expected here, not a finding.

Then load it and confirm it actually appears. Validation proves the JSON parses;
it does not prove the skill loads.

```bash
claude plugin marketplace add .
claude plugin install <name>@personal-claude-plugin-marketplace
```

## Report

```
## Plugin added — <name>

**Files:**
- <path> — <one line>

**Registered in:** marketplace.json, root README.md, plugin-catalog.md
**Recommendation trigger:** <what project-init will look for>

**Verified:** `claude plugin validate .` <result>, `node scripts/check-catalog.mjs` <result>

**Still yours to decide:**
- <anything you guessed at — the trigger signal especially, since it encodes taste>
```

## Reference files

- `references/authoring-style.md` — voice, descriptions, and the skill/agent split. Read before writing.
- `assets/SKILL.md.template` — annotated skeleton for the standard.
- `assets/agent.md.template` — annotated skeleton for the worker.
- `assets/README.md.template` — annotated skeleton for the human-facing README.
- `assets/plugin.json.template` — the manifest.
