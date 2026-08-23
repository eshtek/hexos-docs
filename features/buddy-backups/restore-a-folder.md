---
title: Restore a folder
description: Get a backed-up folder back onto your server, including the passphrase step for encrypted folders
published: false
date: 2026-08-21T12:00:00.000Z
tags: backups, buddy, restore, passphrase
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Restore a folder

Restoring brings a backed-up folder back onto your server. It always arrives as a **new folder** alongside your existing one — nothing you already have is overwritten.

Only you can restore your own backups. The buddy storing your copy cannot browse it or restore it.

## Before you start

- Both servers need to be online, and the backup must not be paused.
- Have the folder's **passphrase** ready. You will need it, and there is no way around it.
- Make sure the pool you are restoring to has room. HexOS does not check this for you.

> **Danger:** If you do not know the folder's passphrase, the backup cannot be opened — not by you, not by your buddy, and not by HexOS. There is no recovery path. Find it before you begin.
{.is-danger}

## Restoring

1. Open **Backups** and select the backup containing the folder.
2. Choose the folder and select **Restore**.
3. Choose which version to bring back:
   - **Latest backup**, or
   - a specific dated **restore point**
4. Under **Restore as**, give the new folder a name.
5. Under **Restore to pool**, choose where it should land.
6. Enter the folder's **passphrase**.
7. Start the restore.

> **Danger:** Enter the passphrase before you start. The screen suggests you can leave it blank and be asked later — **that is not correct**. A restore started without the right passphrase parks at "Finishing up" and stays there: there is no way to unlock it, no way to cancel it from the Command Deck, and it blocks any further restore of that folder. If this happens, contact support.
{.is-danger}

## What you can and cannot restore

**Whole folders only.** There is no way to pull back a single file or a subset. Restore the folder, then copy out what you need and delete the rest.

**About two weeks of history.** Roughly fourteen restore points on a daily schedule, or two to three on a weekly one. Older points are removed automatically on both servers. Buddy Backups protects you from a disaster or a recent mistake, not from something deleted last year.

> **Warning:** Restore points are not an archive. If you need to keep a specific version for longer than a couple of weeks, restore it now and store it somewhere separately.
{.is-warning}

## While a restore is running

Progress shows on the **Backups** card as a line reading "Restoring N folders…". A large folder can take a long time.

> **Warning:** Do not remove the backup connection, remove the folder from the backup, or delete the folder while a restore is running. Wait for it to finish.
{.is-warning}

> **Danger:** If a restore fails or is cancelled, the partly-restored folder is deleted, in some cases up to two hours afterwards. This includes restores that finished copying but failed at the final step. Do not start moving files out of a folder whose restore did not report success.
{.is-danger}

## After it finishes

The restored folder appears as a new folder on the pool you chose, still encrypted. Unlock it with its passphrase to read the contents.

> **Warning:** If you gave the restored folder a name that clashes with an existing network share, the clash is only reported after all the data has copied. Choose a name you are not already using.
{.is-warning}

## If your server is gone entirely

This page assumes your server still works. If the machine itself has failed and you are rebuilding, the process is different and starts from a different screen — see [Recover a failed server](/features/buddy-backups/recover-a-failed-server).

> **Help:** A restore stuck at "Finishing up", or a folder that will not unlock? See [Backup troubleshooting](/features/buddy-backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
