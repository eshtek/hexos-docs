---
title: Removing backups
description: What pausing, withdrawing, removing, and deleting each destroy — and what they keep
published: false
date: 2026-08-23T12:55:46.988Z
tags: backups, buddy, pause, delete, remove
editor: markdown
dateCreated: 2026-08-23T12:07:23.254Z
---

# Removing backups

Four different actions look similar and do very different things. This page exists so you can check before you click, rather than afterwards.

## The short version

| Action | What it destroys | Reversible? |
|---|---|---|
| **Withdraw** a request | Nothing — nothing was ever copied | Yes, send it again |
| **Cancel setup** | Nothing — setup never finished | Yes, start again |
| **Pause backups** | Nothing — stored copies stay put | Yes, but only the person who paused can resume |
| **Remove a folder** from a backup | That folder's copy and all its restore points on the destination | **No** |
| **Remove connection** | The entire backup and every restore point on the destination | **No** |
| **Delete a folder** with the box ticked | The folder *and* its backup copies everywhere | **No** |
| **Unclaim, reset, or wipe** a server | Every backup that server was **hosting for other people** | **No** |

Your original files on your own server are never touched by any of these, with the single exception of deleting the folder itself.

## Pausing is not removing

Pausing stops new backups running. Everything already stored stays exactly where it is, and the reserved space stays reserved.

> **Warning:** Only the person who paused a backup can resume it. If your buddy paused it, you cannot restart it from your side.
{.is-warning}

Pausing does not free up space on the destination. If your buddy needs the space back, the backup has to be removed, which deletes it.

## Removing a folder from a backup

The folder stays on your server. Its copy on the destination, and every restore point for it, are deleted permanently.

> **Info:** If the destination server is offline when you do this, nothing is deleted yet — the deletion is queued and completes when the two servers reconnect.
{.is-info}

## Removing a connection

This deletes the whole backup on the destination: every folder, every restore point.

> **Danger:** There is no undo, no grace period, and no typed confirmation. One click on **Remove connection** and the copies are gone.
{.is-danger}

> **Danger:** **Either person can do this.** If you are hosting a buddy's backup, you can delete it. If your buddy is hosting yours, they can delete yours. This is deliberate — it is their disk — but it means an offsite copy is only as safe as the relationship and the machine holding it. For anything irreplaceable, keep a second destination.
{.is-danger}

## Deleting a folder on your own server

When you delete a folder that is being backed up, HexOS asks whether the backup copies should go too.

- **Leave the box unticked** and the buddy copies survive. The folder is gone from your server but can still be restored. This is the behaviour you usually want.
- **Tick "Also delete the backup copies"** and everything is destroyed everywhere at once, permanently.

> **Warning:** Ticking that box is the most complete deletion in HexOS. There is nothing left afterwards on either server.
{.is-warning}

## Unclaiming, resetting, or wiping a server

This is the one that catches people out, and it is worth reading even if you never intend to remove a backup.

> **Danger:** Unclaiming, resetting, or wiping a server **destroys every backup it was hosting for other people.** The confirmation screen says "Pool data will not be affected" — that refers to your own files. It does not cover backups you are holding for someone else. The Command Deck does not list what you are about to destroy, and the person who owns those backups is never notified. They find out when their backup stops updating.
{.is-danger}

If you are going to unclaim, reset, rebuild, or sell a server that hosts backups for anyone:

1. Tell them first.
2. Use **Remove connection** on each hosted backup deliberately — that does notify them.
3. Then reset the server.

**Unclaiming your own server does not delete the backups you sent elsewhere.** Those are kept as retained backups so a replacement machine can restore from them. See [Recover a failed server](/features/buddy-backups/recover-a-failed-server).

## Do not remove things during a restore

> **Warning:** While a restore is running, do not remove the connection, remove the folder from the backup, or delete the folder. Wait for the restore to finish.
{.is-warning}

## A note on retention

Even when you remove nothing, restore points expire on their own after about two weeks. That is by design — Buddy Backups protects against disasters and recent mistakes, not against something you deleted a year ago.

> **Help:** Not sure what a particular button will do? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) before clicking it.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
