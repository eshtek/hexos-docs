# Migrating Immich to New Storage Configuration (Move Method)

*by [@G-M0N3Y-2503](https://hub.hexos.com/profile/29328-g-m0n3y-2503/)*

This guide explains how to migrate Immich from the deprecated storage configuration to the new unified storage structure by moving files directly.

:::warning Advanced Guide
This guide requires SSH access and command-line operations in TrueNAS. Only follow if you're comfortable with terminal commands and understand file system operations.
:::

## Overview

This method moves existing data folders into a new unified structure using the `mv` command. It leverages TrueNAS snapshots as a safety net, since the original data remains in snapshots even after moving.

## Migration Strategy

The goal is to consolidate all Immich data under a single parent directory that mimics how a fresh Immich installation would be structured:

**New Structure:**
```
/mnt/<pool>/Photos/immich/
├── backups/
├── encoded-video/
├── profile/
├── thumbs/
├── upload/
└── library/
```

## Prerequisites

- Active Immich installation with old storage configuration
- SSH access enabled on TrueNAS
- Snapshots of existing datasets (for safety)
- Recent backup of your photos and Immich data

## Old vs New Storage Layout

### Postgres Data Storage
- **Old:** `/mnt/<pool>/Applications/immich/postgres_data` → `/var/lib/postgresql/data`
- **New:** `/mnt/<pool>/Applications/immich/postgres_data` → `/var/lib/postgresql/data`
  - *(Stays the same)*

### Immich Backups Storage
- **Old:** `/mnt/<pool>/Applications/immich/db_backups` → `/data/backups`
- **New:** `/mnt/<pool>/Photos/immich{/backups}` → `/data{/backups}`

### Immich Video Storage
- **Old:** `/mnt/<pool>/Applications/immich/encoded_videos` → `/data/encoded-video`
- **New:** `/mnt/<pool>/Photos/immich{/encoded-video}` → `/data{/encoded-video}`

### Immich Profile Storage
- **Old:** `/mnt/<pool>/Applications/immich/profile` → `/data/profile`
- **New:** `/mnt/<pool>/Photos/immich{/profile}` → `/data{/profile}`

### Immich Thumbs Storage
- **Old:** `/mnt/<pool>/Applications/immich/thumbs` → `/data/thumbs`
- **New:** `/mnt/<pool>/Photos/immich{/thumbs}` → `/data{/thumbs}`

### Immich Uploads Storage
- **Old:** `/mnt/<pool>/Applications/immich/uploads` → `/data/upload`
- **New:** `/mnt/<pool>/Photos/immich{/upload}` → `/data{/upload}`

### Immich Library Storage
- **Old:** `/mnt/<pool>/Photos` → `/data/library`
- **New:** `/mnt/<pool>/Photos/immich{/library}` → `/data{/library}`

:::tip Folder Notation
`{/folder}` represents a regular folder, not a TrueNAS dataset
:::

## Migration Steps

### Step 1: Prepare

1. **Create backups** of your Immich data
2. **Take snapshots** of all Immich datasets in TrueNAS
3. **Stop Immich** from the TrueNAS Apps page
4. **Enable SSH** in System > Services

### Step 2: Create New Dataset

1. Go to **Datasets** in TrueNAS
2. Create dataset: `/mnt/<pool>/Photos/immich`

### Step 3: Move Simple Folders

Connect via SSH and run these commands:

```bash
mv /mnt/<pool>/Applications/immich/db_backups /mnt/<pool>/Photos/immich/backups

mv /mnt/<pool>/Applications/immich/encoded_videos /mnt/<pool>/Photos/immich/encoded-video

mv /mnt/<pool>/Applications/immich/profile /mnt/<pool>/Photos/immich/profile

mv /mnt/<pool>/Applications/immich/thumbs /mnt/<pool>/Photos/immich/thumbs

mv /mnt/<pool>/Applications/immich/uploads /mnt/<pool>/Photos/immich/upload
```

:::warning Replace Pool Name
Replace `<pool>` with your actual pool name (e.g., `HDDs`, `SSDs`, etc.)
:::

:::tip Permission Warnings
You may see permission warnings during the move operations. These typically don't cause issues, but verify data integrity afterward.
:::

### Step 4: Move Library Data

The library data needs special handling since it's in the same location as your new immich parent folder:

```bash
mkdir /mnt/<pool>/Photos/immich/library

mv /mnt/<pool>/Photos/.immich /mnt/<pool>/Photos/immich/library/.immich

# Move each user's photo folder
mv /mnt/<pool>/Photos/<user1> /mnt/<pool>/Photos/immich/library/<user1>
mv /mnt/<pool>/Photos/<user2> /mnt/<pool>/Photos/immich/library/<user2>
```

:::info User Folders
Replace `<user1>`, `<user2>`, etc. with your actual user folder names. List folders with `ls /mnt/<pool>/Photos/` to see what needs moving.
:::

### Step 5: Update Immich Configuration

1. In TrueNAS, go to **Apps**
2. Select **Immich** and click **Edit**
3. **Uncheck** "Use Old Storage Configuration (Deprecated)"
4. Configure storage paths:
   - **Data Storage (aka Upload Location):** `/mnt/<pool>/Photos/immich`
   - **Postgres Data Storage:** `/mnt/<pool>/Applications/immich/postgres_data`
5. Click **Save**

### Step 6: Start and Test

1. Start Immich and wait for status to change to "Running"
2. Thoroughly test all functionality:
   - Browse photos and videos
   - Play videos
   - View thumbnails
   - Search for photos
   - Upload new photos
   - Download photos
   - Check that automatic backups work
   - Verify sharing features

### Step 7: Update Immich

Once verified working:

1. Update Immich to the latest stable version
2. Test again after the update

### Step 8: Clean Up Empty Datasets

:::danger Only After Verification
Only delete old datasets after confirming everything works perfectly for several days. Remember, snapshots may still contain the original data if you need to recover.
:::

Delete these empty datasets from TrueNAS:
- `/mnt/<pool>/Applications/immich/db_backups`
- `/mnt/<pool>/Applications/immich/encoded_videos`
- `/mnt/<pool>/Applications/immich/profile`
- `/mnt/<pool>/Applications/immich/thumbs`
- `/mnt/<pool>/Applications/immich/uploads`

1. Go to **Datasets**
2. Select each empty dataset
3. Click **Delete Dataset**
4. Confirm the deletion

## Why Use Move Instead of Copy?

The `mv` command is safer than `cp` in this scenario because:
- TrueNAS snapshots preserve the original data
- No need for double the storage space during migration
- Faster operation (no actual file copying)
- Data is atomically moved, not duplicated then deleted

If something goes wrong, you can restore from snapshots.

## Troubleshooting

### Permission Errors During Move

- Ensure you're using `sudo` if needed
- Check that you have write permissions on both source and destination
- Verify dataset permissions in TrueNAS UI

### Immich Shows Missing Photos

- Check that all user folders were moved to `library/`
- Verify folder paths with `ls -la /mnt/<pool>/Photos/immich/`
- Ensure `.immich` hidden folder was moved

### App Won't Start After Migration

- Double-check the paths in Immich configuration
- Ensure all required folders exist in the new location
- Check TrueNAS logs for specific errors
- Verify postgres_data path is still correct

### Want to Revert

If you have snapshots:
1. Stop Immich
2. Restore the relevant snapshots in TrueNAS
3. Reconfigure Immich with old storage settings
4. Delete the new immich dataset

## Related Resources

- [Immich Documentation](https://immich.app/docs)
- [TrueNAS Scale Documentation](https://www.truenas.com/docs/scale/)
- [TrueNAS Snapshots Guide](https://www.truenas.com/docs/scale/scaletutorials/dataprotection/snapshots/)
