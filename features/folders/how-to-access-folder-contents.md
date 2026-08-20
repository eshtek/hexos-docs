---
title: How to Access Files and Folders Over the Network
description: 
published: true
date: 2026-06-09T20:03:21.071Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:29.773Z
---

# How to access files and folders over the network

In HexOS, you can [create folders](/features/folders/create-a-new-folder) through the deck, but you can’t add contents to the folders via the deck. <br>
The folder contents are added, viewed and edited from another device *over the network*. This means folders are accessed using a computer, laptop or phone connected to the same network. 

This guide will explain how to access a folder on your HexOS server from a variety of other devices.
> **Info:** Some apps may require different methods to add or view data. In Immich, for example, you upload photos and videos via a web browser.
{.is-info}

## Copying the address of a folder

1. In the folders screen of your [HexOS deck](https://deck.hexos.com), click the folder you want to access
2. Click the **Browse** button

<details>
<summary> Browse button </summary>

![browse-button](https://github.com/user-attachments/assets/4bc786e3-e672-41b6-9235-fb94c80d6e18){.medium .framed}
</details>

You will be given the folder IP address needed to connect to it from other devices on the same network. You can click the **Copy** button to copy a link and paste it following the instructions below.

<details>
<summary> Folder address with Copy button </summary>

![link-for-browse](https://github.com/user-attachments/assets/5cb66e5e-a6de-4f89-b3a3-35b523abd0be){.medium .framed}
</details>

You can choose Windows or Mac using the dropdown.

<details>
<summary> Windows or Mac dropdown </summary>

![choose-between-windows-or-mac](https://github.com/user-attachments/assets/ee0c6d56-d436-4c23-88a9-7c2d20a7c4d6){.medium .framed}
</details>

Changing the Windows/Mac setting doesn't modify the folder, it just provides instructions for the selected operating system.

## Accessing the folder from your device

Here are some examples of how to access the file from various devices. The specific method may vary a little depending on your operating system.

### On Mac

1. Open Finder
2. Click **Go** in the menu bar
3. Click **Connect to Server**
4. Paste the SMB link into the **Server Address** field
5. Click the **Connect** button

### On Windows
1. Open File Explorer
2. On the left side there is a list of folders and locations, click **This PC**

<details>
<summary> This PC in File Explorer </summary>

![this-pc](https://github.com/user-attachments/assets/2674928c-adac-4972-ab11-e831c6df0ac9){.medium .framed}
</details>

1. Right click for the menu 
2. Click **Add a network location**

<details>
<summary> Add a network location option </summary>

![add-a-network-location](https://github.com/user-attachments/assets/33afaa07-7e69-4bac-9fc4-c6d0009dc312){.medium .framed}
</details>

Follow the wizard through by clicking the **Next** button.

<details>
<summary> Network location wizard </summary>

![next](https://github.com/user-attachments/assets/877a37f5-2df4-4ef4-8bf9-98c790eecec1){.medium .framed}
</details>

Click the **Next** button on the **Choose a custom network location** step.

<details>
<summary> Custom network location step </summary>

![choose-custom-next](https://github.com/user-attachments/assets/183a83a5-755d-46cb-a62d-4e25e1ccff8c){.medium .framed}
</details>

Paste the folder address in and click the **Next** button.

<details>
<summary> Folder address field </summary>

![paste-in-address](https://github.com/user-attachments/assets/34109dba-a600-49f4-9a32-91698c0604d0){.medium .framed}
</details>

You can optionally choose a display name. Click the **Next** button.

<details>
<summary> Display name field </summary>

![name-it](https://github.com/user-attachments/assets/6827c07e-aa33-4557-861d-e4c8f75372bc){.medium .framed}
</details>

Then click the **Finish** button.

<details>
<summary> Finish button </summary>

![finish](https://github.com/user-attachments/assets/3e60c006-fd4b-468b-82ac-edcbf83200ee){.medium .framed}
</details>

Your folder will now be accessible from your file browser.

If the folder is private you will be asked for a username and password before it will open.

<details>
<summary> Network credentials prompt </summary>

![password](https://github.com/user-attachments/assets/2e6459cd-bb4f-45b1-895a-51c9ea0b4a52){.medium .framed}
</details>

### On ChromeOS

Open the My Files app.

<details>
<summary> My Files app </summary>

![my-files](https://github.com/user-attachments/assets/7fc60faf-ac38-468e-8988-0c52c4d5b5d3){.medium .framed}
</details>

1. On the top right, click the menu button (three vertical dots)
2. Click **Services**
3. Click **SMB File Share**

<details>
<summary> SMB File Share menu option </summary>

![services-smb-share](https://github.com/user-attachments/assets/7e153a65-747b-42c5-bc35-5e0473cdcadb){.medium .framed}
</details>

1. Then click a suggested share from the list or manually enter the URL using the format given in the Windows section "\\\ipaddress\Folder-name"
2. Fill out the password field if required
3. Click **Add**

<details>
<summary> SMB share login dialogue </summary>

![smb-share-login](https://github.com/user-attachments/assets/e1107dab-088b-448a-898f-433f552b8a25){.medium .framed}
</details>

The folder will now show in the left-hand navigation on My Files

<details>
<summary> Share shortcut in My Files </summary>

![shortcut-in-my-files](https://github.com/user-attachments/assets/ecca25e5-df0f-436b-a5c1-c859439cee4f){.medium .framed}
</details>

### On Linux

This varies depending on your Linux distro. The URL required will likely be similar to the Mac one, with forward slashes (rather than Windows and ChromeOS with \\ backslashes). The following example is from Fedora.

1. Open your files app
2. Click **Network**
3. Paste in the folder address 

<details>
<summary> Network address field in Files </summary>

![paste-in-address-1](https://github.com/user-attachments/assets/390cbaff-3e82-43d1-925e-6bead7f143cc){.medium .framed}
</details>

1. Fill in the username and password if needed
2. Click **Connect**

<details>
<summary> Username and password prompt </summary>

![enter-details](https://github.com/user-attachments/assets/3d1d558d-58dc-4e63-8e55-cf98f45a88c4){.medium .framed}
</details>

You will now see the folder in your Networks section of your file manager and also as a shortcut at the bottom of the left-hand navigation of files

<details>
<summary> Folder shortcut in file manager </summary>

![files-shortcut](https://github.com/user-attachments/assets/0da3c4b9-90fd-4318-a914-b189e0a54f8f){.medium .framed}
</details>

Sometimes the folder may show under **Other locations** 

<details>
<summary> Other locations section </summary>

![other-locations](https://github.com/user-attachments/assets/649fb11e-8227-4726-9fff-e8a8fff56643){.medium .framed}
</details>

## Android

### Samsung Galaxy

1. Open the **My Files** app
<details>
<summary> My Files app </summary>

![](../../public/assets/screenshots/folder-access-guide/g1.png){.medium .framed}
</details>
2. Click network storage
    - You may be prompted to update the app

<details>
<summary> App update prompt </summary>

![](../../public/assets/screenshots/folder-access-guide/g2.png){.medium .framed}
</details>
3. Click the + button at the top right corner
<details>
<summary> Plus button in My Files </summary>

![](../../public/assets/screenshots/folder-access-guide/g3.png){.medium .framed}
</details>
4. Click **Network Drive (SMBv2/SMBv3)**
<details>
<summary> Network Drive option </summary>

![](../../public/assets/screenshots/folder-access-guide/g4.png){.medium .framed}
</details>
5. If your server appears click it, if not click **add manually**
<details>
<summary> Server selection list </summary>

![](../../public/assets/screenshots/folder-access-guide/g5.png){.medium .framed}
</details>
6. Fill this out with your information and click **Add**<br>
- The **Address** can be found on the folders screen of [HexOS deck](https://deck.hexos.com/folders) <br>
          1. Click any folder <br>
          2. Click the **Browse** button
          <details>
          <summary> Browse button </summary>
          
          ![](../../public/assets/screenshots/folder-access-guide/ip1.png){.medium .framed}
          </details>
          3. The address will be just the numbers shown (highlighted in this example)
          <details>
          <summary> Highlighted server address </summary>
          
          ![](../../public/assets/screenshots/folder-access-guide/ip2.png){.medium .framed}
          </details>
     - You can leave the port alone
     - Username and password are optional but if you would like to use them then uncheck **Sign in anonymously**
<details>
<summary> Network drive details form </summary>

![](../../public/assets/screenshots/folder-access-guide/g6.png){.medium .framed}
</details>

### Google Pixel

There isn't a native function on Pixel devices to access SMB network shares.</br>
SMB network shares can still be accessed by installing third-party applications.

## iOS

1. Open the **Files** app
<details>
<summary> Files app </summary>

![](../../public/assets/screenshots/folder-access-guide/i1.jpg){.medium .framed}
</details>
2. Click the 3 horizontal dots button on the top right corner
<details>
<summary> Three-dot menu button </summary>

![](../../public/assets/screenshots/folder-access-guide/i2.png){.medium .framed}
</details>
3. Click **Connect to Server**
<details>
<summary> Connect to Server option </summary>

![](../../public/assets/screenshots/folder-access-guide/i3.png){.medium .framed}
</details>
4. Type your server IP address in the **Server** textbox 
    - The **Address** can be found on the folders screen of [HexOS deck](https://deck.hexos.com/folders)
        1. Click any folder
        2. Click the **Browse** button
        <details>
        <summary> Browse button </summary>
        
        ![](../../public/assets/screenshots/folder-access-guide/ip1.png){.medium .framed}
        </details>
        3. The address will be just the numbers shown (highlighted in this example)
        <details>
        <summary> Highlighted server address </summary>
        
        ![](../../public/assets/screenshots/folder-access-guide/ip2.png){.medium .framed}
        </details>
        
<details>
<summary> Server address entered </summary>

![](../../public/assets/screenshots/folder-access-guide/i4.png){.medium .framed}
</details>
5. Click **Guest** or **Registered User**
    - Input your username and password if you would like to log in as a registered user

<details>
<summary> Guest or Registered User screen </summary>

![](../../public/assets/screenshots/folder-access-guide/i5.png){.medium .framed}
</details>
6. You can find your server under the Shared section. 
<details>
<summary> Server in the Shared section </summary>

![](../../public/assets/screenshots/folder-access-guide/i6.png){.medium .framed}
</details>
