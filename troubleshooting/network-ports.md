---
title: Network ports
description: What ports 43705 and 43706 are for, and whether it is safe to block them
published: true
date: 2026-08-22T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-22T00:00:00.000Z
---

# Network ports

HexOS listens on two TCP ports on your server:

| Port | Protocol | Purpose |
| --- | --- | --- |
| `43705` | HTTPS | Local dashboard access. This is the port your browser uses, and the one the `*.local.hexos.com` certificate is issued for. |
| `43706` | HTTP | Startup and recovery listener, and the entry point for a user-supplied reverse proxy. |

## Port 43705 (HTTPS)

This is the port for normal local access to your HexOS dashboard. Your server's `*.local.hexos.com` address resolves to your server's LAN IP on this port, and the connection is encrypted with a valid public certificate.

If you access HexOS through [deck.hexos.com](https://deck.hexos.com), nothing on your LAN needs to be reachable at all — that connection is established outbound from your server.

## Port 43706 (HTTP)

This is the plain-HTTP listener. It exists for two reasons:

1. **Startup and recovery.** It is the port HexOS comes up on before a valid certificate is present — for example during a fresh install, or if a certificate has to be re-issued. Once the certificate is in place, `43705` is what you use.

2. **Bring-your-own reverse proxy.** If you would rather terminate TLS yourself, this is the port you point your proxy at.

**It does not serve the dashboard over plain HTTP.** Browser page loads on `43706` are refused with an "HTTPS required" response rather than being served, which is why you will not see any real traffic to this port during normal use.

Port `43706` is **not** used for discovery, pairing, or the connection between your server and HexOS.

## Can I block port 43706?

Yes — with one boundary: block it at your firewall or on your LAN, but leave it reachable on the server itself.

If you only ever reach HexOS over HTTPS on `43705` or through deck.hexos.com, restricting `43706` at the network level will not affect day-to-day operation.

> **Warning:** Do not disable the listener on the box itself. If local access ever stops working after a reinstall or a certificate change, temporarily allowing `43706` again is the quickest way back in, and it is useful to have available if you contact support.
{.is-warning}

## Why are both ports bound to all interfaces?

HexOS binds both listeners the same way, and `43706` in particular is bound broadly so that the reverse-proxy case above works when the proxy is not running on the same host.

There is currently no setting to restrict which interface HexOS binds to. If that would be useful for your environment, let us know on the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).

## Summary

- Use `43705` for local access.
- Firewall `43706` off your LAN if you prefer — nothing in normal operation depends on reaching it remotely.
- Leave `43706` working on the server itself so first-boot, certificate recovery, and support access keep functioning.
