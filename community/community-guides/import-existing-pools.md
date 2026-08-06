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
> Thanks to lnkd and ShinobiRen for the origional guide
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

The guide does not assume significant prior knowledge of the software involved, and all steps are described thoroughly. If at any point you do not feel confident, please pause and ask for help - this is a high risk process and a mistake could make your data unrecoverable..

By exporting the TrueNAS configuration you are backing up things like:

-   Settings of your apps
-   Folders and permissions
-   Users and permissions

## Warning: data is at risk

> **Warning**: You must have backups of your data. Without adequate backups you could permanently lose data at several points during this process. 
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
-   [ ] USB drive to backup config and encryption

### Log into TrueNAS web interface

#### From HexOS

If you are starting in HexOS, go to [_https://deck.hexos.com/_](https://deck.hexos.com/) > **Settings** > **TrueNAS**

![Open TrueNAS](https://docs.hexos.com/open-truenas.png)

This will open a new window in your browser. 

You may need to click through a security warning about a self signed SSL certificate. For example, in Firefox I clicked **Advanced**, and **Accept the risk and continue**. 

Next you will see the TrueNAS login. 

![](https://docs.hexos.com/truenas-login-screen.png)

The username is **truenas\_admin** and the password is the one chosen when you installed HexOS.

**Note down your password**

The TrueNAS password for this server will be needed again in the future, when the new machine is set up. Make sure to note it down.

#### From TrueNAS

If you are not yet using HexOS, enter TrueNAS by going to the login screen at your server IP address. For example https://192.168.1.142/ui/signin.

Your username as password were set during TrueNAS installation.

![](https://docs.hexos.com/truenas-login-pre-hexos-install.png)

**Note down your password**

The TrueNAS password for this server will be needed again in the future, when the new machine is set up. Make sure to note it down.

### Turn off 2FA

If 2FA is enabled you will not be able to claim your server when installing HexOS. Check that 2FA is disabled. 

Go to **System** > **Advanced Settings** then scroll down to **Global Two Factor Authentication** and check that 2FA is showing as disabled.

You may need to scroll down to see the **System** menu item

![](https://docs.hexos.com/2fa-disabled.png)

 If it is showing as enabled, click **Configure,** un-check the **Enable Two Factor Authentication Globally** box and click **Save**

### Download TrueNAS configuration 

Go to **System** > **Advanced Settings**

You may need to scroll down to see the **System** menu item

![](https://docs.hexos.com/truenas-system-advanced-menu.png)

Then go to **Manage configuration** > **Download File.** This dropdown is on the top right of the screen.

![](https://docs.hexos.com/truenas-manage-config-menu.png)

Leave the **Password Secret Seed** box checked. Click **Save.**

![](/download-config-truenas-2.png)

Check that the file has downloaded. Make a note of the TrueNAS version number included in the file name (in this case 25.10.4) - you will need this later.

Back up this file to a secure local place, such as a usb drive.

![](/config-backup-truenas-1.png)

### Download Keys for Encrypted Datasets

If you have data encrypted with a key in your storage pool, the keys must be downloaded. **If this step is skipped you will lose your data.**

To see if you have encrypted data go to **Datasets** from the main menu in TrueNAS. 

In the **Encryption** column, datasets that are encrypted are marked as **Locked** or **Unlocked**. The rest are marked **Unencrypted**.

![](https://docs.hexos.com/find-encrypted-dataset-truenas.png)

If you have no encrypted data you can skip ahead,

If you have encrypted data, next find out if it is key encrypted. Click on the entry then scroll down to **Encryption**. 

If there is an **Export Key** button, then the data is encrypted with a key. 

**You need this key be able to access the data again later: without the key the data is unreadable.** 

To export your key, click the **Export Key** button. You will be reminded that each encrypted dataset has it's own key, and you must download each key separately.

![](https://docs.hexos.com/download-key-encrypted-dataset-truenas.png)

When you have downloaded they key, check that it looks similar to the example key below:

![](https://docs.hexos.com/example-of-a-key-truenas.png)

Then back up the key to a safe local place, such as a USB drive.

![](/key-backup-truenas-1.png)

#### Passphrase encryption

If there is no button to export the key, then the data is encrypted with passphrase only. In this case you don't need to download anything, as long as you know the passphrase you can access the data.

To confirm this click **Edit** (you may need to unlock first) and check that the **Encryption Type\*** dropdown is showing **Passphrase**. Encrypted folders set up in HexOS always use a passphrase.. 

> If you have any doubts or questions, please [contact HexOS support](https://discord.com/invite/DjEp3WRHKz): this step is critical to get right.
{.is-troubleshooting}


### Find the serial numbers of your drives

To prevent data loss, we want to make sure we know which drives are *pool drives* and which drives are *boot drives* in the machine. Then we will unplug the pool drives to make sure they don't get overwritten.

First, in TrueNAS go to **Storage** > **Disks.** The disks button is top right.

![](https://docs.hexos.com/storage-disks-truenas.png)

You will see a list of all the drives in the machine. 

The name of the boot drive is **boot-pool.** The *storage* pool drives, which have our data on, will have the name given when the storage pool was created, in this case “HDDs".

![](https://docs.hexos.com/list-of-drives-truenas.png)

Click on each entry and note down the drive **Model Number,** **Disk Size** and **Pool.** 

![](/check-drive-model-number-truenas.png)

I have used model number because this is shown during HexOS install process. However, if your drives all have the same **Model Number** then note down the **Serial Numbers** too. 

![](/drive-model-numbers-note-truenas.jpg)

**Final Checks**

You should now have a:

-   [ ] Note with your password, TrueNAS version and drive model/serial numbers, pool and size
-   [ ] Copy of the config file any encryption keys
-   [ ] Backup of the config and encryption keys
-   [ ] Full backup of the data on your pools which you have verified is working

## Preparing to install HexOS

In this section we will:

-   Shut down the server
-   Unplug the storage pool drives
-   Make any other hardware updates

**You will need**

-   [ ] Physical access to your server
-   [ ] Any hardware new you're installing

### Shut down the server

First, shut down the server. From TrueNAS this can be done by clicking the power button icon and **Shut Down**

![](https://docs.hexos.com/shutdown.png)

then check confirm  and click **Shut Down**

![](https://docs.hexos.com/shutdown-2-truenas.png)

When the browser starts to show a connection error, the server has shut down.

![](https://docs.hexos.com/shutdown-error-truenas.png)

### Unplug your storage pool drives

At this stage we will unplug all the drives that make up the storage pools. It is essential to do this, to prevent accidental **data loss** during HexOS install.

These drives can be identified using the **model numbers** or **serial numbers** noted down earlier. Remove the data and power cables from all the storage pool drives.

![](/unplug-drives.jpg)

### Make any hardware changes

Make any other planned hardware changes to your system now also. 

In this case, I will be using the same boot drive, so this remains plugged in ready for HexOS to be installed. The serial number matches what I noted down as the boot-pool drive in TrueNAS.

![](/leave-boot-drive-plugged-in.jpg)

**Final Checks**

-   [ ] The machine is off
-   [ ] The drives for storage pools are unplugged
-   [ ] The boot drive that will have HexOS on in plugged in

## Install HexOS and update TrueNAS

In this section we will:

-   Install HexOS, following the install guide up until we see the console setup screen
-   Update TrueNAS

**You will need**

-   [ ] The items listed on the [install guide](/getting-started/installation/InstallGuide)

### Install HexOS

Follow the [HexOS installation guide here.](https://docs.hexos.com/getting-started/installation/InstallGuide.html)

At the end of the installation process, *come back to this guide.*

Do not continue on to complete the HexOS setup.

**Two important notes**

-   The password you use during install is temporary, it will later be replaced by the password you noted down.
-   When you get to the step **Select Installation Drive** there should only be one drive listed.  Double check this drive matches the description of the place you want to install HexOS***.*** Be ***sure***, any data on the drive will be overwritten.

![](/choose-boot-pool-drive.png)

At the end of the install process, you will see the following **Console setup** screen.  ***Do not continue*** following the docs to complete HexOS setup.

This screen shows the IP address we will use in the next step.

![](/truenas_ip_address.png)

### Log in to TrueNAS

First, log into TueNAS by going to the IP address shown on the **Console setup** screen.

Enter the username **truenas\_admin and** the temporary password you chose. Click **Log in.**

![](https://docs.hexos.com/log-in-to-truenas-after-reinstall.png)

### Upgrade TrueNAS

The next step is to update TrueNAS to the same version as our previous instance. 

Note: Usually, you should not manually update TrueNAS this way: TrueNAS updates should be handled by HexOS. In this specific situation, TrueNAS needs to be updated in order to ensure the config file uploads correctly.

You should have the version number in the notes from earlier steps, it can also be found in the config file name. In this case the version number is **12.10.4**

![](/config-download-sucsessfull-truenas.png)

After loging in, TrueNAS should open on the dashboard. 

Click the **Updates Available** button.

![](https://docs.hexos.com/update-truenas-1.png)

In this case there is only one update to make our TrueNAS version numbers match. If the options available do not allow you to update to the correct version, [please contact support](https://discord.com/invite/DjEp3WRHKz).

Click **Install Update**.

![](https://docs.hexos.com/update-trunenas-2.png)

Download the config and settings and password as suggested by clicking **Save Configuration.**

![](https://docs.hexos.com/truenas-update-3.png)

Then click **Install**.

![](/click-install-truenas.png)

The system will run the update and reboot

![](https://docs.hexos.com/truenas-updating.png)

When the reboot has finished and the **Console Setup** screen is showing again, boot down the machine. 

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

> Make sure you have updated TrueNAS to the correct version before proceeding.
{.is-success}


### Import your storage pool

Go to **Storage** > **Import Pool.** Import pool is on the top right of the screen.

![](/import-pool-truenas-1.png)

Find your pool in the list, in this instance there is only one pool. Click **Import**.

![](https://docs.hexos.com/import-pool-truenas-2.png)

The pool will then import, this may take some time.

![](https://docs.hexos.com/import-pool-truenas-3.png)

One the pool is imported the **Storage Dashboard** will be populated.

![](/import-pool-truenas-4.png)

### Upload your config

Go into **System** > **Advanced Settings**

![](https://docs.hexos.com/import-config-truenas-1.png)

Then click **Manage Configuration** \> **Upload File.** Manage configuration is found top right of the screen.

![](https://docs.hexos.com/import-truenas-config-2.png)

You will be reminded that your temporary password will now be replaced by the original password.

![](/import-truenas-config-4.png)

Navigate to and select your config file

![](/import-truenas-config-3.png)

Click **Upload**

![](/config-upload-5.png)

The import will run and the system will reboot. 

![](https://docs.hexos.com/screenshot_from_2026-06-26_22-04-56.png)

While the system is rebooting you will see the error “Connecting to TrueNAS”. 

![](/shutdown-error-truenas.png)

When the system has rebooted you will see the login screen.

![](/truenas-login-screen.png)

When you log back in, you will need to use the original password which was noted at the start of the process. The temporary password is no longer used.

### Import keys for encrypted data and set up SMB share (if necessary)

If you had encrypted data with keys (as opposed to passphrases)

Go to **Datasets** and click the encrypted dataset

![](/key-import-truenas-1.png)

Scroll down to **Encryption** and click **Unlock**

![](/key-import-truenas-2.png)

Click **Choose File**

![](/key-import-truenas-3.png)

Choose your keyfile from backup

![](/key-import-truenas-4.png)

Click **Save**

![](/key-import-truenas-5.png)

Click **Continue**

![](/key-import-from-truenas-6.png)

When the process has finished you can click **Close**

![](/key-import-truenas-7.png)

Additionally, as the key encrypted dataset was created in TrueNAS it needs an SMB share setting up to be accessible in HexOS (if it dosent already have one)

Go to **Shares** and click the **View All** button to see if the encrypted dataset has a share set up. 

![](/truenas-set-up-smb-share-1.png)

In this example the dataset Top-Secret-With-Key is not on the list.

![](/truenas-set-up-smb-share-2.png)

To set up the share click **Add** which is towards the top right

![](/truenas-set-up-smb-share-3.png)

Click the **arrow** to find the dataset

![](/truenas-set-up-smb-share-4.png)

Select the dataset from the list

![](/truenas-set-up-smb-share-5.png)

Then scroll down to the bottom of the dialogue to click the **Save** button

![](/truenas-set-up-smb-share-6.png)

You should now see your new share on the list

![](/truenas-set-up-smb-share-7.png)

Please note that, as of writing, this folder needs to be locked and unlocked via the TrueNAS interface. 

When unlocked, the data will be accessible via HexOS. If the folder is locked, however, it cannot be unlocked within HexOS: only passphrase encryption is supported in the HexOS dashboard..

### Set apps pool correctly (if necessary)

Go to the **Apps** screen. If the apps show **Running** in the **Status** column then this step can be skipped. 

If they are not running or not visible you need to choose the correct pool for apps.

If you are unsure which pool is the apps pool, it will be the first one you set up when the system was first built. If you set up multiple pools at once it will be the first pool that used SSD's.

Go to **Apps** > **Configuration** > **Unset Pool**

![](https://docs.hexos.com/apps-after-reinstall-truenas-1.png)

Click **Unset**

![](https://docs.hexos.com/apps-after-reinstall-truenas-2.png)

The process will run

![](https://docs.hexos.com/apps-after-reinstall-truenas-3.png)

You will see **No applications installed** 

![](https://docs.hexos.com/apps-after-reinstall-truenas-4.png)

Restart TrueNAS by clicking **power icon** > **Restart**

![](https://docs.hexos.com/restart-truenas.png)

After rebooting and logging in, go to **Apps** > **Configuration** > **Choose Pool**

![](https://docs.hexos.com/apps-after-reinstall-truenas-6.png)

Select your pool from the dropdown and click **Choose.** If you have multiple pools your apps pool is likely to be the first one you created. If you created multiple pools it will be the first one using SSD's (as opposed to HDDs)

![](https://docs.hexos.com/apps-after-reinstall-truenas-7.png)

Your apps should show back up. Start them by clicking the triangular play symbol under **Controls**

![](/apps-after-reinstall-truenas-8.png)

After apps have started you should see **Running** in green in the **Status** column.

![](/apps-after-reinstall-truenas-9.png)

**Checks**

-   [ ] You have imported your pools
-   [ ] You have uploaded your config
-   [ ] All apps are running

## Claim the new server on HexOS deck

In this section we will claim the server in the HexOS deck, making sure to skip the create pool step.

**You will need**

-   [ ] HexOS.com username and password
-   [ ] A HexOS licence
-   [ ] Server password

### Unclaim server

In most situations you will need to unclaim your old server in order to claim a new one.

To do this, log in to [deck.hexos.com](https://deck.hexos.com/dash) with your the email and password used when you purchased your HexOS licence.

![](/unclaim-hexos-server-1.png)

When you reach the deck, you will see **This server is not available.** 

If you have multiple servers make sure that the server name, at the top of the screen, is the server you are currently working on.

Click **Unclaim Server**

![](/unclaim-hexos-server-2.png)

Click **Unclaim this server from HexOS** 

![](/unclaim-hexos-server-3.png)

### Claim the new server

[Follow the guide to claim the new server](/getting-started/setup/CompleteSetup) - noting carefully the differences described below, **your data is at risk.**

#### **Skip Create Storage Pool Step**

**DATA AT RISK**

The following steps are **ESSENTIAL** to avoid data loss. Notice that your storage drives are shown to have data on: this is your pool data. Click **Continue**.

![](/skip-pool-creation-1.png)

Next, when you reach the **Storage pools** screen you ***MUST*** click **Skip.**

![](/skip-pool-creation-2.png)

**Check the box** and click **Confirm**

![](https://docs.hexos.com/skip-pool-creation-3.png)

Then finish any remaining steps in the [guide](https://docs.hexos.com/getting-started/setup/CompleteSetup) and your server should now be as it was before. 

**Final Checks**

-   Check apps are running
-   Check users and folder permissions are correct

![](/check-apps.png)

![](/check-folder-permissions.png)

> Help to improve HexOS documentation: [join the #Docs channel on discord](https://discord.com/invite/DjEp3WRHKz) today!
{.is-contribute}
