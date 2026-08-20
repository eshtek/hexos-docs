---
title: Connection issues
description: Server not getting an IP address, discovery problems
published: true
date: 2026-08-20T18:00:00.000Z
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
