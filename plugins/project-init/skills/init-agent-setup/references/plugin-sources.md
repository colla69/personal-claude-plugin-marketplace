# Sourcing plugins

Recommend from what exists right now, not from a list written months ago. And what you
are *allowed* to recommend is the project's decision, not this document's — a repo can
sit under a policy that forbids outside code entirely, and nothing in a skill file knows
that. `plugin-sources.json` is where the person who knows answers it.

Two separate questions, in this order:

1. **What is out there?** — answered live, from the machine.
2. **What may be recommended here?** — answered by the permission file.

## Discover what exists

```bash
claude plugin marketplace update
claude plugin list --available --json
```

The update is not optional, and it is deliberately unqualified: **no marketplace name**,
so every configured marketplace refreshes. `list` reads the local cache, so without it
you are recommending whatever those marketplaces looked like the last time anything
fetched them — the exact staleness this phase exists to eliminate. Passing one name is
the trap, not the shortcut: the toolkit comes back current while everything you would
fill gaps from stays stale, and nothing in the output says which half is which.

The JSON has two arrays. `installed` is what this machine already has; `available` is
everything else the configured marketplaces offer, and it **excludes** what is already
installed. The union of the two is the real inventory — read only `available` and you
will report the toolkit as missing the plugins the user already runs.

Each entry in `available` carries:

| Field | Use |
|---|---|
| `pluginId` | `name@marketplace` — the exact string for `enabledPlugins` and `install` |
| `description` | The author's own trigger list. Match it against repo evidence |
| `marketplaceName` | The key to look up in `plugin-sources.json` |
| `source` | Where the code actually lives — see below |
| `installCount` | Present for `claude-plugins-official`, absent for local marketplaces |

If `claude plugin marketplace list` does not show the toolkit, the commands above return
nothing from it. Say so and fall back to
`https://raw.githubusercontent.com/colla69/personal-claude-plugin-marketplace/main/.claude-plugin/marketplace.json`
rather than recommending from memory.

## What the `source` field tells you

This is a fact about where code is hosted, not a ranking. Report it; let the permission
file decide what to do with it.

- **A string** — `"source": "./plugins/skill-creator"` — means the plugin lives inside
  the marketplace repository itself. In `claude-plugins-official` that is Anthropic's
  own repo; in the toolkit it is `colla69/personal-claude-plugin-marketplace`.
- **An object** means the marketplace lists the plugin but the code lives in someone
  else's repository. The `sha` pins it to one commit, so what installs is what was
  reviewed — not whatever that branch holds today.

  ```json
  { "source": "git-subdir",
    "url": "https://github.com/prisma/claude-plugin.git",
    "ref": "v1.5.5",
    "sha": "30287f5e3f122a646d1ac5ca3ab96e130c52a3ad" }
  ```

For an object source, check that the repo owner is who the plugin claims to be. A Prisma
plugin served from `github.com/prisma` is the vendor shipping its own tooling. The same
plugin served from an unrelated account is a different proposition, whatever the
description says.

There is no pre-install inventory command — `claude plugin details` resolves installed
plugins only. Inspecting an object-source plugin before installing means reading its
repository at the pinned `sha`. Say that in the report rather than implying you checked.

## The permission file

`plugin-sources.json` answers what may be recommended. Phase 1 asks the user and writes
it; every later phase only reads it.

**Ask only when no policy file exists.** Take the first one that does:

1. `.claude/plugin-sources.json` in the project — use it and say in one line what it
   permits. It is committed, the policy travels with the repo, and re-asking invites a
   passerby to overturn a decision the team made.
2. `~/.claude/plugin-sources.json` — the user's standing preference across repos. Use
   it the same way, and copy it into the project so this repo carries its own policy.
3. Neither — **now** ask, pre-ticking from `assets/plugin-sources.json`.

A question the user has already answered is not a safety check, it is a toll. The file
is the answer; asking again every run is how a deliberate decision turns into noise
people click past.

| Key | Effect |
|---|---|
| `priority` | Marketplaces whose plugins win any overlap, in order. The toolkit is first for a reason: it is the one whose standards the user wrote |
| `marketplaces.<name>.recommend` | `false` removes that marketplace from consideration entirely |
| `marketplaces.<name>.external` | `false` allows only string-source plugins from it. **Emit this key only for a marketplace that actually carries both classes** — on one that carries neither, it is a setting with nothing to set |

**Never suggest a marketplace that is not configured.** It is a fixed rule, not a
setting — a run that ends by listing marketplaces the user could add is advertising, and
the user who wants one adds it themselves. This says nothing about configured
marketplaces that did not fit in the phase 1 question; those are named once in the
report, because they were reachable and simply went unasked.

Keys under `marketplaces` are **marketplace names, not repo paths** — the
`marketplaceName` field in the JSON above. They differ: `anthropics/claude-plugins-community`
registers itself as `claude-community`, so a config keyed on the repo path silently
matches nothing and the marketplace stays off while appearing configured. Check a name
against `claude plugin marketplace list` before writing it.

The shipped defaults are a starting point, not advice. They permit the toolkit and the
plugins inside Anthropic's own repo, and stay quiet about everything else — the position
a developer is least likely to regret before they have decided their own.

**Every key in the file traces to a box the user ticked.** That is the rule the shape
answers to, and it is why there is no per-plugin allow or deny list: nobody asked for
one, and a key with no visible cause makes the user audit a file they were supposed to
be able to read. One row, one value.

`priority` is the single exception, and it is not a preference — it records that the
user's own marketplace wins any overlap, which is a decision about the toolkit rather
than about this repo.

Build the file from the answer and write it even when the answer matches the default
exactly. An implicit policy is one nobody can find and nobody edits, and this file is
the only place the next developer will look.

## Filling gaps

A gap is a need the repo shows evidence for that **no permitted toolkit plugin covers**.
Work in that order — toolkit first, gaps second — and the priority rule resolves itself.

Where the toolkit already covers a need, do not list an alternative. `typescript-dev`
covers TypeScript conventions; a second opinion on the same subject is two standards
competing for the same prompts, and which one fires becomes luck.

List an outside plugin only when it does something no toolkit plugin does at all. The
language servers are the clean example: `typescript-lsp` gives go-to-definition and
real diagnostics, which no amount of prose provides, so it complements
`typescript-conventions` instead of arguing with it.

Never recommend on popularity. `installCount` corroborates a plugin you already had
repo evidence for; it is not itself evidence. A million installs of a frontend plugin
says nothing about a Go service.

**Report nothing about sources that are off.** A plugin from an unticked marketplace was
never a candidate, so there is no exclusion to announce — counting them invites "why?"
on every run about a question the user already settled. Off is off, and silence is what
that looks like in a report.

## Where this yields

- **To the permission file, always.** If it says no, the answer is no, and the report
  does not relitigate it.
- **To repo evidence.** A permitted plugin with nothing in the repo calling for it is
  still a cost with no benefit. Permission is not a reason.
- **To the user's own marketplace.** Anything the toolkit covers, the toolkit wins —
  that is what `priority` encodes, and it holds even when an outside plugin looks
  better. Raise the comparison as a note to the maintainer; do not act on it here.
