---
title: Settings
description: 
published: true
date: 2026-08-06T14:17:36.906Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:52.326Z
---

# Settings

This is where you can adjust your server behavior and configuration.

## System

### Network

Configure your server's network connection and how devices reach it. 
- Set up network interfaces with static IPs.
- Change your server's hostname.
- Advanced networking configuration options such as VLANs.

### Preferences

Fine-tune your HexOS experience with dashboard controls.  
- Toggle dashboard items or sections.
- Switch to dark mode.
- Choose how dates and temperatures are written. See [Personalization](/features/settings/personalization).
- Enable [experimental features](/features/settings/experimental-features/).

## Reset

The reset settings allow for rolling back your server to a different state.  

- **Unclaim Server** will remove your server from our database. Nothing happens to the physical server. You will no longer be able to access it through HexOS, but it can be reclaimed.
- **Wipe everything** will delete all data on all drives and reset your server to defaults.
- **Restore previous** will let you choose to go back to a previous point in time to undo any recent changes. (Pool data will not be affected)

## Applications

### Locations

A location editor which allows for customizations of system folder paths. 
- Select where applications install. 
- Choose the locations for downloads, documents, media, and other system folders across your storage pools.
- A location is always a folder inside a pool, such as `HDDs/Videos`. A whole pool cannot be chosen as a location.

Changing a location only changes where new files go. Nothing is moved or deleted.

> **Info:** A location cannot be changed while apps or VMs are using it. The **Used by** list on each location shows what is using it. A location saved as a whole pool on an earlier version is the exception. It shows a notice, and you can change it to a folder after you confirm.
{.is-info}



