# Migrate from old names

Move a machine and its projects off the plugin names from before the marketplace was
cut into layers, such as `clean-code`, `vue-dev` or `project-init`. The old names match
nothing now, and nothing reports it: a project that enables them simply runs without
those skills.

## On each machine

Replace the old setup plugin with the steward, which is installed for your user:

```bash
claude plugin marketplace update personal-claude-plugin-marketplace
claude plugin uninstall project-init@personal-claude-plugin-marketplace
claude plugin uninstall marketplace-init@personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

Uninstall whichever of the two old names `claude plugin list` shows; a machine has at
most one. Then start a new session.

## In each project

Open a session in the project and say "update the setup". What happens depends on what
the project has:

| The project has | The steward | You get |
|---|---|---|
| A setup made by the old init: `AGENTS.md` and `.claude/plugin-sources.json`, no record | Keeps it current | Each old key removed, and its successor installed where the project still shows its signal |
| Its own Claude setup, made by hand | Adopts it | Every rule given its home, as in [adopt an existing setup](adopt-an-existing-setup.md) |
| `.claude/steward.json` | Keeps it current | Nothing to migrate: it was set up under the new names |

The report lists every key it removed and every plugin it installed in its place. Commit
`.claude/settings.json` afterwards, so the next clone has the new names too.

## The names

| Old name | Now |
|---|---|
| `clean-code` | `universal-clean-code` |
| `developer` | `craft-development`, with part in `universal-work-discipline` |
| `code-review` | `craft-code-review` |
| `unit-testing` | `craft-unit-testing` |
| `refactoring` | `craft-refactoring` |
| `java-dev` | `language-java` |
| `typescript-dev` | `language-typescript` |
| `vue-dev` | `tools-vue`, with parts in `tools-pinia` and `tools-vue-typescript` |
| `project-init`, `marketplace-init` | `marketplace-steward`, for your user only |

The steward reads these from the Renamed table in
[`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md).
A plugin that split, such as `vue-dev`, isn't replaced by all its parts: each part is
installed only where the project shows its own signal, so a Vue project without Pinia
doesn't get `tools-pinia`.

## By hand

If you'd rather not run the steward, open the project's `.claude/settings.json`, replace
each old key under `enabledPlugins` with its new name from the table, and run
`claude plugin install <new-name>@personal-claude-plugin-marketplace --scope project`
for each. Keys in `.claude/settings.local.json` are yours to change the same way.
