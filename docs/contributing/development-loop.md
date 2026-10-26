# The development loop

Work on the marketplace in your own checkout: load what you are changing, see what it
costs, check it the way CI will, and know what each check does and doesn't catch.

## Load what you are changing

| You are changing | Load it with |
|---|---|
| A skill plugin | `claude --plugin-dir ./plugins/<name>`, plus one `--plugin-dir` for each plugin it depends on |
| The steward and the base | `claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/marketplace-base --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` |
| The curator | `claude --plugin-dir ./plugins/marketplace-curator --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` |
| The whole marketplace, as a user would get it | `claude plugin marketplace add .`, then `claude plugin install <name>@personal-claude-plugin-marketplace`, on a machine without the marketplace from GitHub |

A `--plugin-dir` copy replaces the installed plugin of the same name for that session. A
plugin whose dependency isn't loaded or installed doesn't load at all, so the
dependencies need their own `--plugin-dir`. [Work on the
steward](../guides/work-on-the-steward.md) has what is particular to the marketplace's
own plugins.

A marketplace added from `.` has the same name as the one from GitHub, and the base
plugin needs the GitHub one to know where to file issues. So on a machine
that has it, use `--plugin-dir`. After an edit to a marketplace added from `.`, run
`claude plugin marketplace update personal-claude-plugin-marketplace`.

Start a new session after each change: skills are read when a session starts.

## See what it costs

```bash
claude --plugin-dir ./plugins/<name> plugin details <name>
```

It prints the component inventory and the tokens each part adds to every session, and
what each costs when it runs. [Cost](../explanation/cost.md) explains why the always-on
part matters most.

## Try it

Validation proves the files parse, not that the skill fires. Start a session with the
plugin loaded, type three prompts a person would really use, and check that it loads on
those and stays quiet on ordinary requests that only sound alike. Then ask for a review:
[review a skill](../guides/review-a-skill.md).

`claude plugin eval ./plugins/<name> --ablation with-without` runs a plugin's eval cases
with and without it, which is the only measurement of whether it changes the outcome.
No plugin has eval cases yet; they go in `plugins/<name>/evals/`.

## Check it before you push

```bash
claude plugin validate .
node scripts/check-catalog.mjs
node scripts/check-docs.mjs
```

| Check | Expected result |
|---|---|
| `claude plugin validate .` | "Passed with warnings": "no version specified" and "no description provided", once per plugin each. Both are the policy |
| `node scripts/check-catalog.mjs` | "Catalog in sync", with the number of plugins |
| `node scripts/check-docs.mjs` | "Docs in shape", with the number of pages |

CI runs all three on every push to `main` and every pull request, and validates each
plugin on its own as well. [Checks](../reference/checks.md) lists what each catches, and
what nothing does.

## Commit

- **One plugin, or one standard, per commit.** A commit that changes two standards can't
  be reverted for one of them.
- **Say what judgement changed, and why.** The skill files are the history of the
  maintainer's taste; "update clean-code" tells nobody anything a year from now.
- **Search for your projects' names before you push.** The repo is public, and no check
  can list the names without publishing them.
- **Change the docs in the same pull request** when a change makes a page wrong. The
  map, [`docs/README.md`](../README.md), names every page's sources, so a change to a
  source shows which pages to reread.
