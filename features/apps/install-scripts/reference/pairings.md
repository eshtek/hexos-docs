---
title: App Pairings
description: How cross-app links are declared on a hook, derived from its conditions, and surfaced during install
published: true
date: 2026-08-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-25T00:00:00.000Z
---

# App Pairings

A **pairing** is a cross-app link. App A declares a hook whose conditions reference app B, and HexOS surfaces that hook so a user installing — or already running — either app can connect the two with one checkbox.

Plex declares `connect-seer`, which references `seerr`. That single declaration produces:

- a row in the install dialog when the user installs **Plex** ("Connect to Seer")
- a row in the install dialog when the user installs **Seerr** ("Connect to Plex", running Plex's hook)
- a button on the Plex app card once both are installed
- a suggestion on Plex's card ("Also pairs with Seerr") while Seerr is missing

Nothing in the catalog declares the pairing itself. It is derived from the hook's conditions.

## One declaration: the hook

In V6 there is **one** declaration — a hook. Its `events` decide *when* it runs; a hook whose events include `userAction` is user-triggerable, and its `surfaces` decide *where* the user can fire it. **An action is a hook with a `userAction` event.**

`events` is optional and defaults to `["userAction"]`, so a pairing hook — a verb the user fires, never part of the install ceremony — writes no `events` at all.

> V5 scripts remain fully supported. Pairings are a V6 feature: set `"version": 6` on the dictionary. A V5 dictionary produces no pairings.
{.is-info}

See the [Hooks Reference](/features/apps/install-scripts/reference/hooks) for the full hook declaration.

## How pairings are derived

A pairing exists when both of these are true of a hook:

1. Its **conditions reference another app** — some condition carries an `app` field whose value is not the declaring app's own id.
2. Its **effective surfaces include `installPicker`**.

Condition types that carry an `app` field are `appInstalled`, `appRunning`, and `appVersion`. Every distinct partner id across the hook's conditions is collected once; the declaring app's own id is always excluded.

```json
{
  "id": "connect-seer",
  "title": "Connect to Seer",
  "description": "Link this Plex server to Seer so requests and discovery use your library.",
  "kind": "connect",
  "conditions": [
    { "role": "visibility", "type": "appInstalled", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "plex" }
  ],
  "rerun": "converge",
  "script": "plex/connect_seer.ts",
  "entrypoint": "run",
  "timeout": 300,
  "retries": 0
}
```

Declared in `plex.json`, this hook references one partner: `seerr`. The `plex` condition is the declaring app itself and is ignored for pairing purposes.

### Surfaces are derived unless you narrow them

`surfaces` is optional. When it is absent, where a user-triggerable hook shows up is derived from the rest of the declaration:

| Declaration | Effective surfaces |
|---|---|
| Has a `target` (file hook) | `["fileBrowser"]` |
| Conditions reference a partner app | `["installPicker", "card", "widget"]` |
| Neither | `["card", "widget"]` |

So a partner-referencing hook lands in the install picker automatically — you write nothing. Conversely, narrowing a hook to `"surfaces": ["card"]` removes it from the picker, and **it stops producing pairings entirely**: no install row, no incoming row on the partner, no "Also pairs with" suggestion.

### Derivation is read-only

Pairing discovery parses dictionaries; it never executes catalog code. Conditions are machine-legible, which is the whole reason the link can be computed before either app is installed.

Discovery is also tolerant. Unparseable JSON, a missing `hooks` array, an unsupported dictionary version, or an individually invalid hook yields no pairings rather than an error — one bad dictionary never breaks the catalog's discovery.

The index covers every non-deprecated catalog app's newest dictionary, so a newly merged pairing appears once the catalog syncs.

To inspect what HexOS derived for an app:

```
GET /api/apps/{appId}/pairings
```

## Outgoing and incoming

Every pairing names the app whose hook runs (`runsOnAppId`) and the partner apps it links with. Which of those is the app being installed decides the direction.

| | Declaring app | Partner shown to the user | `runsOnAppId` |
|---|---|---|---|
| **Outgoing** | the app being installed | the referenced apps | the app being installed |
| **Incoming** | another catalog app | the declaring app | the declaring app |

Installing **Plex** produces an outgoing pairing: Plex's own `connect-seer` names `seerr` as the partner, and the hook runs on Plex.

Installing **Seerr** produces an incoming pairing from the same declaration: Plex is the partner, and the hook still runs on Plex. If Plex's hook referenced several partners, the Seerr install shows only Plex — another app's partners are none of this install's business.

The resulting pairing:

```json
{
  "partners": [{ "appId": "seerr", "name": "Seerr", "icon": "seerr.png" }],
  "runsOnAppId": "plex",
  "hookId": "connect-seer",
  "title": "Connect to Seer",
  "description": "Link this Plex server to Seer so requests and discovery use your library.",
  "kind": "connect"
}
```

Because both directions come from one declaration, only one app in a pair needs to declare the hook. Jellyfin declares `check-fladder`; Fladder's dictionary says nothing about Jellyfin, and a Fladder install still offers the link.

## The install payload picker

When an app has pairings, the install dialog shows a **Customize Install (N options available)** button. The default install path never forces the menu open.

Expanded, the picker has two sections:

- **Link with your installed apps** — the partner is already installed. Rows read *Connect to {partner}* and are **checked by default**.
- **Also pairs well with** — the partner is not installed. Rows read *Install and Connect to {partner}* and are **unchecked by default**.

Collapsed, the dialog still names the links that will fire: *Will also connect to Seerr, Tautulli*. Installed partners default to on, so consent is witnessed even on a one-click install.

**One row per partner, one run per hook.** A hook naming several partners shows a row each; picking two of them installs both and runs the hook once, because the hook takes no partner argument.

Selections ride the install request and are stamped into the install task as its plan. Limits: at most **6 links** per install and **6 partners** per link.

## Consent gating with `requiresHooks`

`requiresHooks` lists same-app hook ids whose collected inputs this hook inherits — typically a preconfigure hook that already asked for credentials. At most 8 ids.

```json
{
  "id": "connect-seer",
  "title": "Connect to Seer",
  "description": "Link this Jellyfin server to Seer so requests and discovery use your library. Uses the admin sign-in from Jellyfin preconfiguration - no extra passwords.",
  "kind": "connect",
  "requiresHooks": ["configure-jellyfin"],
  "conditions": [
    { "role": "visibility", "type": "appInstalled", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "jellyfin" }
  ],
  "rerun": "converge",
  "script": "jellyfin/connect_seer.ts",
  "entrypoint": "run",
  "timeout": 300,
  "retries": 0
}
```

`configure-jellyfin` is an `onAfterInstall` hook with a `userOptional` consent checkbox, and it collects the admin username and password. That makes the pairing row depend on the checkbox:

- **Consent on** — the row notes *Set up automatically with the credentials you enter for "{hook}"*. The credentials are typed once, in the install dialog.
- **Consent off** — the row is disabled, reads unchecked, and shows *Preconfiguration required — turn on "{hook}" above to enable this connection*. The link is excluded from the install request: a connect script whose credentials were never collected can only fail.

A consent hook the user has not touched counts as on unless its declaration sets `"default": false`.

At run time the orchestrator resolves the completed hook tasks under this install and hands the connect hook their task ids by reference, so matching input keys never prompt a second time. Declaring `requiresHooks` is what makes that carry-over happen — without it, the connect hook's own `inputs` are collected again.

## What the user watches after install

Selected links run as child tasks of the install, under **App customizations** in the install checklist. The order is fixed:

1. The app's own lifecycle hooks settle first — connect scripts read what preconfigure hooks write.
2. For each link, in turn:
   - Any partner marked for installation is installed first, as an ordinary standard install, and **its** lifecycle hooks settle before the link continues.
   - The declared hook runs once, as a single hook task.

Links run one at a time; two connect scripts poking the same app concurrently is exactly the race this ordering avoids. If the partner's containers are still starting, HexOS retries starting the hook for about three minutes before giving up on that link.

Every step reaches an honest terminal state, and failure is contained: a link that fails records its failure on its own child task and the rest of the plan continues. The install's success is never revoked by a link. When a link completes, the user gets a notification per partner it actually linked.

Because a partner may be installed first, the checklist can show an install the user did not start from the app store — that is the *Install and Connect to {partner}* row doing its job.

## "Also pairs with" on an installed app

An installed app's card lists its **outgoing** pairings whose partner is not installed yet, one row per partner, each with an **Install** button that opens the partner's app page.

No pre-selection is needed. From the partner's side the same pairing is incoming with the origin app already installed, so the partner's own install picker puts it in *Link with your installed apps* and checks it by default.

Only install-picker-surfaced hooks appear here, so a hook narrowed to `"surfaces": ["card"]` never generates a suggestion.

## Author guidance

**Declare the pairing on the app that does the work.** The hook runs on its declaring app, so put it in the dictionary of the app whose API you are calling. One declaration serves both directions.

**Give each partner condition a role.** The usual shape is a `visibility` `appInstalled` condition on the partner (hide the card button until the partner exists) plus `availability` `appRunning` conditions on the partner and on the declaring app (a running app is required to run against).

**Never put a lifecycle event on a pairing hook.** A hook that declares both a lifecycle trigger and a cross-app condition is rejected at parse time and dropped, with the error *cross-app connects fire from the install picker automatically — remove the lifecycle trigger*. Cross-app connects are user verbs. Leave `events` off.

**Multi-partner hooks run once.** A hook naming `seerr` and `tautulli` produces one pairing carrying both partners, one picker row each, and a single run for whatever the user picked. Only write one when a single script run genuinely handles any subset of those partners — the script must tolerate a partner that is not there. If each partner needs its own script run, declare a hook per partner, as Plex does with `connect-seer` and `connect-tautulli`.

**Watch condition semantics on the card.** Every condition must pass: a failed `visibility` condition hides the hook, a failed `availability` condition disables it with a reason. So a hook carrying `appInstalled` visibility conditions for two partners is hidden on the app card until both are installed. Pairings are derived regardless of what is installed, so the picker still offers the link either way. When in doubt, one hook per partner.

**Only install-picker-surfaced hooks produce pairings.** A card-only verb, a file-browser verb (`target`), or any hook you narrow with `surfaces` away from `installPicker` is invisible to pairing discovery, no matter what its conditions reference.

**Use catalog app ids.** The `app` value in a condition is the partner's catalog app id — `seerr`, `tautulli`, `jellystat` — not its display name. A partner id that does not match any catalog app still produces a pairing, but it is labelled with the raw id and can never be installed from the picker.

**Set `rerun` honestly.** `rerun` is required on every user-triggerable hook, and a connect hook is re-runnable by definition — a user who reinstalls a partner will fire it again. `converge` suits most connect hooks; `idempotent` suits pure checks like `check-fladder`.
