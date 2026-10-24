---
title: How HexOS identifies your server
description: How the planned identity improvement treats fresh installations, updates and copied system disks.
published: false
date: 2026-10-24T00:00:00.000Z
tags: setup, troubleshooting
editor: markdown
dateCreated: 2026-10-24T00:00:00.000Z
---

# How HexOS identifies your server

> **Info:** This is a coordinated prerelease draft. It describes a change being prepared, not a repair procedure or release announcement.
{.is-info}

HexOS uses an identifier to recognize an installation when it connects. Two installations can have the same older identifier. A new installation can then be missing from setup because that identifier already belongs to another server.

## What changes

The planned improvement gives each fresh HexOS installation an identifier made from operating-system randomness. The installation saves it and uses it again when connecting. It does not create a different identifier each time it starts.

Existing installations keep their current identifier during an update. This preserves their connection to the existing server record. The change does not require you to reinstall a working server.

<details>
<summary> Server identity illustration </summary>

![Three servers with different colored identity badges.](/server-identity/server-identity-installations.webp){.medium .framed}

*Concept illustration: an existing installation keeps its identity, while fresh installations receive their own.*
</details>

## What stays separate

The new identifier is separate from the identifiers used by the storage system. Creating it does not change the pool layout, move files or transfer a server to another account.

An identifier is not a password or proof of ownership. The existing account and authentication checks still apply.

## Copying a system disk

Copying an entire system disk also copies its saved identifier. Random generation does not make those two copies different. Preparing a copied installation for use as a separate server is a separate operation.

This distinction matters even when both computers have different hardware. The saved identity belongs to the installation on disk; it is not recalculated from the computer's network address or drive serial numbers.

## If setup cannot find your server

An empty setup result does not identify the cause. Support can compare the installation with its account record and check whether the problem involves connectivity, setup or a conflicting identifier.

Deleting the saved identity or changing the storage system's identifier is not a general discovery repair. Those changes can make diagnosis harder or affect another part of the system.

## When the improvement is available

Both the identity reader and the fresh-install writer must be included in a qualified HexOS installation image. Source changes and lab tests do not establish that an image has been released.

A local recovery command is also being prepared for affected installations that have not completed provisioning. Its release-specific procedure needs separate qualification. This page explains the design; it does not provide instructions to run that command on current releases.
