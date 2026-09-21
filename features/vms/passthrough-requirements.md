---
title: Passthrough requirements for VMs
description: What your server needs before a VM can use a graphics card, monitor, keyboard and mouse directly
published: true
date: 2026-09-21T22:47:06.000Z
tags: vm, vms, passthrough, gpu, graphics card, usb
editor: markdown
dateCreated: 2026-09-21T22:47:06.000Z
---

# Passthrough requirements for VMs

Passthrough hands a piece of your server's hardware, such as a graphics card, directly to one VM. With a graphics card, a USB controller, and a monitor, keyboard, and mouse plugged into them, a VM behaves like a physical PC sitting on your desk, with close to the performance of one.

> **Info:** Passthrough is not available yet. When you create a [custom VM](/features/vms#building-a-custom-vm), **Locally (Passthrough)** is shown but cannot be chosen, and says **Passthrough will be available in a future update**. Choose **Remotely** for now. This page describes what your server will need, so you can plan hardware ahead of time. Details may change before the feature is released.
{.is-info}

## What your server needs

### A graphics card the server can spare

The VM takes over the whole card. HexOS stops using it while the VM runs, and a display plugged into that card shows the VM instead.

Your server has to keep one graphics device for itself, so it cannot hand over its only one. In practice that means either:

- a processor with built-in graphics, plus one graphics card for the VM, or
- two graphics cards, one for the server and one for the VM

### IOMMU turned on in your server's BIOS

IOMMU is the processor feature that lets a VM use a device safely. It is usually off by default. Look in your motherboard's BIOS or UEFI settings for:

- **Intel VT-d** on Intel systems
- **AMD-Vi** or **IOMMU** on AMD systems

Virtualization itself (**Intel VT-x** or **AMD-V**, sometimes called **SVM**) must also be on. It is needed for every VM, not only for passthrough.

### A card that is not tied to hardware the server depends on

Devices on a motherboard are arranged in groups, and a VM has to take a whole group at once. If the slot your graphics card is in shares its group with something the server needs, such as a storage controller, that card cannot be handed over. Moving the card to a different slot often fixes this.

### A USB controller for the keyboard and mouse

Once a VM is using a real graphics card, its picture appears on the monitor plugged into that card, and the [console](/features/vms#the-console) in your browser no longer shows it. The console's keyboard and mouse go with it. So the VM needs a real keyboard and mouse of its own, which means handing it a USB controller: every port on that controller then belongs to the VM.

Most motherboards have more than one USB controller. A small PCIe USB card is an inexpensive way to add one that is easy to set aside.

### A monitor, keyboard, and mouse

Plug the monitor into the graphics card you hand over, and the keyboard and mouse into ports on the USB controller you hand over.

## What to expect

- **A restart may be needed the first time.** A server cannot always let go of a graphics card it is already using. If that happens, HexOS asks you to restart the server and then start the VM.
- **Sound is optional.** A sound device can be handed over too. Many graphics cards carry sound to the monitor over HDMI or DisplayPort.
- **Individual USB devices** such as a Zigbee or Z-Wave stick are limited to four per VM. For more than that, hand over a whole USB controller.
- **Not every system supports it.** Some systems in the catalog cannot use a passed-through graphics card.

## Not sure what your server has?

Your motherboard's manual lists its BIOS settings and which slots and USB ports share a controller. If you would like help, [contact HexOS support](https://discord.com/invite/DjEp3WRHKz).
