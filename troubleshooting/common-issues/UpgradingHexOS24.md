---
title: Upgrading HexOS with TrueNAS 24.10.0 to TrueNAS 25.10.3
description: 
published: true
date: 2026-06-09T20:05:45.194Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:52.526Z
---

# Upgrading HexOS with TrueNAS 24.10.0 to TrueNAS 25.10.3

## Overview

- With the HexOS update to 1.0 with Local UI any system still running older versions will need to upgrade TrueNAS to work with HexOS 1.0. 
- This guide only applies to users on `TrueNAS SCALE version 24.10.2.1` or older.
- If you can access HexOS deck this guide does not apply to you

## Finding your server ip address

> **📋 Using a monitor connected to your server to find your ip address**
> 1) Connect a display to your server.
>    2) When turned on the server will show your `ip address`
> ![](../../public/assets/screenshots/Hexos24to25/2.png)


If you are unable to connect a monitor to your server you may be able to find the server `ip address` by logging into your router's web interface and looking at connected devices.

## Logging into the TrueNAS WebUI

1) Type the `ip address` into your browser
2) Login
    - The username will be `truenas_admin`
    - The password will be what you selected when first installing HexOS
![](../../public/assets/screenshots/Hexos24to25/1.png)

## Updating Process

1) Select the blue `Updates Available` button
![](../../public/assets/screenshots/Hexos24to25/3.png)
2) Click the `Train` dropdown
![](../../public/assets/screenshots/Hexos24to25/4.png)
3) Select `TrueNAS SCALE Goldeye 25.10` in the dropdown
![](../../public/assets/screenshots/Hexos24to25/5.png)
4) Confirm changing the train
![](../../public/assets/screenshots/Hexos24to25/6.png)
5) Select the `Do not save` button
![](../../public/assets/screenshots/Hexos24to25/7.png)
6) Select `Apply updates and reboot system after downloading` and the click `Download`
![](../../public/assets/screenshots/Hexos24to25/8.png)

## If you still can't connect to HexOS deck

If you are still having trouble claiming your server or connecting to HexOS deck please reach out to `support@hexos.com`
