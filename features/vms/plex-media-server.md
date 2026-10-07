---
title: Plex Media Server VM
description: Run Plex Media Server as a VM that reads your HexOS media folders
published: true
date: 2026-10-07T00:00:00.000Z
tags: vm, vms, plex, media, appliance
editor: markdown
dateCreated: 2026-10-07T00:00:00.000Z
---

# Plex Media Server VM

> **Info:** Virtual Machines is in beta. Everyone can use it. Beta means we are still finishing it, so screens may change and you may find a rough edge. Read the known issues at the end of this page. [What beta means](/features/vms#what-beta-means)
{.is-info}

Plex Media Server is in the VM catalog under **Appliances**. HexOS sets up a small VM that runs Plex and reads the media in your HexOS folders. You do not need to install anything inside the VM.

## What it can read

The VM reads six of your HexOS folders: **Media**, **Movies**, **Shows**, **Music**, **Photos** and **Videos**. It can read them but cannot change or delete anything in them.

To do this, HexOS creates an account on your server just for this VM, named **plexvm** (or **plexvm2** and so on, if that name is taken). Its password is stored only inside the VM. The account is not listed with your users, and HexOS removes it when you uninstall the VM.

> **Requirement:** Each of the six folders needs a share that is turned on and unlocked. If one does not, the install stops and says which folder to fix, for example **A default media folder has no share HexOS could confirm. Check the folder's share under Folders and install again.**
{.is-success}

## Set it up

1. Go to **VMs**, open **Browse categories** > **Appliances**, and click **Plex Media Server**.
2. Click **Install**.
3. **VM details**: keep the name or type your own.
4. **Setup**: turn on **Sign in to Plex** if you want HexOS to claim the server on your Plex account and create your libraries. Leave it off to do that yourself. See [VM setup](/features/vms/vm-setup).
5. Continue through **Storage**, **Resources** and **Peripherals**.
6. On **Review**, read the **Shared folders** card. It lists the folders the VM gets read-only access to.
7. Click **Create VM**.

<details>
<summary> The Shared folders card on the Review step </summary>

![plex-review-shared-folders.png](/features/vms/images/plex-review-shared-folders.png){.medium .framed}
</details>

There is no **Account** step: the VM signs in to your folders with its own account.

## Open Plex

When setup is done, go to **VMs** > **Installed VMs**, click the VM, and click **Connect**. It opens Plex's web page. **Console** is only offered with Expert Mode on.

If you left **Sign in to Plex** off, Plex's own setup page asks you to sign in and claim the server, and to add your libraries.

## The media folders row

While the VM is running, its details show a **Media folders** row. HexOS checks it about once a minute while the details are open:

- **Connected as plexvm, 6 of 6 folders**: everything is fine.
- **Not connected:** followed by folder names: the VM cannot reach those folders right now.
- **Share disabled:** followed by folder names: the share for that folder is turned off.
- **The VM has no address yet** or **The VM's address could not be verified**: HexOS cannot check yet.
- **Could not check the folders**: the check itself failed. It runs again a minute later.

Under the row, **Checked** and a time says when it last looked.

<details>
<summary> The Media folders row </summary>

![plex-media-folders.png](/features/vms/images/plex-media-folders.png){.medium .framed}
</details>

## Scans after a folder comes back

Plex cannot see changes in network folders by itself. When HexOS signed in to Plex for you, it set your libraries to be scanned every hour.

When a folder comes back after an outage, HexOS asks Plex to scan that library again and shows **Recovery started for** and the folder name. HexOS notices this only while someone has the VM's details open. This needs **Sign in to Plex** to have worked during setup.

## Remove it

**Uninstall** deletes the VM and its disk, the **plexvm** account, and the Plex token HexOS kept. Your media folders and the files in them are not touched. See [Uninstall](/features/vms#uninstall).

## Known issues

- **The Plex Media Server page does not say which folders it can read.** Its **Locations** and **Permissions** tabs do not list the six media folders. Only the **Review** step does. Meanwhile, read the **Review** step before you click **Create VM**.
- **Run setup can do nothing.** If **Sign in to Plex** was off when you installed the VM, **Run setup** says **There is nothing to set up for this VM.**, and you cannot turn the sign-in on later. Meanwhile, claim the server from Plex's own setup page, or uninstall the VM and set it up again with **Sign in to Plex** on.
- **Retry on the media scan row always fails.** Meanwhile, do not click **Retry** on a failed **Scan libraries after a media folder reconnects** row. Start a library scan inside Plex instead.

For the full list, see [Known issues](/features/vms#known-issues).
