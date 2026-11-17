---
type: llm
---
Judge the final `src/reminders.js` shown in the reply.
`sendOverdueReminders` gets the mailer as a parameter, or from a factory that takes it, such as `makeReminders({ mailer })`. Fails if it imports `mailer` from `./mailer.js` and calls it directly.
