# Immich Support Guide

This guide helps you find the right solution based on your situation.

::: tip Immich 2.0 Released
Immich 2.0 was recently released. If you're planning a fresh installation, consider waiting until this version is officially packaged for TrueNAS to avoid additional migration steps.
:::

## What's your situation?

### Installing Immich for the first time
**This is you if:**
- You're trying to install Immich through Command Deck for the first time
- You see the error: `[EINVAL] values.storage.use_old_storage_config: Field was not expected`
- The installation fails before Immich ever starts

[Jump to solutions →](#fresh-installation)

### Upgrading from version before 1.143.0
**This is you if:**
- You have Immich already installed and running
- Your current version is earlier than 1.143.0 (check in Immich settings or Command Deck)
- You're trying to upgrade to a newer version
- You're experiencing issues after attempting an upgrade

[Jump to solutions →](#storage-migration)

### Upgrade failing or stuck
**This is you if:**
- You clicked "Update" in Command Deck
- You see: "Task failed due to staleness" error
- The app shows "Updating..." indefinitely
- The app won't start after an attempted update

[Jump to solutions →](#upgrade-issues)

<a id="scenario-1-fresh-installation"></a>
## Fresh Installation

**The problem:** The HexOS install script is missing a required storage configuration field.

**Your options:**

### Option 1: Install through TrueNAS

1. Access TrueNAS: HexOS Settings → Access TrueNAS
2. Navigate to Apps
3. Search for and install Immich
4. In storage configuration, set: `use_old_storage_config: false`
5. Follow the [official Immich TrueNAS guide](https://docs.immich.app/install/truenas)

**Note:** Apps installed through TrueNAS won't appear in Command Deck.

### Option 2: Wait for HexOS script update

The install script needs updating. Monitor the [HexOS Hub](https://hub.hexos.com/) for announcements.

<a id="scenario-2-storage-migration"></a>
## Storage Migration

**The problem:** Immich 1.143.0 changed the storage structure. Automatic migration during upgrades is unreliable—manual steps may be required.

**Before you start:**
- **Back up your data**
- Requires SSH access to TrueNAS
- Large libraries can take hours

**Steps:**

1. Stop Immich in Command Deck
2. Enable SSH in TrueNAS (HexOS Settings → Access TrueNAS)
3. Connect via SSH: `ssh root@<your-hexos-ip>`
4. Run migration commands:

```bash
# Replace paths with your actual dataset locations
rsync -av --progress /path/to/old/library/ /path/to/new/library/
rsync -av --progress /path/to/old/uploads/ /path/to/new/uploads/
rsync -av --progress /path/to/old/thumbs/ /path/to/new/thumbs/
rsync -av --progress /path/to/old/encoded-video/ /path/to/new/encoded-video/
rsync -av --progress /path/to/old/profile/ /path/to/new/profile/
```

5. Verify file counts and permissions match
6. Restart Immich in Command Deck

**For detailed guidance:** [Official Immich TrueNAS Migration Guide](https://docs.immich.app/install/truenas)

<a id="scenario-3-upgrade-issues"></a>
## Upgrade Issues

### "Task failed due to staleness"

This usually means storage migration hasn't been completed. Complete [Scenario 2: Storage Migration](#scenario-2-storage-migration) first, then retry the upgrade.

### Stuck on "Updating..."

1. Try stopping then uninstalling in Command Deck
2. If that doesn't work:
   - Access TrueNAS (HexOS Settings → Access TrueNAS)
   - Navigate to Apps
   - Force stop or delete Immich
3. Reinstall through Command Deck

## Understanding Responsibilities

**HexOS provides:**
- Install scripts for Command Deck
- App installation/uninstallation

**Immich (the app) provides:**
- Post-installation configuration
- Data migrations between versions
- App functionality

Some issues require Immich updates, not HexOS fixes.

## Need More Help?

1. Search [HexOS Hub Immich discussions](https://hub.hexos.com/)
2. Check [official Immich documentation](https://docs.immich.app/)
3. Post on the Hub with:
   - Your Immich version
   - Exact error message
   - Steps you've tried

**Related discussions:**
- [Immich Stable Release](https://github.com/immich-app/immich/discussions/22546)
- [Storage Migration Thread](https://hub.hexos.com/topic/3675-immich-update-through-command-deck-fails-failed-to-upgrade-app-task-failed-due-to-staleness/)
