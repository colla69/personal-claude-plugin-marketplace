# Keep current

A setup drifts from both ends. The project changes: a dependency arrives, a component
moves, a command is renamed. The marketplace changes: a plugin is renamed or split, a
role template improves, a new skill appears. None of it announces itself. A plugin key
that matches nothing fails silently, and an agent that names a skill which doesn't load
carries on without its standard.

Files named here sit in `set-up/` beside this file, except `record.md`, `adopt.md` and
`cost.md`, which are beside it. Read `record.md` first: every step below writes by its
rules. The front door's rules hold throughout.

**Run every step, unless the user named one symptom.** Then run step 1 and the step for
that symptom, and say in the report which checks you didn't run.

## 1. Refresh

Refresh every marketplace and read the live inventory, as `set-up/plugin-sources.md`
says, and read `.claude/plugin-sources.json` and `.claude/steward.json`. A project with
no policy file and no `AGENTS.md` was never set up: that is the set-up or the adopt job,
as the front door decides, not this one. An `AGENTS.md` counts because setups from
before the record wrote one. A project with no record was set up before the record
existed, and step 4 rebuilds nothing in it.

## 2. Plugin keys that no longer exist

Apply the dead-key rule in "Renamed and removed" in `set-up/plugin-catalog.md`. A
successor you install goes in as set-up's phase 5 installs, within the source policy.

## 3. Skills the trios can't load

For every `plugin:skill` in a `skills:` list under `.claude/agents/`, the plugin must
be enabled and `claude plugin details <plugin>` must list the skill. Install a missing
plugin as set-up's phase 5 does, or correct a skill name that the Renamed table moved.
A name you can't resolve goes in the report, because that agent is running without its
standard right now.

## 4. Trios from older templates

For each recorded file with a `from`, compare its `template` hash with the hash of that
template now. When the template changed and the file's hash still matches the record,
rebuild the file from the new template with its recorded `fill`, and refresh its entry.
When the file's hash doesn't match, leave it, and report that a newer template exists.

## 5. What the project now calls for

Read the manifests and the top-level tree again, against the signals in
`set-up/plugin-catalog.md` and within the source policy:

- **A toolkit plugin whose signal is now present** is installed as set-up's phase 5
  does. A role that should take it, by the rules in `set-up/trios.md`, gets it in its
  `skills:` when its file still matches the record; otherwise the report names it.
- **A recurring task that now has what its trio needs**, such as a test runner for a
  `test` trio, gets its trio, built as set-up's phase 6 does.
- **A plugin whose signal is gone** stays. Removing it costs a standard the user may
  still want, so the report names it as possibly unneeded.
- **A need nothing covers** is proposed as a new skill, as in set-up's phase 3.

Never add back what the record shows the user removed, and never propose a skill they
declined.

## 6. AGENTS.md from an older setup

Earlier setups wrote the context into `AGENTS.md`, with a `CLAUDE.md` beside it that
only imports it. When the project has an `AGENTS.md` and the record has no `context`,
ask the keep-or-swap question in `set-up/context-files.md`. Then apply the answer,
recorded or new, as that section says:

- **Swap:** fold every `AGENTS.md` that a `CLAUDE.md` imports into that `CLAUDE.md`,
  whoever wrote it. The content moves whole, so a user's edit moves with it.
- **Keep:** fold nothing. The `AGENTS.md` files stay the home of the context, and
  step 7 checks them.

An `AGENTS.md` that nothing imports never loaded. Leave it, and report it under
Unverified, because its rules need adoption before they are in force. The exception is
one that the record's `pending` names: an adoption left its rules there for their pull
requests, and step 8 looks after them.

## 7. CLAUDE.md lines that are no longer true

Check what can be checked: every path in a map or a "start here" line exists, and every
command in the commands table still exists where it says, as a script in the manifest
or a file in the tree. Where reading shows the new truth, such as a file that moved or
a script that was renamed, fix that line, whoever wrote the file. Where it doesn't,
leave the line and list it under Unverified. Never delete a line you can't replace: it
may be the only record of something nobody wrote down elsewhere.

## 8. Rules waiting for a merge

For each entry in the record's `pending`:

- **Merged:** install the plugin it went to, if the project doesn't have it, as
  set-up's phase 5 does and within the source policy, and update it with
  `claude plugin update <name>@<marketplace>`. Then apply the test for a live home in
  step 6 of `adopt.md`, against the installed copy.
- **Live, and the file still holds the rule exactly as recorded:** remove it as that
  step removes one, backup included, and drop the entry.
- **Live, but the rule was edited since:** leave it, drop the entry, and report it
  under Left alone. The edit may be a lesson the merged skill lacks; offer it as one.
- **Not merged yet:** the entry stays, and the report names its pull request.
- **Closed without a merge:** the rule stays where it is as a project rule. Drop the
  entry, and report it.

## 9. What the setup costs

Measure the setup, and act on what the measure shows, as `cost.md` says. Run this step
last, so that it measures the setup the steps before it left. When the user said the
setup costs too much, or asked what it costs, this is the step for that symptom.

## 10. Report

```
## Setup kept current

**Checks run:** <all, or the ones this symptom called for, and the ones you skipped>

### Changed
- <path> — <what changed, and which check called for it>

### Removed
- <key, file or rule> — <why, and the backup if there is one>

### Left alone
- <path> — <changed by the user since the steward wrote it; what a newer template
  would have changed>

### Possibly unneeded
- <plugin> — <the signal that is gone>

### Cost
<The section in `cost.md`.>

### Unverified
- <what you could not check or resolve>
```

Leave out a section that would be empty. When every check passed and nothing changed,
say so, list the checks you ran, and stop.
