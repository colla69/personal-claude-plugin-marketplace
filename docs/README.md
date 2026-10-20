# Documentation

Every page of the documentation, by kind, with where its substance comes from. Find
your starting point below, or the page you need in the tables.

The pages explain the marketplace and link to the files that hold its rules. The rules
themselves live in the plugins, mostly in the steward's references, under
`plugins/marketplace-steward/references/`. A page that disagrees with them is the one
that is wrong.

**Being written.** The documentation is being rewritten, page by page. In the Page
column, a page in backticks is planned and not written yet, and a linked page is
written. The Sources
column names the product files a page is checked against; the glossary links each.

## Start here

| You are | Start with |
|---|---|
| New, and wondering whether this is for you | [`../README.md`](../README.md), then [`tutorials/first-setup.md`](tutorials/first-setup.md) |
| Using the steward in your projects | [`guides/set-up-a-project.md`](guides/set-up-a-project.md), then the other guides |
| Working on the marketplace or the steward | [`../CONTRIBUTING.md`](../CONTRIBUTING.md), then the contributing pages |
| Weighing the idea itself | [`explanation/the-idea.md`](explanation/the-idea.md) |
| Looking up a word | [`reference/glossary.md`](reference/glossary.md) |

## Tutorials

Learn by doing, one path from start to finish.

| Page | You will | Sources | Status |
|---|---|---|---|
| [`tutorials/first-setup.md`](tutorials/first-setup.md) | Install the marketplace, set up a sample project, and run one trio | `set-up/procedure.md`, `set-up/report.md`, `roles/run.md` | Written, not yet tried |
| [`tutorials/first-contribution.md`](tutorials/first-contribution.md) | Turn a lesson into a pull request, and watch each safeguard work | `contribute.md`, `place-knowledge.md` | Written, not yet tried |

## Guides

One task each.

| Page | The task | Sources | Status |
|---|---|---|---|
| [`guides/set-up-a-project.md`](guides/set-up-a-project.md) | Set up a codebase, or a folder with no code | `set-up/procedure.md`, `context-files.md` | Written |
| [`guides/adopt-an-existing-setup.md`](guides/adopt-an-existing-setup.md) | Bring a project's own `CLAUDE.md`, rules, agents or hooks onto the marketplace | `adopt.md`, `record.md` | Written |
| [`guides/add-a-trio.md`](guides/add-a-trio.md) | Add a trio for one more recurring task | `trios.md`, `roles/` | Written |
| [`guides/run-a-trio.md`](guides/run-a-trio.md) | Use `/<task>`: the plan, the OK, sending work back | `roles/run.md` | Written |
| [`guides/keep-a-setup-current.md`](guides/keep-a-setup-current.md) | Update a setup after the marketplace or the project changed | `keep-current.md` | Written |
| [`guides/contribute-a-lesson.md`](guides/contribute-a-lesson.md) | Give the steward a lesson, and review its pull request | `contribute.md` | Written |
| [`guides/review-a-skill.md`](guides/review-a-skill.md) | Review a skill, a plugin, a change or the whole set | `evaluate-skills` | Written |
| [`guides/write-a-skill-by-hand.md`](guides/write-a-skill-by-hand.md) | Add or change a skill without the steward | `style.md`, `plugin-shape.md`, `place-knowledge.md` | Written |
| [`guides/migrate-from-old-names.md`](guides/migrate-from-old-names.md) | Move a project and a machine off the old plugin names | The Renamed table, `keep-current.md` | Written |
| [`guides/work-on-the-steward.md`](guides/work-on-the-steward.md) | Load the working copy, probe a mechanic, test a change | `plugin-shape.md`, the front door | Written |
| [`guides/troubleshoot.md`](guides/troubleshoot.md) | Fix what fails silently | The job files, `plugin-shape.md`, `check-catalog.mjs` | Written |

## Reference

Looked up, not read through.

| Page | It lists | Sources | Status |
|---|---|---|---|
| [`reference/plugins.md`](reference/plugins.md) | Every plugin: layer, skill, purpose, the signal that installs it, what it builds on | `marketplace.json`, `plugin-catalog.md` | Written |
| [`reference/the-steward.md`](reference/the-steward.md) | The four jobs: what starts each, what it reads, writes, asks and never does | The steward's job files | Written |
| [`reference/project-files.md`](reference/project-files.md) | Every file the steward writes in a project, and its shape | `context-files.md`, `record.md`, `plugin-sources.md` | Written |
| [`reference/permissions.md`](reference/permissions.md) | What the steward pre-allows and why, and the guard on `main` | The front door's frontmatter | Written |
| [`reference/commands.md`](reference/commands.md) | Every command the docs mention | The plugins and the scripts | Written |
| [`reference/checks.md`](reference/checks.md) | What each check catches, and what nothing catches | `check-catalog.mjs`, CI, `plugin-shape.md` | Written |
| [`reference/glossary.md`](reference/glossary.md) | Every term, in one line, with the file that holds its rules | The product files each term names | Written |

## Explanation

Why it is the way it is.

| Page | The question | Sources | Status |
|---|---|---|---|
| [`explanation/the-idea.md`](explanation/the-idea.md) | Why knowledge central and workers local, and why not only for code | `decisions.md` | Written |
| [`explanation/layers.md`](explanation/layers.md) | Why four layers, and why dependencies point one way | `place-knowledge.md` | Written |
| [`explanation/skills-and-roles.md`](explanation/skills-and-roles.md) | Why a skill holds knowledge and a role a lane | `style.md`, `plugin-shape.md` | Written |
| [`explanation/trios.md`](explanation/trios.md) | Why Plan, Do, Check, and why the stop | `trios.md`, `roles/` | Written |
| [`explanation/the-steward.md`](explanation/the-steward.md) | Why one package, why it asks only twice, why a checker | The front door, the job files | Written |
| [`explanation/placing-knowledge.md`](explanation/placing-knowledge.md) | Why diagnose first, and why strip | `place-knowledge.md` | Written |
| [`explanation/safety.md`](explanation/safety.md) | What keeps you in control | The job files | Written |
| [`explanation/cost.md`](explanation/cost.md) | What every enabled skill costs | `plugin-shape.md`, `evaluate-skills` | Written |
| [`explanation/decisions.md`](explanation/decisions.md) | Every decision, with its date, its reason and where it lives now | The product files each decision names | Written |

## Contributing

Working on the marketplace itself.

| Page | It covers | Sources | Status |
|---|---|---|---|
| `contributing/development-loop.md` | The local marketplace, the checks, CI | `CONTRIBUTING.md`, `plugin-shape.md` | To write |
| [`contributing/writing-docs.md`](contributing/writing-docs.md) | How a page here is written and reviewed | `style.md` | Written |
| `contributing/releases-and-migrations.md` | Why every merge is a release, and what a rename asks of every project | `plugin-shape.md`, the Renamed table | To write |
