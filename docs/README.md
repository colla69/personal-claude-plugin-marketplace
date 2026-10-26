# Documentation

Every page of the documentation, by kind, with where its substance comes from. Find
your starting point below, or the page you need in the tables.

The pages explain the marketplace and link to the files that hold its rules. The rules
themselves live in the plugins: docking in the steward's references, under
`plugins/marketplace-steward/references/`; the hooks in `plugins/marketplace-base/`; and
how a standard is placed and written in the curator's references, under
`plugins/marketplace-curator/references/`. A page that disagrees with them is the one
that is wrong.

The Sources column names the product files a page is checked against, and the glossary
links each. When one of them changes, reread the pages that name it. In the Status
column, "not yet tried" marks a page about the plugins' behaviour that hasn't yet run
on a real project.

## Start here

| You are | Start with |
|---|---|
| New, and wondering whether this is for you | [`../README.md`](../README.md), then [`tutorials/first-setup.md`](tutorials/first-setup.md) |
| Docking your projects | [`guides/dock-a-project.md`](guides/dock-a-project.md), then [`guides/work-in-a-docked-project.md`](guides/work-in-a-docked-project.md) |
| A curator | [`guides/contribute-a-lesson.md`](guides/contribute-a-lesson.md) |
| Working on the marketplace or its plugins | [`../CONTRIBUTING.md`](../CONTRIBUTING.md), then [`contributing/development-loop.md`](contributing/development-loop.md) |
| Weighing the idea itself | [`explanation/the-idea.md`](explanation/the-idea.md) |
| Looking up a word | [`reference/glossary.md`](reference/glossary.md) |
| Facing something that went wrong without saying so | [`guides/troubleshoot.md`](guides/troubleshoot.md) |

## Tutorials

Learn by doing, one path from start to finish.

| Page | You will | Sources | Status |
|---|---|---|---|
| [`tutorials/first-setup.md`](tutorials/first-setup.md) | Install the steward, dock a sample project, and do one change in it | `dock.md`, the base plugin | Written, not yet tried |
| [`tutorials/first-contribution.md`](tutorials/first-contribution.md) | Follow a correction from a session to a pull request, and watch each safeguard work | `collect.mjs`, `contribute.md`, `place-knowledge.md` | Written, not yet tried |

## Guides

One task each.

| Page | The task | Sources | Status |
|---|---|---|---|
| [`guides/dock-a-project.md`](guides/dock-a-project.md) | Dock a codebase or a folder with no code, including one with a setup of its own | `dock.md`, `tidy.md`, `agent-models.md`, `context-files.md` | Written, not yet tried |
| [`guides/work-in-a-docked-project.md`](guides/work-in-a-docked-project.md) | Work day to day: the index, the guard, a review, a correction | The base plugin, the steward's front door | Written, not yet tried |
| [`guides/contribute-a-lesson.md`](guides/contribute-a-lesson.md) | Work a lesson or a correction into the marketplace, as a curator | `contribute.md`, the curator's front door | Written, not yet tried |
| [`guides/review-a-skill.md`](guides/review-a-skill.md) | Review a skill, a plugin, a change or the whole set | `evaluate-skills`, `change-reviewer` | Written |
| [`guides/write-a-skill-by-hand.md`](guides/write-a-skill-by-hand.md) | Add or change a skill without the curator | `style.md`, `plugin-shape.md`, `place-knowledge.md` | Written |
| [`guides/migrate-from-old-names.md`](guides/migrate-from-old-names.md) | Move a project and a machine off the old plugin names and the trios | The Renamed table, `dock.md`, `tidy.md` | Written; its steward part not yet tried |
| [`guides/work-on-the-steward.md`](guides/work-on-the-steward.md) | Load the working copies, try a hook, probe a mechanic | `plugin-shape.md`, the three `marketplace-` plugins | Written |
| [`guides/troubleshoot.md`](guides/troubleshoot.md) | Fix what fails silently | The job files, the base plugin, `plugin-shape.md`, `check-catalog.mjs` | Written; its plugin parts not yet tried |

## Reference

Looked up, not read through.

| Page | It lists | Sources | Status |
|---|---|---|---|
| [`reference/plugins.md`](reference/plugins.md) | Every plugin: layer, skill, purpose, the signal that installs it, what it builds on | `marketplace.json`, `catalog.md` | Written |
| [`reference/the-steward.md`](reference/the-steward.md) | The steward's jobs and the curator's parts: what starts each, what it reads, writes, asks and never does | The steward's and the curator's files | Written, not yet tried |
| [`reference/the-base.md`](reference/the-base.md) | The base plugin's hooks and agents: what each reads, writes and sends, and how to turn it off | `hooks.json`, the base plugin's scripts and agents | Written, not yet tried |
| [`reference/project-files.md`](reference/project-files.md) | Every file docking writes in a project, and its shape | `context-files.md`, `dock.md`, `settings-template.json`, `plugin-sources.md` | Written, not yet tried |
| [`reference/permissions.md`](reference/permissions.md) | What the steward and the curator pre-allow and why, and the guard on `main` | The front doors' frontmatter | Written, not yet tried |
| [`reference/commands.md`](reference/commands.md) | Every command the docs mention | The plugins and the scripts | Written |
| [`reference/checks.md`](reference/checks.md) | What each check catches, and what nothing catches | `check-catalog.mjs`, `check-docs.mjs`, CI, `plugin-shape.md` | Written |
| [`reference/glossary.md`](reference/glossary.md) | Every term, in one line, with the file that holds its rules | The product files each term names | Written |

## Explanation

Why it is the way it is.

| Page | The question | Sources | Status |
|---|---|---|---|
| [`explanation/the-idea.md`](explanation/the-idea.md) | Why knowledge central and quirks local, who does what, and why not only for code | `decisions.md` | Written |
| [`explanation/layers.md`](explanation/layers.md) | Why four layers and a team layer, and why dependencies point one way | `place-knowledge.md`, `catalog.md` | Written |
| [`explanation/skills-and-agents.md`](explanation/skills-and-agents.md) | Why a skill holds knowledge and an agent a job, and why so few agents | `style.md`, `plugin-shape.md` | Written |
| [`explanation/the-steward.md`](explanation/the-steward.md) | Why three plugins, why docking only on request, why a light tidy, why a separate curator | The front doors, the job files | Written, not yet tried |
| [`explanation/the-base.md`](explanation/the-base.md) | Why hooks, why only the build and the tests, why models by the kind of work, why corrections from the conversation only | The base plugin, `settings-template.json` | Written, not yet tried |
| [`explanation/placing-knowledge.md`](explanation/placing-knowledge.md) | Why diagnose first, and why strip | `place-knowledge.md` | Written |
| [`explanation/safety.md`](explanation/safety.md) | What keeps you in control | The job files, the base plugin | Written, not yet tried |
| [`explanation/cost.md`](explanation/cost.md) | What every enabled skill costs, what the index costs, and how the steward measures a setup | `plugin-shape.md`, `evaluate-skills`, `cost.md`, `measure-setup.mjs`, `index.mjs` | Written; the measuring not yet tried |
| [`explanation/decisions.md`](explanation/decisions.md) | Every decision, with its date, its reason and where it lives now | The product files each decision names | Written |

## Contributing

Working on the marketplace itself.

| Page | It covers | Sources | Status |
|---|---|---|---|
| [`contributing/development-loop.md`](contributing/development-loop.md) | The local marketplace, the checks, CI | `plugin-shape.md`, the scripts, CI | Written |
| [`contributing/writing-docs.md`](contributing/writing-docs.md) | How a page here is written and reviewed | `style.md` | Written |
| [`contributing/releases-and-migrations.md`](contributing/releases-and-migrations.md) | Why every merge is a release, and what a rename asks of every project | `plugin-shape.md`, the Renamed table | Written |
