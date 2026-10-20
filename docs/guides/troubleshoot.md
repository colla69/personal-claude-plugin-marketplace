# Troubleshoot

Fix what goes wrong without saying so. Find the symptom, check the cause, apply the fix.

## A skill doesn't load

| Symptom | Cause | Fix |
|---|---|---|
| An agent works without a skill its `skills:` names | The name is bare, such as `review-work`, not `plugin:skill` | Write it as `craft-review:review-work`. A bare name can fail without any message |
| The same, with the name written correctly | The plugin isn't enabled in this project | Say "update the setup", or install it with `--scope project` |
| A skill never fires on your request | Its description doesn't match the words you use | Tell the steward the lesson: a description that doesn't win is a change to that skill |
| `claude plugin list` shows a plugin as failed to load: not found in the marketplace | A dead key: the plugin was renamed or removed | Say "update the setup"; see [migrate from old names](migrate-from-old-names.md) |
| A plugin enabled in the project's settings isn't there on another machine | It was never installed on that machine | Run the install block from the set-up report |
| Changes to a skill don't show up | The session started before the change, or the installed copy is old | Start a new session; run `claude plugin marketplace update` and `claude plugin update <name>@<marketplace>` |

## The steward

| Symptom | Cause | Fix |
|---|---|---|
| None of the steward's skills appear under `--plugin-dir` | Its dependency, `craft-review`, isn't installed or loaded | Add `--plugin-dir ./plugins/craft-review` |
| Claude Code asks before every write of a contribution | Something writes under `~/.claude`, which is always asked for | The steward works in `~/.local/share/marketplace-steward/`; a change that moved it back is the cause |
| Claude Code asks for each plugin install, refresh or hash | Those commands aren't pre-allowed | Allow them, as [permissions](../reference/permissions.md) describes, or answer once per run |
| A set-up request ran keep-current instead | The project has `.claude/steward.json` | That is intended: the steward set it up before, so setting it up again means bringing it up to date |
| A set-up request adopted the project | It has a Claude setup of its own and no record | That is intended; see [adopt an existing setup](adopt-an-existing-setup.md) |
| A trio came out under another name, or not at all | One of its four paths was taken by a file of yours | Rename or remove your file, then ask for the trio again |
| A rule you expected to go is still in your files | Its home isn't live yet: pending a merge, or no trio role preloads the skill | Merge its pull request and say "update the setup"; or leave it, which is safe |
| `Skill … cannot be used with Skill tool due to disable-model-invocation` | That skill is hidden from the model | Hidden skills can only be run by you, as `/plugin:skill`; the steward keeps its jobs in references for this reason |

## Contributions

| Symptom | Cause | Fix |
|---|---|---|
| No pull request, only a link | `gh` isn't installed or signed in | Open the link, or install `gh` and run `gh auth login` |
| The job stopped before the push, with a leak | Something from your project is in the change | Read the finding, and say how to strip it; the worktree is still there |
| The job stopped, the leak check not run | The checker didn't get the source project's identifiers | Run the contribution from inside the project the lesson came from |
| The job stopped: nowhere to open a pull request | The house marketplace was added from a local folder, not GitHub | Add it from GitHub: `claude plugin marketplace add colla69/personal-claude-plugin-marketplace` |
| A worktree is left over | An earlier job stopped | The next job reports it; remove it with `git -C ~/.local/share/marketplace-steward/clone worktree remove <path>` |

## Estimates and checks

| Symptom | Cause | Fix |
|---|---|---|
| `claude plugin details` reports a higher cost than you expect | It counts a hidden skill's description, which never loads | Read its per-skill lines; a hidden skill's always-on cost isn't paid |
| `claude plugin details` says the plugin isn't found | It only looks at installed plugins | Use `claude --plugin-dir ./plugins/<name> plugin details <name>` |
| `claude plugin validate` warns "no version specified" | The policy: every plugin updates by commit | Nothing to fix |
| `check-catalog.mjs` fails | A list, a name, a layer or a dependency disagrees | Its message names the plugin and the file; [checks](../reference/checks.md) lists each case |
