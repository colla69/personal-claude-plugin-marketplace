# Migrate from old names

Move a machine and its projects off the plugin names from before the marketplace was
cut into layers, such as `clean-code`, `vue-dev` or `project-init`. The old names match
nothing now, and no session reports it: a project that enables them simply runs without
those skills. Only `claude plugin list` shows them, as failed to load.

## On each machine

Replace the old setup plugin with the steward, which is installed for your user.
`claude plugin list` shows which of the two old names, `project-init` or
`marketplace-init`, the machine has; it has at most one:

```bash
claude plugin marketplace update personal-claude-plugin-marketplace
claude plugin uninstall <old-name>@personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

Then start a new session.

## In each project

Open a session in the project and say "update the setup". What happens depends on what
the project has.

**Not yet tried on real projects.** This part follows the steward's procedures; the
first trials will show where it behaves otherwise.


| The project has | The steward | You get |
|---|---|---|
| A setup made by the old init: `AGENTS.md` and `.claude/plugin-sources.json`, no record | Keeps it current | Each old key removed, and its successor installed where the project still shows its signal. Its `AGENTS.md` moved into its `CLAUDE.md` |
| Its own Claude setup, made by hand, with no `AGENTS.md` | Adopts it | Every rule given its home, as in [adopt an existing setup](adopt-an-existing-setup.md) |
| The same, with an `AGENTS.md` | Keeps it current, as a setup from before the record | The old keys replaced, an imported `AGENTS.md` moved into its `CLAUDE.md`, and nothing rebuilt. Say "bring our existing setup onto the marketplace" to adopt it instead |
| `.claude/steward.json` | Keeps it current | Nothing to migrate: it was set up under the new names |

The report lists every key it removed and every plugin it installed in its place. Commit
`.claude/settings.json` afterwards, so the next clone has the new names too.

## The names

Each old name has one row in the Renamed table of
[`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md),
which the steward reads. Most are a prefix away, such as `clean-code`, now
`universal-clean-code`. A plugin that split, such as `vue-dev`, isn't replaced by all
its parts: each part is installed only where the project shows its own signal, so a Vue
project without Pinia doesn't get `tools-pinia`.

## By hand

If you'd rather not run the steward, open the project's `.claude/settings.json` and
delete each old key under `enabledPlugins`. Then, for each successor the project shows
the signal for, run
`claude plugin install <name>@personal-claude-plugin-marketplace --scope project`,
which writes its key; a key written by hand enables a plugin nobody installed. Keys in
`.claude/settings.local.json` are yours to change the same way.
