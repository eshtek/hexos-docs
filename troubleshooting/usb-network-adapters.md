---
title: USB network adapters
description: Why HexOS warns about USB network adapters and what to use for a server instead
published: true
date: 2026-09-22T00:00:00.000Z
tags: troubleshoot, network, usb, hardware
editor: markdown
dateCreated: 2026-09-21T00:00:00.000Z
---

# USB network adapters

HexOS warns when your server's network connection runs through a USB adapter. The **Network** card on your dashboard turns amber. Click the card to open its info panel, which shows one line: **This device has known issues**. Click **See details** to read the warning.

A USB adapter is fine for occasional use, and on some small computers it is the only option. It is a poor fit for a server, which moves large amounts of data for hours at a time.

## Realtek USB adapters

**Which adapters:** Adapters built on the Realtek RTL8156 (2.5 gigabit) and RTL8153 (1 gigabit) chips. Most USB network adapters sold today use one of these.

**The problem:** The community has reported that these adapters overheat and drop their link during long transfers. Speeds on TrueNAS have been measured at a fraction of what the same adapter reaches on a desktop computer. It is fine for occasional use.

## Any USB adapter

**The problem:** USB network adapters in general have been reported to disconnect under sustained load on TrueNAS. The USB plug has no latch and can work loose, the adapter shares its USB port with everything else on that controller, and the drivers see less testing than those for cards inside the server.

## The recommended fix

For a server, use a network card that plugs into a slot inside the computer. See [what to buy instead](/troubleshooting/network-cards#what-to-buy-instead) for the cards that work well with TrueNAS.

> **Tip:** Keep the USB adapter as a spare. It is a good way to reach a server whose main network card has failed, or to update TrueNAS when the built-in card has no driver yet.
{.is-tip}

## After you change the adapter

1. Shut the server down from the HexOS power menu and install the new card.
2. Start the server. HexOS reads the parts again and the warning disappears on its own.
3. If the server does not reconnect to the network, follow [Connection issues](/troubleshooting/connection).
