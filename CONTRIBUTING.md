# Contributing

This repo is prose. There is no build, no runtime, and no dependencies — the entire
product is how well the standards are written. Which means the review bar is editorial,
and the automation exists only to catch the two mistakes that are silent.

## The bar for a new plugin

A plugin is warranted when it carries **a standard you would apply repeatedly across
projects**. That is the whole test.

It fails the test when:

- **It's one task.** "Migrate this service to Postgres" is a prompt. A plugin is worth
  writing when you'll want the same judgement again in six months on a different repo.
- **An existing plugin should absorb it.** Vue testing conventions belong in
  `vue-conventions` or `write-unit-tests`. Splitting a standard across two plugins means
  neither one is *the* reference, and the two copies get edited separately until they
  disagree.

Every enabled plugin adds its descriptions to every session in every project that
enables it. That cost is paid continuously, so the plugin has to earn it
continuously. `claude plugin details <name>` prints the projected token cost — check it
before deciding.

## The guided path

```
/new-plugin
```

Places the knowledge in its layer, scaffolds the plugin from annotated templates, writes
the skill in the house voice, and performs all three registrations. This is the
recommended route; the rest of this document is what it does, for when you'd rather do
it by hand.

## Anatomy

```
plugins/<layer>-<topic>/
  .claude-plugin/plugin.json      # manifest — ONLY .json goes in here
  README.md                       # what this is, for a human in the directory
  skills/<skill>/SKILL.md         # the standard, and the plugin's only skill
  skills/<skill>/references/*.md  # optional: detail loaded on demand
  skills/<skill>/assets/*         # optional: templates the skill writes out
```

There is no `agents/`. A skill plugin ships knowledge, and `marketplace-init` generates
the workers in each project from its role templates. Only `marketplace-` plugins ship
agents, and `check-catalog.mjs` fails on any other plugin that does.

Every plugin carries its own `README.md`, headed `# <plugin-name>` — roughly 40 lines
covering the standard it carries, its layer and what it builds on, when it fires, and
what it **leaves to others**. That last section is the point: the marketplace entry
already says what a plugin is for, so the README earns its place by stating where it
stops. Start from
`.claude/skills/new-plugin/assets/README.md.template`.

`skills/` sits at the **plugin root**. Putting it inside `.claude-plugin/` produces a
plugin that validates, installs, and is completely empty. Nothing warns you.
`scripts/check-catalog.mjs` does.

Name the plugin `<layer>-<topic>` (`tools-vue`), with the layer prefix matching its
`category`, and the skill for the activity (`vue-conventions`). The four layers and
their test questions are in `docs/werkstatt/concept.md`, §4.1.

Declare the plugin of every skill the new one names in `dependencies`, pointing only
toward the more general layers. `check-catalog.mjs` fails on a name that doesn't exist
or points the wrong way; nothing catches a skill that is named but not declared.

## Writing

Read **`.claude/skills/new-plugin/references/authoring-style.md`** before
writing a skill or a role template. It is the canonical guide to the house voice, and
it is not duplicated here on purpose.

The one rule worth repeating, because it is the one that decays:

> **A skill is knowledge. A role is a worker's lane.**

The skill holds every rule, example, and ranking for one thing. A role template — Plan,
Do or Check, in `marketplace-init`'s `references/roles/` — holds only its lane, its
failure modes, and its report skeleton. Init turns the templates into agents in each
project. Knowledge written into a role has two homes, and the two copies drift.

## Register it in three places

The plugin list is mirrored in three files. Missing one is silent, which is the reason
the check script exists.

| File | What it is | Consequence of missing it |
|---|---|---|
| `.claude-plugin/marketplace.json` | The catalog | The plugin does not exist |
| `README.md` table | What a human reads | Nobody knows it's there |
| `…/init-agent-setup/references/plugin-catalog.md` | What `marketplace-init` reads | Installs fine, **never recommended to any project, ever** |

The catalog row needs the **signal that justifies recommending it** — what
`marketplace-init` should find in a repo before suggesting the plugin. Not "use this for
Django work" but "`django` in `requirements.txt` or `pyproject.toml`". A trigger that
isn't checkable produces plugins recommended on vibes.

## Versioning: don't

No plugin here declares a `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so every push is picked
up as an update — exactly what you want for standards you refine continuously.

`check-catalog.mjs` fails when a `version` appears, deliberately. If a plugin genuinely
stabilises enough to pin, remove that check and set the version in `plugin.json` **or**
the marketplace entry, never both — the manifest silently wins.

This is also why CI does **not** run `claude plugin validate --strict`: strict promotes
the "no version specified" warning to an error, and that warning is the policy working.

## The local development loop

Point the marketplace at the working directory. No push needed between edits:

```bash
claude plugin marketplace add .
claude plugin install <name>@personal-claude-plugin-marketplace
```

After editing, refresh and inspect:

```bash
claude plugin marketplace update personal-claude-plugin-marketplace
claude plugin details <name>          # component inventory + projected token cost
```

Then start a session and confirm the skill actually fires on a prompt you'd really type.
Validation proves the JSON parses. It does not prove the description triggers, and a
skill that never fires is the most common way a plugin here fails.

## Before you push

```bash
claude plugin validate .              # marketplace + every plugin (no --strict)
node scripts/check-catalog.mjs        # lists, layers, dependencies, no stray agents/
```

Both run in CI on every push and PR. The expected output of the first is "passed with
warnings" — one "no version specified" per plugin.

## Testing a plugin for real

`claude plugin eval` runs scored cases against a plugin, with a no-plugin baseline arm:

```bash
claude plugin eval ./plugins/<name> --ablation with-without
```

Cases live in `plugins/<name>/evals/**/case.yaml` (or `prompt.md` plus `graders/*.md`).
The ablation is the interesting part for this repo: it answers *did the plugin change
the outcome at all*, which for a prose-only toolkit is the only question that matters.

No plugin here has evals yet. Adding them to `universal-clean-code` first would be the
highest-value place to start, since every other quality plugin defers to it.

## Commits

One plugin or one standard per commit. When you change a skill, say in the message what
judgement changed and why — the skill files are the history of your taste, and a diff
that says "update clean-code" tells you nothing in a year.
