---
title: Troubleshooting
description: 
published: true
date: 2026-08-20T19:30:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:44:02.077Z
---

# Troubleshooting

Something not working? Find the area below that matches what you are seeing.

> **Help:** If your problem is not covered here, ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) — other users and the team are there.
{.is-troubleshooting}

## Setting up

- [**Installation issues**](/troubleshooting/installation) - USB imaging problems and installer failures
- [**Avoid USB drives**](/troubleshooting/usb-drives) - Why USB drives cause problems and what to use instead
- [**Connection issues**](/troubleshooting/connection) - Server not getting an IP address, discovery problems
- [**Network ports**](/troubleshooting/network-ports) - What ports 43705 and 43706 are for, and whether it is safe to block them

## Signing in

- [**Sign-in and account issues**](/troubleshooting/sign-in) - Claiming your server, Command Deck login, local server authentication
- [**Clear browser cache**](/troubleshooting/browser-cache) - Fix login issues and UI problems caused by stale browser data

## Apps

- [**Application errors**](/troubleshooting/apps) - Installation, update, and startup failures, GPU pass-through, app curation resets

## Storage and drives

- [**Storage and drive issues**](/troubleshooting/storage-and-drives) - Drives not recognized, pool creation problems
- [**Drive failure**](/troubleshooting/drive-failure) - Replace a failed or failing drive without losing data

## Accessing your files

- [**File sharing**](/troubleshooting/file-sharing) - Fix Windows 11 connections to your folders

## Migrating and upgrading

Planned changes to a working server — moving hardware, restructuring storage, or running a required upgrade. See [Migrating and upgrading](/troubleshooting/migrating) for all of these together.

- [**Import existing pools**](/troubleshooting/migrating/import-existing-pools) - Move drives from TrueNAS or a previous install without wiping them
- [**Move to new hardware**](/troubleshooting/migrating/new-hardware) - Move apps, VMs, and data to a different machine
- [**Immich storage migration**](/troubleshooting/migrating/immich-storage) - Move Immich photos to a new storage configuration
- [**Update HexOS 24.10 to 25.10**](/troubleshooting/migrating/truenas-24-to-25) - Bring an early-adopter server onto the current release
- [**Update Immich to Postgres 18**](/troubleshooting/migrating/immich-postgres-18) - Required database upgrade for Immich

## Stuck tasks

If a task is taking too long or appears stuck in the Activities panel, you can dismiss it manually by enabling [Experimental Features](/features/settings/experimental-features/) and clicking the X icon next to the task.

> **Warning:** Always back up important data before making system changes or troubleshooting storage issues.
{.is-warning}
