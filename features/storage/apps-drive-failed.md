---
title: When the apps drive fails
description: What HexOS shows when the drive that runs your apps is missing, and how to get your apps back
published: true
date: 2026-10-02T00:00:00.000Z
tags: storage, apps, drives, recovery, backups
editor: markdown
dateCreated: 2026-10-02T00:00:00.000Z
---

# When the apps drive fails

HexOS itself runs as an app on your apps drive. If that drive stops working, HexOS cannot start, and your server looks unavailable. This page explains what HexOS shows you, and how to get your apps running again.

## What you see

Open your server in the Command Deck. Instead of the dashboard, a page tells you what is wrong. It names the missing drive with its model, size and serial number, so you know which one to look at.

<details>
<summary> The drive that runs your apps is missing </summary>

![apps-drive-missing.png](/apps-drive-failed/apps-drive-missing.png){.medium .framed}
</details>

| What the page says | What it means |
|---|---|
| **The drive that runs your apps is missing** | Your server started without the drive. Often a cable or power connector came loose. |
| **The drive that runs your apps is still missing** | A restart did not bring it back. The drive may have failed. |
| **Your apps did not start** | The drive is there, but your server did not start the storage on it. |
| **Your server is starting up** | Wait. The page updates by itself. |

<details>
<summary> The drive that runs your apps is still missing </summary>

![apps-drive-still-missing.png](/apps-drive-failed/apps-drive-still-missing.png){.medium .framed}
</details>

<details>
<summary> Your apps did not start </summary>

![apps-did-not-start.png](/apps-drive-failed/apps-did-not-start.png){.medium .framed}
</details>

## Step 1: Check the drive

Turn the server off. Check the drive's cable and power, then turn the server back on. The page updates by itself, or click **Check again**. If the drive comes back, your apps start again and nothing else is needed.

## Step 2: Restart the server

If the page says **Your apps did not start**, every drive is there but the storage was not started. Click **Restart server**, then **Yes, restart now**. Your server is away for a few minutes while it restarts. Your data stays untouched.

<details>
<summary> Restart server </summary>

![restart-server-confirm.png](/apps-drive-failed/restart-server-confirm.png){.medium .framed}
</details>

## Step 3: Run your apps from another pool

If the drive is still missing and you do not want to wait for a new one, you can run your apps from another pool. Click **Run apps from another pool**, choose a pool from the list, and click **Run apps from this pool**.

<details>
<summary> Run apps from another pool </summary>

![run-apps-from-another-pool.png](/apps-drive-failed/run-apps-from-another-pool.png){.medium .framed}
</details>

> **Info:** Your apps start empty on the pool you pick, and HexOS runs again. Nothing on the missing drive is changed. If you have an app backup, the next step puts your apps back.
{.is-info}

## Step 4: Put your apps back

If you have [app backups](/features/storage/app-backups), a card on the **Storage** screen says **Your apps can be put back**. It shows the date of the copy and which apps are in it. If the copy also holds virtual machines you chose to copy, it names them too.

<details>
<summary> Your apps can be put back </summary>

![apps-can-be-put-back.png](/apps-drive-failed/apps-can-be-put-back.png){.medium .framed}
</details>

1. Click **Put apps back**. If the copy holds virtual machines, the button says **Put apps and virtual machines back**.
2. Check the list of apps and virtual machines that come back.
3. Tick the box to confirm that they come back as they were on the date of the copy.
4. Click the same button again to confirm. HexOS copies your apps and their data, sets them up again, and starts them.

<details>
<summary> Putting your apps back </summary>

![put-apps-back-dialog.png](/apps-drive-failed/put-apps-back-dialog.png){.medium .framed}
</details>

Follow the progress in the activity center. The row shows each step as it happens.

<details>
<summary> Putting your apps back in the activity center </summary>

![put-back-activity-row.png](/apps-drive-failed/put-back-activity-row.png){.medium .framed}
</details>

When it finishes, the row lists anything you need to do yourself, such as an app to install again, or a virtual machine to check before you start it.

<details>
<summary> What is left for you to do </summary>

![put-back-results.png](/apps-drive-failed/put-back-results.png){.medium .framed}
</details>

> **Info:** Nothing on the pool is replaced. If an app cannot be set up safely, its data still comes back and the activity center tells you to install it again.
{.is-info}

> **Warning:** Some virtual machines come back but are not started, and do not start by themselves: for example one with a device passed to it from your server, or one with disks from two different days. The activity center names each one. Check it, then start it yourself.
{.is-warning}

## Step 5: Go back to your old apps drive

If the drive that was missing comes back, and you had run your apps from another pool, a card says **Your apps drive is back**. Click the button with your old pool's name, for example **Use SSDs again**. In the dialog, tick the box and click the same button again. HexOS runs your apps from the old drive again, as they were when it went missing.

<details>
<summary> Your apps drive is back </summary>

![apps-drive-is-back.png](/apps-drive-failed/apps-drive-is-back.png){.medium .framed}
</details>

<details>
<summary> Going back to the old drive </summary>

![use-old-pool-again-dialog.png](/apps-drive-failed/use-old-pool-again-dialog.png){.medium .framed}
</details>

> **Warning:** The apps you ran from the other pool stop running when you go back. Their data stays on that pool.
{.is-warning}

## Replace a failed drive

If the drive has failed for good, replace it, then put your apps back from the copy. See [Drive failure](/troubleshooting/drive-failure).

> **Help:** Stuck at any step? Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
