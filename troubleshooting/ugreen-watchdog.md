---
title: UGREEN NAS keeps restarting
description: Turn off the BIOS watchdog so a UGREEN NAS stops restarting a few minutes after it starts
published: true
date: 2026-10-05T00:00:00.000Z
tags: troubleshoot, ugreen, bios, watchdog, install
editor: markdown
dateCreated: 2026-10-05T00:00:00.000Z
---

# UGREEN NAS keeps restarting

UGREEN NAS models (the NASync DXP series, such as the DXP2800, DXP4800 Plus, DXP6800 Pro and DXP8800 Plus) come with a **watchdog** turned on in the BIOS. The watchdog waits for UGREEN's own operating system, UGOS, to check in. HexOS does not check in, so the watchdog restarts the server about 3 minutes after it turns on.

You might see one of these:

- The server restarts by itself soon after the HexOS console screen appears
- The server keeps going back to the boot screen
- The installation stops partway and the server restarts
- On [deck.hexos.com](https://deck.hexos.com), claiming the server fails, or the server appears and then disappears

The fix is one BIOS setting and takes about five minutes.

> **Tip:** Turn the watchdog off **before** you install HexOS. Otherwise it can restart the server in the middle of the installation.
{.is-tip}

## What you need

- A monitor connected to the HDMI port on the NAS
- A USB keyboard

## 1. Open the BIOS

1. Connect the monitor and keyboard, then turn on or restart the NAS.
2. When the UGREEN logo appears, hold `Ctrl` and press `F2` a few times.
3. If the BIOS does not open, restart and try `Ctrl` + `F12`. On some models this opens a boot menu first, where you can choose to enter setup.

<!-- Photo needed: ugreen-bios-main.jpg, the first BIOS screen with the tab names visible -->

## 2. Turn off the watchdog

1. Go to the **Advanced** tab.
2. Open **Watchdog Settings**.
3. Set the watchdog option to **Disabled**. Depending on the BIOS version, it is called **Watchdog Control**, **Watchdog Support** or **Watchdog Timer**.

<!-- Photo needed: ugreen-bios-watchdog-settings.jpg, Advanced > Watchdog Settings with the option set to Disabled -->

> **Info:** Menu names vary between models and BIOS versions. On some models with an Intel Core i5 processor the watchdog setting is on the **FAST** tab instead. If you still cannot find it, look under **Hardware Monitor**.
{.is-info}

## 3. Save and restart

Press `F10` and confirm to save your changes and exit. You can also use the **Save & Exit** tab. The NAS restarts.

Leave the watchdog turned off. HexOS does not use it, and turning it on again brings the restarts back.

## 4. Check that it worked

Wait at least five minutes after the HexOS console screen appears. If the server has not restarted, the watchdog is off.

If you were installing HexOS, start the installation again from the USB drive. If HexOS is already installed, go to [deck.hexos.com](https://deck.hexos.com) and claim your server.

> **Help:** Still restarting? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) and tell us your UGREEN model.
{.is-troubleshooting}

**Related:** [Installation issues](/troubleshooting/installation) and [Illustrated installation guide](/getting-started/installation/InstallGuide)
