---
title: Set up a backup
description: Use New backup to start backing up to a buddy's server or to another server you own
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, setup, wizard
editor: markdown
dateCreated: 2026-08-23T12:07:31.422Z
---

# Set up a backup

In a few minutes you can have an encrypted copy of your folders leaving your server on a schedule. This guide covers both destinations: a buddy's server, which needs the buddy to accept a request, and another server you own, which starts straight away.

## Before you start

- **Both servers must be online** and connected to HexOS while setup runs.
- **Folders sent to a buddy must be encrypted.** Folders sent to your own server can be anything.
- **Have your buddy's HexOS account email** ready if you are backing up to a buddy.

> **Requirement:** A folder cannot be encrypted after it is created. If a folder you want to send to a buddy is not encrypted, create a new encrypted folder and move the files into it first. See [Folder encryption](/features/folders#encryption).
{.is-success}

## Starting a new backup

1. On the dashboard, find the **Backups** section and click it to open the Backups panel.

<details>
<summary> The Backups section on the dashboard </summary>

![Dashboard showing the Backups section](/features/backups/images/dashboard-backups-section.png){.medium .framed}
</details>

2. Click the **New backup** tile.

<details>
<summary> The Backups panel with its tiles </summary>

![Backups panel showing Backing up to, Hosting backups for, and the four tiles](/features/backups/images/backups-panel.png){.medium .framed}
</details>

The first question is where the copy should go: **On a buddy's server** or **On another server you own**.

<details>
<summary> Choosing a destination </summary>

![New backup showing the two destination choices](/features/backups/images/new-backup-destination-fork.png){.medium .framed}
</details>

## Backing up to a buddy

1. Click **On a buddy's server**.
2. Enter your buddy's HexOS account email. You can also give them a display name. This name is only for you; your buddy never sees it, and you can change it later with **Rename**.

<details>
<summary> Entering your buddy's email </summary>

![Entering the buddy's email and display name](/features/backups/images/new-backup-buddy-recipient.png){.medium .framed}
</details>

3. Choose the folders to back up. Only encrypted folders can be chosen for a buddy's server.
4. Set how much space to ask for. Start from the total size of the folders you chose. Backups are compressed, so the stored copy is usually smaller. See [Compression](/features/backups#compression).
5. Review the summary and click **Send request**.

The panel then shows "Request created. Ask your buddy to open Backups on their HexOS Deck and accept."

> **Warning:** HexOS does not email your buddy about the request. It appears only under **Requests** in their Backups panel. Message them yourself and ask them to accept it.
{.is-warning}

> **Info:** A request sent to an email address with no HexOS account simply waits. There is no error and no expiry. Check the spelling before you send. You can withdraw a pending request at any time from your side.
{.is-info}

Nothing is copied until your buddy accepts. When they do, HexOS reserves the space on their pool and provisioning starts automatically. See [Host a buddy's backup](/features/backups/host-a-buddys-backup) for what they see.

## Backing up to another server you own

1. Click **On another server you own**.
2. If you have more than one server, choose the source server to back up.
3. Choose the destination server and the pool the copies should live on.

<details>
<summary> Choosing your own server as the destination </summary>

![Choosing the source server, destination server, and pool](/features/backups/images/new-backup-own-server.png){.medium .framed}
</details>

4. Choose folders. Any folder can be chosen, encrypted or not.
5. Set how much space to reserve on the destination pool.
6. Review and confirm.

No request is needed because you own both servers. Provisioning starts straight away.

> **Info:** Servers that are offline do not appear in the destination list. If a server you expected is missing, wake it and try again.
{.is-info}

## While provisioning runs

Provisioning builds the encrypted tunnel between the two servers, reserves the space on the destination pool, and prepares each folder for replication. It usually takes a few minutes. The connection card shows "Setting up…" while this happens, or "Waiting for the other server to come online…" if the destination is offline. You can close the panel; progress continues in the activity center.

If a step fails, the card shows "Setup failed" and HexOS retries on its own. Open the activity item to retry now or cancel. Cancelling deletes nothing, because nothing has been stored yet. Only the side that owns the folders can retry; a host who sees "Setup hasn't finished. Ask the sender to retry from their side" should ask the sender to retry.

## The first run

The first backup copies everything in the chosen folders, so it takes the longest. The card shows "Backing up…" with a percentage. Every later run sends only what changed since the last restore point.

When the first run finishes, the card reads "Up to date". Open the connection to see each folder's latest backup, the **Quota** card with the compressed space in use, and the next scheduled run.

By default backups run daily and restore points are kept for 2 weeks. Change either from the connection's **Schedule & Retention** tile. See [Manage your backups](/features/backups/manage-your-backups).

> **Help:** Setup stuck, or a status you do not recognise? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
