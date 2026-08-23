---
title: Backup troubleshooting
description: What every backup status means, and what to do about the common stuck states
published: false
date: 2026-08-21T12:00:00.000Z
tags: backups, buddy, troubleshoot, status
editor: markdown
dateCreated: 2026-08-21T12:00:00.000Z
---

# Backup troubleshooting

## What the status words mean

The dashboard card and the **Backup map** use different wording for the same states. Both are listed here so whichever you saw, you land in the right place.

| On the Backups card | On the Backup map | What it means |
|---|---|---|
| **Up to date** | **Up to date** | Working normally |
| **Last backup failed** | **Failing** | The most recent run did not complete |
| **Storage NN% full** | **Near quota** | The reserved space on the destination is nearly used up |
| **Status unknown — no backup report for…** | **Status unknown** | The two servers have not compared notes recently |

## Setup will not finish

HexOS retries automatically about every five minutes. Open the activity item to see which step failed, then choose **Retry now** or **Cancel setup**.

Common causes:

- **The other server is offline or asleep.** Both must be awake at the same time.
- **One server has lost its connection to HexOS.** Check the dashboard for that server.
- **You are hosting and the setup failed.** Only the person being backed up can retry. Ask them to retry from their side.

**Cancel setup** deletes nothing, because nothing was stored.

## Folders are missing from a backup

Folders are attached after the connection is built, and one that cannot be attached is skipped quietly. Open the backup and compare the folder list against what you chose.

The usual reason is that the folder is not encrypted and the destination is a buddy's server. Unencrypted folders can only be sent to a server you own yourself, and encryption cannot be added to a folder after it is created.

## The destination list is empty

Servers that are offline or asleep do not appear as destinations. "No other servers" usually means "not awake right now" rather than "you do not have one".

## A backup stopped updating and nothing warned me

Check the status. **Status unknown** means the servers have not compared notes recently, which is what you see when the destination has been offline for a while.

> **Warning:** A destination server can be offline for up to ten days before you are warned, and backups silently stop landing during that time. If a backup matters, check it occasionally rather than assuming no news is good news.
{.is-warning}

If the destination is a buddy's server, ask them whether it is switched on, and whether they have reset or wiped it — a reset destroys hosted backups without telling you. See [Removing backups](/features/buddy-backups/removing-backups).

## A backup is paused and I cannot resume it

Only the person who paused it can resume. If your buddy paused it, ask them.

If you paused it and resume fails with "Backups couldn't be resumed — try again in a moment", the server being backed up is not online. Wake it and try again.

## Backups disappeared from my Command Deck entirely

If the whole **Backups** area vanishes rather than showing an error, this is an account access problem rather than a fault with your server. Your stored data is retained and backups resume by themselves when access returns. Contact support.

## Transfer is refused

> **Warning:** **Transfer** is refused while a backup is paused, and the message wrongly blames setup still running or folders being added. Resume the backup first, then transfer.
{.is-warning}

## A restore is stuck at "Finishing up"

> **Danger:** This usually means the restore was started with a blank or incorrect passphrase. There is currently no way to supply the passphrase afterwards and no way to cancel the restore from the Command Deck, and it blocks further restores of that folder. Contact support.
{.is-danger}

Always type the passphrase into the **Passphrase** field before starting a restore, even though the screen suggests you can leave it blank.

## A restored folder disappeared

If a restore fails or is cancelled, the partly-restored folder is deleted, sometimes up to two hours later. This includes restores that copied everything but failed at the last step. Only treat a restored folder as yours once the restore reports success.

## The restored folder will not accept its name

If the name clashes with an existing network share, the clash is only reported after all the data has copied. Restore again with a name you are not already using.

## Do not touch the HexOS Network connection

> **Info:** The private connection between the two servers is listed as **HexOS Network**. Do not rename, edit, delete, or firewall it. It is managed for you, and backups stop working if it is disturbed.
{.is-info}

## Hosting stopped working after I changed a setting

Accepting a backup turns on the server's file-transfer service, and it stays on. If you later turn it off, every backup you host stops working. Turn it back on.

> **Help:** Still stuck? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) — include the status word you see and whether the backup is one you send or one you host.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
