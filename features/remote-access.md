---
title: Remote access
description: Reach your apps from anywhere at their own web addresses, with no router changes and your home IP address kept private
published: false
date: 2026-10-28T00:00:00.000Z
tags: remote access, relay, sign-in, password, devices, invites, custom domain
editor: markdown
dateCreated: 2026-10-28T00:00:00.000Z
---

# Remote access

> **Info:** Remote access is in beta, and only owners we invite can use it for now. Screens may change before it opens to everyone. [What beta means](/features/remote-access#what-beta-means)
{.is-info}

Remote access gives an app on your server its own web address, such as `https://jellyfin.k7pqm4tz.relay.hexos.com`. You can open it from anywhere: a phone on mobile data, a laptop at work, or a friend's TV. You don't change anything on your router, and your home IP address stays private.

You choose which apps get an address. Every other app, and the rest of your server, stays reachable only at home.

## How it works

1. A visitor opens your app's address. It leads to our relay, not to your home.
2. The relay passes the visit on to your server over a private, encrypted link. It doesn't decrypt anything: the connection stays encrypted from the visitor's browser all the way to your server.
3. Your server holds the certificate for the address. It shows the sign-in page and decides who gets in.
4. A visitor who gets in reaches the app's own web page, just as they would at home.

Because the relay never decrypts the connection, we can't see the pages, passwords or files that pass through it. The relay does see which address was visited, the visitor's internet address, when, and how much data moved. Visitors see the relay's internet address, never yours.

## What beta means

Remote access is in a closed beta. We turn it on for the owners we invite. If you don't see **Remote access** in **Settings**, it isn't on for your account yet.

The Command Deck shows a **Beta** badge on **Settings** > **Remote access** and on each app's **Remote Access** tab. Click the badge in Settings to read a short note about the beta.

What this means for you:

- **We are still finishing it.** Screens and settings may change, and you may find a rough edge.
- **A new address can take a few minutes to start working.**
- **Keep what you use today.** If you already reach your apps from outside another way, keep it until you are happy with remote access.
- **Tell us what confuses you.** Your feedback shapes what ships to everyone. Share it in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).

## Set your sign-in password first

Every app with remote access asks visitors for a password, unless you turn that off for the app. The password belongs to your server, and every app that asks for sign-in uses the same one. Set it before you turn on your first app.

1. In the Command Deck, open **Settings** > **Remote access**.
2. On the **Overview** tab, next to **Sign-in password**, click **Set password**.
3. Type a **New password** of at least 8 characters, and click **Save password**.

The **Overview** tab then shows the date you set it. To change it later, click **Change**. Changing the password signs everyone out of every app, you included.

> **Tip:** We keep only a scrambled form of the password, so the Command Deck can never show it to you. If you forget it, set a new one.
{.is-tip}

## Turn on remote access for an app

1. Open the app from your dashboard or the **Apps** screen, and click its **Remote Access** tab.
2. Turn on the **Remote access** switch.
3. Check the address. We suggest the app's name, such as `jellyfin`. You can change it, using lowercase letters, numbers and hyphens. The rest of the address is added when you apply.
4. Leave **Require sign-in** on, unless you have a reason to turn it off (see [Sign-in](#sign-in)).
5. Click **Apply**.

The Command Deck confirms the address, for example "Jellyfin is reachable at https://jellyfin.k7pqm4tz.relay.hexos.com". The badge next to **Remote access** reads **Connecting** while we set the address up, then **On**. This can take a few minutes.

Click the address to open it, or click the copy button next to it to share it.

### Your address

Until you add a domain of your own, an address has three parts: the name you chose for the app, a short label we pick for your server, and `relay.hexos.com`. Every app on the server shares the same label. **Settings** > **Remote access** > **Overview** shows your server's part under **Remote access URL**.

With your own domain, the address is the app's name followed by your domain, such as `jellyfin.example.com`. See [Use your own domain](#use-your-own-domain).

### Apps with more than one web page

Some apps have more than one web page. Scrutiny, for example, also has an InfluxDB page. The **Remote Access** tab of such an app has one section for each page, titled with its name, such as **Remote access: InfluxDB**. Each page gets its own switch and its own address (`scrutiny` and `scrutiny-influxdb`), so you can share one without the other.

### Change an address

Click the pencil button (**Edit address**) next to the address, type a new name, and click **Apply**.

The old address stops working at once, and it doesn't send visitors on to the new one. Update your bookmarks and the address in any TV or phone app. Browsers have to sign in again on the new address. Devices you approved keep their approval.

### Turn it off

Turn off the **Remote access** switch and click **Apply**. The address stops working at once. If you turn it on again later, the app gets the same address back.

## Sign-in

With **Require sign-in** on, anyone who opens the address sees our sign-in page first. They type your server's sign-in password, and then they reach the app. If the app has a login of its own, it still asks for it.

- **One password for the whole server.** Every app with sign-in on asks for the same password. You can change it in **Settings** > **Remote access**, or with **Change password** in any app's **Remote Access** tab.
- **Signed in for 30 days.** A browser that signs in stays signed in on that address for 30 days. Each address is separate: signing in to Jellyfin doesn't sign you in to Immich.
- **Too many wrong passwords.** After five wrong passwords in 15 minutes, we turn that visitor away from every app on your server for 15 minutes. They see "Too many attempts. Try again in 15 minutes."
- **A new password signs everyone out.** TV and phone apps that got in because someone signed in (listed as **Signed in**) have to get in again too. Devices you approved yourself stay approved.

If your server has no password yet, the app's tab says **Not yet set up** under **Require sign-in**, with a **Set up** button that opens **Settings** > **Remote access**. You can't apply until the password is set.

### Turning sign-in off

With **Require sign-in** off, anyone who has the address reaches the app's own login page. **Settings** > **Remote access** marks these apps **No sign-in**.

We still watch an app without sign-in: if the app turns one visitor away ten times in 10 minutes, we block that visitor for 30 minutes.

> **Warning:** An app without sign-in is open to anyone on the internet who finds its address. Turn sign-in off only for an app with a strong login of its own, and keep that app up to date.
{.is-warning}

## TV and phone apps

Apps on a TV or a phone, such as the Plex and Jellyfin apps, can't show a sign-in page. The first time one connects to an address with sign-in on, we turn it away, and it waits for you to approve it.

1. You get a notification, such as "A device is waiting to use Jellyfin". Click **Review devices**.
2. The app's **Remote Access** tab lists the device under **Waiting for approval**, with the app and device it says it is.
3. Click **Approve**.

Approve only a device you, or a friend you invited, just tried to connect. If you don't recognize one, click **Dismiss**. A device you leave waiting is dropped after 7 days.

Once approved, the device works from any network. An approval covers one app: a TV you approved for Jellyfin still needs approval for Plex.

Some apps show our sign-in page inside the app. Signing in there is enough: the device gets in without a separate approval, and it is listed as **Signed in**.

With sign-in off, TV and phone apps go straight to the app and need no approval.

**Settings** > **Remote access** > **Devices** lists every device you have let in, and how each got in: **Approved by you**, **Signed in**, or through a friend's invite. To take a device's access away, open its menu and click **Remove**.

## Invite a friend

An invite lets a friend use the apps you choose without knowing your password. You can change what it opens, or take it back, at any time.

1. Open **Settings** > **Remote access** > **Invites** and click **New invite**.
2. Under **Who it's for**, type your friend's name.
3. Under **Apps they can use**, choose the apps.
4. Click **Create invite**.
5. Click **Copy link**, then send the link to your friend. Click **Done**.

Only apps with remote access and sign-in on can be chosen. An app without sign-in needs no invite: anyone with its address can already reach it.

Your friend opens the link in their browser and clicks **Join**. From then on, they can open those apps in that browser without a password.

> **Info:** A link works once and expires after 24 hours. If it expired, or your friend wants to join from a second browser, click **New link** on the invite and send that one.
{.is-info}

The **Invites** tab lists each invite with its apps, its link and how many devices joined with it. From an invite's menu:

- **Edit** changes its name or its apps. The change applies at once to every device that joined with it.
- **Delete** removes the invite, and every browser and device that joined with it loses access.

Only links and TV setup windows expire. Your friend keeps access until you delete the invite or remove one of their devices.

### Add a friend's TV

A TV can't open a link, so your friend lets it in from their phone or laptop while both are on the same Wi-Fi as the TV:

1. On the page the link opens, they check **Set up a TV or other device on this network too**, then click **Join**. If they already joined, they click **Set up a TV or other device** on the page they land on.
2. Within the next 15 minutes, they open the app on the TV and connect to your app's address.

Apps that connect from that Wi-Fi during those 15 minutes are let in for good. Most are remembered by the device itself, so they keep working on any network afterwards. While the window is open, the **Devices** tab shows "Setting up devices on its network" with the time it ends.

> **Warning:** Your friend should do this only on a home Wi-Fi network they trust, never on mobile data. Many mobile customers share one internet address, so a window opened there could let in strangers' devices too.
{.is-warning}

## Use your own domain

If you own a domain, your apps can use it: Jellyfin answers at `jellyfin.example.com` instead of its relay address.

1. Open **Settings** > **Remote access** > **Custom domain**.
2. Type your domain and click **Continue**.
3. Add the DNS record the Command Deck shows at your DNS provider, then click **Re-check** until the badge reads **Verified**.

Once your domain is verified, each app answers only at its address on your domain, and its relay address stops working. Update your bookmarks and the addresses in TV and phone apps. If you remove the domain later, your apps go back to their relay addresses.

The records, and what to watch for at common DNS providers, are in [Use your own domain for remote access](/features/remote-access/custom-domain).

## Open your Command Deck from anywhere

With your domain verified, you can give your server's Command Deck an address on it too, such as `deck.example.com`. Under **Command Deck** in the **Custom domain** tab, type a name and click **Apply**. It needs no extra DNS record, and you sign in there with your HexOS account as usual. See [Command Deck](/features/remote-access/custom-domain#command-deck) for the details.

## Good to know

- **Speed.** Each server's remote access traffic is limited to 100 Mbit/s in each direction, because every visit crosses a relay that all owners share. Large downloads and very high-quality video can be slower than at home.
- **VPN.** An app whose internet traffic goes through a VPN can have a remote access address too. Visits still reach it.
- **Plain http.** A visitor who types an address with `http://` is sent on to `https://`.
- **One password per server.** There are no separate passwords for each app, and no way to limit visitors by country.
- **Certificate alerts.** Your server watches the public logs where certificates are listed. If a certificate appears for one of your addresses that your server didn't ask for, you get a notification, such as "A certificate for jellyfin.example.com that this server didn't ask for". If you or someone you trust asked for it, you can ignore it. If not, contact us.

## When something needs attention

Each address has a badge next to **Remote access** in the app's tab, and next to the app in **Settings** > **Remote access**.

| Badge | What it means |
|---|---|
| **Off** | Remote access is off for this app. |
| **Connecting** | We are setting the address up. This can take a few minutes. |
| **On** | The address works. |
| **Needs attention** | Something went wrong. The reason is written under the badge. |

When an address needs attention, we try again every few minutes on our own. To try again now, turn the **Remote access** switch off and click **Apply**, then turn it on and click **Apply** again. The app keeps the same address.

| You see | What to do |
|---|---|
| The relay could not be updated | Wait a few minutes, or turn remote access off and on for the app. |
| The relay holds an entry for this address that this HexOS did not make | Choose another address, or contact support to have it released. |
| A TV or phone app can't connect | Look for it under **Waiting for approval** in the app's **Remote Access** tab. |
| Too many attempts. Try again in 15 minutes. | Wait 15 minutes, then sign in with the right password. |
| This invite link was already used or has expired. | Click **New link** on the invite in **Settings** > **Remote access** > **Invites**, and send the new link. |

> **Help:** If something here doesn't match what you see, or an address stays stuck, [ask us on Discord](https://discord.com/invite/DjEp3WRHKz).
{.is-troubleshooting}

> **Contribute:** to help to improve HexOS documentation [join the #Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or contribute a guide.
{.is-contribute}
