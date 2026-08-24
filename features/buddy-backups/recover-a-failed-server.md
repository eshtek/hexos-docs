---
title: Recover a failed server
description: Rebuild onto a replacement machine using the backups your buddy still holds
published: false
date: 2026-08-23T12:55:14.946Z
tags: backups, buddy, disaster recovery, transfer
editor: markdown
dateCreated: 2026-08-23T12:07:19.404Z
---

# Recover a failed server

This is the page for the bad day. Your server is dead, stolen, or burnt, and the copy on your buddy's machine is what you have left.

The good news: losing your server does not delete the backups it sent. They are kept, and a replacement machine can pull them back. You do not need any access to the old server to do this.

## What survives

When a server disappears from your account, the copies it sent to a buddy are kept and shown as **retained backups**. They stay until you delete them yourself.

Ownership is proved by your HexOS account alone. As long as you can sign in, you can recover — the dead machine is not needed for anything.

> **Danger:** Recovery depends entirely on your folder passphrases. If the folders were encrypted and you do not have their passphrases, the retained backups cannot be opened by anyone. There is no reset and no override.
{.is-danger}

## The steps

1. **Set up the replacement server** and claim it to the **same HexOS account** as the old one.
2. **Unclaim or reset the dead server** if it is still listed. This does not delete the copies your buddy holds.
3. Go to **Backups** and open the details of the backup you want to recover.
4. Choose **Transfer**.
5. Pick the replacement server and the pool the folders should land on.
6. Confirm.

The backup reconnects to the new server and then automatically starts restoring.

> **Warning:** **Transfer** restores **every folder** in that backup. You do not get to choose a subset, and you do not get to name the folders. Make sure the destination pool has room for all of it.
{.is-warning}

## Two things that will trip you up

> **Warning:** **Transfer** is refused while a backup is paused, and the refusal message talks about the backup "still being set up" or "adding folders". That message is misleading — the real cause is the pause. Resume the backup first, then transfer.
{.is-warning}

> **Warning:** **Transfer** is found on the backup's details in your own **Backups** area — the account that owns the data. It is not on your buddy's dashboard. If your buddy is looking at the retained backup on their server, the only button they have is **Remove**, which would delete it. Make sure they know not to press it while you are recovering.
{.is-warning}

## If your buddy's server died instead

If you were relying on a single buddy and their server is the one that is gone, your backup is gone with it. Your own files are unaffected — you have simply lost the offsite copy.

Set up a new backup to another destination as soon as you can. If the data matters enough to back up at all, it is worth having two destinations so that one failure does not leave you exposed.

## Planning ahead

A few things make a bad day much shorter:

- **Write down your folder passphrases** and keep them somewhere that is not on the server. This is the single point of failure in the whole system.
- **Use more than one destination** for anything irreplaceable.
- **Check occasionally** that your backups say **Up to date**. A backup that quietly stopped working months ago is worth nothing on the day you need it.
- **Do a test restore** once, while everything is fine, so the first time you use the process is not during an emergency.

> **Help:** Recovering and something is not behaving? See [Backup troubleshooting](/features/buddy-backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
