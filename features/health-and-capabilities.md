---
title: Health & Capabilities
description: Choose whether your server shares hardware data with HexOS, see what it sends, and run diagnostics on your server.
published: true
date: 2026-10-07T00:00:00.000Z
tags: settings, hardware, diagnostics, privacy
editor: markdown
dateCreated: 2026-10-07T00:00:00.000Z
---

# Health & Capabilities

**Health & Capabilities** is a page in **Settings**. It holds two things for the server you have open:

- **Hardware data sharing:** your choice to send HexOS a daily report about your server's hardware. It is off until you turn it on.
- **Diagnostics:** a check of your server's storage, memory, network, apps and hardware. You run it whenever you like.

> **Info:** The setup screen named **Health and capabilities** is a different screen. It checks your hardware while you set up a server. See [Complete server setup](/getting-started/setup/CompleteSetup#health-and-capabilities).
{.is-info}

## Open Health & Capabilities

Click **Settings**. In the **System** group, click the **Health & Capabilities** tile.

<details>
<summary> Health & Capabilities tile in Settings </summary>

![settings-tile.png](/features/health-and-capabilities/images/settings-tile.png){.medium .framed}
</details>

The page starts with a notice: **We are still collecting data before we can enable further hardware analysis on your system.** Below the notice are the **Share hardware data** switch and **Diagnostics**.

<details>
<summary> Health & Capabilities page before you choose </summary>

![health-and-capabilities-not-chosen.png](/features/health-and-capabilities/images/health-and-capabilities-not-chosen.png){.medium .framed}
</details>

## Hardware data sharing

The **Share hardware data** switch decides whether this server sends HexOS a daily report about its hardware. [What we collect](#what-we-collect) lists everything in the report.

- Sharing is off until you turn it on. Nothing is sent before you do.
- The choice is for one server. If you own several servers, each one has its own switch.
- Only the server's owner can change it.

What sharing gives you:

- **Hardware advisories** in your diagnostics report. These are known problems with parts like yours, with what to do about them. With sharing off, this server gets no hardware advisories.
- Your reports help HexOS learn which hardware causes trouble with TrueNAS. HexOS runs on top of TrueNAS.

Diagnostics works with sharing on or off. Only the **Hardware advisories** part of the report needs sharing.

### When HexOS asks

HexOS asks once for each server, in a window named **Meet the Hardware Advisor**. The window opens when you open the server in the Command Deck, after the First Flight guide is closed. The **Share hardware data** switch in the window starts off.

<details>
<summary> Meet the Hardware Advisor window, switch off </summary>

![hardware-advisor-intro.png](/features/health-and-capabilities/images/hardware-advisor-intro.png){.medium .framed}
</details>

To keep sharing off, click **Continue**. HexOS saves that you chose not to share, and the window does not open again for this server.

To share, click the **Share hardware data** switch so it is on, then click **Continue**.

<details>
<summary> Meet the Hardware Advisor window, switch on </summary>

![hardware-advisor-intro-on.png](/features/health-and-capabilities/images/hardware-advisor-intro-on.png){.medium .framed}
</details>

If you close the window without clicking **Continue**, nothing is saved. The window opens again the next time you open HexOS in a new browser tab.

> **Info:** The window says that HexOS warns you about hardware known to cause trouble with TrueNAS. For now, those warnings appear only in your diagnostics report. The dashboard does not show them.
{.is-info}

You can change your choice at any time in **Settings** > **Health & Capabilities**.

### Turn sharing on or off

Open **Settings** > **Health & Capabilities** and click the **Share hardware data** switch. The change saves at once. There is no button to click.

<details>
<summary> Sharing on </summary>

![sharing-on.png](/features/health-and-capabilities/images/sharing-on.png){.medium .framed}
</details>

With the switch off, the page shows **With sharing off, this server gets no hardware advisories.**

<details>
<summary> Sharing off </summary>

![sharing-off.png](/features/health-and-capabilities/images/sharing-off.png){.medium .framed}
</details>

If you have never made a choice for this server, the switch is off and the page shows **You haven't chosen yet, so nothing is shared and hardware advisories are off.**

> **Tip:** **Share drive statistics** in **Settings** > **Preferences** > **Advanced settings** is a separate switch with its own data. Turning one switch on or off does not change the other. See [Drive Certification](/features/storage/drive-certification#drive-statistics).
{.is-tip}

## What we collect

The **What we collect** link next to the switch opens this page. A report is sent only while sharing is on for that server, and it counts only what happened after you last turned sharing on. It contains:

- **The parts in your server:** the motherboard's maker and model, its BIOS version, the processor model, each network card and its driver name, storage and graphics controllers and their driver names, and any USB dock or enclosure that holds a drive. Each part comes with the hardware ID numbers that tell its make and model apart.
- **Drives that match a known issue:** the drive's model, and its firmware version when the issue depends on it.
- **How those parts behave:** counts of trouble signs, such as a network connection dropping, network errors, drive read or write errors, drive timeouts, a drive that disappears, or a restart that HexOS did not start. The report also says how many hours it covers.
- **Known issues that match your parts:** which known hardware issues match this server, and whether you marked one as fixed.
- **Your TrueNAS version** and how long the server has been running since it last started.

Drives and network ports are identified by private codes that your server makes, never by a drive's serial number or a network port's name.

Reports are not anonymous. Each report is linked to your server, so HexOS knows which server sent it.

### What is never sent

- Your files, or anything in them
- The names of your folders, shares, apps or users
- Passwords or keys
- Drive serial numbers
- Network port names and hardware (MAC) addresses
- The motherboard's serial number or system ID
- Lines from your server's system log

### When reports are sent

- Once a day, at night. The report starts at 3:37 a.m. US Central time, and each server waits a different time of up to two hours, so the reports do not all arrive together.
- After you turn sharing on, the server first takes a starting reading on its nightly check and sends nothing. The first report goes out on the night after that and counts only what happened since the starting reading. On a server that logs a lot, this can take a few nights.
- Each later report covers the time since the server's last report, up to the last 7 days.
- The server needs its connection to HexOS. If a night is missed, the next report covers the missed time, up to 7 days.
- HexOS support can ask your server to send its report early. This works only while sharing is on. Right after you turn sharing on, the first early request only takes the starting reading.
- A server sends reports only once it runs a current version of HexOS.

### If you turn sharing off

- The server stops sending reports. If you turn sharing back on, reports never include anything from while it was off. Your server keeps its own record for diagnostics.
- What was already sent stays with HexOS. You cannot delete it yourself. To ask HexOS to delete it, email support@hexos.com and name the server.
- When a server is unclaimed or reset, its choice goes back to not chosen. The next owner is asked again, and nothing is sent until they turn sharing on. Reports never include anything from before the new owner turned sharing on.

## Run diagnostics

Diagnostics checks your server's storage, memory, network, apps and hardware, and points out anything that needs your attention. It runs on the server itself and takes about a minute.

1. Open **Settings** > **Health & Capabilities**.
2. Click **Run diagnostics**. The button reads **Running...** and shows when the run started.

<details>
<summary> Diagnostics running </summary>

![diagnostics-running.png](/features/health-and-capabilities/images/diagnostics-running.png){.medium .framed}
</details>

You can leave the page while diagnostics runs. The server keeps the last report, and the page shows it when you come back.

After a run, the button reads **Run again**. Only one run happens at a time, and you can run it again 2 minutes after the last run. Until then, the page shows how many seconds are left.

<details>
<summary> Wait before the next run </summary>

![diagnostics-cooldown.png](/features/health-and-capabilities/images/diagnostics-cooldown.png){.medium .framed}
</details>

The report is kept on your server. When you open it in the Command Deck through HexOS, it passes through HexOS on its way to your browser. HexOS records a note that diagnostics ran, who ran it, how long it took, how many findings it had, and whether hardware advisories were on. To check your connection to HexOS, the server also asks HexOS for its side of that check.

## Read the report

The top of the report says **Nothing needs your attention** or how many things need your attention, then when it ran and how long it took.

<details>
<summary> A finished report </summary>

![diagnostics-report.png](/features/health-and-capabilities/images/diagnostics-report.png){.medium .framed}
</details>

### Hardware advisories

This part lists known problems with parts like the ones in your server. It shows one of these:

- **One entry for each known issue that matches.** Each entry says what the problem is and, when there is one, the recommended fix. It names the part after **Device:**. For a drive, that is its system name and model, such as `sda WDC WD40EFRX`. A report kept from before this update shows **Drive**. For a network part, it also says what this server has seen. Click **Learn more** to open a page about the issue.
- **Known issue, not seen on this server:** a network part has a known issue, but this server has not logged that trouble. Most of these entries do not count as things that need your attention.
- **No known issues with this server's hardware.**
- **Hardware advisories are off because this server doesn't share hardware data. Turn sharing on above to see them.** The page keeps showing this until a new run. After you turn sharing on, click **Run again**.
- **This server hasn't compared its hardware with the known issues yet. Try again in a few minutes.** This can show shortly after the server starts, or when the server has not reached HexOS since it started. Run diagnostics again a few minutes later.

<details>
<summary> A hardware advisory </summary>

![diagnostics-hardware-advisory.png](/features/health-and-capabilities/images/diagnostics-hardware-advisory.png){.medium .framed}
</details>

<details>
<summary> Hardware advisories with sharing off </summary>

![diagnostics-sharing-off.png](/features/health-and-capabilities/images/diagnostics-sharing-off.png){.medium .framed}
</details>

### Checks

Each check has a result: **OK**, **Needs attention**, **Note**, **Couldn't check** or **Skipped**. Click a check to see **Technical details**, which shows what the check found.

<details>
<summary> A check that needs attention </summary>

![diagnostics-attention.png](/features/health-and-capabilities/images/diagnostics-attention.png){.medium .framed}
</details>

The checks are: **Storage pools**, **Boot drive**, **Drive health (SMART)**, **Drive errors**, **Storage errors in the system log**, **Drive temperatures**, **Health check schedule**, **System drive space**, **Memory**, **Out-of-memory events**, **Memory test**, **TrueNAS alerts**, **Failed TrueNAS jobs**, **Apps service**, **App install and update errors**, **App download connection**, **Docker Hub download limit**, **Network ports**, **Router DNS protection**, **System clock**, **TrueNAS version**, **Buddy backup** and **Connection to HexOS**.

If your server has lost its connection to HexOS, **Connection to HexOS** says so. Checks that need HexOS, such as **Buddy backup**, show **Skipped**. The other checks still run. See [Connection troubleshooting](/troubleshooting/connection).

### HexOS internals

Under the checks, click **HexOS internals** to see checks of the parts of HexOS that run on your server. They are mostly useful to HexOS support.

<details>
<summary> HexOS internals </summary>

![diagnostics-internals.png](/features/health-and-capabilities/images/diagnostics-internals.png){.medium .framed}
</details>

### Copy the report for support

Click **Copy report**. The whole report, HexOS internals included, is copied as text, and HexOS shows **Report copied. Paste it into your message to HexOS support.** Paste it into an email to support@hexos.com.

> **Warning:** The copied report includes details about your server, such as your server's ID, pool names and IP addresses. TrueNAS alerts in it can also include drive serial numbers. Send it only to HexOS support by email. Do not paste it in a public place such as Discord.
{.is-warning}

<details>
<summary> Report copied </summary>

![copy-report-toast.png](/features/health-and-capabilities/images/copy-report-toast.png){.medium .framed}
</details>

## If something goes wrong

**Couldn't load your hardware data sharing choice:** the page could not read your choice. Click **Try again**.

<details>
<summary> Sharing choice did not load </summary>

![sharing-load-error.png](/features/health-and-capabilities/images/sharing-load-error.png){.medium .framed}
</details>

**Couldn't update hardware statistics sharing:** your change to the **Share hardware data** switch was not saved. The message refers to the same switch. Wait a moment and click the switch again. In the **Meet the Hardware Advisor** window, the window stays open so you can click **Continue** again.

**Couldn't load diagnostics:** click **Try again**.

<details>
<summary> Diagnostics did not load </summary>

![diagnostics-load-error.png](/features/health-and-capabilities/images/diagnostics-load-error.png){.medium .framed}
</details>

**Couldn't start diagnostics:** the run did not start. Wait a moment and click **Run diagnostics** again.

If the page says **This server needs a HexOS update before it can run diagnostics. It updates itself, so check back soon.**, there is nothing for you to do. Come back later and run diagnostics.

<details>
<summary> Server needs an update </summary>

![diagnostics-needs-update.png](/features/health-and-capabilities/images/diagnostics-needs-update.png){.medium .framed}
</details>

> **Help:** Still stuck? Click **Copy report** and email it to support@hexos.com. You can also describe the problem in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz), without pasting the report.
{.is-troubleshooting}

## Known issues

These are problems we know about. Each one says what to do for now.

- **The Meet the Hardware Advisor window keeps coming back.** It opens again in each new browser tab until you click **Continue**, and it asks once for each server you own. What to do: click **Continue**. Leave the switch off if you do not want to share. Your choice is saved and the window stops opening for that server.
- **Hardware warnings show only in diagnostics.** The window talks about HexOS warning you about hardware, but the dashboard does not show these warnings yet. What to do: run diagnostics and read **Hardware advisories**.
- **You cannot mark a hardware advisory as fixed.** When HexOS cannot detect a fix on its own, the warning stays in the report after you apply the fix and still counts as a thing that needs your attention. One example is the BIOS setting for [Ryzen idle freezes](/troubleshooting/ryzen-idle-freeze). What to do: if you have applied the fix that the **Learn more** page describes, you can ignore that entry.

## Frequently asked questions

**Do I have to share hardware data to use HexOS?**
No. Sharing is your choice, and it starts off. Diagnostics works without it. Only **Hardware advisories** in the diagnostics report need sharing.

**Is the data anonymous?**
No. Each report is linked to the server that sent it. Drives and network ports are identified by private codes, not by serial numbers or names, and no files, passwords or system log lines are sent. See [What we collect](#what-we-collect).

**Can I see what my server sent?**
No. HexOS does not show the reports in the app. [What we collect](#what-we-collect) lists everything a report contains.

**How do I delete what was already sent?**
You cannot delete it yourself. Email support@hexos.com and name the server.

**I own several servers. Do I choose once?**
No. The choice is for one server. HexOS asks once for each server, and each server has its own switch in **Settings** > **Health & Capabilities**.

**I sold or gave away my server. Does my choice go with it?**
No. When the server is unclaimed or reset, its choice goes back to not chosen. The next owner is asked again.

**Does diagnostics fix problems?**
No. Diagnostics points out what needs your attention. Each finding and each **Learn more** page says what to do.
