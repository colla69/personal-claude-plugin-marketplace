---
name: javascript-conventions
description: JavaScript language conventions — ES modules with explicit file extensions, named exports, async/await at every layer, top-level await only in entry points, and a logger instead of console output in library code. Use whenever writing or reviewing JavaScript, working in a `.js` or `.mjs` file, or when the user mentions ES modules, `require`, imports, promises or `async` in JavaScript code. Also use on `ERR_MODULE_NOT_FOUND`, "Cannot use import statement outside a module", or when converting CommonJS to ES modules, since those are module-system mistakes. Not for TypeScript files.
---

# JavaScript conventions

JavaScript accepts almost anything and fails at runtime. Without a compiler, a
convention is what makes the wrong thing look wrong before it runs.

## The module system

`"type": "module"` in `package.json`, or the `.mjs` extension, makes a file an ES
module. Without either, Node treats `.js` as CommonJS. Write in the system the package
declares: an `export` in a CommonJS file is a syntax error on load.

In an ES module:

- `import` and `export` only. `require` and `module` don't exist there, so using either
  throws a `ReferenceError` when the line runs.
- Relative imports carry the file extension: `'./logger.js'`, not `'./logger'`. Node
  does not resolve an extensionless relative path in an ES module, so there the short
  form fails at startup, on the first import that uses it. Code that a bundler resolves
  follows the form the project already uses.
- Prefer named exports, with a default export only for a module's one main class or
  function. A named export is renamed in one place and found by one search; a default
  export takes a new name at every import.

## Async code

- `async`/`await` throughout. Wrap a callback-style API once, at the boundary, and
  await the wrapper everywhere else. Where callbacks and promises mix, errors are lost
  at the seam: an error passed to a callback never reaches a `catch`.
- Top-level `await` belongs in entry points: the script or the server's main file. A
  shared module that awaits at load time delays every importer and hides its own
  start-up cost. It initialises synchronously and exposes an async factory when its
  setup is async.

## Output

Library code logs through the project's logger where it has one, not `console.log`. A
logger carries levels and destinations; console output can't be turned down and is lost
where nobody reads the terminal. A command-line script may print its report to stdout —
that output is the product.

## Naming

Classes in `PascalCase`, functions and variables in `camelCase`, module-level constants
in `UPPER_SNAKE_CASE`. One case per kind of name tells a reader at the call site whether
a name is a class, a value or a fixed setting, without a lookup. File names follow the
project: JavaScript has no single convention for them.

## Where this yields

- **To the project.** Its `package.json`, its module style and its naming win for
  anything already settled there.
- **To `clean-code`** for naming by intent, function shape, error handling and
  comments.
- **To the Framework & Tools layer** when a framework's skill is enabled. It is more
  specific than this and outranks it for anything its conventions cover, such as a
  tool config that must have a default export.
