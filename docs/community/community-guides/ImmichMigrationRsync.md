# Migrating Immich to New Storage Configuration (Rsync Method)

*by [@forsaken](https://hub.hexos.com/profile/17319-forsaken/)*

I fixed it! 😁, but it was a pain to do it because rsync and truenas dataset that have ACL don't like each other.

I made a small guide, but it requires to enter to Truenas and run commands, so don't even try to follow it if it you are not comfortable with getting your hands dirty, do it at your own risk since if you type something wrong you could make a mess.

I'm just a guy that wanted to have this fixed soon, I know enough to fix things, but also little enough to make big mistakes and break them. Maybe this fix that I came with is really a bad idea, I don't know. So, follow at your own risk!

## Guide (read it complete first, maybe there is a step that you don't want to do)

### Stop Immich

- Go to Truenas
- Go to "Apps" and stop "immich"

### Create Data Dataset

- Go to "Datasets" create a dataset inside of the "immich" dataset (that is inside "Applications"), Name it `data`, don't worry about the dataset preset, choose "Generic".

![Creating the data dataset](/assets/screenshots/immich-create-data-dataset.png)

### Strip ACL Permissions

- Click the `data` dataset that you just created click "Edit" on the "Permissions" section (it is located on the right)
- Click "Strip ACL" (because Truenas don't like rsync touching datasets that use ACL)

![Strip ACL permissions button](/assets/screenshots/immich-strip-acl-permissions.png)

- After that, when you click on the `data` dataset the permissions section should look like this:

![Permissions after stripping ACL](/assets/screenshots/immich-stripped-permissions.png)

### Enable SSH and Copy Data

- On "System" > "Services" I started the SSH service (this is because the web shell times out and disconnects me, so I opted to connect remotely using SSH)
- Connected to Truenas using SSH (if you don't know what SSH is, maybe you should not be doing this manual fix)
- Run the following commands (one by one to check that everything copied fine, also, this will take a lot of time depending on the amount of photos and videos and the speed of your disks, for me it took hours):

```bash
sudo rsync -avh --stats --progress /mnt/.ix-apps/app_mounts/immich/backups/       /mnt/HDDs/Applications/immich/data/backups/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/profile/         /mnt/HDDs/Applications/immich/data/profile/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/thumbs/          /mnt/HDDs/Applications/immich/data/thumbs/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/encoded_videos/  /mnt/HDDs/Applications/immich/data/encoded-video/
sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/uploads/         /mnt/HDDs/Applications/immich/data/upload/
sudo rsync -avh --stats --progress /mnt/HDDs/Photos/                              /mnt/HDDs/Applications/immich/data/library/
```

### Update Immich Configuration

- In Truenas, Go to "Apps", select Immich and click "Edit", scroll down and uncheck "Use Old Storage Configuration (Deprecated)"
- In "Data Storage (aka Upload Location) select "Host Path (Path that already exists on the system)" and input `/mnt/HDDs/Applications/immich/data` in "Host Path"
- Scroll down and click "Update"

### Start and Verify

- Start immich and wait for it to change from "Deploying" to "Running"
- Enter to immich and check that everything is working, that your photos and videos are there
- Go back to Truenas, Apps, and then update immich (I did it from Truenas, but I guess you could do it from hexos? not sure)

:::warning CHECK THAT EVERYTHING IS WORKING FINE!
AUTOMATIC BACKUPS, UPLOADS, DOWNLOADS, SEARCH, EVERYTHING!
:::

### Cleanup

- Go back to Services and stop the SSH service
- Delete the old datasets (be 100% sure that everything copied fine and all your files are copied to the new `data` dataset before doing this)
