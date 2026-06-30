---
title: Updating Immich to use Postgres 18
description: 
published: true
date: 2026-06-30T18:35:24.847Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:43:47.690Z
---

# Updating Immich to use Postgres 18

## Overview

- This guide applies to users unable to update Immich and getting the following error
 `[EINVAL] immich.postgres_image_selector: Input should be 'vectorchord_18_image'`
- This guide only applies to users that are still able to access the Immich WebUI


## Logging into the TrueNAS WebUI

- Log into TrueNAS UI
   1) Navigate to [HexOS Deck](https://deck.hexos.com)
   2) Navigate to the `settings` panel by selecting it on the left sidebar
<details>
  <summary> Image </summary>
  
![1.png](/immich-pg18-guide/1.png){.align-center}
</details>

   3) Select the `TrueNAS` button
   
<details>
  <summary> Image </summary>
  
![2.png](/immich-pg18-guide/2.png){.align-center}
    </details>
   3) Select the new `TrueNAS` button
   
<details>
  <summary> Image </summary>
  
![3.png](/immich-pg18-guide/3.png){.align-center}
</details>

   4) Login
       - The username will be `truenas_admin`
       - The password will be what you selected when first installing HexOS
<details>
  <summary> Image </summary>
  
![4.png](/immich-pg18-guide/4.png){.align-center}
</details>

## Updating Process

1) Navigate to the `Apps` tab
<details>
  <summary> Image </summary>
  
![5.png](/immich-pg18-guide/5.png){.align-center}
</details>
2) Click on the Immich line
<details>
  <summary> Image </summary>
  
![6.png](/immich-pg18-guide/6.png){.align-center}
    </details>
3) Stop Immich
<details>
  <summary> Image </summary>
  
![7.png](/immich-pg18-guide/7.png){.align-center}
</details>

4) Determine Immich `version` on the `Application Info` card
> **Note:** Not to be confused with `App Version`

<details>
  <summary> Image </summary>
  
![8.png](/immich-pg18-guide/8.png){.align-center}
</details>

5) Modify the following command to include your Immich `Version`

```
sudo nano /mnt/.ix-apps/app_configs/immich/versions/<insert_your_immich_version>/ix_values.yaml
```
In this example the command would be
```
sudo nano /mnt/.ix-apps/app_configs/immich/versions/1.14.13/ix_values.yaml
```
6) Navigate to the `System` tab and then select `shell`
<details>
  <summary> Image </summary>
  
![9.png](/immich-pg18-guide/9.png){.align-center}
</details>

7) Paste the command created in step 4 and press enter
> **Note:** To paste things in shell you need to press `Shift + Enter`

8) You will be asked to enter your password.
     - This is the same password used to login into TrueNAS
     - There will be no input shown on screen as a security feature
     - When you finish entering your password you can press enter
<details>
  <summary> Image </summary>
  
![10.png](/immich-pg18-guide/10.png){.align-center}
</details>
9) Use your arrow keys to scroll down to the `postgres_update_image` section
<details>
  <summary> Image </summary>
  
![11.png](/immich-pg18-guide/11.png){.align-center}
</details>

10) Change the `tag` to `1.1.11`
<details>
  <summary> Image </summary>
  
![12.png](/immich-pg18-guide/12.png){.align-center}
</details>

11) Save the changes

     1) Press `Control + X` to exit
     
<details>
  <summary> Image </summary>
  
![13.png](/immich-pg18-guide/13.png){.align-center}
</details>

     2) Press `Y` to save
<details>
  <summary> Image </summary>
  
![14.png](/immich-pg18-guide/14.png){.align-center}
</details>

     3) Press `Enter` to save the file name
<details>
  <summary> Image </summary>
  
![15.png](/immich-pg18-guide/15.png){.align-center}
</details>

12) Return to the `Apps` tab
<details>
  <summary>  Image </summary>
  
![5.png](/immich-pg18-guide/5.png){.align-center}
</details>

13) Click on the Immich line
<details>
  <summary> Image </summary>
  
![16.png](/immich-pg18-guide/16.png){.align-center}
</details>

14) On the `Application Info` card press `edit`
<details>
  <summary> Image </summary>
  
![17.png](/immich-pg18-guide/17.png){.align-center}
</details>

15) Edit the `Postgres Image (CAUTION)` line to `Postgres 18`
<details>
  <summary> Image </summary>
  
![18.png](/immich-pg18-guide/18.png){.align-center}
</details>

16) Scroll all the way down and press the `Update button`
17) Start the Immich app
<details>
  <summary> Image </summary>
  
![19.png](/immich-pg18-guide/19.png){.align-center}
</details>

> **Note:** Starting Immich will take longer than usual this time.

18) Once Immich has the `Running` status open the WebUI and make sure Immich is functioning normally
<details>
  <summary> Image </summary>
  
![20.png](/immich-pg18-guide/20.png){.align-center}
</details>
19) Update the Immich app in HexOS
<details>
  <summary> Image </summary>
  
![21.png](/immich-pg18-guide/21.png =500x){.align-center} 
</details>

## If you still can't update Immich

If you are still having trouble updating Immich please reach out to `support@hexos.com`

## Community credits 

`sunny_raven` - Created the original guide in the HexOS forums

`BruteNas` - Provided the instructions to saving files in shell

Also a big thank you to everyone that contributed on [github](https://github.com/truenas/apps/issues/4628) to find a solution