---
title: File Browser
description: Browse, upload, download, and organize the files in your folders from the Command Deck
published: true
date: 2026-08-20T21:00:00.000Z
tags: files, upload, download, usb
editor: markdown
dateCreated: 2026-08-20T21:00:00.000Z
---

# File browser

The file browser lets you work with the contents of your folders directly from the Command Deck, without connecting your computer to the server first. You can browse, upload, download, rename, move, and delete files, download files from the internet straight to your server, and write an ISO to a USB stick plugged into the server.

## Opening the file browser

1. Go to the **Folders** screen.
2. Click the folder you want to open.
3. Click the **Browse** button.

The file browser opens over the folder screen. Close it with the **X** button or the Esc key to go back.

> **Info:** If a folder is encrypted and locked, the **Browse** button is unavailable. Unlock the folder first.
{.is-info}

## Browsing your files

Click a folder to open it. The pills along the top show where you are — click any of them to jump back up. On a computer you can also use the back and forward arrows.

### Changing the view

Click **View options** to change how files are listed:

- **View as** — **List** shows details in columns, **Icons** shows thumbnails
- **Sort by** — **Name**, **Size**, **Type**, or **Date**
- **Order** — **Ascending** or **Descending**
- **Show file extensions** — on by default
- **Show hidden files** — off by default

Folders always appear above files, whichever sort you choose. Your choices are remembered for next time.

In list view you can drag the dividers between column headers to resize them, and double-click a divider to reset the widths.

### Selecting files

- Click a file to select it
- Ctrl-click (Cmd-click on a Mac) to add or remove individual files
- Shift-click to select a range
- Use the checkbox in the header to select everything
- Use the up and down arrow keys to move through the list, and hold Shift to extend the selection

On a phone, press and hold a file to start selecting, then tap others to add them. Each row also has a **⋮** button for actions.

The panel on the right shows details about whatever you have selected, and the buttons for working with it.

## Working with files

### Uploading

Click **Upload** to choose files, or **Upload folder** to choose a whole folder. You can also drag files and folders from your computer onto the window.

Dragged folders keep their structure, including any empty subfolders inside them.

> **Info:** Uploads keep running if you close the file browser or move to another screen. They only stop if you reload the page. You can watch progress in the activities menu.
{.is-info}

Files upload one at a time, and anything you add while an upload is running joins the queue. You can upload up to 10,000 files at once.

### Downloading

Select one or more files and click **Download**.

> **Info:** Folders cannot be downloaded. Select individual files instead.
{.is-info}

### Creating, renaming, and organizing

- **New folder** — creates a folder where you are
- **Rename** — only the name is selected to start with, so the file extension is left alone. If you do change the extension, HexOS asks you to confirm
- **Copy to** and **Move to** — choose the destination folder, then click **Copy here** or **Move here**
- **Delete** — asks you to confirm first, because this cannot be undone

> **Warning:** HexOS never overwrites files silently. If something with the same name already exists, you are asked what to do — **Keep both** saves the new copy with a number added, for example `movie.mp4` becomes `movie (1).mp4`.
{.is-warning}

> **Info:** A folder that is shared on your network cannot be deleted here. Remove the share on the **Folders** screen first.
{.is-info}

## Downloading from the internet

Your server can fetch a file from the web directly, which is much faster than downloading to your computer and uploading it again. It also means you can close the window while it works.

1. Click **Download from the internet**.
2. Paste the web address into **Web address (URL)**.
3. Click **Check link** to confirm the file and see its size.
4. Adjust **Save as** if you want a different filename.
5. Paste a **Verification code** if the website provides one.
6. Click **Download**.

> **Tip:** Many download pages list a verification code next to the file, sometimes called a checksum, SHA-256, or MD5. Pasting it lets your server confirm the file arrived complete and untampered. HexOS works out which type it is automatically.
{.is-tip}

## Burning an ISO to a USB stick

If you select a single `.iso` file, **Burn to USB stick** appears. Your server writes the ISO to a USB stick and then checks the result, so you can make installation media without any extra software.

1. Plug a USB stick into a USB port **on your server**, not into your computer.
2. Select the ISO file and click **Burn to USB stick**.
3. Choose the USB stick from the list and click **Continue**.
4. Type `ERASE` to confirm, then click **Erase and burn**.

> **Danger:** Everything on the USB stick is permanently erased before the ISO is written. Check that you have selected the right stick.
{.is-danger}

HexOS only offers USB sticks that are safe to write to. Drives that are part of a storage pool, are being used to boot the server, or are larger than 2 TB are never listed.

> **Info:** Windows installer ISOs do not start up from a plain copy like this. Linux, TrueNAS, and recovery ISOs work correctly.
{.is-info}

## Connecting from your computer instead

For everyday file work, and for moving large amounts of data, connecting your computer to the folder over the network is usually more comfortable. Click **Connect from Mac or Windows** at the bottom of the file browser for instructions, or read [How to access folder contents](/features/folders/how-to-access-folder-contents).

## Local connection required for transfers

Uploading and downloading move file data between your computer and your server directly, so they are only available when you are on the same network as your server.

If you are away from home, the **Upload** and **Download** buttons show a warning and explain how to switch to local access. Everything else — browsing, renaming, moving, deleting, downloading from the internet, and burning a USB stick — happens on the server itself and works from anywhere.

> **Info:** If file actions are missing entirely, your server may need a HexOS update before they become available. Browsing still works in the meantime.
{.is-info}
