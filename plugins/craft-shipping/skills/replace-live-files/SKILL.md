---
name: replace-live-files
description: How to replace files on a live server that has no deploy tool or transaction, such as a site reached only over SFTP — read the listing, take a checked backup, write a rollback, upload beside the live files, check every size, then swap by rename. Use whenever uploading, publishing or replacing files directly on a running server, or writing a script that does, and whenever the user says "put this on the server", "upload the new version" or "publish over SFTP".
---

# Replace live files

An upload that stops halfway leaves a live site with old and new files mixed, and
nothing on the server undoes it. So the live files change only in the last step, after
everything before it has been checked.

## The order

1. Read the remote listing before you write anything.
2. Download a backup of the live files. Check that each one has the byte count the
   listing shows, and stop on a mismatch.
3. Write a rollback script that puts the backup back on the server.
4. Upload each file as `<name>.new`, beside the live file.
5. Compare the size of every upload with the local file. Stop on a mismatch, before any
   live file changes.
6. Rename each `.new` file over its live file.

## Where this yields

- **To a deploy tool** that replaces the site in one step. Where the project has one,
  use it.
- **To the project** for the host, the paths and the commands.
