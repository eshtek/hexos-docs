# Illustrated Installation Guide

*by [@Mawson](https://hub.hexos.com/profile/14-mawson/?wr=eyJhcHAiOiJmb3J1bXMiLCJtb2R1bGUiOiJmb3J1bXMtY29tbWVudCIsImlkXzEiOjEwMywiaWRfMiI6NDY0fQ==)*
## Download the HexOS Installer

-   Download the installer ISO from either link:
    -   [https://downloads.hexos.com/TrueNAS-SCALE-25.04.2.6-HexOS.iso](https://downloads.hexos.com/TrueNAS-SCALE-25.04.2.6-HexOS.iso)
    -   [https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-25.04.2.6-HexOS.iso](https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-25.04.2.6-HexOS.iso)
        -   SHA256 Checksum: `e8ed99a322affe0969b82b866161a9f6acbc1561e3cc7b2efb2bf120ffe2e856`
-   _(current as of 11/08/25)_

## Create Installation USB

-   Download Balena Etcher: [https://etcher.balena.io/#download-etcher](https://etcher.balena.io/#download-etcher)
    -   Install and open Etcher
    -   Select "Flash from File" and choose your downloaded ISO
    -   Select your target USB drive
    -   Click 'Flash!'

**Important**: Do not use Rufus - it causes issues for many users. Stick with Balena Etcher.

## Installation Process

-   Insert the USB into your server and power it on

### Boot Screen

-   Select "Start HexOS Installation" (default)
-   This screen will pass automatically after a moment

[![Boot Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG "Enlarge image")

### Installation Menu

-   After the system loads, choose option 1: "Install/Upgrade"

[![Installation Menu](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG "Enlarge image")

### Select Installation Drive

-   **Use arrow keys to navigate, spacebar to select your installation drive**
-   "**[*]**" indicates the device is selected

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
-   **Non-US keyboard users**: Be careful with special characters as the installer uses US keyboard layout. [See details here](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/page/2/#findComment-8073)

[![Root Password Setup](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG "Enlarge image")

### EFI Boot Options

-   Choose "Yes" for newer hardware (generally recommended)

[![EFI Boot Options](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG "Enlarge image")

### Installation Progress

-   The installer will run for a few minutes...

[![Installation Progress](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG "Enlarge image")

### Installation Complete

-   Remove the install USB and restart your server

[![Installation Complete](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG "Enlarge image")

## First Boot

### Boot Screen

-   The boot select screen will appear again - ignore it
-   The default option is correct and will auto-select

[![First Boot Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG "Enlarge image")

### System Startup

-   The console will display startup information
-   **Tip**: If boot fails, check your BIOS boot device order

[![System Startup](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.thumb.PNG.6a43deaa983d715784365f338659d44c.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.PNG.8d234b71bdcd3fbbdd5ad5389338e67f.PNG)

### Success!

-   **Installation complete!**
-   **Next step**: Head to [https://deck.hexos.com/](https://deck.hexos.com/) to configure your server
-   The "Console Setup" screen shows when HexOS is running properly

[![Console Setup Screen](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.thumb.PNG.44c581cd145b735c1ce98f591991f934.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.PNG.ad70047f68f85e17303c4c874af95fc1.PNG)