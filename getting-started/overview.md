---
title: Getting started
description: Check your hardware and storage plan before installing HexOS.
published: true
date: 2026-07-22T12:52:26.058Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:41:06.152Z
---

# Getting started

Start by checking the hardware you want to use and deciding how to protect your files. Then follow the [installation guide](/getting-started/installation/InstallGuide) and [server setup guide](/getting-started/setup/CompleteSetup).

## System requirements

These are starting requirements for basic storage. Apps and Virtual Machines can need more memory, processor capacity or graphics hardware.

| Component | What to check |
|---|---|
| Processor | A 64-bit Intel or AMD processor with at least two cores and support for SSSE3, SSE4.1, SSE4.2 and POPCNT. |
| Memory | At least 8 GB. Check each app's requirements before choosing the final amount. |
| Boot device | Use a dedicated SSD of at least 20 GB. It is separate from the drives used for your files. |
| Data storage | At least one data drive. A single drive has no redundancy; use a redundant layout for protection against a drive failure. |
| Network | A supported wired network connection. |

The [TrueNAS hardware guide](https://www.truenas.com/docs/scale/25.10/gettingstarted/scalehardwareguide/) explains the underlying hardware requirements. The [installation guide](https://www.truenas.com/docs/scale/25.10/gettingstarted/install/installingscale/) covers boot-device sizing and installation.

> **Danger:** Installation erases the selected boot device. Keep it separate from drives holding files you need, and check the selected device before confirming.
{.is-danger}

## Preparing server hardware

### Bring your own hardware

Check the processor, memory, network controller and storage connections before reusing or buying a computer. Meeting a minimum does not establish that every app will run well. Check the requirements of the apps you intend to install.

For questions about a particular hardware configuration, include the exact part models when asking in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).

### Buy a prebuilt server

Before buying, confirm that the device can boot another operating system and exposes its storage and network hardware to TrueNAS. Do not assume that a device marketed as a NAS supports installing HexOS. Check the exact model's specifications and installation restrictions.

## Storage considerations

HDDs and SSDs can serve different purposes. Check the actual model, interface and workload instead of treating a technology label as a compatibility guarantee.

| Drive type | Common use | What to check |
|---|---|---|
| HDD | Larger media and file collections | Recording technology, controller compatibility, available bays, power and cooling. |
| SSD | App databases and workloads that need faster access | Interface, endurance, controller compatibility and the requirements of the workload. |

There is no fixed drive-capacity ceiling in this guide. Check current hardware specifications and the [drive selection guide](/articles/selectingDrives) for the models you are considering.

## Plan protection and growth

A pool combines drives. Its layout determines usable capacity, protection and the growth actions available in HexOS.

| Starting layout | Protection and growth |
|---|---|
| One data drive | No redundancy. Adding a mirror can add protection, not usable capacity. |
| Two-drive mirror | Keeps duplicate data across two drives. An eligible mirror may offer a separate conversion to a three-drive pool when that feature is enabled. |
| RAIDZ pool | Uses parity for drive-failure protection. Supported single-group layouts can add capacity through the pool's expansion action. |

Check the action offered for the actual pool rather than assuming any extra drive can be added. Choose a suitable drive offered by HexOS, then check its health and any warnings. An offered candidate is not a certification that the drive is healthy. See [Storage](/features/storage) and [Grow a mirror and reclaim space](/features/storage/growing-a-mirror).

Separate HDD and SSD pools can be useful when files and app databases have different needs. Check **Settings** > **Locations** to see where app data and media are assigned. A location assignment is not proof that existing files have moved.

> **Warning:** Redundancy is not a backup. Keep another recoverable copy of files you cannot replace, including a copy away from the server when protection from theft or physical damage matters.
{.is-warning}

## Next steps

- [**Install HexOS**](/getting-started/installation/InstallGuide) - Prepare the installer and install it on the boot device.
- [**Complete server setup**](/getting-started/setup/CompleteSetup) - Find the server, review its hardware and choose storage.
- [**Buddy Backups**](/features/backups) - Learn how to keep a copy on another HexOS server.
