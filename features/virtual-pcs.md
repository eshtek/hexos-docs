---
title: Virtual PCs
description: Run Windows, Linux, and appliance operating systems on your HexOS server
published: false
date: 2026-08-20T22:00:00.000Z
tags: vm, virtual pc, windows, linux
editor: markdown
dateCreated: 2026-08-20T22:00:00.000Z
---

# Virtual PCs

A virtual PC is a complete computer running inside your HexOS server — its own operating system, storage, and memory, sharing your server's hardware. You can run Windows for something that needs it, a Linux desktop, or a small appliance operating system, without buying another machine.

HexOS sets most of this up for you. Choose a system from the catalog and HexOS creates the disk, installs the operating system, and tells you when it is ready.

## Setting up a virtual PC from the catalog

1. Go to **Virtual PCs**.
2. Browse **Most popular this month**, open **Browse categories** for Servers, Desktops, Appliances, and Other, or search.
3. Click the system you want.
4. Click **Install**.
5. Fill in the setup dialog, then click **Set up**.

The catalog page for each system lists what it needs before you start:

- **Requirements** — processors, memory, and storage
- **Locations** — which of your folders it will use
- **Permissions** — what it is allowed to access

### What the setup dialog asks for

Which sections appear depends on the system you chose.

- **Name** — what this virtual PC is called
- **Windows installer ISO** — Windows systems need an ISO you supply, either from your Install Media folder or downloaded from a web address
- **Account** — the username and password for signing in, and optionally an SSH key. Some appliance images come with their own built-in account instead
- **Devices** — optionally hand over a graphics card or USB devices such as a Zigbee or Z-Wave stick

> **Info:** Installer ISOs must be stored in your **Install Media** folder. If your ISO is somewhere else, copy it there first using the [file browser](/features/file-browser).
{.is-info}

## Building a custom virtual PC

If you want to install an operating system yourself, or tune the hardware, click **Custom Virtual PC**. The wizard has three steps.

**Step 1 — Settings.** How you plan to use it (everyday use or maximum performance), whether you will connect from another computer or from a monitor plugged into the server, whether it starts automatically with the server, and whether HexOS keeps daily snapshots. You also choose the operating system and its installation media.

**Step 2 — Hardware.** HexOS recommends a configuration based on your server and you can adjust it. Sliders cover processors and memory, disk size, graphics and sound, and PCI or USB devices. The captions tell you how much capacity is left afterward, and **Back to recommended** undoes your changes.

**Step 3 — Almost done.** Name it and review everything before it is created.

> **Info:** A custom virtual PC does not install the operating system for you. Once it starts, open its screen and complete the installer yourself, exactly as you would on a physical PC.
{.is-info}

## While it is being set up

Setting up a virtual PC takes a while — Windows in particular can take an hour or more. You can close the window and let it run; progress appears in the activities menu, showing steps like preparing the disk, installing the operating system, and waiting for it to come online.

> **Warning:** The screen and power controls stay locked during automated setup, so a stray click cannot interrupt it. They unlock when setup finishes.
{.is-warning}

Two things occasionally need your attention:

- **Windows installers** may wait at a "Press any key to boot from CD or DVD" prompt. Open the screen and press a key to continue.
- **Graphics cards** cannot always be handed over while the server is using them. If HexOS asks you to restart the server, do so and then start the virtual PC.

> **Danger:** Cancelling setup after the virtual PC exists removes it and anything created so far. Downloaded installer files are kept for next time.
{.is-danger}

## Using a virtual PC

Open a virtual PC from **Virtual PCs** > **Installed Virtual PCs** and click **Launch**. Depending on the system, this opens either its own web interface or its screen in a new browser tab.

Windows virtual PCs also show an IP address you can click to connect with a Remote Desktop app.

> **Info:** The screen and **Settings** only work when you are on the same network as your server, because the screen runs on the server itself.
{.is-info}

The detail page shows status, operating system, IP address, processors, memory, and storage. While it is running you also get live processor, memory, disk, and network usage.

## Starting, stopping, and removing

| Action | What it does |
|---|---|
| **Start** | Powers the virtual PC on |
| **Stop** | Asks the operating system to shut down normally |
| **Power Off** | Cuts power immediately, like holding the power button |
| **Settings** | Opens the TrueNAS interface, where hardware can be changed |
| **Uninstall** | Permanently deletes the virtual PC and its disks |

> **Info:** Processors, memory, disk size, and devices cannot be changed in HexOS after a virtual PC is created. Use **Settings** to adjust them in TrueNAS.
{.is-info}

> **Danger:** Uninstalling permanently deletes everything inside the virtual PC — files, programs, and settings — along with every snapshot of its disk, including the restore point from when it was first set up. You are asked to type its name to confirm.
{.is-danger}

## Storage and snapshots

Virtual PC disks are stored in your **Virtual Disks** location, and installer ISOs in **Install Media**. Both are set in **Settings** > **Locations**.

Disks are thin-provisioned: the size you choose is a limit, and the disk grows as it fills. Making a disk bigger later is much easier than making it smaller, so there is no need to over-allocate.

If you chose daily snapshots, HexOS keeps the last seven. A separate snapshot is taken when the system is first installed.

> **Info:** Storage locations cannot be changed while virtual PCs are using them. Uninstall them first.
{.is-info}

## What your server needs

- **Processors** — HexOS always keeps two processor cores for itself, so the rest are available to virtual PCs
- **Memory** — HexOS reserves memory for itself and shows what is left as you choose
- **Graphics cards** — handing a card to a virtual PC means the server can no longer use it, and it may require one restart to take effect. HexOS will not hand over your server's only graphics card
- **USB devices** — up to four per virtual PC. For more, pass through a whole USB controller instead

Some systems in the catalog also need particular processor features or a minimum TrueNAS version. HexOS hides anything your server cannot run.
