---
title: How Buddy Backups works
description: The ZFS, WireGuard, and NetBird underneath Buddy Backups, for readers who want to know what is actually happening
published: true
date: 2026-09-08T14:00:00.000Z
tags: backups, buddy, zfs, wireguard, netbird, replication, technical
editor: markdown
dateCreated: 2026-09-08T14:00:00.000Z
---

# How Buddy Backups works

The other Buddy Backups pages avoid words like ZFS, snapshot, replication, and WireGuard on purpose. This page is where they belong. It is for people who want to know what is happening underneath, what lands on a buddy's disk, and why the design can make the promises it makes.

Everything here describes the code as it ships.

## The short version

Three parties are involved, and each holds something the others never receive.

| Party | What it does | What it holds |
|---|---|---|
| **Your server** | Takes snapshots and pushes them | The SSH private key, the folder's encryption key |
| **Your buddy's server** | Receives and stores the sealed copies | A locked-down user, a quota-limited dataset, ciphertext |
| **HexOS** | Sets the connection up and watches its health | Identifiers and pointers, never file data or keys |

File bytes travel from your server to your buddy's server directly, over an encrypted tunnel, and never pass through HexOS.

## The network

Buddy Backups runs over a private network that HexOS builds between the two servers. It uses [NetBird](https://netbird.io), which manages WireGuard tunnels, and HexOS runs its own NetBird control plane, signal, and relay at `network.hexos.com` rather than depending on a third party's service.

On each server, the tunnel appears as an interface named `hexos0`. The NetBird agent runs inside the HexOS container with host networking, and its firewall rules live in their own table named `hexos`, kept separate from anything else on the system.

### Why there is nothing to open on your router

Every connection a server makes for Buddy Backups originates outbound. When a server needs to join the network, it asks HexOS for a one-time setup key over the connection it already has, then dials the control plane itself. HexOS never dials your server. The setup key expires after ten minutes, can be used once, and is not stored anywhere.

The only listener involved is SSH on port 22, which HexOS turns on if it was off. That port is reachable only across `hexos0`, and only under a policy that permits exactly one thing: TCP port 22 from the sending server to the receiving server, in that direction. NetBird's default allow-everything policy is disabled, and HexOS confirms it stays disabled every five minutes. A second connection between the same two servers, or one going the other way, gets its own policy.

> **Info:** There is nothing to forward and nothing to open. Port 22 is never exposed to the internet; it is reachable only inside the tunnel, by one specific peer, for one specific connection.
{.is-info}

### Direct when possible, relayed when needed

WireGuard tunnels take the most direct path available between the two servers. When both sides are behind NAT, including carrier-grade NAT where the ISP shares one public address across many customers, NetBird negotiates a direct connection where one can be made and uses HexOS's relay where it cannot. The tunnel is encrypted end to end in both cases: the relay forwards ciphertext it cannot read. Both paths are exercised in the test suite, and you never configure either.

The same tunnel carries the traffic on a home network as across the internet, so the same protections apply wherever the two servers are.

### Servers join the network only while they need to

A server is enrolled in the network only while it has a live backup connection, and is removed about fifteen minutes after the last one goes. A server with no backups has no `hexos0` interface and no presence on the network at all.

While a connection exists, the network heals itself. The agent checks its own health every two minutes, and HexOS reconciles every peer every five. A peer that drops off while its server is otherwise online is restarted, and if that does not bring it back, it is re-enrolled with a fresh key. If a re-enrolled server receives a new address, the sending server's SSH credential is re-pointed at it automatically, and because the buddy's host key is pinned, the connection always verifies it is talking to the right server.

> **Info:** HexOS is designed to coexist with the Tailscale app on TrueNAS. If you run both, HexOS places its own firewall rule ahead of Tailscale's so each keeps working.
{.is-info}

## Forging a connection

When you confirm a backup, or your buddy accepts your request, HexOS runs five steps. You see them in the activity feed on both servers, under one parent task.

| Step | Where it runs | What it creates |
|---|---|---|
| **Connecting servers** | Both servers | Each server joins the network with a one-time key. HexOS waits for both to report an address |
| **Authorizing transfer** | HexOS | The one-direction, port-22-only policy between the two peers |
| **Preparing storage** | Buddy's server | A dedicated user, a dataset tree with the reservation applied, and the command wrapper that user is confined to |
| **Securing connection** | Your server, then buddy's | Your server generates an SSH key pair on its own TrueNAS. Only the public half travels. The buddy installs it, and your server records a credential pointing at the buddy's network address with the host key pinned |
| **Finishing up** | HexOS | The connection is marked active |

After that, each folder you chose is attached, and the first backup starts on its own.

Every step is safe to repeat. If a step is interrupted, HexOS retries the sequence on its own within roughly ten minutes, picking up where it stopped rather than starting over. **Retry now** in the activity item does the same immediately. **Cancel setup** removes the half-built connection, which at that point holds no backed-up data.

## What lands on your buddy's server

The buddy's side is built to hold your data without being able to do anything with it.

**A dedicated user.** Named `hexbk_` followed by a sixteen-character token derived from the connection. Its password is disabled, it cannot log in with a password over SSH, it has no SMB access, and it belongs to no groups. Its `sudo` rights are limited to a fixed list of ZFS commands scoped to its own subtree.

**A forced command.** The public key is installed with `command=` pointing at a wrapper script, plus `no-pty`, `no-port-forwarding`, `no-X11-forwarding`, `no-agent-forwarding`, and `no-user-rc`. Every SSH session runs that wrapper and nothing else. The wrapper rejects shell metacharacters, allows only the ZFS subcommands replication needs (`receive`, `create`, `set readonly`, `mount`, `umount`, `destroy`, `send`, `list`, `get`), checks that every dataset it is asked to touch is inside the connection's home, blocks property overrides on receive, and executes a reconstructed command line rather than the raw input.

**A dataset tree.** Under `<pool>/hexos-backups/<token>`, a home dataset carrying the reservation and a `data` child set to `readonly=on` and `exec=off` where the copies land. The parent is mode `0711`, so each connection is isolated from every other.

**Hashed folder names.** Each folder is stored as `data/bb-<hash>`, where the hash is derived from the connection and the folder name. On disk, your buddy sees a hash, not the name.

**A real reservation.** The space you asked for is set as both a ZFS `quota` and a `reservation` on the home dataset, not the lighter `refquota` variants. The quota counts the data and its snapshots together; the reservation removes the space from the pool's free total the moment the buddy accepts, before a single byte arrives, so every reader of pool space agrees. The minimum is 1 GiB because TrueNAS refuses smaller quotas.

## Snapshots and replication

Each folder in a backup gets two TrueNAS tasks on your server: a periodic snapshot task and a replication task. The snapshot task carries the schedule. The replication task runs whenever the snapshot task fires.

**Snapshots** are named `bb<connection>-YYYYMMDD-HHMMSS` and are recursive. The task is created with `allow_empty` off, so a folder with nothing new since the last snapshot mints no snapshot at all. HexOS records that as a no-change check, so nothing is sent and no empty restore points accumulate.

**Back up now** does not wait for the schedule. HexOS takes a snapshot itself with the same naming scheme and starts the replication.

**The first run is a full send. Every run after that is incremental.** Before each run, the replication engine finds the newest snapshot that exists on both sides and sends only the difference from it: `zfs send -i <base> <new>`. The send uses compressed, large-block, embedded streams. This is TrueNAS's own replication engine, and HexOS sets every task up to use it.

If the base snapshot the buddy depends on has been removed from your server, the run stops rather than resending the whole folder from scratch and replacing what the buddy holds. That is deliberate: `allow_from_scratch` is off, so the buddy's copy is never overwritten by automation. Re-adding the folder starts a fresh full send.

### Retention

You choose how long restore points are kept: 7, 14, 30, or 90 days, with 14 as the default. Daily schedules need at least two days; weekly schedules need at least fourteen. The replication task's retention policy is set to follow the source, so a restore point pruned on your server is pruned on your buddy's on the next run, and the two sides never drift apart.

Two protections apply. `hold_pending_snapshots` stops your server pruning a snapshot the buddy has not received yet, so an interrupted run can never orphan the buddy's copy. And shortening the window asks for confirmation, because it removes restore points on both servers.

> **Warning:** Retention is mirrored. Shortening it on your side removes restore points on your buddy's server too.
{.is-warning}

### Resume

An interrupted transfer continues where it stopped. It does not start over.

Every receive on the buddy's side runs with `zfs receive -s`, which records a resume token on the destination dataset if the stream is cut. At the start of every run, before planning anything else, the engine reads that token and, if one is present, sends `zfs send -t <token>` to finish the partial snapshot. Only then does it plan the next incremental.

Inside a single run, network timeouts and dropped SSH sessions are retried with a backoff from one second to sixty, up to five times, and each retry re-enters the resume path. If a run fails outright, HexOS re-runs it at 15 minutes, 1 hour, 4 hours, and 12 hours, then waits for the next schedule. A re-run never takes a new snapshot; it finishes sending the one that was in flight.

**Stop** and **Pause** are built on the same mechanism. HexOS ends the running send cleanly, the buddy's side keeps the resume token, and the next run picks up from it. Ending a send takes a moment, because the engine is designed to ride through brief interruptions and HexOS waits for it to stand down rather than cutting it off.

## Encryption: raw send

This is the mechanism behind the promise that a buddy cannot read your data.

An encrypted ZFS dataset can be sent in two ways. A normal send decrypts on the way out and the receiving side sees plaintext. A **raw send** (`zfs send -w`) sends the encrypted blocks exactly as they sit on disk, with the encryption properties attached. The receiving side stores ciphertext it cannot unlock, because it never receives the key.

HexOS sets `properties: true` on every replication task. TrueNAS's replication engine then adds `-w` automatically whenever the source dataset is encrypted. Raw send is not a setting you choose; it is the only way an encrypted folder is ever sent. When this was pinned, it was verified on hardware: the destination dataset reports its key status as unavailable and will not mount. An automated test guards the setting.

The rules that follow from this:

- **A folder sent to another person must be encrypted.** The server refuses to add an unencrypted folder to a connection between two different accounts, and the Command Deck greys those folders out. This is enforced on the server when the folder is added, not only in the interface.
- **A folder sent to your own second server can be either.** An encrypted folder still goes raw. An unencrypted one is sent in the normal form, because both servers are yours.
- **No key ever travels.** The replication task carries no encryption fields. The buddy's dataset has no key to load.

### Restoring an encrypted folder

A restore pulls the copy back with the same `properties: true`, so it arrives still encrypted and locked, in a new dataset alongside your original. Your passphrase is used only on your own server: it is held in memory there for the unlock step, never sent to HexOS, and dropped afterward. Only after the unlock succeeds does the restored folder become writable and get a network share.

> **Danger:** The passphrase is the only key. HexOS does not store it, your buddy never has it, and a backup whose passphrase is lost cannot be opened by anyone.
{.is-danger}

## Transfer speed

The speed setting is a rate limit on the replication task, which TrueNAS applies by piping the send through `mbuffer` with a rate cap. It works at the source of the stream, so it holds regardless of what the network in between is doing.

The effective cap on a connection is the lower of the two sides' settings, so either party can protect their own connection, and it is divided evenly across the folders currently transferring so that parallel streams add up to the cap rather than each taking it. **Full speed** removes the cap. **Custom** sets it directly. **Smart** sets it to half of the measured throughput, and **Background** to a quarter.

Smart and Background calibrate to your link. HexOS measures the link with a speed test after setup when either side chose a preset, and refines the figure from any real run that moves at least 10 MiB over at least five seconds. Until that first measurement exists, the presets run at full speed so the first backup completes as quickly as possible.

The speed test pushes 16 MiB of random data through the real path, from a temporary dataset on your server, over the tunnel, through the buddy's command wrapper, and divides by the time taken. It can be run again at any time from **Backup Options**.

## What "Up to date" means

A folder shows **Up to date** when its last replication run finished cleanly, as reported by TrueNAS's replication engine, which means `zfs receive` accepted every snapshot in the run on the buddy's side. ZFS checksums every block it writes, and a stream that is damaged in transit is rejected rather than stored, so a run that completes is a run whose data landed intact. The **protected through** time is the timestamp of the newest snapshot the buddy confirmed receiving.

Separately, a staleness watchdog raises a notice when a backup has missed its schedule twice in a row, so a backup that has stopped arriving is never silent for long.

## Doing this by hand

For comparison, here is what it takes to build the same thing yourself on plain TrueNAS, which is roughly the list the five setup steps automate:

1. Install a mesh VPN on both servers and get them talking, including whatever it takes on each router.
2. On the receiving server, create a user, disable its password, decide what it can and cannot run, and write the forced-command wrapper that keeps it inside its dataset.
3. Create a dataset for the copies, set it read-only, set a quota and a reservation.
4. On the sending server, generate an SSH key pair, install the public half on the receiver under the restricted user, and record the receiver's host key.
5. Create a periodic snapshot task per folder with a retention window.
6. Create a replication task per folder: push, over SSH, with properties enabled so encrypted folders go raw, retention following the source, resumable, refusing to replicate from scratch.
7. Confirm the source folder is encrypted, or accept that the receiver can read it.
8. Set a bandwidth cap that both sides agree on.
9. Watch the task state, notice when a run has failed or a schedule has been missed, and decide when to retry.
10. Do it all again for each folder, each direction, and each buddy.

Nothing on that list is exotic. All of it is standard TrueNAS. The difference is that Buddy Backups does it the same way every time, in the right order, with the restrictive defaults chosen for you, and tears it down cleanly when you remove it.

## What HexOS never has

- **Your SSH private key.** It is generated on your server's own TrueNAS and stays in its keychain. HexOS stores the keychain entry's ID, not the key.
- **Your folder passphrase.** It exists in memory on your server during a restore, and nowhere else.
- **Your file data.** Bytes go from your server to your buddy's over the tunnel. HexOS receives status reports: which folder, what state, when it last synced, how many bytes moved.
- **The setup key.** Minted once, valid for ten minutes, single use, returned to the server and not kept.

What HexOS does store is identity and pointers: which two servers, which pool, the dataset path, the reservation, the IDs of the tasks and credentials so it can tear them down, and a display cache written by the monitor. TrueNAS on the two servers is the source of truth for everything else.

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
