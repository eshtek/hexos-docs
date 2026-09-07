---
title: Recover a failed server
description: Rebuild onto a replacement server using the retained backups a buddy still holds
published: false
date: 2026-09-07T00:00:00.000Z
tags: backups, buddy, disaster recovery, transfer
editor: markdown
dateCreated: 2026-08-23T12:07:19.404Z
---

# Recover a failed server

Losing a server does not lose the backups it sent. The copies on your buddy's server are kept, and a replacement server on the same HexOS account can pull them all back with one action. You do not need any access to the old machine.

## Retained backups

When a server that sent backups is removed from your account, its copies on the destination stay and are shown as **Retained backups**, with the note "These copies belonged to a server that was removed. They stay restorable until you delete them". The connection card reads "Backups retained from a removed server".

Ownership is proved by your HexOS account. As long as you can sign in, you can recover.

> **Danger:** Recovery depends on your folder passphrases. Encrypted folders in a retained backup cannot be opened without them, and there is no reset. See [Folder encryption](/features/folders#encrypted-folders).
{.is-danger}

## The steps

1. Set up the replacement server and claim it to the **same HexOS account** as the old one.
2. If the old server is still listed on your account, unclaim it. This does not delete the copies your buddy holds.
3. Open the Backups panel from the dashboard and click the retained backup.

<details>
<summary> An outgoing connection showing the Transfer tile </summary>

![Outgoing connection details with action tiles including Transfer](/features/backups/images/connection-details-outgoing.png){.medium .framed}
</details>

4. Click **Transfer**. The dialog explains: "Transfer this backup to another one of your servers. Once the transfer is complete, data stored on this backup can be restored to the server you selected."
5. Choose the replacement server and the pool the folders should land on.
6. Confirm.

HexOS moves the backup to the new server and starts restoring every folder in it. Progress shows in the activity center. Encrypted folders ask for their passphrases before they finish, the same way a single restore does. See [Restore a folder](/features/backups/restore-a-folder).

> **Warning:** **Transfer** restores every folder in the backup. Make sure the destination pool has room for all of it.
{.is-warning}

> **Info:** If the server holding the retained backup is offline, the dialog says so. Wait until it is online and try again.
{.is-info}

**Transfer** is on your own account, because you own the data. Your buddy sees the retained backup on their side with **Remove** as their only action. Ask them not to remove it while you recover.

## If your buddy's server failed instead

If the destination server is the one that is gone, the offsite copy is gone with it. Your own files on your own server are unaffected. Set up a new backup to another destination as soon as you can.

## Planning ahead

- **Write down your folder passphrases** and keep them somewhere that is not on the server. They are the one thing HexOS cannot recover for you.
- **Use more than one destination** for anything irreplaceable.
- **Check that your connections read "Up to date"** now and then. HexOS notifies you when backups stop arriving, but a quick look costs nothing.
- **Do a test restore** once while everything is working, so the first time you use the process is not during an emergency.

> **Help:** Recovering and something is not behaving? See [Backup troubleshooting](/features/backups/troubleshooting) or ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
