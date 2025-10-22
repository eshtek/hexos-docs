# Folders

In HexOS, folders are used to organise your data. Some folders are automatically created when applications are installed, and you can create your own folders too. 

You might want to make folders for organizing data, sharing files over the network and for backing up other devices with tools like Apple Time Machine and Windows Backup. 

Folders can be password protected or not, and they can be encrypted. You can also create users and decide what they can view and edit.

## The Folders Screen

In your [Deck](https://deck.hexos.com) click Folders on the sidebar menu. On this screen you can see your folders, see system folders, add new folders and add new users too. 

<img width="2248" height="1211" alt="folders-screen-hexos" src="https://github.com/user-attachments/assets/eda14325-2d91-497c-9362-5784bce8bc87" />

You can’t go into the folders and browse the files from here: this screen only shows the folders and not the contents. [Read about how to access the folder contents here](/features/folders/how-to-access-folder-contents)

## Folder Permissions

It’s a good idea to understand how the privacy and security of your folders is managed. You will be able to choose from the options below when creating a folder.

### Folder Types

#### Public folders 

Anyone can access these folders. This will include all users you have created. This also means that, at least in theory, anyone who has your wifi password can view, edit and delete the contents of the folder.

#### Private folders

Only people with a username and password can access these folders. This means by default only the administrator has access. Then, any users that the administrator has created can also be granted access to the private folder. Finally, whether the user may only view or also edit/delete the contents of the folder is defined in the folder settings.

In theory anyone with your wifi password may be able to see the folder name. Also anyone with access to the hard drives in your system may be able to read the data.

#### Encrypted folders

These folders may be public or private as above. However, when they are set to “locked” by the admin the contents will not be accessible to anyone while the folder remains locked. This means users cannot see the contents of the folder, including the admin, nor can people with the wifi password or with physical access to the hard drives. 

When the folder is “unlocked” again the contents will then be accessible as specified by the other settings and permissions. Encryption is required for backing up a folder to another server.

### Permission Types

You can give users specific types of access to folders:

#### Read access

Users can view and download files but can't edit or delete anything.

#### Write access

Users can add, modify, and delete files in the folder. Edits and deletes are permanent.

## Users

Creating additional users is optional. 

Your user account is automatically an administrator: this means you always have full access to all your folders. 

You might wish to create more users if you want other people to access some folders, but you don’t want to share your admin credentials. For example, you want to enable family members to back up their devices without risking them accidentally deleting other items.

You can select which users have access to folders during creation of folders. This can also be edited later for any folder.

User accounts you create here are just for folder access through network file browsers like Finder or Windows Explorer. They don't give people any control over your server or applications - only the admin account has this access.

## System Folders

When you install apps they automatically create "System Folders" for their data. These appear separately from your personal folders and are managed by the apps themselves.

### Reserved names

Certain folder names like "Downloads" are reserved for system use. If you create a folder with a reserved name, it will automatically appear in System Folders instead of your personal folders.

### Default locations

These folders have default locations, but you can change where they're created in [locations](/features/settings/#locations).


