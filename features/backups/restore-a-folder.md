---
title: Restore a folder
description: Bring a backed-up folder back onto your server as a new folder, from the latest copy or any restore point
published: true
date: 2026-10-07T00:00:00.000Z
tags: backups, buddy, restore, passphrase
editor: markdown
dateCreated: 2026-08-23T12:07:27.379Z
---

# Restore a folder

> **Info:** Buddy Backups is in beta. Everyone can use it, and every backup it makes is a real copy you can restore. Beta means we are still finishing it, so screens may change and you may find a rough edge. Keep any backup you already rely on running alongside it. [What beta means](/features/backups#what-beta-means)
{.is-info}

A restore brings a backed-up folder back onto your server as a folder. It never overwrites a folder you already have. You can restore to check a file, compare versions, or undo a mistake without risk to the current folder.

Only you can restore your own backups. The buddy who stores your copy cannot open or restore it.

## Before you start

- Restore from the server whose folder it is: the one that sends the backup.
- The backup must not be paused. A paused backup has no **Restore**. Resume it first.
- The server that stores the backup must be online. If it is offline, the dialog says it cannot list restore points yet.
- The pool you restore to needs room for the whole folder.
- If the folder uses a passphrase, have it ready. The restore cannot finish without it.

> **Info:** If HexOS manages your folder keys (the default), restored folders unlock on their own while you are signed in. See [Recovery keys](/features/folders#recovery-keys).
{.is-info}

## Start a restore

> **Warning:** The restored folder is open to everyone on your network until you set its access. See [After it finishes](#after-it-finishes).
{.is-warning}

1. Open the backup that holds the folder: click its row on the **Backups** page, or its card in the dashboard's **Backups** section.
2. Open the folder's menu and click **Restore from this backup**. You can also click the **Restore** tile and pick the folder.

<details>
<summary> The folder's menu </summary>

![folder-actions-menu.png](/features/backups/images/folder-actions-menu.png){.medium .framed}
</details>

3. In **Restore a folder**, choose the **Restore point**. "Latest backup" is the newest one, with its date. The others are older restore points, each with its date and size.
4. Under **Restore to pool**, choose the pool. A pool without enough room is marked "not enough space" and cannot be chosen.
5. Under **Restore as**, check the folder's name. HexOS suggests the folder's own name if you have no folder by that name. If you do, it adds the restore point's date, for example "Photos-20261005".
6. If the folder uses a passphrase and is still on this server, you can type it under **Passphrase (optional)**. Leave it empty to type it later. If the folder is no longer on this server, there is no field: HexOS asks for the passphrase once the data has copied.
7. Click **Restore**.

<details>
<summary> The Restore a folder dialog </summary>

![restore-folder-dialog.png](/features/backups/images/restore-folder-dialog.png){.medium .framed}
</details>

HexOS confirms with "Restore started" and closes the dialog. Follow the restore in the activity center.

> **Warning:** A restore point marked **Damaged** cannot be fully read on the other server, so its restore may stop partway. Pick another restore point, or repair the backup first. See [Backup troubleshooting](/features/backups/troubleshooting).
{.is-warning}

You can also restore from a folder's own page: under **Backing up to**, open the backup's menu and click **Restore from this backup**.

## Unlocking the restored folder

A restored encrypted folder arrives locked.

**Key managed by HexOS:** the folder unlocks on its own while you are signed in. If it cannot unlock on its own, the restore says "Couldn't unlock automatically". Click **Continue**, then **Continue restore** in "Continue the restore".

**Passphrase:** if you typed the passphrase in the dialog, the restore copies the data and unlocks the folder in one go. If you left it empty, the restore copies the data first, then waits. You get a notice that the folder "is waiting for its passphrase".

To finish a restore that is waiting:

1. Open the restore in the activity center and click **Enter passphrase**. Or, on the backup's page under **Restores needing attention**, click **Unlock**.
2. Type the passphrase and click **Unlock and finish**.

If the passphrase is wrong, you can try again. If you cannot find it, click **Discard restore**, then **Discard restore** again in "Discard this restore?". That removes the locked copy from your server; anything left behind shows under **Restores needing attention**. The backup itself stays, so you can restore again later.

> **Tip:** For a large folder with a passphrase, start the restore without it. The data copies while you look for the passphrase, and HexOS asks for it when the data has arrived.
{.is-tip}

## While it runs

The activity center shows the progress. A large folder can take a long time. To stop a restore, open it in the activity center and click **Stop restore**.

> **Warning:** Let a restore finish before you remove the folder from the backup or remove the connection. Removing either deletes the copy the restore reads from.
{.is-warning}

## After it finishes

You get a notice that the folder was restored. It shows with your other folders, on the pool you chose. Your original folder, if it still exists, is unchanged.

> **Danger:** A restored folder comes back open to everyone on your network, whatever its access was before. Anyone on your network can open it and change its files, with no password. As soon as the restore finishes, set who can open the folder. See [Folder permissions](/features/folders#folder-permissions).
{.is-danger}

## A restore that did not finish

A restore that failed or was stopped can leave a copy behind. The backup's page then shows it under **Restores needing attention**: "Left a copy on this server as" and the name, "that never became a folder."

1. Click **Remove copy**.
2. In "Remove the leftover copy?", click **Remove copy**.

This frees the space. The backup itself stays where it is.

## What you can and cannot restore

**Whole folders only.** You cannot pull back a single file. Restore the folder, copy out what you need, then delete the restored folder if you no longer want it.

**Any restore point you still keep.** You choose how long restore points are kept in **Schedule & Retention**: 1 week, 2 weeks, 1 month, or 3 months. Older ones are removed at each backup.

> **Warning:** Restore points are not an archive. If you need a version for longer than you keep restore points, restore it now and keep it as its own folder.
{.is-warning}

## If your server is gone

This page assumes your server still works. If the server itself is lost, the copies on the other server are kept, and a new server on your account can take them over. See [Recover a failed server](/features/backups/recover-a-failed-server).

> **Help:** A restore waiting on a passphrase you cannot find, or one that will not start? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
