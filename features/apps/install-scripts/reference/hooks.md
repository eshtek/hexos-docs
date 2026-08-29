---
title: Hooks Reference
description: How hooks are declared, when they run, and where users can fire them
published: true
date: 2026-08-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-09T20:03:00.318Z
---

# Hooks Reference

A hook is a TypeScript function the platform runs on behalf of an app: health checks, service configuration, OAuth login, library creation, cross-app links, file conversion. Each hook is declared in the install script's `hooks` array, and each declaration names a script, an entrypoint, and the circumstances under which it runs.

There is **one** declaration type. A hook's `events` decide **when** it runs. A hook whose events include `userAction` can be fired by a person, and its `surfaces` decide **where** they can fire it.

> A card button, a file-browser verb, an install-picker pairing, and a post-install ceremony are all the same declaration shape — they differ only in their `events`, `surfaces` and `conditions`. Users see the user-triggerable ones as the app's **Actions**.
{.is-info}

## Dictionary dialects

| | V5 | V6 |
|---|---|---|
| `version` | `5` | `6` |
| Trigger field | `event` (single lifecycle name) | `events` (array) |
| User-triggerable hooks | no | yes (`userAction`) |
| Version gating | `condition: { fromVersionRange, toVersionRange }` | on the trigger entry: `{ event, from, to }` |
| Conditions, surfaces, file targets, widget buttons | — | yes |

The two dialects never mix inside one dictionary — the `version` field selects which one the parser reads. **V5 scripts remain fully supported** and parse unchanged; see [V5 lifecycle hooks](#v5-lifecycle-hooks).

---

# V6 melded declarations

Set `"version": 6` and add a `hooks` array. Every entry is a `HookDeclarationV6`.

## The declaration

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

That declaration has no `events`, so it is a user action — a button on the Plex card and a pairing offered in the install picker.

### Declaration properties

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique within the dictionary. Load-bearing: consent state, task history, rerun keys, and widget button references all key off it. |
| `title` | string | Yes | User-facing name. Button label on a surface, checkbox label for consent, and the progress label when `description` is absent. |
| `description` | string | No | One line of explanation. Also the running-task progress label. |
| `kind` | `connect` \| `maintain` \| `custom` | No | Descriptive taxonomy for icons and grouping. Nothing in the runtime branches on it. |
| `events` | array | No | When the hook fires. Absent means `["userAction"]`. See [events](#events). |
| `optional` | boolean | No | Lifecycle firings only: skip on failure or input timeout instead of blocking the ceremony. |
| `userOptional` | object | No | Install-time consent checkbox. Requires an install event. See [userOptional](#install-time-consent-with-useroptional). |
| `conditions` | array | No | Visibility and availability gates. See [conditions](#conditions). |
| `surfaces` | array | No | Narrows where a user-triggerable hook appears. Absent means derived. See [surfaces](#surfaces). |
| `inputs` | array | No | OAuth or question inputs collected before the hook runs. Same shape as V5 — see [Hook inputs](#hook-inputs). |
| `requiresHooks` | string[] | No | Up to 8 same-app hook ids whose collected inputs this hook inherits. See [requiresHooks](#inheriting-inputs-with-requireshooks). |
| `target` | object | No | File selection contract. User-fired only. See [target](#file-targets). |
| `rerun` | `idempotent` \| `converge` \| `refuse` | Iff user-triggerable | What a second press does. See [rerun](#rerun-policy). |
| `script` | string | One of | Path to a `.ts` file in the catalog repo. |
| `scriptContent` | string | One of | Inline TypeScript embedded in the JSON. |
| `entrypoint` | string | Yes | Name of the exported async function to call. |
| `timeout` | number | No | Maximum execution time in seconds (default: 300). |
| `retries` | number | No | Automatic retry attempts on failure (default: 0). |

Exactly one of `script` or `scriptContent` — never both, never neither.

> A V6 entry must not carry V5's singular `event`. It is not silently ignored: the parser rejects the declaration with *"V6 melded entries use `events` (array) — found V5-style singular `event`"*, because a stripped `event` would turn a lifecycle hook into a card button. Other unrecognized keys (for example a leftover V5 `condition` object) are dropped silently, so move version gates onto the trigger entry rather than leaving them behind.
{.is-warning}

## Events

`events` is an array of trigger entries. When absent it defaults to `["userAction"]`, so a plain verb writes nothing.

| Entry | Meaning |
|---|---|
| `"userAction"` | A person can fire this hook from a surface. |
| `"onBeforeInstall"` | Before `app.create` is called on TrueNAS. |
| `"onAfterInstall"` | After `app.create` completes successfully. |
| `"onBeforeUpgrade"` | Before `app.upgrade` is called on TrueNAS. |
| `"onAfterUpgrade"` | After `app.upgrade` completes successfully. |
| `{ "event": ..., "from": ..., "to": ... }` | A lifecycle event with per-trigger configuration. |

A hook can carry several entries. `["onAfterInstall", "userAction"]` is a post-install ceremony that the user can also re-run later from the app card.

### Version-gated upgrade triggers

The object form gates an upgrade trigger on the version transition:

```json
{
  "id": "migrate-db-v2",
  "title": "Migrate database",
  "events": [
    { "event": "onBeforeUpgrade", "from": "< 2.0.0", "to": ">= 2.0.0" }
  ],
  "script": "myapp/migrate.ts",
  "entrypoint": "migrateConfig"
}
```

- `from` and `to` are [semver ranges](https://www.npmjs.com/package/semver#ranges). `from` matches the version being departed; `to` matches the version being installed. Both must match when both are given.
- `from`/`to` are legal on `onBeforeUpgrade` and `onAfterUpgrade` only — on an install event the declaration is rejected.
- The object form itself is legal for any lifecycle event, so future per-trigger configuration lands without a dialect change.
- A version-gated trigger cannot share a declaration with `"userAction"`: a one-time migration must not double as a forever-button. Split the manual escape hatch into its own declaration gated by an `appVersion` availability condition.

### Trigger rules

| Rule | Why |
|---|---|
| No duplicate entries for the same event | One firing per event per declaration. |
| `onBeforeInstall` and `onAfterInstall` cannot share a declaration | One ceremony keys its pre-created tasks by hook id; both halves would collide. Split into two declarations with distinct ids. |
| `onBeforeUpgrade` and `onAfterUpgrade` cannot share a declaration | Same reason. |
| An install event **plus** an upgrade event is fine | Two different ceremonies, no collision. |
| A hook with a lifecycle event may not carry conditions referencing another app | Cross-app connects fire from the install picker automatically; drop the lifecycle trigger. |
| An upgrade-triggered hook may not carry an `appVersion` condition on its own app | That condition evaluates the *post*-upgrade version and would never fire. Put the gate on the trigger entry. |

Unrecognized trigger entries are dropped individually and reported, so a dictionary written against a newer vocabulary still runs its known firings. A declaration whose entries **all** drop is dropped entirely — a typo'd event name never silently becomes a card button.

## Conditions

Every condition carries a `role` that decides what failing it costs:

| `role` | Failing means |
|---|---|
| `visibility` | The hook is hidden — it does not appear on any surface, and it cannot be run. |
| `availability` | The hook is shown but disabled, with a reason the surface renders. |

Availability is always re-checked server-side when the hook is invoked; the state a surface renders is advisory.

### Condition kinds

| `type` | Fields | Passes when |
|---|---|---|
| `appInstalled` | `app` | The named app is installed. |
| `appRunning` | `app` | The named app is running. |
| `appVersion` | `app`, `range` | The named app's version satisfies the semver `range`. |
| `capabilityPresent` | `capability` | Reserved for the capability registry. |
| `script` | `script`, `entrypoint?` | A local-side script predicate returns true. |

```json
"conditions": [
  { "role": "visibility", "type": "appInstalled", "app": "jellystat" },
  { "role": "availability", "type": "appRunning", "app": "jellystat" },
  { "role": "availability", "type": "appRunning", "app": "jellyfin" }
]
```

Conditions are also how cross-app links are discovered: a user-triggerable hook whose conditions name an app other than its own becomes an install-time pairing for both apps, derived from the declaration alone — no catalog code runs to build that list — see [App Pairings](/features/apps/install-scripts/reference/pairings).

> The evaluator implements `appInstalled` and `appRunning`. Every other kind — `appVersion`, `capabilityPresent`, `script`, and any `type` a given platform version does not recognize — **fails closed**: the condition evaluates false, so a `visibility` one hides the hook and an `availability` one permanently disables it. Gate on `appInstalled` / `appRunning` for hooks you want users to be able to run.
{.is-warning}

## Surfaces

`surfaces` applies to user-triggerable hooks only; a lifecycle-only hook never becomes a verb. For what each surface renders and how it behaves, see the [Surfaces Reference](/features/apps/install-scripts/reference/surfaces).

| Surface | Where it appears |
|---|---|
| `card` | A button on the app's card in HexOS. |
| `fileBrowser` | A verb on a file selection in the file browser. Requires `target`. |
| `installPicker` | A pairing row offered while installing either app. Selected rows run as child tasks of the install once the app's own lifecycle hooks settle. |
| `widget` | A button on a dashboard widget that lists this hook's id in its `buttons` array (up to 4 per widget). The button renders only if the hook allows the widget surface. |

**Omitting `surfaces` is the normal case.** The platform derives the list:

| Declaration | Derived surfaces |
|---|---|
| Has a `target` | `["fileBrowser"]` |
| Conditions reference another app | `["installPicker", "card", "widget"]` |
| Anything else | `["card", "widget"]` |

Declaring `surfaces` replaces the derivation entirely — it is a narrowing tool. `"surfaces": ["card"]` on a pairing-target-referencing hook keeps it off the install picker, and therefore out of pairing discovery. `"surfaces": ["installPicker"]` offers a link at install time and nowhere else.

Because `widget` rides the defaults, a widget can reference an existing card verb by id without any change to the hook:

```json
"widgetsSchema": 2,
"widgets": [
  {
    "id": "conversions",
    "title": "Conversions",
    "buttons": ["convert-to-mp4"],
    "script": "fileflows/widget_conversions.ts",
    "entrypoint": "run"
  }
]
```

A button referencing an unknown hook id is skipped and logged; a button whose hook fails its visibility conditions is omitted, and one that fails availability renders greyed with its reason. See the [Dashboard Widgets Reference](/features/apps/install-scripts/reference/widgets) for the widget declaration itself.

## Inheriting inputs with requiresHooks

`requiresHooks` lists up to 8 **same-app** hook ids this hook depends on. It does two things:

1. **Consent gating.** In the install dialog, a pairing row for this hook is disabled while any listed hook's consent checkbox is off — a connect verb that needs credentials the user declined can never work.
2. **Input carry-over.** When the hook runs as part of an install, the orchestrator hands it the completed hooks' collected inputs, matched **by input id**, so the user enters credentials once.

```json
{
  "id": "connect-jellystat",
  "title": "Connect to Jellystat",
  "kind": "connect",
  "requiresHooks": ["configure-jellyfin"],
  "inputs": [
    { "type": "question", "id": "admin_username",
      "question": { "question": "Jellyfin admin username", "type": "text", "key": "admin_username", "required": true } },
    { "type": "question", "id": "admin_password",
      "question": { "question": "Jellyfin admin password", "type": "password", "key": "admin_password", "required": true } }
  ],
  "rerun": "converge",
  "script": "jellyfin/connect_jellystat.ts",
  "entrypoint": "run"
}
```

Declare the inputs on **both** hooks using the same ids — the donor declares them to collect them, this hook declares them so it can prompt when nothing was donated.

Carry-over rules:

- Only **completed** hook tasks belonging to the **same app** can donate.
- Values are read locally on the box and passed in memory; only task-id references travel over RPC, and inherited values are never persisted onto the receiving task.
- Coverage is all-or-nothing per run: if any **required** declared input is still uncovered, the hook prompts for its inputs as usual. Uncovered optional inputs do not block.
- Fired manually later (from the card, with no install to inherit from), the hook simply prompts.

## Install-time consent with userOptional

A hook with `userOptional` renders a consent checkbox in the install dialog. The user decides whether the ceremony runs.

```json
{
  "id": "configure-plex",
  "title": "Pre-configure Plex",
  "description": "Setting up Plex server",
  "events": ["onAfterInstall"],
  "optional": true,
  "userOptional": {
    "description": "Sign in to your Plex account to automatically claim your server, set preferences, and create media libraries. By enabling this, you agree that HexOS will accept the Plex Terms of Service on your behalf.",
    "default": true,
    "link": {
      "url": "https://www.plex.tv/about/privacy-legal/plex-terms-of-service/",
      "label": "Plex Terms of Service"
    }
  },
  "inputs": [ ... ],
  "script": "plex/plex_hook.ts",
  "entrypoint": "afterInstall"
}
```

| Property | Type | Required | Description |
|---|---|---|---|
| `description` | string | No | The consent body, in its own register (a terms-acceptance clause, not a feature blurb). Falls back to the hook's `description` when absent. |
| `default` | boolean | No | Whether the checkbox starts on. Defaults to `true`. |
| `link.url` | string | Yes (if `link`) | Fully qualified URL; must pass URL validation. |
| `link.label` | string | Yes (if `link`) | Clickable text. |

- The checkbox **label is the hook's `title`** — there is no `label` field in V6.
- `userOptional` requires an install event (`onBeforeInstall` or `onAfterInstall`); the checkbox renders nowhere else.
- The link opens in a new tab, rendered inline at the end of the description. Use one whenever the hook accepts terms, agrees to a EULA, or acts under a third party's policy on the user's behalf.
- Consent is collected at install time only. Upgrade ceremonies run non-consent hooks and skip every `userOptional` hook — in both dialects.
- `optional` is a different field: it governs what happens when the hook *fails*, and it requires a lifecycle trigger (user firings are always terminal).

## Rerun policy

`rerun` is **required on every user-triggerable hook** and **forbidden on lifecycle-only hooks**. There is one spelling, so no declaration carries a value that means nothing.

| Value | Meaning |
|---|---|
| `idempotent` | Running it again is harmless. Never blocked. |
| `converge` | Running it again re-drives the same end state — the connect case, which must be re-runnable after a half-failure. Never blocked. |
| `refuse` | Blocked while a **completed** run already exists for the same app + hook + file selection. |

`refuse` protects a successful one-time setup from being executed twice. It counts completed runs only: a failed or dismissed run never blocks a retry, so a user can always recover from a failure. A blocked attempt returns `APP_HOOK_RERUN_REFUSED`.

Independently of `rerun`, the same app + hook + file selection cannot run twice concurrently — a press while a run is in flight returns `APP_HOOK_ALREADY_RUNNING`. Different file selections of the same hook run in parallel.

## Last run status

Each hook tracks whether its last completed run succeeded or failed. HexOS uses this to decide the button state on the app card:

- **Run** — the hook has never run, or its last run failed.
- **Run again** — the hook previously succeeded and has `rerun` set to `converge`.
- **Connected** (check icon, no button) — the hook has `rerun` set to `refuse` and its last run succeeded, so re-running is blocked.

## File targets

A `target` makes the hook act on user-selected files, and surfaces it in the file browser instead of on the app card.

```json
{
  "id": "convert-to-mp4",
  "title": "Convert to MP4",
  "description": "Convert this video to an MP4 file using FileFlows. The converted copy appears next to the original; the original file is not changed.",
  "kind": "custom",
  "target": {
    "type": "files",
    "accepts": [".mkv", ".avi", ".mov", ".webm"],
    "maxFiles": 5,
    "requiresTargetMount": true
  },
  "conditions": [
    { "role": "availability", "type": "appRunning", "app": "fileflows" }
  ],
  "rerun": "converge",
  "script": "fileflows/convert_to_mp4.ts",
  "entrypoint": "run",
  "timeout": 3600
}
```

| Property | Type | Required | Description |
|---|---|---|---|
| `type` | `"files"` | Yes | The only target kind. |
| `accepts` | string[] | Yes | At least one dot-prefixed extension (`".mkv"`). Matched case-insensitively. |
| `maxFiles` | number | No | Maximum files per invocation. Default: unlimited. |
| `requiresTargetMount` | boolean | No | Default `true`. |

**How a selection is matched.** The verb is offered only when **every** selected file's extension is in `accepts` — a mixed selection with one unsupported file hides the verb rather than silently skipping that file. At run time the platform re-validates authoritatively: each path must be under an allowed root, its extension must be in `accepts`, it must exist and be a regular file, and the count must not exceed `maxFiles`.

**Mounts.** With `requiresTargetMount: true` (the default), a file the target app cannot see through its own mounts makes the hook unavailable, and the engine pre-resolves each file's path inside the app's container. The file browser knows the app's mounted roots, so files outside them are disabled with a real reason. Set it to `false` for watch-folder style hooks where the script delivers the files itself — mounts then do not gate availability, and `containerPath` may be `null`.

**In the script**, the selection arrives pre-resolved on `ctx.target`:

```typescript
export async function run(ctx: HookContext) {
  for (const file of ctx.target?.files ?? []) {
    ctx.log(`${file.name} (${file.extension}) at ${file.containerPath ?? file.path}`);
  }
}
```

A file-targeted hook is user-fired only — adding a lifecycle event is rejected, because a lifecycle firing has no file selection.

## What the schema rejects

Every rule below fails the individual declaration (with a reported error) rather than the whole dictionary.

| Rejected | Message |
|---|---|
| V5's singular `event` in a V6 entry | `V6 melded entries use 'events' (array)` |
| Both or neither of `script` / `scriptContent` | `exactly one of 'script' or 'scriptContent'` |
| `optional` with no lifecycle trigger | `'optional' requires a lifecycle trigger` |
| `userOptional` with no install trigger | `'userOptional' requires an install trigger` |
| `target` with a lifecycle trigger | `file-targeted hooks are user-fired only` |
| Missing `rerun` on a user-triggerable hook | `'rerun' is required on user-triggerable hooks` |
| `rerun` on a lifecycle-only hook | `'rerun' applies to user firings only` |
| `from`/`to` on a non-upgrade event | `from/to gate upgrade transitions` |
| A version-gated trigger alongside `"userAction"` | `version-gated triggers cannot share a declaration with "userAction"` |
| Duplicate entries for one event | `duplicate trigger entries` |
| Both halves of one ceremony in one declaration | `cannot share a declaration` |
| Self `appVersion` condition on an upgrade hook | `transition gates belong on the trigger entry` |
| Pairing-target-referencing conditions plus a lifecycle trigger | `cross-app connects fire from the install picker automatically` |
| Duplicate `id` within the dictionary | `Duplicate hook id` |

## The four canonical shapes

**Install ceremony with consent** — runs during install, user can decline:

```json
{
  "id": "configure-jellyfin",
  "title": "Pre-configure Jellyfin",
  "description": "Setting up Jellyfin",
  "events": ["onAfterInstall"],
  "optional": false,
  "userOptional": { "default": true, "description": "Automatically set up your server, apply preferences, and create media libraries." },
  "inputs": [ ... ],
  "script": "jellyfin/jellyfin_hook.ts",
  "entrypoint": "afterInstall",
  "timeout": 300
}
```

**Cross-app connect** — no `events`, so it is a user action; the pairing target reference routes it to the install picker and the card:

```json
{
  "id": "connect-seer",
  "title": "Connect to Seer",
  "kind": "connect",
  "conditions": [
    { "role": "visibility", "type": "appInstalled", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "seerr" }
  ],
  "rerun": "converge",
  "script": "plex/connect_seer.ts",
  "entrypoint": "run"
}
```

**File verb** — a `target` routes it to the file browser:

```json
{
  "id": "convert-to-mp4",
  "title": "Convert to MP4",
  "target": { "type": "files", "accepts": [".mkv"], "maxFiles": 5 },
  "conditions": [{ "role": "availability", "type": "appRunning", "app": "fileflows" }],
  "rerun": "converge",
  "script": "fileflows/convert_to_mp4.ts",
  "entrypoint": "run"
}
```

**Version-gated migration** — lifecycle only, no `rerun`, never a button:

```json
{
  "id": "migrate-db-v2",
  "title": "Migrate database",
  "events": [{ "event": "onBeforeUpgrade", "from": "< 2.0.0" }],
  "script": "myapp/migrate.ts",
  "entrypoint": "migrateConfig"
}
```

## Migrating a V5 script to V6

Everything V6 adds is additive — the execution contract is field for field identical.

1. `"version": 5` → `"version": 6`.
2. `"event": "onAfterInstall"` → `"events": ["onAfterInstall"]`. Leaving the singular `event` behind is a parse error, not a silent no-op.
3. Add `title` to every hook — it is required, and it is what surfaces render.
4. `"condition": { "fromVersionRange": "< 2.0.0", "toVersionRange": ">= 2.0.0" }` → `"events": [{ "event": "onBeforeUpgrade", "from": "< 2.0.0", "to": ">= 2.0.0" }]`. A leftover `condition` key is dropped silently, so the gate must move.
5. `userOptional.label` → the hook's `title`; delete `label`. Keep `description`, `default`, and `link` as they are.
6. `script`, `scriptContent`, `entrypoint`, `timeout`, `retries`, `optional`, `inputs`, and `description` carry over unchanged.
7. Adopt the new fields only where you want the behavior: `events: ["userAction"]` (or no `events` at all) plus `rerun` to make a hook user-triggerable, `conditions` to gate it, `surfaces` to narrow it, `target` to make it act on files, `requiresHooks` to share collected inputs, `kind` for grouping.

Existing hook scripts need no changes.

---

# V5 lifecycle hooks

Lifecycle hooks are a **V5** feature. To use them, set `"version": 5` in your install script and add a `hooks` array. V5 dictionaries parse unchanged and remain fully supported. V5 hooks are lifecycle-only: no user-triggerable firings, no condition predicates, no surfaces, and no file targets. V5's `condition` field is a version gate for upgrades, not a predicate — see [Version conditions](#version-conditions).

## Hook events

| Event | When it fires |
|---|---|
| `onBeforeInstall` | Before `app.create` is called on TrueNAS |
| `onAfterInstall` | After `app.create` completes successfully |
| `onBeforeUpgrade` | Before `app.upgrade` is called on TrueNAS |
| `onAfterUpgrade` | After `app.upgrade` completes successfully |

## Hook declaration

Each entry in the `hooks` array is a hook declaration:

```json
{
  "id": "setup-myapp",
  "event": "onAfterInstall",
  "script": "myapp/myapp_hook.ts",
  "entrypoint": "afterInstall",
  "timeout": 120,
  "description": "Setting up MyApp",
  "optional": false,
  "retries": 1
}
```

### Declaration properties

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier within the script |
| `event` | string | Yes | One of the [hook events](#hook-events) above |
| `script` | string | No | Path to a `.ts` file in the catalog repo (e.g., `"myapp/myapp_hook.ts"`) |
| `scriptContent` | string | No | Inline TypeScript code embedded directly in the JSON |
| `entrypoint` | string | Yes | Name of the exported async function to call |
| `timeout` | number | No | Maximum execution time in seconds (default: 300) |
| `description` | string | No | Human-readable label shown in the HexOS activity center |
| `optional` | boolean | No | If `true`, hook failure is non-blocking — the app install continues |
| `retries` | number | No | Number of automatic retry attempts on failure (default: 0) |
| `condition` | object | No | Version-based guards for upgrade hooks (see [Conditions](#version-conditions)) |
| `inputs` | array | No | OAuth or question inputs to collect from the user before execution (see [Inputs](#hook-inputs)) |
| `userOptional` | object | No | Allows the user to opt out of this hook during install (see [User Optional](#user-optional-hooks)) |

## Version conditions

Hooks can be restricted to specific version transitions during upgrades:

```json
{
  "id": "migrate-config",
  "event": "onBeforeUpgrade",
  "condition": {
    "fromVersionRange": "< 2.0.0",
    "toVersionRange": ">= 2.0.0"
  },
  "script": "myapp/migrate.ts",
  "entrypoint": "migrateConfig",
  "description": "Migrating config for v2"
}
```

Both `fromVersionRange` and `toVersionRange` use [semver range syntax](https://www.npmjs.com/package/semver#ranges). The hook only fires if both conditions match (when both are specified).

## User optional hooks

Hooks with `userOptional` show a toggle switch in the install dialog, letting the user decide whether to run the hook:

```json
{
  "id": "auto-setup",
  "event": "onAfterInstall",
  "userOptional": {
    "label": "Automatically configure MyApp",
    "description": "Signs in and sets up your libraries. You can do this manually later.",
    "default": true
  }
}
```

### userOptional properties

| Property | Type | Required | Description |
|---|---|---|---|
| `label` | string | Yes | Short label displayed next to the toggle switch |
| `description` | string | No | Explanatory text shown below the toggle |
| `default` | boolean | No | Whether the toggle is on by default (default: `true`) |
| `link` | object | No | A link rendered inline at the end of the description (see below) |

### Adding a link

Use the `link` property to display a clickable link after the description text. This is useful when your hook performs an action that requires the user to acknowledge external terms of service or documentation.

```json
{
  "id": "configure-plex",
  "event": "onAfterInstall",
  "userOptional": {
    "label": "Pre-configure Plex",
    "description": "Sign in to your Plex account to automatically claim your server, set preferences, and create media libraries. By enabling this, you agree that HexOS will accept the Plex Terms of Service on your behalf.",
    "default": true,
    "link": {
      "url": "https://www.plex.tv/about/privacy-legal/plex-terms-of-service/",
      "label": "Plex Terms of Service"
    }
  }
}
```

| Property | Type | Required | Description |
|---|---|---|---|
| `link.url` | string | Yes | Fully qualified URL (must pass URL validation) |
| `link.label` | string | Yes | Clickable text displayed as the link |

The link opens in a new tab. It renders inline at the end of the description paragraph, styled as a branded underlined link.

**When to use a link:** If your hook accepts terms, agrees to a EULA, or performs an action governed by a third-party service's policies on behalf of the user, include a `link` to the relevant terms so the user can review them before opting in.

During upgrades, `userOptional` hooks are automatically excluded — only non-optional hooks run.

---

# The script contract

Everything below applies to both dialects. A hook script is the same file whether its declaration fires it from a ceremony or from a button.

## Script vs scriptContent

Every hook must have exactly one of `script` or `scriptContent` — never both, never neither. The schema enforces this with a validation rule.

- **`script`** — references an external `.ts` file in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repo. Used by first-party curated hooks.
- **`scriptContent`** — embeds the TypeScript code directly in the JSON. Used by community contributions for self-contained simplicity.

## Writing a hook script

Hook scripts are TypeScript files that export an async function. The function receives a `HookContext` object with methods for interacting with the app and reporting progress.

### File-based hook (first-party)

Create a directory for your app in the catalog repo with a `.ts` file:

```
hexos-app-catalog/
├── myapp/
│   └── myapp_hook.ts
└── myapp.json
```

```typescript
// myapp/myapp_hook.ts
import type { HookContext } from "../_lib/hook_context";

export async function afterInstall(ctx: HookContext) {
  await ctx.registerCheckpoints([
    { id: "ready", message: "Waiting for app to start" },
    { id: "configured", message: "Configuring app" },
  ]);

  await ctx.waitForApp("/health");
  await ctx.emitCheckpoint("ready");

  // Do configuration via the app's API...
  await ctx.emitCheckpoint("configured");
}
```

Reference it in the install script JSON:

```json
{
  "version": 6,
  "hooks": [
    {
      "id": "configure-myapp",
      "title": "Configure MyApp",
      "events": ["onAfterInstall"],
      "script": "myapp/myapp_hook.ts",
      "entrypoint": "afterInstall",
      "timeout": 120,
      "description": "Setting up MyApp"
    }
  ]
}
```

### Inline hook (community `scriptContent`)

Embed the code directly in the JSON — no external files needed:

```json
{
  "version": 5,
  "custom": true,
  "metadata": {
    "name": "My App",
    "description": "A custom community app",
    "icon": "https://example.com/icon.svg",
    "version": "1.0.0"
  },
  "hooks": [
    {
      "id": "health-check",
      "event": "onAfterInstall",
      "scriptContent": "export async function setup(ctx) {\n  await ctx.waitForApp('/health');\n  ctx.log('App is ready');\n  await ctx.emitCheckpoint('ready');\n}",
      "entrypoint": "setup",
      "timeout": 60,
      "description": "Post-install health check"
    }
  ]
}
```

#### Testing inline hooks
The `scriptContent` field is useful for **testing hooks via Custom Install in Expert Mode** — you can paste a JSON with inline hooks directly into the editor and run it immediately. This is a development and testing workflow only; inline scripts submitted via PR go through the same review process as file-based hooks.

## HookContext API

The `HookContext` object is passed to your hook function. It provides everything needed to interact with the installed app, report progress, and handle errors.

### Properties

| Property | Type | Description |
|---|---|---|
| `resourceType` | `string` | Always `"app"` (future: `"vm"`, etc.) |
| `resourceId` | `string` | The app ID (e.g., `"plex"`) |
| `event` | `string` | The triggering event (e.g., `"onAfterInstall"`). User-fired runs report `"action"`. |
| `fromVersion` | `string?` | Previous app version (upgrade only) |
| `toVersion` | `string?` | Target app version (upgrade only) |
| `host` | `string?` | TrueNAS LAN IP address |
| `port` | `number?` | App's primary exposed port |
| `baseUrl` | `string` | `http://{host}:{port}` — empty string if unavailable |
| `inputs` | `Record<string, unknown>` | User-collected input values from [hook inputs](#hook-inputs) |
| `target` | `object?` | File-targeted hooks only: `{ type: "files", files: [{ path, containerPath, name, extension, size? }] }` |
| `mounts` | `array` | User-fired runs: the app's live mounts as `{ hostPath, containerPath, localPath }`. Empty on lifecycle firings and whenever mount discovery fails — always tolerate an empty list. |

### Methods

#### Checkpoint management

Checkpoints represent progress steps shown to the user in the HexOS activity center.

| Method | Description |
|---|---|
| `registerCheckpoints(checkpoints)` | Register all checkpoints upfront for UI display. Each checkpoint has `{ id, message }`. |
| `emitCheckpoint(id, message?, progress?)` | Mark a checkpoint as completed. Optionally update its message and set a progress percentage. |
| `updateCheckpointMessage(id, message)` | Update a checkpoint's message without completing it. |
| `skipCheckpoint(id, message?)` | Mark a checkpoint as skipped. |

#### Utilities

| Method | Description |
|---|---|
| `log(message)` | Log a message to the backend logger (not shown to the user). |
| `sleep(ms)` | Async delay for the given number of milliseconds. |
| `waitForApp(path, opts?)` | Poll the app's HTTP endpoint until it responds. Uses exponential backoff (40 attempts by default). Options: `{ timeout?, retries?, method?, expectedStatus? }` |
| `getInstalledAppUrl(appId)` | Base URL of another installed app (e.g. `"http://192.168.1.50:5055"`), or `null` when it isn't installed or has no known port. Resolves on user-fired runs — connect hooks use it to reach the pairing target; lifecycle firings receive `null`. |

#### Error handling

| Method | Description |
|---|---|
| `fail(message, context?)` | Throw a structured error. `context` is an array of `{ label, value }` pairs for diagnostic display. |
| `awaitCheckpointRetry(checkpointId, error, context?)` | Pause the hook at a failed checkpoint and wait for the user to click **Retry** or **Skip**. Returns `"retry"` or `"skip"`. Lifecycle firings only — a user-fired run has no interactive retry. |

#### Input access

| Method | Description |
|---|---|
| `getInput<T>(inputId, schema?)` | Type-safe accessor for user-collected inputs. Throws if the input is missing. |

## Hook inputs

Hooks can declare inputs that are collected from the user before the hook runs. The HexOS UI shows an input dialog when the hook enters the `AWAITING_INPUT` state.

### OAuth input

```json
{
  "inputs": [
    {
      "type": "oauth",
      "id": "plex_login",
      "name": "Sign in to Plex",
      "description": "Required for server claim and library setup",
      "provider": "plex",
      "flow": {
        "type": "pin",
        "pinUrl": "https://plex.tv/api/v2/pins",
        "authUrl": "https://app.plex.tv/auth#?clientID={clientId}&code={code}",
        "pollUrl": "https://plex.tv/api/v2/pins/{pinId}",
        "clientId": "your-client-id",
        "tokenField": "authToken",
        "headers": { "Accept": "application/json" }
      }
    }
  ]
}
```

### Question input

```json
{
  "inputs": [
    {
      "type": "question",
      "id": "library_name",
      "question": {
        "question": "Library Name",
        "description": "Name for the media library to create",
        "type": "text",
        "key": "library_name",
        "default": "Movies"
      }
    }
  ]
}
```

Access input values in your hook script:

```typescript
const { authToken } = ctx.getInput<{ authToken: string }>("plex_login");
const libraryName = ctx.getInput<string>("library_name");
```

## Hook execution flow

### Install

1. User confirms install (with optional hook opt-ins)
2. `onBeforeInstall` hooks run sequentially (blocks app creation)
3. TrueNAS `app.create` executes
4. `onAfterInstall` hooks run sequentially (blocks task completion)
5. Parent install task completes when all required hooks finish
6. Any install-picker links the user selected run as child tasks once the lifecycle hooks settle

### Upgrade

Same pattern with `onBeforeUpgrade` and `onAfterUpgrade`. Only hooks whose triggers match the version transition run — via [V6 trigger gates](#version-gated-upgrade-triggers) or [V5 conditions](#version-conditions). `userOptional` hooks are excluded.

### User-fired runs

A user-triggered hook runs as its own task with `event: "action"`. Availability conditions are re-checked server-side before it starts, the [rerun policy](#rerun-policy) is enforced, and the target selection is re-validated. Failure is terminal — the task ends `FAILED` with the script's error context, and the user re-runs it from the surface rather than answering a retry prompt.

### Failure handling

When a non-optional lifecycle hook fails after all auto-retries:

1. The hook task enters `AWAITING_RETRY` state
2. The user sees **Retry** and **Skip** buttons in the activity center
3. **Retry** re-executes the hook from the beginning (or from the failed checkpoint if using `awaitCheckpointRetry`)
4. **Skip** marks the hook as skipped and allows the parent task to complete

Optional hooks (`optional: true`) are automatically skipped on failure without blocking the install.

## Checkpoint retry pattern

For hooks with multiple steps, use `awaitCheckpointRetry` to let users retry individual steps without restarting the entire hook:

```typescript
export async function afterInstall(ctx: HookContext) {
  await ctx.registerCheckpoints([
    { id: "movies", message: "Creating Movies library" },
    { id: "shows", message: "Creating Shows library" },
  ]);

  // Create Movies library
  try {
    await createLibrary("Movies");
    await ctx.emitCheckpoint("movies");
  } catch (err) {
    const action = await ctx.awaitCheckpointRetry("movies", err.message, [
      { label: "Endpoint", value: "POST /library/sections" },
      { label: "Status", value: err.status },
    ]);
    if (action === "skip") {
      await ctx.skipCheckpoint("movies", "Skipped by user");
    } else {
      // Retry logic...
    }
  }
}
```

## Custom app metadata

When `custom: true`, the `metadata` field is required:

```json
{
  "version": 6,
  "custom": true,
  "metadata": {
    "name": "My Custom App",
    "description": "A brief description of what the app does",
    "icon": "https://example.com/icon.svg",
    "version": "1.0.0"
  }
}
```

Custom apps appear in the HexOS app store alongside standard TrueNAS catalog apps. The `internal: true` flag hides them in production (useful for test apps).

## Complete V5 example

```json
{
  "version": 5,
  "script": {
    "version": "1.0.0",
    "changeLog": "Initial release with post-install health check"
  },
  "requirements": {
    "locations": ["ApplicationsPerformance"],
    "specifications": ["1CORE", "200MB"],
    "permissions": ["READ_WRITE_LOCATIONS"],
    "ports": [8080]
  },
  "ensure_directories_exists": [
    {
      "path": "$LOCATION(ApplicationsPerformance)/myapp/config",
      "owner": { "user": "apps" },
      "snapshot": { "id": "config" }
    }
  ],
  "app_values": {
    "storage": {
      "config": "$HOST_PATH($LOCATION(ApplicationsPerformance)/myapp/config)"
    },
    "network": {
      "web_port": { "port_number": 8080 }
    },
    "resources": {
      "limits": {
        "memory": "$MEMORY(5%, 200)"
      }
    }
  },
  "hooks": [
    {
      "id": "health-check",
      "event": "onAfterInstall",
      "scriptContent": "export async function afterInstall(ctx) {\n  await ctx.registerCheckpoints([\n    { id: 'ready', message: 'Waiting for app' }\n  ]);\n  await ctx.waitForApp('/health');\n  await ctx.emitCheckpoint('ready');\n}",
      "entrypoint": "afterInstall",
      "timeout": 120,
      "description": "Checking app health",
      "optional": true
    }
  ]
}
```

## Complete V6 example

The same app, plus a user-triggerable re-run of the health check:

```json
{
  "version": 6,
  "script": {
    "version": "2.0.0",
    "changeLog": "Melded hook declarations"
  },
  "requirements": {
    "locations": ["ApplicationsPerformance"],
    "specifications": ["1CORE", "200MB"],
    "permissions": ["READ_WRITE_LOCATIONS"],
    "ports": [8080]
  },
  "ensure_directories_exists": [
    {
      "path": "$LOCATION(ApplicationsPerformance)/myapp/config",
      "owner": { "user": "apps" },
      "snapshot": { "id": "config" }
    }
  ],
  "app_values": {
    "storage": {
      "config": "$HOST_PATH($LOCATION(ApplicationsPerformance)/myapp/config)"
    },
    "network": {
      "web_port": { "port_number": 8080 }
    },
    "resources": {
      "limits": {
        "memory": "$MEMORY(5%, 200)"
      }
    }
  },
  "hooks": [
    {
      "id": "health-check",
      "title": "Check MyApp health",
      "description": "Checking app health",
      "events": ["onAfterInstall", "userAction"],
      "optional": true,
      "kind": "maintain",
      "conditions": [
        { "role": "availability", "type": "appRunning", "app": "myapp" }
      ],
      "rerun": "idempotent",
      "scriptContent": "export async function afterInstall(ctx) {\n  await ctx.registerCheckpoints([\n    { id: 'ready', message: 'Waiting for app' }\n  ]);\n  await ctx.waitForApp('/health');\n  await ctx.emitCheckpoint('ready');\n}",
      "entrypoint": "afterInstall",
      "timeout": 120
    }
  ]
}
```
