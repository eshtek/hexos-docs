---
title: Upgrading HexOS with TrueNAS 24.10.0 to TrueNAS 25.10.3
description: 
published: true
date: 2026-06-30T18:30:11.071Z
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

<details>
  <summary> 📋 Using a monitor connected to your server to find your ip address</summary>
1. Connect a display to your server.
  
2. When turned on the server will show your `ip address`
![2.png](/upgrading-hexos/2.png =500x){.align-center}
</details>

If you are unable to connect a monitor to your server you may be able to find the server `ip address` by logging into your router's web interface and looking at connected devices.

## Logging into the TrueNAS WebUI

1) Type the `ip address` into your browser
2) Login
    - The username will be `truenas_admin`
    - The password will be what you selected when first installing HexOS
![1.png](/upgrading-hexos/1.png =400x){.align-center}

## Updating Process

1) Select the blue `Updates Available` button
![3.png](/upgrading-hexos/3.png =600x){.align-center}
2) Click the `Train` dropdown
![4.png](/upgrading-hexos/4.png =600x){.align-center}
3) Select `TrueNAS SCALE Goldeye 25.10` in the dropdown
![5.png](/upgrading-hexos/5.png =600x){.align-center}
4) Confirm changing the train
![6.png](/upgrading-hexos/6.png =600x){.align-center}
5) Select the `Do not save` button
![7.png](/upgrading-hexos/7.png =600x){.align-center}
6) Select `Apply updates and reboot system after downloading` and the click `Download`
![8.png](/upgrading-hexos/8.png =600x){.align-center}

## If you still can't connect to HexOS deck

If you are still having trouble claiming your server or connecting to HexOS deck please reach out to `support@hexos.com`
