---
title: Migrating Immich to New Storage Configuration
description: 
published: true
date: 2026-06-30T17:55:50.722Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:42.835Z
---

# Migrating Immich to a new storage configuration

> **Thank you:** @G-M0N3Y-2503 and @forsaken, whose community guides on moving Immich storage informed this walkthrough.
{.is-contribute}


## Prerequisites

- This guide requires at least enough storage space free on a pool to create another copy of your current Immich installation including media such as photos and videos.
- This guide only applies to 
   - curated Immich installations that have not been customized
   - users that can still access the Immich web UI
   - users with Immich version `v1.135.0` and higher
     1) Click **Apps** on the left sidebar
     2) Click on the **immich** app on the list (not the checkbox)
     3) View the **Application Version** in the **Application info** card
<details>
<summary> Application version in info card </summary>

![1.png](/immich-storage-migration/1.png =700x){.align-center}
</details>

## Preparation
- Note the contents of the **Photos** folder
   - This can be done by viewing the **Photos** folder via SMB shares.
   - [Instructions for how to access folder contents can be found here](/features/folders/how-to-access-folder-contents)
- Stop the **immich** application
- Log in to the TrueNAS UI
   1) Navigate to [HexOS Deck](https://deck.hexos.com)
   2) Navigate to the settings panel by clicking it on the left sidebar
   3) Click the **TrueNAS** button
   4) Log in
       - The username will be `truenas_admin`
       - The password will be what you selected when first installing HexOS

## Creating datasets

Once in the TrueNAS interface we will
1) Click **Datasets** in the left sidebar</br>
<details>
<summary> Datasets option in sidebar </summary>

![2.png](/immich-storage-migration/2.png =500x){.align-center}
</details>
2) Click on the pool with your **Photos** folder and click **Add Dataset**</br>
<details>
<summary> Add Dataset button </summary>

![3.png](/immich-storage-migration/3.png =700x){.align-center}
</details>
3) Name the dataset `Photos2` and click **Save**</br>
<details>
<summary> Naming the Photos2 dataset </summary>

![4.png](/immich-storage-migration/4.png =500x){.align-center}
</details>
4) Click on the original `Photos` dataset and then click **Add Dataset**
5) Name the dataset `immich`, set the Dataset Preset to **Apps** and then click **Save**</br>
<details>
<summary> Immich dataset with Apps preset </summary>

![5.png](/immich-storage-migration/5.png =500x){.align-center}
</details>

## Copying files

1) Click **System** in the left sidebar
2) Click **Shell** in the new sidebar</br>
<details>
<summary> Shell option in sidebar </summary>

![6.png](/immich-storage-migration/6.png =400x){.align-center}
</details>
3) Type `tmux` into the shell and press enter
   - This creates a session of the terminal that will keep going even if the TrueNAS web UI times out
   - If the TrueNAS web UI times out you can return to **Shell** and type `tmux attach` to re-enter the session
4) Input the following commands in sequential order
   - There will be a prompt for the admin password
   - When you enter the admin password the screen will not show any characters as a security feature
   - When the password is fully entered the command will run after pressing `enter`

> **Info:** The following commands are for users that have their Photos and Applications on HDDs
{.is-info}

> **Tip:** When accessing shell from a Windows computer, the paste command is changed to `Shift + Insert`
{.is-tip}

``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Photos/ /mnt/HDDs/Photos2/
```  
``` 
 sudo rsync -avh --stats --progress /mnt/.ix-apps/app_mounts/immich/backups/ /mnt/HDDs/Photos/immich/backups/ 
``` 
``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/profile/ /mnt/HDDs/Photos/immich/profile/ 
``` 
``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/thumbs/ /mnt/HDDs/Photos/immich/thumbs/ 
``` 
``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/encoded_videos/ /mnt/HDDs/Photos/immich/encoded-video/ 
``` 
``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/uploads/ /mnt/HDDs/Photos/immich/upload/ 
``` 
``` 
 sudo rsync -avh --stats --progress /mnt/HDDs/Photos2/ /mnt/HDDs/Photos/immich/library/ 
``` 

## Updating Immich

1) Click **Apps** in the left sidebar</br>
<details>
<summary> Apps option in sidebar </summary>

![7.png](/immich-storage-migration/7.png =300x){.align-center}
</details>
2) Click **immich** 
3) Verify the **immich** app version is **1.132.0 or higher** in the application information card again
4) Click **Edit** in the application information card</br>
<details>
<summary> Edit button on info card </summary>

![8.png](/immich-storage-migration/8.png =800x){.align-center}
</details>
5) Scroll down to the storage section
6) Uncheck **Use old storage configuration**</br>
<details>
<summary> Old storage configuration checkbox </summary>

![19.png](/immich-storage-migration/9.png =700x){.align-center}
</details>
7) Click **Host Path** for Data Storage (also known as Upload Location)
8) Set the Host path to `/mnt/HDDs/Photos/immich`</br>
<details>
<summary> Host path setting </summary>

![10.png](/immich-storage-migration/10.png =700x){.align-center}
</details>
9) Scroll down to the bottom and click the **Update** button
10) Verify that the Immich web UI is working
11) If the Immich web UI is working as expected, update the Immich app in [HexOS Deck](https://deck.hexos.com)
12) Verify that the Immich web UI is working and shows the most up-to-date version of Immich

## Cleaning up

1) Stop the Immich application
2) We will be deleting the old datasets to free up storage space (optional)
   1) Click **Datasets** in the left sidebar
   2) Click on the `Photos2` dataset created earlier, click the **clipboard** to copy and click **Delete**</br>
<details>
<summary> Deleting the Photos2 dataset </summary>

![11.png](/immich-storage-migration/11.png =750x){.align-center}
</details>
   3) Follow the on-screen prompts to confirm deletion</br>
<details>
<summary> Dataset deletion confirmation </summary>

![12.png](/immich-storage-migration/12.png =500x){.align-center}
</details>
   4) Navigate to the ~/Applications/immich/ dataset
   5) Delete the `Backups`, `encoded-video`, `profile`, `thumbs` & `upload` datasets. </br>

> **Danger:** Do not delete the `postgres_data` dataset in the ~/Applications/immich/ dataset
{.is-danger}

3) Open the original **Photos** folder using SMB again.
   1) Refer to the contents noted in the preparation section of this guide
   2) Make your hidden files visible
       - Mac: In the Finder app, while in the **Photos** folder, press `Command + Shift + Period` to toggle hidden files.
       - Windows: [Refer to these instructions](https://support.microsoft.com/en-us/windows/file-explorer-in-windows-ef370130-1cca-9dc5-e0df-2f7416fe1cb1#windowsversion=windows_11)
   3)  Delete all files & folders **other than** the `immich` folder and any files & folders you added to the **Photos** folder 
4) Re-enter shell
5) Type `tmux kill-server` and press enter
6) Verify the tmux session has ended by entering `tmux attach`
7) Restart the Immich application and verify that the web UI is working.
