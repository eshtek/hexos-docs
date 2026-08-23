---
title: Buddy Backups
description: Keep an offsite copy of your folders on a server you trust, without paying for cloud storage
published: false
date: 2026-08-23T12:53:54.208Z
tags: backups, buddy, offsite, disaster recovery, restore
editor: markdown
dateCreated: 2026-08-23T12:07:07.025Z
---

# Buddy Backups

Your server already protects you from a drive failing. It does not protect you from a fire, a flood, a burglary, or a mistake that deletes the same file everywhere at once. For that you need a copy of your files somewhere else entirely.

Buddy Backups gives you that copy without a monthly bill. You pair up with someone you know who also runs HexOS, and each of you keeps an encrypted copy of the other's folders. Your files live in their house, sealed so that only you can open them.

You can also back up to a second server of your own, in another building or at a relative's house. The setup is the same.

## Why this is worth doing

A storage pool with redundancy survives a drive dying. It does not survive the things that take out the whole machine:

- A house fire, a burst pipe, or a lightning strike
- Theft of the server itself
- Ransomware that encrypts everything the server can reach
- Deleting a folder and only noticing months later

The standard advice for anything you cannot bear to lose is to keep a copy in a different building. Buddy Backups is the cheapest way to do that: your friend already owns a server with spare space, and so do you.

## How it works, in plain terms

1. You pick the folders you want protected.
2. HexOS seals each folder before it leaves your server, using your folder's own password.
3. The sealed copy travels straight to your buddy's server over a private connection HexOS sets up for you.
4. It arrives still sealed. Your buddy stores it but cannot open it or read what is inside.
5. HexOS keeps it up to date on the schedule you choose, and keeps roughly two weeks of earlier versions you can go back to.

You never open a port on your router, never look up an IP address, and never install anything extra.

> **Warning:** Because your files are sealed with your folder's password, your buddy cannot read them — but neither can anyone else, including HexOS. If you lose that password, the backup cannot be opened by anybody. Write it down and keep it somewhere safe.
{.is-warning}

## What you are agreeing to

Buddy Backups is a trade, and it is worth being clear about both halves.

**What you give.** Space on your server for your buddy's sealed copies, and the electricity to keep it running. You reserve an amount of space up front so their backups cannot fill your pool.

**What you get.** The same in return, plus the ability to rebuild your entire server from their copy if yours is destroyed.

**What you rely on.** That your buddy keeps their server running and does not wipe it. Choose someone whose server you expect to still exist in a year.

> **Warning:** Anyone hosting your backup can delete it, and you can delete theirs. This is deliberate — it is their disk. Pick a buddy accordingly, and if the data is irreplaceable, keep more than one copy. See [What removing things actually deletes](/features/buddy-backups/removing-backups).
{.is-warning}

## What you need

- **Two servers.** Either two of your own, or yours and a buddy's.
- **Encrypted folders**, if you are backing up to someone else's server. HexOS will only send a folder to another person if it is encrypted, because that is what makes it unreadable to them. Backing up to a server you own yourself works with any folder.
- **Both servers online** at the same time while the backup is being set up.
- **A working connection to HexOS** on both servers.

> **Warning:** A folder cannot be encrypted after it is created. If you want to back a folder up to a buddy and it is not encrypted today, you will need to create a new encrypted folder and move the files into it first.
{.is-warning}

## What Buddy Backups is not

Being honest about the edges will save you a surprise later.

- **It is not a long-term archive.** Roughly two weeks of earlier versions are kept, so it protects you from a disaster or a recent mistake, not from something you deleted last year.
- **It is not file-level restore.** You restore a whole folder, then take what you need out of it. There is no way to pull back a single file.
- **It is not a sync service.** Files do not appear on your other devices, and editing on one side does not update the other.
- **It does not replace redundancy.** Keep your pool healthy as well. This is the second copy, not the first.

## Where to go next

| I want to… | Guide |
|---|---|
| Set up my first backup | [Set up a backup](/features/buddy-backups/set-up-a-backup) |
| Store a backup for a friend | [Host a buddy's backup](/features/buddy-backups/host-a-buddys-backup) |
| Change what is backed up, or how often | [Manage your backups](/features/buddy-backups/manage-your-backups) |
| Get a folder back | [Restore a folder](/features/buddy-backups/restore-a-folder) |
| Rebuild after losing a server | [Recover a failed server](/features/buddy-backups/recover-a-failed-server) |
| Understand what deleting removes | [Removing backups](/features/buddy-backups/removing-backups) |
| Work out why something is stuck | [Backup troubleshooting](/features/buddy-backups/troubleshooting) |

## Availability

Buddy Backups is being rolled out gradually. If you do not see **Backups** on your dashboard yet, it has not reached your account — there is nothing you need to do to prepare.

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
