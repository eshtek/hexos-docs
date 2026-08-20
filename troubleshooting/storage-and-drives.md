---
title: Storage and drive issues
description: Drives not recognized, pool creation problems
published: true
date: 2026-08-20T18:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-20T18:00:00.000Z
---

# Storage and drive issues

## Drive not recognized

If your drives aren't showing up:

1. **Physical connections**
   - Ensure all SATA/power cables are properly connected
   - Try different SATA ports or cables
   - Check that drives spin up during boot

2. **Drive compatibility**
   - Verify drives are supported by your hardware
   - Check for any drive-specific firmware requirements

3. **Power supply**
   - Ensure adequate power supply capacity for all drives
   - Check that all power connectors are secure

## Pool creation issues

Problems creating storage pools:

1. **Drive preparation**
   - Drives must be unpartitioned for ZFS pool creation
   - Use the HexOS interface to wipe drives if needed

2. **Insufficient drives**
   - Mirror pools require at least 2 drives
   - RAIDZ1 requires at least 3 drives
   - RAIDZ2 requires at least 4 drives

**Related:** [Drive failure](/troubleshooting/drive-failure) — replace a failed or failing drive without losing data
