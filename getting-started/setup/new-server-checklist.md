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
2. **A memory test.** On a physical server, HexOS recommends testing the memory before you go far.

## While a check runs

While a pool is being checked, you cannot put new data on it yet. Creating a shared folder, installing an app, or creating a virtual machine disk on that pool waits. A note beside the button explains why, and shows the time left when HexOS knows it. Everything else works as usual.

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

The first time you open the dashboard after setup, a notice in the activity center asks **New server? Test its memory**. The test restarts the server and takes about 2 hours.

<details>
<summary> The memory test notice </summary>

![memory-test-notice.png](/new-server-checklist/memory-test-notice.png){.medium .framed}
</details>

- Click **Start the test** to open the **Memory** page with the test ready to run.
- Click **Do it later** to skip it for now.

On the **Memory** page, click **Start**. A new server runs the **Standard** test: a quick pass, then a full one. It finds nearly all memory faults. The dialog shows how long your server will be offline, based on how much memory it has.

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

> **Info:** A server that runs inside a virtual machine cannot test its physical memory, so it does not get this notice.
{.is-info}

## Skip the memory test

When you click **Do it later**, HexOS explains the risk. Tick the box to say you understand, then click **Skip for now**.

<details>
<summary> Skipping the memory test </summary>

![skip-memory-test-dialog.png](/new-server-checklist/skip-memory-test-dialog.png){.medium .framed}
</details>

Your pools open, and the **Memory** card on the dashboard says **Untested** and the date you skipped.

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
