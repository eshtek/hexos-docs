---
title: Manage your backups
description: Add folders, change the schedule and speed, adjust reserved space, pause, and read the backup map
published: false
date: 2026-08-21T12:00:00.000Z
tags: backups, buddy, schedule, pause, folders
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Manage your backups

Once a backup is running it mostly looks after itself. This is the page to come back to when you want to change what is protected, how often it runs, or how much of your network it uses.

Everything here starts from **Backups** on your dashboard.

## Adding and removing folders

Open the backup and use **Add folder** to protect something new. The first run for a newly added folder copies everything in it, so expect it to take a while.

> **Danger:** Removing a folder from a backup deletes that folder's copy and all of its restore points on the destination server. The folder itself stays on your server, untouched. See [Removing backups](/features/buddy-backups/removing-backups).
{.is-danger}

## Changing the schedule

Open the backup and edit its schedule. Daily is the usual choice; weekly keeps fewer restore points.

> **Warning:** The schedule belongs to the whole backup, not to one folder. Changing it from a folder's menu changes it for every folder in that backup.
{.is-warning}

> **Warning:** If someone has hand-tuned this backup's schedule in the TrueNAS interface, saving a schedule here replaces it, and the previous setting cannot be recovered.
{.is-warning}

## Changing the transfer speed and reserved space

Click **Storage** to open **Backup Options**. This is where both settings live.

**Reserved space** is the ceiling for this backup on the destination server.

**Transfer speed** offers **Full speed**, **Smart**, or **Custom**. Choosing **Smart** then lets you pick **Balanced** or **Background**.

> **Info:** The **New backup** wizard calls the middle option **Smart**, while **Backup Options** shows it as **Balanced**. It is the same setting under two names.
{.is-info}

> **Warning:** Reserved space is a limit on the backup, not space fenced off from everything else. Your own files can still fill the pool underneath it.
{.is-warning}

## Pausing

Pausing stops new backups running while keeping everything already stored on the destination. It is the right move when you are doing maintenance, or when your network is busy for a few days.

> **Warning:** Only the person who paused a backup can resume it. If your buddy paused it, you will see a message saying so, and you will need to ask them.
{.is-warning}

To resume, the server being backed up must be online. If it is not, you will see "Backups couldn't be resumed — try again in a moment"; wait and try again.

Pausing does not free up the reserved space, and a paused backup is not removed. If you want the space back, you need to remove the backup instead — which deletes it.

> **Warning:** Do not pause a backup if you are about to retire the server permanently. Move the backup to its replacement first, then pause. See [Recover a failed server](/features/buddy-backups/recover-a-failed-server).
{.is-warning}

## Reading the backup map

The **Backup map** shows every backup connection on your account at once — which servers are sending, which are receiving, and the state of each link. It is the fastest way to see whether everything is healthy when you have more than one or two backups.

The map uses slightly different wording from the dashboard card for the same states. Both are listed side by side in [Backup troubleshooting](/features/buddy-backups/troubleshooting).

## Display names

You can give a server or pool a friendlier display name so the map and the backup list read clearly. This changes only what you see; it does not rename anything on the server.

## The Transfer tile

Alongside the settings you will see a tile called **Transfer**.

> **Warning:** **Transfer** does not mean transfer speed, despite sitting next to it. It moves a backup connection onto a replacement server, and it starts restoring every folder automatically. Only use it when you are recovering from a lost server. See [Recover a failed server](/features/buddy-backups/recover-a-failed-server).
{.is-warning}

## The HexOS Network connection

Setting up a backup creates a private network connection between the two servers, listed as **HexOS Network**.

> **Info:** Leave it alone. Do not rename it, edit it, delete it, or block it in a firewall. Backups stop working if it is disturbed, and it is managed for you.
{.is-info}

> **Help:** A backup showing a status you do not recognise? Every status word is explained in [Backup troubleshooting](/features/buddy-backups/troubleshooting), or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
