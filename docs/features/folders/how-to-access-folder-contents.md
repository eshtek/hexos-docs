# How to Access Files and Folders Over the Network

In HexOS, you can [create folders](/features/folders/create-a-new-folder) through the deck, but you can’t add contents to the folders via the deck. <br>
The folder contents are added, viewed and edited from another device *over the network*. This means folders are accessed using a computer, laptop or phone connected to the same network. 

This guide will explain how to access a folder on your HexOS server from a variety of other devices.
>Note: Some apps may require different methods to add or view data. In Immich, for example, you upload photos and videos via a web browser.

## Copying the Address of a Folder

1. In the folders screen of your [HexOS deck](https://deck.hexos.com), select on the folder you want to access
2. Select the **Browse** button

<img width="1484" height="1099" alt="browse-button" src="https://github.com/user-attachments/assets/4bc786e3-e672-41b6-9235-fb94c80d6e18" />

You will be given the folder IP address needed to connect to it from other devices on the same network. You can select the Copy button to copy a link and paste it following the instructions below.

<img width="1053" height="608" alt="link-for-browse" src="https://github.com/user-attachments/assets/5cb66e5e-a6de-4f89-b3a3-35b523abd0be" />

You can select Windows or Mac using the dropdown.

<img width="1053" height="608" alt="choose-between-windows-or-mac" src="https://github.com/user-attachments/assets/ee0c6d56-d436-4c23-88a9-7c2d20a7c4d6" />

Changing the Windows/Mac setting doesn't modify the folder, it just provides instructions for the selected operating system.

## Accessing the folder from your device

Here are some examples of how to access the file from various devices. The specific method may vary a little depending on your operating system.

### On Mac

1. Open Finder
2. Select "Go" in the menu bar
3. Select "Connect to Server"
4. Paste the SMB link into the "Server Address" field
5. Select the "Connect" button

### On Windows
1. Open File Explorer
2. On the left side there is a list of folders and locations, select **This PC**

<img width="1070" height="664" alt="this-pc" src="https://github.com/user-attachments/assets/2674928c-adac-4972-ab11-e831c6df0ac9" />

1. Right click for the menu 
2. Select **Add a network location**

<img width="561" height="592" alt="add-a-network-location" src="https://github.com/user-attachments/assets/33afaa07-7e69-4bac-9fc4-c6d0009dc312" />

Follow the wizard though by selecting the **Next** button.

<img width="720" height="606" alt="next" src="https://github.com/user-attachments/assets/877a37f5-2df4-4ef4-8bf9-98c790eecec1" />

Select the **Next** button on the **Choose a custom network location** step.

<img width="720" height="606" alt="choose-custom-next" src="https://github.com/user-attachments/assets/183a83a5-755d-46cb-a62d-4e25e1ccff8c" />

Paste the folder address in and select the **Next** button.

<img width="720" height="606" alt="paste-in-address" src="https://github.com/user-attachments/assets/34109dba-a600-49f4-9a32-91698c0604d0" />

You can optionally choose a display name. Select the **Next** button.

<img width="720" height="606" alt="name-it" src="https://github.com/user-attachments/assets/6827c07e-aa33-4557-861d-e4c8f75372bc" />

Then select the **Finish** button.

<img width="720" height="606" alt="finish" src="https://github.com/user-attachments/assets/3e60c006-fd4b-468b-82ac-edcbf83200ee" />

Your folder will now be accessible from your file browser.

If the folder is private you will be asked for a username and password before it will open.

<img width="585" height="558" alt="password" src="https://github.com/user-attachments/assets/2e6459cd-bb4f-45b1-895a-51c9ea0b4a52" />

### On ChromeOS

Open the My Files app.

<img width="653" height="501" alt="my-files" src="https://github.com/user-attachments/assets/7fc60faf-ac38-468e-8988-0c52c4d5b5d3" />

1. On the top right, select the menu button (three vertical dots)
2. Select Services
3. Select SMB File Share

<img width="660" height="595" alt="services-smb-share" src="https://github.com/user-attachments/assets/7e153a65-747b-42c5-bc35-5e0473cdcadb" />

1. Then select a suggested share from the list or manually enter the URL using the given in the windows section "\\\ipaddress\Folder-name"
2. Fill out the password field if required
3. Select **Add**

<img width="673" height="683" alt="smb-share-login" src="https://github.com/user-attachments/assets/e1107dab-088b-448a-898f-433f552b8a25" />

The file will now show in the left hand navigation on My Files

<img width="673" height="683" alt="shortcut-in-my-files" src="https://github.com/user-attachments/assets/ecca25e5-df0f-436b-a5c1-c859439cee4f" />

### On Linux

This varies depending on your linux distro. The url required will likely be similar to the Mac one, with forward slashes (rather than windows and chrome with \\ back slashes). The following example is from Fedora.

1. Open your files app
2. Select **Network**
3. Paste in the folder address 

<img width="1483" height="849" alt="paste-in-address-1" src="https://github.com/user-attachments/assets/390cbaff-3e82-43d1-925e-6bead7f143cc" />

1. Fill in the username and password if needed
2. Select **Connect**

<img width="1047" height="957" alt="enter-details" src="https://github.com/user-attachments/assets/3d1d558d-58dc-4e63-8e55-cf98f45a88c4" />

You will now see the folder in your Networks section of your file manager and also as a shortcut at the bottom of the left hand navigation of files

<img width="1514" height="1041" alt="files-shortcut" src="https://github.com/user-attachments/assets/0da3c4b9-90fd-4318-a914-b189e0a54f8f" />

Sometimes the folder may show under **Other locations** 

<img width="1212" height="812" alt="other-locations" src="https://github.com/user-attachments/assets/649fb11e-8227-4726-9fff-e8a8fff56643" />

## Android

### Samsung Galaxy

1. Open `My Files` app
![](../../public/assets/screenshots/folder-access-guide/1.png)
2. Select network storage
    - You may be prompted to update the app

![](../../public/assets/screenshots/folder-access-guide/2.png)
3. Select the + button at the top right corner
![](../../public/assets/screenshots/folder-access-guide/3.png)
4. Select Network Drive (SMBv2/SMBv3)
![](../../public/assets/screenshots/folder-access-guide/4.png)
5. If your server appears select it, if not select `add manually`
![](../../public/assets/screenshots/folder-access-guide/5.png)
6. Fill this out with your information and press `add`<br>
- The `Address` can be found at the folders screen of [HexOS deck](https://deck.hexos.com/folders) <br>
          1. Select any folder <br>
          2. Select the `Browse` button
          ![](../../public/assets/screenshots/folder-access-guide/ip1.png)
          3. The address will be just the numbers shown (highlighted in this example)
          ![](../../public/assets/screenshots/folder-access-guide/ip2.png)
     - You can leave the port alone
     - Username and password are optional but if you would like to use them then uncheck `Sign in anonymously`
![](../../public/assets/screenshots/folder-access-guide/6.png)

### Google Pixel

There isn't a native function on pixel devices to access SMB network shares.</br>
SMB network shares can still be accessed by installing 3rd party applications.

## iOS

1. Open the `Files` app
![](../../public/assets/screenshots/folder-access-guide/7.jpg)
2. Press the 3 horizontal dots button on the top right corner
![](../../public/assets/screenshots/folder-access-guide/8.PNG)
3. Select `Connect to Server`
![](../../public/assets/screenshots/folder-access-guide/9.PNG)
4. Type your server ip address in the `Server` textbox 
    - The `Address` can be found at the folders screen of [HexOS deck](https://deck.hexos.com/folders)
        1. Select any folder
        2. Select the `Browse` button
        ![](../../public/assets/screenshots/folder-access-guide/ip1.png)
        3. The address will be just the numbers shown (highlighted in this example)
        ![](../../public/assets/screenshots/folder-access-guide/ip2.png)
        
![](../../public/assets/screenshots/folder-access-guide/10.PNG)
5. Select `Guest` or `Registered User`
    - Input your username and password if you would like to log in as a registered user

![](../../public/assets/screenshots/folder-access-guide/11.PNG)
6. You can find your server under the Shared section. 
![](../../public/assets/screenshots/folder-access-guide/12.PNG)