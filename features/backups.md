---
title: Buddy Backups
description: Keep an encrypted offsite copy of your folders on a buddy's server or a second server you own, with no cloud bill and no third-party tools
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, offsite, disaster recovery, restore
editor: markdown
dateCreated: 2026-08-23T12:07:07.025Z
---

# Buddy Backups

Buddy Backups gives you an offsite copy of your most important folders without a monthly bill. You and a friend who also runs HexOS each store an encrypted copy of the other's data. Your files sit on their server, but only you can read them. If you own two servers, you can back one up to the other in exactly the same way.

This is peer-to-peer encrypted replication with the networking built in. HexOS handles the connection between the two servers, the encryption, the schedule, and the restore. There is nothing to install and no third party in the middle. Your data stays safe, fast, accessible, and yours.

## Why it exists

A storage pool with redundancy protects you when a drive fails. It does not protect you from the events that take out the whole machine:

- A fire, a flood, or a power surge
- Theft of the server itself
- Ransomware that encrypts everything the server can reach
- Deleting a folder and noticing months later

The only real protection against those is a copy in a different building. Most people pay a cloud provider for that. Buddy Backups uses the spare space you and your buddy already own instead, so you both save money and both end up protected.

## How it works

1. You choose the folders to protect and where the copy should go: a buddy's server or another server you own.
2. HexOS builds a direct, encrypted, peer-to-peer WireGuard tunnel between the two servers. There is no port forwarding, no dynamic DNS, no VPN account, and no extra app. The tunnel is created and maintained automatically.
3. Each backup run takes a ZFS snapshot of your folders and sends it over the tunnel. The first run copies everything. Every run after that sends only what changed.
4. Each completed run becomes a restore point on the destination. You can bring back the latest copy or any dated restore point within your retention window.
5. Folders sent to a buddy are encrypted folders. They arrive encrypted and stay encrypted. Your buddy stores them but cannot open them, and neither can HexOS.

> **Warning:** Your buddy cannot read your encrypted folders, and neither can anyone else, including HexOS. That protection depends on the folder's passphrase. If you lose the passphrase, nobody can open the backup. Write it down and keep it somewhere that is not on the server. See [Folder encryption](/features/folders#encrypted-folders).
{.is-warning}

## What you give and what you get

**You give** space on your server for your buddy's encrypted copies, and the power to keep the server running. You choose how much space to reserve, and HexOS enforces that reservation on your pool so the backup cannot grow past it and your own data cannot crowd it out.

**You get** the same in return: an offsite copy that updates on a schedule, restore points you can go back to, and the ability to rebuild onto a replacement server if yours is lost.

**You rely on** your buddy keeping their server running. Either side can remove a connection, which deletes the stored copies. Choose a buddy whose server you expect to exist in a year, and keep a second destination for anything you cannot replace.

## What you need

- **Two servers running HexOS.** Yours and a buddy's, or two of your own.
- **Encrypted folders** for anything sent to another person's server. Backups to a server you own can include any folder.
- **Both servers online** while the connection is set up.
- **Your buddy's HexOS account email**, if you are backing up to a buddy.

> **Requirement:** A folder cannot be encrypted after it is created. To back up an unencrypted folder to a buddy, create a new encrypted folder and move the files into it first.
{.is-success}

## Compression

Backups are compressed before they are stored, so the space a backup uses on the destination server is usually less than the folder's size on your own server. The **Quota** card on a connection shows "X used of Y limit", and the used figure is the compressed size.

How much a folder shrinks depends on what is in it. Photos and video are already compressed and shrink very little. Documents, spreadsheets, text, and databases often shrink a lot. When you decide how much space to ask for, start from the folder's size on your server and treat any saving as a bonus.

## What Buddy Backups is not

- **It is not a long-term archive.** Restore points are kept for the retention window you choose, from 1 week to 3 months. It protects you from a disaster or a recent mistake, not from something deleted a year ago.
- **It is not file-level restore.** You restore a whole folder as a new folder, then take what you need from it.
- **It is not a sync service.** Files do not appear on other devices, and editing on one side does not change the other.
- **It does not replace redundancy.** Keep your pool healthy. This is the second copy, not the first.

## Where to go next

| I want to… | Guide |
|---|---|
| Set up my first backup | [Set up a backup](/features/backups/set-up-a-backup) |
| Store a backup for a friend | [Host a buddy's backup](/features/backups/host-a-buddys-backup) |
| Change what is backed up, how often, or how fast | [Manage your backups](/features/backups/manage-your-backups) |
| Get a folder back | [Restore a folder](/features/backups/restore-a-folder) |
| Rebuild after losing a server | [Recover a failed server](/features/backups/recover-a-failed-server) |
| Understand what each removal deletes | [Removing backups](/features/backups/removing-backups) |
| Work out what a status or notice means | [Backup troubleshooting](/features/backups/troubleshooting) |

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
