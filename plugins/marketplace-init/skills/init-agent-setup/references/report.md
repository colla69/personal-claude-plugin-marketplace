# The report

The plan in phase 3 and the report in phase 8 share these tables. The user approves one
and later reads the other, so checking what was done against what was agreed is a
row-by-row comparison. Keep both short: tables and one-liners.

````
## Setup complete

**Toolkit version:** <the installed commit SHA of marketplace-init, so a reader can
tell which version of this skill produced the output>
**Components mapped:** <n>
**Sources consulted:** <each marketplace you read, with how many plugins it offered —
proof the list is live rather than remembered>

### Written
- <path> — <one line>

### Changed
- <path that already existed and was edited — omit the section if there were none>

### From your toolkit
| Plugin | Layer | Why — the evidence in this project |
|---|---|---|
| <name> | <Universal / Craft / Language / Framework & Tools> | <what you found that calls for it> |

### Gap-fills — from other marketplaces
| Plugin | Hosted by | Fills | What it adds that no toolkit plugin does |
|---|---|---|---|
| <name@marketplace> | <the marketplace's own repo, or the owner of the repo it points at> | <the need in this project> | <one line> |

<Drop this table entirely when the toolkit covered everything, and say that in one line
— it is the good outcome, not a shortfall. Say nothing at all about plugins from sources
that are switched off: they were never candidates, and counting them re-opens a question
the user already answered.>

### Trios
| Task | Run | Plan | Do | Check |
|---|---|---|---|---|
| <task> | `/<task>` | <skills; effort> | <skills; effort> | <skills; effort> |

<An effort that differs from the template's default carries its reason in the cell.>

### Installed
<Every plugin installed, and the dependencies that came with it. On another machine,
the same installs in one paste:>

```bash
<a marketplace add line for any marketplace not configured yet, then one
`claude plugin install <name>@<marketplace> --scope project` line per plugin from both
tables and per plugin a trio names>
```

Restart the session before running a trio: skills and agents installed mid-session
aren't available until the next one. Once you commit `.claude/`, the setup travels with
the project.

### Unverified — please confirm
- <anything you guessed at, and any command you could not run — build commands, a
  check that is not wired up, ambiguous ownership. This is the home for every unknown;
  the plan deliberately does not carry them>
- <any source that exists but was not offered in phase 1's single question, named once>
- <any toolkit plugin in the live list that `plugin-catalog.md` has no row for — the
  catalog is the maintainer's, and drift is theirs to fix>

Run `/context` in a new session to confirm the context files loaded.
````

The **Installed** block is not optional and not a footnote. It is what turns the next
machine's clone into a working setup, and it is the part a reader is most likely to skip
if it is buried in prose. `plugin-catalog.md` has the rules for composing it.
