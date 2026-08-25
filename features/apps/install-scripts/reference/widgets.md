---
title: Dashboard Widgets Reference
description: Declaring app widgets — cached, read-only glances rendered on the server dashboard.
published: true
date: 2026-08-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-25T00:00:00.000Z
---

# Dashboard Widgets Reference

A widget is a **cached, read-only query** an app declares in its dictionary and the user enables on their dashboard. The platform owns the card, the layouts and the renderer; your dictionary owns one script that returns a named-field document, and small declarative slots that say which fields each size shows.

One widget is **one query**. Sizes are projections of the same result — a second size never adds a second poll. Two different cadences (live sessions vs. nightly library totals) are two widgets, not one widget with two scripts.

Widgets are not tasks and not hooks: no checkpoints, no inputs, no retries, no user confirmation. They return data or they say they need setup.

## The V6 declaration model

V6 merges the old separate "actions" concept into hooks. There is ONE declaration — a hook. Its `events` decide **when** it runs; a hook whose events include `userAction` is user-triggerable, and its `surfaces` decide **where** the user can fire it.

> **An action is a hook with a `userAction` event.**
{.is-info}

That matters here because a widget never declares a button inline. Its `buttons` array holds **hook ids** — the same declaration that renders on the app card renders on the widget. Declare once, surface everywhere. See the [Hooks Reference](/features/apps/install-scripts/reference/hooks).

V5 scripts remain fully supported.

## Declaring widgets

Widgets live at the root of the dictionary, next to `hooks`, behind their own schema version:

```json
{
  "version": 6,
  "widgetsSchema": 2,
  "widgets": [
    {
      "id": "queue",
      "title": "Download queue",
      "script": "sonarr/widget_queue.ts",
      "entrypoint": "run"
    }
  ]
}
```

`widgetsSchema` must be `2`. Parsing is forward-compatible and tolerant:

- A `widgetsSchema` this platform does not support → the app contributes no widgets. Nothing crashes, nothing half-renders.
- One invalid widget is dropped with its error logged; the other widgets in the array still load.
- A field type inside a *result* that the platform doesn't know yet drops alone (future vocabulary); a **known** type with a bad shape fails the whole result loudly.

## Declaration properties

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Stable identifier, `a-z 0-9 _ -` only (see below) |
| `title` | string | Yes | Widget name — shown under the app name on the card, and in the Add-widget gallery |
| `description` | string | No | One line explaining the glance; shown in the gallery and the app card's Widgets list |
| `refresh` | number | No | Seconds between query refreshes. Default `300`, floor `10` |
| `timeout` | number | No | Seconds before the query is abandoned. Default `10` |
| `conditions` | array | No | Same condition vocabulary as hooks (see [Conditions](#conditions)) |
| `script` | string | No | Path to a `.ts` file in the catalog repo (e.g. `"sonarr/widget_queue.ts"`) |
| `scriptContent` | string | No | Inline TypeScript embedded in the JSON |
| `entrypoint` | string | Yes | Name of the exported async function to call |
| `sizes` | object | No | Per-size slot declarations (see [Sizes](#sizes)) |
| `buttons` | string[] | No | Ids of this app's user-triggerable hooks to render as buttons. Max 4, unique |

Exactly one of `script` or `scriptContent` — never both, never neither, same rule as hooks.

There is no `retries` on a widget. A query runs once per refresh; a failure keeps the last good data on screen and reports the error alongside it.

### The id character set

`id` is matched against `^[a-z0-9_-]+$`. Colons and commas are delimiters elsewhere: the user's preference key is `"<appId>:<widgetId>"` and the dashboard's batch request is a CSV of those keys. Lowercase letters, digits, underscore and hyphen only.

Keep ids **stable and unique within the app**. The id is what the user's enable/size/order choices are stored against, and what a widget button reference resolves through. Renaming an id silently disables the widget for everyone who had it on.

### refresh and timeout

`refresh` is the server-side cache TTL, in seconds. Values below the floor are clamped to `10` — declaring `refresh: 1` gets you 10 seconds, not one. There is no ceiling; `3600` for a "most watched this month" roll-up is normal and correct.

Match the cadence to the data:

| Data | Sensible `refresh` |
|---|---|
| Live sessions, active transfers | `10`–`30` |
| Recently added / recently watched | `300` |
| Library totals, disk health | `900` |
| 30-day leaderboards | `3600` |

`timeout` is per attempt. The default of 10 seconds is deliberately short — a widget is a glance, and a slow app must not hold the dashboard.

## Conditions

Widgets use the same condition vocabulary as hooks, with the same two roles:

- **`visibility`** — fails → the widget does not exist for the user. It vanishes from the dashboard, the app card's Widgets list, and the Add-widget gallery.
- **`availability`** — fails → the widget still renders, but shows the reason instead of data, and **fires no query**.

```json
"conditions": [
  { "role": "availability", "type": "appRunning", "app": "sonarr" }
]
```

Nearly every widget wants exactly that line: a stopped app has nothing to report, and the card says so instead of showing a stale number.

Condition types: `appInstalled`, `appRunning`, `appVersion` (with `range`), `capabilityPresent`, `script`. A condition type this platform version doesn't recognize **fails closed** — the widget hides rather than rendering unguarded.

## Sizes

Two sizes exist, both optional, both sized to the dashboard's own cards:

| Size | Footprint | Slots |
|---|---|---|
| `small` | An app tile | 1–3 |
| `large` | A storage card (double width), same height | 1–4 |

A slot names a field from the query result and the type it expects:

```json
"sizes": {
  "small": {
    "slots": [{ "type": "stat", "field": "queued" }]
  },
  "large": {
    "media": { "placement": "left", "field": "art" },
    "slots": [
      { "type": "stat", "field": "queued" },
      { "type": "list", "field": "items" }
    ]
  }
}
```

Rules:

- Every referenced `field` must resolve from **this widget's single query**. Mixed cadences mean a second widget, never a second script.
- A slot whose field is missing — or whose field is a different type than the slot declared — renders nothing. Projections degrade quietly; the query result is the truth.
- Height never grows. Content clips inside the card, so put the number that matters in the first slot.
- Declare `small` only when the glance survives being one number. A five-row list has no small form; declare `large` alone.

### Media

`media` is not a field type — it is a slot on the size that points at an `image` field in the result.

| Size | `placement` values | Rendered as |
|---|---|---|
| `small` | `top`, `bottom` | A strip above or below the text slots |
| `large` | `left`, `right`, `both` | A column beside the text slots (`both` renders as a full-bleed top strip) |

When a size declares `media`, per-row thumbnails inside its list slots are suppressed — one image per card, not two.

### No sizes declared

A widget with no `sizes` still renders through a default projection: every `stat` field as a row of figures, then the first `list` field, then any `text` fields. It works, but you don't control the emphasis. Declare sizes.

## Result fields

A script returns a document of **named fields**. Field names are yours and must be stable — the `sizes` slots reference them by name. Dynamic collections (users, libraries, torrents) ride as `list` entries, never as generated field names.

Four field types exist:

| Type | Shape | Renders as |
|---|---|---|
| `text` | `{ type, text }` | A muted line of prose. Max 500 chars |
| `stat` | `{ type, label, value }` | A large figure with a small caption below it. `value` is a pre-formatted string |
| `list` | `{ type, entries[] }` | Rows of title / subtitle / meta. Max 20 entries |
| `image` | `{ type, image, alt? }` | A picture — the source a `media` slot points at |

Maximum 16 fields per result.

`stat.value` is a string because you own the formatting: `"12"`, `"1.4 TB"`, `"98%"`. The renderer never rounds, never adds units.

### List entries

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Row title. Truncates at one line |
| `subtitle` | string | No | Second line. Hidden at `small` |
| `meta` | string | No | Right-aligned trailing text. Hidden at `small` |
| `elapsed` | object | No | A duration in steady motion (see below) |
| `image` | string | No | Row thumbnail as a data URI |

List slots render 2 rows at `small` and 3 rows at `large`, so order entries by importance and return the first handful rather than all 20. At `small` a row is its title alone — `subtitle`, `meta` and `image` render at `large` only.

### elapsed

`elapsed` lets a duration keep moving between polls — a playback position that ticks in real time on a 10-second refresh:

```ts
elapsed: {
  ms: session.viewOffset,          // elapsed as of this result
  ofMs: session.duration,          // total, when bounded — clamps extrapolation
  state: paused ? "paused" : "running",
}
```

It is an **enrichment, not a replacement**. Always set `meta` to a static representation too, so renderers that ignore `elapsed` still show something correct. A bounded `elapsed` renders as `Playing · 12:04 / 48:31`; an unbounded one renders as a bare timecode.

### Images

Images are **data URIs only** — `data:image/png|jpeg|webp|gif;base64,…`, 60 KB maximum, on both `image` fields and list-entry thumbnails.

Never emit an app URL. The browser fetching it would leak the host and any embedded key, break off-LAN, and trip mixed-content. The script fetches and inlines server-side, where the credential already is:

```ts
const response = await fetch(`${base}/thumb?token=${token}`);
const type = response.headers.get("content-type") ?? "";
if (!type.startsWith("image/")) return undefined;
const uri = `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
return uri.length <= 60_000 ? uri : undefined;   // over the cap → no image, not a broken one
```

Ask the app for a small render (Plex's photo transcoder, an app's `?width=` parameter) rather than shrinking a full-size poster.

## The script contract

Widget scripts are TypeScript files exporting an async function. They run in-process on the local node, receive a `WidgetContext`, and return a `WidgetQueryResult`.

```typescript
import type { WidgetContext, WidgetQueryResult } from "../_lib/widget_context";

export async function run(ctx: WidgetContext): Promise<WidgetQueryResult> {
  // ...
}
```

### What the script receives

| Property | Type | Description |
|---|---|---|
| `appId` | string | The declaring app's id |
| `host` | string | Box LAN IP — app APIs live at `http://host:port` |
| `port` | number? | The app's first declared catalog port, when it declares one |
| `mounts` | array | The app's live mounts |
| `log(message)` | method | Writes to the backend log; never shown to the user |

Each mount carries three paths:

| Property | Description |
|---|---|
| `hostPath` | The directory on the box (`/mnt/...`) |
| `containerPath` | The same directory as the **app** sees it, or `null` when the chart fixes it internally |
| `localPath` | The same directory as **this script** can read it — use this to harvest app config files |

There is no `getInput`, no checkpoint API, no task. A widget cannot prompt.

### What the script must return

```ts
interface WidgetQueryResult {
  needsSetup?: boolean;
  reason?: string;
  fields?: Record<string, WidgetFieldValue>;
}
```

Three outcomes:

1. **Data** — return `{ fields }`.
2. **Not usable yet** — return `{ needsSetup: true, reason: "Sign in to Plex to see your library here" }`. The card shows your reason in place of data. Harvest credentials first; needs-setup is the fallback, not the default.
3. **Failure** — `throw`. The last good result stays on screen with the error recorded beside it; if there was never a good result, the card shows a generic error line.

### Caching and freshness

The platform caches per widget and serves stale while it revalidates:

- A fresh entry is returned immediately.
- A stale entry is returned immediately **and** kicks off a single background refresh — the next poll picks up the new data.
- Only a cold miss waits on your script.

So a warm dashboard never blocks on a slow app, and a widget that hasn't been enabled has never run. Concurrent requests for the same widget share one in-flight query.

### Authoring notes

- **Type imports only.** Each script is compiled standalone; a runtime import of a sibling catalog file will not resolve. Import types from `../_lib/widget_context`, and copy small helpers inline.
- **Be defensive about shapes.** Wrap file reads and thumbnail fetches in `try`/`catch` and return `undefined` — one missing poster must not fail the widget.
- **Cap what you return.** Slice lists to a handful of entries before returning; a size template shows two or three rows (five in the default projection).
- **`scriptContent`** works exactly as it does for hooks: inline TypeScript in the JSON, handy for testing a widget through Custom Install in Expert Mode.

## Buttons

`buttons` holds **hook ids** from the same app — references, never inline definitions:

```json
"buttons": ["refresh-library"]
```

A button renders when all of the following hold:

1. The id resolves to a hook in this app's dictionary.
2. That hook is user-triggerable — its `events` include `userAction` (which is what an omitted `events` means).
3. The hook allows the `widget` surface. The derived defaults already include it, so no `surfaces` edit is needed; narrowing `surfaces` to exclude `widget` removes the button.
4. The hook's `visibility` conditions pass.

A hook whose `availability` conditions fail still renders — greyed out, with its reason on hover. An id that matches nothing is dropped with a warning: a typo must not break the widget.

Maximum 4 buttons, ids unique. Buttons require the app's hooks to be declared in a `version: 6` dictionary — that is where user-triggerable verbs come from.

Firing a button runs the hook exactly as the app card would run it, with the same rerun semantics.

## On the dashboard

Widgets are **off by default**. Nothing an app declares appears until the user turns it on, and only enabled widgets ever poll — an empty selection makes zero requests.

**Enabling.** Two places, same switch:

- The **app card's Widgets section** lists that app's widgets with a toggle each.
- The dashboard's Widgets section **⋯ → Add widget** opens a gallery: installed apps' widgets with checkboxes, then widgets from apps the user hasn't installed yet ("Install Tautulli to get this widget"), each with an inline install.

That second list is why `title` and `description` are worth writing carefully — they are the whole pitch before an app is installed.

**Resizing.** A size control sits in the widget card's header and flips between `small` and `large`. It only appears when the widget declares both. Size is chosen per widget on the dashboard, not on the app card. With no stored choice, `large` wins when declared, otherwise the single declared size; a stored size the widget no longer declares falls back the same way.

**Reordering.** **⋯ → Change order** lists the enabled widgets with up/down controls. User order applies over the server's stable order (app order, then declaration order). The same ⋯ menu switches the whole section between horizontal and grid layout.

All of these are per-user, per-server preferences. Choices for an app that is later removed stay inert and come back if the app is reinstalled.

The deck re-reads enabled widgets every 10 seconds; each widget's own `refresh` TTL gates whether that read actually queries the app.

## Complete example

A Sonarr download-queue widget with both sizes and a button referencing a maintenance hook.

**`sonarr.json`**

```json
{
  "version": 6,
  "script": {
    "version": "1.2.0",
    "changeLog": "Added the download queue widget"
  },
  "requirements": {
    "locations": ["ApplicationsPerformance"],
    "specifications": ["1CORE", "512MB"],
    "permissions": ["READ_WRITE_LOCATIONS"],
    "ports": [8989]
  },
  "app_values": {
    "network": {
      "web_port": { "port_number": 8989 }
    }
  },
  "hooks": [
    {
      "id": "refresh-library",
      "title": "Refresh library",
      "description": "Ask Sonarr to rescan every monitored series.",
      "kind": "maintain",
      "rerun": "idempotent",
      "conditions": [
        { "role": "availability", "type": "appRunning", "app": "sonarr" }
      ],
      "script": "sonarr/refresh_library.ts",
      "entrypoint": "run",
      "timeout": 120
    }
  ],
  "widgetsSchema": 2,
  "widgets": [
    {
      "id": "queue",
      "title": "Download queue",
      "description": "Episodes Sonarr is grabbing right now.",
      "refresh": 30,
      "timeout": 10,
      "conditions": [
        { "role": "availability", "type": "appRunning", "app": "sonarr" }
      ],
      "sizes": {
        "small": {
          "slots": [{ "type": "stat", "field": "queued" }]
        },
        "large": {
          "slots": [
            { "type": "stat", "field": "queued" },
            { "type": "list", "field": "items" }
          ]
        }
      },
      "buttons": ["refresh-library"],
      "script": "sonarr/widget_queue.ts",
      "entrypoint": "run"
    }
  ]
}
```

The hook declares no `events`, so it defaults to `["userAction"]` — a user verb, no lifecycle firing. Its surfaces are derived (`card` and `widget`), which is why the widget can reference it without any `surfaces` edit.

**`sonarr/widget_queue.ts`**

```typescript
// Type imports only — each script is compiled standalone, so runtime imports
// of sibling files wouldn't resolve.
import { readFileSync } from "node:fs";

import type { WidgetContext, WidgetQueryResult } from "../_lib/widget_context";

/** Sonarr writes its API key into config.xml on first start. */
function harvestApiKey(ctx: WidgetContext): string | null {
  const config =
    ctx.mounts.find((mount) => mount.containerPath === "/config") ??
    ctx.mounts.find((mount) => mount.hostPath.endsWith("/sonarr/config"));
  if (!config) return null;
  try {
    const xml = readFileSync(`${config.localPath}/config.xml`, "utf-8");
    return xml.match(/<ApiKey>([^<]+)<\/ApiKey>/)?.[1] ?? null;
  } catch {
    return null;
  }
}

interface QueueRecord {
  title?: string;
  series?: { title?: string };
  size?: number;
  sizeleft?: number;
  status?: string;
}

const gb = (bytes: number) => `${(bytes / 1e9).toFixed(1)} GB`;

function progress(record: QueueRecord): string | undefined {
  if (record.size === undefined || record.sizeleft === undefined) return record.status;
  return `${gb(record.size - record.sizeleft)} / ${gb(record.size)}`;
}

export async function run(ctx: WidgetContext): Promise<WidgetQueryResult> {
  const apiKey = harvestApiKey(ctx);
  if (!apiKey) {
    return { needsSetup: true, reason: "Open Sonarr once to finish setting it up" };
  }

  const base = `http://${ctx.host}:${ctx.port ?? 8989}`;
  const response = await fetch(`${base}/api/v3/queue?pageSize=20`, {
    headers: { "X-Api-Key": apiKey },
  });
  if (!response.ok) throw new Error(`Sonarr queue query failed (${response.status})`);

  const body = (await response.json()) as { records?: QueueRecord[]; totalRecords?: number };
  const records = (body.records ?? []).slice(0, 5);

  return {
    fields: {
      queued: {
        type: "stat",
        label: "Downloading",
        value: String(body.totalRecords ?? records.length),
      },
      items: {
        type: "list",
        entries: records.map((record) => ({
          title: record.series?.title ?? record.title ?? "Unknown",
          subtitle: record.title,
          meta: progress(record),
        })),
      },
      summary: {
        type: "text",
        text:
          records.length === 0
            ? "Nothing downloading"
            : `${records.length} episode${records.length === 1 ? "" : "s"} in progress`,
      },
    },
  };
}
```

`summary` is returned but referenced by no slot — harmless, and useful as the default projection's text line if the sizes are ever removed. Slots pick what they need; the result document can carry more.
