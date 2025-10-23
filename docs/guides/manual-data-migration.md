# Manual Data Migration

This guide will walk through manually migrating your data while automatic data transfer is being developed. 

## Before You Begin

### What You'll Need

- **TrueNAS access** - Your login credentials (typically `truenas_admin` and the password you set during setup)
- **Your HexOS IP address** - Use this as the URL to access TrueNAS
- **Time** - Data migration can take from minutes to hours depending on your data size

### When to Use This Guide

- Moving app data to a new location
- Reorganizing storage between folders or datasets
- Migrating to faster storage (HDD to SSD)
- Consolidating multiple datasets

:::warning Important
Always have backups before moving data. While this process is safe, having a backup ensures you can recover if something unexpected happens.
:::

## Step 1: Find Your Current Location

First, identify where your data currently lives.

In TrueNAS, go to **Apps** > Find your app > Click **Edit** > Look for **Host Path** in the storage configuration.

![Finding the current host path](/assets/screenshots/migration-check-host-path.png)

In this example, Immich is using `/mnt/HDDs/Photos/immich`.

## Step 2: Stop Your App

If you're migrating data from an app, you must stop that app first.

In TrueNAS, go to **Apps** > Find your app > Click **Stop**.

![Confirming app is stopped](/assets/screenshots/migration-app-stopped.png)

Wait until the app shows as **Stopped** before continuing.

## Step 3: Create Your New Dataset

You'll need a destination for your data. While you can create folders in HexOS, this guide shows the TrueNAS method for complete control.

### Navigate to Datasets

In the left sidebar, click **Datasets**.

![Datasets in sidebar](/assets/screenshots/migration-datasets-sidebar.png)

### Select Your Pool

Find the pool where you want to create the new dataset. In this example, we're using the `HDDs` pool.

![Selecting the pool](/assets/screenshots/migration-pool-selection.png)

### Add New Dataset

Click **Add Dataset** button.

![Add dataset button](/assets/screenshots/migration-add-dataset-button.png)

### Configure the Dataset

- **Name**: Enter your dataset name (e.g., `PhotosNew`)
- **Dataset Preset**: Select **Generic**

![Dataset creation form](/assets/screenshots/migration-dataset-creation.png)

Click **Save** to create the dataset.

:::tip Why Generic?
The Generic preset uses simple permissions that work well for data migration. You can always adjust permissions later if needed.
:::

## Step 4: Access TrueNAS Shell

Now we'll use the command line to migrate your data.

In the left sidebar, click **System** > **Shell**.

![Accessing TrueNAS shell](/assets/screenshots/migration-shell-access.png)

## Step 5: Verify Your Source Data

Before migrating, confirm you're looking at the right data.

Run this command (replace the path with your source location):

```bash
ls -lah /mnt/HDDs/Photos
```

![Verifying source location](/assets/screenshots/migration-verify-source.png)

You should see your expected folders. In this example, there's an `immich` folder containing the data to migrate.

:::info Note on App Data vs. Files
When migrating app data (like Immich), you're moving the entire data structure, not just individual files. The app needs all its folders (library, upload, thumbs, backups, etc.) together to function properly.

If you're just moving files between folders, the same process works - you're simply moving whatever folders/files you need.
:::

## Step 6: Migrate Data with Rsync

Now we'll copy the data using `rsync`, which safely copies everything while preserving permissions and timestamps.

Run this command (adjust paths for your situation):

```bash
sudo rsync -avh --stats --progress /mnt/HDDs/Photos/immich/ /mnt/HDDs/PhotosNew/immich/
```

You'll be prompted for your `truenas_admin` password.

### What This Command Does

- `-a` = Archive mode (preserves permissions, timestamps, ownership)
- `-v` = Verbose (shows what's being copied)
- `-h` = Human-readable sizes
- `--stats` = Shows summary when complete
- `--progress` = Shows progress for each file

### What You'll See

Files will scroll by as they copy. When complete, you'll see a summary:

![Rsync completion summary](/assets/screenshots/migration-rsync-complete.png)

Key things to check in the summary:
- `Number of files` - How many files were copied
- `Total file size` - Total amount of data transferred
- `speedup` - Rsync efficiency metric

:::warning This Can Take Time
Large data migrations can take hours. The time depends on:
- Amount of data
- Number of files
- Disk speed (HDDs are slower than SSDs)
- Whether you're copying within the same pool or between pools
:::

## Step 7: Verify the Migration

Now confirm the data copied correctly.

### Check the New Location

First, verify the folder structure exists:

```bash
ls -lah /mnt/HDDs/PhotosNew/
```

![Verifying destination has data](/assets/screenshots/migration-verify-destination.png)

You should see the same folder structure as your source.

### Compare Sizes

Check that the data sizes match:

```bash
du -sh /mnt/HDDs/Photos/immich
du -sh /mnt/HDDs/PhotosNew/immich
```

![Comparing folder sizes](/assets/screenshots/migration-size-difference.png)

You might see a small difference like `1.2M` vs `1.1M`. This is usually due to rounding.

### Check Exact Sizes

For precision, check the exact byte count:

```bash
du -sb /mnt/HDDs/Photos/immich
du -sb /mnt/HDDs/PhotosNew/immich
```

![Exact size comparison](/assets/screenshots/migration-exact-size.png)

The sizes should match exactly.

## Step 8: Update App Configuration

Now point your app to the new location.

In TrueNAS, go to **Apps** > Your app > **Edit**.

Scroll to **Storage Configuration** (or use the right-side navigation), then update the **Host Path** to your new location.

![Updating host path to new location](/assets/screenshots/migration-update-path.png)

Click **Update** to save.

## Step 9: Fix Permissions

This is a critical step! When rsync copies files, they may be owned by `root` instead of the user your app needs.

### Start Your App First

Try starting your app. If it fails to start or shows errors, you need to fix permissions.

### Check for Permission Errors

In TrueNAS, go to your app > **Workloads** section on the right.

![Workloads showing errors](/assets/screenshots/migration-workloads-error.png)

If you see containers showing "Exited" (like `server` or `permissions`), click **View Logs**.

![Permission denied errors in logs](/assets/screenshots/migration-permission-error-logs.png)
*Here, the permission error is showing inside of `server` **View Logs***

If you see `EACCES: permission denied` errors, there is an issue with your permissions

### Check Current Ownership

In the shell, check who owns the files:

```bash
ls -la /mnt/HDDs/PhotosNew/immich/
```

![Checking file ownership](/assets/screenshots/migration-check-ownership.png)

### Understanding the Output

```
drwxrwx--- 2 apps root 3 Oct 23 08:42 backups
```

Breaking this down:
- `drwxrwx---` = permissions
- `2` = number of links
- **`apps`** = **owner** (this is what matters!)
- `root` = group
- `backups` = folder name

### The Problem

Look at the first two lines:
- `.` (current directory = immich folder) = owned by `root:root` 
- `..` (parent directory) = owned by `root:root`
- Subfolders (backups, library, etc.) = owned by `apps:root` 

The parent `immich` folder itself is owned by `root`, which prevents the app from accessing it.

### Fix Ownership

Change ownership of everything to the app user (typically UID `568`, which shows as `apps`):

```bash
sudo chown -R 568:568 /mnt/HDDs/PhotosNew/immich/
```

### Verify the Fix

Check ownership again:

```bash
ls -la /mnt/HDDs/PhotosNew/immich/
```

![Ownership fixed to apps user](/assets/screenshots/migration-ownership-fixed.png)

Now everything should be owned by `apps:apps`.

## Step 10: Start and Verify Your App

Start your app again. It should now work correctly!

### Check Workloads

In TrueNAS, check your app's workloads:

![Workloads showing success](/assets/screenshots/migration-workloads-success.png)

You should see:
- ✅ `server` = Running
- ✅ `redis` = Running (if applicable)
- ✅ `machine-learning` = Running (if applicable)
- ✅ Other containers = Running
- ✅ `permissions` = Exited (this is normal!)

:::info The Permissions Container
The `permissions` container is designed to run once at startup, check/fix permissions, then exit. "Exited" status for this container is expected and correct - it's not an error.
:::

### Test Your App

Open your app and verify:
- Your data is visible
- Everything functions as expected
- You can upload/download (if applicable)
- All features work normally

## Step 11: Cleanup (Wait First!)

:::danger Don't Delete Old Data Yet!
Wait at least a few days (or longer for critical data) to confirm everything works perfectly before deleting the old data.
:::

Once you're confident everything works:

### Delete Old Data

```bash
sudo rm -rf /mnt/HDDs/Photos/immich
```

### Delete Empty Datasets (Optional)

If you want to remove the old dataset entirely:
1. Go to **Datasets** in TrueNAS
2. Select the old dataset
3. Click **Delete**

## Understanding Permissions

When you create a new dataset in TrueNAS, it may have different permissions than your source. Here's what you might see:

```bash
drwxrwx---  3 root root  4 Sep 17 05:21 Photos
drwxr-xr-x  3 root root  3 Oct 23 09:20 PhotosNew
```

### Breaking Down Permissions

**Photos: `drwxrwx---`**
- Owner (root): `rwx` = read, write, execute ✓
- Group (root): `rwx` = read, write, execute ✓
- Others: `---` = no access

**PhotosNew: `drwxr-xr-x`**
- Owner (root): `rwx` = read, write, execute ✓
- Group (root): `r-x` = read, execute (no write)
- Others: `r-x` = read, execute (no write)

This difference is why you might encounter "Permission denied" errors when accessing the new location.

### Fixing Permission Issues

If you get "Permission denied" in the shell:

1. Switch to root user:
   ```bash
   sudo -s
   ```
2. Enter your password (it won't show as you type - this is normal)
3. Continue with your commands

The permission fix in Step 9 (`chown -R 568:568`) ensures your app can access the data.

## Troubleshooting

### App Won't Start

**Problem**: App shows errors or won't start after migration

**Solutions**:
1. Check app logs for specific errors
2. Verify the path is correct in app configuration
3. Confirm all data copied successfully
4. Fix ownership with `chown -R 568:568 /path/to/data`
5. Restart the app

### Sizes Don't Match

**Problem**: Source and destination show different sizes

**Solutions**:
1. Use `du -sb` to check exact byte counts
2. Small differences (KB) are usually rounding or hidden files
3. Large differences mean something didn't copy - run rsync again
4. Check for error messages in rsync output

### Permission Denied Errors

**Problem**: Can't access files or folders in shell

**Solutions**:
1. Use `sudo` before commands
2. Switch to root with `sudo -s`
3. Check dataset permissions in TrueNAS UI
4. Fix ownership to match app requirements

### Very Slow Transfer

**Problem**: Rsync taking much longer than expected

**Possible Causes**:
1. Many small files (slower than few large files)
2. Slow disk speed (HDDs vs SSDs)
3. Copying between different pools
4. System under heavy load

**Tips**:
- Be patient - this is normal for large datasets
- Monitor with `watch df -h` to see progress
- Avoid running other intensive tasks during migration

## Related Resources

- [Updating Location Paths](/guides/updating-location-paths) - HexOS automatic path updates
- [Community Guides](/community/community-guides/) - App-specific migration guides
- [Immich Migration (Rsync Method)](/community/community-guides/ImmichMigrationRsync) - Detailed Immich example
- [Immich Migration (Move Method)](/community/community-guides/ImmichMigrationMove) - Alternative Immich approach
