---
title: New server checklist
description: Choose optional hardware checks during setup, or test your server's memory and drives later
published: true
date: 2026-10-09T00:00:00.000Z
tags: setup, memory test, deep check, storage
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# New server checklist

We recommend testing your hardware before you add important data. You can choose the tests during setup or run them later. Neither a memory test recommendation nor a drive check locks your storage. You do not need to pass or skip a test to create folders, install apps or create virtual machine disks.

## Choose checks during setup

After choosing your pools, setup shows **Hardware checks**. **Memory** and **Storage** both start unticked. Choose either, both or neither, then click **Continue**.

<details>
<summary> Optional hardware checks during setup </summary>

![hardware-checks.png](/complete-setup/hardware-checks.png){.medium .framed}
</details>

- **Memory:** when setup finishes, the server restarts into the memory tester. You cannot reach it through the Command Deck or TrueNAS until the test ends. It can take a few hours, depending on your hardware.
- **Storage:** asks for a [Deep check](/features/storage/deep-check) of every pool you finish setup with, including pools you keep or import. You can keep using the server during the checks, but it may be slower.

> **Info:** Kept and imported pools need current HexOS server software for their setup checks. An older server build does not start these checks. Check the activity center for progress; you can also start a check later when HexOS offers it.
{.is-info}

Click the info button beside **Memory** to read **About memory tests**. Click **Okay** to close it. Opening this dialog does not tick **Memory**.

<details>
<summary> About memory tests </summary>

![about-memory-tests.png](/complete-setup/about-memory-tests.png){.medium .framed}
</details>

**Almost done!** lists the checks you chose. Review them before you click **Finish setup**. If you chose both tests, the drive checks wait until the server returns from the memory test.

<details>
<summary> Hardware checks on the final review </summary>

![almost-done-hardware-checks.png](/complete-setup/almost-done-hardware-checks.png){.medium .framed}
</details>

If the memory test cannot start, setup still finishes and the step explains that you can run it from **Memory** on the dashboard. A server installed in legacy boot mode needs [UEFI boot mode](/troubleshooting/uefi-boot-mode) to run the test.

<details>
<summary> A memory test that could not start </summary>

![working-memory-refused.png](/complete-setup/working-memory-refused.png){.medium .framed}
</details>

## Run a memory test later

The welcome includes **Run hardware checks**. Click it to open the memory test. If you dismissed the welcome, see [Show the welcome banner again](/getting-started/setup/CompleteSetup#show-the-welcome-banner-again).

<details>
<summary> Run hardware checks from the welcome </summary>

![welcome-reopened.png](/complete-setup/welcome-reopened.png){.medium .framed}
</details>

You can also click the **Memory** card on the dashboard. Its info panel recommends a test until the server has a test on record. Click **Test memory**.

<details>
<summary> The memory test recommendation </summary>

![memory-recommendation.png](/new-server-checklist/memory-recommendation.png){.medium .framed}
</details>

Choose **Standard** or **Deep**, then click **Start**. **Standard** is a quick pass, then a full one. **Deep** is a quick pass, then three full ones. The dialog estimates how long the server will be offline; the time varies with your hardware.

<details>
<summary> Choosing a memory test </summary>

![memory-test-choice.png](/new-server-checklist/memory-test-choice.png){.medium .framed}
</details>

Review **Ready to start?**, then click **Confirm & reboot** when you are ready for the server to go offline.

<details>
<summary> Confirming the restart </summary>

![memory-test-confirm.png](/new-server-checklist/memory-test-confirm.png){.medium .framed}
</details>

> **Requirement:** A memory test cannot start while a deep drive check is active. Let the drive check finish before restarting into a memory test.
{.is-success}

> **Warning:** The test screen shows a green PASS after each round. A **Standard** test is only done after the second round. Do not stop it after the first PASS. The server restarts on its own when the test ends.
{.is-warning}

> **Info:** In a virtual machine, the test checks the memory assigned to that virtual machine. It does not test all of the host's physical memory.
{.is-info}

## Read the result

When the server returns, HexOS reads the result. If it cannot confirm the result, for example because the test stopped early, the **Memory test report** asks **What did the server's screen show?** Click **Errors were shown**, **No errors shown** or **Didn't see the screen**.

<details>
<summary> What did the screen show </summary>

![memory-test-what-screen-showed.png](/new-server-checklist/memory-test-what-screen-showed.png){.medium .framed}
</details>

A failed or unfinished test does not lock your storage. If the test reports errors, resolve the memory problem before trusting the server with important data. You can run another test from the **Memory** info panel.

For drive check progress and results, see [Deep check](/features/storage/deep-check). A new pool with previously used or worn drives may receive a deep check even if you leave **Storage** unticked during setup.

> **Help:** Questions about the checklist? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
