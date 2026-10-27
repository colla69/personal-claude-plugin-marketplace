# Your first docking

Dock a small sample project with the steward, read what it wrote, and do one change in
it: watch the standards come up, the tests guard the change, and a review run when you
ask. It takes about half an hour, and you need nothing but Claude Code, git and Node.

**Not yet tried.** This tutorial is written from the plugins' files; the first trials
will run it end to end. What the steward writes can differ in its details from what is
shown here, because it reads the project each time.

## 1. Install the steward

Once per machine:

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

It goes in at user scope, so it works in every project you open.
`language-simple-english` comes with it, because the steward builds on it. Everything
else is installed per project, in that project.

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
git switch -c dock
```

## 3. Dock it

Start Claude Code in `tally` and say:

```
dock this project
```

Four things happen before any file is written:

1. **Claude Code asks whether the steward may run.** Allow it. The steward pre-allows
   reading its own files and a few commands, and a skill that does that needs your
   permission to run. Claude Code can remember the answer.
2. **The steward asks which marketplaces this project may draw plugins from**, as a
   checklist with the house marketplace and the plugins in Anthropic's own repository
   ticked. Keep the defaults.
3. **It reads the project**, with the built-in Explore agent: the stack, the commands
   and the components.
4. **It asks whether the project writes Conventional Commits**, because `tally` has
   code. Answer yes or no.

Then it writes, installs and checks. Claude Code may ask before some commands, such as
`npm test`, which it runs once to see that the check passes; allow them.
[Permissions](../reference/permissions.md) lists them all.

## 4. Read the report

The report is your handover: there was no plan to approve, so this is where you see
what happened. Expect something like this:

| Section | For `tally` |
|---|---|
| **Check command** | `npm run typecheck && npm test`, or `npm test`, from the scripts |
| **Written** | `CLAUDE.md`, `.claude/plugin-sources.json` |
| **Changed** | Nothing, or `.claude/settings.json` if Claude Code had made one |
| **Standards** | `marketplace-base`, `universal-clean-code`, `craft-development`, `craft-code-review`, `craft-refactoring`, `craft-unit-testing` for the test runner, `language-typescript` for `tsconfig.json`, `language-simple-english` because every project has text to read, `language-conventional-commits` if you said yes, and what they pull in |
| **On another machine** | The same installs as a block to paste |
| **Unverified** | Anything it couldn't check |

Each standard says what in the project called for it. None of the Vue or Java plugins
are there: `tally` shows no sign of them.

## 5. Look at what it wrote

```bash
git status
cat CLAUDE.md
cat .claude/settings.json
```

- **`CLAUDE.md`** holds what reading the code wouldn't tell you: the test command and
  the map of the project. In a project this small it is short, and should be.
- **`.claude/settings.json`** declares the marketplace, which Claude Code keeps up to
  date by itself, sets the model to `opusplan` and the compaction window to 180k tokens,
  holds `STEWARD_CHECK`, and enables each plugin.

Delete anything you don't want.

## 6. Work in it

Run `/reload-plugins`, or start a new session, so the standards and the base plugin
load. Then ask for a change:

```
make tally ignore negative amounts, and say so in a test
```

1. **The standards are already there.** The session started with the index of every
   standard, and the ones for TypeScript and tests are enabled, so it writes the test
   first, the way `craft-unit-testing` asks.
2. **The guard checks before it stops.** Claude changed files, so the base plugin runs
   the check command. If a test or the typecheck fails, Claude keeps working until it
   passes.
3. **Ask for a review.** Say "review my changes". The `reviewer` agent reads the change
   on Opus and reports only what is worth fixing.
4. **Correct it once.** If Claude did something the way you don't want, say so, and
   how it is done here. When you end the session, the base plugin files that
   correction for the curators, if `gh` is signed in and it looks like a standard.

## 7. Keep it

```bash
npm test
git add -A
git commit -qm "Dock tally"
```

Commit `.claude/` with the rest, so the setup travels with the project.

## Where to go next

- [Dock a project](../guides/dock-a-project.md), for your own projects, including one
  that already has its own `CLAUDE.md` or agents.
- [Work in a docked project](../guides/work-in-a-docked-project.md), for the day to
  day.
- [Your first contribution](first-contribution.md), to see how a lesson becomes a
  standard.
- [The base](../explanation/the-base.md), for why the guard checks only the build and
  the tests.
