---
title: The Biggest HexOS Update Yet: Buddy Backups, Virtual Machines, and Beyond
description: Buddy Backups, VMs, the road to 1.1, the end of early access pricing, and what's up next for the team.
published: false
date: 2026-09-07T20:00:38.702Z
tags: buddy backups, virtual machines, roadmap
editor: markdown
dateCreated: 2026-09-07T20:00:38.702Z
---

# The Biggest HexOS Update Yet: Buddy Backups, Virtual Machines, and Beyond

We've shipped a lot lately: a built-in file browser, USB ISO burning, live per-app metrics, redesigned navigation, community translations, and a steady run of new curated apps. You can find the full rundown on our [release notes page](https://docs.hexos.com/release-notes/command-deck). This post is about what's next, and there's a lot to cover.

**TL;DR**

- Buddy Backups and Virtual Machines are beginning to roll out to test users now, with both targeted to be fully stable by the end of November.
- Together they make up HexOS 1.1, which ships on Black Friday. The $199 early access sale ends December 1, when standard pricing of $299 per server takes effect.
- We're building a new subscription option that bundles HexOS with premium support at a lower price of entry. Details to come.
- The file manager and app cards are both getting deeper integrations with the apps running on your server.
- Behind all of that, a big batch of new features is actively in development.

## Buddy Backups

If you've followed HexOS for a while, you know this one has been a long time coming. Buddy Backups let you back up your data to a server owned by someone you trust, whether that's a friend across town or a second HexOS box of your own in another location. No monthly per-terabyte bill. No giant cloud company holding your files. Just people backing each other up, on hardware they control.

We're starting to roll out access slowly, beginning with a small group of testers and expanding from there as the feature matures. Our target is to have Buddy Backups fully stable for everyone by the end of November.

Under the hood, the feature is built on ZFS and WireGuard, two of the most battle-tested technologies in their respective fields. We'll do a full deep dive on how it all fits together in our next blog post, so hold your technical questions for that one.

## Virtual Machines

Right alongside Buddy Backups, Virtual Machines will start reaching test users very soon.

We wanted VMs in HexOS to feel like everything else in HexOS: something you can set up without a tutorial open in another tab. So the whole process is wizard-driven, start to finish. Pick what you want to run, answer a few questions, and HexOS handles the configuration. You can even select apps to install automatically the moment the operating system finishes installing, so your VM is actually useful the first time you log into it.

VMs are organized into three categories:

- **Desktops** — a full graphical OS you can use like any other computer.
- **Servers** — headless systems for running services and workloads.
- **Virtual Appliances** — purpose-built images like OpenWRT or the Home Assistant VM, ready to run with minimal setup.

There's a lot more to say here, and VMs will get their own dedicated post as well.

## HexOS 1.1 ships on Black Friday

Buddy Backups and Virtual Machines are the core of HexOS 1.1, and 1.1 is landing on Black Friday. That's also when early access pricing wraps up. The $199 early access sale ends December 1, and standard pricing of $299 per server for a lifetime subscription takes effect.

We held off on this price increase for two reasons.

First, we didn't think it was right to ask for $299 before we'd delivered Buddy Backups and VMs. Those were commitments we made early on, and we wanted to keep them before changing the price.

Second, we wanted time to build a new ecommerce system that could support something other than a one-time purchase. Which brings us to the tease.

### A new way to get HexOS

We're developing a subscription option for HexOS. The idea is simple: one subscription that includes both the right to use HexOS and premium support from our team. It's designed to offer a lower price of entry for people who'd rather not pay for a lifetime subscription up front, and for people who want a direct line to us when they need help.

We don't have all the details ironed out yet, so we're going to hold off on specifics like pricing and timing until we do. But we wanted you to know it's coming, especially if you're weighing whether to buy before December 1.

## Deeper app integrations

One theme is going to show up again and again in HexOS over the coming months: the Command Deck shouldn't just launch your apps, it should work with them. Two places you'll see this first are the file manager and your app cards.

### A file manager that does more than move files

The file browser we shipped in August covers the essentials: browse, upload, download, copy, move, rename, delete. That's the foundation, not the finish line. We want the HexOS file manager to be a utility you reach for, not just a place to shuffle folders around.

It already does something most file browsers don't: burn ISO images directly to a USB drive plugged into your server. Next up are integrations with the apps you've already installed. Take FileFlows as an example. Instead of opening FileFlows, configuring a flow, and pointing it at a directory, you'd right-click a file in the HexOS file browser and convert it from MPG to MP4 on the spot. FileFlows does the work; HexOS gives you the button. That's the pattern we're building toward across all kinds of file tasks.

### App cards that show you what's happening inside

Today, an app card tells you an app is running and how much CPU and RAM it's using. We're turning those cards into widgets that surface what's actually going on inside the app.

Picture your dashboard showing what's playing in Jellyfin right now, what's queued and downloading, or who's connected to your game server, all at a glance, without opening any of them. Our vision is for the HexOS dashboard to be the one-stop panel for everything happening on your system, apps included. There's a lot more to unveil here as it comes together.

## What else is in the works

Beyond 1.1, the team is actively building a hardware analyzer and storage testing suite, cross-application linking that automates the API key handoffs between apps, more storage pool options like RAIDz2/3 and hot spares, our own Flash Creator tool for making HexOS boot media, and local "side-door" authentication so you can reach the Command Deck without a cloud login. No dates on these yet, but each will get its own spotlight as it gets closer.

Keep an eye out for the Buddy Backups deep dive next, and as always, tell us what you think in the community.

— Jon
