---
title: Direct connections at home
description: Point your router's DNS at your HexOS server so devices at home reach your Anywhere addresses at full speed, with steps for common routers
published: true
date: 2026-11-17T00:00:00.000Z
tags: hexos anywhere, remote access, direct connection, dns, router, asus, tp-link, unifi, eero, google nest, netgear, gl.inet, openwrt, icloud private relay
editor: markdown
dateCreated: 2026-11-17T00:00:00.000Z
---

# Direct connections at home

> **Info:** Direct connections at home are part of [HexOS Anywhere](/features/remote-access). We are still rolling this out. If you don't see the switch described below, your server doesn't have it yet.
{.is-info}

An Anywhere address, such as `https://jellyfin.k7pqm4tz.relay.hexos.com`, normally leads to our relay. That is true even when you are sitting next to your server. A film you play in the living room leaves your home, crosses the relay at 10 Mbit/s, and comes back.

With a direct connection, a device at home goes straight to your server instead. The address stays the same. The connection runs at the full speed of your home network, and your server doesn't ask for the Anywhere password or PIN code.

To set it up, you turn on one switch in the Command Deck and change one setting in your router.

## What DNS is, and why your server can do it

Every device on the internet has a number for an address, such as `203.0.113.7`. Names like `hexos.com` are for people. DNS is the service that looks up the number for a name. It works like the contacts list on your phone: you pick a name, and the phone finds the number.

Your router tells every device in your home which DNS server to ask. Usually that is one run by your internet provider. It gives everyone the same answer for your Anywhere addresses: the relay.

Your HexOS server can be the DNS server for your home instead. When a device asks for one of your Anywhere addresses, your server answers with its own address on your home network. It passes every other question on to a regular DNS server, so the rest of the internet works as before.

People run a DNS server at home for other reasons too:

- A DNS server can block ads and trackers for every device in the home. AdGuard Home and Pi-hole are apps that do this.
- A DNS server can filter content, such as adult websites on a family network.
- A DNS server can give your own devices simple names.

## Before you start

> **Requirement:** Give your server a reserved IP address in your router, so the address never changes. Most routers call this a DHCP reservation or a static lease. If the address changes later, your router keeps asking the old one.
{.is-success}

You also need at least one app with **Anywhere** turned on. See [Turn on HexOS Anywhere for an app](/features/remote-access#turn-on-hexos-anywhere-for-an-app).

## Turn it on in the Command Deck

1. Open **Settings** > **Anywhere** > **Overview**.
2. Turn on **Enable direct connections at home**.
3. The Command Deck may ask to move TrueNAS's web interface to new ports. Your apps have to answer on the standard web ports, and TrueNAS uses them on a new server. Check the box and click **Turn on**.
4. The card now shows the address to use, for example "Set 192.168.1.50 as the primary DNS server in your router." Write this address down.

After the move, opening your server's IP address in a browser shows a HexOS page with links to the Command Deck, TrueNAS and your apps.

## Change the DNS servers in your router

Most routers have two DNS fields, usually named primary and secondary. The primary is the address the Command Deck showed you. The secondary is a public DNS server: use `1.1.1.1` (Cloudflare), `8.8.8.8` (Google) or `9.9.9.9` (Quad9).

> **Warning:** Always fill in the secondary DNS server. Without it, your server is the only DNS server in your home. If it is turned off, restarting or updating, no device in your home can open any website.
{.is-warning}

Devices pick up the change the next time they join the network. To speed that up, turn Wi-Fi off and on again on the device, or restart it.

## Steps for common routers

Menu names change between models and firmware versions. If yours looks different, look for **DNS** under the **LAN**, **DHCP** or **Internet** settings.

### ASUS

1. Open `http://www.asusrouter.com` in a browser and sign in.
2. Open **LAN** > **DHCP Server**.
3. Under **DNS and WINS Server Setting**, type your server's address in **DNS Server 1** and the public DNS server in **DNS Server 2**.
4. Click **Apply**.

Some older firmware has only one **DNS Server** field. Type your server's address there. The router also hands out its own address as a second DNS server, so your home still has a backup.

[ASUS: set up the DHCP server](https://www.asus.com/support/faq/1011703/)

### TP-Link

On an Archer router:

1. Open `http://tplinkwifi.net` in a browser and sign in.
2. Open **Advanced** > **Network** > **DHCP Server**.
3. Type your server's address in **Primary DNS** and the public DNS server in **Secondary DNS**.
4. Click **Save**, then restart the router.

On a Deco, use the Deco app while your phone is on the Deco's Wi-Fi:

1. Tap **More** > **Advanced** > **DHCP Server**.
2. Type your server's address in **Primary DNS** and the public DNS server in **Secondary DNS**.
3. Tap **Save**, then restart the main Deco.

[TP-Link: use a local DNS server](https://www.tp-link.com/us/support/faq/3230/) · [Change DNS settings on a Deco](https://www.tp-link.com/us/support/faq/1855/)

### Ubiquiti UniFi

1. In UniFi Network, open **Settings** > **Networks** and select your home network, usually **Default**.
2. Under **DHCP Service Management**, find **DNS Server** and turn off **Auto**.
3. Type your server's address first and the public DNS server second.
4. Click **Apply Changes**.

Repeat this for each network whose devices should connect directly.

### eero

1. In the eero app, tap **Settings** > **Advanced networking** > **DNS**.
2. Select **Custom DNS**.
3. Type your server's address as the first IPv4 address and the public DNS server as the second.
4. Tap **Save**. Your network restarts, which takes a minute or two.

With eero Plus, **Custom DNS** is grayed out while Advanced Security, Ad Blocking or a content filter is on. Turn those off first.

[eero: set up custom DNS servers](https://support.eero.com/hc/articles/360059988432)

### Google Nest Wifi and Google Wifi

1. In the Google Home app, tap **Wifi**.
2. Tap **Network settings** > **Advanced networking** > **DNS**.
3. Select **Custom**.
4. Type your server's address as the primary server and the public DNS server as the secondary server.
5. Tap **Save**.

Google's routers block DNS answers that point to an address inside your home while they use the automatic DNS setting. Google says that choosing **Custom** turns this protection off, so there is nothing else to change.

[Google: change your DNS server](https://support.google.com/googlenest/answer/6274141) · [DNS rebinding protection](https://support.google.com/googlenest/answer/9144137)

### Netgear

1. Open `http://www.routerlogin.net` in a browser and sign in. On an Orbi, use `http://orbilogin.net`.
2. Click **Internet**.
3. Under **Domain Name Server (DNS) Address**, select **Use These DNS Servers**.
4. Type your server's address in **Primary DNS** and the public DNS server in **Secondary DNS**.
5. Click **Apply**.

NETGEAR Armor and Smart Parental Controls can lock this setting. Turn them off to change it. Some Netgear models don't accept a DNS server that is inside your home network. We haven't confirmed which ones. If yours refuses the address, set the DNS servers on each device instead.

[Netgear: set DNS servers on your router](https://kb.netgear.com/30510/How-do-I-set-static-Domain-Name-System-servers-on-my-NETGEAR-router)

### GL.iNet

1. Open `http://192.168.8.1` in a browser and sign in.
2. Open **Network** > **DNS**.
3. Set **Mode** to **Manual DNS**.
4. Type your server's address first and the public DNS server second.
5. Turn off **DNS Rebinding Attack Protection**. This protection throws away any answer that points to an address inside your home, which is the answer your server gives.
6. Click **Apply**.

If the router runs a VPN, also turn on **Allow Custom DNS to Override VPN DNS**.

[GL.iNet: DNS settings](https://docs.gl-inet.com/router/en/4/interface_guide/dns/)

### OpenWrt

1. Open your router's address in a browser, usually `http://192.168.1.1`, and sign in to LuCI.
2. Open **Network** > **Interfaces** and click **Edit** next to **lan**.
3. Open the **DHCP Server** tab, then **Advanced Settings**.
4. In **DHCP-Options**, type `6,192.168.1.50,1.1.1.1`. Replace `192.168.1.50` with your server's address. The `6` tells devices that the addresses after it are DNS servers.
5. Click **Save**, then **Save & Apply**.

With this setting your devices ask your server themselves, so OpenWrt's own rebind protection doesn't get in the way.

[OpenWrt: DHCP and DNS configuration](https://openwrt.org/docs/guide-user/base-system/dhcp_configuration)

### Other routers

Look for the DNS setting under **LAN** or **DHCP** first. That setting tells your devices to ask your server themselves. If your router only has a DNS setting under **Internet** or **WAN**, use that one. The router then asks your server on behalf of your devices.

If your router has no DNS setting you can change, you can set the DNS servers on each device, in its own network settings.

## Check that it works

On a phone or computer at home, reconnect to Wi-Fi. Then open one of your Anywhere addresses in a browser. If the app opens without asking for the Anywhere password or PIN code, the connection is direct.

## Good to know

### Devices that skip your server's DNS

Some devices don't ask the DNS server your router gives them. These devices still reach your apps. They go through the relay, as they did before, so they are limited to 10 Mbit/s and asked to sign in.

iCloud Private Relay is the most common case. An iPhone, iPad or Mac with Private Relay on sends its DNS questions to Apple, not to your server. To connect directly, turn off **Limit IP Address Tracking** for your home Wi-Fi. On an iPhone or iPad, open **Settings** > **Wi-Fi** and tap the info button next to your network. On a Mac, open **System Settings** > **Network** > **Wi-Fi** and click **Details** next to your network. Private Relay stays on for every other network. See [Apple's guide](https://support.apple.com/en-us/102022).

| The device uses | To connect directly |
|---|---|
| Secure DNS in a browser. Firefox uses it by default in some countries. Chrome and Edge use it when a provider is picked under **Use secure DNS**. | Turn it off in the browser's privacy settings. |
| Private DNS on Android, set to a named provider | Set **Private DNS** to **Automatic**. |
| A VPN app | Disconnect the VPN while you are at home. |
| A DNS server built into the device, as on some streaming sticks and smart TVs | This can't be changed. The device keeps using the relay. |
| An IPv6 DNS server from your internet provider | Some devices ask that server first. Those visits go through the relay. |

### The secondary DNS server

A device can ask the secondary server even while your server is running. When it does, that visit goes through the relay. If you use a DNS server to block ads, some ads get through for the same reason. We still recommend the secondary server: a slower visit is better than a home without internet.

### AdGuard Home and Pi-hole on the same server

An AdGuard Home or Pi-hole app needs port 53 on your server, and so does the direct connection. They can't run on the same server at the same time. The card shows "Another app on this server is using port 53. Stop that app to use this."

### DNS rebinding protection

Some routers throw away DNS answers that point to an address inside your home. If your Anywhere addresses stop opening at home after the change, turn this protection off in your router.

### Guest networks

A device on a guest network usually can't reach your server, so it can't ask it for DNS. Keep the guest network on the router's usual DNS servers.

## Turn it off

1. Change the DNS servers in your router back first. On most routers, that means choosing the automatic setting again.
2. In **Settings** > **Anywhere** > **Overview**, turn off **Enable direct connections at home** and click **Turn off**.

> **Warning:** Change your router back before you turn the switch off. A device that still asks only your server won't be able to open any website.
{.is-warning}

TrueNAS's web interface stays on its new ports. You can move it back in **Settings** > **TrueNAS**.

> **Help:** If your apps don't open directly after these steps, or your router isn't listed, [ask us on Discord](https://discord.com/invite/DjEp3WRHKz).
{.is-troubleshooting}

[Back to HexOS Anywhere](/features/remote-access)
