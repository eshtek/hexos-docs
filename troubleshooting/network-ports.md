---
title: Network ports
description: What ports 43705 and 43706 are for, and whether it is safe to block them
published: true
date: 2026-09-22T00:00:00.000Z
tags: troubleshoot, network
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

If you access HexOS through [deck.hexos.com](https://deck.hexos.com), nothing on your LAN needs to be reachable. Your server opens that connection itself, from the inside.

## Port 43706 (HTTP)

This is the plain-HTTP listener. It exists for two reasons:

1. **Startup and recovery.** HexOS uses this port when it starts and no valid certificate is present yet. For example, during a fresh install, or when a certificate has to be issued again. Once the certificate is in place, `43705` is what you use.

2. **Bring-your-own reverse proxy.** If you run your own reverse proxy and it handles the HTTPS encryption, point it at this port.

**It does not serve the dashboard over plain HTTP.** A browser that opens a page on `43706` gets an "HTTPS required" response instead of the dashboard. That is why you will not see any real traffic to this port during normal use.

Port `43706` is **not** used for discovery, pairing, or the connection between your server and HexOS.

## Can I block port 43706?

Yes, with one limit: block it at your firewall or on your LAN, but leave it reachable on the server itself.

If you only ever reach HexOS over HTTPS on `43705` or through deck.hexos.com, restricting `43706` at the network level will not affect day-to-day operation.

> **Warning:** Do not turn off the listener on the server itself. If local access stops working after a reinstall or a certificate change, allowing `43706` again for a short time is the quickest way to reach your server. Support may also ask you to use it.
{.is-warning}

## Why are both ports bound to all interfaces?

HexOS binds both listeners the same way. Port `43706` listens on every interface so that a reverse proxy on a different computer can reach it.

There is currently no setting to restrict which interface HexOS binds to. If that would be useful for your environment, let us know on the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).

## Summary

- Use `43705` for local access.
- Block `43706` at your firewall if you prefer. Nothing in normal use needs to reach it from another computer.
- Leave `43706` working on the server itself, so first boot, certificate recovery and support access keep working.
