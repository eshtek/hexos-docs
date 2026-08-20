---
title: Import Existing Pools to HexOS
description: For migrating from TrueNAS or reinstalling HexOS without wiping pools
published: true
date: 2026-08-06T14:31:49.337Z
tags: 
editor: markdown
dateCreated: 2026-06-22T12:46:47.046Z
---

# Import pools to HexOS
> **Thank you:** lnkd and ShinobiRen for the original guide
{.is-contribute}

## Who this guide is for

This guide will help you

-   Migrate from TrueNAS to HexOS
-   Move HexOS to new hardware when a reinstall is required
-   Reinstall HexOS on the same hardware

***specifically*** if you do not want to wipe your storage pools as part of the process.

Best practice would be a fresh install of HexOS with *new* storage pools and adding the data to these new pools from backup. However, if you have:

-   a large amount of data in your storage pools
-   a large number of drives in the storage pools
-   complex app configurations
-   not much time

this guide will show you how to keep your existing storage pools and import them to a new HexOS install.

The guide does not assume significant prior knowledge of the software involved, and all steps are described thoroughly. If at any point you do not feel confident, please pause and ask for help - this is a high risk process and a mistake could make your data unrecoverable.

By exporting the TrueNAS configuration you are backing up things like:

-   Settings of your apps
-   Folders and permissions
-   Users and permissions

## Warning: data is at risk

> **Danger:** You must have backups of your data. Without adequate backups you could permanently lose data at several points during this process. 
> {.is-danger}

Best practice is to:
1.  Have backups of everything
2.  Verify they still work
3.  Try to copy a small set of files to be sure the data is accessible.

## Process

1.  Export TrueNAS configuration
2.  Prepare hardware for install
3.  Install HexOS
4.  Import configuration
5.  Claim server

## Exporting TrueNAS configuration and keys

In this section we will complete the following tasks:

-   Log in to TrueNAS and note password
-   Turn off 2FA (if applicable)
-   Download TrueNAS config file
-   Download encryption keys (if applicable)
-   Find the serial numbers of our drives
-   Check we are ready to install HexOS

**You will need**

-   [ ] Note pad and pen
-   [ ] USB drive to back up config and encryption

### Log into TrueNAS web interface

#### From HexOS

If you are starting in HexOS, go to [_https://deck.hexos.com/_](https://deck.hexos.com/) > **Settings** > **TrueNAS**

<details>
<summary> Open TrueNAS button </summary>

![Open TrueNAS](/open-truenas.png){.medium .framed}
</details>

This will open a new window in your browser. 

You may need to click through a security warning about a self-signed SSL certificate. For example, in Firefox I clicked **Advanced**, and **Accept the risk and continue**. 

Next you will see the TrueNAS login. 

<details>
<summary> TrueNAS login </summary>

![](/truenas-login-screen.png){.medium .framed}
</details>

The username is **truenas\_admin** and the password is the one chosen when you installed HexOS.

**Note down your password**

The TrueNAS password for this server will be needed again in the future, when the new machine is set up. Make sure to note it down.

#### From TrueNAS

If you are not yet using HexOS, enter TrueNAS by going to the login screen at your server IP address. For example https://192.168.1.142/ui/signin.

Your username and password were set during TrueNAS installation.

<details>
<summary> TrueNAS login screen </summary>

![](/truenas-login-pre-hexos-install.png){.medium .framed}
</details>

**Note down your password**

The TrueNAS password for this server will be needed again in the future, when the new machine is set up. Make sure to note it down.

### Turn off 2FA

If 2FA is enabled you will not be able to claim your server when installing HexOS. Check that 2FA is disabled. 

Go to **System** > **Advanced Settings** then scroll down to **Global Two Factor Authentication** and check that 2FA is showing as disabled.

You may need to scroll down to see the **System** menu item

<details>
<summary> Two-factor authentication setting </summary>

![](/2fa-disabled.png){.medium .framed}
</details>

 If it is showing as enabled, click **Configure**, uncheck the **Enable Two Factor Authentication Globally** box and click **Save**

### Download TrueNAS configuration 

Go to **System** > **Advanced Settings**

You may need to scroll down to see the **System** menu item

<details>
<summary> System menu in sidebar </summary>

![](/truenas-system-advanced-menu.png){.medium .framed}
</details>

Then go to **Manage configuration** > **Download File**. This dropdown is on the top right of the screen.

<details>
<summary> Manage Configuration dropdown </summary>

![](/truenas-manage-config-menu.png){.medium .framed}
</details>

Leave the **Password Secret Seed** box checked. Click **Save**.

<details>
<summary> Config download dialog </summary>

![](/download-config-truenas-2.png){.medium .framed}
</details>

Check that the file has downloaded. Make a note of the TrueNAS version number included in the file name (in this case 25.10.4) - you will need this later.

Back up this file to a secure local place, such as a USB drive.

<details>
<summary> Config file backup on USB </summary>

![](/config-backup-truenas-1.png){.medium .framed}
</details>

### Download Keys for Encrypted Datasets

If you have data encrypted with a key in your storage pool, the keys must be downloaded. **If this step is skipped you will lose your data.**

To see if you have encrypted data go to **Datasets** from the main menu in TrueNAS. 

In the **Encryption** column, datasets that are encrypted are marked as **Locked** or **Unlocked**. The rest are marked **Unencrypted**.

<details>
<summary> Dataset encryption status column </summary>

![](/find-encrypted-dataset-truenas.png){.medium .framed}
</details>

If you have no encrypted data you can skip ahead.

If you have encrypted data, next find out if it is key encrypted. Click on the entry then scroll down to **Encryption**. 

If there is an **Export Key** button, then the data is encrypted with a key. 

**You need this key to be able to access the data again later: without the key the data is unreadable.** 

To export your key, click the **Export Key** button. You will be reminded that each encrypted dataset has its own key, and you must download each key separately.

<details>
<summary> Export Key button </summary>

![](/download-key-encrypted-dataset-truenas.png){.medium .framed}
</details>

When you have downloaded the key, check that it looks similar to the example key below:

<details>
<summary> Example encryption key file </summary>

![](/example-of-a-key-truenas.png){.medium .framed}
</details>

Then back up the key to a safe local place, such as a USB drive.

<details>
<summary> Key file backup on USB </summary>

![](/key-backup-truenas-1.png){.medium .framed}
</details>

#### Passphrase encryption

If there is no button to export the key, then the data is encrypted with passphrase only. In this case you don't need to download anything, as long as you know the passphrase you can access the data.

To confirm this click **Edit** (you may need to unlock first) and check that the **Encryption Type\*** dropdown is showing **Passphrase**. Encrypted folders set up in HexOS always use a passphrase. 

> **Help:** If you have any doubts or questions, please [contact HexOS support](https://discord.com/invite/DjEp3WRHKz): this step is critical to get right.
{.is-troubleshooting}


### Find the serial numbers of your drives

To prevent data loss, we want to make sure we know which drives are *pool drives* and which drives are *boot drives* in the machine. Then we will unplug the pool drives to make sure they don't get overwritten.

First, in TrueNAS go to **Storage** > **Disks**. The disks button is top right.

<details>
<summary> Disks button on Storage screen </summary>

![](/storage-disks-truenas.png){.medium .framed}
</details>

You will see a list of all the drives in the machine. 

The name of the boot drive is **boot-pool**. The *storage* pool drives, which have our data on, will have the name given when the storage pool was created, in this case “HDDs".

<details>
<summary> List of drives </summary>

![](/list-of-drives-truenas.png){.medium .framed}
</details>

Click on each entry and note down the drive **Model Number**, **Disk Size** and **Pool**. 

<details>
<summary> Drive details panel </summary>

![](/check-drive-model-number-truenas.png){.medium .framed}
</details>

I have used model number because this is shown during the HexOS install process. However, if your drives all have the same **Model Number** then note down the **Serial Numbers** too. 

<details>
<summary> Note of drive model numbers </summary>

![](/drive-model-numbers-note-truenas.jpg){.medium .framed}
</details>

**Final Checks**

You should now have a:

-   [ ] Note with your password, TrueNAS version and drive model/serial numbers, pool and size
-   [ ] Copy of the config file and any encryption keys
-   [ ] Backup of the config and encryption keys
-   [ ] Full backup of the data on your pools which you have verified is working

## Preparing to install HexOS

In this section we will:

-   Shut down the server
-   Unplug the storage pool drives
-   Make any other hardware updates

**You will need**

-   [ ] Physical access to your server
-   [ ] Any new hardware you're installing

### Shut down the server

First, shut down the server. From TrueNAS this can be done by clicking the power button icon and **Shut Down**

<details>
<summary> Shut Down menu option </summary>

![](/shutdown.png){.medium .framed}
</details>

then check **Confirm** and click **Shut Down**

<details>
<summary> Shutdown confirmation dialog </summary>

![](/shutdown-2-truenas.png){.medium .framed}
</details>

When the browser starts to show a connection error, the server has shut down.

<details>
<summary> Browser connection error </summary>

![](/shutdown-error-truenas.png){.medium .framed}
</details>

### Unplug your storage pool drives

At this stage we will unplug all the drives that make up the storage pools. It is essential to do this, to prevent accidental **data loss** during HexOS install.

These drives can be identified using the **model numbers** or **serial numbers** noted down earlier. Remove the data and power cables from all the storage pool drives.

<details>
<summary> Unplugged pool drives </summary>

![](/unplug-drives.jpg){.medium .framed}
</details>

### Make any hardware changes

Make any other planned hardware changes to your system now also. 

In this case, I will be using the same boot drive, so this remains plugged in ready for HexOS to be installed. The serial number matches what I noted down as the boot-pool drive in TrueNAS.

<details>
<summary> Boot drive left plugged in </summary>

![](/leave-boot-drive-plugged-in.jpg){.medium .framed}
</details>

**Final Checks**

-   [ ] The machine is off
-   [ ] The drives for storage pools are unplugged
-   [ ] The boot drive that will have HexOS on is plugged in

## Install HexOS and update TrueNAS

In this section we will:

-   Install HexOS, following the install guide up until we see the console setup screen
-   Update TrueNAS

**You will need**

-   [ ] The items listed on the [install guide](/getting-started/installation/InstallGuide)

### Install HexOS

Follow the [HexOS installation guide here.](/getting-started/installation/InstallGuide)

At the end of the installation process, *come back to this guide.*

Do not continue on to complete the HexOS setup.

**Two important notes**

-   The password you use during install is temporary, it will later be replaced by the password you noted down.
-   When you get to the step **Select Installation Drive** there should only be one drive listed. Double-check this drive matches the description of the place you want to install HexOS. Be ***sure***, any data on the drive will be overwritten.

<details>
<summary> Installation drive selection screen </summary>

![](/choose-boot-pool-drive.png){.medium .framed}
</details>

At the end of the install process, you will see the following **Console setup** screen.  ***Do not continue*** following the docs to complete HexOS setup.

This screen shows the IP address we will use in the next step.

<details>
<summary> Console setup screen </summary>

![](/truenas_ip_address.png){.medium .framed}
</details>

### Log in to TrueNAS

First, log into TrueNAS by going to the IP address shown on the **Console setup** screen.

Enter the username **truenas\_admin** and the temporary password you chose. Click **Log in**.

<details>
<summary> TrueNAS login screen </summary>

![](/log-in-to-truenas-after-reinstall.png){.medium .framed}
</details>

### Upgrade TrueNAS

The next step is to update TrueNAS to the same version as our previous instance. 

Note: Usually, you should not manually update TrueNAS this way: TrueNAS updates should be handled by HexOS. In this specific situation, TrueNAS needs to be updated in order to ensure the config file uploads correctly.

You should have the version number in the notes from earlier steps, it can also be found in the config file name. In this case the version number is **25.10.4**

<details>
<summary> Version number in config file name </summary>

![](/config-download-sucsessfull-truenas.png){.medium .framed}
</details>

After logging in, TrueNAS should open on the dashboard. 

Click the **Updates Available** button.

<details>
<summary> Updates Available button </summary>

![](/update-truenas-1.png){.medium .framed}
</details>

In this case there is only one update to make our TrueNAS version numbers match. If the options available do not allow you to update to the correct version, [please contact support](https://discord.com/invite/DjEp3WRHKz).

Click **Install Update**.

<details>
<summary> Install Update button </summary>

![](/update-trunenas-2.png){.medium .framed}
</details>

Download the config and settings and password as suggested by clicking **Save Configuration**.

<details>
<summary> Save Configuration prompt </summary>

![](/truenas-update-3.png){.medium .framed}
</details>

Then click **Install**.

<details>
<summary> Install button </summary>

![](/click-install-truenas.png){.medium .framed}
</details>

The system will run the update and reboot.

<details>
<summary> Update progress screen </summary>

![](/truenas-updating.png){.medium .framed}
</details>

When the reboot has finished and the **Console Setup** screen is showing again, shut down the machine. 

Plug all the remaining drives back in and boot up.

**Final Checks**

-   [ ] TrueNAS is installed with a temporary password
-   [ ] The version number of TrueNAS matches your previous instance

## Import configs

In this section we will:

-   Import storage pool
-   Upload config file
-   Import encryption keys and set up SMB share (if necessary)
-   Reset the apps pool (if necessary)

**You will need**

-   [ ] The backed up config file and keys
-   [ ] Your temporary password 
-   [ ] The original password

> **Requirement:** Make sure you have updated TrueNAS to the correct version before proceeding.
{.is-success}


### Import your storage pool

Go to **Storage** > **Import Pool**. Import pool is on the top right of the screen.

<details>
<summary> Import Pool button </summary>

![](/import-pool-truenas-1.png){.medium .framed}
</details>

Find your pool in the list, in this instance there is only one pool. Click **Import**.

<details>
<summary> Pool import dialog </summary>

![](/import-pool-truenas-2.png){.medium .framed}
</details>

The pool will then import, this may take some time.

<details>
<summary> Pool import progress </summary>

![](/import-pool-truenas-3.png){.medium .framed}
</details>

Once the pool is imported the **Storage Dashboard** will be populated.

<details>
<summary> Storage Dashboard after import </summary>

![](/import-pool-truenas-4.png){.medium .framed}
</details>

### Upload your config

Go into **System** > **Advanced Settings**

<details>
<summary> Advanced Settings menu </summary>

![](/import-config-truenas-1.png){.medium .framed}
</details>

Then click **Manage Configuration** \> **Upload File**. Manage configuration is found top right of the screen.

<details>
<summary> Upload File menu option </summary>

![](/import-truenas-config-2.png){.medium .framed}
</details>

You will be reminded that your temporary password will now be replaced by the original password.

<details>
<summary> Password replacement warning </summary>

![](/import-truenas-config-4.png){.medium .framed}
</details>

Navigate to and select your config file

<details>
<summary> Config file picker </summary>

![](/import-truenas-config-3.png){.medium .framed}
</details>

Click **Upload**

<details>
<summary> Upload button </summary>

![](/config-upload-5.png){.medium .framed}
</details>

The import will run and the system will reboot. 

<details>
<summary> Config import progress </summary>

![](/screenshot_from_2026-06-26_22-04-56.png){.medium .framed}
</details>

While the system is rebooting you will see the error “Connecting to TrueNAS”. 

<details>
<summary> Connecting to TrueNAS error </summary>

![](/shutdown-error-truenas.png){.medium .framed}
</details>

When the system has rebooted you will see the login screen.

<details>
<summary> TrueNAS login screen after reboot </summary>

![](/truenas-login-screen.png){.medium .framed}
</details>

When you log back in, you will need to use the original password which was noted at the start of the process. The temporary password is no longer used.

### Import keys for encrypted data and set up SMB share (if necessary)

If you had encrypted data with keys (as opposed to passphrases)

Go to **Datasets** and click the encrypted dataset

<details>
<summary> Encrypted dataset in Datasets list </summary>

![](/key-import-truenas-1.png){.medium .framed}
</details>

Scroll down to **Encryption** and click **Unlock**

<details>
<summary> Unlock button in Encryption section </summary>

![](/key-import-truenas-2.png){.medium .framed}
</details>

Click **Choose File**

<details>
<summary> Choose File button </summary>

![](/key-import-truenas-3.png){.medium .framed}
</details>

Choose your keyfile from backup

<details>
<summary> Keyfile selection dialog </summary>

![](/key-import-truenas-4.png){.medium .framed}
</details>

Click **Save**

<details>
<summary> Save button </summary>

![](/key-import-truenas-5.png){.medium .framed}
</details>

Click **Continue**

<details>
<summary> Continue button </summary>

![](/key-import-from-truenas-6.png){.medium .framed}
</details>

When the process has finished you can click **Close**

<details>
<summary> Unlock completed dialog </summary>

![](/key-import-truenas-7.png){.medium .framed}
</details>

Additionally, as the key encrypted dataset was created in TrueNAS it needs an SMB share set up to be accessible in HexOS (if it doesn't already have one)

Go to **Shares** and click the **View All** button to see if the encrypted dataset has a share set up. 

<details>
<summary> View All button on Shares screen </summary>

![](/truenas-set-up-smb-share-1.png){.medium .framed}
</details>

In this example the dataset Top-Secret-With-Key is not on the list.

<details>
<summary> List of existing shares </summary>

![](/truenas-set-up-smb-share-2.png){.medium .framed}
</details>

To set up the share click **Add** which is towards the top right

<details>
<summary> Add share button </summary>

![](/truenas-set-up-smb-share-3.png){.medium .framed}
</details>

Click the **arrow** to find the dataset

<details>
<summary> Dataset path browser arrow </summary>

![](/truenas-set-up-smb-share-4.png){.medium .framed}
</details>

Click the dataset in the list

<details>
<summary> Dataset selection list </summary>

![](/truenas-set-up-smb-share-5.png){.medium .framed}
</details>

Then scroll down to the bottom of the dialog to click the **Save** button

<details>
<summary> Save button on share form </summary>

![](/truenas-set-up-smb-share-6.png){.medium .framed}
</details>

You should now see your new share on the list

<details>
<summary> New share in shares list </summary>

![](/truenas-set-up-smb-share-7.png){.medium .framed}
</details>

Please note that, as of writing, this folder needs to be locked and unlocked via the TrueNAS interface. 

When unlocked, the data will be accessible via HexOS. If the folder is locked, however, it cannot be unlocked within HexOS: only passphrase encryption is supported in the HexOS dashboard.

### Set apps pool correctly (if necessary)

Go to the **Apps** screen. If the apps show **Running** in the **Status** column then this step can be skipped. 

If they are not running or not visible you need to choose the correct pool for apps.

If you are unsure which pool is the apps pool, it will be the first one you set up when the system was first built. If you set up multiple pools at once it will be the first pool that used SSDs.

Go to **Apps** > **Configuration** > **Unset Pool**

<details>
<summary> Unset Pool menu option </summary>

![](/apps-after-reinstall-truenas-1.png){.medium .framed}
</details>

Click **Unset**

<details>
<summary> Unset pool confirmation </summary>

![](/apps-after-reinstall-truenas-2.png){.medium .framed}
</details>

The process will run

<details>
<summary> Unset pool progress </summary>

![](/apps-after-reinstall-truenas-3.png){.medium .framed}
</details>

You will see **No applications installed** 

<details>
<summary> No applications installed screen </summary>

![](/apps-after-reinstall-truenas-4.png){.medium .framed}
</details>

Restart TrueNAS by clicking the **power icon** > **Restart**

<details>
<summary> Restart menu option </summary>

![](/restart-truenas.png){.medium .framed}
</details>

After rebooting and logging in, go to **Apps** > **Configuration** > **Choose Pool**

<details>
<summary> Choose Pool menu option </summary>

![](/apps-after-reinstall-truenas-6.png){.medium .framed}
</details>

Choose your pool from the dropdown and click **Choose**. If you have multiple pools your apps pool is likely to be the first one you created. If you created multiple pools it will be the first one using SSDs (as opposed to HDDs)

<details>
<summary> Pool selection dropdown </summary>

![](/apps-after-reinstall-truenas-7.png){.medium .framed}
</details>

Your apps should show back up. Start them by clicking the triangular play symbol under **Controls**

<details>
<summary> Restored apps list </summary>

![](/apps-after-reinstall-truenas-8.png){.medium .framed}
</details>

After apps have started you should see **Running** in green in the **Status** column.

<details>
<summary> Apps with Running status </summary>

![](/apps-after-reinstall-truenas-9.png){.medium .framed}
</details>

**Checks**

-   [ ] You have imported your pools
-   [ ] You have uploaded your config
-   [ ] All apps are running

## Claim the new server on HexOS deck

In this section we will claim the server in the HexOS deck, making sure to skip the create pool step.

**You will need**

-   [ ] HexOS.com username and password
-   [ ] A HexOS license
-   [ ] Server password

### Unclaim server

In most situations you will need to unclaim your old server in order to claim a new one.

To do this, log in to [deck.hexos.com](https://deck.hexos.com/dash) with the email and password used when you purchased your HexOS license.

<details>
<summary> HexOS deck login </summary>

![](/unclaim-hexos-server-1.png){.medium .framed}
</details>

When you reach the deck, you will see **This server is not available.** 

If you have multiple servers make sure that the server name, at the top of the screen, is the server you are currently working on.

Click **Unclaim Server**

<details>
<summary> Unclaim Server button </summary>

![](/unclaim-hexos-server-2.png){.medium .framed}
</details>

Click **Unclaim this server from HexOS** 

<details>
<summary> Unclaim confirmation dialog </summary>

![](/unclaim-hexos-server-3.png){.medium .framed}
</details>

### Claim the new server

[Follow the guide to claim the new server](/getting-started/setup/CompleteSetup) - noting carefully the differences described below, **your data is at risk.**

#### **Skip Create Storage Pool Step**

**DATA AT RISK**

The following steps are **ESSENTIAL** to avoid data loss. Notice that your storage drives are shown to have data on: this is your pool data. Click **Continue**.

<details>
<summary> Storage drives showing existing data </summary>

![](/skip-pool-creation-1.png){.medium .framed}
</details>

Next, when you reach the **Storage pools** screen you ***MUST*** click **Skip**.

<details>
<summary> Skip button on Storage pools screen </summary>

![](/skip-pool-creation-2.png){.medium .framed}
</details>

**Check the box** and click **Confirm**

<details>
<summary> Skip confirmation dialog </summary>

![](/skip-pool-creation-3.png){.medium .framed}
</details>

Then finish any remaining steps in the [guide](/getting-started/setup/CompleteSetup) and your server should now be as it was before. 

**Final Checks**

-   Check apps are running
-   Check users and folder permissions are correct

<details>
<summary> Apps running in HexOS </summary>

![](/check-apps.png){.medium .framed}
</details>

<details>
<summary> Folder permissions in HexOS </summary>

![](/check-folder-permissions.png){.medium .framed}
</details>

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
