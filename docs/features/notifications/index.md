# Notifications

HexOS provides notifications to users in two primary ways:

- All notifications are delivered to the HexOS "Bell" icon, visible on all pages.  
- Critical notifications (e.g. disk failures) are also delivered automatically to you via email.

## Notification bell

<img width="835" height="339" alt="Screenshot From 2025-10-20 12-23-31" src="https://github.com/user-attachments/assets/2823ef5f-53ef-459e-9cab-e674c10ac948" />

Notifications show as a red bubble with the number of unread notifications shown. Clicking directly on the notification bell will bring up a dropdown showing the notifications.

<img width="1083" height="1013" alt="Screenshot From 2025-10-20 12-23-43" src="https://github.com/user-attachments/assets/a6960a0e-8cad-4f5c-98e1-ab7fc670f7c6" />

Notifications can be both marked as read and dismissed, and previous notifications can be viewed from within the messaging archive.

<img width="1906" height="1365" alt="Screenshot From 2025-10-20 12-23-54" src="https://github.com/user-attachments/assets/7c68e7c8-3118-4663-86f2-63405ba1ba85" />

## Common notifications

### Task Notifications

When you start operations that take time to complete, HexOS
shows you a task with a buffering notification symbol. This shows you know something is happening in the background. Examples include installing apps, managing storage, or system updates, 

<img width="985" height="883" alt="Screenshot From 2025-10-20 12-29-00" src="https://github.com/user-attachments/assets/eb65ef63-c80a-452b-b87d-1448163029ee" />

### Updates

HexOS will notify you when there are software updates available, and when you have completed an update. There are also notifications avilable here when there is an update to a curated app.

<img width="1271" height="920" alt="Screenshot From 2025-10-20 12-35-33" src="https://github.com/user-attachments/assets/5a4342cf-653f-48bd-90ce-0c85e5711764" />

For apps that have been installed via a custom script or the TrueNAS interface the notification may not show here.

### Operations and Achievements

HexOS will notify you when an action such as creating or deleting a user or folder has completed. You will also get notifications of "Achievements" as you progress through trying the features of your HexOS NAS.

<img width="1217" height="639" alt="Screenshot From 2025-10-20 12-34-36" src="https://github.com/user-attachments/assets/dc3a9ebc-3bab-45c5-8873-2155965f5424" />

### System Health Notifications

HexOS monitors your server's hardware and storage systems. You'll get alerts for things like overheating, storage pool problems, or missing drives that need your attention.

### SMART Errors

Your drives collect health data that HexOS monitors for potential problems. When you see SMART errors, it means the system has detected something that warrants investigation. This could indicate a drive issue that needs attention, but doesn't necessarily mean immediate replacement is required.

Learn more about [SMART](https://www.truenas.com/docs/core/13.0/coretutorials/tasks/runningsmarttests/) technology.

## Managing Notifications

You have control over how notifications appear and persist in your system. You can mark notifications as read by clicking on them, dismiss them when you've handled them, or use "Mark All as Read" and "Dismiss All" to handle multiple notifications at once. You can also view older notifications in the archive, with all notification history accessible through the [activity messages](/features/settings/#activity-history) page.

