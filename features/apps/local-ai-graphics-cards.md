---
title: Graphics cards for Local AI
description: Which graphics cards can run local AI models on your HexOS server, and how much graphics memory you need
published: true
date: 2026-11-08T00:00:00.000Z
tags: apps, local ai, gpu, ollama
editor: markdown
dateCreated: 2026-11-08T00:00:00.000Z
---

# Graphics cards for Local AI

The Local AI collection runs AI models on your server's graphics card. How well it works depends on the card's maker, its age, and how much graphics memory it has. This page explains which cards HexOS can use and why some can't be picked yet.

When you set up Local AI, the graphics card step lists every card in your server. A card HexOS can't use says why under its name.

## Which cards work

| Card | Works with Local AI? | Good to know |
|---|---|---|
| NVIDIA GeForce RTX 20 series and newer, and the matching workstation cards | Yes | The best supported choice. |
| NVIDIA GeForce GTX 10 series and older (Pascal, Maxwell, Volta), and Tesla P4 or P40 | No | TrueNAS 25.10's NVIDIA driver doesn't run them for apps. See [Older NVIDIA cards](#older-nvidia-cards). |
| AMD Radeon RX 6800 and newer, RX 7000, RX 9000, and Radeon PRO W6000 or W7000 | Yes | About as fast as a similar NVIDIA card at writing answers. |
| Older AMD cards (RX 6700 and below, RX 5000, Vega, Polaris) | No | Ollama's AMD support doesn't include them out of the box. |
| AMD Ryzen AI Max (Strix Halo) | Yes | It shares the server's memory, and it's fast enough to be worth it. See [Cards that share memory](#cards-that-share-memory). |
| Intel Arc (A-series and B-series) | Not yet | See [Intel Arc](#intel-arc). |
| Graphics built into most processors (Intel UHD or Iris, AMD Radeon in most Ryzen chips) | No | They share the server's memory and run models slowly. |

## How much graphics memory you need

A model has to fit in the card's memory to run well. HexOS needs at least **4 GB** of graphics memory for Local AI, and **6 GB or more** is better.

Bigger models give better answers, and they need more memory. These are typical download sizes:

| Model size | Download |
|---|---|
| 4 billion parameters (4B) | about 2.5 GB |
| 8B | about 5 GB |
| 14B | about 9 GB |
| 32B | about 20 GB |
| 70B | about 43 GB |

The model also needs room for the conversation. Longer conversations and documents use more memory on top of the model's size. HexOS picks a model and a conversation length that fit your card, so you don't have to work this out yourself.

## Older NVIDIA cards

TrueNAS 25.10 uses NVIDIA's newer, open driver. That driver only supports cards from the RTX 20 series onward. Older cards, like a GTX 1060 or a Tesla P40, can't be used by apps on TrueNAS 25.10.

You still have two options:

- Give the card to a virtual machine. Our Plex VM is made for this.
- Replace the card with an RTX 20 series card or newer.

## AMD cards

HexOS runs AMD cards through AMD's ROCm software. Newer Radeon cards work well. An RX 7900 XTX writes answers about as fast as an RTX 3090 or RTX 4090 on small models.

## Cards that share memory

Graphics built into a processor have no memory of their own. They borrow the server's main memory, which is much slower than a graphics card's. Models run slowly on them, so HexOS doesn't offer them for Local AI.

AMD's Ryzen AI Max chips (Strix Halo) are the exception. Their memory is much faster, and a server can have up to 128 GB of it, so they can run large models well. HexOS gives Local AI up to half of the server's memory on these chips. The card step shows how much shared memory it will use.

## Intel Arc

Ollama, the app that runs Local AI, can use Intel Arc cards. HexOS doesn't offer them yet, for three reasons:

- HexOS can't yet read an Arc card's memory size in a reliable way. Without it, we can't pick a model that fits.
- Some models still give wrong answers or crash on Arc cards.
- Arc cards are slower at reading long prompts and documents than similar NVIDIA and AMD cards.

On TrueNAS 25.10, A-series cards are supported. B-series cards aren't confirmed yet, and they need Resizable BAR turned on in your server's BIOS.

We'll add Arc cards once they run our models reliably. If you're comfortable setting apps up yourself, you can install Ollama from the TrueNAS catalog with "Use all GPUs" turned on.

## Sharing a card with other apps

Apps like Plex and Jellyfin can use the same card for video. Local AI takes much of the card's memory while it answers, so very large models can leave little room for video.
