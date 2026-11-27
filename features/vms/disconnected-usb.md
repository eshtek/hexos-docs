---
title: Start a VM after disconnecting a USB device
description: Remove a disconnected USB assignment so your VM can start again.
published: true
isPublished: true
date: 2026-11-23T00:00:00.000Z
tags: vm, usb, troubleshooting
editor: markdown
dateCreated: 2026-11-23T00:00:00.000Z
---

# Start a VM after disconnecting a USB device

A USB device assigned to a VM can prevent that VM from starting when it is disconnected. Removing the assignment keeps the VM and its disks. The USB device will no longer be assigned to that VM.

> **Requirement:** This guide starts with a stopped VM. If the VM is still running, save your work inside it before shutting it down.
{.is-success}

## Find the disconnected device

1. Click **VMs** in the menu, then **Installed VMs**. Click the VM that cannot start. You can use **Find installed VMs** to find it by name.

<details>
<summary> Find the stopped VM </summary>

![Find the stopped Office PC VM](/vm-usb-recovery/find-vm.png){.medium .framed}
</details>

2. Click **Resources**. Under **Attached hardware**, find the USB row marked **Not connected**. Click **Remove assignment** beside that row.

<details>
<summary> Disconnected USB assignment under Resources </summary>

![USB assignment marked Not connected](/vm-usb-recovery/missing-usb.png){.medium .framed}
</details>

## Remove the assignment

3. Check that the dialog names the USB assignment you want to remove. Click **I want to remove this USB assignment from the VM.**, then click **Remove assignment**.

<details>
<summary> Confirm removal of the USB assignment </summary>

![Confirmation keeps the VM and its disks](/vm-usb-recovery/remove-confirmation.png){.medium .framed}
</details>

The USB row should disappear. The VM remains stopped. If it had no other assigned hardware, **Attached hardware** will show **Nothing is passed through to this VM.**

<details>
<summary> The disconnected assignment is removed </summary>

![Attached hardware after removing the assignment](/vm-usb-recovery/assignment-removed.png){.medium .framed}
</details>

## Start the VM

4. Click **Power on**.

<details>
<summary> Power on after removing the disconnected assignment </summary>

![Power on the stopped VM](/vm-usb-recovery/power-on.png){.medium .framed}
</details>

5. Check that the VM shows **Running**. This confirms that the VM started. Its operating system may still need time to finish starting.

<details>
<summary> The VM is running </summary>

![Office PC status is Running](/vm-usb-recovery/running.png){.medium .framed}
</details>

## If the VM still cannot start

If another USB assignment is still disconnected, the VM may still refuse to start. Each disconnected assignment has its own **Remove assignment** button.

If the USB row says **Connection status unknown**, HexOS could not verify the device's connection. Check which device was assigned before deciding whether to remove it.

[Learn about Virtual Machines](/features/vms).
