---
title: Ryzen idle freezes (1000–3000 series)
description: Fixing random idle freezes on AMD Ryzen 1000, 2000, and 3000 series systems with one BIOS setting
published: true
date: 2026-08-24T00:00:00.000Z
tags: troubleshoot, ryzen, freeze, bios
editor: markdown
dateCreated: 2026-08-24T00:00:00.000Z
---

# Ryzen idle freezes (1000–3000 series)

Some AMD Ryzen processors from the 1000, 2000, and 3000 series (including Threadripper of the same era and APUs like the 2400G and 3400G) have a well-documented quirk: the server can **freeze completely while it is sitting idle** — no error message, no warning, and the only way back is holding the power button.

This matters more for a server than for a desktop. A server spends most of its life idle, which is exactly when this problem strikes. The good news: **one BIOS setting fixes it**, it takes about five minutes, and on most boards it costs you nothing in power usage.

> **Info:** Not every system is affected. Many systems with these processors — not all — can hit this issue. It depends on the combination of CPU, motherboard, and power supply. If HexOS flagged your processor, it means your hardware generation is the one with the known issue; changing the setting below is cheap insurance either way.
{.is-info}

## What is actually happening

When these processors have nothing to do, they drop into a very deep sleep mode (called C6) that uses almost no power. On some systems, the power delivery cannot handle that ultra-low draw correctly, and the whole machine locks up. Because it happens in a sleep state, nothing gets written to any log — the server just stops.

## The fix

You will change one setting in your server's BIOS (the built-in setup screen).

### 1. Get into the BIOS

1. Connect a monitor and keyboard to the server (or use your motherboard's remote management if it has it).
2. Restart the server. From HexOS you can do this from the power menu, or press the reset button.
3. As soon as the screen shows the motherboard logo, tap the setup key repeatedly — usually `Del`, sometimes `F2`.
4. If the BIOS opens in an Easy Mode, look for a button or key (often `F7`) to switch to **Advanced Mode**.

### 2. Find the setting

There are two possible settings. Use the **first one if your BIOS has it** — it fixes the problem while keeping the power savings.

**Option A (preferred): Power Supply Idle Control**

Navigate to **Advanced** > **AMD CBS** > **CPU Common Options** (or **Zen Common Options**) > **Power Supply Idle Control**.

Change it from **Auto** (or **Low Current Idle**) to **Typical Current Idle**.

**Option B (if Option A does not exist): Global C-State Control**

In the same menu area, navigate to **Advanced** > **AMD CBS** > **CPU Common Options** (or **Zen Common Options**) > **Global C-State Control**.

Change it to **Disabled**.

This is the older, blunter version of the fix. It works just as well, but your server will draw a few watts more when idle (roughly 5–10 W).

> **Info:** Menu names vary by motherboard. Every BIOS looks a little different, and the exact menu names shift between BIOS versions. Rough guide by brand:
>
> - **ASUS**: **Advanced** > **AMD CBS** > **CPU Common Options**
> - **ASRock**: **Advanced** > **AMD CBS** > **Zen Common Options**
> - **MSI**: **OC** > **Advanced CPU Configuration** > **AMD CBS**
> - **Gigabyte**: **Settings** (or **Tweaker**) > **Advanced CPU Settings**
>
> If you cannot find it, use the BIOS search feature (many boards have one), or search the web for your exact motherboard model plus "Power Supply Idle Control".
{.is-info}

### 3. Save and restart

Press `F10` (on most boards) to save and exit. The server will restart into HexOS normally.

## After the fix

- If you used **Option B** (**Global C-State Control** set to **Disabled**), HexOS can see the change and the processor warning will clear on its own after the restart.
- If you used **Option A** (**Typical Current Idle**) — the better fix — the change is invisible to the operating system, so HexOS cannot verify it automatically. Open the processor card and confirm you have applied the fix to clear the warning.

## Common questions

**Will this make my server slower?**
No. These settings only affect what the processor does while idle. Performance under load is unchanged.

**Will this use more electricity?**
Option A: effectively no. Option B: a few watts at idle.

**The server has already been freezing — is this why?**
If it locks up when it has been sitting quietly (rather than under heavy use) and nothing appears in the logs, this is the most likely cause on this hardware generation. Apply the fix and see if the freezes stop.

**The fix was applied and it still freezes.**
Try the other option (some systems need Option B even when Option A exists). If it continues, also update your motherboard's BIOS to the latest version. If it still continues, reach out on the [HexOS Community](https://discord.gg/fCW2htvYdz) — a small number of individual CPUs of this era have the problem at the silicon level, and AMD historically replaced those under warranty.

> **Help:** Still having freezes after trying both options? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) with your motherboard model and CPU.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
