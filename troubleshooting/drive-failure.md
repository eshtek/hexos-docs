---
title: Drive Failure
description: Identify a failed drive and replace it without losing data
published: true
date: 2026-08-20T19:30:00.000Z
tags: replace, drive
editor: markdown
dateCreated: 2026-06-16T02:28:08.916Z
---

# Drive failure

How to identify a failed drive and replace it without losing data.

> **Warning:** Replace one drive at a time and let the pool finish resilvering before touching another. Removing a second drive mid-rebuild can lose the pool.
{.is-warning}

## Step 1: Identify the drive that has failed. In this case, it’s showing missing because it doesn’t work at all or show up as connected

<details>
<summary> Step 1 screenshot </summary>

![Step 1 screenshot](/drive-failure/step-1.png){.medium .framed}
</details>

Click on the unhealthy storage pool.

<details>
<summary> Step 1 screenshot </summary>

![Step 1 screenshot](/drive-failure/step-2.png){.medium .framed}
</details>

Click the "View Drives" button.

Once you see which drive has failed, click on it. You should get the serial number of it. This image shows a working “Healthy” drive, but this is an example to show you which drive to pull.

<details>
<summary> Step 1 screenshot </summary>

![Step 1 screenshot](/drive-failure/step-3.png){.medium .framed}
</details>

## Step 2: Shut down HexOS and remove the faulty drive. The serial number should be on the drive label. Now plug in your new drive where the old one was. Make sure all your drive cables are tight on the power and sata cables for all the drives

## Step 3: Once your server is booted back up, you should see something like the image below

<details>
<summary> Step 3 screenshot </summary>

![Step 3 screenshot](/drive-failure/step-4.png){.medium .framed}
</details>

## Step 4: Click on the pool that has the issue. Click “View Drives”. Click on the missing drive. Click “Replace”

<details>
<summary> Step 4 screenshot </summary>

![Step 4 screenshot](/drive-failure/step-5.png){.medium .framed}
</details>

## Step 5: Click on the drop down “Replacement Drive” and pick the drive to replace your missing one

<details>
<summary> Step 5 screenshot </summary>

![Step 5 screenshot](/drive-failure/step-6.png){.medium .framed}
</details>

## Step 6: Pick the drive to replace your missing one. Then click “Replace Drive”

<details>
<summary> Step 6 screenshot </summary>

![Step 6 screenshot](/drive-failure/step-7.png){.medium .framed}
</details>

The system will now go through this process. Depending on the hardware, it can take minutes, hours, and even days to finish. Your system won’t show everything is fine until this process completes.
