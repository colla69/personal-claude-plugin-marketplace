# Contributing

This marketplace is prose: there is no build, no runtime and no dependencies, so a
change is judged by how well it is written and cut. The checks exist only for the
mistakes that fail silently. Most lessons arrive by themselves, as issues the base
plugin files from people's corrections, and every change reaches `main` through a pull
request a curator merges.

## The bar

A plugin is worth adding when it carries **a standard you would apply again, on a
different project, months from now**. It fails that bar when it is one task, which is a
prompt, or when an existing skill should grow a section instead. Every enabled plugin
costs its description in every session of every project that has it, so it has to earn
that for as long as it exists.

## Two ways in

| Way | When | Start with |
|---|---|---|
| **Through the curator** | An issue is waiting, or you learned something in a project: a skill got it wrong, or a rule is worth having everywhere | [Contribute a lesson](docs/guides/contribute-a-lesson.md) |
| **By hand** | You know what to write, and want to write it yourself in this checkout | [Write a skill by hand](docs/guides/write-a-skill-by-hand.md) |

Either way, the cut comes first: where the knowledge goes, which layer, which skill. Its
rules are in
[`place-knowledge.md`](plugins/marketplace-curator/references/place-knowledge.md), and
the house voice is in
[`style.md`](plugins/marketplace-curator/references/author-skills/style.md). They are
not repeated here on purpose.

## Before you push

```bash
claude plugin validate .
node scripts/check-catalog.mjs
node scripts/check-docs.mjs
```

The first passes with warnings, "no version specified" and "no description provided"
once per plugin each, which are the policy. The other two must say the catalog is in
sync and the docs in shape. CI runs all three on every pull request.

Then search your change for your projects' names. The repo is public, and no check can
list them without publishing them.

## Commits

One plugin or one standard per commit, with a message that says what judgement changed
and why. The skill files are the history of the curators' taste.

## More

| Page | Covers |
|---|---|
| [The development loop](docs/contributing/development-loop.md) | Loading what you change, its cost, trying it, the checks |
| [Work on the steward](docs/guides/work-on-the-steward.md) | Loading the working copies of the marketplace's own plugins, trying a hook, and probing a Claude Code mechanic before building on it |
| [Releases and migrations](docs/contributing/releases-and-migrations.md) | Why every merge is a release, and what a rename asks of every project |
| [Writing docs](docs/contributing/writing-docs.md) | How a page in `docs/` is written and reviewed |
| [Review a skill](docs/guides/review-a-skill.md) | Getting a change reviewed against the house standard |
| [Checks](docs/reference/checks.md) | What each check catches, and what nothing does |
