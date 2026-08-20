---
title: Migrating Immich to New Storage Configuration (Rsync Method)
description: 
published: false
date: 2026-07-07T18:26:56.464Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:39:11.970Z
---

# Migrating Immich to new storage configuration (rsync method)

> **Thank you:** @forsaken for the original guide
{.is-contribute}

I fixed it! 😁, but it was a pain to do it because rsync and TrueNAS datasets that have ACLs don't like each other.

I made a small guide, but it requires you to enter TrueNAS and run commands, so don't even try to follow it if you are not comfortable with getting your hands dirty, do it at your own risk since if you type something wrong you could make a mess.

I'm just a guy that wanted to have this fixed soon, I know enough to fix things, but also little enough to make big mistakes and break them. Maybe this fix that I came up with is really a bad idea, I don't know. So, follow at your own risk!

## Guide (read it completely first, maybe there is a step that you don't want to do)

### Stop Immich

- Go to TrueNAS
- Go to **Apps** and stop **Immich**

### Create data dataset

- Go to **Datasets** and create a dataset inside of the **immich** dataset (that is inside **Applications**), name it `data`, don't worry about the dataset preset, choose **Generic**.

<details>
<summary> Creating the data dataset </summary>

![Creating the data dataset](/assets/screenshots/immich-create-data-dataset.png){.medium .framed}
</details>

### Strip ACL permissions

- Click the `data` dataset that you just created, then click **Edit** on the **Permissions** section (it is located on the right)
- Click **Strip ACL** (because TrueNAS doesn't like rsync touching datasets that use ACLs)

<details>
<summary> Strip ACL button </summary>

![Strip ACL permissions button](/assets/screenshots/immich-strip-acl-permissions.png){.medium .framed}
</details>

- After that, when you click on the `data` dataset the permissions section should look like this:

<details>
<summary> Permissions after stripping ACL </summary>

![Permissions after stripping ACL](/assets/screenshots/immich-stripped-permissions.png){.medium .framed}
</details>

### Enable SSH and copy data

- On **System** > **Services** I started the SSH service (this is because the web shell times out and disconnects me, so I opted to connect remotely using SSH)
- Connected to TrueNAS using SSH (if you don't know what SSH is, maybe you should not be doing this manual fix)
- Run the following commands (one by one to check that everything copied fine, also, this will take a lot of time depending on the number of photos and videos and the speed of your disks, for me it took hours):

```bash
sudo rsync -avh --stats --progress /mnt/.ix-apps/app_mounts/immich/backups/       /mnt/HDDs/Applications/immich/data/backups/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/profile/         /mnt/HDDs/Applications/immich/data/profile/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/thumbs/          /mnt/HDDs/Applications/immich/data/thumbs/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/encoded_videos/  /mnt/HDDs/Applications/immich/data/encoded-video/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/uploads/         /mnt/HDDs/Applications/immich/data/upload/
sudo rsync -avh --stats --progress /mnt/HDDs/Photos/                              /mnt/HDDs/Applications/immich/data/library/
```

### Update Immich configuration

- In TrueNAS, go to **Apps**, click **Immich** and click **Edit**, scroll down and uncheck **Use Old Storage Configuration (Deprecated)**
- In **Data Storage (aka Upload Location)** click **Host Path (Path that already exists on the system)** and input `/mnt/HDDs/Applications/immich/data` in **Host Path**
- Scroll down and click **Update**

### Start and verify

- Start Immich and wait for it to change from **Deploying** to **Running**
- Enter Immich and check that everything is working, that your photos and videos are there
- Go back to TrueNAS, **Apps**, and then update Immich (I did it from TrueNAS, but I guess you could do it from HexOS? not sure)

> **Warning:** Check that everything is working fine! Automatic backups, uploads, downloads, search, everything!
{.is-warning}


### Cleanup

- Go back to Services and stop the SSH service
- Delete the old datasets (be 100% sure that everything copied fine and all your files are copied to the new `data` dataset before doing this)

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
