---
title: Installation issues
description: USB imaging problems and installer failures
published: true
date: 2026-08-20T19:30:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-20T18:00:00.000Z
---

# Installation issues

## Cannot image USB stick with ISO

If you are having trouble creating a bootable USB drive:

1. **Use HexOS Imager**
   - [HexOS Imager](/getting-started/installation/InstallGuide#install-hexos-imager) downloads and verifies the installer for you, then writes it to the USB drive. It is the recommended tool and removes most imaging problems.
   - If you prefer another tool, use [Balena Etcher](https://etcher.balena.io/#download-etcher). Do not use Rufus, which has produced unbootable installers.

2. **Try a different USB drive**
   - Use a high-quality USB 3.0+ drive (minimum 8GB)
   - Some older or damaged USB drives can cause imaging problems
   - Avoid using cheap or no-name USB drives

3. **Download the ISO again**
   - Sometimes download corruption can cause imaging issues
   - Verify the ISO checksum if provided

## Installation process failures

Installation problems can happen for various reasons:

1. **Hardware compatibility**
   - Check the [system requirements](/getting-started/overview#system-requirements)
   - Ensure your hardware is on the supported hardware list
   - Disable any hardware features that might interfere (virtualization, secure boot)

2. **Corrupted installation media**
   - Re-create your USB installation drive with a fresh ISO download
   - Try a different USB port (preferably USB 2.0 for compatibility)

3. **Memory issues**
   - Run a memory test (memtest86+) if the installer crashes
   - Try installing with minimal RAM configuration

**Related:** [Avoid USB drives](/troubleshooting/usb-drives) — why USB drives cause problems and what to use instead
