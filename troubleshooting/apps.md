---
title: Application Troubleshooting Guide
description: 
published: true
date: 2026-08-20T19:30:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:29.316Z
---

# Application troubleshooting guide

## Installation

- If installation fails once, try again immediately
- If it still fails, check the error
    - This can be done by clicking the bell icon at the top of HexOS Deck
    - If HexOS shows an unknown error you can find more details by entering TrueNAS and clicking the clipboard icon
<details> 
<summary> How to view the error in TrueNAS </summary>
1. Log in to HexOS Deck and go to **Settings**
 
2. Click the **TrueNAS** button
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) Click on the clipboard icon at the top of the screen
![3.png](/app-troubleshooting-guide/3.png =600x){.align-center}
</details> 

### Custom application name conflicts

When installing a custom application through TrueNAS, the name you assign must be unique across your system. If a custom application shares the exact name of an application available in the HexOS catalog, the installation will fail and the catalog application will not be installable until the conflict is resolved. This commonly occurs when setting up multiple instances of the same application configured for different purposes, such as:

- A separate Jellyfin instance for a kids-only media library
- An additional Minecraft server running a different modpack or world
- A dedicated Home Assistant instance used as a staging environment
- A second Vaultwarden instance reserved for family members
- An extra PostgreSQL instance isolated to a specific application's data

HexOS will display a warning banner on the catalog application's details page when a name conflict is detected. To avoid this issue, choose a distinct name for your custom application by appending a descriptor or suffix. For example, if the catalog application is named `sonarr`, consider naming your custom application one of the following instead:

- `sonarr-2`
- `sonarr-anime`
- `sonarr-4k`

If you have already installed a custom application whose name matches a catalog application, uninstall or rename the custom application before installing the catalog version.

## Updating

An app has to be running for it to be updated. <br>
It is good practice to update apps regularly.

<details> 
  <summary> How to update </summary>

1) Log in to HexOS Deck and go to the apps section
2) Click your app
3) Click the **Update** button on the **Application info** card
![4.png](/app-troubleshooting-guide/4.png =400x){.align-center}
</details>

### If an app is not working after an application update

If your app stopped working immediately after an update you can go into TrueNAS and roll back to a previous version of your app.

> **Warning:** Some applications may have bugs when rolled back
{.is-warning}

<details> 
  <summary> Instructions for rolling back an application </summary>

1) Log in to HexOS Deck and go to **Settings**
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
2) Click the **TrueNAS** button
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) Navigate to the **Apps** tab on the left sidebar menu
![5.png](/app-troubleshooting-guide/5.png =300x){.align-center}
5) Click on your application
6) Click the **Rollback** option on the **Application Info** card 
![6.png](/app-troubleshooting-guide/6.png =400x){.align-center}
7) Click the most recent version of the app that worked and roll back
![7.png](/app-troubleshooting-guide/7.png =400x){.align-center}
</details>

## Resetting app curation

If the settings on an app were changed in TrueNAS you can use **Reset App Curation** to bring it back to the HexOS default configuration.

> **Info:** This can be used to update your application settings if HexOS has updated the curation.
{.is-info}

<details> 
  <summary> How to Reset App Curation </summary>
1) Open the HexOS Deck application section

2) Click the app
3) Click the **options** button on the application info card
![8.png](/app-troubleshooting-guide/8.png =400x){.align-center}
4) Click **Reset App Curation**
![9.png](/app-troubleshooting-guide/9.png =600x){.align-center}
</details>


## Application not showing up with the bookmarked link

- Open directly from HexOS Deck
- Check if your server's IP address has been updated

## App not starting

If apps are not starting after recent hardware changes you can try the following <br>
Motherboard changed: Try opening the app from HexOS Deck as your server IP address may have changed <br>
GPU changed: Try disabling GPU pass-through and disable using a GPU in the application configuration to troubleshoot <br>
<details> 
  <summary> How to turn off GPU pass-through </summary>
 1. Click the app in HexOS Deck
  
2) Click the **options** button on the application info card
![10.png](/app-troubleshooting-guide/10.png =400x){.align-center}
3) Click **Configure in TrueNAS**
![11.png](/app-troubleshooting-guide/11.png =400x){.align-center}
4) Scroll all the way to the bottom and uncheck GPU-related options
![12.png](/app-troubleshooting-guide/12.png =400x){.align-center}
5) Click the **Update** button
![13.png](/app-troubleshooting-guide/13.png =400x){.align-center}
</details>

# App-specific troubleshooting

<details> 
  <summary> Immich </summary>
## Immich

> **Warning:** Do not uninstall Immich as a troubleshooting step unless explicitly instructed to or you are planning to start again fresh
{.is-warning}

### Installation

If you uninstalled Immich and it is no longer re-installing, 
consider deleting the old datasets and starting over fresh

> **Danger:** Deleting the old datasets will also delete the copy of your media on the server
{.is-danger}

### Updating Immich

#### Firmware 1.135.0 and higher

Coming soon

#### Firmware below 1.135.0

Coming soon

### Mobile application not functioning

Update the Immich app on both the server side and the mobile side

### Immich media not showing up

Check the storage paths in the settings <br>
Uploads: (HDDs/SSDs)/Photos/immich <br>
Postgres: (HDDs/SSDs)/Applications/immich/postgres_data <br>


If your storage locations do not match and you installed Immich via HexOS, are on Immich version 2.0.0+ and have not modified Immich in TrueNAS then you can [**Reset App Curation**](/troubleshooting/apps.html#resetting-app-curation)

</details>
# What to do if you need more help with apps

Fill out the following template and share it on [HexOS HUB](https://hub.hexos.com) or contact us at support@hexos.com

## Template 

TrueNAS Version: <br>
Application Version: <br>
Model of CPU: <br>
Model of GPU: <br>
Modifications made in TrueNAS: <br>
Description of problem: <br>
Troubleshooting steps attempted: <br>

<details> 
  <summary> TrueNAS Version </summary>

The TrueNAS version can be found by
1) Log in to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Click the **TrueNAS** button
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) On the **System Information** card you will see your TrueNAS version
![14.png](/app-troubleshooting-guide/14.png =400x){.align-center}

</details>
<details> 
  <summary> Application Version </summary>

The application version can be found by
1) Log in to HexOS Deck and go to **Settings**
2) Click the **TrueNAS** button
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) Navigate to the **Apps** tab on the left sidebar menu
5) Click on your application
6) On the **Application Info** card you will see an **App Version**
![15.png](/app-troubleshooting-guide/15.png =400x){.align-center}
</details>

<details> 
  <summary> Model of CPU </summary>

The model of the CPU in your server can be found by
1) Log in to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Click the **TrueNAS** button
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) On the **CPU Model** card you will see your CPU model
</details>

<details> 
  <summary> Model of GPU </summary>
1. Log in to HexOS Deck and go to **Settings** 
  
2) Click the **TrueNAS** button
![1.png](/app-troubleshooting-guide/1.png =600x){.align-center}
3) Log in to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
![2.png](/app-troubleshooting-guide/2.png =400x){.align-center}
4) Navigate to the **System** tab on the left sidebar menu
![16.png](/app-troubleshooting-guide/16.png =300x){.align-center}
5) Click **Shell**
![17.png](/app-troubleshooting-guide/17.png =400x){.align-center}
6) Type `lspci | egrep -i 'vga|3d|display'`
![18.png](/app-troubleshooting-guide/18.png =600x){.align-center}</details>

<details> 
  <summary> Modifications made in TrueNAS </summary>

Example modifications
- App installed via TrueNAS not HexOS
- Storage pool created in TrueNAS not HexOS
- App configuration modified in TrueNAS
</details>
<details> 
  <summary> Description of the problem </summary>

Describe the problem
When did it start?
What steps did you take before the problem started?

Include any error reports that HexOS or TrueNAS informs you of in this section.
</details>
<details> 
  <summary> Troubleshooting steps attempted </summary>

A brief overview of any steps you have tried.
</details>
