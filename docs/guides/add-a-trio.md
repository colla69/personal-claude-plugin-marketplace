# Add a trio

Add a trio for one more kind of task your project repeats, such as `test` once a test
runner is in place, or `monthly-report` in a folder of reports. Why tasks run as trios
is in [trios](../explanation/trios.md).

**Not yet tried on real projects.** This guide follows the steward's procedures; the
first trials will show where it behaves otherwise.

## Before you start

- **The task repeats.** A task you do once is a prompt, not a trio.
- **The project is set up**, or the steward will set it up first: in a project with its
  own setup and no record, it adopts that setup before adding anything.

## Steps

1. **Ask for it:** "add a trio for releases", or "set up agents for writing the monthly
   report". Name the task as you would say it.
2. **Let it run.** The steward checks the sources, picks the skills each role needs,
   installs the ones the project lacks, and writes the trio. It picks them as a full
   set-up does: Do gets every skill the work needs, and Plan and Check the general
   ones. The rules and the default models and efforts are in
   [`trios.md`](../../plugins/marketplace-steward/references/set-up/trios.md).
3. **Read the report**, and start a new session so the new agents load.

## What you get

| File | Is |
|---|---|
| `.claude/agents/<task>-plan.md` | Plan, read-only |
| `.claude/agents/<task>-do.md` | Do, the only writer |
| `.claude/agents/<task>-check.md` | Check, read-only |
| `.claude/skills/<task>/SKILL.md` | The skill that runs them as `/<task>` |

The trio gets its row in the Trios table of the root `CLAUDE.md`, and the record gains
its four files.

## If a name is taken

When a file already exists at any of the four paths, it is yours, and the steward
leaves it. It builds the trio whole under a free name instead, or not at all, and the
report says which. It never writes a trio in part.

## Changing a trio by hand

Edit any of the four files as you like. The record holds the hash of each file as the
steward wrote it, so keep-current can tell your edit apart: it leaves an edited file,
and tells you when a newer template exists. To remove a trio, delete its four files.
The record still lists them, so the steward reads the missing files as your removal,
and the procedure asks it not to bring the trio back.
