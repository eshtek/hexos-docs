# Migrating Immich to New Storage Configuration (Rsync Method)

*by [@forsaken](https://hub.hexos.com/profile/17319-forsaken/)*

This guide explains how to migrate Immich from the deprecated storage configuration to the new unified storage structure using rsync.

:::warning Advanced Guide
This guide requires SSH access and command-line operations in TrueNAS. Only follow if you're comfortable with terminal commands. Type carefully - mistakes could cause data loss.
:::

## Overview

This method creates a new unified `data` dataset and uses rsync to copy all Immich data into it. Rsync is used because TrueNAS datasets with ACL don't work well with regular copy operations.

## Prerequisites

- Active Immich installation with old storage configuration
- SSH access enabled on TrueNAS
- Enough storage space to temporarily hold duplicate data
- Recent backup of your photos and Immich data

## Migration Steps

### Step 1: Stop Immich

1. Go to TrueNAS
2. Navigate to **Apps**
3. Stop the **Immich** app

### Step 2: Create New Data Dataset

1. Go to **Datasets**
2. Find the `immich` dataset (inside `Applications`)
3. Create a new dataset inside it:
   - Name: `data`
   - Dataset Preset: `Generic`

### Step 3: Strip ACL from Data Dataset

:::tip Why Strip ACL?
TrueNAS datasets with ACL (Access Control Lists) conflict with rsync. Stripping ACL allows proper file copying.
:::

1. Click on the `data` dataset you just created
2. Click **Edit** in the **Permissions** section (right side)
3. Click **Strip ACL**

After stripping, the permissions section should show Unix-style permissions (like `rwxr-xr-x`) instead of ACL entries.

### Step 4: Enable SSH Access

1. Go to **System** > **Services**
2. Start the **SSH** service

:::tip Why SSH?
The TrueNAS web shell times out during long operations. SSH provides a stable connection for the time-consuming copy process.
:::

### Step 5: Copy Data Using Rsync

1. Connect to TrueNAS using SSH
2. Run the following commands **one by one**
3. Each command will take time depending on your data size and disk speed

```bash
sudo rsync -avh --stats --progress /mnt/.ix-apps/app_mounts/immich/backups/ /mnt/HDDs/Applications/immich/data/backups/

sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/profile/ /mnt/HDDs/Applications/immich/data/profile/

sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/thumbs/ /mnt/HDDs/Applications/immich/data/thumbs/

sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/encoded_videos/ /mnt/HDDs/Applications/immich/data/encoded-video/

sudo rsync -avh --stats --progress /mnt/HDDs/Applications/immich/uploads/ /mnt/HDDs/Applications/immich/data/upload/

sudo rsync -avh --stats --progress /mnt/HDDs/Photos/ /mnt/HDDs/Applications/immich/data/library/
```

:::warning Replace Pool Name
Replace `HDDs` with your actual pool name. Check your dataset paths in the TrueNAS UI if unsure.
:::

### Step 6: Update Immich Configuration

1. In TrueNAS, go to **Apps**
2. Select **Immich** and click **Edit**
3. Scroll down and **uncheck** "Use Old Storage Configuration (Deprecated)"
4. In **Data Storage (aka Upload Location)**:
   - Select: `Host Path (Path that already exists on the system)`
   - Enter Host Path: `/mnt/HDDs/Applications/immich/data`
5. Scroll down and click **Update**

### Step 7: Start and Verify

1. Wait for Immich to change from "Deploying" to "Running"
2. Open Immich and verify:
   - All photos and videos are present
   - Thumbnails load correctly
   - Search works
   - Upload works
   - Download works
   - Automatic backups work

### Step 8: Update Immich

1. From TrueNAS **Apps**, update Immich to the latest version
2. Verify everything still works after the update

### Step 9: Cleanup

:::danger Verify First
Only perform cleanup after thoroughly testing that all data copied correctly and Immich works perfectly.
:::

1. Go to **System** > **Services** and stop the **SSH** service
2. Delete the old datasets:
   - `/mnt/HDDs/Applications/immich/backups`
   - `/mnt/HDDs/Applications/immich/profile`
   - `/mnt/HDDs/Applications/immich/thumbs`
   - `/mnt/HDDs/Applications/immich/encoded_videos`
   - `/mnt/HDDs/Applications/immich/uploads`

## Troubleshooting

### Rsync Shows Permission Errors

- Ensure you used `sudo` with the rsync commands
- Verify you stripped ACL from the data dataset
- Check that your user has admin privileges

### Immich Won't Start After Migration

- Check that the host path is correct
- Verify all folders exist in the new data directory
- Check TrueNAS logs for specific error messages

### Missing Photos After Migration

- Don't delete old datasets until you've verified everything copied
- Use `ls -la` to check folder contents
- Compare file counts between old and new locations

## Related Resources

- [Immich Documentation](https://immich.app/docs)
- [TrueNAS Scale Documentation](https://www.truenas.com/docs/scale/)
