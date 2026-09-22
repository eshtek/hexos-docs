---
title: Replicating virtual machines from one TrueNAS server to another
description: Copy virtual machine disks to another TrueNAS server with ZFS replication, then set the virtual machines up again on the new server
published: true
date: 2026-09-22T00:00:00.000Z
tags: virtual machines, replication, migrating
editor: markdown
dateCreated: 2026-06-08T15:39:16.279Z
---

> **Thank you:** @ShinobiRen for the original guide
{.is-contribute}

# Replicating virtual machines from one TrueNAS server to another

This guide copies the disks of your virtual machines from one TrueNAS server to another over your network. You then set each virtual machine up again on the new server, using its copied disk. The same steps copy any other dataset, such as your folders.

> **Info:** This guide was contributed by a member of the HexOS community and updated for TrueNAS 25.10. If a step does not match what you see, ask in the [#Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz).
{.is-info}

In this guide, the **old server** has your virtual machines now, and the **new server** is where you are moving them. Every step happens in the TrueNAS interface of one of the two servers. To open it, go to `https://<server-ip>` in your browser and log in.

## Before you start

- Put both servers on the same network, and write down the new server's IP address.
- Write down the virtual machines you want to move. HexOS keeps their disks in a dataset named **Virtualization Virtual Disks**, which you can see on the **Datasets** screen.
- Shut down the virtual machines before you copy them, so their disks do not change during the copy.

> **Info:** TrueNAS can set up the connection between the servers for you, with the **Semi-automatic** setup method. It does not always work, so this guide sets it up by hand.
{.is-info}

## Step 1: Create a keypair on the old server

A keypair lets the old server log in to the new server without a password.

1. On the old server, click **Credentials** > **Backup Credentials**.

<details>
<summary> Backup credentials in the credentials menu </summary>

![credentials-backup-credentials-menu.png](/replicating-virtual-machines/credentials-backup-credentials-menu.png){.large .framed}
</details>

2. On the **SSH Keypairs** card, click **Add**.

<details>
<summary> Add button on the SSH keypairs card </summary>

![ssh-keypairs-add-button.png](/replicating-virtual-machines/ssh-keypairs-add-button.png){.large .framed}
</details>

3. Give the keypair a name, for example `replication-key`, and click **Generate Keypair**.
4. Copy everything in the **Public Key** box and keep it for Step 2. Then click **Save**.

<details>
<summary> A generated keypair </summary>

![generate-keypair.png](/replicating-virtual-machines/generate-keypair.png){.large .framed}
</details>

> **Warning:** Never share the **Private Key**. Only the public key goes to the new server.
{.is-warning}

## Step 2: Add the public key on the new server

1. On the new server, click **Credentials** > **Users**.

<details>
<summary> Users in the credentials menu </summary>

![credentials-users-menu.png](/replicating-virtual-machines/credentials-users-menu.png){.large .framed}
</details>

2. Click the user the old server will log in as, usually `truenas_admin`, then click **Edit**.

<details>
<summary> Edit button for the selected user </summary>

![user-edit-button.png](/replicating-virtual-machines/user-edit-button.png){.large .framed}
</details>

3. Check that **SSH Access** is checked.
4. Paste the public key from Step 1 into the **Public SSH Key** box. If the box already has a key, keep it and paste the new one on a new line.

<details>
<summary> SSH access and the public SSH key box </summary>

![user-public-ssh-key.png](/replicating-virtual-machines/user-public-ssh-key.png){.large .framed}
</details>

5. Scroll down to **Additional Details** and click **Sudo Commands**.
6. Check **Allow all sudo commands** and **Allow all sudo commands with no password**, then click **Save**.

<details>
<summary> Sudo commands for the user </summary>

![user-sudo-commands.png](/replicating-virtual-machines/user-sudo-commands.png){.large .framed}
</details>

## Step 3: Connect the old server to the new server

1. On the old server, click **Credentials** > **Backup Credentials** again.
2. On the **SSH Connections** card, click **Add**.

<details>
<summary> Add button on the SSH connections card </summary>

![ssh-connections-add-button.png](/replicating-virtual-machines/ssh-connections-add-button.png){.large .framed}
</details>

3. Fill in the form:
   - **Connection Name**: a name you will recognize, for example `new-server`
   - **Setup Method**: **Manual**
   - **Host**: the new server's IP address
   - **Port**: `22`
   - **Username**: the user from Step 2, for example `truenas_admin`
   - **Private Key**: the keypair from Step 1

<details>
<summary> The new SSH connection form </summary>

![new-ssh-connection-manual.png](/replicating-virtual-machines/new-ssh-connection-manual.png){.large .framed}
</details>

4. Click **Discover Remote Host Key**. The **Remote Host Key** box fills in.
5. Click **Save**.

<details>
<summary> Discover remote host key </summary>

![discover-remote-host-key.png](/replicating-virtual-machines/discover-remote-host-key.png){.large .framed}
</details>

## Step 4: Copy the disks with a replication task

1. On the old server, click **Data Protection**.
2. On the **Replication Tasks** card, click **Add**.

<details>
<summary> Add button on the replication tasks card </summary>

![replication-tasks-add-button.png](/replicating-virtual-machines/replication-tasks-add-button.png){.large .framed}
</details>

3. Set **Source Location** to **On this System** and **Destination Location** to **On a Different System**.
4. Set **SSH Connection** to the connection from Step 3. The **Sudo Enabled** dialog opens. Click **Use Sudo For ZFS Commands**.

<details>
<summary> The sudo enabled dialog </summary>

![sudo-enabled-dialog.png](/replicating-virtual-machines/sudo-enabled-dialog.png){.large .framed}
</details>

5. In **Source**, pick the disk of your virtual machine. You can pick more than one.
6. In **Destination**, type where the copy goes on the new server. Use the same pool and dataset names as on the old server, so the paths stay the same.
7. If you keep snapshots of your virtual machines, check **Recursive** to copy them too.
8. Keep the **Task Name** TrueNAS fills in, or type your own, and click **Next**.

<details>
<summary> The what and where step </summary>

![replication-what-and-where.png](/replicating-virtual-machines/replication-what-and-where.png){.large .framed}
</details>

9. Under **Replication Schedule**, click **Run Once**, then click **Save**. The copy starts.

<details>
<summary> Run once </summary>

![replication-run-once.png](/replicating-virtual-machines/replication-run-once.png){.large .framed}
</details>

The copy runs directly between the two servers. On a home network it is fast: the original author moved two virtual machines of about 120 GB in less than 5 minutes.

## Step 5: Set up the virtual machines on the new server

1. On the new server, click **Datasets** and check that each copied disk is there.

<details>
<summary> A copied disk on the datasets screen </summary>

![datasets-replicated-zvol.png](/replicating-virtual-machines/datasets-replicated-zvol.png){.large .framed}
</details>

2. Click **Virtual Machines** > **Add** and set up the virtual machine the way it was on the old server.
3. On the **Disks** step, click **Use existing disk image**. Set **Select Disk Type** to the type the virtual machine used before, then pick the copied disk in **Select Existing Zvol**.

<details>
<summary> Use an existing disk image </summary>

![vm-use-existing-disk.png](/replicating-virtual-machines/vm-use-existing-disk.png){.large .framed}
</details>

4. Finish the remaining steps and start the virtual machine.

> **Tip:** Keep the virtual machines on the old server until the new ones start and work as expected. If something goes wrong, you can still go back.
{.is-tip}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
