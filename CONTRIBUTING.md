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
  neither one is *the* reference, and the skill/agent split only works because there is
  exactly one.

Every enabled plugin adds its skill and agent descriptions to every session in every
project that enables it. That cost is paid continuously, so the plugin has to earn it
continuously. `claude plugin details <name>` prints the projected token cost — check it
before deciding.

## The guided path

```
/toolkit-dev:new-plugin
```

Scaffolds the plugin from annotated templates, writes the skill and agent in the house
voice, and performs all three registrations. This is the recommended route; the rest of
this document is what it does, for when you'd rather do it by hand.

## Anatomy

```
plugins/<name>/
  .claude-plugin/plugin.json      # manifest — ONLY .json goes in here
  README.md                       # what this is, for a human in the directory
  skills/<skill>/SKILL.md         # the standard
  skills/<skill>/references/*.md  # optional: detail loaded on demand
  skills/<skill>/assets/*         # optional: templates the skill writes out
  agents/<agent>.md               # the worker that applies the standard
```

Every plugin carries its own `README.md`, headed `# <plugin-name>` — roughly 40 lines
covering what it is, its skill and agent, when it fires, and what it **does not** do. The
"does not" section is the point: the marketplace entry already says what a plugin is for,
so the README earns its place by stating the constraints. Start from
`plugins/toolkit-dev/skills/new-plugin/assets/README.md.template`.

`skills/` and `agents/` sit at the **plugin root**. Putting them inside `.claude-plugin/`
produces a plugin that validates, installs, and is completely empty. Nothing warns you.
`scripts/check-catalog.mjs` does.

Name the plugin for the domain (`vue-dev`), the skill for the activity
(`vue-conventions`), and the agent for the role (`vue-developer`). Skill and plugin names
may collide — `clean-code` is both — and that's right when the plugin *is* the standard.

## Writing

Read **`plugins/toolkit-dev/skills/new-plugin/references/authoring-style.md`** before
writing a skill or an agent. It is the canonical guide to the house voice, and it is not
duplicated here on purpose.

The one rule worth repeating, because it is the one that decays:

> **The skill is the standard. The agent is a worker that reads it.**

The skill holds every rule, example, and ranking. The agent holds only what changes when
the work happens in a separate context — the failure mode it falls into and the lane it
must stay in. An agent that restates its skill has doubled the maintenance cost of the
standard and guaranteed the two copies drift.

## Register it in three places

The plugin list is mirrored in three files. Missing one is silent, which is the reason
the check script exists.

| File | What it is | Consequence of missing it |
|---|---|---|
| `.claude-plugin/marketplace.json` | The catalog | The plugin does not exist |
| `README.md` table | What a human reads | Nobody knows it's there |
| `…/init-agent-setup/references/plugin-catalog.md` | What `project-init` reads | Installs fine, **never recommended to any project, ever** |

The catalog row needs the **signal that justifies recommending it** — what `project-init`
should find in a repo before suggesting the plugin. Not "use this for Django work" but
"`django` in `requirements.txt` or `pyproject.toml`". A trigger that isn't checkable
produces plugins recommended on vibes.

## Versioning: don't

No plugin here declares a `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so every push is picked up
as an update — exactly what you want for standards you refine continuously.

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
Validation proves the JSON parses. It does not prove the description triggers, and a skill
that never fires is the most common way a plugin here fails.

## Before you push

```bash
claude plugin validate .              # marketplace + every plugin (no --strict)
node scripts/check-catalog.mjs        # the three lists agree
```

Both run in CI on every push and PR. The expected output of the first is "passed with
warnings" — one "no version specified" per plugin.

## Testing a plugin for real

`claude plugin eval` runs scored cases against a plugin, with a no-plugin baseline arm:

```bash
claude plugin eval ./plugins/<name> --ablation with-without
```

Cases live in `plugins/<name>/evals/**/case.yaml` (or `prompt.md` plus `graders/*.md`).
The ablation is the interesting part for this repo: it answers *did the plugin change the
outcome at all*, which for a prose-only toolkit is the only question that matters.

No plugin here has evals yet. Adding them to `clean-code` first would be the highest-value
place to start, since every other quality plugin defers to it.

## Commits

One plugin or one standard per commit. When you change a skill, say in the message what
judgement changed and why — the skill files are the history of your taste, and a diff that
says "update clean-code" tells you nothing in a year.
