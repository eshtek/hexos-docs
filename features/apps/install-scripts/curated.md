---
title: Curated app scripts
description: Find the install scripts used to configure apps in HexOS.
published: true
date: 2026-07-07T18:22:57.737Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:02.168Z
---

# Curated app scripts

Curated install scripts are maintained in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository. HexOS reads the configured catalog branch during its catalog sync. A merged change is available after that sync reaches the server.

> **Info:** Install scripts have moved from this documentation site to the dedicated [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository. All contributions, bug fixes, and new scripts should be submitted there. See [Contributing](/features/apps/install-scripts/contributing) for details.
{.is-info}



## Browse scripts

**[Browse hexos-app-catalog on GitHub](https://github.com/eshtek/hexos-app-catalog)**

Each `.json` file in the repository root is an install script. Apps that use external hooks store their `.ts` files in a subdirectory, such as `plex/plex_hook.ts`. A hook can instead use inline `scriptContent`.

## Want to contribute?

See the [Contributing Guide](/features/apps/install-scripts/contributing) for how to submit your own install script to the catalog.
