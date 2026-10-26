# Migrate from old names

Move a machine and its projects off the plugin names from before the marketplace was
cut into layers, such as `clean-code`, `vue-dev` or `project-init`, and off the
earlier steward's trios. The old names match nothing now, and no session reports it: a
project that enables them simply runs without those skills. Only `claude plugin list`
shows them, as failed to load.

## On each machine

Replace the old setup plugin with the steward, which is installed for your user.
`claude plugin list` shows which of the two old names, `project-init` or
`marketplace-init`, the machine has; it has at most one:

```bash
claude plugin marketplace update personal-claude-plugin-marketplace
claude plugin uninstall <old-name>@personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

Then run `/reload-plugins` in a session that is already open, or start a new one.

## In each project

Open a session in the project and say "dock this project". Docking reads what the
project has and works from it.

**Not yet tried on real projects.** This part follows the steward's procedure; the
first trials will show where it behaves otherwise.

| The project has | You get |
|---|---|
| A setup made by the old init: `AGENTS.md` and `.claude/plugin-sources.json` | Each old key removed, and its successor installed where the project still shows its signal. Its `AGENTS.md` kept or moved into its `CLAUDE.md`, as you answer |
| Trios and `.claude/steward.json`, from the earlier steward | The generated agents, run skills, record and Trios table removed, after a backup of any you edited, and the base plugin installed |
| Its own Claude setup, made by hand | A light tidy, as in [dock a project](dock-a-project.md#a-project-with-a-setup-of-its-own) |

The report lists every key it removed and every plugin it installed in its place. Commit
`.claude/` afterwards, so the next clone has the new names too.

## The names

Each old name has one row in the Renamed table of
[`catalog.md`](../../plugins/marketplace-steward/references/catalog.md), which the
steward reads. Most are a prefix away, such as `clean-code`, now
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
