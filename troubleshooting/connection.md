---
title: Connection issues
description: Server not getting an IP address, discovery problems
published: true
date: 2026-08-20T19:30:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-20T18:00:00.000Z
---

# Connection issues

## Server fails to get an IP address

Network connectivity problems after installation:

1. **Physical connection**
   - Ensure ethernet cable is properly connected and working
   - Try a different ethernet cable
   - Check that network port LEDs are active

2. **Network equipment issues**
   - Try connecting to a different network port
   - Restart your router/switch
   - Check if other devices can get IP addresses

3. **Network configuration**
   - Some networks require manual IP configuration instead of DHCP
   - Check if your network uses static IP assignments
   - Verify network subnet and DHCP range

## Server discovery problems

If deck.hexos.com can't find your server:

1. **Network discovery requirements**
   - Server and browsing device must be on the same local network
   - Some corporate/guest networks block device discovery

2. **Firewall settings**
   - Check that your router/firewall isn't blocking mDNS discovery
   - Ensure ports 80, 443, and 5353 are not blocked

3. **Server status**
   - Verify the server has finished booting (wait 2-3 minutes)
   - Check server status lights/indicators
   - Try refreshing the discovery page

### First setup still cannot find your server

If you can open the TrueNAS dashboard but **Find my server** still shows no server after the checks above, [contact HexOS support](mailto:support@hexos.com). Tell us that you can reach TrueNAS and whether you have ever finished HexOS setup on this server. Support can check whether HexOS sees the installation on your account.

For a new installation where you have never finished setup, support may recommend a fresh install. You can reuse the same working HexOS installation USB without flashing it again.

> **Danger:** A fresh install erases the selected drive, including the current installation and its settings. If you have files, storage pools, apps or settings to keep, or you are unsure which drive holds HexOS, stop and ask support before continuing.
{.is-danger}

1. Plug the installation USB into the server and [boot from the USB](/getting-started/installation/InstallGuide#installation-process).
2. Follow the [installation steps](/getting-started/installation/InstallGuide#installation-menu). Choose only the drive that holds the new HexOS installation. Check its model and size before confirming erasure. If the installer offers an upgrade or a fresh install, choose the fresh install.
3. When installation succeeds, [remove the USB and restart](/getting-started/installation/InstallGuide#installation-complete). Wait for the server console to show its network address.
4. On a computer on the same network, sign in to [the Command Deck](https://deck.hexos.com) with your existing account and click **Find my server**. When the server appears, click **Claim** and [continue setup](/getting-started/setup/CompleteSetup#find-your-server). If it still does not appear, reply to support with what you see on the discovery screen.
