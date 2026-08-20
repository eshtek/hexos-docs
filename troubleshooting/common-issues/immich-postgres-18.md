---
title: Updating Immich to use Postgres 18
description: 
published: true
date: 2026-06-30T18:36:50.664Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:47.690Z
---

# Updating Immich to use Postgres 18

## Overview

- This guide applies to users unable to update Immich and getting the following error
 `[EINVAL] immich.postgres_image_selector: Input should be 'vectorchord_18_image'`
- This guide only applies to users that are still able to access the Immich web UI


## Logging in to the TrueNAS web UI

- Log in to the TrueNAS UI
   1) Navigate to [HexOS Deck](https://deck.hexos.com)
   2) Navigate to the **settings** panel by clicking it on the left sidebar
<details>
  <summary> Settings option in sidebar </summary>
  
![1.png](/immich-pg18-guide/1.png){.align-center}
</details>

   3) Click the **TrueNAS** button
   
<details>
  <summary> TrueNAS button in settings </summary>
  
![2.png](/immich-pg18-guide/2.png){.align-center}
    </details>
    
   4) Click the new **TrueNAS** button
   
<details>
  <summary> TrueNAS launch button </summary>
  
![3.png](/immich-pg18-guide/3.png){.align-center}
</details>

   5) Log in
       - The username will be `truenas_admin`
       - The password will be what you selected when first installing HexOS
<details>
  <summary> TrueNAS login screen </summary>
  
![4.png](/immich-pg18-guide/4.png){.align-center}
</details>

## Updating process

1) Navigate to the **Apps** tab
<details>
  <summary> Apps tab in sidebar </summary>
  
![5.png](/immich-pg18-guide/5.png){.align-center}
</details>

2) Click on the Immich line
<details>
  <summary> Immich app in list </summary>
  
![6.png](/immich-pg18-guide/6.png){.align-center}
    </details>
    
3) Stop Immich
<details>
  <summary> Stop button for Immich </summary>
  
![7.png](/immich-pg18-guide/7.png){.align-center}
</details>

4) Determine the Immich **version** on the **Application Info** card

> **Info:** Not to be confused with **App Version**
{.is-info}

<details>
  <summary> Immich version on info card </summary>
  
![8.png](/immich-pg18-guide/8.png){.align-center}
</details>

5) Modify the following command to include your Immich **version**

```
sudo nano /mnt/.ix-apps/app_configs/immich/versions/<insert_your_immich_version>/ix_values.yaml
```
In this example the command would be
```
sudo nano /mnt/.ix-apps/app_configs/immich/versions/1.14.13/ix_values.yaml
```
6) Navigate to the **System** tab and then click **Shell**
<details>
  <summary> Shell option under System tab </summary>
  
![9.png](/immich-pg18-guide/9.png){.align-center}
</details>

7) Paste the command created in step 5 and press enter

> **Tip:** To paste things in shell you need to press `Shift + Enter`
{.is-tip}

8) You will be asked to enter your password.
     - This is the same password used to log in to TrueNAS
     - There will be no input shown on screen as a security feature
     - When you finish entering your password you can press enter
<details>
  <summary> Shell password prompt </summary>
  
![10.png](/immich-pg18-guide/10.png){.align-center}
</details>

9) Use your arrow keys to scroll down to the `postgres_update_image` section
<details>
  <summary> Postgres update image section </summary>
  
![11.png](/immich-pg18-guide/11.png){.align-center}
</details>

10) Change the `tag` to `1.1.11`
<details>
  <summary> Editing the image tag </summary>
  
![12.png](/immich-pg18-guide/12.png){.align-center}
</details>

11) Save the changes

     1) Press `Control + X` to exit
     
<details>
  <summary> Nano exit prompt </summary>
  
![13.png](/immich-pg18-guide/13.png){.align-center}
</details>

     2) Press `Y` to save
<details>
  <summary> Nano save confirmation </summary>
  
![14.png](/immich-pg18-guide/14.png){.align-center}
</details>

     3) Press `Enter` to save the file name
<details>
  <summary> Nano file name prompt </summary>
  
![15.png](/immich-pg18-guide/15.png){.align-center}
</details>

12) Return to the **Apps** tab
<details>
  <summary> Apps tab in sidebar </summary>
  
![5.png](/immich-pg18-guide/5.png){.align-center}
</details>

13) Click on the Immich line
<details>
  <summary> Immich app in list </summary>
  
![16.png](/immich-pg18-guide/16.png){.align-center}
</details>

14) On the **Application Info** card click **Edit**
<details>
  <summary> Edit button on info card </summary>
  
![17.png](/immich-pg18-guide/17.png){.align-center}
</details>

15) Edit the **Postgres Image (CAUTION)** line to **Postgres 18**
<details>
  <summary> Postgres image selection </summary>
  
![18.png](/immich-pg18-guide/18.png){.align-center}
</details>

16) Scroll all the way down and click the **Update** button
17) Start the Immich app
<details>
  <summary> Start button for Immich </summary>
  
![19.png](/immich-pg18-guide/19.png){.align-center}
</details>

> **Info:** Starting Immich will take longer than usual this time.
{.is-info}

18) Once Immich has the **Running** status, open the web UI and make sure Immich is functioning normally
<details>
  <summary> Immich running status </summary>
  
![20.png](/immich-pg18-guide/20.png){.align-center}
</details>
19) Update the Immich app in HexOS
<details>
  <summary> Update button in HexOS deck </summary>
  
![21.png](/immich-pg18-guide/21.png =500x){.align-center} 
</details>

## If you still can't update Immich

If you are still having trouble updating Immich please reach out to `support@hexos.com`

## Community credits 

`sunny_raven` - Created the original guide in the HexOS forums

`BruteNas` - Provided the instructions for saving files in shell

Also a big thank you to everyone that contributed on [GitHub](https://github.com/truenas/apps/issues/4628) to find a solution

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
