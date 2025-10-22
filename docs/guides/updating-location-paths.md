# Updating Location Paths

With the command deck update on `10-27` we introduced an easier way to reorganize storage without interrupting your apps. Users now have the ability to update a location path even after apps (using that path) have been installed!

:::info Note
This is just updating location paths NOT data. 
This feature is preparing for automatic data migration which will be coming soon. The guide will be updated when that feature arrives. 
:::
## Quick Overview

When you change a location path in HexOS (for example, from `HDDs/Photos` to `HDDs/Photos New`), HexOS will:
- Automatically detect which apps are using the old path
- Update each app's configuration to point to the new path
- Keep your data untouched and accessible
- Record all changes in Activity History

Previously, reorganizing storage meant breaking app paths or reinstalling apps. This feature removes that friction.

## Walkthrough

Before you begin:

Go to `Settings` then `Preferences`.
Here you can enable the [experimental features](/features/settings/experimental-features/) option underneath `Miscellaneous`.
:::tip
*If you have not enabled this feature, read all about the current experimental features [here](/features/settings/experimental-features/).*
:::

After enabling experimental features go to `Settings` then `Locations`.   
You are now ready to update location paths!

### 1. Navigate to your location

View the current path and which apps are using it.

<img src="/assets/screenshots/location-path-current-location.png" alt="Current location showing path and apps" width="400">

### 2. Update the location path

Click the edit button (pencil icon) and choose your new path. HexOS shows which apps will be affected.

<table><tr>
<td><img src="/assets/screenshots/location-path-update-dialog.png" alt="Update location path dialog"></td>
<td><img src="/assets/screenshots/location-path-migration-warning.png" alt="Migration warning dialog"></td>
</tr></table>

### 3. HexOS reconfigures your apps

HexOS will now update the location path and automatically reconfigure each affected app.

<table><tr>
<td><img src="/assets/screenshots/location-path-updating-progress.png" alt="Update in progress"></td>
<td><img src="/assets/screenshots/location-path-update-success.png" alt="Location successfully updated"></td>
</tr></table>

:::tip Something worth noting:
You will have a notification for updated location itself (in this case `Photos`), and you will also have individual notifications for the apps that are being updated (example: `Immich` & `Plex`).
::: 

<table><tr>
<td><img src="/assets/screenshots/location-path-app-reconfigured.png" alt="App reconfigured notification"></td>
<td><img src="/assets/screenshots/location-path-plex-reconfigured.png" alt="Plex reconfigured for new location"></td>
</tr></table>

### 4. Review in Activity History

All changes are recorded in Activity History with details about what changed and when.

<img src="/assets/screenshots/location-path-activity-history.png" alt="Activity history showing all updates" width="500">

## Important Notes

### Data Migration

As previously noted, automatic data migration (moving or merging your actual files) is still in development. For now, you'll need to manually move your files after updating the path. Once the new location is set, your apps will remain configured correctly and pointing to the new path.
