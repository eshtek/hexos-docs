---
title: Complete server setup
description: Log in, find your server, check its hardware, choose how to use your drives and finish setup
published: true
date: 2026-10-09T00:00:00.000Z
tags: setup, storage, pools, getting started
editor: markdown
dateCreated: 2026-06-08T15:41:10.493Z
---


# Complete server setup

Now that HexOS is installed, it is time to set up your server. Setup takes a few short steps: you find your server, give it a name, check its hardware, and choose how to use your drives. Nothing on your drives changes until the last screen, after you tick a box and click **Finish setup**.

## Before you start

You need:

- Your **HexOS email and password**.
- The **admin password** you chose when you installed HexOS.
- Your **server connected to your router** with a network cable.
- A **computer on the same network** as your server.

## Log in to HexOS

Go to [deck.hexos.com](https://deck.hexos.com). Enter your email and password, and click **Sign In**. If you do not have an account yet, [sign up on the HexOS hub](https://hub.hexos.com/).

<details>
<summary> The sign in page </summary>

![log-in.png](/complete-setup/log-in.png){.medium .framed}
</details>

> **Info:** This is the email and password you used when you bought HexOS. It is not the admin password you chose when you installed HexOS.
{.is-info}

## What every screen looks like

- The top of the screen shows **Server setup** and a bar that fills as you go. **Exit** takes you back to the dashboard.
- On a wide screen, the title, explanation and **Continue** button are on the left, with cards on the right. On a narrower screen, they stack in one column.
- A card with an arrow opens an info panel with more details.

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

### If your server does not show up

Click **Having problems?**. It lists the things to check first. If your network is set up in a custom way, click **entering the server IP manually** and type your network's public IP address.

<details>
<summary> Having problems </summary>

![having-problems.png](/complete-setup/having-problems.png){.medium .framed}
</details>

If HexOS cannot look for servers at all, the card says **We could not look for servers. Check this device's internet connection.** Check the internet connection of the computer you are using, then click **Try again**. While this message shows, the buttons on the server rows, such as **Claim**, cannot be clicked.

<details>
<summary> The search failed </summary>

![find-server-error.png](/complete-setup/find-server-error.png){.medium .framed}
</details>

If nothing is found for about 15 seconds, the card says **No server found yet. We will keep looking.** HexOS keeps looking. If it knows something about a server you removed from your account, a line tells you what to do, for example **A server you removed was last seen on another network. Join that network and turn off any VPN.** Click **Try again** to look again right away.

<details>
<summary> No server found yet </summary>

![find-server-empty.png](/complete-setup/find-server-empty.png){.medium .framed}
</details>

### Already set up

If a server finishes its setup somewhere else while you are on this screen, for example in another browser tab, it is listed as **Already set up**. Click **Open dashboard** to go to it.

<details>
<summary> Already set up </summary>

![find-server-already-set-up.png](/complete-setup/find-server-already-set-up.png){.medium .framed}
</details>

## Server basics

Enter a name for your server, pick your time zone, and type the admin password you chose when you installed HexOS.

<details>
<summary> Server basics </summary>

![server-basics.png](/complete-setup/server-basics.png){.medium .framed}
</details>

If the password is refused, click **Change keyboard layout**, choose the keyboard you typed the password on when you installed HexOS, and click **Confirm**.

<details>
<summary> Change keyboard layout </summary>

![change-keyboard-layout.png](/complete-setup/change-keyboard-layout.png){.medium .framed}
</details>

## Health and capabilities

HexOS checks your hardware and shows four cards: **System**, **Storage**, **Applications** and **Virtualization**. Each card has one status line. Click a card to see the details.

<details>
<summary> Health and capabilities </summary>

![health-and-capabilities.png](/complete-setup/health-and-capabilities.png){.medium .framed}
</details>

- The **Storage** panel lists every drive. A drive that already holds data says so. Reading this changes nothing.
- The **Virtualization** info panel shows what your server needs to run virtual machines: 4 processor cores, 8 GB of memory, and **Virtualization features enabled in BIOS**.

<details>
<summary> The storage panel </summary>

![storage-panel.png](/complete-setup/storage-panel.png){.medium .framed}
</details>

<details>
<summary> The virtualization panel </summary>

![virtualization-panel.png](/complete-setup/virtualization-panel.png){.medium .framed}
</details>

### When a card needs a look

The **System** and **Storage** cards say **No issues detected** when nothing is wrong. Otherwise they say **Attention required** or **Issues detected**, and the card's panel always says why. Click the card to read the reason.

Problems with your pools and drives are listed first in the **Storage** panel, for example **A pool has no scheduled health check.** or **One or more of your storage pools is being reported as unhealthy.** They are never listed on **System**.

<details>
<summary> A pool problem in the storage panel </summary>

![health-storage-reason.png](/complete-setup/health-storage-reason.png){.medium .framed}
</details>

Problems with the whole server are listed first in the **System** panel, for example a TrueNAS version that is too old, temperatures out of range, or **Your server's memory changed. We recommend running a memory test to verify it before storing important data.**

<details>
<summary> A server problem in the system panel </summary>

![health-system-reason.png](/complete-setup/health-system-reason.png){.medium .framed}
</details>

When Hardware Advisor is available for your server and the server shares hardware data with HexOS, the panels also show Hardware Advisor warnings about parts with known problems. When a part is marked but its details did not arrive, the part says **Hardware Advisor details are unavailable.** and its card says **Details unavailable** instead of **No issues detected**. Nothing is wrong that HexOS can show you. See [Health & Capabilities](/features/health-and-capabilities) for hardware data sharing.

<details>
<summary> Details unavailable </summary>

![health-details-unavailable.png](/complete-setup/health-details-unavailable.png){.medium .framed}
</details>

If a drive or part is missing from the list, click **Something missing?**. It lists what to check.

<details>
<summary> Something missing </summary>

![something-missing.png](/complete-setup/something-missing.png){.medium .framed}
</details>

## Import existing pools

You only see this screen when your drives already hold storage pools. It lists two kinds of pools:

- **Pools from another server**, for example drives you moved from an older server. Their cards say **Previously used on** and the other server's name.
- **Pools already on this server**, for example after you reset HexOS, or on a server that ran TrueNAS before. Their cards say **Already on this server**.

### Pools from another server

Every pool that can be imported starts switched on. Click a pool to see its drives, or to switch it off. A pool you import keeps everything on it: folders, users, apps and virtual machines.

<details>
<summary> Import existing pools </summary>

![import-existing-pools.png](/complete-setup/import-existing-pools.png){.medium .framed}
</details>

<details>
<summary> A pool and its import switch </summary>

![import-pool-panel.png](/complete-setup/import-pool-panel.png){.medium .framed}
</details>

### Pools already on this server

A pool already on this server starts as **Will be kept with its contents.** Click its card to see what is on it: its drives, its folders and Time Machine backups, and its apps when your apps run from it. Under **On this server, not in this pool**, the panel lists the server's users and virtual machines. To let the pool go, click the **Keep this pool** switch so it is off. Its drives are then offered for new pools.

<details>
<summary> Pools already on this server </summary>

![import-pools-on-this-server.png](/complete-setup/import-pools-on-this-server.png){.medium .framed}
</details>

A pool you let go is erased at **Finish setup** only if a new pool uses one of its drives. Then the whole pool is erased, even if the new pool uses only one of its drives. If no new pool uses its drives, it stays as it is. See [How starting fresh works](/getting-started/setup/start-fresh).

### Import or skip

Click **Import** to keep the pools that are switched on. Click **Skip** to keep none of them, including the pools already on this server. Skipping every pool is how you start fresh. Both buttons wait until the pools already on this server are listed.

> **Danger:** A pool you switch off or skip is not kept. Its drives are offered for new pools. If you put them in a new pool and finish setup, they are erased. For a pool already on this server, the whole pool is erased.
{.is-danger}

When a pool is left out, HexOS asks you to confirm in the **Skip import** dialog. Tick the box and click **Confirm**. Nothing is erased until you click **Finish setup**.

<details>
<summary> Skip import </summary>

![skip-import-dialog.png](/complete-setup/skip-import-dialog.png){.medium .framed}
</details>

### While pools are imported

When you open this screen, setup first asks your server whether an import is already running, for example one you started before you reloaded the page. **Import** and **Skip** wait for that answer.

After you click **Import**, each card shows how far its import is. Setup waits for the server to say each import is over, however long that takes. When every pool you kept is in, setup moves to the next screen by itself.

<details>
<summary> A pool being imported </summary>

![import-in-progress.png](/complete-setup/import-in-progress.png){.medium .framed}
</details>

If an import does not work, the card says why:

- **This pool was not imported.** The import is over and the pool is not on the server. Click **Retry import** to try again, or **Skip** to leave the pool out.
- **The import failed.** The server reported that the import failed. Click **Retry import** or **Skip**.

<details>
<summary> This pool was not imported </summary>

![import-not-imported.png](/complete-setup/import-not-imported.png){.medium .framed}
</details>

<details>
<summary> The import failed </summary>

![import-failed.png](/complete-setup/import-failed.png){.medium .framed}
</details>

If setup cannot tell yet how an import went, for example because the connection dropped or the server restarted, the card says **We cannot confirm this import yet.** and the screen says **We cannot confirm the import yet. Check again before you retry or skip.** Click **Check again**. **Import** and **Skip** wait until setup can tell, so you never act on a guess.

<details>
<summary> We cannot confirm this import yet </summary>

![import-check-again.png](/complete-setup/import-check-again.png){.medium .framed}
</details>

## New storage pools

Choose how to use the drives that are free:

- **Recommended:** HexOS plans the pools for you, asking what matters most when more than one drive is free.
- **Custom:** choose the drives and the layout yourself.
- **Only use imported pools:** create nothing new. You only see this when you kept a pool.

<details>
<summary> New storage pools </summary>

![new-storage-pools.png](/complete-setup/new-storage-pools.png){.medium .framed}
</details>

### If the pools cannot be read

If HexOS cannot read the pools on your server, the screen says **We could not read the pools on this server.** Click **Try again**. **Continue** waits until the pools are read, because setup must know which pools you keep. The same message can show on **Import existing pools**, **Recommended layout**, **Build your storage** and **Almost done!**.

<details>
<summary> We could not read the pools on this server </summary>

![pools-read-failed.png](/complete-setup/pools-read-failed.png){.medium .framed}
</details>

## Recommended setup

### Choose what matters most

The **What matters most?** screen changes with the number of drives free for new pools.

With **one free drive**, HexOS skips this question and goes straight to **Recommended layout**. One drive cannot protect its data if it fails.

<details>
<summary> Recommended layout with one free drive </summary>

![recommended-one-drive.png](/complete-setup/recommended-one-drive.png){.medium .framed}
</details>

With **two free drives**, choose **Most space** or **Most protection**. **Most protection** is selected until you choose. For two drives of the same kind and similar size:

- **Most space** combines them in a stripe. If either drive fails, all data on the pool is lost.
- **Most protection** uses a mirror: each drive holds a full copy, so one can fail without losing the pool's data.

<details>
<summary> What matters most with two free drives </summary>

![what-matters-most-two-drives.png](/complete-setup/what-matters-most-two-drives.png){.medium .framed}
</details>

> **Info:** Hard drives and SSDs stay in separate pools, and HexOS groups drives of similar sizes. If your two drives cannot share a pool, either choice can leave you with separate, unprotected pools. Check the recommended layout before you finish.
{.is-info}

With **three or more free drives**, choose one:

- **Most space** prioritizes usable space.
- **Balanced** adds more protection to bigger groups of drives.
- **Most protection** prioritizes surviving more drive failures and uses more space for protection.

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

If you kept pools, click the card below the new pools that counts them, for example **2 imported pools**. For each pool you kept, the panel shows how much space is used, how many drives can fail, and a line when the pool is not healthy. Under **Also on this server**, it lists what is already there and stays: the server's users, its apps when the pool they run from is kept, its virtual machines whose disks are on kept pools, and the folders (shared or not) and Time Machine backups on the pools you kept. Click a group to see what is in it. Anything HexOS could not read says so.

<details>
<summary> The pools you kept </summary>

![kept-pools-panel.png](/complete-setup/kept-pools-panel.png){.medium .framed}
</details>

> **Info:** A pool counts every drive as the size of its smallest drive, so HexOS only puts drives of similar sizes together. Hard drives and SSDs never share a pool. A drive that does not fit a pool is listed as not assigned, with the reason.
{.is-info}

## Custom setup

The **Build your storage** screen starts with **No storage pools**. Click **Add pool**.

<details>
<summary> Build your storage </summary>

![build-your-storage.png](/complete-setup/build-your-storage.png){.medium .framed}
</details>

In the **Add pool** dialog:

1. Tick the drives for the pool.
2. Choose a **Layout**. The list only shows what your number of drives allows.
3. Check the usable space and how many drives can fail.
4. Click **Continue**, review the pool, and click **Save**. There is no erase consent box in this dialog: the pool is added to your plan, and nothing is built yet. If you click **Continue** right after a change, it waits for the new figures, then moves on by itself.

Once every drive is in a pool, **Add pool** cannot be clicked.

<details>
<summary> Add pool </summary>

![add-pool-dialog.png](/complete-setup/add-pool-dialog.png){.medium .framed}
</details>

<details>
<summary> Confirm the pool </summary>

![create-pool-confirm.png](/complete-setup/create-pool-confirm.png){.medium .framed}
</details>

Hard drives and SSDs (including NVMe drives) are different kinds of drive. Once you tick drives of one kind, each drive of the other kind says **Different kind of drive. Mixing slows the whole pool.** You can still tick it.

<details>
<summary> A different kind of drive </summary>

![add-pool-different-kind.png](/complete-setup/add-pool-different-kind.png){.medium .framed}
</details>

> **Warning:** If you choose a layout that does not protect your data well, HexOS shows a warning that explains the risk. The choice is still yours.
{.is-warning}

<details>
<summary> A layout warning </summary>

![layout-warning.png](/complete-setup/layout-warning.png){.medium .framed}
</details>

## Finish setup

The **Almost done!** screen is your last look. It lists the server's name, the time zone your server is using, the new pools and the pools you kept.

<details>
<summary> Almost done </summary>

![almost-done.png](/complete-setup/almost-done.png){.medium .framed}
</details>

If a new pool uses drives from a pool already on this server, **Almost done!** marks that pool, for example **The Storage pool on this server now - everything on it will be erased**. The box to tick then says so too. **How starting fresh works** opens [How starting fresh works](/getting-started/setup/start-fresh).

<details>
<summary> Almost done with pools to be erased </summary>

![almost-done-erase.png](/complete-setup/almost-done-erase.png){.medium .framed}
</details>

Under each pool you kept, one line shows its used space and how many drives can fail. A pool that needs a look has another line, for example **This pool is not healthy (DEGRADED).** One line also says what is already on the server, for example **Already on this server: 2 users, 2 folders, 1 Time Machine backup, 2 apps.** Only what stays is counted: folders, backups, apps and virtual machines on a pool that will be erased are not. Users stay with the server either way.

When you keep anything, a pool or anything already on the server, a second box asks you to confirm it: **I understand what I'm keeping.** It is separate from the erase box, and you tick both. If what you keep changes before you finish, the box is cleared and asked again. It also shows when something on the server could not be read. When nothing is kept and everything was read, there is no second box.

<details>
<summary> Almost done with pools you keep </summary>

![almost-done-keep.png](/complete-setup/almost-done-keep.png){.medium .framed}
</details>

> **Danger:** When you click **Finish setup**, the drives in the new pools are erased, and so are the pools marked to be erased. Make sure nothing on them is still needed.
{.is-danger}

Tick the box, or both boxes, and click **Finish setup**. **Finish setup** waits until the pools on the server have been read. Each step gets a check mark as it finishes. When all steps are done, click **Go to the dashboard**.

<details>
<summary> Working on it </summary>

![working-on-it.png](/complete-setup/working-on-it.png){.medium .framed}
</details>

<details>
<summary> Your server is ready </summary>

![your-server-is-ready.png](/complete-setup/your-server-is-ready.png){.medium .framed}
</details>

> **Info:** If a drive for a new pool is unplugged or swapped after you saw the summary, setup stops before it changes anything and asks you to check the plan again.
{.is-info}

## After setup

Your new server runs a checklist of health checks before it is ready for apps. See [New server checklist](/getting-started/setup/new-server-checklist).

If your apps run on a single drive, HexOS can keep a nightly copy of them on a protected pool. See [App backups](/features/storage/app-backups).

> **Help:** Something not working during setup? See [Troubleshooting](/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

## Show the welcome banner again

After setup, the welcome offers shortcuts to storage, users, folders and apps. If you dismissed it, you can show it again for the server you have open.

Click **Settings**, then the **First-time setup** tile.

<details>
<summary> First-time setup in Settings </summary>

![first-time-setup-tile.png](/complete-setup/first-time-setup-tile.png){.medium .framed}
</details>

The dialog asks **Would you like to re-enable the welcome banner?** Click **Re-enable**.

<details>
<summary> Re-enable the welcome banner </summary>

![first-time-setup-confirm.png](/complete-setup/first-time-setup-confirm.png){.medium .framed}
</details>

The welcome opens again. This restores the welcome banner; it does not reset your server or restart server setup.

<details>
<summary> The welcome reopened </summary>

![welcome-reopened.png](/complete-setup/welcome-reopened.png){.medium .framed}
</details>
