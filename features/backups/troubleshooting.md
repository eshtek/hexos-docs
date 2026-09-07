---
title: Backup troubleshooting
description: What every backup status and notice means, and what to do about the common stuck states
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, troubleshoot, status
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Backup troubleshooting

Every connection card shows one status line. Find yours in the table, then read the section for any notice you received.

## What the status words mean

| Status | What it means | What to do |
|---|---|---|
| "Up to date" | The last run completed and nothing is waiting. | Nothing. |
| "Backing up…" or "Backing up… N%" | A run is in progress. | Wait. The first run is the longest. |
| "Setting up…" | Provisioning is building the tunnel and preparing folders. | Wait a few minutes. |
| "Waiting for the other server to come online…" | Setup cannot continue until the destination is reachable. | Bring the other server online. Setup resumes on its own. |
| "Setup failed" | A provisioning step failed. HexOS retries on its own. | Open the activity item to retry now or cancel. Cancelling deletes nothing. |
| "Setup hasn't finished. Ask the sender to retry from their side" | You host this connection and setup failed. Only the sender can retry. | Ask your buddy to open the connection and retry. |
| "Last backup failed" | The most recent run did not complete. | Check both servers are online and that the reservation has room. The next run retries. |
| "Needs attention" | Something needs a decision from you. | Open the connection and read the notice. |
| "Some folders aren't backed up yet" | Folders were added but have not completed a first run. | Wait for the next run, or click **Back up now** on the folder. |
| "Active. Nothing backed up yet" | Setup finished; no run has completed. | Wait for the first scheduled run, or click **Back up now**. |
| "Backups paused" | The connection is paused. | Click **Resume** if you paused it. If your buddy paused it, ask them. If HexOS paused it for space, see below. |
| "Storage N% full" | The reservation is 90% or more used. | Raise the quota, back up less, or shorten retention. |
| "Storage limit reached" | The reservation is full. | Same remedies. HexOS pauses for space if the next run cannot fit. |
| "Status unknown. No backup report for {ago}" | The two servers have not exchanged a report recently. | Check the other server is online and connected to HexOS. |
| "Status unknown. No backup has ever been confirmed" | No run has ever reported success. | Check both servers are online. Click **Back up now** on a folder. |
| "Backups retained from a removed server" | The server that sent these backups was removed from the account. | See [Recover a failed server](/features/backups/recover-a-failed-server). |
| "Connection revoked" | The other side removed the connection. | Nothing is stored any more. Set up a new backup if you need one. |

<details>
<summary> The backup map showing connection states </summary>

![Backup map showing server connections and their status](/features/backups/images/backup-map.png){.medium .framed}
</details>

## Notices you may receive

### "Backup to X needs more space"

Before each run HexOS estimates the size of the next send. If it will not fit in the reservation, both sides get this notice. It says how much the next backup needs and either "No space is left for future backups." or "There is still N GB available for future backups."

Do one of the following:

- Ask for more space. Click **Quota** on the connection; if a buddy hosts it, the button reads **Request change** and they approve it.
- Back up less. Uncheck folders in **Edit folders**.
- Keep restore points for less time in **Schedule & Retention**.

If the host's own pool is full, the notice says that instead, because a bigger reservation would not help. The host needs to free space on the pool or move the reservation with **Change pool**.

### Paused for space

When the reservation cannot hold the next run at all, HexOS pauses the connection rather than failing every night, and tells both sides. Either side can resume it, and it resumes on its own when the reservation grows or the next run fits. Fix the space using the remedies above.

### "Backups to X may have stopped"

The owner sees this, and both sides get an email, when no backup has completed within the expected schedule for at least a week and there was something to send. Unchanged folders do not trigger it. Check both servers are online, open the connection, and click **Back up now** on a folder to see whether the run completes.

### "Backup buddy X unreachable"

The buddy's server has been offline for about 10 days. Ask them whether it is switched on and connected to HexOS, and whether they have reset it. A reset removes hosted backups.

### Reservation full or nearly full

When the reservation is full or nearly full, both accounts get one email, not a daily repeat, and the card shows "Storage N% full" at 90%. Use the remedies under needs more space.

## Setup will not finish

HexOS retries failed setup steps on its own. Open the activity item to retry now or cancel. Cancelling deletes nothing, because nothing was stored.

Common causes:

- **The other server is offline.** Both must be online at the same time.
- **One server has lost its connection to HexOS.** Check its dashboard card.
- **You are hosting.** Only the sender can retry. Ask them.

## Folders are locked when editing folders

On a buddy connection, unencrypted folders show "Only encrypted folders can be backed up to buddy servers". Encryption cannot be added to a folder after it is created. Create a new encrypted folder, move the files into it, and choose that one. Backups to a server you own accept any folder. See [Folder encryption](/features/folders#encryption).

## The destination list is empty

Servers that are offline do not appear as destinations. Wake the other server and try again.

## Resume is refused

- If your buddy paused the connection, only they can resume it. Ask them.
- If you paused it and resume fails, the backed-up server is not online. Bring it online and try again.
- If HexOS paused it for space, either side can resume once the space problem is fixed.

## A restore is waiting for a passphrase

A restore started without a passphrase copies the data, then asks for the passphrase in the activity center. Enter it there to finish. A wrong passphrase can be retried. If you cannot find it, discard the restore, which removes the locked copy. There is no way to open an encrypted folder without its passphrase.

## A request was never accepted

HexOS does not email your buddy about requests. Ask them to open the Backups panel and click **Requests**. If the email address has no HexOS account, the request waits indefinitely; withdraw it and send again with the correct address.

## The private network connection

HexOS builds a direct, encrypted, peer-to-peer WireGuard tunnel between the two servers when a connection is set up. It is created and maintained automatically, and there is nothing to configure.

> **Help:** Still stuck? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz). Include the status line you see and whether the connection is one you send or one you host.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
