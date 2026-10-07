---
title: Set up a backup
description: Use New backup to start backing up to a buddy's server or to another server you own
published: true
date: 2026-10-07T00:00:00.000Z
tags: backups, buddy, setup, wizard
editor: markdown
dateCreated: 2026-08-23T12:07:31.422Z
---

# Set up a backup

> **Info:** Buddy Backups is in beta. Everyone can use it, and every backup it makes is a real copy you can restore. Beta means we are still finishing it, so screens may change and you may find a rough edge. Keep any backup you already rely on running alongside it. [What beta means](/features/backups#what-beta-means)
{.is-info}

This guide sets up a backup of your folders to another server. A buddy's server needs your buddy to accept a request first. Another server you own starts straight away.

## Before you start

> **Requirement:** Use the hosted Command Deck, the one at [deck.hexos.com](https://deck.hexos.com). At home, HexOS may open your server's local deck instead. There, the **Backups** page shows "Backups are on the hosted deck". Click **Continue on Hosted Deck** to go there.
{.is-success}

<details>
<summary> Backups on a local deck </summary>

![hosted-only-gate.png](/features/backups/images/hosted-only-gate.png){.medium .framed}
</details>

- **Both servers must be online** while the backup is set up.
- **Folders for a buddy must be encrypted.** If a folder is not encrypted yet, you can [turn on encryption](/features/folders#turning-on-encryption) first. You can also add it later: the backup's **Folders** dialog offers to encrypt it. Backups to your own server can include any folder.
- **Have your buddy's HexOS email ready** if you back up to a buddy.

## Start a new backup

1. In the sidebar, click **Backups**.

<details>
<summary> The Backups page </summary>

![backups-page.png](/features/backups/images/backups-page.png){.medium .framed}
</details>

2. Click **New backup**.

If this server has no backups yet, you can also click **New backup** in the **Backups** section of the dashboard.

<details>
<summary> The dashboard with no backups yet </summary>

![dashboard-backups-empty.png](/features/backups/images/dashboard-backups-empty.png){.medium .framed}
</details>

3. The first question is "Where should we store your backups?". Click **On a buddy’s server** or **On another server I own**.
4. If you have more than one server, choose the server to back up under **Back up from**.
5. Click **Continue**.

<details>
<summary> Choosing where the backup goes </summary>

![new-backup-destination-fork.png](/features/backups/images/new-backup-destination-fork.png){.medium .framed}
</details>

The next steps depend on your choice. Each step has a name on the side of the dialog. Click a step's name to go back to it.

## Back up to a buddy

The steps are **Request**, **Folders**, **Options**, and **Review**.

### Request

1. Click **Add a buddy**.
2. Enter your buddy's HexOS email under **Email**. You can also give them a name under **Display name (optional)**. Only you see this name.
3. Click **Done**.

<details>
<summary> The Add a buddy dialog </summary>

![new-backup-add-buddy.png](/features/backups/images/new-backup-add-buddy.png){.medium .framed}
</details>

To back up to more than one buddy at once, click **Add another**. You can add up to 5 buddies. Each buddy gets their own request.

<details>
<summary> A buddy on the Request step </summary>

![new-backup-buddy-recipient.png](/features/backups/images/new-backup-buddy-recipient.png){.medium .framed}
</details>

HexOS stops you if something is wrong with an address. For example, "You can't send a backup request to yourself." If a buddy already stores a backup of this server, it says "This buddy already hosts a backup for this server. Expand its storage instead."

### Folders

1. Under **Folders (optional)**, choose the folders to back up. You can also skip this and add folders later.
2. Under "Choose how much storage to request.", check the amount. You can switch between **GB** and **TB**.
3. Click **Continue**.

<details>
<summary> The Folders step </summary>

![new-backup-folders.png](/features/backups/images/new-backup-folders.png){.medium .framed}
</details>

Only encrypted folders can be chosen for a buddy. A folder that is not encrypted shows "Not encrypted" and cannot be picked.

HexOS suggests an amount of storage from the folders you chose, with room to grow. It says "Suggested based on your selected folders." You can ask for more. You cannot ask for much less: below the minimum, it says "Must be at least" and the smallest amount. Backups are stored compressed, so the copy is often smaller than your files. See [Compression](/features/backups#compression).

### Options

1. Under **Transfer speed**, choose **Full speed**, **Smart**, or **Custom**. **Smart** is chosen to start with.
2. Under **Schedule**, choose **Weekly** or **Daily**, then the **Day** and **Time**. The wizard starts on Weekly, Sunday at 23:00. Backups run on your server's local time.
3. Under **Keep restore points for**, choose how long to keep restore points. The wizard starts on 2 weeks.
4. Click **Continue**.

<details>
<summary> The Options step </summary>

![new-backup-options.png](/features/backups/images/new-backup-options.png){.medium .framed}
</details>

Under **Keep restore points for**, a note says how many restore points that keeps at most: one for each week, day, or hour with changes. Each one stores only what changed since the one before, so the space they take depends on how much changes, not on how many there are.

Your speed setting limits how fast your server sends. Your buddy sets their own limit when they accept, and transfers run at the lower of the two.

### Review

Check the summary, then click **Send request** (or **Send requests** for more than one buddy).

<details>
<summary> The Review step </summary>

![new-backup-review.png](/features/backups/images/new-backup-review.png){.medium .framed}
</details>

HexOS confirms with "Sent 1 backup request". Your request waits on the **Backups** page under **Requests** > **Outgoing requests**. Until your buddy answers, you can click **Withdraw** there, then **Withdraw request** to confirm.

> **Warning:** HexOS does not email your buddy. The request shows on their **Backups** page under **Requests**, as a dot on **Backups** in their sidebar, and in their activity center. Message your buddy and ask them to accept it.
{.is-warning}

> **Info:** A request to an email address with no HexOS account waits. There is no error and it does not expire. It reaches that person when they sign in to HexOS with that email. Check the spelling before you send.
{.is-info}

Nothing is copied until your buddy accepts. When they accept, HexOS sets the space aside on their pool and sets up the connection. See [Host a buddy's backup](/features/backups/host-a-buddys-backup) for what your buddy sees.

## Back up to another server you own

The steps are **Server**, **Folders**, **Options**, and **Review**.

### Server

1. Choose the destination under **Server**. Only online servers are listed.
2. Choose the **Pool** on that server.
3. To back up to more than one of your servers at once, click **Add another**.
4. Click **Continue**.

<details>
<summary> The Server step </summary>

![new-backup-own-server.png](/features/backups/images/new-backup-own-server.png){.medium .framed}
</details>

If you have no other server online, the first step says "You don't have any other servers setup yet". If each of your other online servers already stores a backup of this server, it says "You don't have any other servers to backup to".

### Folders

Choose the folders the same way as for a buddy. Any folder can be chosen, encrypted or not. Under "Choose how much storage to reserve.", set the amount. The same amount is set aside on every server you chose. If a pool is too small, the step says so.

### Options

The options are the same as for a buddy, with one more schedule: **Hourly**, at the top of every hour. Hourly is only offered between your own servers.

### Review

Check the summary, then click **Create connection** (or **Create connections**). HexOS confirms with "Started 1 backup". No request is needed, because you own both servers.

## Back up from a folder's page

You can also start from the folder itself.

1. In the sidebar, click **Folders**, then click the folder.
2. Click **Backup**.
3. In the dialog, choose one or more of your backups. A backup that cannot take this folder is greyed out with the reason, for example "Not enough space left in this connection."
4. Click **Back up folder**.

<details>
<summary> The folder's Backup dialog </summary>

![folder-backup-dialog.png](/features/backups/images/folder-backup-dialog.png){.medium .framed}
</details>

To send the folder somewhere new, click **Set up a new connection**. The setup wizard opens with this folder already chosen.

If the folder is not encrypted, the dialog explains that it cannot go to a buddy yet, with an **Encrypt folder…** button. When encryption finishes, HexOS adds the folder to those backups for you.

## While setup runs

Setup usually takes a few minutes. The activity center shows each step: **Connecting servers**, **Authorizing transfer**, **Preparing storage**, **Securing connection**, and **Finishing up**. You can close the activity item. Setup keeps going.

If a step fails, HexOS tries again on its own within about 10 minutes. To act sooner:

- In the activity item, click **Retry now**. To stop instead, click **Cancel setup**, then **Cancel setup** again in "Cancel this backup setup?".
- On the backup's page, click **Retry** next to the error.
- On the **Backups** page, open the row's menu and click **Retry setup**.

Cancelling removes the connection. On a new backup, no backed-up data is lost, because nothing was backed up yet. If you host the backup, use **Retry** on the backup's page. The row menu's **Retry setup** is only on the sending side.

## The first backup

When setup finishes, each folder you chose starts its first backup on its own. The first backup copies everything, so it takes the longest. While it runs, the folder's row shows "Backing up…" and a percentage. After that, each backup sends only what changed.

When it finishes, the folder's row shows "Latest changes backed-up:" and the time.

To change the schedule or how long restore points are kept, use the backup's **Schedule** tile. See [Manage your backups](/features/backups/manage-your-backups).

> **Help:** Setup stuck, or a message you do not recognize? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
