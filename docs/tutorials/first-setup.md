# Your first setup

Set up a small sample project with the steward, read what it wrote, and run one task
through a trio from plan to checked result. It takes about half an hour, and you need
nothing but Claude Code, git and Node.

**Not yet tried.** This tutorial is written from the steward's procedures; the first
trials will run it end to end. What the steward writes can differ in its details from
what is shown here, because it reads the project each time.

## 1. Install the steward

Once per machine:

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

It goes in at user scope, so it works in every project you open. `craft-review` and
`language-simple-english` come with it, because the steward builds on them. Everything
else the steward installs per project, in that project.

## 2. Make a sample project

A tiny TypeScript tool, `tally`, that adds up a list of amounts:

```bash
mkdir tally && cd tally
git init -q
npm init -y > /dev/null
npm install --save-dev typescript vitest > /dev/null
printf 'node_modules/\n' > .gitignore
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
EOF
mkdir src
cat > src/tally.ts <<'EOF'
export function tally(amounts: number[]): number {
  return amounts.reduce((sum, amount) => sum + amount, 0)
}
EOF
cat > src/tally.test.ts <<'EOF'
import { expect, test } from 'vitest'
import { tally } from './tally'

test('adds the amounts', () => {
  expect(tally([1, 2, 3])).toBe(6)
})
EOF
npm pkg set scripts.test="vitest run" scripts.typecheck="tsc"
git add -A && git commit -qm "A tiny tally tool"
```

Then make a branch, because the steward never touches git in your project and you
decide afterwards what to keep:

```bash
git switch -c setup
```

## 3. Ask for the setup

Start Claude Code in `tally` and say:

```
set this project up
```

Four things happen before any file is written:

1. **Claude Code asks whether the steward may run.** Allow it. The steward pre-allows
   reading its own files and the commands of its own folder, and a skill that does that
   needs your permission to run. Claude Code can remember the answer.
2. **It refreshes the marketplaces** and reads what they offer. Claude Code asks before
   those commands; allow them.
3. **The steward asks one question:** which marketplaces this project may draw plugins
   from, as a checklist with the toolkit and the plugins in Anthropic's own repository
   ticked. Keep the defaults.
4. **It reads the project.** For a codebase it sends its cartographer, which reports the
   stack, the commands and the components.

Then it writes. Claude Code may ask before some commands, such as each plugin install;
allow them. [Permissions](../reference/permissions.md) lists them all.

## 4. Read the report

The report is your handover: there was no plan to approve, so this is where you see
what happened. Expect something like this:

| Section | For `tally` |
|---|---|
| **Written** | `AGENTS.md` and `CLAUDE.md`, `.claude/settings.json`, `.claude/plugin-sources.json`, the trios, `.claude/steward.json` |
| **From your toolkit** | `universal-clean-code`, `craft-development`, `craft-code-review`, `craft-refactoring`, `craft-unit-testing` for the test runner, `language-typescript` for `tsconfig.json`, `language-simple-english` because every project has text to read, and what they pull in |
| **Gap-fills** | Probably `typescript-lsp` from Anthropic's marketplace, for go-to-definition and real diagnostics, which no toolkit skill gives. With no gap to fill, the report says so in one line |
| **Trios** | `change` and `refactor`, and `test`, because a test runner is configured |
| **Installed** | The same installs as a block to paste on another machine |
| **Unverified** | Anything it couldn't check, such as a command it didn't run |

Each plugin row says what in the project called for it. None of the Vue or Java plugins
are there: `tally` shows no sign of them.

## 5. Look at what it wrote

```bash
git status
cat AGENTS.md
cat CLAUDE.md
head -12 .claude/agents/change-plan.md
```

- **`AGENTS.md`** holds what reading the code wouldn't tell you: the test command, the
  map of the project, and the trios. In a project this small it is short, and should be.
- **`CLAUDE.md`** is one line, `@AGENTS.md`, so Claude Code loads the content.
- **`change-plan.md`** starts with its frontmatter: `effort: high`, `model: opus`,
  `disallowedTools: Write, Edit, NotebookEdit`, which makes it read-only, and a
  `skills:` list where every name is written as `plugin:skill`.

Delete anything you don't want. The record still lists what the steward wrote, so it
reads a missing file as your removal and doesn't bring it back.

## 6. Run a trio

Start a **new session**, so the installed skills and the new agents load, and ask for a
change:

```
/change make tally ignore negative amounts, and say so in a test
```

1. **Plan answers first, and changes nothing.** It returns items, each with what
   changes, where, and how you can tell it is done, plus its questions and assumptions.
   It ends by waiting for your OK.
2. **Correct it once.** Say "also reject non-numbers with a clear error". The plan goes
   back to Plan, and a new version comes back. Your answer wasn't an OK, so nothing has
   happened yet.
3. **Accept it.** Say "OK".
4. **Do works.** It changes `src/tally.ts` and the test, as the plan says, runs the
   tests, and reports each item as done or not.
5. **Check compares.** It reads the result against the plan you accepted, item by item.
   A gap goes back to Do; something the plan never covered comes to you.

The run ends with its report: the plan as accepted, what was done, and Check's verdict.

## 7. Keep it

```bash
npm test
git add -A
git commit -qm "Set tally up with the steward"
```

Commit `.claude/` with the rest, so the setup travels with the project.

## Where to go next

- [Run a trio](../guides/run-a-trio.md), for the run in detail: the report, and what
  happens when Check sends the work back.
- [Set up a project](../guides/set-up-a-project.md), for your own projects.
- [Adopt an existing setup](../guides/adopt-an-existing-setup.md), for one that already
  has its own `CLAUDE.md` or agents.
- [Your first contribution](first-contribution.md), to give something `tally` taught
  you back to the marketplace.
- [Trios](../explanation/trios.md), for why the run stopped where it did.
