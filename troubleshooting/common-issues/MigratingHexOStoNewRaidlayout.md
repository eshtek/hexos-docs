---
title: Migrating HexOS to New Hardware using New Raidz layout
description: If you have a system and you built a new one with a different layout like moving from a mirror to Raid Z1 or Z2 or Z3
published: true
date: 2026-08-09T02:00:05.860Z
tags: migrating, new hardware, raidz2, raidz3
editor: markdown
dateCreated: 2026-08-09T02:00:05.860Z
---

# Header
# Migrating HexOS to New Hardware

Moving your apps, VMs and data to a different machine — including changing your pool layout
(for example, from a 2-drive mirror to RAIDZ2).

::: warning This is an advanced guide
Most of this work happens in the **TrueNAS interface behind HexOS**, not in the Command Deck. If you only need to move drives between machines *without* changing the pool layout, you can usually just move the physical disks — this guide is for the case where the new server has adifferent pool layout, so the data has to be copied across.

Take your time, and don't erase anything on the old server until the new one is fully verified.

## What you can and can't carry over

| Thing | How it moves |
| --- | --- |
| Your files (shares/folders) | ZFS replication, dataset by dataset |
| Apps and their settings | Replicate the `ix-apps` dataset, then point Apps at the new pool |
| App data stored in folders | ZFS replication, like any other dataset |
| Virtual machines | Replicate the zvols; the VM definitions either come back with a config restore or get recreated by hand |
| Users, shares, network settings | Either recreate them by hand, or restore a config backup — see Step 6 |
| Your HexOS license | Follows your account — but only one server can be claimed at a time |

## Decide this up front: how your system settings come across

There are two valid ways to get your users, shares and VM definitions onto the new machine, and the one you pick changes what you do in Steps 5 and 6.

**Option A — Start clean and recreate by hand.** You set your users and shares up again on the new server. Simplest to follow, nothing unexpected carried over, and you end up with a tidy system. Best if you have a handful of shares and users, which is true for most HexOS setups.

**Option B — Restore the config backup from the old server.** Your users, shares, SMB settings and VM definitions come back in one shot. Saves real work if you have a lot of them, at the cost of a few extra steps and a couple of sharp edges — including one that will strand your new pool until you re-import it.

Both options are written out in full in Step 6. Everything up to that point is identical, with one exception noted in Step 5.

## Before you start

1. **Save a config backup from the old server.** In the TrueNAS UI:
   **System → General → Manage Configuration → Download File**, and tick **Export Password Secret
   Seed**. Option B needs this file. Take it even if you're planning on Option A — it costs nothing and it's a useful record of how the old server was set up.
2. **Write down your current pool name, exactly.** You'll find it in Storage in the Command Deck,or in the TrueNAS UI. HexOS names pools after the type of drive in them, so it's usually something like `HDDs`, `SSDs` or `NVMEs`. You will need it character for character.
3. **Make a list of your installed apps** and any settings you customised.
4. **Check capacity.** Your new RAIDZ2 pool needs enough usable space for everything currently on the old pool.
5. **Leave the old drives untouched** until the new server is confirmed working. That is your rollback plan, and it costs you nothing to keep.

## Step 1: Install HexOS on the new machine — but don't claim it yet

Follow the [installation guide](/getting-started/installation/InstallGuide) to install HexOS on
the new server's boot drive.

Stop before claiming it in the Command Deck.

::: tip One license, one claimed server
A HexOS license covers one claimed server at a time. If you try to claim the new machine while the old one is still claimed, you'll see *"You do not have any licenses available to claim a new server."* That's expected — you'll claim the new server at the end, once everything has been copied across and checked.

Leaving the new machine unclaimed for now is fine. An unclaimed HexOS machine is still a fully working TrueNAS system, reachable at `https://<new-server-ip>` with the `truenas_admin` account and the root password you set during installation. That's where the next few steps happen.

## Step 2: Create the RAIDZ2 pool from the TrueNAS UI

Log in to the new server directly at `https://<new-server-ip>` and create your pool under **Storage → Create Pool**, choosing the RAIDZ2 layout.

Two things to know:

- **HexOS's own pool creator can't make a RAIDZ2 pool.** It creates a stripe for a single drive, a mirror for two, and RAIDZ1 for three or more. RAIDZ2 has to be created from the TrueNAS UI.
- **Give the new pool exactly the same name as the old server's pool** (for example, `HDDs`).

That second point is the single most valuable thing in this guide. Apps and VMs store absolute paths like `/mnt/HDDs/…` and `/dev/zvol/HDDs/…`. If the pool name matches, everything you copy across simply works. If it doesn't, you'll be hand-editing paths in every app and every VM
afterwards — and creating the pool yourself is the only opportunity you get to choose the name, because HexOS generates pool names automatically from the drive type.

::: info Names in the Command Deck
The name you can edit for a pool in HexOS is a display label. The underlying ZFS pool name — the one that appears in paths — is set when the pool is created and isn't changed by renaming the label.
:::

::: warning Create the pool before restoring any config backup If you're going with Option B, don't restore the config yet. TrueNAS won't let you create a pool
whose name already appears in its configuration, and a restored config still lists the old server's pool by that name. Create the pool first, restore later — Step 6 covers the order.
:::

## Step 3: Copy the data across with ZFS replication

Put both servers on the same network. Replication runs directly between them; it doesn't go through HexOS or the internet.

The setup — SSH keypair, SSH connection, replication task — is covered step by step, with screenshots, in [Replicating Virtual Machines](./ReplicatingVirtualMachines). The same procedure applies here; you're just replicating more than VM disks.

Replicate all of the following from the old pool to the new one:

- **Your data datasets** — the folders/shares holding your files.
- **The `ix-apps` dataset** (`<pool>/ix-apps`). This is where your app configurations live. It is what actually brings your apps back — app settings are *not* in the config backup file, under either option.
- **The zvols behind your VMs.**

::: tip Stop your apps before the final pass
Replicate a snapshot taken with the apps stopped, so databases aren't caught mid-write. A practical approach: run the replication once while everything is running to move the bulk of the data, then stop your apps and run it a second time to pick up the changes. The second pass is
incremental and much faster.
:::

Expect this to take hours rather than minutes for a couple of terabytes on a gigabit network.

## Step 4: Bring your apps back

On the new server, in the TrueNAS UI, go to **Apps → Settings** (the configuration menu) and set the apps pool to the pool you just replicated into.

TrueNAS finds the existing `ix-apps` dataset and picks your apps up with their settings intact. Because the pool name matches the old one, any folders your apps mount resolve to the right place.

Start the apps and check each one before moving on.

## Step 5: Virtual machines

**On Option A**, recreate each VM in the TrueNAS UI now, attaching the zvol you replicated as its disk rather than creating a new one. The last section of
[Replicating Virtual Machines](./ReplicatingVirtualMachines) shows this.

**On Option B**, skip this step. VM definitions are part of the config backup, so they'll come back on their own in Step 6 — and because the pool name matches, they'll already be pointing at the zvols you replicated. Check them after the restore instead.

Under both options: if a VM or app uses passed-through hardware — a GPU, a TPU, a USB device — you'll need to select that device again on the new machine. Hardware addresses differ from board to board, so the old selection won't carry over, and a restored config can't carry it either.

## Step 6: Users, shares and system settings

Pick the option you decided on earlier. Either way, this has to happen **before** you claim the server in Step 7.

### Option A — Recreate by hand

In the TrueNAS UI on the new server, recreate:

- your users (**Credentials → Users**)
- your shares (**Shares → Windows Shares (SMB)**, or whichever protocols you use), pointing at the datasets you replicated in Step 3

Then move on to Step 7. Once the server is claimed, the folders will appear in the Command Deck alongside your apps.

### Option B — Restore the config backup

The order matters here. Do it exactly like this:

1. **Restore the config.** In the TrueNAS UI on the new server:
   **System → General → Manage Configuration → Upload File**, choose the file you saved from the old server, and confirm. The server reboots on its own.
2. **Expect the pool to be missing after that reboot.** This is normal and it's the sharp edge to be ready for. TrueNAS remembers pools by a unique ID, and the restored configuration only knows about the old server's pool — so your new RAIDZ2 pool isn't recognised on the way up. Your data is fine; the system just isn't looking at it yet.
3. **Import the pool.** Go to **Storage → Import Pool** and select your pool. TrueNAS replaces the stale entry with the real one, the datasets mount, and your shares start resolving to the right paths.
4. **Check your apps.** Go back to **Apps** and confirm they're running. If the apps pool setting didn't survive the round trip, set it again as in Step 4.
5. **Check your VMs.** Their definitions should be back. Confirm each one's disk points at a zvol that exists, and re-select any passed-through hardware.
6. **Check the network.** See the note below — this is the other thing to be ready for.

::: warning Two things to watch on Option B
**Network settings come from the old machine.** The new motherboard's network ports have different names, so the restored network configuration may not apply cleanly, and the restored hostname and static IP may collide with the old server if both are powered on. Keep a monitor and
keyboard on the new server for this reboot so you can fix the network from the console if it doesn't come back on the LAN.

**Never upload a config file to a server that's already claimed.** The config contains the API key HexOS uses to talk to your server. Restoring an older config replaces that key, and the Command Deck loses access and disconnects the server. Restoring now, while the new machine is still
unclaimed, avoids this entirely — which is why Step 7 comes last.

::: info What a config restore does not bring back
App configurations. They live on the pool in the `ix-apps` dataset, not in the config file, whichis why Step 3 replicates it under both options.

## Step 7: Claim the new server

Only once the new server is doing everything the old one did:

1. In [deck.hexos.com](https://deck.hexos.com), unclaim the old server. Its data isn't touched —
   the drives keep everything on them, and the machine stays usable through the TrueNAS UI.
2. Claim the new server. Your license is now free for it.
3. Work through setup as normal, but **skip pool creation** — your RAIDZ2 pool already exists, and HexOS will pick it up.

## Obstacles to expect

**Network interface names change.** Covered above for Option B, but it's worth a monitor and keyboard on the new machine for the first boot either way.

**Hardware passthrough needs re-selecting.** GPUs, TPUs and USB devices have to be picked again on the new machine, under both options.

**Encryption keys.** Pools created by HexOS aren't encrypted, so this usually doesn't apply. If you created encrypted datasets yourself, export their keys from the old server before you start, and keep them with your config backup.

**The old server is your safety net.** Don't wipe it, and don't pull its drives, until the new server has been running your workload happily for a while.

## Getting help

If you get stuck partway through, the [HexOS Discord](https://discord.gg/fCW2htvYdz) is the
fastest place to ask. Include which step you reached, which option you chose, your old and new
pool names, and whether the new server has been claimed yet.
