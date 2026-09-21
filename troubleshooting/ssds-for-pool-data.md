---
title: SSDs for pool data
description: Why HexOS warns about QLC and DRAM-less SSDs holding pool data, and which SSDs to choose instead
published: true
date: 2026-09-21T00:00:00.000Z
tags: troubleshoot, storage, ssd, hardware
editor: markdown
dateCreated: 2026-09-21T00:00:00.000Z
---

# SSDs for pool data

Not every SSD is a good fit for holding your files. HexOS checks the model of each SSD in your pools and the job it does. When a drive of a known slow type holds pool data, the drive turns amber on the **Storage** screen and its page shows one line: **This device has known issues**. Click **See details** to read the warning.

The same SSD used as a boot drive or as a cache drive gets no warning. In those jobs the drawbacks below do not matter, and if the drive wears out your data is not at risk.

> **Info:** A warning here is about speed and wear, not about a fault. The drive works. It will slow down under the kind of load a server produces, and it will wear out sooner than other SSDs.
{.is-info}

## QLC SSDs

**Which drives:** Samsung 860 QVO and 870 QVO, Crucial P1, P3 and P3 Plus, Kingston NV2, WD Green SN350, Intel 660p, 665p and 670p, Corsair MP400, Sabrent Rocket Q and Q4.

**The problem:** These drives store four bits in each memory cell (QLC). They read quickly and handle short bursts of writing well. Once their small fast cache fills, sustained writing slows dramatically, on some models to below the speed of a spinning hard drive. Pool data produces exactly that kind of load: backups, large copies and the rebuild that runs after a drive is replaced. QLC cells also wear out after far fewer writes than other SSDs.

**The recommended fix:** For pool data, a TLC SSD with a DRAM cache is a better fit. See [what to buy instead](#what-to-buy-instead).

## DRAM-less SSDs

**Which drives:** Kingston A400 and NV1, Crucial BX500, WD Green SATA.

**The problem:** These drives have no memory chip of their own to keep track of where data is stored. They borrow a little of the computer's memory instead, or manage without. Small writes and the bookkeeping a file system does constantly are much slower as a result, and steady writing speed drops as the drive fills.

**The recommended fix:** For pool data, an SSD with a DRAM cache is a better fit. See [what to buy instead](#what-to-buy-instead).

## What to buy instead

Look for two things on the spec sheet:

- **TLC memory**, not QLC. Some product lines switched from TLC to QLC between sizes or revisions, so check the exact model.
- **A DRAM cache.** A spec sheet that says "DRAM-less" or "HMB" (host memory buffer) means there is none.

| Connection | Examples with both |
|---|---|
| SATA (2.5 inch) | Samsung 870 EVO, Crucial MX500, WD Red SA500 |
| NVMe (M.2) | Samsung 980 Pro or 990 Pro, WD Red SN700, Crucial P5 Plus |

Drives sold for NAS use, such as the WD Red and Seagate IronWolf SSD lines, are built for sustained writing and long service and are a safe choice.

> **Tip:** The **Storage** screen shows the job each drive does. Keep QLC and DRAM-less drives for the boot drive or a cache, where they do fine, and put your files on drives with TLC and DRAM.
{.is-tip}

> **Help:** Not sure whether a drive you already own is affected? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) with the model number from the drive's page.
{.is-troubleshooting}

## After you change the drive

Replacing a pool drive is a guided task in HexOS. Open the drive's page and click **Replace**. The button is there for any drive in a pool of two or more drives, not only for a failed one, and [Drive failure](/troubleshooting/drive-failure) walks through the same steps. Replace one drive at a time and let the pool finish rebuilding before the next. Once the new drive is in the pool, HexOS reads the parts again and the warning disappears on its own.
