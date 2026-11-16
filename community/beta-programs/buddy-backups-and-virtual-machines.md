---
title: Buddy Backups and Virtual Machines beta
description: Buddy Backups and Virtual Machines are in beta. What beta means, what you need, and what we ask of you
published: true
date: 2026-10-07T00:00:00.000Z
tags: community, beta, buddy backups, virtual machines
editor: markdown
dateCreated: 2026-09-08T12:00:00.000Z
---

# Buddy Backups and Virtual Machines beta

Buddy Backups and Virtual Machines are both in beta. There is no sign-up and nothing to install. Each one needs a license that covers it.

For the other programs running now, see [Beta programs](/community/beta-programs).

## What beta means

Both features work today, on your real data. Beta means we are still finishing them. Screens may change, settings may move, and you may find a rough edge now and then. When something does not go as planned, the activity center tells you what happened and what to do next.

You see a **Beta** badge on the screens of a feature in beta. Click it for a short note about the beta and a link to share feedback on Discord.

What you tell us shapes what reaches everyone. The beta channel on Discord is read by the people who build the features. Expect follow-up questions.

## Buddy Backups: open beta

Buddy Backups keeps a copy of your folders on a buddy's server or on a second server of your own. There is nothing to sign up for and nothing to install. Each server in a backup needs a license that covers Buddy Backup. Without one, its backups pause, and everything already stored stays. Click **Backups** in the sidebar of the hosted Command Deck to start.

Each finished backup is a restore point you can restore. A backup that is still running or stopped early is not one yet. It uses the same replication that TrueNAS itself uses.

Folders sent to a buddy stay encrypted, and your buddy cannot open them. HexOS keeps your recovery key by default, so it can unlock a restored folder for you. A folder locked with your own passphrase still asks for it. You can keep the key yourself in **Settings** > **Recovery key**.

Backup copies are deleted only when you or your buddy confirm an action that removes them. Restore points older than the time you chose to keep are removed automatically, except the newest three.

> **Warning:** While Buddy Backups is in beta, keep any backup you already rely on running alongside it.
{.is-warning}

What helps us most:

- **Run a real backup for a few weeks.** How it fits into your routine only shows over time, on a schedule.
- **Read the notices.** When space runs short, a backup stops arriving, or HexOS pauses something, it tells you what happened and what to do. Tell us whether that matched what you expected, and what you did next.
- **Tell us what confused you.** The gap between what you expected and what happened is the most useful thing you can share.

Before you remove anything, read [Removing backups](/features/backups/removing-backups). To get started, see [Set up a backup](/features/backups/set-up-a-backup) and the [Buddy Backups](/features/backups) overview.

## Virtual Machines: open beta

Virtual Machines lets you run Windows, Linux, and small appliance systems such as Home Assistant OS on your HexOS server. There is nothing to sign up for and nothing to install. Creating and running a VM needs a license that covers VM controls. Click **VMs** in the sidebar to start.

Every VM is a real computer on your server. It runs on the same virtualization that TrueNAS uses, and its disks are stored on your own pools. With VM controls you can start it, stop it and take snapshots.

If setup stops after the VM is created, the VM and its disks are kept. Disks are deleted only when you remove the VM and choose to delete them.

VM setup is part of the same beta. For Plex Media Server and Home Assistant OS, HexOS can finish setting the system up after it starts, if you allow it. See [VM setup](/features/vms/vm-setup).

> **Warning:** While Virtual Machines is in beta, keep anything you already rely on running alongside these VMs.
{.is-warning}

> **Info:** Read the [known issues](/features/vms#known-issues) before you rely on a VM.
{.is-info}

What helps us most:

- **Use a VM for something real.** A test VM is fine to start, but the feedback that matters comes from real use over time.
- **Tell us what you expected.** If a screen or a message did not do what you thought, we want to hear it.
- **Say what you did next.** What you did after a notice or a result tells us more than whether you liked it.

To get started, see [VMs](/features/vms). It also lists the [known issues](/features/vms#known-issues) we are working on.

If you have a question, ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
