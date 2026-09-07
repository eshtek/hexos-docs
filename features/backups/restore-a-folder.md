---
title: Restore a folder
description: Bring a backed-up folder back onto your server as a new folder, from the latest copy or any restore point
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, restore, passphrase
editor: markdown
dateCreated: 2026-08-23T12:07:27.379Z
---

# Restore a folder

A restore brings a backed-up folder back onto your server as a new folder. Nothing you already have is overwritten, so you can restore to check a file, compare versions, or recover from a mistake without risk to the current copy.

Only you can restore your own backups. The buddy storing your copy cannot browse or restore it.

## Before you start

- Both servers must be online.
- Make sure the pool you restore to has room for the whole folder.
- Have the folder's passphrase if it is encrypted. You can enter it when you start or later, but the restore cannot finish without it.

> **Danger:** If you do not know an encrypted folder's passphrase, the backup cannot be opened by you, your buddy, or HexOS. There is no reset. See [Folder encryption](/features/folders#encrypted-folders).
{.is-danger}

## Starting a restore

1. Open the Backups panel from the dashboard and click the connection that holds the folder. You can also click the **Restore** tile in the panel to pick a folder from any connection.
2. Open the folder's menu and click **Restore from backup**.

<details>
<summary> The per-folder menu with Restore from backup </summary>

![Per-folder menu showing Restore from backup](/features/backups/images/folder-actions-menu.png){.medium .framed}
</details>

3. Choose the restore point. **Latest** is the most recent completed backup; the dated entries are earlier restore points within your retention window.
4. Choose the destination pool.
5. Enter a name for the restored folder. Pick a name you are not already using.
6. Optionally enter the folder's passphrase.
7. Click **Restore**.

<details>
<summary> The restore dialog </summary>

![Restore from backup dialog with restore point, pool, name, and passphrase](/features/backups/images/restore-folder-dialog.png){.medium .framed}
</details>

## The passphrase step

If you enter the passphrase in the dialog, the restore copies the data and unlocks the folder in one go.

If you leave it blank, the restore copies the data first and then asks for the passphrase in the activity center before finishing. Enter it there to complete the restore. If the passphrase is wrong you can try again, or discard the restore, which removes the locked copy from your server.

> **Tip:** For a large folder, starting the restore without the passphrase lets the copy run while you find it. The activity center will prompt you when the data has arrived.
{.is-tip}

## What you can and cannot restore

**Whole folders only.** There is no way to pull back a single file. Restore the folder, copy out what you need, then delete the restored folder if you no longer want it.

**Any restore point in your retention window.** The window is set per connection in **Schedule & Retention**: 1 week, 2 weeks, 1 month, or 3 months. Older restore points are removed at each backup.

> **Warning:** Restore points are not an archive. If you need a specific version for longer than your retention window, restore it now and keep it separately.
{.is-warning}

## While it runs

Progress shows in the activity center and on the connection card. A large folder can take a long time. You can cancel a running restore from the activity center.

> **Warning:** Do not remove the connection, remove the folder from the backup, or delete the folder while a restore is running. Wait for it to finish.
{.is-warning}

## After it finishes

The restored folder appears on the pool you chose alongside your existing folders. If it was encrypted and you entered the passphrase, it is unlocked and ready to use. Your original folder, if it still exists, is unchanged.

## If your server is gone

This page assumes your server still works. If the machine itself has failed, the copies your buddy holds are kept and a replacement server can restore from them. See [Recover a failed server](/features/backups/recover-a-failed-server).

> **Help:** A restore waiting on a passphrase you cannot find, or one that will not start? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
