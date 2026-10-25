# Setup cost: a second measured project

**Status:** scratch record, 2026-10-25. It sits on a branch that is deleted, and it is
not meant for `main`.

One run of `measure-setup.mjs` (steward `5f6c8dfcd230`) on a personal CV site. The site
has a front-end framework, plain JavaScript, a hosting stack and a folder of job-search
tooling. It has one trio, for changes, and five specialist agents. The project's names
are replaced by roles.

## Summary

| | Tokens |
|---|---|
| Root context file (144 lines) | ~2,478 |
| Project agents (8) | ~917 |
| Project skills (1) | ~144 |
| Plugins enabled here (9) | ~1,316 |
| **This setup, in total** | **~4,855** |

- **First request:** the average context is 35,536 tokens. The setup is about 14% of it.
- **Across all requests:** the average context is 108,591 tokens. The setup is about 4%
  of a typical request.
- **Outside the setup:** user-scope skills and agents add ~5,975 tokens.
- **Sessions read:** 13, the latest of 15. Requests per session: 52 on average.
  Compactions: 0.

The setup is a small share of an average request. The context grows by 73,055 tokens
between the first request and the average one, and that growth is what the sessions
read. The script does not break it down, so a cut to the setup reaches only the 4%.

By arithmetic on the numbers above, the setup accounts for about 252,460 tokens read in
an average session (4,855 tokens in each of 52 requests). One run of the job-search
agent read 5,652,977 tokens, which is the same kind of sum and about 22 times larger.

## On demand

Four nested context files and two rules with `paths:` cost nothing until a session
opens a matching file. They hold ~6,363 tokens in all:

| File | Tokens |
|---|---|
| Nested context file, front end | ~1,483 |
| Nested context file, hosting | ~1,161 |
| Nested context file, CV documents | ~1,103 |
| Nested context file, job search | ~435 |
| Rule, site text in three languages | ~1,340 |
| Rule, translating two of them | ~841 |

## Root file by section

| Section | Tokens |
|---|---|
| How the project's knowledge is kept | ~453 |
| Scheduled tasks of the job-search agent | ~387 |
| Agents | ~312 |
| Map | ~281 |
| Commands | ~273 |
| Boundaries | ~251 |
| Stack | ~173 |
| Title and overview | ~155 |

## Plugins

None of the nine has a recorded call. Eight are preloaded by at least one agent, so they
count as used. One has neither a call nor a preload.

| Plugin | Tokens | Preloaded by |
|---|---|---|
| `language-simple-english` | ~199 | all three agents of the change trio |
| `tools-aws-static-hosting` | ~165 | the hosting agent |
| `craft-unit-testing` | ~161 | none |
| `universal-work-discipline` | ~148 | Do of the change trio |
| `craft-development` | ~146 | Plan and Do of the change trio |
| `craft-cv-writing` | ~137 | the CV agent |
| `craft-review` | ~137 | Check of the change trio |
| `universal-clean-code` | ~127 | Do and Check of the change trio |
| `craft-code-review` | ~96 | Check of the change trio |

Every part loaded in the latest session. The sessions since a part's file last changed
number 2 for most parts, 4 for the job-review agent and 5 for the test agent. Five
sessions are what give a part with no calls a verdict.

## Agent runs

Tokens read is every request's context added up, mostly from the cache. The job-search
and CV agents declare `inherit`. The job-search agent ran on `claude-opus-5-5`, with
one further entry under the model `<synthetic>`. The CV agent ran on `claude-sonnet-5-5`
and on `claude-opus-5-5`. The three agents of the change trio declare `opus`.

| Agent | Kind | Runs | Tokens read per run | Output per run |
|---|---|---|---|---|
| Job search | project, declares inherit | 3 | 5,652,977 | 111,491 |
| CV | project, declares inherit | 4 | 2,964,698 | 5,615 |
| Older code review | outside this setup | 3 | 2,323,163 | 513 |
| Older front-end expert | outside this setup | 4 | 1,892,827 | 11,875 |
| Steward survey | outside this setup | 1 | 1,395,344 | 175 |
| Do, change trio | project, declares opus | 1 | 1,389,052 | 10,252 |
| Steward checker | outside this setup | 3 | 504,050 | 56 |
| Plan, change trio | project, declares opus | 1 | 473,755 | 9,692 |
| Check, change trio | project, declares opus | 1 | 294,100 | 4,504 |

The hosting, job-review and test agents have no run in these sessions.

## What the measure allowed

Nothing was cut and no model changed.

- **A section of the root file** is about one component: the scheduled tasks of the
  job-search agent, ~387 tokens. The root file is the project's own, not the steward's,
  so the section stays. A nested file would load only when a session opens a file in
  that folder, and a session that asks about the tasks may not. The saving would be
  387 of the 108,591 tokens of an average request.
- **The one plugin with no call and no preload** has 2 sessions behind it, fewer than
  the five that give a verdict.
- **The test agent** has no run in 5 sessions, ~116 tokens. The table has no row for a
  specialist outside a trio, so it only goes in the report.
- **The costliest role** is the job-search agent. The numbers show what a run costs,
  not what its work is worth, so its model stays.
