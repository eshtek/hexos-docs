---
title: Install media for VMs
description: Where installer ISOs live on your server and how to add one
published: true
date: 2026-09-21T21:29:04.000Z
tags: vm, vms, iso, install media, installation media
editor: markdown
dateCreated: 2026-09-21T21:29:04.000Z
---

# Install media for VMs

Install media are the ISO files a VM boots from: an operating system installer, a rescue disc, or a disc of drivers. HexOS keeps them in one place on your server, the **Install Media** location, and VMs can only boot ISOs stored there.

> **Info:** Most systems in the catalog need nothing from you. HexOS downloads the official image itself. You only need your own ISO for Windows, for a [custom VM](/features/vms#building-a-custom-vm), or to put a disc into a VM you already have.
{.is-info}

## Where it is

Go to **Settings** > **Locations** and look under **Virtualization** for **Install Media**. By default it is a folder on your capacity pool.

## Adding an ISO

There are three ways, and all of them end with the ISO in your Install Media location.

**Upload it while you set up the VM.** Where a dialog asks for an ISO, choose **Select an ISO file**, open the list, and click **Browse files…** to upload one from your computer. The list shows the upload's progress.

**Give HexOS a download link.** Choose **Provide a download link** and paste a link that starts with `https://`. Your server downloads the ISO directly, so nothing passes through your computer. For Windows, the option reads **Provide a download link from Microsoft**, and **Open the official ISO download page** takes you to the page that generates one: pick your edition there, copy the link, and paste it.

**Copy it there yourself.** Use the [file browser](/features/file-browser) to upload or move the ISO into your Install Media folder. It then appears in every **Choose an ISO** list.

> **Info:** If you pick a file from somewhere else, HexOS says **VMs can only boot ISOs stored in Install Media**. Copy the file there first, then pick it.
{.is-info}

## Using an ISO with a VM you already have

See [Discs (ISOs)](/features/vms#discs-isos) for putting an ISO into a VM's disc drive, booting from it, and taking it out again.

## What happens to your ISOs

- Uninstalling a VM never deletes your ISO files.
- Installer files that HexOS downloaded are kept, so setting up the same system again is faster.
- Ejecting or removing an ISO from a VM only changes that VM's disc drive. The file stays where it is.
