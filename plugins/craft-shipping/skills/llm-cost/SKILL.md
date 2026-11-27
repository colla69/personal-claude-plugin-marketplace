---
name: llm-cost
description: Keep the cost of a feature that calls a language model bounded — the smallest model that does the task, a cap on the output, and a limit on the input. Use whenever adding or changing code that calls an LLM API, such as the Anthropic, OpenAI or Gemini SDK, for a summary, a classification, an extraction, a chat or a generated reply, and whenever the user says "add AI to", "summarize with Claude" or "the API bill is too high". Also use when a model call takes user content or a database field as input, since that is where the cost has no ceiling.
---

# LLM cost

A model call is billed per token, in and out, on every request. A feature that works
in the demo can cost a hundred times more in production, because the inputs there are
longer and nobody set a limit. So every call gets three bounds when it is written.

## The three bounds

1. **The smallest model that does the task.** A summary, a label, an extraction or a
   short reply runs on the small model of the family, such as Claude Haiku. Use a large
   model only when the task needs reasoning. A large model on a simple task costs
   several times more and does it no better.
2. **A cap on the output.** Set `max_tokens` to what the result needs: a few hundred
   for a summary, a few tokens for a label. A cap of 4096 on a two-line summary leaves
   the bill to the model.
3. **A limit on the input.** Truncate or select what goes into the prompt, such as the
   last 20 messages of a ticket or the first 8,000 characters of a document. User
   content has no upper size: one ticket with a pasted log can cost more than a
   thousand normal ones.

## Where this yields

- **To the project's own model choice** and limits, where it has them.
- **To the user**, when a task needs a large model or a long input. Say the cost and
  let them choose.
