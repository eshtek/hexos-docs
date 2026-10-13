---
title: Who Can See Your Folders on the Network
description: When someone browses to your server, they only see the folders they are allowed to open.
published: true
date: 2026-10-10T21:00:00.000Z
tags: folders, smb, network, permissions
editor: markdown
dateCreated: 2026-10-10T21:00:00.000Z
---

# Who can see your folders on the network

When someone browses to your HexOS server from another device, for example in the Finder sidebar on a Mac or under **Network** in File Explorer on Windows, they only see the folders they are allowed to open. Other folders are not listed, so their names stay private too.

> **Info:** This needs TrueNAS 25.10 or newer on your server. On older versions, everyone on your network can see the names of all your folders, but they still cannot open the private ones. Update TrueNAS on your server to hide them.
{.is-info}

## Who sees which folder

| Folder | Who sees it when browsing the network |
|---|---|
| Public folder | Everyone on your network, including guests who do not sign in |
| Private folder | Only the users you gave access to, with read access or write access |
| Private folder with no users | Nobody. Administrators can still open it from the [Deck](https://deck.hexos.com). |

Who can *open* a folder has not changed. This only changes which folder names are listed.

## Seeing your private folders

If you connect to the server as a guest, you only see public folders. To see your private folders, connect with the username and password you created in HexOS. You can find the server address by clicking a folder on the [folders screen](https://deck.hexos.com/folders) and clicking **Browse**.

### On Mac

1. If the server is already in the Finder sidebar, click the eject button next to it to disconnect.
2. In Finder, click **Go** > **Connect to Server**.
3. Paste the server address, for example `smb://192.168.1.50`, and click **Connect**.
4. Choose **Registered User**, enter your HexOS username and password, and click **Connect**.

### On Windows

1. Copy the address of a private folder you have access to, for example `\\192.168.1.50\Photos`.
2. Paste it into the address bar of File Explorer and press **Enter**.
3. When Windows asks for network credentials, enter your HexOS username and password.

If Windows opens the server without asking for a password, it has connected as a guest. Remove the saved login in **Control Panel** > **Credential Manager** > **Windows Credentials**, restart your PC, and try again.

### On phones and tablets

Choose **Registered User** (iPhone and iPad) or turn off **Sign in anonymously** (Android) when you add the server, and enter your HexOS username and password. See [how to access files and folders over the network](/features/folders/how-to-access-folder-contents) for the full steps.

## After you change who can access a folder

A device that is already connected may keep showing the old list of folders. Disconnect from the server and connect again to see the new list.

## Exceptions

- **Time Machine folders.** Macs on your network can find Time Machine folders by name so they can back up to them. This works the same way it always has. The backups are still protected by the folder's permissions.
- **Folders TrueNAS cannot update.** Rarely, TrueNAS refuses to change a folder's sharing settings, for example when an app installed directly in TrueNAS keeps its data inside that folder. That folder's name stays visible to everyone, but its contents are still protected.

> **Help:** Still seeing a folder you should not, or missing one you should? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
