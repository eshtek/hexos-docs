# Folders

Folders can be used to organize data, share files over the network and for back up with tools like Apple time machine. You are able to create folders and they can be automatically created when applications are installed. 

Folders can optionally be password protected and encrypted. You can also create users and decide what they can view and edit.

## The Folders Screen

You can access the Folders screen in the [Deck](https://deck.hexos.com) through the sidebar menu. On this screen you can view existing folders, create new folders and network credentials for accessing folders. 

<img width="2248" height="1211" alt="folders-screen-hexos" src="https://github.com/user-attachments/assets/eda14325-2d91-497c-9362-5784bce8bc87" />

You can’t browse the files from here. The Folders screen only shows the folders and not their contents.<br> [Read about how to access the folder contents here](/features/folders/how-to-access-folder-contents)

## Folder Permissions

### Permission Types

You can give users specific types of access to folders:

#### Read access

Users with read access can view or download folder contents but can't edit or delete the contents.

#### Write access

Users with write access can add, modify or delete the contents of the folder.

## Folder Types

### Public folders 

Anyone can access these folders. This will include all users you have created. This means that anyone with access to your network can view, edit or delete the contents of these folders.

### Private folders

Only those with network credentials created in HexOS can access these folders.<br> This means by default only the administrator has access. The administrator grant access to anyone given network credentials. Folder permissions for this type of folder can be modified.

- Anyone with access to your network are able to see private folder names. 
- Anyone with access to the hard drives in your server may be able to read the data.

### Encrypted folders

File encryption is when a file's data is scrambled in a way it can only be recovered with a specific encryption key or passphrase.<br> When we create an encrypted folder, all of the contents placed i that folder will also be encrypted. The server administer can lock (encrypt) or unlock (decrypt) folders from the folder section of HexOS deck.<br> When a folder is locked, the folder and its contents are not visible nor accessible to anyone on the network. When a folder is unlocked it will work the same as a regular folder.<br>
- Encrypted folders can be selected to be public or private
- Encryption is required for backing up a folder to another server.
- The data on your server’s storage drives cannot be read even if someone gains physical access to them.
- Selected passphrase must be a minimum of 8 characters long.
- The selected passphrase is needed to unlock encrypted folder every time.
- Passphrase cannot be changed after folder creation.
- <span style="color: red;">If the passphrase is lost, data cannot be recovered by HexOS.</span>
> **Note:** Encryption can only be enabled during folder creation and cannot be disabled once the folder is created.

## Users

Creating additional users is optional. 

Your user account is automatically an administrator: this means you always have full access to all your folders. 

You can to create more users in order to grant others access to private folders.
You can grant access to selected users during folder creation. Access to folders can be modified at in the folder screen.

User accounts created here only grant folder access through network file browsers like MacOS Finder or Windows Explorer. These accounts don't allow any control over your server or applications.

## System Folders

When apps are installed, they automatically create "System Folders" for their data. These appear separately from your personal folders and are managed by the apps themselves.

### Reserved names

Certain folder names like "Downloads" are reserved for system use. If you create a folder with a reserved name, it will automatically appear in System Folders instead of your personal folders.

### Default locations

These folders have default locations, but you can change where they're created in [locations](/features/settings/#locations).

