# Illustrated Installation Guide

*by [@Mawson](https://hub.hexos.com/profile/14-mawson/?wr=eyJhcHAiOiJmb3J1bXMiLCJtb2R1bGUiOiJmb3J1bXMtY29tbWVudCIsImlkXzEiOjEwMywiaWRfMiI6NDY0fQ==)* with edits by [@gingerling](https://hub.hexos.com/profile/19534-gingerling/)

## Before you Begin

You will need:

- [To purchase a HexOS license](https://hub.hexos.com/store/product/1-lifetime/)
- [Server hardware](https://docs.hexos.com/getting-started/overview.html#getting-started)
- An 8 GB or larger USB drive that can be safely erased
- An ethernet cable to connect your server to your router or network switch
- A display, keyboard and optionally a mouse to connect to your server
- A seperate computer to create a bootable USB installer and set up your server after installation

## Download the HexOS Installer

The first step is to download the ISO (disk image) to install HexOS from. You can download the installer ISO from either link below.

- [downloads.hexos.com](https://downloads.hexos.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso)
- [hexos download on digitaloceanspaces.com](https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso)
-   Checksum: `0d3ee32e5ecf011da78ddcb49d0866478fb6a1ddfeddd563f458a23641c8d1c5`
- _(current as of 6/26/25)_

## Create Installation USB

The next step is to put the ISO onto a usb stick, then this is used to install HexOS. The USB will be completely wiped while making the ISO so check that it’s not got anything important on it before starting. To make the ISO use Balena Etcher.

-   [Download Balena Etcher](https://etcher.balena.io/#download-etcher) onto your computer
    -   Install and open Etcher
    -   Select "Flash from File" and choose your downloaded ISO
    -   Select your target USB drive
    -   Click 'Flash!'

**Important**: Do not use Rufus to make the ISO - it causes issues for many users. Stick with Balena Etcher.

## Installation Process

- Insert the USB into your server and power it on

### Getting to the Boot Screen

If you do not see the boot screen (shown in the next section) right away the following are common issues

#### Boot device order 

Your NAS hardware might be trying to BOOT from a different drive, for example an old windows install on one of the hard drives.
To fix this first enter the BIOS -  usually this is done by pressing F10, F2, F12, F1, or DEL while the machine is turning on.
Then in the BIOS change the order of boot drives so your USB ISO is at the top. Then save/restart.

#### Disabling Secure Boot
If you see an error message about a “security policy violation” after booting, this is caused by [Secure Boot](https://en.wikipedia.org/wiki/UEFI#Secure_Boot)

For instructions on how to disable secure boot search '[your motherboard model here] disable secure boot'. You can also search for the motherboard user manual, and search within that for 'secure boot'".

### Boot Screen

Once you see this screen, you are ready to boot into HexOS and install it:

-   Select "Start HexOS Installation" (default)
-   This screen will pass automatically after a moment

[![Boot Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG "Enlarge image")

### Installation Menu

-   After the system loads, choose option 1: "Install/Upgrade"

[![Installation Menu](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG "Enlarge image")

### Select Installation Drive

What you see now will depend on how many drives you have in your server. The drive or drives you choose to install HexOS on will not be available to store data on. 

-   **Use arrow keys to navigate, spacebar to select your installation drive or drives**
-   "**[*]**" in the first column indicates the device is selected

[![Drive Selection](https://hub.hexos.com/uploads/monthly_2024_11/Capture3.PNG.8efa34d929a7a8dd6e148ebc17172509.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture3.PNG.8efa34d929a7a8dd6e148ebc17172509.PNG "Enlarge image")

### Confirm Drive Erasure

-   Confirm you understand the selected drive(s) will be **FULLY ERASED**

[![Drive Erasure Warning](https://hub.hexos.com/uploads/monthly_2024_11/Capture4.PNG.20de862b21fdbe599a413abfc6bc5db6.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture4.PNG.20de862b21fdbe599a413abfc6bc5db6.PNG "Enlarge image")

### User Account Setup

-   **Important**: Choose the first option: "Administrative user (truenas_admin)"
-   If you accidentally select the wrong option, [see this solution](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/#findComment-1958) or restart the installation

[![User Account Setup](https://hub.hexos.com/uploads/monthly_2024_11/Capture5.PNG.f7af55f85dc45fff3932704006737410.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture5.PNG.f7af55f85dc45fff3932704006737410.PNG "Enlarge image")

### Set Root Password

-   Set the root password - **save this password, you'll need it later**
-   **Non-US keyboard users**: Be careful with special characters in the password. The installer uses a [US keyboard layout](https://en.wikipedia.org/wiki/British_and_American_keyboards#/media/File:KB_United_States-NoAltGr.svg). [See details here](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/page/2/#findComment-8073) 

[![Root Password Setup](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG "Enlarge image")

### EFI Boot Options

-   Choose "Yes" for newer hardware (generally recommended)

[![EFI Boot Options](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG "Enlarge image")

### Installation Progress

-   The installer will run for a few minutes...

[![Installation Progress](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG "Enlarge image")

### Installation Complete

-   Remove the install USB and restart your machine

[![Installation Complete](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG "Enlarge image")

## First Boot

### Boot Screen

-   The boot select screen will appear again - ignore it
-   The default option is correct and will auto-select

[![First Boot Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG "Enlarge image")

### System Startup

-   The console will display startup information
-   **Tip**: If boot fails, check that HexOS is at the top in your BIOS boot device order. The instructions are [at the top of this guide here](####boot-device-order).

[![System Startup](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.thumb.PNG.6a43deaa983d715784365f338659d44c.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.PNG.8d234b71bdcd3fbbdd5ad5389338e67f.PNG)

### Success!

-  The "Console Setup" screen shows when HexOS is running properly
- **Installation complete!**
-   **Next step**: Open a browser window on your laptop and go to [https://deck.hexos.com/](https://deck.hexos.com/) to configure your server

[![Console Setup Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.thumb.PNG.44c581cd145b735c1ce98f591991f934.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.PNG.ad70047f68f85e17303c4c874af95fc1.PNG)

