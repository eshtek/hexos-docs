---
title: How to access files and folders over the network
description: Find a folder's network address and connect from Windows, macOS, Linux, ChromeOS, or a phone.
published: true
date: 2026-10-25T22:00:00.000Z
tags: folders, files, smb, windows, macos
editor: markdown
dateCreated: 2026-06-08T15:40:29.773Z
---

# How to access files and folders over the network

Connect an existing HexOS folder to your device's file manager to open, copy, and save files over your home network. Each device needs its own connection to the folder. If you are connecting from inside a VM, start with [Open shared folders from a Virtual Machine](/features/vms/network-shares) to choose the right address.

You can also browse and manage files directly in Command Deck with the [File Browser](/features/file-browser). **Browse** opens that file browser; the network-connection instructions are inside it.

> **Requirement:** Your device and HexOS server must be reachable on the same local network. Signing into Command Deck alone does not connect a network folder to your device.
{.is-success}

## Copy the folder address

Use a computer for these steps. The connection link appears in the desktop file browser. An encrypted folder must be [unlocked](/features/folders/encryption) before **Browse** is available.

1. In [Command Deck](https://deck.hexos.com), open **Folders** and click the folder you want to connect.

<details>
<summary> Choose a folder </summary>

![Choose Documents on the Folders screen](/how-to-access-folder-contents/hexos-folders.png){.medium .framed}
</details>

2. Click **Browse**. Your folder opens in the File Browser.

<details>
<summary> Browse button in the folder info panel </summary>

![Browse button](/how-to-access-folder-contents/hexos-browse.png){.medium .framed}
</details>

3. At the bottom-right, click **Connect from Mac or Windows**. Maximize the browser window if you cannot see the bottom bar.

<details>
<summary> Network connection link in the File Browser </summary>

![Connect from Mac or Windows at the bottom-right](/how-to-access-folder-contents/hexos-connect.png){.medium .framed}
</details>

4. In **Folder Instructions**, choose **Windows** or **macOS** from the menu.

<details>
<summary> Choose an address format </summary>

![Windows and macOS choices](/how-to-access-folder-contents/hexos-choose-system.png){.medium .framed}
</details>

5. Click **Copy** beside the address. Use **Windows** for Windows and ChromeOS. Use **macOS** for Finder or Linux file managers that accept `smb://` addresses.

<details>
<summary> Copy the Windows address </summary>

![Copy a Windows folder address](/how-to-access-folder-contents/hexos-windows-address.png){.medium .framed}
</details>

<details>
<summary> Copy the macOS address </summary>

![Copy an SMB folder address](/how-to-access-folder-contents/hexos-mac-address.png){.medium .framed}
</details>

For example, the same folder could have the Windows address `\\192.168.1.100\Documents` and the macOS address `smb://192.168.1.100/Documents`. These are examples: use the address copied from your server. A device that asks for the server IP address separately needs only `192.168.1.100` from this example.

Changing the operating-system choice changes the displayed address and instructions. It does not change your folder or its permissions.

> **Info:** If **Browse** opens **Folder Instructions** directly, continue at step 4.
{.is-info}

## Use your file-sharing account

If your device asks for a username and password, use a NAS file-sharing account that has access to the folder. These accounts are listed under **Settings** > **Local users** in HexOS. Your Command Deck website login and your computer's sign-in PIN are separate from this account.

A public folder can still prompt for credentials when a device does not allow guest connections. Use an authorized NAS account rather than disabling your device's security settings. Never send your password to support.

## Connect from your device

Here are some examples of how to access the file from various devices. The specific method may vary a little depending on your operating system.

### On macOS

Use the **macOS** address copied from HexOS.

1. Open **Finder**, then click **Go** > **Connect to Server**.
2. Paste the copied `smb://` address into **Server Address** and click **Connect**.

<details>
<summary> Connect to Server in Finder </summary>

![Finder Connect to Server dialog](/how-to-access-folder-contents/mac-connect.png){.medium .framed}
</details>

If asked to sign in, use **Registered User** and your NAS file-sharing username and password. The connected folder appears in Finder.

### On Windows 11

Use the **Windows** address copied from HexOS. This walkthrough adds a shortcut under **This PC**; it does not create another folder on the server.

1. Open **File Explorer**
2. On the left side there is a list of folders and locations, click **This PC**

<details>
<summary> This PC in File Explorer </summary>

![this-pc](/how-to-access-folder-contents/this-pc.png){.medium .framed}
</details>

Right-click an empty area in **This PC**, then click **Add a network location**. If the command is hidden in the shorter Windows 11 menu, click **Show more options** first.

<details>
<summary> Add a network location option </summary>

![add-a-network-location](/how-to-access-folder-contents/add-a-network-location.png){.medium .framed}
</details>

Follow the wizard through by clicking the **Next** button.

<details>
<summary> Network location wizard </summary>

![next](/how-to-access-folder-contents/next.png){.medium .framed}
</details>

Click the **Next** button on the **Choose a custom network location** step.

<details>
<summary> Custom network location step </summary>

![choose-custom-next](/how-to-access-folder-contents/choose-custom-next.png){.medium .framed}
</details>

Paste the folder address in and click the **Next** button.

<details>
<summary> Folder address field </summary>

![paste-in-address](/how-to-access-folder-contents/paste-in-address.png){.medium .framed}
</details>

You can optionally choose a display name. Click the **Next** button.

<details>
<summary> Display name field </summary>

![name-it](/how-to-access-folder-contents/name-it.png){.medium .framed}
</details>

Then click the **Finish** button.

<details>
<summary> Finish button </summary>

![finish](/how-to-access-folder-contents/finish.png){.medium .framed}
</details>

Your folder will now be accessible from your file browser.

If Windows asks for credentials, use your NAS file-sharing username and password. If an incorrect account is already shown, click **More choices** > **Use a different account**. A public folder can also require an account on devices that block guest access.

<details>
<summary> Network credentials prompt </summary>

![password](/how-to-access-folder-contents/password.png){.medium .framed}
</details>

### On ChromeOS

Open the **Files** app and click **My files**.

<details>
<summary> My Files app </summary>

![my-files](/how-to-access-folder-contents/my-files.png){.medium .framed}
</details>

1. On the top right, click the menu button (three vertical dots)
2. Click **Services**
3. Click **SMB file share**

<details>
<summary> SMB File Share menu option </summary>

![services-smb-share](/how-to-access-folder-contents/services-smb-share.png){.medium .framed}
</details>

1. In **File share URL**, paste the **Windows** address copied from HexOS.
2. Enter your NAS username and password if required.
3. Click **Add**

<details>
<summary> SMB share login dialog </summary>

![smb-share-login](/how-to-access-folder-contents/smb-share-login.png){.medium .framed}
</details>

The folder will now show in the left-hand navigation on My Files

<details>
<summary> Share shortcut in My Files </summary>

![shortcut-in-my-files](/how-to-access-folder-contents/shortcut-in-my-files.png){.medium .framed}
</details>

### On Linux

The following example uses GNOME Files. Labels can differ between Linux distributions. Use the **macOS** address copied from HexOS, which starts with `smb://`.

1. Open your files app
2. Click **Network**
3. Paste in the folder address

<details>
<summary> Network address field in Files </summary>

![paste-in-address-1](/how-to-access-folder-contents/paste-in-address-1.png){.medium .framed}
</details>

1. Click **Registered User** and enter your NAS username and password if asked.
2. Click **Connect**

<details>
<summary> Username and password prompt </summary>

![enter-details](/how-to-access-folder-contents/enter-details.png){.medium .framed}
</details>

You will now see the folder in your Networks section of your file manager and also as a shortcut at the bottom of the left-hand navigation of files

<details>
<summary> Folder shortcut in file manager </summary>

![files-shortcut](/how-to-access-folder-contents/files-shortcut.png){.medium .framed}
</details>

Some versions of Files show the connection under **Other Locations**.

<details>
<summary> Other locations section </summary>

![other-locations](/how-to-access-folder-contents/other-locations.png){.medium .framed}
</details>

### On Android

#### Samsung Galaxy

1. Open the **My Files** app.

<details>
<summary> My Files app </summary>

![Device connection screen](/how-to-access-folder-contents/android-1.png){.medium .framed}
</details>
2. Click **Network storage**. If prompted, finish the My Files update and open **Network storage** again.

<details>
<summary> Network storage in My Files </summary>

![Device connection screen](/how-to-access-folder-contents/android-2.png){.medium .framed}
</details>
3. Click the + button at the top right corner
<details>
<summary> Plus button in My Files </summary>

![Device connection screen](/how-to-access-folder-contents/android-3.png){.medium .framed}
</details>
4. Click **Network drive (SMBv2/SMBv3)**
<details>
<summary> Network Drive option </summary>

![Device connection screen](/how-to-access-folder-contents/android-4.png){.medium .framed}
</details>
5. If your server appears click it, if not click **Add manually**
<details>
<summary> Server selection list </summary>

![Device connection screen](/how-to-access-folder-contents/android-5.png){.medium .framed}
</details>
6. In **Address**, enter only the server IP address from [Copy the folder address](#copy-the-folder-address), such as `192.168.1.100`. Leave **Port** at `445`. Enter your NAS username and password and leave **Sign in anonymously** unchecked. Click **Add**.

<details>
<summary> Network drive details form </summary>

![Network drive address and sign-in fields](/how-to-access-folder-contents/android-6.png){.medium .framed}
</details>

After the server is added, open it in **Network storage** and click the shared folder you want to access.

#### Other Android devices

If your Android file manager does not offer network storage, use a file manager that supports SMB network shares. Use the server address and NAS credentials described above. The steps depend on the app.

### On iPhone or iPad

1. Open the **Files** app and click **Browse**.

<details>
<summary> Files app </summary>

![Device connection screen](/how-to-access-folder-contents/ios-1.jpg){.medium .framed}
</details>
2. Click the 3 horizontal dots button on the top right corner
<details>
<summary> Three-dot menu button </summary>

![Device connection screen](/how-to-access-folder-contents/ios-2.png){.medium .framed}
</details>
3. Click **Connect to Server**
<details>
<summary> Connect to Server option </summary>

![Device connection screen](/how-to-access-folder-contents/ios-3.png){.medium .framed}
</details>
4. In **Server**, enter the server IP address from [Copy the folder address](#copy-the-folder-address), such as `192.168.1.100`, then click **Connect**.

<details>
<summary> Server address entered </summary>

![Device connection screen](/how-to-access-folder-contents/ios-4.png){.medium .framed}
</details>
5. Click **Registered User**, enter your NAS username and password, then click **Next**. Use **Guest** only if the folder allows guest access and your device supports it.

<details>
<summary> Guest or Registered User screen </summary>

![Device connection screen](/how-to-access-folder-contents/ios-5.png){.medium .framed}
</details>
6. You can find your server under the Shared section.
<details>
<summary> Server in the Shared section </summary>

![Device connection screen](/how-to-access-folder-contents/ios-6.png){.medium .framed}
</details>
