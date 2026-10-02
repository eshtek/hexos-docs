---
title: Deep check
description: A full health check of a pool's drives and data, run in the background
published: true
date: 2026-10-02T00:00:00.000Z
tags: storage, drives, health, setup
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# Deep check

The deep check is a full health check of a storage pool. It asks each drive to test itself, then checks every piece of data on the pool. It runs in the background and only reads. It never changes, moves or erases anything.

## When it runs

- **After setup.** If a drive in a new pool has been used before, or shows signs of trouble, setup says so in the plan. When you finish setup, the check starts the first time you open your server's dashboard.
- **For pools you already have.** HexOS never checks an existing pool without asking. If it notices a used or worn drive, a notice asks whether to check the pool, for example **Check the health of Vault?**, and lists the drives and why. Click **Start the check** or **Not now**. If you click **Not now**, HexOS does not ask again for the same reason for a month.

<details>
<summary> The offer to check an existing pool </summary>

![deep-check-offer.png](/deep-check/deep-check-offer.png){.medium .framed}
</details>

## What happens during the check

1. Every drive in the pool runs its own built-in self-test, all at the same time. A large hard drive can take most of a day.
2. Then HexOS reads everything stored on the pool and confirms it is intact.
3. The result is written up in the activity center.

The activity center shows one row for the check, with a step for each drive and its progress. You can keep using your server while it runs. You can also close your browser: the check keeps going.

<details>
<summary> The deep check in the activity center </summary>

![deep-check-activity-row.png](/deep-check/deep-check-activity-row.png){.medium .framed}
</details>

> **Info:** If the whole server restarts during the check, the drives stop testing. The check ends as not finished, and you can run it again.
{.is-info}

## The results

- **Passed:** every drive tested cleanly and all data checked out.
- **Problem found:** a drive failed its self-test, or some data was damaged. The drive is marked on the **Storage** screen. If a loose cable is the likely cause, HexOS says so.
- **Not finished:** something got in the way, such as a restart, or a drive that cannot run a self-test. Run the check again when the server is settled.

Open the finished check's notice to see the report. It has a line for each drive and a line for the data check.

<details>
<summary> A deep check report </summary>

![deep-check-report.png](/deep-check/deep-check-report.png){.medium .framed}
</details>

> **Warning:** If a drive failed, replace it, then click **Run the check again**. See [Drive failure](/troubleshooting/drive-failure).
{.is-warning}

## Stop a check

Dismiss the row in the activity center, or stop the check from the pool. The drives stop testing and nothing is left behind.

> **Help:** Questions about a check result? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
