---
title: Complete server setup
description: Log in, find your server, check its hardware, choose how to use your drives and finish setup
published: true
date: 2026-10-02T00:00:00.000Z
tags: setup, storage, pools, getting started
editor: markdown
dateCreated: 2026-06-08T15:41:10.493Z
---


# Complete server setup

Now that HexOS is installed, it is time to set up your server. Setup takes a few short steps: you find your server, give it a name, check its hardware, and choose how to use your drives. Nothing on your drives changes until the last screen, after you tick a box and click **Finish setup**.

## Before you start

You need:

- Your **HexOS username and password**.
- The **admin password** you chose when you installed HexOS.
- Your **server connected to your router** with a network cable.
- A **computer on the same network** as your server.

## Log in to HexOS

Go to [deck.hexos.com](https://deck.hexos.com) and log in. If you do not have an account yet, [sign up on the HexOS hub](https://hub.hexos.com/).

> **Info:** This is the username and password you created when you bought HexOS. It is not the admin password you chose when you installed HexOS.
{.is-info}

## What every screen looks like

- The top of the screen shows **Server setup** and a bar that fills as you go. **Exit** takes you back to the dashboard.
- The left side has the title, a short explanation and the **Continue** button.
- The right side has cards. A card with an arrow opens a panel with more details.

## Find your server

On the first screen, click **Find my server**. HexOS looks for servers on your network. If you still need to install HexOS, click **Create a USB installer** instead.

<details>
<summary> The first setup screen </summary>

![setup-welcome-screen.png](/complete-setup/setup-welcome-screen.png){.medium .framed}
</details>

Each server that HexOS finds is one row:

- A new server has a **Claim** button. Click it to add the server to your account.
- A server you started to set up before shows **Continue setup**.

<details>
<summary> A server found on the network </summary>

![server-found-claim-button.png](/complete-setup/server-found-claim-button.png){.medium .framed}
</details>

> **Tip:** If your server does not show up, click **Having problems?**. It lists things to check, and lets you enter your network's public IP address yourself.
{.is-tip}

## Server basics

Enter a name for your server, pick your time zone, and type the admin password you chose when you installed HexOS. If the password is refused, click **Change keyboard layout** and choose the keyboard you typed it on.

<details>
<summary> Server basics </summary>

![server-basics.png](/complete-setup/server-basics.png){.medium .framed}
</details>

## Health and capabilities

HexOS checks your hardware and shows four cards: **System**, **Storage**, **Applications** and **Virtualization**. Each card has one status line. Click a card to see the details.

<details>
<summary> Health and capabilities </summary>

![health-and-capabilities.png](/complete-setup/health-and-capabilities.png){.medium .framed}
</details>

- The **Storage** panel lists every drive. A drive that already holds data says so. Reading this changes nothing.
- The **Virtualization** panel shows what your server needs to run virtual machines: 4 processor cores, 8 GB of memory, and hardware virtualization turned on.

<details>
<summary> The storage panel </summary>

![storage-panel.png](/complete-setup/storage-panel.png){.medium .framed}
</details>

> **Tip:** If a drive or part is missing from the list, click **Something missing?** for what to check.
{.is-tip}

## Import existing pools

You only see this screen when your drives already hold storage pools, for example drives moved from another server.

Every pool that can be imported starts switched on. Click a pool to see its drives, or to switch it off. A pool you import keeps everything on it: folders, users, apps and virtual machines.

<details>
<summary> Import existing pools </summary>

![import-existing-pools.png](/complete-setup/import-existing-pools.png){.medium .framed}
</details>

> **Danger:** A pool you switch off is not kept. Its drives are offered for new pools, and they are erased if you put them in a new pool and finish setup. HexOS asks you to confirm before it goes on.
{.is-danger}

<details>
<summary> A pool and its import switch </summary>

![import-pool-panel.png](/complete-setup/import-pool-panel.png){.medium .framed}
</details>

## New storage pools

Choose how to use the drives that are free:

- **Recommended:** answer one question and HexOS plans the pools for you.
- **Custom:** choose the drives and the layout yourself.
- **Only use imported pools:** create nothing new. You only see this when you kept a pool.

<details>
<summary> New storage pools </summary>

![new-storage-pools.png](/complete-setup/new-storage-pools.png){.medium .framed}
</details>

## Recommended setup

### Choose what matters most

On the **What matter most?** screen, choose one:

- **Most space** gives you the most usable space, with good protection.
- **Balanced** adds more protection to bigger groups of drives.
- **Most protection** lets more drives fail without losing data, and uses more space.

<details>
<summary> What matters most </summary>

![what-matter-most.png](/complete-setup/what-matter-most.png){.medium .framed}
</details>

### Check the recommended layout

Each card is one pool. It shows the pool's name, its number of drives, its usable space, and how many drives can fail without losing data. Below the pools, you see the pools you kept and any drives that were not used.

<details>
<summary> Recommended layout </summary>

![recommended-layout.png](/complete-setup/recommended-layout.png){.medium .framed}
</details>

Click a pool to see why HexOS chose this layout and which drives are in it. From there you can:

- Click **Edit** to change the pool's drives or layout.
- Click **Rename** to give the pool another name.
- Click **Remove** to take the pool out of the plan.

<details>
<summary> A pool in the recommended layout </summary>

![recommended-pool-panel.png](/complete-setup/recommended-pool-panel.png){.medium .framed}
</details>

> **Info:** A pool counts every drive as the size of its smallest drive, so HexOS only puts drives of similar sizes together. Hard drives and SSDs never share a pool. A drive that does not fit a pool is listed as not assigned, with the reason.
{.is-info}

## Custom setup

On the **Build your storage** screen, click **Add pool**:

1. Tick the drives for the pool.
2. Choose a **Layout**. The list only shows what your number of drives allows.
3. Check the usable space and how many drives can fail.
4. Click **Continue**, tick the box, and click **Create pool**. The pool is added to your plan. Nothing is built yet.

<details>
<summary> Add pool </summary>

![add-pool-dialog.png](/complete-setup/add-pool-dialog.png){.medium .framed}
</details>

> **Warning:** If you choose a layout that does not protect your data well, HexOS shows a warning that explains the risk. The choice is still yours.
{.is-warning}

## Finish setup

The **Almost done!** screen is your last look. It lists the server's name, the new pools and the pools you kept.

<details>
<summary> Almost done </summary>

![almost-done.png](/complete-setup/almost-done.png){.medium .framed}
</details>

> **Danger:** When you click **Finish setup**, the drives in the new pools are erased. Make sure nothing on them is still needed.
{.is-danger}

Tick the box and click **Finish setup**. Each step gets a check mark as it finishes. When all steps are done, click **Go to the dashboard**.

<details>
<summary> Working on it </summary>

![working-on-it.png](/complete-setup/working-on-it.png){.medium .framed}
</details>

<details>
<summary> Your server is ready </summary>

![your-server-is-ready.png](/complete-setup/your-server-is-ready.png){.medium .framed}
</details>

> **Info:** If a drive is unplugged or swapped after you saw the summary, setup stops before it changes anything and asks you to check the plan again.
{.is-info}

## After setup

Your new server runs a checklist of health checks before it is ready for apps. See [New server checklist](/getting-started/setup/new-server-checklist).

If your apps run on a single drive, HexOS can keep a nightly copy of them on a protected pool. See [App backups](/features/storage/app-backups).

> **Help:** Something not working during setup? See [Troubleshooting](/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
