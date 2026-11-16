---
name: sms-notifier
description: A second notifier that must share the first one's logging.
tags: [lift]
runs: 5
max_turns: 15
allowed_tools: [Read, Glob, Grep, Write, Edit, Skill]
---

Add an `SmsNotifier` to `src/notifiers.js`. It sends the message to `user.phone` through an SMS gateway, with `gateway.sendSms(phone, text)`. It must keep the same log of sent messages that `EmailNotifier` keeps.

When you are done, show every file you changed, whole, in your reply.
