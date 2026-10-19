# The steward

Why one package sets projects up, adopts their setups, keeps them current and grows the
marketplace, why it asks you only two things, and why it works without lanes. Read this
to understand what you are handing to the steward when you install it.

## One package for the whole cycle

> "I think we need something more like a contribution plugin, more than an init and a
> contributor. … As I find different problems in different projects, I just talk to
> this contributor thingy, and it changes the marketplace, or it either updates old
> skills or it makes new skills and keeps everything up to date, so I can reuse it
> whenever I want it in another project."

Setting a project up and learning from it were first planned as two plugins, an init
and a contributor. They are one, `marketplace-steward`, because they are two ends of
the same cycle, and the person using them shouldn't have to know which end they are
at. You install it once, for your user, and talk to it in any project:

| You want | Its job |
|---|---|
| A project set up for agentic work | **Set up** |
| A project that already has its own `CLAUDE.md`, rules, agents or hooks, brought onto the marketplace | **Adopt** |
| A setup brought up to date after the project or the marketplace changed | **Keep current** |
| A lesson from this project kept for every other one | **Contribute** |

What it writes and reads for each is in `reference/the-steward.md`.

## Its scope: the setup and the knowledge

The steward doesn't do the project's work; the project's trios do. A steward that also
answered "add a feature" would compete with every trio for every request, and its
description says so: it is not for setting up a tool, a service or CI, nor for
remembering a preference, which is Claude's memory.

## It asks two things

> "No trio for the package, that would make the process too difficult. Only ask for an
> OK when creating new skills."

| It asks | Why |
|---|---|
| Which marketplaces a project may draw from, once, when no policy file exists | A project under a security or procurement policy looks the same as one without, so only a person can say |
| Your OK before it creates a new skill | A new skill is a decision about the cut: its layer, its name, where it stops. That is taste, and taste is yours |

Everything else it does and reports. That replaces the plan the first init showed
before writing anything. You stay in control in other ways: it never commits in your
project, so you review its work as a diff, and every change to the marketplace waits in
a pull request for your merge. [Safety](safety.md) lists every guard.

## No trio, and no lanes

A project's work runs as a trio, with a stop between Plan and Do. The steward's own work
doesn't, for the reason above: it would add a stop to every setup. Without a trio there
are no lanes to keep, so the steward is simply the one writer. It ships two helpers, and
both are read-only by their frontmatter:

- **The cartographer** surveys a codebase for set-up, so the steward reads a summary
  instead of every file.
- **The checker** reviews each change before its pull request: the house standard, how
  it fits the whole set, and the leak check, which makes sure nothing from your project
  reaches the public repo. A writer judging its own work is when review finds least, so
  the one who wrote the change isn't the one who checks it.

## Its own clone

A contribution never touches a checkout of yours. The steward keeps its own clone of the
marketplace in `~/.local/share/marketplace-steward/`, and gives each contribution its
own worktree on its own branch. Not under `~/.claude`: Claude Code asks before every
write there, whatever a skill allows, which would turn one contribution into dozens of
prompts. `reference/permissions.md` lists what it is allowed to run.

## The record

The steward keeps `.claude/steward.json` in each project it sets up: what it created,
with a hash of each file and of the template it came from. A later run uses it to tell
apart a file it wrote and nobody touched, a file you changed, and a file you removed. So
it never overwrites your edits, and never brings back what you took out.

## Two skills, and the rest read by path

The steward is installed in every project, so each of its visible skills costs a
description in every session. It shows two: the front door, which routes a request to a
job, and `evaluate-skills`, which its checker preloads. Everything else, the four
procedures and the knowledge they need, sits in reference files that the front door
reads by path when a job starts. [Cost](cost.md) explains the trade.

The front door is
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md);
each job's procedure is in
[`references/`](../../plugins/marketplace-steward/references/).
