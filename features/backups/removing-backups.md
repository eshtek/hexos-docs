---
title: Removing backups
description: What pausing, declining, removing a folder, removing a connection, deleting a folder, and resetting a server each keep and destroy
published: true
date: 2026-09-07T00:33:21.257Z
tags: backups, buddy, pause, delete, remove
editor: markdown
dateCreated: 2026-09-07T00:31:08.086Z
---

# Removing backups

Several actions look similar and do very different things. Check this page before you click.

## The short version

| Action | What it destroys | Reversible? |
|---|---|---|
| Withdraw a request | Nothing. Nothing was copied. | Yes, send it again |
| **Decline** a request | Nothing. Nothing was copied. | Yes, they can send it again |
| Cancel setup | Nothing. Setup never finished. | Yes, start again |
| **Pause** | Nothing. Stored copies and the reservation stay. | Yes, by the account that paused |
| **Remove from backup** (a folder) | That folder's copy and all its restore points on the destination | **No** |
| **Remove connection** | Every folder and every restore point on the destination, and the reservation | **No** |
| Delete a folder with **Also delete the backup copies** checked | The folder on your server and its backup copies | **No** |
| Unclaim or reset a server that hosts backups | Every backup that server hosts for others | **No** |

The files on your own server are never touched by any of these except deleting the folder itself.

## Pausing is not removing

**Pause** stops new backups running. Everything stored stays where it is and the reservation stays reserved. Both sides are told. Only the account that paused can resume it, except a pause HexOS made for space, which either side can resume and which resumes on its own when the space problem is fixed.


Pausing does not free space on the destination. To give the space back, the connection has to be removed.

## Removing a folder from a backup

Open the folder's menu and click **Remove from backup**, or uncheck it in **Edit folders**. HexOS names the folder and its restore points, and asks you to confirm "Delete the stored backup of N folder?".

The folder on your server stays. Its copy on the destination and every restore point for it are deleted permanently.

> **Info:** If the destination server is offline, the deletion completes automatically when it reconnects.
{.is-info}

## Removing a connection

Click **Remove** on the details view or **Remove connection** in the row menu on the **Backups** page. The dialog says "Removing this connection will stop all backups between this server and {name}" and "Backup data stored on {destination} will be permanently deleted, and your storage reservation will be removed."

<details>
<summary> The Remove connection dialog </summary>

![Remove connection confirmation dialog](/features/backups/images/remove-connection-dialog.png){.medium .framed}
</details>

> **Danger:** One click confirms. There is no undo and no typed confirmation. Every folder and every restore point on the destination is deleted.
{.is-danger}

> **Danger:** Either side can remove a connection. If you host a buddy's backup, you can delete it, and they are notified. If a buddy hosts yours, they can delete yours. An offsite copy is only as safe as the server holding it. Keep a second destination for anything irreplaceable.
{.is-danger}

If the other server is unreachable when you remove a connection, the deletion completes automatically when it reconnects.

## Deleting a folder on your own server

When you delete a folder that is backed up, the delete dialog offers **Also delete the backup copies stored on {names}**.

- **Leave it unchecked** and the dialog confirms "Backup copies stay on your buddy's server and remain restorable." The folder is gone from your server but can still be restored. This is usually what you want.
- **Check it** and the folder and every backup copy are deleted everywhere, permanently.

> **Warning:** Checking that box is the most complete deletion in HexOS. Nothing is left on either server.
{.is-warning}

## Unclaiming or resetting a server that hosts backups

> **Danger:** Unclaiming or resetting a server removes every backup it hosts for other people. The unclaim dialog's "Pool data will not be affected" refers to the server's own files.
{.is-danger}

If you are going to unclaim, reset, rebuild, or sell a server that hosts backups:

1. Tell your buddy first.
2. Use **Remove connection** on each hosted backup. This notifies them.
3. Then reset the server.

Unclaiming your own server does not delete the backups it sent elsewhere. Those are kept as retained backups so a replacement server can restore from them. See [Recover a failed server](/features/backups/recover-a-failed-server).

## Do not remove things during a restore

> **Warning:** While a restore is running, do not remove the connection, remove the folder from the backup, or delete the folder. Wait for it to finish.
{.is-warning}

## Retention removes old restore points on its own

Restore points older than the retention window are removed at each backup. The window is set per connection in **Schedule & Retention**: 1 week, 2 weeks, 1 month, or 3 months. Shortening it shows how many restore points would be removed and asks you to confirm.

> **Help:** Not sure what a button will do? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) before clicking it.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
