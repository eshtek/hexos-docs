---
title: Migrating and Upgrading
description: Moving your server, restructuring storage, and required upgrades
published: true
date: 2026-08-20T20:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-20T20:00:00.000Z
---

# Migrating and upgrading

Planned changes to a working server — moving hardware, restructuring storage, or running an upgrade that HexOS requires. These are deliberate projects rather than faults, so read the whole guide before starting one.

> **Danger:** Back up your data before starting any migration. Several of these steps are irreversible, and an interrupted migration can leave data unrecoverable.
{.is-danger}

## Bringing existing storage into HexOS

- [**Import existing pools**](/troubleshooting/migrating/import-existing-pools) - Move drives from TrueNAS or a previous install without wiping them
- [**Move to new hardware**](/troubleshooting/migrating/new-hardware) - Move apps, VMs, and data to a different machine, including changing your pool layout

## Moving app storage

- [**Immich storage migration**](/troubleshooting/migrating/immich-storage) - Move Immich photos to a new storage configuration

## Required upgrades

- [**Update HexOS 24.10 to 25.10**](/troubleshooting/migrating/truenas-24-to-25) - Bring an early-adopter server onto the current release
- [**Update Immich to Postgres 18**](/troubleshooting/migrating/immich-postgres-18) - Required database upgrade for Immich

## Something broken instead?

If this is not planned work and something has stopped functioning, start at [Troubleshooting](/troubleshooting).

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
