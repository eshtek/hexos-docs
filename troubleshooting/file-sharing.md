---
title: Windows 11 cannot connect to public folders
description: Windows 11 requires SMB signing for public shares. This is how to turn that requirement off.
published: true
date: 2026-08-20T19:00:00.000Z
tags: troubleshoot, smb, samba, network
editor: markdown
dateCreated: 2026-06-18T22:20:59.343Z
---

# Windows 11 cannot connect to public folders

Windows 11 requires SMB signing by default, which stops it connecting to public (guest) folders shared from HexOS. Turning that requirement off on the Windows PC restores the connection.

> **Warning:** This lowers the security of SMB connections from this PC to every server it talks to, not just HexOS. On a home network that is normally an acceptable trade-off. Avoid it on a shared or corporate machine, and prefer connecting with a user account instead of a public folder where you can.
{.is-warning}

Pick whichever method suits you — they all make the same change. You need administrator access on the Windows PC, and a reboot afterwards.

## Method 1: Apply a .reg file

The quickest option, and the easiest to pass to someone else.

1. Open **Notepad**.
2. Copy the text below into the blank document:

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters]
"RequireSecuritySignature"=dword:00000000
```

3. Click **File** > **Save As**.
4. Change **Save as type** to **All Files**.
5. Name the file `Fix-TrueNAS-Sharing.reg` — the `.reg` extension is essential.
6. Save it to your Desktop, then double-click it.
7. Accept the Windows security prompts, then restart your PC.

## Method 2: Run a PowerShell command

1. Right-click the Windows Start button and select **Terminal (Admin)** or **PowerShell (Admin)**.
2. Paste this command and press **Enter**:

```
Set-SmbClientConfiguration -RequireSecuritySignature $false -Force
```

3. Close the window and restart your PC.

> **Info:** The `-Force` flag skips the confirmation prompt. Leave it off if you would rather confirm the change yourself.
{.is-info}

## Method 3: Use Group Policy

Available on Windows 11 Pro and Enterprise.

1. Press **Win + R**, type `gpedit.msc`, and press **Enter**.
2. Navigate to **Computer Configuration** > **Windows Settings** > **Security Settings** > **Local Policies** > **Security Options**.
3. Find the policy **Microsoft network client: Digitally sign communications (always)**.
4. Double-click it, set it to **Disabled**, and click **Apply**.
5. Restart your PC.

> **Help:** Still cannot connect after rebooting? Check that the folder is shared and that you are using the server's IP address, then ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
{.is-troubleshooting}
