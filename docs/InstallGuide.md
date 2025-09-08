# Illustrated Installation Guide


**Install Guide:**

-   Start by downloading the installer iso from either link:
    -   [https://downloads.hexos.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso](https://downloads.hexos.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso) 
    -   [https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso](https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso "https://hexos-downloads.sfo3.cdn.digitaloceanspaces.com/TrueNAS-SCALE-24.10.2.2-HexOS.iso") 
        -   SHA256 Checksum:  
       - 0d3ee32e5ecf011da78ddcb49d0866478fb6a1ddfeddd563f458a23641c8d1c5
    -   _(current as of 6/26/25)_  
         
-   To flash to a USB you will need a copy of Balena Etcher.
    -   Download link: [https://etcher.balena.io/#download-etcher](https://etcher.balena.io/#download-etcher)
        -   Install, then open Etcher
        -   Select "Flash from File" and find your downloaded iso.
        -   Select the target USB drive you want to use for your install media
        -   Click 'Flash!'
    -   \* NOTE: Using Rufus to flash the installer is NOT recommended, and has been causing issues for many users.  
         
-   Once completed, insert the USB into the machine you will be installing HexOS on, and power on the machine.  
     
-   The first screen that requests input is this.
    -   Select "Start HexOS Installation" (default)
    -   _(This screen will pass automatically after a moment)_
    -   [![Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture.PNG.68aa841b48189723e75377b4eae0e4f5.PNG "Enlarge image")

-   Next, you will see the console do console things for a bit, then it will ask what you want to do.
    -   We want option 1. "Install/Upgrade"
    -   [![Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture2.PNG.0632104eaf1d3158bd759f4a8b595244.PNG "Enlarge image")

-   Next up, Where do you want to install the OS?
    -   **Use the arrow keys to navigate to the correct drive, press the space bar to select it.**
    -   _"**\[\*\]**" Indicates that the device has been selected._
    -   [![Capture3.PNG.8efa34d929a7a8dd6e148ebc17172509.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture3.PNG.8efa34d929a7a8dd6e148ebc17172509.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture3.PNG.8efa34d929a7a8dd6e148ebc17172509.PNG "Enlarge image")

-   Next, you will confirm that you understand that the drive(s) you selected will be FULLY ERASED.
    -   [![Capture4.PNG.20de862b21fdbe599a413abfc6bc5db6.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture4.PNG.20de862b21fdbe599a413abfc6bc5db6.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture4.PNG.20de862b21fdbe599a413abfc6bc5db6.PNG "Enlarge image")

-   **OK, This is the weird one!** 
    -    We want the first option**; "Administrative user (truenas\_admin)"**
        -   _[If you selected the 2nd option please see Pduncharme's reply below for a solution!](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/#findComment-1958)_
            -   _An alternative solution would be to re-start the install. Not ideal, but it also doesn't take all that long._
    -   _(this screen will likely be removed in later versions of the installer)_
    -   [![Capture5.PNG.f7af55f85dc45fff3932704006737410.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture5.PNG.f7af55f85dc45fff3932704006737410.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture5.PNG.f7af55f85dc45fff3932704006737410.PNG "Enlarge image")

-   Next we need to set the root password for the TrueNAS install that underpins HexOS.
    -   Be sure not to loose this, you will need it later when adopting your server on Deck.HexOS.com
    -   **\*NOTE\*: If you use a NON US KEYBOARD please be cautious about special characters, as the installer defaults to a US keyboard layout!**
        -   _[See this comment for details.](https://hub.hexos.com/topic/103-illustrated-installation-guide-start-here/page/2/#findComment-8073)_
    -   [![Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture6.PNG.2757a99cb3d6eff2456fae08f5d8af22.PNG "Enlarge image")

-   Next, EFI Boot optons. Generally, "Yes" should be fine for newer hardware.
    -   [![Capture7.PNG.882149a9a6a418c51547772762cab939.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture7.PNG.882149a9a6a418c51547772762cab939.PNG "Enlarge image")

-   Next, the installer will do installer things for a few minutes...
    -   [![Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture8.PNG.415546fcc3c0eddfc6051012a28c8a7e.PNG "Enlarge image")

-   Then you should be greeted by this screen.
    -   You can now remove the install USB and restart your server.
    -   [![Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture9.PNG.b01ff55fcd882a5612dd01b299807662.PNG "Enlarge image")

-   After restarting, you should see a boot select screen again.
    -   You can ignore this. The default option is the right one, and it will pass after a few seconds
    -   [![Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture10.PNG.6dd4a02dcdb72261ad0857b5af351bb1.PNG "Enlarge image")

-    Next, the console will got displaying stuff  along these lines while starting up the server.
    -   _Tip: If your server fails to start booting TrueNAS/HexOS you may need to get into the bios and check your boot device order._
    -   [![Capture11.thumb.PNG.6a43deaa983d715784365f338659d44c.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.thumb.PNG.6a43deaa983d715784365f338659d44c.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture11.PNG.8d234b71bdcd3fbbdd5ad5389338e67f.PNG)

-   If you you made it here, CONGRATS! Your install is complete!
    -   **H****ead to [https://deck.hexos.com/](https://deck.hexos.com/) to configure your server!**
    -   _(The "Console Setup" screen is the default display when TrueNAS/HexOS is running.)_
    -   [![Capture12.thumb.PNG.44c581cd145b735c1ce98f591991f934.PNG](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.thumb.PNG.44c581cd145b735c1ce98f591991f934.PNG)](https://hub.hexos.com/uploads/monthly_2024_11/Capture12.PNG.ad70047f68f85e17303c4c874af95fc1.PNG)

  
  
  

