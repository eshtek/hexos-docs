# Folders

As with most computer systems, folders are used to store data. Some are automatically created when applications are installed, but users can create folders themselves for sharing files over a network or backing up other devices (Apple Time Machine, Windows Backup, etc).

## Creating Folders

When creating a folder, you have several options to configure:

### Location
Choose which storage pool the folder will be created on. This is especially useful if you have multiple pools with different performance characteristics or purposes.

### Access
Choose who has access to this folder and what permissions they have. We'll cover this in more detail in the Users and Permissions section below.

### Quota
Set storage limits for individual folders to control how much space they can use. This helps manage disk usage when multiple people or applications share your server.

### Time Machine
Enable Time Machine support to let your Macs back up directly to this folder. This sets up the folder with the proper configuration for Apple's backup system.

### Encryption
You can optionally enable encryption on folders you create. Encrypted folders can be "locked" or "unlocked" using a custom passphrase created by the administrator specifically for making the folder accessible.

> **Note:** Encryption can only be enabled during folder creation and cannot be disabled once the folder is created.

## How to Access Files and Folders Over the Network

Each folder has a "Browse" button that shows you exactly how to connect from your device. If you created a private folder you will need to connect to that folder using the associated Users credentials.

### On Mac
Open Finder, click "Go" in the menu bar, select "Connect to Server". Paste the SMB link into the "Server Address" field and click "Connect".

### On Windows
Open File Explorer, right-click on "This PC", then "Map network drive". Paste the SMB link into the "Folder" field and click "Finish" to connect.

## Users and Permissions

Your account is automatically an administrator, which means you always have full access to all your folders. Creating additional users is optional and comes in handy when you want other people to access specific folders without sharing your admin credentials.

### Folder Types
**Public folders:** Anyone can access these folders.

**Private folders:** Only you and specifically selected users can access these folders.

### Permission Types
You can also give users specific types of access to folders:

**Read access:** Users can view and download files but can't change anything.

**Write access:** Users can add, modify, and delete files in the folder.

> **Security Note:** User accounts you create here are just for folder access through network file browsers like Finder or Windows Explorer. They don't give people any control over your server or applications.

## System Folders

When you install apps they automatically create "System Folders" for their data. These appear separately from your personal folders and are managed by the apps themselves.

### What you should know:
- **Reserved names:** Certain folder names like "Downloads" are reserved for system use. If you create a folder with a reserved name, it will automatically appear in System Folders instead of your personal folders
- **Default locations:** These folders have default locations, but you can change where they're created in [locations](/features/settings/#locations)
