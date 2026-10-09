---
title: New server checklist
description: The checks HexOS runs on a new server before you copy your data to it
published: true
date: 2026-10-02T00:00:00.000Z
tags: setup, memory test, deep check, storage
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# New server checklist

A new server is at its riskiest on the first day. The drives may be second-hand, and the memory has never been tested. After setup creates new storage pools, HexOS runs a short checklist so that problems show up before you copy your data in.

The checklist has two checks:

1. **A deep check of your drives.** If a drive in a new pool has been used before, HexOS checks that pool's health in the background. See [Deep check](/features/storage/deep-check).
2. **A memory test.** On a physical server, HexOS locks the new pools until the memory test passes or you skip it.

## While a check runs

While a pool is being checked, creating a shared folder, installing an app, or creating a virtual machine disk on that pool waits. A note beside the button explains why, and shows the time left when HexOS knows it. Everything else works as usual.

<details>
<summary> A new shared folder waiting for its pool </summary>

![pool-waiting-note.png](/new-server-checklist/pool-waiting-note.png){.medium .framed}
</details>

The pool's card on the **Storage** screen shows **Being checked**.

<details>
<summary> A pool that is being checked </summary>

![pool-being-checked.png](/new-server-checklist/pool-being-checked.png){.medium .framed}
</details>

> **Info:** Only the pool being checked waits. Other pools on the same server work as usual. A check never moves or deletes anything already on the pool.
{.is-info}

When the check passes, the pool opens on its own and a notice tells you it is ready. If the check could not finish, the pool opens anyway and the notice says so.

<details>
<summary> The pool is ready </summary>

![pool-ready-notice.png](/new-server-checklist/pool-ready-notice.png){.medium .framed}
</details>

## The memory test

After setup, HexOS locks the new pools until the memory test passes or you skip it. While a pool is locked, creating a shared folder, installing an app, or creating a virtual machine disk on it waits, the same as while a drive check runs.

The first time you open the dashboard after setup, an orange notice in the activity center asks you to test the memory. While the memory test locks your storage, its title is **Storage locked: test memory**. If you already opened every pool early, the title is **New server? Test its memory**. The test restarts the server and can take a few hours.

<details>
<summary> The memory test notice </summary>

![memory-test-notice.png](/new-server-checklist/memory-test-notice.png){.medium .framed}
</details>

- Click **Start the test** to open the **Memory** info panel with the test ready to run.
- Click **Do it later** to skip it for now.

While the lock is on, the **Memory** card on the dashboard shows **Storage locked**.

<details>
<summary> The Memory card while storage is locked </summary>

![memory-card-locked.png](/new-server-checklist/memory-card-locked.png){.medium .framed}
</details>

Click the **Memory** card to open its info panel. It says **Storage is locked for the memory test** and how the lock clears, with **Skip for now** and a link to this page.

<details>
<summary> The Memory info panel while storage is locked </summary>

![memory-page-locked.png](/new-server-checklist/memory-page-locked.png){.medium .framed}
</details>

> **Info:** Closing the notice does not unlock your storage. The **Memory** card and info panel keep showing the lock until the test passes or you skip it.
{.is-info}

On the **Memory** info panel, click **Start**. A new server runs the **Standard** test: a quick pass, then a full one. It finds nearly all memory faults. The dialog shows an estimate of how long your server will be offline, based on how much memory it has.

<details>
<summary> Starting the memory test </summary>

![memory-test-start.png](/new-server-checklist/memory-test-start.png){.medium .framed}
</details>

> **Requirement:** The memory test restarts the server, so it waits until every drive check on the server has finished.
{.is-success}

> **Warning:** The test screen shows a green PASS after each round. The test is only done after the second round, and the server restarts on its own when it is done. Do not stop it after the first PASS.
{.is-warning}

When the server is back, HexOS reads the result. If it cannot, for example because the test was stopped early, the **Memory test report** asks **What did the server's screen show?**. Click **Errors were shown**, **No errors shown**, or **Didn't see the screen**.

<details>
<summary> What did the screen show </summary>

![memory-test-what-screen-showed.png](/new-server-checklist/memory-test-what-screen-showed.png){.medium .framed}
</details>

When the test passes, HexOS removes the memory lock. If the test finds errors, the lock stays: the **Memory** card shows **Memory test failed** and **Storage locked**. Click **Test memory** on the **Memory** info panel to run it again, or open a pool early as shown in [Use a pool before its check finishes](#use-a-pool-before-its-check-finishes).

<details>
<summary> The Memory card after a failed test </summary>

![memory-test-failed-locked.png](/new-server-checklist/memory-test-failed-locked.png){.medium .framed}
</details>

> **Info:** The memory lock and the drive check are separate. A pool that is still being checked stays locked until its check finishes, even after the memory test passes.
{.is-info}

> **Info:** A server that runs inside a virtual machine cannot test its physical memory, so it does not get this notice.
{.is-info}

## Skip the memory test

When you click **Do it later**, HexOS explains the risk. Tick the box to say you understand, then click **Skip for now**.

<details>
<summary> Skipping the memory test </summary>

![skip-memory-test-dialog.png](/new-server-checklist/skip-memory-test-dialog.png){.medium .framed}
</details>

HexOS removes the memory lock, and the **Memory** card on the dashboard says **Untested** and the date you skipped. A pool that is still being checked stays locked until its check finishes.

<details>
<summary> The Memory card after a skip </summary>

![memory-card-skipped.png](/new-server-checklist/memory-card-skipped.png){.medium .framed}
</details>

You can run the test any time. Click the **Memory** card, then **Test memory**. Choose **Standard** or **Deep**, and click **Start**. **Deep** is a quick pass, then three full ones, and takes the longest.

<details>
<summary> Choosing the memory test </summary>

![memory-test-choice.png](/new-server-checklist/memory-test-choice.png){.medium .framed}
</details>

## Use a pool before its check finishes

You can open a pool early. In any notice about a pool that is waiting, click **Enable now**, type the pool's name, and confirm. HexOS records your choice, and the pool works as usual from then on.

<details>
<summary> Enabling a pool early </summary>

![enable-pool-early.png](/new-server-checklist/enable-pool-early.png){.medium .framed}
</details>

> **Warning:** If a pool's deep check failed, a drive in that pool may be failing. Replace the drive it names and run the check again before you store important data there.
{.is-warning}

> **Help:** Questions about the checklist? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
