---
title: Host a buddy's backup
description: Respond to a backup request, choose where the copies live, and understand what you are agreeing to when you store a buddy's encrypted data
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, host, request
editor: markdown
dateCreated: 2026-08-23T12:07:11.349Z
---

# Host a buddy's backup

Hosting a backup means lending part of your pool to a friend. Their folders arrive encrypted, use only the space you agree to, and give them no access to your server. Accepting takes about a minute.

## Finding the request

HexOS does not email you about requests. When a buddy tells you they have sent one, open the Backups panel from the dashboard and click the **Requests** tile. The **Pending requests** dialog lists every request waiting for you.

<details>
<summary> The Pending requests dialog </summary>

![Pending requests dialog listing incoming backup requests](/features/backups/images/requests-dialog.png){.medium .framed}
</details>

## What you are agreeing to

**You lend disk space.** You choose how much. HexOS reserves that amount on the pool you pick, so the backup cannot grow past it and your own data cannot fill the space it needs.

**You cannot read their data.** Only encrypted folders can be sent to another account. The copies stay encrypted on your pool, and your connection view shows "Only {name} can view their backup data." instead of a folder list.

**They cannot browse your server.** Hosting gives your buddy no access to your files, folders, or Command Deck. The tunnel between the two servers carries only backup traffic.

**You can remove it.** It is your disk. **Remove connection** deletes everything they have stored with you, and they are notified.

## Responding to a request

1. In **Pending requests**, click **Respond** on the request.
2. **Request** shows who the request is from. You can give them a display name here. The name is only for you; they never see it, and you can change it later with **Rename**.
3. **Storage** asks which server and pool should hold the copies and shows the amount requested. To offer a different amount, check **Allocate a different amount** and enter it. The amount cannot exceed the free space on the pool.
4. **Options** sets the transfer speed for your side. On a buddy connection each side has its own limit and transfers run at the lower of the two.
5. Click **Continue** to see the confirmation, then **Accept**.

Accepting reserves the space on your pool and starts provisioning automatically. Their first backup begins as soon as provisioning finishes. A large first run can take hours; later runs send only what changed.

> **Tip:** Backups are compressed before they are stored, so the space your buddy actually uses is often less than the folder size they asked for. See [Compression](/features/backups#compression).
{.is-tip}

## Declining and withdrawing

**Decline** refuses a request. Nothing is stored and nothing is deleted, because nothing was ever copied.

Your buddy can withdraw a request they sent before you respond. Either way, only an invitation is cancelled.

## After you accept

The connection appears under **Hosting backups for** in the Backups panel and in the **Hosted backups** table on the **Backups** page. Open it to see how much of the reservation is in use, the schedule, and your transfer speed.

<details>
<summary> A hosted connection's details view </summary>

![Hosted connection details showing the quota and privacy notice](/features/backups/images/connection-details-incoming.png){.medium .framed}
</details>

From here you can:

- **Quota** raises or lowers the reservation. It cannot go below what is already used or above the pool's free space. If your buddy asks for more space, they use the same dialog on their side and you approve the change.
- **Change pool** moves the reservation to a different pool on your server.
- **Change server** moves the hosted backup to another server you own.
- **Transfer speed** changes your side's limit.
- **Pause** stops new backups arriving; everything stored stays. Both sides are told, and only you can resume a pause you made.
- **Rename** changes the name you see for your buddy.
- **Remove** deletes the connection and everything stored in it.

> **Danger:** **Remove connection** permanently deletes your buddy's backup and every restore point in it. Their own files on their own server are untouched, but the offsite copy is gone. Either side can do this. See [Removing backups](/features/backups/removing-backups).
{.is-danger}

## Space notices

Before each run HexOS estimates the size of the next send. If it will not fit in the reservation, both you and your buddy get a notice explaining how much is needed. If the reservation cannot hold the next run at all, HexOS pauses the connection for space rather than failing every night, and resumes on its own when the reservation grows or the next run fits. If your own pool is full, the notice says so instead, because a bigger reservation would not help. See [Backup troubleshooting](/features/backups/troubleshooting).

## Before you unclaim or reset your server

> **Danger:** Unclaiming or resetting a server that hosts backups removes the hosted copies. The unclaim dialog's "Pool data will not be affected" refers to the server's own files, not to backups you hold for others.
{.is-danger}

If you plan to unclaim, reset, rebuild, or sell a server that hosts backups:

1. Tell your buddy first so they can arrange another destination.
2. Use **Remove connection** on each hosted backup. This notifies them.
3. Then reset the server.

> **Help:** Not sure whether a connection is one you send or one you host? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
