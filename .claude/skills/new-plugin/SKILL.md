---
name: new-plugin
description: Add a skill to the personal-claude-plugin-marketplace, or extend an existing one. Places the knowledge in the right layer, scaffolds the plugin, writes the skill in the house voice, and registers it in all three places it has to appear. Use whenever the user wants to add, create, split, or extend a plugin or skill in this marketplace, says "add a plugin for X" or "we need a skill for X", asks which layer something belongs in, or is editing marketplace.json by hand. Also use when deciding whether a piece of knowledge deserves its own plugin at all.
---

# New plugin

A plugin here is one skill, and adding one takes three small files and three
registrations. The files are the easy part. The registrations are where plugins get
lost, and the cut is where they get useless.

## First, decide where the knowledge goes

Run the placement in `references/authoring-style.md` ("The cut") and stop at the first
yes:

- **A fact about one project** goes in that project's `AGENTS.md`. Not here.
- **What a worker does and must not do** goes in a role template, in
  `plugins/marketplace-init/skills/init-agent-setup/references/roles/`. Not a new
  plugin.
- **Anything else** is a skill. Name its layer using the test questions in
  `docs/werkstatt/concept.md` §4.1. If it seems to sit in two layers, it is two skills.

Then check the bar. A new skill is warranted when it carries **a standard you would
apply again across projects**. Two things fail that bar:

- **A single task.** "Migrate this service to Postgres" is a prompt, not a skill. A
  skill is worth writing when you will want the same judgement again in six months on
  a different project.
- **Something an existing skill should absorb.** Grep the other skills for the rules
  you are about to write. If one of them already covers the topic, extending it beats
  creating a near-duplicate, because two skills on one topic means neither is the
  reference.

When the topic overlaps an existing skill, or the layer is unclear, ask
`@marketplace-architect` for a read of the whole set before scaffolding. Its answer
informs the decision; the decision stays here, with the user.

The opposite mistake exists too. Granularity follows reuse, so cut where a different
project would want one part but not the other. JUnit conventions don't belong inside a
Java skill, because a Java project on TestNG would have to take them anyway.

Every enabled plugin adds its description to every session in every project that
enables it. That cost is paid continuously, so the plugin has to earn it continuously.

If the answer is no, say so and stop. Proposing the alternative, such as which existing
skill should grow a section, is more useful than scaffolding something that will sit
unused.

## The shape

```
plugins/<layer>-<topic>/
  .claude-plugin/plugin.json      # manifest; only .json goes in here
  README.md                       # what this is, for a person reading the directory
  skills/<skill>/SKILL.md         # the standard
  skills/<skill>/references/*.md  # optional: detail loaded on demand
  skills/<skill>/assets/*         # optional: templates the skill writes out
```

There is no `agents/`. Skill plugins ship knowledge, and init generates the workers in
each project. `skills/` sits at the **plugin root**, not inside `.claude-plugin/`.
Putting it inside is the most common reason a plugin validates, loads, and appears
empty.

Name the plugin `<layer>-<topic>`, where the prefix is the same word as the `category`
(`universal`, `craft`, `language` or `tools`). Name the skill for the activity, for
example `craft-unit-testing` containing `write-unit-tests`.

## Declare what it builds on

The plugin of every skill the new one names goes in `dependencies` in `plugin.json`.
Each dependency must point toward a more general layer, and must be unconditional. A
pairing that holds only for some projects, such as Vue with TypeScript, is decided in
the catalog at recommendation time, not in the manifest.

`claude plugin validate` passes a dependency on a plugin that doesn't exist, or on one
in a more specific layer. Only `check-catalog.mjs` catches those. Nothing catches a
skill that is named but not declared, so check that yourself.

## Write the skill

Read `references/authoring-style.md` before writing, then start from
`assets/SKILL.md.template`, which is annotated with what each section is for.

Once the layer and the substance are decided, `@skill-writer` can render the file.
The deciding is not delegated: hand it a decided standard, and read the judgements it
reports having assumed.

The thing that goes wrong most: **the skill is knowledge, not a worker.** Plan, Do and
Check all read it, so it holds no lane, no failure mode, and no "you are the agent
that…". Text like that belongs in a role template. If you find you need it, the skill
you are writing is partly a role.

## Then write the README

`README.md` at the plugin root, from `assets/README.md.template`. It is the only file
here written for a person rather than for Claude: it is what GitHub renders when
someone opens the directory.

Keep it to about 40 lines:

- what the skill covers;
- its layer, and what it builds on;
- when it fires;
- **what it leaves to other skills.**

That last section is the one worth the effort. The marketplace entry already says what
the plugin is for; only the README says where it stops and which layer takes over.

The heading must be exactly `# <plugin-name>`. `check-catalog.mjs` enforces this,
because a copy-pasted README with the wrong name is the failure it catches.

## Register it in three places

This is the step that gets skipped, and skipping it is silent.

1. **`.claude-plugin/marketplace.json`**: add an entry to the `plugins` array with
   `name`, `source` (`"./plugins/<name>"`), `description`, `category` (the layer) and
   `tags`. Without this the plugin does not exist. The `description` lives here and
   nowhere else.

2. **`README.md`**: add a row to the plugin table. This is what a person reads.

3. **`plugins/marketplace-init/skills/init-agent-setup/references/plugin-catalog.md`**:
   add a row with the layer and the **signals that justify choosing it**, meaning what
   init should find in a project before it installs the skill. Not "use this for
   Django work", but "`django` in `requirements.txt` or `pyproject.toml`". A trigger
   that can't be checked gets plugins picked on vibes.

   This is the registration that matters most and is easiest to forget. A plugin
   missing here still installs fine. It just never gets chosen for any project.

`scripts/check-catalog.mjs` fails CI when these three disagree, so a miss is caught.
Run it yourself rather than waiting for CI:

```bash
node scripts/check-catalog.mjs
```

## Do not add a version

No plugin here declares `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so every push is picked
up as an update. That is what you want for standards you refine continuously. A version
would have to be bumped on every release, or users keep the cached copy.

## Verify before reporting

```bash
claude plugin validate .                  # the marketplace and every plugin
node scripts/check-catalog.mjs            # lists, layers and dependencies agree
```

Both must pass, and every name in `dependencies` must exist in `marketplace.json`.
`claude plugin validate` warns about the missing `version` on every plugin. That is
expected here, not a finding.

Then load the plugin and confirm it actually appears. Validation proves the JSON
parses; it does not prove the skill loads.

```bash
claude plugin marketplace add .
claude plugin install <name>@personal-claude-plugin-marketplace
```

Hand the finished skill to `@skill-evaluator` before reporting. The context that wrote
it is the one least likely to find what is wrong with it.

## Report

```
## Plugin added — <name>

**Layer:** <layer> — <the test question it answers>
**Builds on:** <dependencies, or "nothing">

**Files:**
- <path> — <one line>

**Registered in:** marketplace.json, root README.md, plugin-catalog.md
**Chosen when:** <what init will look for in a project>

**Verified:** `claude plugin validate .` <result>, `node scripts/check-catalog.mjs`
<result>, dependency names checked

**Still yours to decide:**
- <anything you guessed at — the layer and the trigger signal especially, since both
  encode taste>
```

## Reference files

- `references/authoring-style.md`: the cut, voice, descriptions, and the split between
  skills and roles. Read it before writing.
- `assets/SKILL.md.template`: annotated skeleton for the standard.
- `assets/README.md.template`: annotated skeleton for the human-facing README.
- `assets/plugin.json.template`: the manifest.
