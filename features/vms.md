---
title: VMs
description: Run Windows, Linux, and appliance operating systems on your HexOS server
published: true
date: 2026-09-21T21:27:13.000Z
tags: vm, vms, virtual machine, windows, linux
editor: markdown
dateCreated: 2026-08-21T11:37:43.366Z
---

# VMs

A VM (virtual machine) is a complete computer running inside your HexOS server, with its own operating system, storage, and memory, sharing your server's hardware. You can run Windows for something that needs it, a Linux desktop, or a small appliance operating system, without buying another machine.

HexOS sets most of this up for you. Choose a system from the catalog and HexOS creates the disk, installs the operating system, installs the apps you picked, and tells you when it is ready.

> **Info:** VMs are in beta, which is why you will see a **Beta** badge on these screens. Click the badge to read what that means and where to share feedback.
{.is-info}

## The VMs screen

Go to **VMs** in the menu. From here you can:

- search with **Find VMs**
- open **Installed VMs** to see the VMs you already have
- open **Browse categories** to look through **Servers**, **Desktops**, and **Appliances**
- start a **Custom VM** to install an operating system yourself
- pick from **Most popular this month**

<details>
  <summary>The VMs screen</summary>

![vms-catalog](/vms-catalog.png){.medium .framed}

</details>

<details>
  <summary>Browse categories</summary>

![vms-browse-categories](/vms-browse-categories.png){.medium .framed}

</details>

Searching replaces the page with matching systems. Systems your server cannot run, because of its TrueNAS version or its processor, are left out of the catalog.

If your server does not have enough processor cores, memory, or unused pool storage for any VM, this screen says **VMs are unavailable** and shows which of the three is short.

## Setting up a VM from the catalog

1. Go to **VMs**.
2. Click the system you want. Its page shows a description, screenshots, and three tabs:
   - **Requirements**: the processor cores, memory, and storage it needs
   - **Locations**: which of your storage locations it uses, **Virtual Disks** and sometimes **Install Media**
   - **Permissions**: what it is allowed to access
3. Click **Install**.
4. Work through the setup dialog, clicking **Continue** after each step.
5. On the **Review** step, click **Create VM**.

<details>
  <summary>A system's page in the catalog</summary>

![vms-catalog-item](/vms-catalog-item.png){.medium .framed}

</details>

> **Info:** **Custom install** on the same page runs the same automated setup, with one extra question first about how you will access the VM. **Website** opens the system's own site.
{.is-info}

### The setup steps

Which steps appear depends on the system you chose.

**VM details.** Give the VM a name. The name can only contain letters, numbers, and underscores. Under **Install media**, most systems say **We'll download the official image** and need nothing from you. Windows needs an installer ISO that you supply: choose **Select an ISO file** to pick one from your Install Media folder, or **Provide a download link from Microsoft** and paste the link. **Open the official ISO download page** takes you to the right place to get one.

<details>
  <summary>VM details</summary>

![vms-setup-vm-details](/vms-setup-vm-details.png){.medium .framed}

</details>

**Account.** The **Username** and **Password** you will sign in to the VM with for the first time. Linux systems can take an **SSH public key** as well as, or on servers instead of, a password. Passwords need at least 8 characters. You can add more users later from inside the VM. A few systems ship with a built-in account, so they ask for a password but no username, and simple appliances skip this step altogether.

<details>
  <summary>Account</summary>

![vms-setup-account](/vms-setup-account.png){.medium .framed}

</details>

**Apps.** Windows and Linux desktop systems let you choose software to have installed for you, such as a browser, chat apps, media tools, or Steam. Use **Find apps** to search. HexOS installs your choices once the VM is running, so they are ready when you first sign in, and shows roughly how much disk they need.

<details>
  <summary>Apps</summary>

![vms-setup-apps](/vms-setup-apps.png){.medium .framed}

</details>

**Storage.** The size of the **OS install disk** and which storage pool it lives on. Click **Change** to adjust it. You can make a disk larger later, but never smaller. **Add disk** gives the VM additional disks, up to 8 in all, and each one can be placed on a different pool.

<details>
  <summary>Storage</summary>

![vms-setup-storage](/vms-setup-storage.png){.medium .framed}

</details>

**Resources.** Sliders for **Processor cores** and **Memory**. The shaded parts of each slider show what is **Reserved for HexOS** and what is **In use by other VMs and apps right now**. Each system has a minimum, and for processor cores HexOS points out the sweet spot beyond which more cores will not make the VM faster. **Set recommended** puts both sliders back.

<details>
  <summary>Resources</summary>

![vms-setup-resources](/vms-setup-resources.png){.medium .framed}

</details>

**Snapshots.** A snapshot saves a copy of the VM so it can be restored if something breaks. Snapshots only store what has changed since the last one, so they use little extra storage. Choose **Manual**, or **Automatic** to have a snapshot taken every day and kept for a week. This choice is made here and cannot be changed from HexOS afterwards. See [Storage and snapshots](#storage-and-snapshots).

<details>
  <summary>Snapshots</summary>

![vms-setup-snapshots](/vms-setup-snapshots.png){.medium .framed}

</details>

**Review.** Check everything, then click **Create VM**.

<details>
  <summary>Review</summary>

![vms-setup-review](/vms-setup-review.png){.medium .framed}

</details>

> **Info:** Installer ISOs must be stored in your **Install Media** folder. If your ISO is somewhere else, copy it there first using the [file browser](/features/file-browser).
{.is-info}

## Building a custom VM

If you want to install an operating system yourself, click **Custom VM** on the **VMs** screen, or **Add VM** > **Create custom VM** on the **Installed VMs** screen.

1. **How will you access this VM?** Choose **Remotely** to use the VM through a virtual display in your browser or a remote desktop app. **Locally (Passthrough)**, for a monitor, keyboard, and mouse plugged into the server, will be available in a future update.
2. **VM details.** Name the VM and choose an **Icon**. The icon also tells HexOS what kind of operating system this is. Under **Install media**, choose **Select an ISO file**, where **Browse files…** lets you upload one, or **Provide a download link**. **Additional ISOs** are for drivers or tools the installer may need, such as the Windows VirtIO drivers. You can add up to 4, and each one is attached as an extra disc.
3. Continue through **Storage**, **Resources**, **Snapshots**, and **Review** as described above, then click **Create VM**.

<details>
  <summary>Choosing how you will access the VM</summary>

![vms-custom-vm-access](/vms-custom-vm-access.png){.medium .framed}

</details>

<details>
  <summary>VM details for a custom VM</summary>

![vms-custom-vm-details](/vms-custom-vm-details.png){.medium .framed}

</details>

> **Info:** A custom VM does not install the operating system for you. Once it starts, open its console and complete the installer yourself, exactly as you would on a physical PC. The VM boots the installer while its disk is blank, and boots the disk once something is installed on it.
{.is-info}

## While it is being set up

Setting up a VM takes a while, and Windows in particular can take an hour or more. You can close the window and let it run. Progress appears in the activity center and on the VM's own panel, step by step: **Allocating disk**, **Downloading image**, **Verifying image**, **Installing the operating system**, **Waiting for this VM to come online**, **Installing Windows updates**, and **Installing apps**. The panel also shows a live preview of the VM's screen. HexOS tells you when setup succeeds or fails.

> **Warning:** While automated setup is in progress, the console and power controls are locked so a stray click cannot interrupt it, and the button reads **Setting up**. They unlock when setup completes, and for Windows they unlock once it reaches **Installing Windows updates**.
{.is-warning}

Windows setup starts by itself. In the rare case that it cannot, HexOS shows **Action needed** and asks you to open the VM's screen and press a key at the "Press any key to boot from CD or DVD" prompt.

> **Danger:** **Cancel setup**, on the system's page in the catalog, stops the automated install and removes anything it partially created. Downloaded installer files are kept to speed up a future attempt.
{.is-danger}

## Using a VM

Go to **VMs** > **Installed VMs** and click a VM to open its details. VMs you chose to show also appear on the dashboard. The top of the panel shows a **Preview** of its screen, its **Status**, **Operating System**, **Storage**, and **IP Address**. A VM reads **Starting** until its operating system has come up.

Windows VMs also show **Address inside this VM**. Your server's usual address does not work from inside its own VMs, so use this one when the VM needs to reach the server's shared folders.

<details>
  <summary>Installed VMs</summary>

![vms-installed](/vms-installed.png){.medium .framed}

</details>

<details>
  <summary>A VM's details</summary>

![vms-vm-details-live-metrics](/vms-vm-details-live-metrics.png){.medium .framed}

</details>

### Connecting

Click **Connect** to open the VM. When there is more than one way to open it, the arrow beside **Connect** lists them, and the check mark on each row makes it the default:

- **Console** opens the VM's screen in a new browser tab. It works while the VM is starting, while you install an operating system, and when the VM has no network.
- **Remote Desktop**, for running Windows VMs, downloads a file that opens the VM in a Remote Desktop app. This is smoother for everyday use. The file never contains your password. **Get the Windows App** links to Microsoft's app for your device.
- **Web UI**, for appliances that have their own web interface, such as Home Assistant OS. For these VMs, **Console** is only offered with Expert Mode on.

Clicking the **IP Address** of a Windows VM also downloads a Remote Desktop file.

<details>
  <summary>Ways to connect</summary>

![vms-connect-menu](/vms-connect-menu.png){.medium .framed}

</details>

> **Info:** The console and **Web UI** run on your server, so opening them needs a connection from your own network.
{.is-info}

### The console

The console has a bar across the top with **Paste Text**, which types a block of text such as a password into the VM, **Ctrl+Alt+Del**, **Fullscreen**, and a power button with **Shut Down**, **Restart**, and **Force Power Off**, each of which asks you to confirm. This is the only place to restart a VM in one step. Sound from the VM plays through the console.

Only one browser can use a VM's console at a time. If you open it somewhere else, the first one shows **Another Active Session Detected** and a **Use Here** button to take it back.

You can also use the console from a phone or tablet, with touch gestures, your device's keyboard, and a row of extra keys. See [Using a VM's console from a phone or tablet](/features/vms/console-on-a-phone).

### Live metrics

The **Live metrics** tab shows **CPU**, **RAM**, **Network**, and **Disk I/O** while the VM is running.

## Changing a VM

### Processor cores and memory

1. Open the VM's details and click the **Resources** tab.
2. Click **Change resources**.
3. Move the sliders and click **Save changes**.

You can save while the VM is running. Changes take effect the next time it starts.

<details>
  <summary>The Resources tab</summary>

![vms-vm-details-resources](/vms-vm-details-resources.png){.medium .framed}

</details>

<details>
  <summary>Change resources</summary>

![vms-change-resources](/vms-change-resources.png){.medium .framed}

</details>

### Disks

The **Disks** tab lists the VM's disks and how full they are. Click **Update disk usage** to refresh the figures.

- **Add disk** creates another virtual disk on the pool you choose. It appears inside the VM after its next restart, unformatted, so format it from the VM's operating system before using it.
- **Resize**, in a disk's menu, makes it larger, up to the free space on its pool. A disk can never be made smaller, because that would destroy data inside the VM. The extra space appears inside the VM as unallocated, and the VM's operating system has to extend its own partition to use it.

**Update disk usage** and **Detect from VM** need the VM to be running with its guest agent, which the systems in the catalog install for you.

<details>
  <summary>The Disks tab</summary>

![vms-vm-details-disks](/vms-vm-details-disks.png){.medium .framed}

</details>

<details>
  <summary>Add disk</summary>

![vms-add-disk](/vms-add-disk.png){.medium .framed}

</details>

### Discs (ISOs)

Every VM has a disc drive, like the DVD drive of a physical PC. To put an ISO in it:

1. On the **Disks** tab, click **Attach ISO**.
2. Choose an ISO from your Install Media folder.
3. Leave **Boot from this disc first** off for drivers and tools. Turn it on to reinstall the operating system or to run a rescue disc: the VM then boots that disc on every start until you remove it.
4. Click **Attach ISO**.

If the VM is running and has a free disc drive, the ISO goes in right away. Otherwise the VM sees it after its next restart. A VM can have up to 5 ISOs attached.

To take one out, open the ISO's menu on the **Disks** tab and choose **Eject** for a running VM or **Remove** for a stopped one. Only the VM's disc drive changes. The ISO file is never deleted.

<details>
  <summary>Attach ISO</summary>

![vms-attach-iso](/vms-attach-iso.png){.medium .framed}

</details>

> **Info:** VMs can only boot ISOs stored in your **Install Media** location. See [Install media](/features/vms/installation-media).
{.is-info}

### Options

The **Options** tab has:

- **Operating System**: what HexOS shows for this VM. **Detect from VM** reads it from a running VM.
- **Start automatically with the server**
- **Show on dashboard**
- **Advanced settings in TrueNAS**, shown with Expert Mode on, for anything HexOS does not offer

<details>
  <summary>The Options tab</summary>

![vms-vm-details-options](/vms-vm-details-options.png){.medium .framed}

</details>

## Starting, stopping, renaming, and removing

| Action | What it does |
|---|---|
| **Power** > **Power on** | Starts the VM |
| **Power** > **Shut down** | Asks the operating system to shut down normally |
| **Power** > **Force off** | Cuts power immediately, like holding the power button. Anything unsaved inside the VM is lost |
| **Rename** | Changes the name the VM is shown under. Stop the VM first |
| **Uninstall** | Permanently deletes the VM and its disks |

A stopped VM shows **Power on** in place of the **Power** menu. To restart a VM, use the power button in its console.

<details>
  <summary>The Power menu</summary>

![vms-power-menu](/vms-power-menu.png){.medium .framed}

</details>

> **Danger:** Uninstalling permanently deletes all data inside the VM along with every snapshot of its disk. This cannot be undone. You are asked to type the VM's name to confirm. Your own ISO files are kept.
{.is-danger}

<details>
  <summary>Uninstall VM</summary>

![vms-uninstall-confirm](/vms-uninstall-confirm.png){.medium .framed}

</details>

## Storage and snapshots

VM disks are thin-provisioned: the size you choose is a limit, and the disk only takes up space as it fills. Making a disk bigger later is easy and making it smaller is not possible, so there is no need to over-allocate.

Two locations under **Settings** > **Locations** > **Virtualization** are used by VMs: **Virtual Disks** for VM disks, and **Install Media** for ISOs. When you place a disk on a different pool during setup, HexOS creates a Virtual Disks folder on that pool.

> **Info:** A location cannot be changed while VMs are using it. Uninstall those VMs first.
{.is-info}

If you chose **Automatic** snapshots, HexOS takes one every day and keeps each for a week. A disk you add later joins the same schedule. Systems set up from the catalog also get a snapshot of the fresh install.

> **Info:** HexOS does not yet have a screen for taking or restoring a VM snapshot. Until it does, snapshots are restored from TrueNAS.
{.is-info}

## What your server needs

- **Processor cores**: HexOS keeps 2 cores for itself, and the rest are available to VMs
- **Memory**: HexOS reserves a quarter of your server's memory for itself, and never less than 4 GB. The sliders show what is left as you choose
- **Storage**: at least 8 GB of unused pool storage, plus room for each VM's disks

Some systems in the catalog also need particular processor features or a minimum TrueNAS version. HexOS leaves out anything your server cannot run.

> **Info:** Handing a graphics card, USB devices, or other hardware directly to a VM is not available yet. **Locally (Passthrough)** in the custom VM dialog will be available in a future update. See [Passthrough requirements](/features/vms/passthrough-requirements) for the hardware it will need.
{.is-info}
