---
title: Apps
description: 
published: true
date: 2026-10-09T18:26:15.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:39:48.468Z
---

# Apps

Install and manage applications on your HexOS server with multiple options to fit your needs.

## Where app installs run

App installs run on your server by default. HexOS checks the install first, then your server uses its own connection to TrueNAS to run it.

This allows installs to start when your server is reachable through HexOS, even if HexOS's direct connection to TrueNAS is interrupted. You still need a connection to HexOS to start the install, and your server must be able to reach TrueNAS.

Servers running an older HexOS version may still use the previous installation method, which needs HexOS's direct connection to TrueNAS.

## App installation options

- **Curated Apps** - One-click installs with automatic configuration
- **Community Contributions** - Apps curated by community members
- **Install Scripts** - Custom scripts for advanced setups (requires [experimental features](/features/settings/#preferences))
- **TrueNAS Catalog** - Full catalog access for maximum flexibility

## Getting started

- Browse [curated scripts](/features/apps/install-scripts/curated/) for easy installations
- Learn about [install scripts](/features/apps/install-scripts) for custom setups
- [Contribute](/features/apps/install-scripts/contributing) your own app curations
