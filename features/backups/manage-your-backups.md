---
title: Manage your backups
description: Change which folders are backed up, the schedule and retention, transfer speed, space, pause and resume, names, and read the Backups page and map
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, schedule, pause, folders
editor: markdown
dateCreated: 2026-08-23T12:07:15.363Z
---

# Manage your backups

A running backup looks after itself. When you want to protect another folder, change how often it runs, cap its speed, or ask for more space, everything is a click or two from the dashboard.

## Opening a connection

The **Backups** section on the dashboard shows one card per connection with its current status. Click it to open the Backups panel, which lists **Backing up to** (connections you send) and **Hosting backups for** (connections you host), plus the **New backup**, **Requests**, **Backup map**, and **Restore** tiles. Click a connection to open its details.

<details>
<summary> The Backups panel </summary>

![Backups panel listing connections and tiles](/features/backups/images/backups-panel.png){.medium .framed}
</details>

## The details view

<details>
<summary> An outgoing connection's details </summary>

![Outgoing connection details with cards, folder list, and tiles](/features/backups/images/connection-details-outgoing.png){.medium .framed}
</details>

Three cards summarise the connection:

- **Quota** shows "X used of Y limit", where the used figure is the compressed size of what is stored (see [Compression](/features/backups#compression)), plus the last and next backup times.
- **Transfer speed** shows your side's setting. On a connection between two servers you own, it reads "You own both servers, so this limit applies to both of them". On a buddy connection each side sets its own limit and transfers run at the lower of the two.
- **Schedule & Retention** shows the schedule, for example "Daily at 02:00 (America/Los_Angeles)", how long restore points are kept and how many exist, and when the next backup runs.

Below the cards is the folder list. Each folder shows its latest backup and has a menu with **Back up now**, **Restore from backup**, **Schedule & retention**, and **Remove from backup**. On a connection you host, the folder list is replaced by "Only {name} can view their backup data."

<details>
<summary> The per-folder menu </summary>

![Per-folder menu with Back up now, Restore from backup, Schedule & retention, and Remove from backup](/features/backups/images/folder-actions-menu.png){.medium .framed}
</details>

The tiles along the bottom are **Edit folders**, **Pause** (which becomes **Resume**), **Quota** on a destination you own, **Transfer speed**, **Transfer** on an outgoing connection or **Change server** on a hosted one, **Change pool** on a hosted one, **Rename** on buddy connections, and **Remove**.

## Edit folders

Click **Edit folders** to change which folders are included. The dialog lists every folder on the server as a checkbox. Folders already backed up are checked and show how many restore points they have.

<details>
<summary> The Edit folders dialog </summary>

![Edit folders checkbox list](/features/backups/images/edit-folders-dialog.png){.medium .framed}
</details>

- **Checking a folder** adds it. The next run copies all of it, so expect that run to take longer.
- **Unchecking a backed-up folder** shows a warning naming the folders and their restore points. The button changes to **Remove N folder(s) and save**, and a confirmation titled "Delete the stored backup of N folder?" must be accepted.

On a buddy connection, unencrypted folders are locked with "Only encrypted folders can be backed up to buddy servers". Choosing an encrypted folder shows a reminder to keep its passphrase safe.

> **Danger:** Removing a folder from a backup deletes that folder's copy and every restore point for it on the destination. The files on your own server are never touched. See [Removing backups](/features/backups/removing-backups).
{.is-danger}

## Schedule and retention

Click **Schedule & Retention** to choose when backups run and how long restore points are kept. The schedule applies to the whole connection, including when you open it from a folder's menu.

<details>
<summary> The Schedule & Retention dialog </summary>

![Schedule and retention dialog](/features/backups/images/schedule-retention-dialog.png){.medium .framed}
</details>

**Schedule:** daily or weekly, at a time you choose, in the server's time zone.

**Retention:** 1 week, 2 weeks (the default), 1 month, or 3 months. Weekly backups need at least 2 weeks, so 1 week is disabled when the schedule is weekly.

Each restore point stores only what changed since the previous one, so a longer window costs less space than it might seem. Restore points older than the window are removed at each backup.

Lengthening the window saves immediately. Shortening it shows how many restore points would be removed and asks you to confirm with **Shorten and remove**.

## Transfer speed

Click **Transfer speed** to cap how much of your connection a backup uses.

<details>
<summary> The Transfer speed dialog </summary>

![Transfer speed dialog with Full speed, Smart, and Custom](/features/backups/images/transfer-speed-dialog.png){.medium .framed}
</details>

| Option | What it does |
|---|---|
| **Full speed** | No limit. May affect other internet use. |
| **Smart** | Limits speed based on your connection, using an automatic speed test. |
| **Custom** | You set the limit in Mbps. |

On a buddy connection each side owns its own cap and the transfer runs at the lower of the two. On a connection between two servers you own, one setting applies to both. Changes apply from the next run.

## Quota and asking for more space

The host of a backup decides how much space is reserved. The reservation is enforced on the pool, so other data cannot take that space and the backup cannot exceed it.

- **If you own the destination**, click **Quota** to raise or lower the reservation. It cannot go below what is already used or above the pool's free space.
- **If a buddy hosts your backup**, only they can change the reservation. When a backup fails because the space ran out, the failure dialog offers **Request more space**, which opens a dialog whose button reads **Request change** and notes "The owner of the destination server must approve the change." Your buddy sees the request and approves it from their side. You can also simply ask them to raise it from **Quota**.

Before each run HexOS estimates the size of the next send. If it will not fit, both sides are told how much is needed and what to do: ask for more space, back up fewer folders, or keep restore points for less time. If the next run cannot fit at all, HexOS pauses the connection for space and resumes automatically when it fits. See [Backup troubleshooting](/features/backups/troubleshooting).

## Pause and resume

Click **Pause** to stop new runs. HexOS asks you to confirm, then stops scheduling backups. Everything already stored stays, the reservation stays, and both sides are told. The tile becomes **Resume**.

<details>
<summary> The Pause tile </summary>

![Details view showing the Pause tile](/features/backups/images/pause-tile-active.png){.medium .framed}
</details>

- A pause you made can only be resumed by you. If your buddy paused the connection, ask them to resume it.
- A pause HexOS made for space can be resumed by either side, and it resumes on its own when the space problem is fixed.
- Resuming needs the backed-up server online.

Pausing does not free space on the destination. To give the space back, remove the connection instead, which deletes the copies.

## Rename

Each account keeps its own name for the other end of a connection. Click **Rename** on the details view or in the row menu on the **Backups** page, enter a name, and click **Save changes**. Leave the field empty to fall back to their server name or account email. The other side never sees your label.

## Back up now

Open a folder's menu and click **Back up now** to run a backup of that folder immediately instead of waiting for the schedule. Progress shows on the connection card and in the activity center.

## The Backups page

Click **Backups** in the sidebar to see every connection at once. Two tables, **Backup destinations** and **Hosted backups**, show Source, Destination, Usage, Folders, and Actions for each connection.

<details>
<summary> The Backups page </summary>

![Backups page with Backup destinations and Hosted backups tables](/features/backups/images/backups-page.png){.medium .framed}
</details>

Each row has a menu with **Edit folders…**, **Pause backups**, **Transfer speed**, **Schedule & Retention**, **Rename**, and **Remove connection**. On connections whose destination you own it also has **Quota** and **Change pool**.

<details>
<summary> The row menu on the Backups page </summary>

![Row menu with connection actions](/features/backups/images/backups-page-row-menu.png){.medium .framed}
</details>

## The backup map

Click the **Backup map** tile in the Backups panel to see every connection on your account as a diagram: which servers send, which receive, and the status of each link. It is the quickest health check when you have more than one or two connections. The status words are the same ones shown on the connection cards; see [Backup troubleshooting](/features/backups/troubleshooting) for what each means.

<details>
<summary> The backup map </summary>

![Backup map showing connections between servers](/features/backups/images/backup-map.png){.medium .framed}
</details>

## Transfer

The **Transfer** tile on an outgoing connection moves the backup to another server you own and restores every folder in it there. It is for rebuilding after a server is lost, not for everyday use. See [Recover a failed server](/features/backups/recover-a-failed-server).

> **Help:** A setting that will not save, or a status you do not recognise? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
