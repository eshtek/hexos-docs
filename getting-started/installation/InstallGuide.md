---
title: Illustrated Installation Guide
description: Create a bootable USB with HexOS Imager, install HexOS on your server, and reach the Command Deck for the first time
published: true
date: 2026-09-04T12:00:00.000Z
tags: install, installation, usb, imager, iso
editor: markdown
dateCreated: 2026-06-08T15:41:01.586Z
---

# Illustrated installation guide

## Before you begin

You will need:

- [To purchase a HexOS license](https://hub.hexos.com/store/product/1-lifetime/)
- [Server hardware](/getting-started/overview#getting-started)
- An 8 GB or larger USB drive that can be safely erased
- An ethernet cable to connect your server to your router or network switch
- A display, keyboard and optionally a mouse to connect to your server
- A separate computer to create a bootable USB installer and set up your server after installation

## Create the installation USB

The recommended way is **HexOS Imager**. It downloads the latest HexOS installer, checks that the download is complete and unmodified, and writes it to your USB drive in one step. There is no separate ISO to find or verify.

> **Warning:** The USB drive will be **erased** during this process. Make sure there is nothing on it you want to keep.
{.is-warning}

### Install HexOS Imager

Download the version for your computer. These are all the same release, built for each operating system:

| Your computer | Download |
|---|---|
| Windows | [HexOS-Imager-v2.1.6-20260902-Setup.exe](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-Setup.exe) |
| Mac with Apple silicon (M1 or newer) | [HexOS-Imager-v2.1.6-20260902-arm64.dmg](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-arm64.dmg) |
| Mac with an Intel processor | [HexOS-Imager-v2.1.6-20260902-x64.dmg](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-x64.dmg) |
| Linux, Debian or Ubuntu (x64) | [HexOS-Imager-v2.1.6-20260902-x64.deb](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-x64.deb) |
| Linux, Debian or Ubuntu (arm64) | [HexOS-Imager-v2.1.6-20260902-arm64.deb](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-arm64.deb) |
| Linux, Fedora or RHEL (x64) | [HexOS-Imager-v2.1.6-20260902-x64.rpm](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-x64.rpm) |
| Linux, Fedora or RHEL (arm64) | [HexOS-Imager-v2.1.6-20260902-arm64.rpm](https://github.com/eshtek/etcher/releases/download/v2.1.6%2B20260902/HexOS-Imager-v2.1.6-20260902-arm64.rpm) |

All downloads, including a `SHA256SUMS.txt` file for checking them, are on the [HexOS Imager release page](https://github.com/eshtek/etcher/releases/tag/v2.1.6%2B20260902). HexOS Imager does not update itself yet, so check that page for newer versions.

> **Info:** On Windows, the installer is signed by Eshtek Inc. Because the signing certificate is new, Windows may still show a "Windows protected your PC" message. Click **More info** and check that the publisher reads **Eshtek Inc.**, then click **Run anyway**. This message will stop appearing as the certificate builds a reputation.
{.is-info}

> **Info:** On a Mac, the app is signed and notarized by Apple, so it opens without a security prompt.
{.is-info}

### Write HexOS to the USB drive

1. Plug the USB drive into your computer.
2. Open **HexOS Imager**.
3. Click **Download HexOS**. The latest installer is downloaded to your Downloads folder and checked automatically. If you have already downloaded and verified it before, this step is skipped.
4. Select your USB drive as the target.
5. Click **Flash!**

HexOS Imager writes the installer and then reads it back to confirm the copy is exact. When it reports success, remove the USB drive. It is ready to use in the next section.

> **Tip:** If you already have a HexOS ISO file, you can use **Flash from file** instead of **Download HexOS**. The rest of the steps are the same.
{.is-tip}

### Alternative: use your own imaging tool

If you would rather use a tool you already have, download the installer yourself and write it with [Balena Etcher](https://etcher.balena.io/#download-etcher) or another imaging tool that supports ISO files.

Current version: **HexOS 25.10.7**, released September 3, 2026.

- [Download HexOS 25.10.7](https://downloads.hexos.com/TrueNAS-SCALE-25.10.7-HexOS.iso)
- [Backup download link](https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-25.10.7-HexOS.iso), if the first link is slow or unavailable
- SHA256 checksum: `a7abaf7636a57e62ca65ad324c906b4059c0963da2a238f8bfb96ee7476ffbb2`

Compare the checksum against the file you downloaded before writing it. A checksum that does not match means the download is incomplete or corrupted, and the resulting USB will not install correctly.

> **Warning:** Do not use Rufus to create the installation USB. It has caused unbootable installers for HexOS users. Use HexOS Imager or Balena Etcher.
{.is-warning}

<details>
<summary> Verify your download (optional) </summary>

Two small files are published next to the installer:

- [Checksum file](https://downloads.hexos.com/TrueNAS-SCALE-25.10.7-HexOS.iso.sha256), the SHA256 checksum shown above
- [Signature file](https://downloads.hexos.com/TrueNAS-SCALE-25.10.7-HexOS.iso.gpg), a GPG signature from the iXsystems security team

**Check the checksum**

Run one of the following commands in the folder where you saved the installer, then compare the result to the SHA256 checksum shown above. The two must match exactly.

- Windows (PowerShell): `Get-FileHash TrueNAS-SCALE-25.10.7-HexOS.iso -Algorithm SHA256`
- macOS: `shasum -a 256 TrueNAS-SCALE-25.10.7-HexOS.iso`
- Linux: `sha256sum TrueNAS-SCALE-25.10.7-HexOS.iso`

**Check the signature**

Checking the signature confirms that the installer was built by iXsystems, the makers of TrueNAS. This needs GPG installed on your computer, for example [Gpg4win](https://www.gpg4win.org/) on Windows or [GPG Suite](https://gpgtools.org/) on macOS. Most Linux distributions include it.

1. Download the signature file to the same folder as the installer.
2. Import the iXsystems signing key: `gpg --keyserver hkps://keys.openpgp.org --recv-keys C8D62DEF767C1DB0DFF4E6EC358EAA9112CF7946`
3. Verify the installer: `gpg --verify TrueNAS-SCALE-25.10.7-HexOS.iso.gpg TrueNAS-SCALE-25.10.7-HexOS.iso`

The output should include `Good signature from "IX SecTeam <security-officer@ixsystems.com>"` and the key fingerprint `C8D6 2DEF 767C 1DB0 DFF4 E6EC 358E AA91 12CF 7946`.

> **Info:** GPG will also print a warning that the key is not certified with a trusted signature. This is expected. It only means you have not personally marked the iXsystems key as trusted on your computer.
{.is-info}

</details>

## Installation process

- Insert the USB into your server and power it on

### Getting to the boot screen

If you do not see the boot screen (shown in the next section) right away, the following are common issues:

#### Boot device order

Your server might be trying to boot from a different drive, for example an old Windows install on one of the hard drives.
To fix this, first enter the BIOS. Usually this is done by pressing `F1`, `F2`, `F10`, `F12` or `Del` while the machine is turning on.
Then in the BIOS, change the order of boot drives so your USB drive is at the top. Then save and restart.

#### Disabling Secure Boot

If you see an error message about a "security policy violation" after booting, this is caused by [Secure Boot](https://en.wikipedia.org/wiki/UEFI#Secure_Boot).

For instructions on how to disable Secure Boot, search for "[your motherboard model here] disable secure boot". You can also search for the motherboard user manual, and search within that for "secure boot".

### Boot screen

Once you see this screen, you are ready to boot into HexOS and install it:

- Select **Start HexOS Installation** (default)
- This screen will pass automatically after a moment

<details>
<summary> HexOS installer boot screen </summary>

![1.png](/installation-guide/1.png){.medium .framed}
</details>

### Installation menu

- Once the system loads, select option 1: **Install/Upgrade**

<details>
<summary> Install/Upgrade menu option </summary>

![2.png](/installation-guide/2.png){.medium .framed}
</details>

### Select installation drive

What you see now will depend on how many drives you have in your server. The drive or drives you choose to install HexOS on will not be available to store data on.

- Use the arrow keys to navigate and the space bar to select your installation drive or drives
- **[*]** in the first column indicates the device is selected

<details>
<summary> Installation drive selection </summary>

![3.png](/installation-guide/3.png){.medium .framed}
</details>

### Confirm drive erasure

- Confirm you understand the selected drive or drives will be **FULLY ERASED**

<details>
<summary> Drive erasure confirmation </summary>

![4.png](/installation-guide/4.png){.medium .framed}
</details>

### User account setup

- Set the password for the administrative user `truenas_admin`

> **Danger:** Save this password. You will need it later to reach the TrueNAS interface and to recover the server.
{.is-danger}

> **Info:** If you use a non-US keyboard, be careful with special characters in the password. The installer uses a [US keyboard layout](https://en.wikipedia.org/wiki/British_and_American_keyboards#/media/File:KB_United_States-NoAltGr.svg), so some symbols may not be the ones printed on your keys. [See details here](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/page/2/#findComment-8073). <!-- TODO: migrate this hub forum link -->
{.is-info}

<details>
<summary> Root password entry </summary>

![5.png](/installation-guide/5.png){.medium .framed}
</details>

### Installation progress

- The installer will run for a few minutes

<details>
<summary> Installation progress screen </summary>

![6.png](/installation-guide/6.png){.medium .framed}
</details>

### Installation complete

- Remove the install USB

<details>
<summary> Installation complete prompt </summary>

![7.png](/installation-guide/7.png){.medium .framed}
</details>

- Restart your machine

<details>
<summary> Reboot menu option </summary>

![8.png](/installation-guide/8.png){.medium .framed}
</details>

## First boot

### Boot screen

- The boot select screen will appear again. Ignore it
- The default option is correct and will auto-select

<details>
<summary> Boot selection screen </summary>

![9.png](/installation-guide/9.png){.medium .framed}
</details>

### System startup

- The console will display startup information

> **Tip:** If boot fails, check that HexOS is at the top in your BIOS boot device order. The instructions are at the top of this guide.
{.is-tip}

<details>
<summary> Console startup output </summary>

![10.png](/installation-guide/10.png){.medium .framed}
</details>

### Success

- The **Console Setup** screen shows when your server has fully booted

<details>
<summary> Console setup screen </summary>

![11.png](/installation-guide/11.png){.medium .framed}
</details>

**Installation complete!**

## Next step

- Open a browser window on your laptop and go to [https://deck.hexos.com/](https://deck.hexos.com/) to configure your server

> **Help:** Installer will not boot, or stuck partway? See [Installation issues](/troubleshooting/installation) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Thank you:** @Mawson for the original guide, with edits by @gingerling
{.is-contribute}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
