---
title: Use your own domain for remote access
description: The DNS records your own domain needs for remote access, and what to watch for at common DNS providers
published: false
date: 2026-10-28T00:00:00.000Z
tags: remote access, custom domain, dns, cname, cloudflare, namecheap, godaddy, porkbun, squarespace, route 53
editor: markdown
dateCreated: 2026-10-28T00:00:00.000Z
---

# Use your own domain for remote access

> **Info:** Remote access is being tested inside HexOS and isn't available to everyone yet. Screens may change before it is.
{.is-info}

With remote access on, each app you share gets its own HexOS address. If you own a domain, you can use it instead, so Jellyfin answers at `jellyfin.example.com`. Your connection stays encrypted all the way to your server: HexOS passes it along without reading it.

To use your domain, you add one DNS record where you manage it. A second, optional record keeps your app names private.

## Add your domain

1. In the Command Deck, open **Settings** > **Remote access** > **Custom domain**.
2. Type your domain, such as `example.com`, and select **Continue**.
3. The Command Deck shows the record to add. Add it at your DNS provider, as described below.
4. Back in the Command Deck, select **Re-check**. The badge changes from **Pending** to **Verified** once HexOS finds the record.

Most providers publish a change within minutes, but some take an hour or more (see [your provider](#notes-for-common-providers) below). If the check can't find the record yet, wait a little and select **Re-check** again.

## The records

| | Type | Host | Value |
|---|---|---|---|
| Required | CNAME | `*` | The value the Command Deck shows |
| Optional | CNAME | `_acme-challenge` | The value the Command Deck shows |

Copy each value with its copy button in the Command Deck. They are unique to your account.

### Type only the first part of the host

The Command Deck shows the full name, such as `*.example.com`, but most providers add your domain to the host for you. Type only `*` (and `_acme-challenge` for the optional record). If you type the full name, the record ends up at `*.example.com.example.com` and HexOS won't find it.

### Turn off any proxy or CDN

The record must point straight at HexOS. A provider setting that sends your traffic through its own servers (Cloudflare's orange cloud, Namecheap's HTTPS toggle) breaks the encrypted connection to your server. Set the record to **DNS only**.

### What the `*` record covers

The `*` record sends every name under your domain to HexOS, except names that already have their own records. Your website at `www.example.com`, your email and anything else you set up keep working as they are. Those names can't be used for apps, though: an app named `www` wouldn't be reachable while `www` has its own record.

### Optional: keep your app names private

Without the second record, your server gets a separate certificate for each app, and every certificate is listed in public logs that anyone can search. That reveals names like `jellyfin.example.com`, though not what's behind them. With `_acme-challenge` handed to HexOS, your server gets one certificate that covers all your apps, and their names stay out of those logs.

### If your domain has CAA records

A CAA record says which certificate authorities may issue certificates for your domain. Most domains have none, and then there is nothing to do. If yours has one, add a CAA record that allows `letsencrypt.org`, or your server can't get its certificates.

## Command Deck

If you sign in to your server's Command Deck through your own reverse proxy, you can give it an address on your domain, such as `nas.example.com`.

1. Under **Command Deck** in the same tab, type a name, such as `nas`, and select **Apply**. The name can't be `join` or a name one of your apps uses.
2. At your DNS provider, point that name at your proxy with an A record (your proxy's public IP address) or a CNAME. A record for one name takes precedence over the `*` record, so only that name goes to your proxy.
3. Add the TXT record the Command Deck shows. Its host is `_hexos-dashboard.nas` (with your name in place of `nas`), and its value starts with `hexos-dashboard=`.
4. Select **Re-check**. Leave the TXT record in place: HexOS checks it again when you sign in through this address, and stops approving the address once the record is gone.

To set up the proxy itself, see [VM console and remote access](/features/vms/remote-access#local-hexos-interface-ports) for the ports your server's own interface uses.

## Notes for common providers

### Cloudflare

- Set **Proxy status** to **DNS only** (the grey cloud) on every record you add for HexOS. A proxied record won't work.
- Name: `*`, and `_acme-challenge` for the optional record.
- If you turned on **CNAME flattening** for all records, turn it off, or at least don't flatten `_acme-challenge`: a flattened record hides the CNAME HexOS looks for.
- An older SSL setup can leave `_acme-challenge` TXT records behind that don't always appear in the dashboard. If the optional record won't verify, check for them.
- Changes take effect within about 5 minutes.

[Cloudflare: wildcard DNS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/wildcard-dns-records/) · [Proxy status](https://developers.cloudflare.com/dns/proxy-status/)

### Namecheap

- Open **Domain List** > **Manage** > **Advanced DNS**, then **Add New Record** > **CNAME Record**.
- Host: `*`. Namecheap adds your domain itself, so don't type it.
- If your domain has an SSL certificate with web-based automation, turn the record's **HTTPS** toggle off.
- Remove any wildcard redirect (**Add Wildcard Redirect** under Redirect Domain); it uses the same `*` host.
- New records usually take effect within 30 minutes.

[Namecheap: wildcard subdomains](https://www.namecheap.com/support/knowledgebase/article.aspx/597/2237/how-can-i-set-up-a-catchall-wildcard-subdomain/) · [CNAME records](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/)

### GoDaddy

- In **DNS** > **DNS Records**, select **Add New Record**, then **CNAME**.
- Name: `*`, without your domain.
- Domain or subdomain forwarding changes your records. Don't forward the name you use for the Command Deck.
- Changes usually take effect within an hour, but can take up to 48 hours.
- We haven't confirmed that GoDaddy accepts a `*` CNAME for every domain. If it refuses the record, you can move your domain's DNS to a provider that does, such as Cloudflare, and keep the domain registered at GoDaddy.

[GoDaddy: add a CNAME record](https://www.godaddy.com/help/add-a-cname-record-19236)

### Porkbun

- New domains come with parking records pointing at `pixie.porkbun.com`, including one at `*`. Delete them first, or Porkbun refuses the new record because "a CNAME or ALIAS record with that host already exists".
- Host: `*`, without your domain.
- Porkbun's free SSL certificate adds `_acme-challenge` TXT records. Delete them before adding the optional record; a CNAME can't share a name with other records.
- Don't use **Park domain** later: it deletes the `*` record.

[Porkbun: wildcard records](https://kb.porkbun.com/article/94-what-is-a-wildcard-dns-record) · [Record already exists](https://kb.porkbun.com/article/239-cname-alias-record-with-that-host-already-exists-error) · [Parking](https://kb.porkbun.com/article/183-how-to-reset-dns-and-park-your-domain)

### Squarespace Domains (including former Google Domains)

- Squarespace adds your domain to the name itself: type `*`.
- Paste the value without a dot at the end; Squarespace can't save a value that ends with one.
- If it offers **Replace record**, check what it would replace first: it deletes the existing record.
- Changes can take 24 to 48 hours.
- We haven't confirmed that Squarespace accepts a `*` CNAME. If it refuses the record, you can move your domain's DNS to a provider that does.

[Squarespace: edit your DNS records](https://support.squarespace.com/hc/en-us/articles/360002101888-Edit-your-domain-s-DNS-records)

### Amazon Route 53

- In your hosted zone, select **Create record**. Record name: `*`. Record type: **CNAME**.
- The value works with or without a dot at the end.
- Changes reach Route 53's servers within about a minute.

[Route 53: wildcards](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html)

### Other providers

- **Gandi**: end the value with a dot (`.`), or Gandi adds your domain to the end of it.
- **DigitalOcean**: end the value with a dot. DigitalOcean documents wildcards for A and AAAA records; we haven't confirmed a `*` CNAME there.
- **Hover**: new domains may come with a `*` A record. Delete it before adding the CNAME.

## When the check doesn't pass

| The Command Deck says | What to do |
|---|---|
| We couldn't find the record yet | Check that the host is only `*`, then give it time: some providers take an hour or more. |
| The record points somewhere else | Copy the value again with the copy button, and check that the record isn't proxied. |
| This domain is already connected to HexOS somewhere else | Remove it where it's connected, then select **Re-check**. |
