# Releases and migrations

Know what a merge to `main` does to every project that uses the marketplace, and what a
rename or a removal asks of them, before you merge one.

## Every merge is a release

No plugin declares a `version`. For a plugin in a git-hosted marketplace, Claude Code
then takes the commit as the version, so every merge to `main` is an update. Claude Code
updates a marketplace by itself, unless a person's own settings turn that off, and the
update is active from the next session after that. By hand:

```bash
claude plugin marketplace update
claude plugin update <name>@<marketplace> --scope project
```

That is what standards refined continuously need: nothing to bump, nothing to forget. It
also means there is no staging step between a merge and every docked project. Review a
pull request as if it were the release, because it is.

A `version` would pin every user to the cached copy until someone bumped it, which is
why `check-catalog.mjs` fails on one and CI runs `claude plugin validate` without
`--strict`.

## What breaks a project silently

| Change | What happens in a project | What it needs |
|---|---|---|
| **Renaming a plugin** | Its settings still name the old plugin, which matches nothing; it runs without that skill | A row in the Renamed table, in the same change |
| **Removing a plugin** | The same | A row in the Renamed table, so a reader can tell where it went; docking removes the dead key either way |
| **Splitting a plugin** | The old name loads nothing; the parts aren't installed | A row naming the parts. Each part is installed only where the project shows its own signal |
| **Renaming a skill** inside a plugin | An agent that names it in `skills:` loads nothing for it | A row as `plugin:old-skill` and `plugin:new-skill`, and the agent's `skills:` fixed in the same change |
| **Changing a hook in `marketplace-base`** | It runs in every docked project from the next session after the update | Try it on a copy of a real project first: a hook that fails or blocks, fails everywhere |
| **Changing a skill's text** | It takes effect at the next update | Nothing, unless it changes what the skill is for |

The Renamed table is in
[`catalog.md`](../../plugins/marketplace-steward/references/catalog.md).
`evaluate-skills` treats a name that leaves the catalog without a row as Blocking, and
the curator's contribute job adds the row itself when it makes such a change.

## After a breaking merge

1. **On each machine:** the automatic update brings the change. Where a person turned
   it off, refresh and update the plugins, as above.
2. **In each project:** say "dock this project" again. Docking removes the dead keys,
   and installs the successors the project still calls for.
3. **Check the reports.** A key it couldn't place is listed: the project is running
   without that standard until you fix it.

[Migrate from old names](../guides/migrate-from-old-names.md) walks through the one big
rename the marketplace has had.

## Protect `main`

Branch protection on `main`, requiring a pull request, makes the merge the only way in,
for people and for the curator alike. [Permissions](../reference/permissions.md) says
why the curator's own rules are no substitute.
