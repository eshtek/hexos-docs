---
title: When the apps drive fails
description: What HexOS shows when the drive that runs your apps is missing, and how to get your apps back
published: true
date: 2026-10-07T00:00:00.000Z
tags: storage, apps, drives, recovery, backups
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# When the apps drive fails

HexOS itself runs as an app on your apps drive. If the storage running HexOS becomes unavailable, HexOS cannot start, and your server looks unavailable. This page explains what HexOS shows you, and how to get your apps running again.

## What you see

Open your server in the Command Deck. Instead of the dashboard, a page with the heading **Local is unavailable** tells you what is wrong. When HexOS has details about the missing drive, a card named **The drive we're looking for** shows its name, capacity, serial number and last-seen date when known. Use these details to identify the drive.

<details>
<summary> The apps drive is missing </summary>

![apps-drive-missing.png](/apps-drive-failed/apps-drive-missing.png){.medium .framed}
</details>

| What the page says | What it means |
|---|---|
| **Your server couldn't find the drive where your apps are installed.** | Your server started without the drive. Check its cable and power connector. |
| **A restart did not bring it back. If the drive has failed, you should consider replacing it.** | The drive was still missing after a restart. It may have failed. |
| **Your server did not start your apps. Please retry by restarting your server.** | The drive is there, but your server did not start the storage on it. |
| **The missing drive is connected again. Your server needs a restart to use it.** | The drive came back while the server was on. Restart the server to try bringing the apps storage back online. |
| **Your server is starting up** | Wait. The page updates by itself. |

<details>
<summary> The apps drive is still missing after a restart </summary>

![apps-drive-still-missing.png](/apps-drive-failed/apps-drive-still-missing.png){.medium .framed}
</details>

<details>
<summary> The missing drive is connected again </summary>

![apps-did-not-start.png](/apps-drive-failed/apps-did-not-start.png){.medium .framed}
</details>

<details>
<summary> The server is starting up </summary>

![The server is starting up](/apps-drive-failed/server-starting.png){.medium .framed}
</details>

## Step 1: Check the drive

If the page offers **Shut down server** for a missing drive:

1. Click **Shut down server**, then click **Shut down server** again to confirm. Your server turns off and stays off until you turn it back on.
2. Check that the drive's cable and power connector are plugged in.
3. Turn the server back on.

<details>
<summary> Shut down server </summary>

![shut-down-server-confirm.png](/apps-drive-failed/shut-down-server-confirm.png){.medium .framed}
</details>

The page updates by itself, or click **Check again**. If the apps storage starts successfully, your apps can run again. Otherwise, follow the updated message.

> **Info:** If a pool on your server is at risk, HexOS warns you before it shuts down or restarts the server. It can ask you to tick a box before you continue.
{.is-info}

<details>
<summary> A pool-risk acknowledgment before shutting down </summary>

![A pool-risk acknowledgment before shutting down](/apps-drive-failed/shut-down-risk-confirm.png){.medium .framed}
</details>

## Step 2: Restart the server

If the page offers **Restart server**, the recorded drives for the apps storage are connected, but that storage has not started. Click **Restart server**, then click **Restart server** again to confirm. Wait for the server to reconnect; this page updates by itself.

<details>
<summary> Restart server </summary>

![restart-server-confirm.png](/apps-drive-failed/restart-server-confirm.png){.medium .framed}
</details>

<details>
<summary> The apps storage did not start </summary>

![The apps storage did not start](/apps-drive-failed/apps-not-started.png){.medium .framed}
</details>

## Step 3: Use another pool for your apps

If **Use another pool for apps** appears, HexOS found another pool it can use. To continue from that pool, click **Use another pool for apps**, choose a pool from the list, and click **Confirm**.

<details>
<summary> Use another pool for apps </summary>

![use-another-pool-for-apps.png](/apps-drive-failed/use-another-pool-for-apps.png){.medium .framed}
</details>

> **Info:** HexOS starts from the selected pool. This step does not copy apps from the missing pool. A pool with an existing apps installation may bring those apps back. Nothing on the missing drive is changed. If a usable app backup is available, the next step lets you restore it.
{.is-info}

![A saved copy restoring apps to replacement storage](/apps-drive-failed/restore-from-copy.webp){.medium}

*Concept illustration. The screenshots show the actual controls.*

## Step 4: Restore your apps

When HexOS finds a usable [app backup](/features/storage/app-backups) it can restore, a notice appears at the top of **Storage** and in notifications. It names apps, virtual machines, or both, depending on what can be restored.

<details>
<summary> Apps that can be restored </summary>

![apps-can-be-restored.png](/apps-drive-failed/apps-can-be-restored.png){.medium .framed}
</details>

1. Click **Restore apps**, **Restore apps and virtual machines**, or **Restore virtual machines**, depending on the offer.
2. Check the list of apps and virtual machines that are restored.
3. Tick the box to confirm that changes made after the date of the copy are not included.
4. Click the matching restore button to confirm. HexOS restores the available data and sets up the apps or virtual machines it can restore safely.

<details>
<summary> Restore apps </summary>

![restore-apps-dialog.png](/apps-drive-failed/restore-apps-dialog.png){.medium .framed}
</details>

<details>
<summary> Restore apps and virtual machines </summary>

![Restore apps and virtual machines](/apps-drive-failed/restore-both-dialog.png){.medium .framed}
</details>

<details>
<summary> Restore virtual machines </summary>

![Restore virtual machines](/apps-drive-failed/restore-vms-dialog.png){.medium .framed}
</details>

Follow the progress in the Activity Center. The row shows each step as it happens.

<details>
<summary> Restoring your apps in the Activity Center </summary>

![put-back-activity-row.png](/apps-drive-failed/put-back-activity-row.png){.medium .framed}
</details>

When it finishes, the row lists anything you need to do yourself, such as an app to install again, or a virtual machine to check before you start it.

<details>
<summary> What is left for you to do </summary>

![put-back-results.png](/apps-drive-failed/put-back-results.png){.medium .framed}
</details>

> **Info:** Existing data on the pool is not replaced. The Activity Center shows problems and any follow-up needed, such as an app to install again, data that could not be restored, or a virtual machine to check.
{.is-info}

> **Warning:** Some virtual machines are restored but not started, and do not start by themselves: for example one with a device passed to it from your server, or one with disks from two different days. The Activity Center names each one. Check it, then start it yourself.
{.is-warning}

## Optional: Go back to your old apps drive

If you moved apps to another pool, HexOS can offer to switch back once the original pool is online, usable, and still holds its apps. A line at the top of **Storage** says **Your apps drive is back.** The same message shows as a notification. Follow any restart guidance first if the original pool has not started.

<details>
<summary> Your apps drive is back </summary>

![apps-drive-is-back.png](/apps-drive-failed/apps-drive-is-back.png){.medium .framed}
</details>

1. Click **Switch apps location**.
2. Tick the box to confirm that the apps on the other pool will stop running.
3. Click **Switch apps location** to confirm. HexOS runs your apps from the old drive again, as they were before it went missing.

<details>
<summary> Switch apps location </summary>

![switch-apps-location-dialog.png](/apps-drive-failed/switch-apps-location-dialog.png){.medium .framed}
</details>

> **Warning:** The apps you added on the other pool stop running when you switch back. Their data stays on that pool.
{.is-warning}

## Replace a failed drive

If the drive has failed for good, replace it, then restore your apps from the copy. See [Drive failure](/troubleshooting/drive-failure).

> **Help:** Stuck at any step? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
