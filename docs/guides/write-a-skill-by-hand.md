# Write a skill by hand

Add a skill to the marketplace, or change one, without the steward: in your own
checkout, on your own branch. The steward's contribute job does the same steps for you,
from a lesson; this is the path when you'd rather write it yourself.

## 1. Decide where it goes

Run
[`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md)
on what you want to write: its layer, whether an existing skill should grow a section
instead, and whether it clears the bar for a new skill at all. A standard you would
apply again on a different project, months from now, clears it; a single task doesn't.

If the answer is that an existing skill should grow, skip to step 3 and edit that one.

## 2. Make the plugin

Name it `<layer>-<topic>`, such as `tools-svelte`, with the skill named for the
activity, such as `svelte-conventions`. Start from the templates:

```
plugins/<layer>-<topic>/
  .claude-plugin/plugin.json      from assets/plugin.json.template
  README.md                       from assets/README.md.template
  skills/<skill>/SKILL.md         from assets/SKILL.md.template
```

The templates are in
[`author-skills/assets/`](../../plugins/marketplace-steward/references/author-skills/assets/),
and
[`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md)
says what goes in each file. In `dependencies`, declare the plugin of every skill
yours names that it needs in every project, in its own layer or a more general one. A
pairing that holds only for some projects goes in the catalog row's signal instead,
because a declared dependency is installed everywhere.

## 3. Write the skill

Read [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md)
first. The parts that decide whether the skill works at all:

- **The description is a trigger list**, in the words people type, not a summary.
- **It holds knowledge only**: no lane, no failure mode, no "you are the agent that…".
- **Every rule has its reason**, and the skill ends by saying when it yields.

## 4. Write the README

About 50 lines, headed exactly `# <plugin-name>`, in the template's order. The section
that earns it its place is what it leaves to other skills; "The README" in
[`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md)
has the rest.

## 5. Register it in three places

| File | Add |
|---|---|
| `.claude-plugin/marketplace.json` | An entry with `name`, `source`, `description`, `category` and `tags` |
| [`docs/reference/plugins.md`](../reference/plugins.md) | A row in the plugin table, and its name in the By layer table |
| [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) | A row with the signal set-up must find in a project before installing it |

The catalog row is the one people forget, and the one that matters most: without it the
plugin installs fine and is never chosen for any project. A rename also needs a row in
the catalog's Renamed table; without it, keep-current removes the old key and installs
no successor.

## 6. Check it

Run the checks, see what it costs, and try it, as
[the development loop](../contributing/development-loop.md) describes. Then
[review it](review-a-skill.md).

## 7. Commit and open a pull request

Commit and push as [the development loop](../contributing/development-loop.md#commit)
says: one plugin or one standard per commit, and a search for your projects' names
first, because the repo is public.
