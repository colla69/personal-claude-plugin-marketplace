# Writing docs

Write a page for `docs/`, or review one, so that it does one job and never drifts from
the product. The house voice for skills is in
[`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md); this
page adds what is particular to documentation.

## One job per page

Every page is one of four kinds, and does only that kind's job. A page that mixes them
serves none of its readers well: the learner wades through tables, and the reader who
came to look one thing up wades through a story.

| Kind | Folder | The reader wants to | The page | Test |
|---|---|---|---|---|
| Tutorial | `tutorials/` | learn by doing | walks one path start to finish, on a sample the page itself sets up | Someone new can follow it without leaving the page |
| Guide | `guides/` | get one task done | gives the steps for that task, and what to check after | It starts from a goal the reader already has |
| Reference | `reference/` | look something up | lists, completely and dryly | Nothing in it is a story or an opinion |
| Explanation | `explanation/` | understand why | gives the reasoning, the alternatives, and the cost | It holds no steps |

Contributing pages, in `contributing/`, are guides and reference for working on the
marketplace itself.

## One home

**A rule lives in the product, and a page explains it and links to it.** The skills
and the steward's references are what Claude reads; a page that restates one of their
rules becomes a second copy, and the two drift apart. Where a page needs a rule to make
sense, it states the gist in one line and links to its home.

**A fact about how this repo works lives on one page.** Other pages link to it.

**The product never depends on the docs.** The plugin cache holds no `docs/`, so no
skill, reference or agent may tell Claude to read a page, or defer to one.

**The docs stand on their own.** No page refers to the working records the marketplace
was built from, its plans and its audit. What a page needs from them is written into
the page, or into the product, and linked from there.

## Voice

The voice section of `style.md` applies: open with a position, give every rule its
reason, prefer a named example to a described one, and don't hedge. On top of that:

- **Open with what the page lets the reader do**, in one or two sentences. A reader
  decides from the opening whether they are on the right page. This takes the place of
  `style.md`'s position-first opening, which is written for skills; an explanation page
  states its position right after.
- **Tables and one-liners.** Extensive in coverage, short per page.
- **Say what a thing costs and what it catches**, not only what it is.
- **Use "you"** for the reader, and name the steward, the user and the maintainer
  plainly.

## Format

- Plain Markdown, as GitHub renders it. No build, and nothing a renderer has to add.
- Diagrams in Mermaid, in a fenced `mermaid` block, which GitHub draws.
- Hard-wrap prose at 88 columns. Table rows and code blocks are exempt, and so is a line
  that holds a single link too long to break.
- Relative links only, to a file that exists. A docs page not yet written is named in
  backticks, not linked. Any other file a page mentions is linked where the reader would
  open it, and otherwise named in backticks.
- Backtick every file, command, setting and identifier.
- **Examples are synthetic.** No real project, client or person, in any example or
  screenshot. The repo is public.

## The map

[`docs/README.md`](../README.md) lists every page. A page is added to it in the same
commit that creates the page, and it is linked from the map once it exists. A page that
isn't on the map can't be found, so it doesn't exist.

## Length

The targets are per page: tutorials 150–250 lines, guides 50–150, reference and
explanation as their subject needs and mostly under 150. Past the target, the page is
probably doing two jobs.

## Review checklist

A reviewer reads a page against its sources, which the map names, and checks:

1. **Kind.** It does its kind's job and nothing else.
2. **Accuracy.** Everything it says about the steward or a skill matches the product
   files today. A page that describes behaviour nobody has tried says so.
3. **One home.** It restates no rule the product holds: a gist and a link at most.
4. **Independence.** No product file links to it or defers to it, and it refers to no
   working record.
5. **Opening.** The first lines say what the page lets the reader do.
6. **Voice.** Every rule has its reason, costs and catches are named, and nothing
   hedges.
7. **Links.** Every link resolves, and every page it mentions but doesn't link is on
   the map.
8. **Format.** 88 columns, backticks, synthetic examples.
9. **The map.** It is on the map, with the right kind and status.

Report findings in the shape of
[`review-work`](../../plugins/craft-review/skills/review-work/SKILL.md). A page that is
wrong about the product, restates a rule, or breaks a link is Blocking; a page that
does two jobs or misses its reader should be fixed; wording is to consider. Say what
you verified.
