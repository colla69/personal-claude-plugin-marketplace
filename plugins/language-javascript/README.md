# language-javascript

JavaScript accepts almost anything and fails at runtime. Without a compiler, a
convention is what makes the wrong thing look wrong before it runs.

| | |
|---|---|
| Skill | `javascript-conventions` |
| Layer | Language |
| Builds on | `universal-clean-code` |

The module system comes from `package.json`, read first: `"type": "module"` or the
`.mjs` extension makes a file an ES module.

## Fires when

- Writing or reviewing JavaScript, or working in a `.js` or `.mjs` file
- ES modules, `require`, imports, promises or `async` come up
- A JavaScript project has no type checker, so nothing else checks a module boundary
  before the code runs

## Leaves to others

- **TypeScript.** A `.ts` file is `typescript-conventions`' business, in
  `language-typescript`.
- Naming by intent, function shape, error handling and comments, to `clean-code`.
- File names, which JavaScript has no single convention for, to the project.
- The project's existing patterns, which win where they are settled.

## Install

Set-up installs it at project scope when the project's own code is in `.js` or `.mjs`
files. By hand:

```bash
claude plugin install language-javascript@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/javascript-conventions/SKILL.md`](skills/javascript-conventions/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)
