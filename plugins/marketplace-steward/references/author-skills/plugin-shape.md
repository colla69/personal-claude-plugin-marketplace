# Plugin shape

A skill plugin is one skill, and adding one takes three small files and three
registrations. The files are the easy part. The registrations are where plugins get
lost, and nothing reports a lost one. A `marketplace-` plugin differs in a few ways,
covered in the last section.

## The files

```
plugins/<layer>-<topic>/
  .claude-plugin/plugin.json      # manifest; only .json goes in here
  README.md                       # what this is, for a person reading the directory
  skills/<skill>/SKILL.md         # the standard
  skills/<skill>/references/*.md  # optional: detail loaded on demand
  skills/<skill>/assets/*         # optional: templates the skill writes out
```

There is no `agents/`. Skill plugins ship knowledge, and set-up generates the workers
in each project. `skills/` sits at the **plugin root**, not inside
`.claude-plugin/`. Put inside it, the plugin validates, loads, and is empty, and that is
the most common reason a new plugin shows nothing.

Start from the templates in `assets/`, beside this file. `SKILL.md.template` and
`README.md.template` are annotated with what each section is for.

## Dependencies

What goes in `dependencies` is the "Toward the general" check in
`place-knowledge.md`. A pairing that holds only for some projects goes in the catalog
row's signal instead, where set-up decides it per project.

`claude plugin validate` passes a dependency on a plugin that doesn't exist, or on one
in a more specific layer. Only `scripts/check-catalog.mjs` catches those. Nothing
catches a skill that is named but not declared, so check that by reading.

## The README

`README.md` at the plugin root is the one file written for a person rather than for
Claude: GitHub renders it when someone opens the directory. Keep it to about 40 lines:

- what the skill covers;
- its layer, and what it builds on;
- when it fires;
- **what it leaves to other skills.**

The last section earns the README its place. The marketplace entry already says what
the plugin is for; only the README says where it stops and which layer takes over.

The heading must be exactly `# <plugin-name>`. `check-catalog.mjs` enforces it, because
a copied README with the wrong name is the mistake it catches.

## Three registrations

The plugin list is mirrored in three files, and missing one is silent.

| File | What goes in it | Missing it means |
|---|---|---|
| `.claude-plugin/marketplace.json` | An entry with `name`, `source` (`./plugins/<name>`), `description`, `category` and `tags`. The `description` lives here and nowhere else | The plugin doesn't exist |
| The root `README.md` | A row in the plugin table | Nobody knows it's there |
| `plugins/marketplace-steward/references/set-up/plugin-catalog.md` | A row with the layer and the **signal that justifies choosing it**: what set-up must find in a project before installing it | It installs fine and is never chosen for any project |

The signal has to be checkable. Not "use this for Django work", but "`django` in
`requirements.txt` or `pyproject.toml`". A signal that can't be checked gets plugins
picked on vibes. The catalog is the registration that matters most and the easiest to
forget.

## No version

No plugin here declares `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so every push is picked
up as an update, which is what standards refined continuously need. A version would
keep every user on the cached copy until someone bumped it. `check-catalog.mjs` fails
on one, and CI runs `claude plugin validate` without `--strict`, which would turn the
"no version specified" warning into an error.

## Verify

```bash
claude plugin validate .            # the marketplace and every plugin
node scripts/check-catalog.mjs      # lists, layers and dependencies agree
```

Both must pass. "No version specified", once per plugin, is the policy working, not a
finding. Then load the plugin and confirm it appears: validation proves the JSON
parses, not that the skill loads.

```bash
claude plugin marketplace add .
claude plugin install <name>@personal-claude-plugin-marketplace
```

## A `marketplace-` plugin

A plugin that works on the marketplace itself, rather than on a project's work, is
named `marketplace-<name>` with category `marketplace`. Three things differ.

**It may ship agents.** It works on the knowledge system itself and has to exist before
any project agent can, so its helpers can't be generated into a project. The steward
ships the `codebase-cartographer`, and the contribution checker later. They follow the
role shape in `style.md`, and a read-only one carries `disallowedTools: Write, Edit,
NotebookEdit`.

**It keeps most of its knowledge out of skills.** It is installed in every project, so
every skill in it costs a description in every session. Knowledge that only its own
skills and agents read lives in plain reference files at the plugin root, read by path
as `${CLAUDE_PLUGIN_ROOT}/references/…`. A skill that reads them allows it in its
frontmatter: `allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/**)`. The leading `/` is
needed, because an absolute path in a permission rule starts with `//`. An agent
started from inside that skill may read them too. A file an agent must have loaded
from the start stays a skill, and the agent preloads it.

`${CLAUDE_PLUGIN_ROOT}` is filled in only inside a skill or an agent, not in a file read
by path. So the skill names each reference by its full path, and a reference names the
files around it relative to its own folder.

Hiding a skill with `disable-model-invocation: true` doesn't work instead: it can't
be preloaded, and Claude can't run it.

**Loading it for work needs its dependencies too.** A plugin whose dependency isn't
installed doesn't load at all, so a `--plugin-dir` session on it passes one
`--plugin-dir` for each plugin it depends on.
