# Set up a project

Set up a codebase, or a folder with no code, for agentic work: an `AGENTS.md`, the
skills it needs, and a trio for each kind of task it repeats. For a project that
already has its own `CLAUDE.md`, rules or agents, see
[adopt an existing setup](adopt-an-existing-setup.md) instead; the steward picks that
job by itself.

**Not yet tried on real projects.** This guide follows the steward's procedures; the
first trials will show where it behaves otherwise.

## Before you start

- **Install the steward once, for your user**, if you haven't:

  ```bash
  claude plugin marketplace add colla69/personal-claude-plugin-marketplace
  claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
  ```

  Then start a new session; a plugin installed mid-session isn't available until the
  next one.
- **Branch.** The steward never touches git in your project, so make a branch first,
  and decide afterwards what to keep.

## Steps

1. **Open a session in the project's root** and say "set this project up", or run
   `/marketplace-steward:steward`. The first time, Claude Code asks whether the steward
   may run, because it pre-allows its own files and commands; Claude Code can remember
   the answer.
2. **Tick the sources.** If the project has no `.claude/plugin-sources.json`, and you
   have none in `~/.claude/`, you get one checklist: which marketplaces this project may
   draw plugins from. The toolkit and the plugins in Anthropic's own repository are
   ticked already. It is the only question about the setup, and it is asked once.
3. **Let it run.** It reads the project, using the cartographer for a codebase, decides
   what to write, and writes it. Claude Code may ask for some commands as it goes, such
   as each plugin install; [permissions](../reference/permissions.md) lists them.
4. **Answer the new-skill question, if there is one.** When the project needs knowledge
   that neither the toolkit nor a marketplace you allowed has, the report ends by
   proposing a new skill and asking whether to create it. A yes hands it to the
   contribute job.
5. **Read the report.** It lists every file created and every file changed, the
   plugins and why each fits, the trios with each role's skills, model and effort, and
   what it couldn't verify.
6. **Start a new session**, so the installed skills and the new agents load. Run
   `/context` to confirm the context files did.

## What you get

| File | What it holds |
|---|---|
| `AGENTS.md`, with a one-line `CLAUDE.md` beside it | The commands, the map of components, the conventions and boundaries that reading the code won't tell, and the trios |
| The same pair in each component that earns one | What is local to that component |
| `.claude/rules/<topic>.md`, where one is needed | A convention that follows a file type rather than a folder, scoped by its `paths:` |
| `.claude/settings.json` | The marketplace, and the plugins enabled for this project |
| `.claude/plugin-sources.json` | The sources you ticked |
| `.claude/agents/` and `.claude/skills/<task>/` | Each trio's three agents and the skill that runs it |
| `.claude/steward.json` | The record of what the steward created |

[Project files](../reference/project-files.md) describes each one.

## Check it

- **Read the diff**, `git diff` and `git status`, next to the report. Delete what you
  don't want: a trio you won't use, or a line in `AGENTS.md` that isn't true. The
  record still lists what the steward wrote, so it reads a missing trio as your removal
  and doesn't bring it back.
- **Look at the Unverified list.** It is where the steward put every command it couldn't
  run and every guess it made.
- **Commit `.claude/` with the rest**, so the setup travels with the project. On another
  machine, the report's install block sets up the same plugins.

## A folder with no code

The same steps work for a folder of documents, reports or templates. The steward reads
what is produced there, for whom, and how it is checked, and names the trios for the
work, such as `monthly-report`.

## Next

- [Run a trio](run-a-trio.md), for your first task.
- [Add a trio](add-a-trio.md), when another kind of task starts to repeat.
- [Keep a setup current](keep-a-setup-current.md), after the marketplace or the project
  changes.
- [Troubleshoot](troubleshoot.md), when something doesn't load and nothing says so.
