---
title: VM console and remote access
description: Find the local HexOS interface, proxy the VM console, and troubleshoot console authentication
published: true
date: 2026-10-22T01:20:00.000Z
tags: vm, console, local access, remote access, reverse proxy
editor: markdown
dateCreated: 2026-10-22T01:20:00.000Z
---

# VM console and remote access

The VM console runs on your HexOS server. Your browser connects to the server to carry the screen, keyboard, mouse, and sound. Console video does not pass through the hosted Command Deck or use Eshtek's relay bandwidth.

To use it away from your home network, your browser needs a route to the server. You can provide that with a VPN or a reverse proxy, such as Nginx. A VM's **Web UI** or Remote Desktop connection is a separate service and may need its own network configuration.

## Local HexOS interface ports

The HexOS interface runs alongside the TrueNAS interface. The default ports on the NAS are:

| Port | Service | Use |
| --- | --- | --- |
| TCP 43705 | HTTPS | The local HexOS interface, API, and VM console |
| TCP 43706 | HTTP | An upstream for a reverse proxy on a trusted network |

The local HTTPS address normally uses a generated hostname ending in `.local.hexos.com`, followed by `:43705`. This hostname resolves to your server's local address. Being able to reach the hosted Command Deck does not mean your browser can reach that address.

If your proxy handles HTTPS for your own domain, its upstream can be `http://NAS-IP:43706`. Replace `NAS-IP` with your NAS's local address. You can also use the HTTPS upstream on port 43705; configure your proxy to send the generated hostname as the TLS server name and verify its certificate.

> **Warning:** Keep the HTTP upstream on a trusted network. Use HTTPS for the browser-facing address and retain HexOS authentication. A VPN lets you reach the local interface without publishing it on the internet.
{.is-warning}

## Reverse proxy requirements

A console needs more than a forwarded port. Configure your proxy to:

- Forward requests to the HexOS service on the NAS, rather than to the hosted Command Deck or the TrueNAS interface.
- Preserve the full path and query string, including the `t` parameter in a console launch link.
- Forward WebSocket upgrades for `/vm-console/<vm-id>/stream`. In Nginx, enable HTTP/1.1 to the upstream and forward the `Upgrade` and `Connection` headers for WebSocket requests.
- Pass cookies and `Set-Cookie` headers through. Keep the console page, its assets, and its WebSocket connections on the same browser-facing hostname.
- Forward the original scheme, for example `X-Forwarded-Proto: https` when the proxy terminates HTTPS.
- Send all console requests for a NAS to the same HexOS process. Launch tokens and sessions are held by that process and are lost when it restarts.

Proxy the interface at the domain root. The console uses absolute paths beginning with `/vm-console/`, so placing it under a prefix such as `/hexos/` requires additional rewriting and is not covered here. The console does not require a separate public SPICE port.

### Launching through your own domain

In HexOS, open a VM's details and use **Connect**. If a VM has more than one connection option, choose **Console** from the menu.

When copying a console link to use with your proxy, right-click **Connect** or **Console** and copy its full link. Preserve the path and the complete query string when replacing the origin with your own domain. Copying only the port or VM number leaves out the authentication token.

> **Info:** Some HexOS releases disable **Connect** if the generated local-access hostname cannot be reached, even when your proxy can reach the console. A platform fix is in progress to recognize the current NAS backend through a custom domain and refresh the token on each normal launch. Until that update reaches your server, launch from a reachable local interface or VPN and copy a fresh full link for your proxy.
{.is-info}

For Nginx examples, see the official [WebSocket proxying documentation](https://nginx.org/en/docs/http/websocket.html).

## Console links and authentication

The link includes a temporary, single-use token. It expires after 30 minutes. When opened successfully, it creates a session cookie for that hostname and VM, valid for up to 12 hours. A HexOS restart invalidates the token and session sooner.

A browser does not share this cookie between your NAS's generated hostname and your own domain. If you open a link on one hostname and then try the same link on another, the second request may have neither a usable token nor a session cookie. Launch a new link for the hostname you intend to use.

Treat an unused console link as a temporary credential. Do not post it publicly or share it with anyone who should not control that VM.

### Not authenticated

If the page says **Not Authenticated** and asks you to open the console from HexOS, return to the VM details and launch again. If necessary, refresh the details first to obtain a new token. Check that your proxy preserves the `t` query parameter and allows the console session cookie.

This message alone does not mean remote access is blocked. It means the request did not provide a valid launch token or console session.

### Console session expired

Close the console tab and launch it again from HexOS. This can happen after a server update, a HexOS restart, or a long-running session.

### The page loads, but the screen will not connect

Check WebSocket forwarding to `/vm-console/<vm-id>/stream`, cookie handling, and whether the VM is running. A proxy that forwards only ordinary HTTP requests can display the page while blocking its screen connection.

[Back to VMs](/features/vms#connecting)

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
