---
title: Intel I225 and I226 cards that drop off the network
description: How to stop an Intel 2.5 gigabit network card from disconnecting when PCIe power saving is on
published: true
date: 2026-11-04T00:00:00.000Z
tags: troubleshoot, network, hardware
editor: markdown
dateCreated: 2026-11-04T00:00:00.000Z
---

# Intel I225 and I226 cards that drop off the network

Intel I225 and I226 are the 2.5 gigabit network chips used on many mini PCs and recent motherboards. They are the usual recommendation for a home server, but on some systems the card disconnects from the motherboard after it has been idle, and your server disappears from the network until you restart it.

The cause is a power-saving feature, and one setting fixes it. Applying it takes about five minutes and one restart.

> **Info:** This applies to every revision of the I225-V, I225-LM, I226-V and I226-LM. The early I225-V revisions also have a separate fault that this setting does not fix. See [Intel I225 early revisions](/troubleshooting/network-cards#intel-i225-early-revisions).
{.is-info}

## What happens

The network card talks to the rest of the server over a PCIe connection. To save power, that connection can drop into a low-power state when no data is moving. This feature is called *ASPM*. Whether it is on depends on your motherboard's BIOS.

On some boards, the card does not wake back up from that state. The system sees a card that stopped answering and removes it. From the outside, the server just goes offline: the HexOS Deck can't reach it, and your shares and apps stop answering. It usually happens while the server is quiet, often overnight.

In November 2026 we checked about 7,400 HexOS servers, and 1,249 of them had one of these cards. On servers where the card's power saving was on, the card dropped off about ten times as often as on servers where it was off (6.5% against 0.6%).

## Check whether you are affected

1. Open the TrueNAS web interface: in the [HexOS Deck](https://deck.hexos.com), open **Settings**, click the **TrueNAS** button, then click the **TrueNAS** launch button.
2. Click **System** in the left sidebar, then **Shell**.
3. Run this command to look for past disconnects. Enter your TrueNAS password if it asks for one:

   ```
   sudo zgrep -h "PCIe link lost" /var/log/kern.log*
   ```

   Any line like `igc 0000:06:00.0 enp6s0: PCIe link lost, device now detached` means the card has dropped off. No output means it hasn't happened since the logs began.

4. Run this command to see whether power saving is on:

   ```
   sudo lspci -vv -d ::0200 | grep -E "Ethernet|LnkCtl:"
   ```

   Find your Intel I225 or I226 line. The `LnkCtl:` line below it says `ASPM L1 Enabled` when power saving is on, or `ASPM Disabled` when it is off.

If you found `PCIe link lost` lines, apply the fix, even if the second command shows `ASPM Disabled`. The fix also stops the motherboard's PCIe slot from powering down, which is a second way the card can drop off. If power saving is on but the card has never dropped off, the fix is optional and is a sensible precaution.

## The fix

You will tell the system to keep its PCIe connections fully awake. TrueNAS saves this setting and keeps it across updates.

1. In the same **Shell**, check whether your server already has extra startup settings:

   ```
   sudo midclt call system.advanced.config | jq -r .kernel_extra_options
   ```

2. If the result is empty, run:

   ```
   sudo midclt call system.advanced.update '{"kernel_extra_options": "pcie_aspm.policy=performance pcie_port_pm=off"}'
   ```

   If the result was not empty, keep what is there and add the new settings after it, with a space between them. For example, if it showed `iommu=pt`, use `"iommu=pt pcie_aspm.policy=performance pcie_port_pm=off"`. Leave out any existing setting that starts with `pcie_aspm` (such as `pcie_aspm=off`): it stops the new one from working.

3. Restart the server from the HexOS power menu.
4. After the restart, run the command from step 4 of [Check whether you are affected](#check-whether-you-are-affected) again. The card's `LnkCtl:` line should now say `ASPM Disabled`.

If it still says `ASPM L1 Enabled`, your motherboard does not let the system change the setting. Turn it off in the BIOS instead: restart into the BIOS setup screen and look for a setting named **ASPM**, **PCIe ASPM Support** or **Native ASPM**, usually under **Advanced** > **PCI Express** or **Power Management**. Set it to **Disabled**, save and restart, then check again.

> **Warning:** Use `pcie_aspm.policy=performance`, not `pcie_aspm=off`. Many guides suggest `pcie_aspm=off`, but it only stops the system from changing the setting. If your BIOS turned power saving on, it stays on. We found HexOS servers with `pcie_aspm=off` set whose cards were still in power saving and still dropping off.
{.is-warning}

## If the card has already dropped off

Restart the server. The card comes back when the system starts. If you can't reach the server at all, press its power button once (a short press, not a long hold) so it shuts down cleanly, then turn it back on.

## Common questions

**Will this use more electricity?**
A little. The setting applies to every PCIe connection in the server, not only the network card, so idle power goes up by a few watts on most systems.

**Do I also need to turn off Energy-Efficient Ethernet (EEE)?**
No. Guides for other systems often turn off EEE as well. TrueNAS already leaves it off on these cards.

**Should I replace the card instead?**
Not usually. With this setting applied, these cards are stable for most people. If the card still drops off after the fix, update your motherboard's BIOS, then ask for help below.

**How do I undo the fix?**
Run the command from step 2 of [The fix](#the-fix) with the value you had before (use `""` if it was empty), then restart.

> **Help:** Card still dropping off after the fix? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) with your motherboard or mini PC model and the `PCIe link lost` lines from the check above.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
