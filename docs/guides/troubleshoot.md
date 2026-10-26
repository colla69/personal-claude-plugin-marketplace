# Troubleshoot

Fix what goes wrong without saying so. Find the symptom, check the cause, apply the fix.

## A skill doesn't load

| Symptom | Cause | Fix |
|---|---|---|
| An agent works without a skill its `skills:` names | The name is bare, such as `review-work`, not `plugin:skill` | Write it as `craft-review:review-work`. A bare name can fail without any message |
| A standard isn't applied in a project | Its plugin isn't enabled there | Say "add the standard for X", or install it with `--scope project` |
| A skill never fires on your request | Its description doesn't match the words you use | Correct Claude in the session; the collector files the correction, and a description that doesn't win is a change to that skill |
| `claude plugin list` shows a plugin as failed to load: not found in the marketplace | A dead key: the plugin was renamed or removed | Say "dock this project"; see [migrate from old names](migrate-from-old-names.md) |
| A plugin enabled in the project's settings isn't there on another machine | It was never installed on that machine | Run the install block from the docking report |
| Changes to a skill don't show up | The session loaded the skill before the change, or the update hasn't arrived | Claude Code updates the marketplace by itself, and the change loads at a session after that; check that your user settings don't set `autoUpdate` to `false` for it. To have it now, run `claude plugin marketplace update` and `/reload-plugins`. For a `--plugin-dir` copy, start a new session |

## The base plugin

| Symptom | Cause | Fix |
|---|---|---|
| Claude keeps working after you thought it was done, on a failing build or test | The guard: the check command fails after its changes | Intended. If the failure isn't Claude's, fix it or change `STEWARD_CHECK`; after three failures in a row the guard lets go and says so |
| Every turn waits for a slow check | The check command runs the whole suite | Set `STEWARD_CHECK` to a faster command, such as the unit tests alone |
| The guard does nothing | The project has no `STEWARD_CHECK`, or nothing changed in the session | Add the command under `env` in `.claude/settings.json` |
| No corrections issue after a session with corrections | `gh` isn't signed in, the marketplace wasn't added from GitHub, or the session had fewer than two messages from you | Sign `gh` in; waiting issues are retried at the next session start. A marketplace added from a folder has nowhere to file |
| No index at session start | `marketplace-base` isn't enabled, or Node isn't on the `PATH` | Enable it, or install Node 18 or later |

## The steward

Its rows come from the steward's procedure and from probes; the first trials on real
projects will add to them.

| Symptom | Cause | Fix |
|---|---|---|
| The steward's skill doesn't appear under `--plugin-dir` | Its dependency, `language-simple-english`, isn't installed or loaded | Add `--plugin-dir ./plugins/language-simple-english` |
| Claude Code asks for each plugin install or refresh | Those commands aren't pre-allowed for you outside the steward | Answer once per run, or allow them, as [permissions](../reference/permissions.md) describes |
| A rule you expected the tidy to remove is still in your files | It adds something to what the standard says, or the standard is from another marketplace | Intended: when in doubt, a rule stays. Remove it yourself if it is a copy |
| Docking removed agents you wanted | They had the shape of agents an earlier steward generated | They are in `~/.local/share/marketplace-steward/backups/` if you had edited them, and in git otherwise |
| `Skill … cannot be used with Skill tool due to disable-model-invocation` | That skill is hidden from the model | Hidden skills can only be run by you, as `/plugin:skill` |

## The curator

| Symptom | Cause | Fix |
|---|---|---|
| No pull request, only a link | `gh` isn't installed or signed in | Open the link, or install `gh` and run `gh auth login` |
| The job stopped before the push, with a leak | Something from the source is in the change | Read the finding, and say how to strip it; the branch is still there |
| The job stopped, the leak check not run | The checker didn't get the names to look for | Run it again from the issue, so the issue's names are the input |
| The job stopped before it began | The checkout had changes of its own | Commit or stash them, and ask again |

## Estimates and checks

| Symptom | Cause | Fix |
|---|---|---|
| `claude plugin details` reports a higher cost than you expect | It counts a hidden skill's description, which never loads | Read its per-skill lines; a hidden skill's always-on cost isn't paid |
| `claude plugin details` says the plugin isn't found | It only looks at installed plugins | Use `claude --plugin-dir ./plugins/<name> plugin details <name>` |
| `claude plugin validate` warns "no version specified" and "no description provided" | The policy: every plugin updates by commit, and its `description` lives in the marketplace entry | Nothing to fix |
| `check-catalog.mjs` fails | A list, a name, a layer or a dependency disagrees | Its message names the plugin and the file; [checks](../reference/checks.md) lists each case |
