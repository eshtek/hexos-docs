---
title: Put a server back after Bring over
description: What to do when HexOS can't put your old server or cloud account back the way it was after Bring over, and how to undo each change yourself
published: true
date: 2026-10-16T00:00:00.000Z
tags: bring over, migration, ssh, synology, qnap, unraid
editor: markdown
dateCreated: 2026-10-16T00:00:00.000Z
---

# Put a server back after Bring over

To copy your files, **Bring over** changes a few things on your old server. For example, it adds a key so HexOS can sign in, and on some servers it turns on SSH. When the last folder is finished or cancelled, HexOS undoes these changes. HexOS calls this **Put back**.

Sometimes HexOS can't put the server back. The **Put back** dialog then says **HexOS couldn't put {name} back. It may be off, or it no longer accepts HexOS's key.** This page explains how to fix that, and how to undo the changes yourself if you prefer.

Nothing on this page deletes any of your files, on either server.

## Try Put back again first

When **Put back** works, HexOS removes its key and turns everything off for you. Check these things, then click **Put back** again. You find it in **Settings** > **Bring over**.

1. Make sure your old server is turned on, and that it still has the same network address.
2. Make sure your HexOS server still has the same network address. HexOS's key only works from the address your HexOS server had during Bring over.
3. On a Synology, check that it doesn't block your HexOS server. Open **Control Panel** > **Security** > **Protection**. If **Auto Block** lists your HexOS server's address, remove it.
4. Check the permissions of the key file, as the next section explains.

### When the server no longer accepts HexOS's key

SSH refuses a key when other accounts can change the file it's kept in, or the folders around it. HexOS's key line can still be in the file when this happens. We have seen it on a Synology an hour after Bring over set the key up.

To fix it, sign in to your old server with SSH as the account HexOS used, then type one command.

On a Synology, use the account you signed in with during Bring over:

`chmod 755 ~ && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`

On TrueNAS, HexOS, OpenMediaVault or another Linux server, use the account you signed in with during Bring over:

`chmod go-w ~ && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`

Then click **Put back** again.

> **Help:** If **Put back** still doesn't work, ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz), or put the server back yourself as the sections below explain.
{.is-troubleshooting}

## Put the server back yourself

If **Put back** still can't reach your old server, you can undo the changes yourself.

When **Put back** fails, the dialog shows a box that starts with **I'll put {name} back myself**. The box lists:

- The marker at the end of HexOS's key line, for example `hexos-bringover-eab8cc79a61c`. Every move has its own marker.
- The file the key line is in.
- Each setting HexOS turned on, and where it is.

Keep the dialog open while you follow the steps for your server below. When you're done, check the box and click **Close without putting back**. HexOS then deletes its own copy of the key and closes the card.

> **Warning:** Only remove the line with the marker the dialog shows. If you're bringing over other folders from the same server, their key lines have other markers and need to stay.
{.is-warning}

In the commands below, replace `hexos-bringover-eab8cc79a61c` with the marker from your dialog.

### Synology

HexOS's key line is in the home folder of the account you signed in with, in `/var/services/homes/<account>/.ssh/authorized_keys`. Do these steps in this order: the key comes out of the home folder before you turn off the user home service.

1. Sign in to the Synology with SSH as that account.
2. Remove the key line:

   `sed -i '/hexos-bringover-eab8cc79a61c/d' ~/.ssh/authorized_keys`

3. In DSM, turn off only the settings the dialog lists:
   - **rsync service**: **Control Panel** > **File Services** > **rsync**. Clear **Enable rsync service** and click **Apply**.
   - **User home service**: **Control Panel** > **User & Group** > **Advanced**. Clear **Enable user home service** and click **Apply**. The **homes** folder DSM made stays.
   - **SSH**: **Control Panel** > **Terminal & SNMP**. Clear **Enable SSH service** and click **Apply**.

### Unraid

HexOS adds its key to the root account, in `/boot/config/ssh/root/authorized_keys`. You don't need SSH for this.

1. In the Unraid web interface, open **Users** and click **root**.
2. In **SSH authorized keys**, delete the line that ends in the marker. Click **Apply**.
3. If the dialog lists SSH, open **Settings** > **Management Access**, set **Use SSH** to **No** and click **Apply**.

### QNAP

HexOS's key line is in `/etc/config/ssh/authorized_keys`. You turned on SSH yourself before Bring over, so HexOS doesn't turn it off.

1. Sign in to the QNAP with SSH as **admin**.
2. Remove the key line:

   `sed -i '/hexos-bringover-eab8cc79a61c/d' /etc/config/ssh/authorized_keys`

3. If you don't need SSH any more, open **Control Panel** > **Network & File Services** > **Telnet / SSH**, clear **Allow SSH connection** and click **Apply**.

### TrueNAS and HexOS

HexOS's key line is in the home folder of the account you signed in with. HexOS doesn't change any settings on these servers.

1. In the TrueNAS web interface, open **Credentials** > **Users** and edit that account.
2. In **Authorized Keys**, delete the line that ends in the marker. Click **Save**.

### OpenMediaVault and other Linux servers

HexOS's key line is in `~/.ssh/authorized_keys` in the home folder of the account you signed in with. HexOS doesn't change any settings on these servers.

1. Sign in to the server with SSH as that account.
2. Remove the key line:

   `sed -i '/hexos-bringover-eab8cc79a61c/d' ~/.ssh/authorized_keys`

### Network shares and drives

When HexOS copies from a network share or from a drive plugged into your HexOS server, it doesn't change anything on the source. There is nothing to put back. You can unplug a drive once its last folder is finished or cancelled.

### Cloud accounts

HexOS has read-only access to your account until the last folder is finished or cancelled. If HexOS can't take its access back, check your HexOS server's internet connection and click **End access to {name}** again in **Settings** > **Bring over**.

To remove HexOS yourself, open your account's settings:

- **Dropbox**: **Settings** > **Connected apps**. Find HexOS and click **Disconnect**.
- **Google Drive**: open your Google Account, then **Security** > **Your connections to third-party apps & services**. Click HexOS, then **Delete all connections you have with HexOS**.
- **OneDrive**: sign in to [account.live.com/consent/Manage](https://account.live.com/consent/Manage), click HexOS and click **Remove these permissions**. Microsoft keeps listing HexOS here even after HexOS deletes its access, until you remove it. For a work or school account, ask your IT administrator.

### iCloud

HexOS signs in to iCloud with your Apple Account, like a web browser does. To sign it out, go to [icloud.com](https://www.icloud.com), open **Manage Apple Account** or **iCloud Settings**, and click **Sign Out of All Browsers**. This also signs out any other browser where you use iCloud.

## If you do nothing

Your files are safe either way. These things stay on your old server until you remove them:

- **HexOS's key line.** It only works from your HexOS server's address. When you check **I'll put {name} back myself** and click **Close without putting back**, HexOS deletes its own copy of the key, so the line no longer opens anything.
- **SSH and the settings HexOS turned on.** These stay on. Anyone on your network who knows a password for your old server can sign in with SSH. Turn them off when you can.
- **Cloud access.** HexOS deletes its sign-in for the account. The account can still list HexOS among its connected apps until you remove it.

If you don't check the box, the card stays in **Settings** > **Bring over**, and you can click **Put back** at any time.

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
