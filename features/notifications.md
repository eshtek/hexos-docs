---
title: Notifications
description: 
published: true
date: 2026-06-18T23:10:10.781Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:43.471Z
---

# Notifications

HexOS provides notifications to users in two primary ways:

- All notifications are delivered to the HexOS Bell icon, visible on all pages.  
- Critical notifications (e.g. disk failures) are also delivered automatically to you via email.

## Notification bell

<details>
<summary> Notification bell </summary>

![Screenshot From 2025-10-20 12-23-31](https://github.com/user-attachments/assets/2823ef5f-53ef-459e-9cab-e674c10ac948){.medium .framed}
</details>

Notifications show as a red bubble with the number of unread notifications shown. Clicking directly on the notification bell will bring up a dropdown showing the notifications.

<details>
<summary> Notification dropdown with unread count </summary>

![Screenshot From 2025-10-20 12-23-43](https://github.com/user-attachments/assets/a6960a0e-8cad-4f5c-98e1-ab7fc670f7c6){.medium .framed}
</details>

Notifications can be both marked as read and dismissed, and previous notifications can be viewed from within the messaging archive.

<details>
<summary> Mark as read and dismiss options </summary>

![Screenshot From 2025-10-20 12-23-54](https://github.com/user-attachments/assets/7c68e7c8-3118-4663-86f2-63405ba1ba85){.medium .framed}
</details>

## Common notifications

### Task notifications

Certain tasks will let you know if they are still in progress with the rotating in progress symbol shown below. <br>
<small>Examples: installing apps, managing storage or system updates.</small>

<details>
<summary> In-progress task notification </summary>

![Screenshot From 2025-10-20 12-29-00](https://github.com/user-attachments/assets/eb65ef63-c80a-452b-b87d-1448163029ee){.medium .framed}
</details>

### Updates

HexOS will send notifications for
- New software updates
- Software updates completed
- Application updates available

<details>
<summary> App update notification </summary>

![Screenshot From 2025-10-20 12-35-33](https://github.com/user-attachments/assets/5a4342cf-653f-48bd-90ce-0c85e5711764){.medium .framed}
</details>

### Operations and achievements

HexOS will send notifications for
- New user creation or deletion is completed
- New folder creation or deletion is completed
- Achievements for trying HexOS features

<details>
<summary> Achievement notification </summary>

![Screenshot From 2025-10-20 12-34-36](https://github.com/user-attachments/assets/dc3a9ebc-3bab-45c5-8873-2155965f5424){.medium .framed}
</details>

### System health notifications

HexOS will send health-related notifications for
- Overheating alerts
- Storage pool warnings
- Storage drive errors

### SMART errors

Your drives collect health data that HexOS monitors for potential problems. When you see SMART errors, it means the system has detected something that warrants investigation. This could indicate a drive issue that needs attention, but doesn't necessarily mean immediate replacement is required.

Learn more about [SMART](https://www.truenas.com/docs/scale/25.10/scaletutorials/storage/disks/drivehealthmanagement/index.html#smart-tests-options-for-community-edition) technology.

## Managing notifications

You have control over how notifications appear and persist in your system. You can mark notifications as read by clicking on them, dismiss them when you've handled them, or use **Mark All as Read** and **Dismiss All** to handle multiple notifications at once. You can also view older notifications in the archive, with all notification history accessible through the [activity messages](/features/settings/#activity-history) page.

