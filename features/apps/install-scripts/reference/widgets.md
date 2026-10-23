---
title: Dashboard Widgets Reference
description: Declaring app widgets — cached, read-only glances rendered on the server dashboard.
published: true
date: 2026-10-20T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-25T00:00:00.000Z
---

# Dashboard Widgets Reference

A widget is the app's **card on the server dashboard**. It is a **cached, read-only query** an app declares in its dictionary. The platform owns the card and the renderer. Your dictionary owns one script that returns a named-field document, the slots that say which fields the card shows, and an optional background behind them.

One widget is **one query**. The widget's own slots and the slots of every slide read the same result, so a slide never adds a second poll. Two different cadences (live sessions vs. nightly library totals) are two widgets, not one widget with two scripts.

Widgets are not tasks and not hooks: no checkpoints, no inputs, no retries, no user confirmation. They return data or they say they need setup.

## The V6 declaration model

V6 declares everything through one shape — a hook. Its `events` decide **when** it runs; a hook whose events include `userAction` is user-triggerable, and its `surfaces` decide **where** the user can fire it.

> Users see user-triggerable hooks as the app's **Actions** in the interface.
{.is-info}

That matters here because a widget never declares a button inline. Its `buttons` array holds **hook ids** — the same declaration that renders on the app card renders on the widget. Declare once, surface everywhere. See the [Hooks Reference](/features/apps/install-scripts/reference/hooks).

V5 scripts remain fully supported.

## Declaring widgets

Widgets live at the root of the dictionary, next to `hooks`, behind their own schema version:

```json
{
  "version": 6,
  "widgetsSchema": 3,
  "widgets": [
    {
      "id": "queue",
      "title": "Download queue",
      "slots": [{ "type": "list", "field": "items" }],
      "script": "sonarr/widget_queue.ts",
      "entrypoint": "run"
    }
  ]
}
```

Set `widgetsSchema` to `3`. Widgets require `"version": 6`. In a dictionary that declares widgets, the catalog validator rejects a `widgetsSchema` other than `3`. It also rejects widgets in a dictionary of any other `version`. Parsing is forward-compatible and tolerant:

- A `widgetsSchema` this platform does not support → the app contributes no widgets. Nothing crashes, nothing half-renders.
- One invalid widget is dropped with its error logged; the other widgets in the array still load.
- A field type inside a *result* that the platform doesn't know yet drops alone (future vocabulary); a **known** type with a bad shape fails the whole result loudly.

### Moving from widgetsSchema 2

In widgetsSchema 3 a widget is the app's card. Its `slots` and `background` sit on the declaration itself, and there is one layout. The validator rejects the shapes of schema 2:

| Schema 2 | Schema 3 |
|---|---|
| `sizes.small` and `sizes.large`, each with its own `slots` | One `slots` array on the widget. `sizes` is an error |
| `media`, with a `placement` | `background`, which names an image field or a list. `media` is an error |
| A slot of type `image` | Name the image field in `background`. An `image` slot is an error |

The `refresh` floor also moved from 10 seconds to 5. A lower value draws a validator warning, and the platform clamps it to 5.

## Declaration properties

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Stable identifier, `a-z 0-9 _ -` only (see below) |
| `title` | string | Yes | Title of the card's first view. It must differ from the `title` of every slide |
| `description` | string | No | One line explaining the glance |
| `refresh` | number | No | Seconds between query refreshes, as a positive whole number. Default `300`, floor `5` |
| `timeout` | number | No | Seconds before the query is abandoned. Default `10` |
| `conditions` | array | No | Same condition vocabulary as hooks (see [Conditions](#conditions)) |
| `script` | string | No | Path to a `.ts` file in the catalog repo (e.g. `"sonarr/widget_queue.ts"`) |
| `scriptContent` | string | No | Inline TypeScript embedded in the JSON |
| `entrypoint` | string | Yes | Name of the exported async function to call |
| `slots` | array | Yes | 1 to 3 slots for the card's first view (see [Slots](#slots)) |
| `background` | object | No | The field drawn behind the card (see [Background](#background)) |
| `slides` | array | No | Up to 3 more views after the first (see [Slides](#slides)) |
| `buttons` | string[] | No | Ids of this app's user-triggerable hooks to render as buttons. Max 4, unique |

Exactly one of `script` or `scriptContent` — never both, never neither, same rule as hooks.

There is no `retries` on a widget. A query runs once per refresh; a failure keeps the last good data on screen and reports the error alongside it.

### The id character set

`id` is matched against `^[a-z0-9_-]+$`. Colons and commas are delimiters elsewhere: the user's preference key is `"<appId>:<widgetId>"` and the dashboard's batch request is a CSV of those keys. Lowercase letters, digits, underscore and hyphen only.

Keep ids **stable and unique within the app**. The user's preference key holds the id, and the catalog validator rejects a duplicate id.

### refresh and timeout

`refresh` is the server-side cache TTL, in seconds. Values below the floor are clamped to `5`. Declaring `refresh: 1` gets you 5 seconds, not one. There is no ceiling; `3600` for a "most watched this month" roll-up is normal and correct.

Match the cadence to the data:

| Data | Sensible `refresh` |
|---|---|
| Live sessions, active transfers | `5` to `30` |
| Recently added / recently watched | `300` |
| Library totals, disk health | `900` |
| 30-day leaderboards | `3600` |

`timeout` is per attempt. The default of 10 seconds is deliberately short — a widget is a glance, and a slow app must not hold the dashboard.

## Conditions

Widgets use the same condition vocabulary as hooks, with the same two roles:

- **`visibility`** fails → the widget does not exist for the user. It vanishes from the dashboard.
- **`availability`** fails → the widget still renders, but shows the reason instead of data, and **fires no query**.

```json
"conditions": [
  { "role": "availability", "type": "appRunning", "app": "sonarr" }
]
```

Nearly every widget wants exactly that line: a stopped app has nothing to report, and the card says so instead of showing a stale number.

Condition types: `appInstalled`, `appRunning`, `appVersion` (with `range`), `capabilityPresent`, `script`. A condition type this platform version doesn't recognize **fails closed** — the widget hides rather than rendering unguarded.

## Slots

A slot names a field from the query result and the type it expects. A widget declares 1 to 3 slots in `slots`. These are Scrutiny's:

```json
"slots": [
  { "type": "stat", "field": "passing" },
  { "type": "list", "field": "disks", "rows": 2 }
]
```

| Property | Required | Description |
|---|---|---|
| `type` | Yes | `text`, `stat`, `list`, `progress` or `chart` |
| `field` | Yes | Name of a field in the query result |
| `rows` | No | How many rows a `list` slot shows. `1`, `2` or `3`. Allowed on a `list` slot only |

Rules:

- An image is never a slot. A slot of type `image` is an error. Name the image field in [`background`](#background) instead.
- Every referenced `field` must resolve from **this widget's single query**. Mixed cadences mean a second widget, never a second script.
- A slot whose field is missing (or whose field is a different type than the slot declared) renders nothing. Projections degrade quietly; the query result is the truth.
- Height never grows. Content clips inside the card, so put the number that matters in the first slot.

## Background

`background` names the field the card draws behind its slots. It is an object with a `field`:

```json
"background": { "field": "sessions" },
"slots": [{ "type": "list", "field": "sessions", "rows": 1 }]
```

The field is one of two things:

- A standalone `image` field. The card draws that image.
- A `list` whose entries carry an `image`. The card draws the image of the entry it has on screen.

This is the now-playing card of Plex, Jellyfin and Emby. Each names its `sessions` list in `background` and in its one slot. Each stream's entry carries its own artwork, so the picture behind the card is the one for the stream on screen.

A slide has no `background` of its own. The artwork is the widget's.

## Slides

`slides` adds up to 3 more views after the widget's own title and slots. Each slide has a `title` and 1 to 3 `slots`, with the same slot rules as the widget. This is Tautulli's widget:

```json
"title": "Recently added",
"slots": [{ "type": "list", "field": "added", "rows": 3 }],
"slides": [
  {
    "title": "Most active users",
    "slots": [{ "type": "list", "field": "users", "rows": 3 }]
  },
  {
    "title": "Play count by day of week",
    "slots": [{ "type": "chart", "field": "days" }]
  }
]
```

One query returns all three fields. Tautulli's script fetches the three sources at once.

Rules:

- `slides` is a non-empty array of at most 3 when it is present.
- Every view needs its own title. The card tells its views apart by title, so the widget's `title` and the `title` of every slide must differ.
- A slide has no `background`.
- The first view must stand on its own. A box from before slides strips `slides` and draws the first view alone.
- Catalog scripts put every `chart` in a slide, never in the widget's own slots. A box from before slides strips `slides`, so a chart in a slide never reaches it.

Tautulli's script leaves out its `days` field when a week has no plays, so the card passes over that slide.

## Result fields

A script returns a document of **named fields**. Field names are yours and must be stable. The slots and `background` reference them by name. Dynamic collections (users, libraries, torrents) ride as `list` entries, never as generated field names.

Six field types exist:

| Type | Shape | Renders as |
|---|---|---|
| `text` | `{ type, text }` | A muted line of prose. Max 500 chars |
| `stat` | `{ type, label, value }` | A large figure with a small caption below it. `value` is a pre-formatted string |
| `list` | `{ type, entries[] }` | Rows of title / subtitle / meta. Max 20 entries |
| `progress` | `{ type, label, value, text? }` | A bounded quantity. `value` is 0 to 100. `text` is the caption beside the label (`"3.2 GB of 5 GB"`), max 60 chars |
| `chart` | `{ type, points[], unit?, axis?, tone? }` | A few values side by side (see [Charts](#charts)) |
| `image` | `{ type, image, alt? }` | A picture for [`background`](#background). Never a slot |

Maximum 16 fields per result.

`stat.value` is a string because you own the formatting: `"12"`, `"1.4 TB"`, `"98%"`. The renderer never rounds, never adds units.

### Charts

A chart shows 2 to 7 values side by side. The highest value is labelled.

| Property | Type | Required | Description |
|---|---|---|---|
| `points` | array | Yes | 2 to 7 points, each `{ label, value }`. `label` is the short text under the point (`"Mon"`, `"sda"`), at most 12 chars. `value` is 0 or more |
| `axis` | string | No | `time` for moments in order, drawn as a line. `category` for separate things, drawn as columns. Default `category` |
| `unit` | string | No | Follows a value where one is spelled out (`"plays"`, `"°C"`). Max 20 chars |
| `tone` | object | No | `{ good, bad }`. Colors columns by value. Green at `good` and beyond, red at `bad` and beyond, amber halfway. Either may be the larger |

A chart of all zeros says nothing, so leave the field out. Scrutiny draws a column per disk with `tone: { good: 30, bad: 100 }`. It shows the hottest seven disks. When fewer than two disks report a temperature, the script leaves the chart out.

### List entries

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Row title. Truncates at one line |
| `subtitle` | string | No | Second line. Renderers that ignore `subtitles` show this one, so repeat the first `subtitles` line here |
| `subtitles` | string[] | No | Lines that take turns under the entry. Up to 4, each at most 80 chars |
| `meta` | string | No | Right-aligned trailing text |
| `note` | string | No | A short line of small text under the entry. At most 120 chars (see below) |
| `elapsed` | object | No | A duration in steady motion (see below) |
| `progress` | number | No | How far along the entry is, 0 to 100 (see below) |
| `image` | string | No | The entry's artwork as a data URI. When `background` names this list, the card draws the image of the entry on screen |

`rows` on a list slot sets how many rows it shows. Order entries by importance and return the first handful rather than all 20.

The now-playing cards of Plex, Jellyfin and Emby step through the first few streams one at a time, and take turns with each stream's `subtitles`.

### note

`note` is a short line of small text under the entry. Use it to say why an entry failed, or that it is being tried again. A note takes the place of a row, so a list with notes shows fewer entries.

### progress

`progress` says how far along an entry is, from 0 to 100. Use it for a quantity that is not time in motion, such as a download or a conversion. Capable renderers draw a bar. Always put the figure in `meta` too.

### elapsed

`elapsed` lets a duration keep moving between polls. A playback position ticks in real time on a 5-second refresh:

```ts
elapsed: {
  ms: session.viewOffset,          // elapsed as of this result
  ofMs: session.duration,          // total, when bounded — clamps extrapolation
  state: paused ? "paused" : "running",
}
```

It is an **enrichment, not a replacement**. Always set `meta` to a static representation too, so renderers that ignore `elapsed` still show something correct. A bounded `elapsed` renders as `Playing · 12:04 / 48:31`; an unbounded one renders as a bare timecode.

### Images

Images are **data URIs only** (`data:image/png|jpeg|webp|gif;base64,…`), 60 KB maximum. The cap applies to `image` fields and to the `image` of a list entry.

Never emit an app URL. The browser fetching it would leak the host and any embedded key, break off-LAN, and trip mixed-content. The script fetches and inlines server-side, where the credential already is:

```ts
const response = await fetch(`${base}/thumb?token=${token}`);
const type = response.headers.get("content-type") ?? "";
if (!type.startsWith("image/")) return undefined;
const uri = `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
return uri.length <= 60_000 ? uri : undefined;   // over the cap → no image, not a broken one
```

Ask the app for a small render (Plex's photo transcoder, an app's `?width=` parameter) rather than shrinking a full-size poster.

A background fills the card, so fetch a wide crop near the card's shape, about 660x260. Plex asks its photo transcoder for 660x260 first. When that response is not usable or the picture is over the cap, it asks for 480x190.

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

So a warm dashboard never blocks on a slow app. Concurrent requests for the same widget share one in-flight query.

### Authoring notes

- **Type imports only.** Each script is compiled standalone; a runtime import of a sibling catalog file will not resolve. Import types from `../_lib/widget_context`, and copy small helpers inline.
- **Be defensive about shapes.** Wrap file reads and artwork fetches in `try`/`catch` and return `undefined`. One missing poster must not fail the widget.
- **Cap what you return.** Slice lists to a handful of entries before returning. A list slot declares at most 3 `rows`. The now-playing scripts keep the first 5 streams for the card to step through.
- **Keep slow fetches between runs.** The box reuses a widget script's module between runs until the script changes. The card asks every few seconds, so Plex fetches each stream's artwork once and keeps it in a module-level map.
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

A hook whose `availability` conditions fail still renders, greyed out, with its reason on hover. An id that matches nothing is dropped with a warning, because a typo must not break the widget. The catalog validator rejects such an id before it ships.

Maximum 4 buttons, ids unique. Buttons require the app's hooks to be declared in a `version: 6` dictionary — that is where user-triggerable verbs come from.

Firing a button runs the hook exactly as the app card would run it, with the same rerun semantics.

## On the dashboard

A widget shows live details on the app's own dashboard card. When a curated app adds a widget, it appears on the dashboard automatically, with no app update or reinstall. The user chooses what shows on the dashboard in the **Customize** tab of the installed app pane.

The deck re-reads widgets every 5 seconds, which is why `refresh` has a 5-second floor. Each widget's own `refresh` TTL gates whether that read actually queries the app.

## Complete example

A Sonarr download-queue widget with a figure, a list, and a button referencing a maintenance hook.

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
  "widgetsSchema": 3,
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
      "slots": [
        { "type": "stat", "field": "queued" },
        { "type": "list", "field": "items", "rows": 2 }
      ],
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

`summary` is returned but referenced by no slot. That is harmless. Slots pick what they need, and the result document can carry more.
