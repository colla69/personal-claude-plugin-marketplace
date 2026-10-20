# Releases and migrations

Know what a merge to `main` does to every project that uses the marketplace, and what a
rename or a removal asks of them, before you merge one.

## Every merge is a release

No plugin declares a `version`. For a plugin in a git-hosted marketplace, Claude Code
then takes the commit as the version, so every merge to `main` is picked up as an update
the next time a machine refreshes:

```bash
claude plugin marketplace update
claude plugin update <name>@<marketplace>
```

That is what standards refined continuously need: nothing to bump, nothing to forget. It
also means there is no staging step between a merge and every project. Review a pull
request as if it were the release, because it is.

A `version` would pin every user to the cached copy until someone bumped it, which is
why `check-catalog.mjs` fails on one and CI runs `claude plugin validate` without
`--strict`.

## What breaks a project silently

| Change | What happens in a project | What it needs |
|---|---|---|
| **Renaming a plugin** | Its settings still name the old plugin, which matches nothing; it runs without that skill | A row in the Renamed table, in the same change |
| **Removing a plugin** | The same | A row in the Renamed table, so a reader can tell where it went; keep-current removes the dead key either way |
| **Splitting a plugin** | The old name loads nothing; the parts aren't installed | A row naming the parts. Each part is installed only where the project shows its own signal |
| **Renaming a skill** inside a plugin | A trio that names it in `skills:` loads nothing for it | A row as `plugin:old-skill` and `plugin:new-skill` |
| **Changing a role template** | Nothing yet: existing trios keep the old version | Nothing. Keep-current rebuilds untouched trios from the new template, and leaves edited ones |
| **Changing a skill's text** | It takes effect at the next update | Nothing, unless it changes what the skill is for |

The Renamed table is in
[`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md).
`evaluate-skills` treats a name that leaves the catalog without a row as Blocking, and
the steward's contribute job adds the row itself when it makes such a change.

## After a breaking merge

1. **On each machine:** refresh, and update the plugins, as above.
2. **In each project:** say "update the setup". Keep-current removes the dead keys,
   installs the successors the project still calls for, and fixes the skill names in
   the trios.
3. **Check the reports.** A key it couldn't place, or a skill name it couldn't resolve,
   is listed: that agent is running without its standard until you fix it.

[Migrate from old names](../guides/migrate-from-old-names.md) walks through the one big
rename the marketplace has had.

## Protect `main`

Branch protection on `main`, requiring a pull request, makes the merge the only way in,
for people and for the steward alike. [Permissions](../reference/permissions.md) says
why the steward's own rules are no substitute.
