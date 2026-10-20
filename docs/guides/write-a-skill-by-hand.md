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
says what goes in each file. Declare the plugin of every skill yours names in
`dependencies`.

## 3. Write the skill

Read [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md)
first. The parts that decide whether the skill works at all:

- **The description is a trigger list**, in the words people type, not a summary.
- **It holds knowledge only**: no lane, no failure mode, no "you are the agent that…".
- **Every rule has its reason**, and the skill ends by saying when it yields.

## 4. Write the README

About 40 lines, headed exactly `# <plugin-name>`: what the skill covers, its layer and
what it builds on, when it fires, and what it leaves to other skills.

## 5. Register it in three places

| File | Add |
|---|---|
| `.claude-plugin/marketplace.json` | An entry with `name`, `source`, `description`, `category` and `tags` |
| [`docs/reference/plugins.md`](../reference/plugins.md) | A row in the table |
| [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) | A row with the signal set-up must find in a project before installing it |

The catalog row is the one people forget, and the one that matters most: without it the
plugin installs fine and is never chosen for any project. A rename also needs a row in
the catalog's Renamed table, or every project that has the old name loses the plugin.

## 6. Check it

```bash
claude plugin validate .
node scripts/check-catalog.mjs
claude --plugin-dir ./plugins/<name> plugin details <name>
```

Then [review it](review-a-skill.md), and try it: start a session with the plugin loaded,
type three prompts a person would really use, and see whether it fires. Validation
proves the JSON parses, not that the skill loads.

## 7. Commit and open a pull request

One plugin or one standard per commit, with a message that says what judgement changed
and why. Search your change for your projects' names before you push: the repo is
public.
