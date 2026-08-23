---
title: Set up a backup
description: Run the New backup wizard to start backing up to a buddy or to a second server you own
published: false
date: 2026-08-21T12:00:00.000Z
tags: backups, buddy, setup, wizard
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Set up a backup

Setting up a backup takes a few minutes at your end, and then a moment of your buddy's attention to accept it. This guide covers both destinations — a buddy's server, and a second server you own.

## Before you start

- **Both servers must be online** and connected to HexOS while setup runs. A server that is asleep will not appear in the list of destinations.
- **Folders you send to a buddy must be encrypted.** Folders going to your own second server can be either.
- **Have your buddy's HexOS email address** to hand.

> **Info:** If the destination list looks empty or is missing a server you expected, the most likely reason is that the other server is offline or asleep rather than that something is wrong. Wake it and try again.
{.is-info}

## Starting the wizard

1. Go to **Backups** from your dashboard.
2. Click **New backup**.

The wizard asks where the backup should go first, then what should go in it.

## Choosing a destination

You get three choices:

- **On a buddy's server** — send an encrypted copy to someone else who runs HexOS
- **On another server you own** — use a second machine on your own account
- **Requests** — this is not a destination; it opens invitations other people have sent you. See [Host a buddy's backup](/features/buddy-backups/host-a-buddys-backup).

### Backing up to a buddy

1. Choose **On a buddy's server**.
2. Enter your buddy's HexOS email address.
3. Choose the folders you want to protect.
4. Set the reserved space, transfer speed, and schedule.
5. Confirm.

Your buddy now has a request waiting. Nothing is copied until they accept it.

> **Danger:** HexOS does not email your buddy. The request only appears inside their Command Deck, and they may not look at it for days. Message them yourself and tell them to check **Backups**.
{.is-danger}

> **Warning:** If you send a request to an email address that has no HexOS account, it is stored and simply waits — there is no error and no expiry. Check the spelling before you confirm.
{.is-warning}

### Backing up to your own second server

1. Choose **On another server you own**.
2. Choose which server is being backed up under **Back up from**.
3. Choose the destination **Server** and the **Pool** the copies should live on.
4. Choose folders, then set space, speed, and schedule.
5. Confirm.

No invitation is needed — both servers are yours, so setup begins immediately.

## Choosing folders

Pick the folders that would actually hurt to lose. Photos, documents, and anything you cannot download again are the usual answer; a media library you could re-acquire is usually not worth your buddy's disk.

> **Warning:** Folders are attached to the backup after the connection itself is built, and a folder that cannot be attached is skipped quietly. When setup finishes, open the backup and check the folder list matches what you chose.
{.is-warning}

> **Warning:** If you pick your folders first and then switch the destination from your own server to a buddy's, any unencrypted folders are dropped from the selection without a message — because unencrypted folders cannot be sent to another person. Choose the destination first.
{.is-warning}

## Reserved space, speed, and schedule

**Reserved space** is the ceiling for this backup on the destination. It stops one backup filling the whole pool.

**Transfer speed** controls how much of the network the backup is allowed to use:

| Option | What it does |
|---|---|
| **Full speed** | Uses as much bandwidth as it can |
| **Smart** | Balances the backup against everything else using the connection |
| **Background** | Stays out of the way, at the cost of taking longer |
| **Custom** | You set the limit yourself |

**Schedule** is how often a backup runs. Daily suits most people.

> **Info:** Later on, in **Backup Options**, the **Smart** setting is shown as **Balanced**. They are the same thing.
{.is-info}

> **Info:** If you create several backups in one run of the wizard, the space, speed, and schedule you choose are applied to all of them. Adjust individual ones afterwards from [Manage your backups](/features/buddy-backups/manage-your-backups).
{.is-info}

## While setup runs

Setup takes a few minutes. Progress appears in the activities menu, and you can close the window.

If a step fails, HexOS keeps retrying roughly every five minutes on its own. Open the activity item to see which step failed and to choose **Retry now** or **Cancel setup**.

> **Info:** **Cancel setup** deletes nothing, because nothing has been stored yet. The warnings about permanent deletion apply to removing a finished backup, not to cancelling one that never completed.
{.is-info}

Only the person being backed up can retry. If you are hosting and the setup fails, your buddy has to retry from their side.

## Once it is working

You should see the backup listed with a status of **Up to date** after the first run completes. The first run is the slow one — it copies everything. Later runs only send what changed.

Next: [Manage your backups](/features/buddy-backups/manage-your-backups), or read [what removing things deletes](/features/buddy-backups/removing-backups) before you need it.

> **Help:** Setup stuck, or a status you do not recognise? See [Backup troubleshooting](/features/buddy-backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
