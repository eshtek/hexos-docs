---
title: Host a buddy's backup
description: Accept or decline a backup request, and what you are agreeing to when you store someone else's files
published: false
date: 2026-08-21T12:00:00.000Z
tags: backups, buddy, host, request
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Host a buddy's backup

When someone asks to keep a backup on your server, the request waits for you inside the Command Deck. This guide covers what you are agreeing to, and how to accept, decline, or change your mind later.

## Finding the request

1. Go to **Backups**.
2. Click the **Requests** tile to open **Pending requests**.

> **Info:** HexOS does not email you about requests. If a friend says they have sent one, look here.
{.is-info}

## What you are agreeing to

Before you accept, it is worth being clear about what happens to your server.

**You are lending disk space.** You choose how much to reserve. Their backups cannot grow past it.

**You cannot read what they store.** Their folders arrive sealed with their own password. You are storing something you have no way to open — which is the point, but it does mean you cannot check what is on your own disk.

**You can delete it.** It is your server, so the **Remove connection** button is available to you. That deletes their backup permanently.

**They cannot browse your server.** Hosting a backup gives your buddy no access to your files, your folders, or your Command Deck.

> **Warning:** Accepting a backup turns on the server's file-transfer service so the copies can arrive, and it stays on afterwards. If you later turn that service off, every backup you are hosting stops working.
{.is-warning}

## Accepting

1. Open **Pending requests**.
2. Review who it is from and how much space they are asking for.
3. Choose the pool the copies should live on.
4. Set the reserved space you are willing to give.
5. Accept.

Setup begins, and their first backup starts copying. It can take a long time for a large first run — that is normal.

> **Warning:** Reserved space is a ceiling on their backups, not space held back from you. Your own files can still fill the pool. Leave yourself headroom.
{.is-warning}

## Declining or withdrawing

**Declining** a request you have received refuses it. Nothing is stored and nothing is deleted, because nothing was ever copied.

**Withdrawing** is the same idea from the other side — cancelling a request you sent before anyone accepted it.

Neither of these destroys data. They only cancel an invitation.

## After you are hosting

The backup appears in your **Backups** area, described as incoming. You will see how much space it is using against the amount you reserved.

You can:

- **Pause** it, which stops new backups arriving but keeps everything already stored
- **Remove connection**, which permanently deletes everything they have stored with you

> **Danger:** **Remove connection** deletes your buddy's entire backup and every restore point in it, immediately and permanently. There is no undo, no grace period, and no typed confirmation. Their own files on their own server are untouched, but the offsite copy they were relying on is gone.
{.is-danger}

## Before you unclaim, reset, or wipe your server

This is the most important thing on this page.

> **Danger:** Unclaiming, resetting, or wiping your server **destroys every backup you are hosting for other people.** The confirmation screen says "Pool data will not be affected" — that refers to your own files, not to backups you are holding for someone else. The Command Deck does not list them, and your buddy is not told. They will discover it only when their backup stops updating.
{.is-danger}

If you are planning to unclaim, reset, rebuild, or sell the machine:

1. Tell your buddy first, so they can arrange another destination.
2. Use **Remove connection** on each hosted backup deliberately. This does notify them, unlike a server reset.
3. Then do whatever you were going to do to the server.

If you are the one relying on a buddy's server and you cannot control what they do with it, keep a second destination. See [Removing backups](/features/buddy-backups/removing-backups) for the full picture of what each action destroys.

> **Help:** Not sure whether a backup on your server is incoming or outgoing? See [Backup troubleshooting](/features/buddy-backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
