# Migrating Immich to New Storage Configuration (Move Method)

*by [@G-M0N3Y-2503](https://hub.hexos.com/profile/29328-g-m0n3y-2503/)*

Just adding what I did to get it working for me. However, I received numerous permission warnings for the moves, but they didn't seem to have any ill effect.

My overall plan was to migrate from the old to the new, where the new is how I approximated a new install of Immich would look like.

:::info Permission Errors During Migration
You may see multiple permission denial errors per dataset during the move operations. They occur because ZFS dataset metadata and snapshot attributes cannot be moved with standard `mv` commands. As long as your actual data (photos, videos, etc.) moves successfully, these errors are harmless. The empty datasets can be cleaned up in step 7 after verifying everything works.  
*edit by [csmanel](https://hub.hexos.com/profile/27801-csmanel/)*  
:::

## Storage Layout

### Postgres Data Storage
* old  `/mnt/<pool>/Applications/immich/postgress_data`
  * in `/var/lib/postgresql/data`
* new  `/mnt/<pool>/Applications/immich/postgress_data`
  * in `/var/lib/postgresql/data`

### Immich Backups Storage
* old  `/mnt/<pool>/Applications/immich/db_backups`
  * in `/data/backups`
* new  `/mnt/<pool>/Photos/immich{/backups}`
  * in `/data{/backups}`

### Immich Video Storage
* old  `/mnt/<pool>/Applications/immich/encoded_videos`
  * in `/data/encoded-video`
* new  `/mnt/<pool>/Photos/immich{/encoded-video}`
  * in `/data{/encoded-video}`

### Immich Profile Storage
* old  `/mnt/<pool>/Applications/immich/profile`
  * in `/data/profile`
* new  `/mnt/<pool>/Photos/immich{/profile}`
  * in `/data{/profile}`

### Immich Thumbs Storage
* old  `/mnt/<pool>/Applications/immich/thumbs`
  * in `/data/thumbs`
* new  `/mnt/<pool>/Photos/immich{/thumbs}`
  * in `/data{/thumbs}`

### Immich Uploads Storage
* old  `/mnt/<pool>/Applications/immich/uploads`
  * in `/data/upload`
* new  `/mnt/<pool>/Photos/immich{/upload}`
  * in `/data{/upload}`

### Immich Library Storage
* old  `/mnt/<pool>/Photos`
  * in `/data/library`
* new  `/mnt/<pool>/Photos/immich{/library}`
  * in `/data{/library}`

Where `{/folder}` represents a folder rather than a TrueNAS data set

## Migration Steps

So I took the following steps to make that happen:

### 1. Make the necessary backups and stop Immich

### 2. Create the following data sets
* `/mnt/<pool>/Photos/immich`

### 3. Move the following uncomplicated folders

```bash
mv /mnt/<pool>/Applications/immich/db_backups /mnt/<pool>/Photos/immich/backups
mv /mnt/<pool>/Applications/immich/encoded_videos /mnt/<pool>/Photos/immich/encoded-video
mv /mnt/<pool>/Applications/immich/profile /mnt/<pool>/Photos/immich/profile
mv /mnt/<pool>/Applications/immich/thumbs /mnt/<pool>/Photos/immich/thumbs
mv /mnt/<pool>/Applications/immich/uploads /mnt/<pool>/Photos/immich/upload
```

### 4. Move the data in `/mnt/<pool>/Photos` to the subfolder `/mnt/<pool>/Photos/immich/library`

```bash
mkdir /mnt/<pool>/Photos/immich/library
mv /mnt/<pool>/Photos/.immich /mnt/<pool>/Photos/immich/library/.immich  
# Note: .immich is a file, not a folder
mv /mnt/<pool>/Photos/<user1> /mnt/<pool>/Photos/immich/library/<user1>
mv /mnt/<pool>/Photos/<user2> /mnt/<pool>/Photos/immich/library/<user2>
```

### 5. Uncheck "Use Old Storage Configuration (Deprecated)"
a. Set "Data Storage (aka Upload Location)" to `/mnt/<pool>/Photos/immich`

b. Set "Postgres Data Storage" to `/mnt/SSDs/Applications/immich/postgres_data`

### 6. Start Immich and test that everything is working

### 7. Clean up the empty data sets
* `/mnt/<pool>/Applications/immich/db_backups`
* `/mnt/<pool>/Applications/immich/encoded_videos`
* `/mnt/<pool>/Applications/immich/profile`
* `/mnt/<pool>/Applications/immich/thumbs`
* `/mnt/<pool>/Applications/immich/uploads`

---

The reason I did the move rather than a copy was that I had snapshots of the previous data sets, so effectively the same thing.
After that, I updated Immich to stable
