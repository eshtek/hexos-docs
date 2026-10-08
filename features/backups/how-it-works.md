---
title: How Buddy Backups works
description: The ZFS, WireGuard, and NetBird underneath Buddy Backups, for readers who want to know what is actually happening
published: true
date: 2026-10-07T00:00:00.000Z
tags: backups, buddy, zfs, wireguard, netbird, replication, technical
editor: markdown
dateCreated: 2026-09-08T14:00:00.000Z
---

# How Buddy Backups works

> **Info:** Buddy Backups is in beta. Everyone can use it, and every backup it makes is a real copy you can restore. Beta means we are still finishing it, so screens may change and you may find a rough edge. Keep any backup you already rely on running alongside it. [What beta means](/features/backups#what-beta-means)
{.is-info}

This page is for readers who want the technical details. You do not need it to use Buddy Backups. The other pages avoid words like ZFS, snapshot, and WireGuard on purpose; this page uses them.

## The short version

Three parties take part, and each holds something different.

| Party | What it does | What it holds |
|---|---|---|
| **Your server** | Takes snapshots and sends them | The SSH private key and your folders' encryption keys |
| **The other server** | Receives and stores the copies | A locked-down user, a dataset with a size limit, and the copies (an encrypted folder stays unreadable to it) |
| **HexOS** | Sets the connection up and watches its health | Names, IDs, status reports, and locked copies of your folder keys. Never your files |

Your files travel from your server to the other server through an encrypted tunnel. HexOS never sees them unencrypted. When the two servers cannot connect directly, the tunnel goes through a HexOS relay that cannot read it.

HexOS keeps a locked copy of each folder key managed by HexOS. While HexOS manages your recovery key (the default), it can unlock that copy, and it does so to unlock a restored folder for you. If you keep the recovery key yourself, HexOS cannot unlock it. See [Recovery keys](/features/folders#recovery-keys).

## The network

Buddy Backups runs over a private network that HexOS builds between the two servers. It uses [NetBird](https://netbird.io), which manages WireGuard tunnels. HexOS runs its own NetBird service at `network.hexos.com`.

On each server, the tunnel is a network interface named `hexos0`. Its firewall rules live in their own table, named `hexos`, apart from anything else on the system.

### Why there is nothing to open on your router

Every connection a server makes for Buddy Backups goes outward. To join the network, a server asks HexOS for a one-time setup key and then connects to the network itself. The setup key works once and expires after 10 minutes.

The receiving server needs SSH on port 22, and HexOS starts the SSH service there if it is off. Inside the tunnel, a rule allows exactly one thing: TCP port 22 from the sending server to the receiving server. NetBird's default "allow everything" rule is turned off, and HexOS checks that it stays off every five minutes. Each connection gets its own rule.

> **Info:** SSH also listens on the receiving server's local network, as any TrueNAS SSH service does, but the sending server's key works only through the private link. While SSH is on, any other account that can log in with SSH can do so from your local network. Nothing is opened on your router or to the internet. When the last backup stored there is removed, HexOS turns SSH off again if HexOS turned it on and nothing else uses it. See [SSH is still on after your server stopped storing backups](/features/backups/troubleshooting#ssh-is-still-on-after-your-server-stopped-storing-backups).
{.is-info}

### Direct when possible, relayed when needed

WireGuard takes the most direct path it can find between the two servers. When both are behind a router that hides them, including when the internet provider shares one public address among many customers, NetBird connects them directly where it can and through a HexOS relay where it cannot. Either way, the tunnel is encrypted from end to end. The relay passes along data it cannot read.

### Servers join the network only while they need to

A server joins the network only while it has a backup connection. Within about five minutes after its last connection goes, it is removed, but never sooner than 15 minutes after it joined. A server with no backups has no `hexos0` interface.

While a connection exists, HexOS checks every server on the network every five minutes. A server that drops off the network is brought back, and if it gets a new address, the sending server's SSH settings follow it. The receiving server's identity is pinned, so the sending server always checks it is talking to the right machine.

> **Info:** HexOS works alongside the Tailscale app on TrueNAS. If you run both, HexOS adds its own firewall rule so each keeps working.
{.is-info}

## Setting up a connection

When you create a backup to your own server, or your buddy accepts your request, HexOS runs five steps. They show in the activity center under one task.

| Step | Where it runs | What it does |
|---|---|---|
| **Connecting servers** | Both servers | Each server joins the network with a one-time key |
| **Authorizing transfer** | HexOS | Creates the one-way, port-22-only rule between the two servers |
| **Preparing storage** | Receiving server | Creates a dedicated user, the datasets with the space set aside, and the script that limits what that user can do |
| **Securing connection** | Both servers | Your server makes an SSH key pair on its own TrueNAS. Only the public half travels. The receiving server installs it |
| **Finishing up** | HexOS | Marks the connection ready |

Then each folder you chose is added, and its first backup starts on its own.

Setup needs both servers online. While one is offline, HexOS waits and continues setup once that server is back. The wait does not count as a failure. If a step fails while both servers are online, HexOS tries again and picks up where it stopped. The first retry comes within about 10 minutes. After each further failure the wait doubles (10 minutes, then 20, then 40) up to 6 hours. After 10 failures in a row (about a day of trying), HexOS stops trying on its own. **Retry now** in the activity item tries again straight away and starts the count over. **Cancel setup** removes the half-built connection. On a new backup, that holds no backed-up data yet. On a backup you recovered onto a new server, it deletes the backup's copies, so use **Retry now** there. See [Known issues](/features/backups#known-issues).

## What is stored on the receiving server

The receiving side is built to hold an encrypted folder without being able to open it.

**A dedicated user.** Its name starts with `hexbk_`. It cannot log in with a password.

**A forced command.** Your server's public key is installed so that every SSH session runs one script and nothing else, with no terminal and no forwarding. The script lets that user run only the ZFS commands a backup or restore needs. It checks each command before running it, and a command that names a dataset must name one inside the connection's own datasets. The sending server sees only its own copies, its key works only through the private link, and the copies are never mounted on the receiving server.

**A dataset tree.** Copies land under `<pool>/hexos-backups/<token>`, in a read-only child dataset.

**Hidden folder names.** Each folder is stored as `bb-` followed by a code made from the connection and the folder name. On disk, the other server sees the code, not your folder's name. Datasets inside the folder keep their names.

**Space set aside.** The space you agreed is set as both a ZFS `quota` and a `reservation` on the connection's dataset. The quota stops the backup from growing past the agreed size, counting restore points too. The reservation takes the space out of the pool's free space as soon as the request is accepted, before any data arrives. HexOS sets at least 1 GiB on ZFS, because TrueNAS refuses smaller quotas.

## Snapshots and replication

Each folder in a backup gets two TrueNAS tasks on your server: a periodic snapshot task, which follows the schedule, and a replication task that sends the snapshots.

**Snapshots** are named `bb<connection>-YYYYMMDD-HHMMSS` and include every dataset inside the folder. A scheduled snapshot is skipped when nothing in the folder changed, so empty restore points do not pile up.

**Back up now** does not wait for the schedule. HexOS takes a snapshot with the same naming and starts the send.

**The first backup sends everything. Every later backup sends only the changes.** Each run finds the newest snapshot both sides hold and sends the difference from it. Sends are compressed, as ZFS stores them. This is TrueNAS's own replication.

If the snapshot the other side depends on is gone from your server, the run stops. It does not quietly start over and replace the copy on the other side. The folder then shows "Needs a fresh full copy", and **Repair backup** starts its copy over. See [Backup troubleshooting](/features/backups/troubleshooting).

### Retention

You choose how long restore points are kept: 1 week, 2 weeks (the default), 1 month, or 3 months. Weekly backups need at least 2 weeks, so 1 week is not offered for them.

The receiving side follows your server. A restore point removed on your server is removed on the other side at the next backup.

Your server normally keeps any snapshot the other side has not received yet, so a backup that could not run does not lose the snapshot it needs next. If that snapshot is lost anyway, the folder shows "Needs a fresh full copy". Shortening the time asks you to confirm first, because it removes restore points on the other server.

> **Warning:** Shortening how long restore points are kept removes them on the other server too.
{.is-warning}

### Resume

A cut-off transfer continues where it stopped. It does not start over.

Every receive on the other side records where it stopped. At the start of the next run, your server finishes that partial send first, then sends anything newer.

If a run fails, HexOS tries it again after 15 minutes, 1 hour, 4 hours, and 12 hours. Scheduled backups keep running as well.

**Stop backup** and **Pause** use the same mechanism. The running send ends, the other side keeps what it received, and the next backup continues from there.

## Encryption: raw send

This is how a buddy holds your data without being able to read it.

ZFS can send an encrypted dataset in two ways. A normal send decrypts on the way out. A **raw send** sends the encrypted blocks exactly as they are on disk. The receiving side stores data it cannot unlock, because it never gets the key.

HexOS sets each folder's replication task to send dataset properties. With that setting, TrueNAS always uses a raw send for an encrypted folder. There is no HexOS setting to turn it off, and an automated test checks it.

What follows from this:

- **A folder sent to another person must be encrypted.** HexOS refuses to add an unencrypted folder to a backup between two accounts, and the Command Deck does not let you pick one. You can [turn on encryption for a folder](/features/folders#turning-on-encryption) at any time.
- **A folder sent to your own second server can be either.** An encrypted folder is still sent raw. An unencrypted one is sent normally, because both servers are yours.
- **No key travels with the data.**

### Restoring an encrypted folder

A restore pulls the copy back as a new folder. An encrypted folder arrives still encrypted and locked.

**Key managed by HexOS:** the folder unlocks on its own while you are signed in.

**Passphrase:** your passphrase passes through HexOS to your server without being stored. Your server keeps it in memory for the unlock, never on disk, and drops it afterwards.

Once it unlocks, the restored folder is shared on your network with the access you chose in the restore's review. See [Restore a folder](/features/backups/restore-a-folder#start-a-restore).

> **Info:** With keys managed by HexOS (the default), HexOS can unlock restored folders for you. If you keep the recovery key yourself, store it somewhere safe. See [Recovery keys](/features/folders#recovery-keys).
{.is-info}

## Transfer speed

The speed setting is a limit on the replication task. TrueNAS applies it on your server as the data leaves, so it holds whatever the network does.

Each side sets its own limit, and transfers run at the lower of the two. Between two servers you own, one setting covers both. **Full speed** has no limit. **Custom** is a limit you type in Mbps. **Smart** limits a transfer to half of the measured speed between the two servers.

Until the first measurement exists, **Smart** runs at full speed, so the first backup finishes as soon as it can. When either side chose **Smart**, HexOS measures the speed with a test after setup. It also updates the figure from any real backup that moves at least 10 MiB over at least 5 seconds.

The speed test sends test data through the real path: from your server, through the tunnel, to the other server. It sends two amounts of different size, so the time spent connecting does not count as transfer time. On a fast link it sends more, up to 2 GiB in all. With **Smart** chosen, you can run it again with **Run speedtest** or **Test again** in the **Transfer speed** dialog.

## What the latest backup time means

Each folder shows "Latest changes backed-up:" and a time. That is the time of the newest snapshot the other server confirmed receiving. ZFS checks every block it writes, and a stream damaged on the way is refused, not stored. So a run that finishes is a run whose data arrived whole.

HexOS also watches for backups that stop arriving. If no backup finishes for longer than expected, you get a notice. That takes at least 7 days, and longer for weekly backups.

## Doing this by hand

Here is roughly what it takes to build the same thing yourself on plain TrueNAS:

1. Install a private network tool on both servers and get them talking, including any router changes.
2. On the receiving server, create a user, turn off its password, and write the script that keeps it inside its own dataset.
3. Create a dataset for the copies, make it read-only, and set a quota and a reservation.
4. On the sending server, make an SSH key pair, install the public half on the receiver for that user, and record the receiver's host key.
5. Create a periodic snapshot task for each folder, with a retention time.
6. Create a replication task for each folder: push over SSH, with properties sent so encrypted folders go raw, retention that follows the source, and no starting over from scratch.
7. Make sure each folder is encrypted, or accept that the receiver can read it.
8. Set a speed limit both sides agree on.
9. Watch each task, notice when a run fails or a schedule is missed, and decide when to try again.
10. Repeat for each folder, each direction, and each buddy.

None of this is unusual. All of it is standard TrueNAS. Buddy Backups does it the same way every time, in the right order, with strict settings, and removes what it created when you remove the connection. It turns the SSH service back off only if it turned it on and nothing else uses it.

## What HexOS never has

- **Your SSH private key.** It is made on your server's own TrueNAS and stays there.
- **Your file data.** Files go from your server to the other server through the encrypted tunnel. HexOS receives status reports: which folder, what state, when it last backed up, how much moved.
- **The setup key after use.** It works once and expires after 10 minutes.

Folder keys managed by HexOS are stored locked with your server's recovery key. If you choose to keep the recovery key yourself, HexOS cannot open your folders. See [Recovery keys](/features/folders#recovery-keys).
