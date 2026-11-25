---
title: Open the Command Deck through your own reverse proxy
description: Sign in to your server's Command Deck at an address your own reverse proxy serves (Nginx, Caddy, Pangolin, Traefik, Cloudflare), without HexOS Anywhere
published: true
date: 2026-11-25T00:00:00.000Z
tags: remote access, reverse proxy, custom domain, dns, cloudflare, pangolin, nginx, caddy, traefik, sign-in
editor: markdown
dateCreated: 2026-11-25T00:00:00.000Z
---

# Open the Command Deck through your own reverse proxy

If you already run a reverse proxy, such as Nginx Proxy Manager, Caddy, Traefik, Pangolin or a Cloudflare Tunnel, you can serve your server's Command Deck from it at an address on your own domain, such as `https://nas.example.net`. You sign in there with your HexOS account.

> **Info:** This doesn't need HexOS Anywhere. Anywhere is only needed when HexOS serves the address through its own relay. If your proxy carries the traffic, the address is free on HexOS Lifetime.
{.is-info}

You set the address up once in the Command Deck and prove the domain is yours with a TXT record. After that, signing in at the address works like signing in at deck.hexos.com.

## Before you start

- Your server is claimed to your HexOS account and connected to HexOS. Sign-in at your address passes through your server to HexOS, so it doesn't work while your server is offline or can't reach HexOS. Your server's local address still works then.
- Your proxy serves the address over HTTPS with a valid certificate.
- You can add records where you manage your domain's DNS.

## How sign-in works at your address

This section explains what your proxy and DNS need to allow. You don't need it to set things up.

HexOS doesn't check the IP address your visitors or your proxy come from, so you don't add any IP addresses to an allow list. HexOS checks two things instead:

1. The TXT record proves that whoever controls the domain asked for it to open this server's Command Deck. The record ties the exact address, including any port, to your account and your server.
2. Your browser's `Origin` header has to match that saved address.

When you open your address, the Command Deck asks your server to start a HexOS sign-in. Your browser goes to the HexOS sign-in page, then through deck.hexos.com, and lands back on your address at `/auth/custom-callback`. Your server then collects your sign-in from HexOS. No HexOS token ever travels in the address bar.

HexOS approves the address for 24 hours at a time. Each time you sign in after that, it looks up the TXT record again and renews the approval if the record still matches. That's why the record has to stay in place.

## Set up your address

1. Open the Command Deck at [deck.hexos.com](https://deck.hexos.com), not your server's own address. Your server's copy of the Command Deck shows the new card only after its next update.
2. Go to **Settings** > **Anywhere** and click the **Custom domain** tab.
3. Under **Command Deck**, type the full HTTPS address your proxy serves, such as `https://nas.example.net`. Include the port if it isn't 443. If you have verified a domain for HexOS Anywhere, click **Use your own proxy's address** first.
4. Click **Apply**. The card shows a TXT record and the status **Pending**.
5. At your DNS provider, add that TXT record. For `https://nas.example.net`, its host is `_hexos-dashboard.nas` (most providers add your domain for you), and its value starts with `hexos-dashboard=`. Copy the value with the copy button.
6. Back in the Command Deck, click **Re-check**. The status changes to **Verified** once HexOS finds the record.
7. Open your address and sign in with your HexOS account.

If **Re-check** says "The TXT record does not match yet", give your DNS provider a few minutes and click **Re-check** again.

To use a different address later, apply the new one; it replaces the old approval. To stop sign-ins through the address, remove it from the card. Sessions that are already signed in stay active until they end, or until you end them in your HexOS account.

## Set up your proxy

Send the address to the HexOS service on your server, not to the TrueNAS interface.

| Upstream | When to use it |
| --- | --- |
| `http://SERVER-IP:43706` | Your proxy handles HTTPS. Your proxy must send `X-Forwarded-Proto: https`, or HexOS answers with an "HTTPS required" page. |
| `https://SERVER-IP:43705` | Your proxy connects to HexOS over HTTPS. Send your server's `*.local.hexos.com` name as the TLS server name so the certificate matches. |

Replace `SERVER-IP` with your server's local IP address. Keep the HTTP upstream on your own network. More about both ports is in [Network ports](/troubleshooting/network-ports).

Your proxy also has to:

- Keep the `Origin` header your browser sends. A proxy that rewrites it makes sign-in fail.
- Pass the full path and query string through, including `/api/` and `/auth/custom-callback`.
- Pass cookies through.

Turn on compression in your proxy if it offers it. HexOS doesn't compress what it sends, so without it the first load over a phone connection takes noticeably longer. Later visits load faster, because the browser keeps the Command Deck's files.

To use VM consoles through your proxy, it also needs to forward WebSocket connections. See [VM console and remote access](/features/vms/remote-access#reverse-proxy-requirements).

## Notes for common setups

### Cloudflare proxy (orange cloud)

Your address can stay proxied through Cloudflare. A TXT record is never proxied, so HexOS can still read it.

This is different from HexOS Anywhere's own records, which must be **DNS only**. Those rules are in [Use your own domain with HexOS Anywhere](/features/remote-access/custom-domain#cloudflare), and they don't apply here.

### Wildcard DNS (Pangolin, Traefik and others)

Many proxies send every name on a domain to themselves with a `*` record. That's fine. Add the TXT record as its own record at the exact host the card shows. DNS answers a name that has its own record before it uses the `*` record, so HexOS finds the TXT record and your proxy keeps handling everything else.

Without its own record, the lookup for `_hexos-dashboard` falls through to the `*` record, finds no TXT record and the status stays **Pending**.

### A sign-in page in front of your proxy

Some proxies add their own sign-in, such as Pangolin's authentication, Cloudflare Access or Authelia. While it's on, the proxy can answer the Command Deck's own requests, such as `/api/connection`, with its sign-in page. The Command Deck then shows **Can't reach HexOS Cloud right now** even though everything is running.

The simplest fix is to turn the proxy's sign-in off for this address. The Command Deck still asks for your HexOS account, so it stays protected. If you keep the proxy's sign-in, it has to let every request from a signed-in browser through, including `/api/` and the return from HexOS to `/auth/custom-callback`.

### A domain you also use for HexOS Anywhere

If you have verified a domain for HexOS Anywhere, a name on that domain is served through the HexOS relay, not your proxy. That name needs HexOS Anywhere. To use your own proxy without Anywhere, use a name on a different domain.

## If signing in at your address fails

| You see | What to do |
| --- | --- |
| HexOS sign-in isn't turned on for this address | The address isn't saved and **Verified** for this server. Check the **Custom domain** tab at deck.hexos.com. Also check that you typed the address exactly as your browser shows it, including `https://` and any port. If the address is on a domain you verified for HexOS Anywhere, see [A domain you also use for HexOS Anywhere](#a-domain-you-also-use-for-hexos-anywhere). |
| HexOS sign-in didn't go through. Try again in a moment. | Your server couldn't reach HexOS, or the sign-in took too long. Wait a moment, then reload the page. |
| **Can't reach HexOS Cloud right now** on your address | Your proxy's own sign-in is answering the Command Deck's requests. See [A sign-in page in front of your proxy](#a-sign-in-page-in-front-of-your-proxy). |
| An "HTTPS required" page | Your proxy connects to port `43706` without sending `X-Forwarded-Proto: https`. Add the header. |
| The status went back to **Pending** | HexOS couldn't find a matching TXT record when it checked again. Make sure the record is still there and its value hasn't changed, then click **Re-check**. |
| You land on your proxy's own sign-in page after the HexOS sign-in | See [A sign-in page in front of your proxy](#a-sign-in-page-in-front-of-your-proxy). |

If none of these match, ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz). Mention which proxy you use and which upstream port it points at.

[Back to HexOS Anywhere](/features/remote-access)

> **Contribute:** To help improve HexOS documentation, [join the Docs channel on Discord](https://discord.com/invite/DjEp3WRHKz). Send feedback, suggestions or contribute a guide.
{.is-contribute}
