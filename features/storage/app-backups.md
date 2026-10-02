---
title: App backups
description: A nightly copy of the apps on a single drive, kept on a pool that can lose a drive
published: true
date: 2026-10-02T00:00:00.000Z
tags: storage, apps, backups, virtual machines
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# App backups

Many servers run their apps from one fast solid-state drive. It is quick, but it is alone: if that drive fails, every app on it is gone. HexOS keeps a copy of those apps every night on a pool on the same server that can lose a drive without losing data. If the drive ever fails, you can put your apps back.

## What gets copied

- Your apps and their data, every night at 2:30 AM, server time.
- The last 7 nights. The copy is there to bring back a drive that just failed, not to keep a long history.
- Virtual machines whose disks are on that drive, but only the ones you say yes to. See [Virtual machines](#virtual-machines).

Shared folders on the apps drive are not copied. Your files on the protected pool are already safe there.

> **Info:** The app backup only reads from your apps drive. It never changes, moves or erases anything on it.
{.is-info}

## Turn it on

There is nothing to switch on. When setup puts your apps on a single drive, click that pool in the setup plan: its panel names the pool where the nightly copy goes. HexOS sets up the copy when setup finishes.

> **Requirement:** The copy needs a second pool that can lose a drive, with at least a quarter more free space than your apps use. A server with only single drives has nowhere to keep the copy, and the plan says so.
{.is-success}

## Follow the nightly copy

Each night's copy shows as one row in the activity center, **Backing up apps on** followed by your apps pool's name. It has four steps: taking a snapshot, copying to the other pool, writing a list of what is in the copy, and checking the copy.

<details>
<summary> The nightly copy in the activity center </summary>

![nightly-copy-activity-row.png](/app-backups/nightly-copy-activity-row.png){.medium .framed}
</details>

If a copy does not happen, a notice tells you why. It stays until the next good copy, then **App backup is working again** replaces it.

| Notice | What to do |
|---|---|
| **App backup didn't finish** | Nothing. HexOS tries again the next night. |
| **App backup is overdue** | No copy has finished in more than two days. Check the activity center for the reason. |
| **App backup is running out of room** | The pool that holds the copy is almost full. Free some room on it. |
| **App backup is stuck** | The copy keeps failing and is filling your apps drive. Free room on the pool that holds the copy. |
| **App backup has nowhere to go** | The pool that holds the copy is no longer on the server. |
| **App backup: apps pool is missing** | Your apps drive is gone. See [When the apps drive fails](/features/storage/apps-drive-failed). |
| **App backup stopped** | The copy was removed in TrueNAS. Set up the app backup again. |

> **Warning:** HexOS never deletes anything to make room. When space runs short, you get a notice instead. Free room on the protected pool so the copy can finish.
{.is-warning}

## Virtual machines

A virtual machine whose disk is on a single drive is lost with that drive. Its disk can be much bigger than all your apps together, so HexOS asks you about each one. A card on the **Storage** screen and on the **VMs** screen asks **Keep a copy of** followed by the virtual machine's name.

<details>
<summary> The question for a virtual machine </summary>

![vm-copy-question.png](/app-backups/vm-copy-question.png){.medium .framed}
</details>

- Click **Keep a nightly copy** to copy its disk every night. This is the safest choice. The confirmation shows how much room the copy takes on the protected pool.
- Click **No copy** to leave it out. The confirmation warns you that the virtual machine is lost if the drive fails.

<details>
<summary> Keeping a nightly copy </summary>

![vm-copy-keep-dialog.png](/app-backups/vm-copy-keep-dialog.png){.medium .framed}
</details>

Tick the box in the confirmation and confirm your choice.

You can change your answer at any time. Open the virtual machine, click the **Options** tab, and use the **Nightly copy** switch. The line under the switch says whether the copy is running.

<details>
<summary> The nightly copy switch </summary>

![vm-copy-switch.png](/app-backups/vm-copy-switch.png){.medium .framed}
</details>

> **Info:** Some virtual machines cannot be copied: one with disks on more than one pool or in more than one folder, and one that shares a disk with another virtual machine. The card says why.
{.is-info}

## Put your apps back

If your apps drive fails, you can put your apps and the virtual machines you chose back from the copy. See [When the apps drive fails](/features/storage/apps-drive-failed).

> **Help:** Questions about app backups? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
