# Setup cost: one measured project

**Status:** scratch record, 2026-10-25. It sits on a branch that is deleted, and it is
not meant for `main`.

One run of `measure-setup.mjs` (steward `5f6c8dfcd230`) on a small static website. The
site has a front-end framework, plain JavaScript and two trios: one for changes, one for
restructuring. The project's names are replaced by roles.

## Summary

| | Tokens |
|---|---|
| Root context file (121 lines) | ~1,740 |
| Project agents (6) | ~398 |
| Project skills (2) | ~228 |
| Plugins enabled here (10) | ~1,299 |
| **This setup, in total** | **~3,665** |

- **First request:** the average context is 41,125 tokens. The setup is about 9% of it.
- **Across all requests:** the average context is 124,676 tokens. The setup is about 3%
  of a typical request.
- **Outside the setup:** user-scope skills and agents add ~5,975 tokens.
- **Sessions read:** 3. Requests per session: 66 on average. Compactions: 0.

The setup is a small share of an average request. The context grows by about 83,500
tokens between the first request and the average one, and that growth is what the
sessions read. The script does not break it down, so a cut to the setup reaches only the
3%.

## On demand

Two nested context files cost nothing until a session opens a file beside them: ~823
and ~702 tokens.

## Root file by section

| Section | Tokens |
|---|---|
| Deployment notes | ~517 |
| Commands | ~302 |
| Boundaries | ~272 |
| Known gaps | ~135 |
| Conventions | ~118 |
| Overview | ~117 |
| Map | ~106 |
| Stack | ~103 |

## Plugins

None of the ten has a recorded call. Six are preloaded by at least one agent, so they
count as used. Three have neither a call nor a preload.

| Plugin | Tokens | Preloaded by |
|---|---|---|
| `universal-clean-code` | ~127 | all six agents |
| `universal-work-discipline` | ~148 | both Do agents |
| `craft-development` | ~132 | Do and Plan of the change trio |
| `craft-code-review` | ~96 | both Check agents |
| `craft-review` | ~137 | both Check agents |
| `craft-unit-testing` | ~105 | none |
| `craft-refactoring` | ~95 | Plan, Do and Check of the restructure trio |
| `tools-vue` | ~90 | both Do agents |
| `language-javascript` | ~170 | none |
| `language-simple-english` | ~199 | none |

## Agent runs

All six agents inherit the session model, `claude-sonnet-5-5`.

| Agent | Runs | Tokens read per run | Output per run |
|---|---|---|---|
| Do, change trio | 2 | 396,348 | 5,715 |
| Check, change trio | 1 | 265,795 | 3,651 |
| Plan, change trio | 3 | 244,931 | 9,008 |
| Plan, Do and Check, restructure trio | 0 | | |

One run of the steward's survey agent, outside the setup, read 656,272 tokens on
`claude-opus-5-5` and wrote 10,364.

## What the measure allowed

Nothing was cut. Three sessions are fewer than the five that give a part with no calls a
verdict. The root file is in the project's hands, not in the steward's record, so no
section moved. The deployment section would move to a nested context file, but the work
it guards happens outside that folder, so the nested file would not load when it is
needed. The saving would be about 0.4% of an average request.
