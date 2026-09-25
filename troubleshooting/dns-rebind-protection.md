---
title: DNS rebind protection
description: Why your router can block local access to your server, and how to allow it
published: true
date: 2026-09-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-09-25T00:00:00.000Z
---

# DNS rebind protection

If HexOS shows a **Network** message saying your router is blocking local access to your server, a router setting called DNS rebind protection is stopping your server's local address from working.

Everything still works through the hosted Command Deck at [deck.hexos.com](https://deck.hexos.com). Only local access is affected: connecting straight to your server from your home network, which is faster.

## What is happening

HexOS gives your server its own web address ending in `.local.hexos.com`, for example `abc123.local.hexos.com`. That address points to your server's IP address on your home network, such as `192.168.1.20`, so your browser can connect to your server directly over HTTPS on port `43705`. See [Network ports](/troubleshooting/network-ports) for more about that port.

DNS rebind protection is a security feature in many routers. It blocks any internet address that points to a device on your home network, because a harmful website can use an address like that to reach devices on your network through your browser. The router cannot tell your HexOS server's address apart from an attack, so it blocks it too, and your browser cannot find your server locally.

HexOS checks for this automatically every six hours, and again a few minutes after your server starts. When it finds the block, it shows the warning.

## How to fix it

There are two ways to fix it:

1. **Add an exception for `local.hexos.com`.** This is the better fix, because the protection stays on for every other address. Every HexOS server's local address ends in `local.hexos.com`, so one exception covers all of your servers. Routers call this list different things, for example "exceptions", "allowed domains", "private domains" or "whitelist".
2. **Turn off DNS rebind protection.** Do this if your router has no exception list.

The warning's **Router settings** link opens your router's settings page. Find your router below for the steps.

## Steps for common routers

### FRITZ!Box

DNS rebind protection is always on in a FRITZ!Box and cannot be turned off, so add an exception.

1. Go to **Home Network** > **Network** > **Network Settings**.
2. Click **Change Advanced Network Settings**, open the **DNS Rebind Protection** tab and click **Add Exception**. On older FRITZ!OS versions, the **Host name exceptions** box is directly on the **Network Settings** tab.
3. Enter `local.hexos.com` and click **Apply**.
4. Restart the FRITZ!Box: **System** > **Backup** > **Restart FRITZ!Box** > **Restart**.

> **Tip:** AVM asks for full host names in this list. If the warning stays, also add your server's full local address, such as `abc123.local.hexos.com`. With **Expert Mode** on, it is shown as the **Local Access URL** in **Settings** > **Preferences** > **Advanced Settings**.
{.is-tip}

### OpenWrt

The setting is in a different place depending on your OpenWrt version:

- OpenWrt 25.12 and later: **Network** > **DNS** > **Filter** tab
- OpenWrt 22.03 to 24.10: **Network** > **DHCP and DNS** > **Filter** tab
- OpenWrt 21.02 and earlier: **Network** > **DHCP and DNS** > **General Settings** tab

To add an exception, add `local.hexos.com` under **Domain whitelist** and click **Save & Apply**. To turn the protection off instead, clear the **Rebind protection** checkbox.

### GL.iNet

Turn off **DNS Rebinding Attack Protection**. The GL.iNet interface has no exception list. Where to find it:

- Firmware 4.11 and later: **DNS** > **Options**
- Firmware 4.10 and earlier: **NETWORK** > **DNS**
- Firmware 3.x: **MORE SETTINGS** > **Custom DNS Server**

### pfSense

pfSense has two DNS services. Most setups use the DNS Resolver.

**DNS Resolver:** go to **Services** > **DNS Resolver** > **General Settings**, click **Display Custom Options**, and add these lines to **Custom options**. Click **Save**, then **Apply Changes**.

```
server:
private-domain: "local.hexos.com"
```

**DNS Forwarder:** go to **Services** > **DNS Forwarder** and add this line to **Custom options**:

```
rebind-domain-ok=/local.hexos.com/
```

To turn the protection off instead, go to **System** > **Advanced** > **Admin Access** and select the **Disable DNS Rebinding Checks** checkbox. This also turns off a similar check that protects the pfSense web interface.

### OPNsense

Go to **Services** > **Unbound DNS** > **Advanced**, add `local.hexos.com` to **Private Domains**, and save.

To turn the protection off instead, go to **System** > **Settings** > **Administration** and select the **Disable DNS Rebinding Checks** checkbox. This also turns off a similar check that protects the OPNsense web interface.

### DD-WRT

Go to **Services** > **Services** and find the **Dnsmasq Infrastructure** section. Add this line to **Additional Options**, then click **Save** and **Apply Settings**:

```
rebind-domain-ok=/local.hexos.com/
```

To turn the protection off instead, set **No DNS Rebind** to **Disable**.

### ASUS

Go to **WAN** > **Internet Connection** > **WAN DNS Setting**, set **Enable DNS Rebind protection** to **No**, and click **Apply**. The standard ASUS firmware has no exception list.

If your router runs Asuswrt-Merlin, you can add an exception instead:

1. Go to **Administration** > **System** and set **Enable JFFS custom scripts and configs** to **Yes**.
2. Create the file `/jffs/configs/dnsmasq.conf.add` with this line:
   ```
   rebind-domain-ok=/local.hexos.com/
   ```
3. Restart the router, or run `service restart_dnsmasq`.

### Ubiquiti UniFi

UniFi gateways have no DNS rebind protection setting. If you see the warning on a UniFi network, the block usually comes from a DNS service your network uses, such as NextDNS or OpenDNS. See the services below.

### Firewalla

Firewalla only blocks these addresses when you use its **Unbound** DNS service. Connect to your Firewalla over SSH, create a file in the `~/.firewalla/config/unbound_local/` folder with these lines, then run `sudo systemctl restart unbound`:

```
server:
private-domain: "local.hexos.com"
```

## Steps for DNS services and filters

### NextDNS

On the **Allowlist** tab, add `local.hexos.com`. Allowing a domain in NextDNS also allows everything under it, and it takes priority over the security settings. You can also turn off DNS rebinding protection on the **Security** tab.

### Control D

Go to **Profiles**, open the profile your network uses, and turn off **DNS Rebind Protection** on the **Profile Options** tab.

### OpenDNS

Go to **Settings** > **Security** and clear the **Block internal IP addresses** checkbox. OpenDNS has no exception list for this setting.

### AdGuard Home

AdGuard Home only blocks these addresses if you added a DNS rebind protection blocklist, such as **HaGeZi's DNS Rebind Protection**. Go to **Filters** > **Custom filtering rules** and add this rule:

```
@@||local.hexos.com^
```

### Pi-hole

Pi-hole does not block these addresses unless someone added `stop-dns-rebind` to its settings. If that line is there, add this line in the same place, then restart Pi-hole's DNS:

```
rebind-domain-ok=/local.hexos.com/
```

In Pi-hole v6, custom lines like these live in `misc.dnsmasq_lines` in `/etc/pihole/pihole.toml`.

> **Info:** Pi-hole passes questions it can't answer to another DNS server, often your router or a service like NextDNS. If Pi-hole has no rebind setting, check that server instead.
{.is-info}

## Check that it worked

After you save the change on your router, open the warning again and click **Check connection**. HexOS asks your router straight away:

- **Looks good now** means local access works. The warning closes.
- **Still blocked** means the router is still blocking the address. Check that you saved the change, and see [Still blocked](#still-blocked) below.
- **Couldn't check right now** means HexOS could not get an answer from your router. Try again in a few minutes.

If you don't check, the warning goes away by itself after the next automatic check.

> **Tip:** Your computer can remember the old, blocked answer for a few minutes. If local access still doesn't open after the warning has closed, wait a few minutes or restart your browser.
{.is-tip}

## Still blocked

- **Another DNS filter is also blocking it.** If your network uses Pi-hole, AdGuard Home, NextDNS or a similar service, it may have its own rebind protection. Add the same exception there. The steps above include the common ones.
- **Your router has two DNS settings.** Some routers apply the setting separately to their DNS server and to a DNS forwarder, or once per network. Check each one.
- **You can't change the setting.** Some internet provider routers don't show it at all. Local access won't work behind them, but the hosted Command Deck at [deck.hexos.com](https://deck.hexos.com) keeps working as normal.

> **Help:** If the warning stays after you have changed your router settings, ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) and tell us your router model.
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
