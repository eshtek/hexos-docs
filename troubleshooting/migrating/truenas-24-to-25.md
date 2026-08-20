---
title: Upgrading HexOS with TrueNAS 24.10.0 to TrueNAS 25.10.3
description: 
published: true
date: 2026-08-20T19:30:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:52.526Z
---

# Upgrading HexOS with TrueNAS 24.10.0 to TrueNAS 25.10.3

## Overview

- With the HexOS update to 1.0 with Local UI any system still running older versions will need to upgrade TrueNAS to work with HexOS 1.0. 
- This guide only applies to users on `TrueNAS SCALE version 24.10.2.1` or older.
- If you can access HexOS Deck this guide does not apply to you

## Finding your server IP address

<details>
  <summary> Finding the IP address with a monitor </summary>
1. Connect a display to your server.
  
2. When turned on the server will show your IP address
![2.png](/upgrading-hexos/2.png =500x){.align-center}
</details>

If you are unable to connect a monitor to your server you may be able to find the server IP address by logging into your router's web interface and looking at connected devices.

## Logging in to the TrueNAS web UI

1) Type the IP address into your browser
2) Log in
    - The username will be `truenas_admin`
    - The password will be what you selected when first installing HexOS
<details>
<summary> TrueNAS login screen </summary>

![1.png](/upgrading-hexos/1.png =400x){.align-center}
</details>

## Updating process

1) Click the blue **Updates Available** button
<details>
<summary> Updates Available button </summary>

![3.png](/upgrading-hexos/3.png =600x){.align-center}
</details>
2) Click the **Train** dropdown
<details>
<summary> Train dropdown </summary>

![4.png](/upgrading-hexos/4.png =600x){.align-center}
</details>
3) Click **TrueNAS SCALE Goldeye 25.10** in the dropdown
<details>
<summary> Goldeye train selection </summary>

![5.png](/upgrading-hexos/5.png =600x){.align-center}
</details>
4) Confirm changing the train
<details>
<summary> Train change confirmation </summary>

![6.png](/upgrading-hexos/6.png =600x){.align-center}
</details>
5) Click the **Do not save** button
<details>
<summary> Do not save prompt </summary>

![7.png](/upgrading-hexos/7.png =600x){.align-center}
</details>
6) Click **Apply updates and reboot system after downloading** and then click **Download**
<details>
<summary> Update download options </summary>

![8.png](/upgrading-hexos/8.png =600x){.align-center}
</details>

## If you still can't connect to HexOS Deck

If you are still having trouble claiming your server or connecting to HexOS Deck please reach out to `support@hexos.com`
