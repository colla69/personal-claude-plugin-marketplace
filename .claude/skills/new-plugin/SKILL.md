---
name: new-plugin
description: Add a skill to the personal-claude-plugin-marketplace, or extend an existing one. Places the knowledge in the right layer, scaffolds the plugin, writes the skill in the house voice, and registers it in all three places it has to appear. Use whenever the user wants to add, create, split, or extend a plugin or skill in this marketplace, says "add a plugin for X" or "we need a skill for X", asks which layer something belongs in, or is editing marketplace.json by hand. Also use when deciding whether a piece of knowledge deserves its own plugin at all.
---

# New plugin

Adding a skill is three jobs in order: place the knowledge, write it, and register it
in the three places it has to appear. The knowledge for each job lives in the steward's
references, and this file is only the order they are used in. When the steward's
contribute job is built, it takes this procedure over (`docs/werkstatt/package-plan.md`,
step 5).

Every path below is under `plugins/marketplace-steward/references/`.

## 1. Decide where the knowledge goes

Read `place-knowledge.md` and run it: the diagnosis, the strip test, the layer, and the
bar a new skill has to clear. Look for the existing skill that should grow a section
before creating one.

When the topic overlaps an existing skill, or the layer is unclear, ask
`@marketplace-architect` for a read of the whole set first. Its answer informs the
decision; the decision stays here, with the user.

If the answer is that no new plugin is warranted, say so and stop. Naming the skill that
should grow a section is more useful than a plugin that will sit unused.

## 2. Scaffold the plugin

`author-skills/plugin-shape.md` has the files and the dependencies, and "Naming" in
`author-skills/style.md` has the name. Start from the templates in
`author-skills/assets/`.

## 3. Write the skill

Read `author-skills/style.md`, then start from `author-skills/assets/SKILL.md.template`.

Once the layer and the substance are decided, `@skill-writer` can render the file. The
deciding is not delegated: hand it a decided standard, and read the judgements it
reports having assumed.

## 4. Write the README

As "The README" in `author-skills/plugin-shape.md` says, from
`author-skills/assets/README.md.template`.

## 5. Register it in three places

As "Three registrations" in `author-skills/plugin-shape.md` says. This is the step that
gets skipped, and skipping it is silent: a plugin missing from the catalog installs
fine and is never chosen for any project.

## 6. Verify, then evaluate

Run the commands under "Verify" in `author-skills/plugin-shape.md`, and check every name
in `dependencies` by reading. Then hand the finished skill to `@skill-evaluator` before
reporting. The context that wrote it is the one least likely to find what is wrong
with it.

## Report

```
## Plugin added — <name>

**Layer:** <layer> — <the test question it answers>
**Builds on:** <dependencies, or "nothing">

**Files:**
- <path> — <one line>

**Registered in:** marketplace.json, root README.md, plugin-catalog.md
**Chosen when:** <what set-up will look for in a project>

**Verified:** `claude plugin validate .` <result>, `node scripts/check-catalog.mjs`
<result>, dependency names checked

**Still yours to decide:**
- <anything you guessed at — the layer and the trigger signal especially, since both
  encode taste>
```
