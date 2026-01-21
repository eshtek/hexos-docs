# Application Troubleshooting Guide

## Installation

- If installation fails once, try again immediately
- If it still fails check error
    - This can be done by pressing the bell icon at the top of HexOS deck
    - If HexOS shows an unknown error you can find more details by entering TrueNAS and selecting the clipboard icon
::: details How to view the error in TrueNAS
1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) Click on the clipboard icon at the top of the screen
:::

## Updating

An App has to be running for it to updated. <br>
It is good practice to update apps regularly.

::: details How to update

1) Open the [HexOS Deck applications](Https://deck.hexos.com/applications) section
2) Select your app
3) Select the Update button on the Application info card
:::
### If an app is not working after an application update

If your app stopped working immediately after an update you can go into TrueNAS and roll back a previous version of your app.
> Note: Some applications may have bugs when rolled back
::: details Instructions for rolling back an application

1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) Navigate to the `Apps` tab on the left sidebar menu
5) Click on your application
6) Select the `Rollback` option on the `Application Info` card 
7) Select the most recent version of the app that worked and rollback
:::

## Resetting App Curation

If the settings on an app were changed in TrueNAS you can select `Reset App Curation` to bring it back to the HexOS default configuration.

> Note: This can be done to update your application settings if HexOS has updated their curation.

## Application not showing up with the bookmarked link

- Open directly from HexOS Deck
- Check if your server's IP address has been updated

## App not starting

If apps are not starting after recent hardware changes you can try the following <br>
Motherboard changed: Try opening the app from HexOS Deck as your sever IP Address may have changed <br>
GPU changed: Try disabling GPU pass-through and disable using a gpu in the application configuration to troubleshoot <br>
::: details How to turn off GPU pass-through
1) Select the app in HexOS deck
2) Press the `options` button on the applications info card
3) Press `Configure in TrueNAS`
4) Scroll all the way to the bottom and uncheck GPU related options
5) Press the Update button

# App Specific Troubleshooting

::: details Immich
## Immich

> <span style="color: red;">Warning: Do Not uninstall immich as a troubleshooting step unless explicitly instructed to or are planning to start again fresh</span> 

### Installation

If you uninstalled Immich and it is no longer re-installing 
consider deleting the the old datasets and start over fresh
> <span style="color: red;">Warning: Deleting the old data sets will also delete the copy of your media on the server</span> 

### Updating Immich

#### Firmware 1.135.0 and higher

Coming soon

#### Firmware below 1.135.0

Coming soon

### Mobile Application not functioning

Update the Immich app on both the server side and the mobile side

### Immich Media not showing up

Check the storage paths in the settings <br>
Uploads: (HDDs/SSDs)/Photos/immich <br>
Postgres: (HDDs/SSDs)/Applications/immich/postgres_data <br>


If your storage locations do not match and you installed Immich via HexOS, are on Immich version 2.0.0+ and have not modified Immich in TrueNAS then you can `Reset App Curation`

:::
# What to do if you need more help with apps

Fill out the following template and share it in on [HexOS HUB](https://hub.hexos.com) or contact us at Support@hexos.com

## Template 

TrueNAS Version: <br>
Application Version: <br>
Model of CPU: <br>
Model of GPU: <br>
Modifications made in TrueNAS: <br>
Description of problem: <br>
Troubleshooting steps attempted: <br>

::: details TrueNAS Version

TrueNAS Version can be found by
1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) On the system information card you will see your TrueNAS Version
:::
::: details Application Version

The application Version can be found by
1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) Navigate to the `Apps` tab on the left sidebar menu
5) Click on your application
6) On the `Application Info` card you will see an `App Version`
::: 

::: details Model of CPU

The model of the CPU in your server can be found by
1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) On the `CPU Model` card you will see your CPU Model
:::

::: details Model of GPU
1) Login to [HexOS Deck Settings](https://deck.hexos.com/settings)
2) Select the TrueNAS Button
3) Login to TrueNAS
    - Username: truenas_admin
    - Password: What was selected when installing HexOS
4) Navigate to the `System` tab on the left sidebar menu
5) Select `Shell`
6) Type `lspci | egrep -i 'vga|3d|display'`
:::
::: details Modifications made in TrueNAS

Example modifications
- App installed via TrueNAS not HexOS
- Storage pool created in TrueNAS not HexOS
- App configuration modified in TrueNAS
:::
::: details Description of the problem

Describe the problem
When did it start?
What steps did you take before the problem started?

Include any errors reports that HexOS or TrueNAS informs you of in this section.
:::
::: details Troubleshooting steps attempted

A brief overview of any steps you have tried.
:::
