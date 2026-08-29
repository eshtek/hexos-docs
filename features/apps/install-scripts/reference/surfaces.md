---
title: Surfaces Reference
description: Where a user-triggerable hook renders — the app card, the file browser, the install picker, and dashboard widgets.
published: true
date: 2026-08-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-08-25T00:00:00.000Z
---

# Surfaces Reference

A **surface** is a place in the HexOS UI where a user can press a hook and run it.

V6 dictionaries declare one thing: a hook. A hook's `events` decide **when** it runs, and its `surfaces` decide **where** a person can fire it.

> Users see user-triggerable hooks as the app's **Actions** in the interface.
{.is-info}

`events` defaults to `["userAction"]`, so a declaration that writes no `events` at all is a pure action — it never runs during install or upgrade, and it shows up wherever its surfaces put it. A hook whose `events` list omits `userAction` is lifecycle-only: it has no surfaces, no buttons, and `surfaces` on it is inert.

V5 scripts (`"version": 5`) are fully supported and unaffected — they declare lifecycle hooks with a singular `event` and never surface as actions.

## The four surfaces

`surfaces` accepts these values, and only these:

| Value | Where it renders | Requires |
|---|---|---|
| `card` | The **Actions** panel on the app's card in HexOS | The app is installed |
| `fileBrowser` | Action rows under the current selection in the file browser | A `target` of type `files` |
| `installPicker` | The **App customizations** rows in another app's install dialog | Conditions referencing another app |
| `widget` | A button on a dashboard widget | A widget in the same dictionary that lists the hook id in its `buttons` |

Each surface filters independently. The same declaration can reach all four; a hook the user cannot see on one surface is unaffected on the others.

## `surfaces` and the default

`surfaces` is optional. When present it is the complete, exact list — it replaces the derivation rather than adding to it, and it must contain at least one value.

When `surfaces` is omitted, the effective list is derived from the rest of the declaration, first match wins:

| Declaration | Effective surfaces |
|---|---|
| `surfaces` is present | exactly the declared list |
| `target` is present | `["fileBrowser"]` |
| a condition names an app other than the declaring app | `["installPicker", "card", "widget"]` |
| anything else | `["card", "widget"]` |

Two consequences worth internalizing:

- **A file-targeted hook is a file-browser verb and nothing else** by default. It never lands on the card, because a card button has no file selection to act on.
- **A cross-app hook is offered at install time *and* stays on the card forever.** The install picker is where the link is discovered; the card is where the user re-runs it later. "Cross-app" means what `referencedPairingTargetApps` computes: the distinct `app` values across the hook's `conditions`, excluding the app whose dictionary this is.

Everything else — a plain maintenance verb with no target and no pairing target reference — is a card button that is also eligible to be a widget button.

> The `widget` entry rides the defaults deliberately, so an app that later adds a widget can put an existing action on it by referencing the hook id, with no edit to the hook.
{.is-info}

## Narrowing, and what it costs

`surfaces` is how you take a hook *off* a surface. Each removal has a specific effect:

- **Drop `installPicker`** and the hook stops being a pairing. Install-time cross-app discovery reads only picker-eligible hooks, so a connect verb narrowed to `["card"]` will never appear as an App customization row in the target's install dialog — the user has to find it on the card after both apps exist.
- **Drop `fileBrowser`** and the hook leaves the catalog-wide file index entirely: no action row for installed users, and no contextual suggestion for anyone else.
- **Drop `widget`** and any widget `buttons` entry pointing at that hook is silently skipped when the widget renders.
- **Drop `card`** and the only way to run the hook is the surface you kept.

## Widget buttons

Widgets never define actions. A widget references hook ids:

```json
{
  "widgets": [
    {
      "id": "conversions",
      "title": "Conversions",
      "entrypoint": "run",
      "script": "fileflows/widget_conversions.ts",
      "buttons": ["rescan-library"]
    }
  ]
}
```

A referenced button renders only when all three hold:

1. A hook with that id exists and is user-triggerable.
2. Its effective surfaces include `widget`.
3. Its visibility conditions pass.

A reference to an unknown id is dropped with a warning rather than breaking the widget. Buttons are capped at four per widget, ids must be unique, and they render in the order the widget declares them.

## The action manager

Every action surface that renders a list — the app card and the file browser — has a **⋯** control that opens the action manager. From it a user can hide any action and reorder the ones they keep. The choice is stored per user, per surface, keyed by `appId` and hook id, and it survives uninstall and reinstall.

Ordering resolves as: actions with an explicit user order sort first, ascending; everything else keeps declaration order beneath them.

For authors this means one rule:

> **Never assume a declared action is visible.** A user can hide any of them, and the one you list first is not necessarily the one they see first.
{.is-warning}

Practically:

- Do not write a description that says "run this after *Connect to Seer*." Each action must be independently runnable, or must state its own precondition through a `condition` so it explains itself when it cannot run.
- Do not use ordering to imply a sequence. If two steps must happen in order, they are one hook.
- Every action needs a `title` that stands alone. It is the only thing a user sees in the manager list.

Dashboard widgets have their own preferences — widgets are off until a user adds one, and each added widget has a size variant and a position. Widget buttons themselves are not individually hideable; they follow their widget.

## File-browser contextual suggestions

The file browser can offer an action from an app the user has **not installed**. HexOS builds a catalog-wide index of every file-targeted verb every dictionary declares, so a `.mkv` selection can surface "Convert to MP4 — Requires FileFlows · Install" without FileFlows ever having been installed.

Nothing extra is declared for this. A hook is eligible for the index when:

- its dictionary is `"version": 6` and belongs to a non-deprecated catalog app,
- it is user-triggerable (`userAction` in its effective events),
- it declares `target: { "type": "files", ... }`, and
- its effective surfaces include `fileBrowser`.

A suggestion is then offered against the live selection when all of these hold:

- something is selected and nothing selected is a directory,
- the declaring app is **not** installed,
- every selected file's extension is in the hook's `accepts` (compared lowercase),
- the selection size is within `maxFiles`, when declared.

Matching suggestions appear in catalog order, capped at two rows so discovery stays quiet. The row shows the hook title, the app it needs, and an install affordance that takes the user to that app.

Suggestions are discovery only — the app is not there, so the hook's `conditions` and `requiresTargetMount` are not evaluated. They begin to matter the moment the app is installed, at which point the same declaration stops being a suggestion and becomes a real, evaluated action row that can be disabled with a reason.

What this means for authoring:

- `accepts` is the discovery key. Write extensions dot-prefixed and lowercase (`".mkv"`), and list every one the script genuinely handles — an extension you omit is a suggestion that never fires.
- The `title` is read by a person who has never heard of your app. Write it as an operation on the file ("Convert to MP4"), not as a feature name ("FileFlows conversion").
- Set `maxFiles` honestly. It is the only thing keeping a 400-file selection from offering a job that will not finish.

## Worked example: one hook, two surfaces

Plex's connect verb links a Plex install to Seer. Left to the defaults it would derive `["installPicker", "card", "widget"]`. Declaring `surfaces` narrows it to exactly two: offer the link while Seer is installing, keep it on the Plex card for re-runs, and keep it off widgets.

```json
{
  "id": "connect-seer",
  "title": "Connect to Seer",
  "description": "Link this Plex server to Seer so requests and discovery use your library.",
  "kind": "connect",
  "surfaces": ["installPicker", "card"],
  "conditions": [
    { "role": "visibility", "type": "appInstalled", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "seerr" },
    { "role": "availability", "type": "appRunning", "app": "plex" }
  ],
  "rerun": "converge",
  "script": "plex/connect_seer.ts",
  "entrypoint": "run",
  "timeout": 300
}
```

There are no `events`, so this is a pure action — `["userAction"]`. `rerun` is required because of that, and `"converge"` is right here: the user can press **Connect to Seer** again after a half-finished link and the script settles it.

The two surfaces do different work from the same declaration:

- **Install picker.** `seerr` appears in the conditions and is not the declaring app, so Seer's install dialog offers this as an App customization row. Accepting it installs Plex if needed and runs `connect-seer` once, as a child task of the install.
- **App card.** The `appInstalled` visibility condition hides the button on the Plex card until Seer exists. Once it does, the button appears; the two `appRunning` availability conditions grey it out with a reason whenever either app is stopped.

Because `widget` is not in the list, adding `"buttons": ["connect-seer"]` to a Plex widget later would render nothing. Putting the button on a widget is a one-word edit to `surfaces`, not a new declaration.

## Gotchas

| Symptom | Cause |
|---|---|
| Action does not appear anywhere | `events` omits `userAction`, so the hook is lifecycle-only and never projects to a surface |
| Whole declaration dropped with a `rerun` error | `rerun` is required on every user-triggerable hook and forbidden on lifecycle-only ones |
| File verb missing from the file browser | `surfaces` was written without `fileBrowser`, or the hook has no `files` target |
| Cross-app link never offered at install | `surfaces` was written without `installPicker` |
| Widget button renders nothing | The hook id is a typo, or `surfaces` omits `widget` |
| Dropped with "cross-app connects fire from the install picker automatically" | A hook with pairing-target-referencing conditions also declared a lifecycle event — split them into two declarations |

An invalid declaration is dropped on its own, with an error reported; the rest of the dictionary still loads. A dropped hook is an invisible hook, so the failure looks like "my button isn't there" rather than a broken app.

## See also

- [Hooks Reference](/features/apps/install-scripts/reference/hooks) — events, conditions, inputs, `rerun`, and the `HookContext` API
- [Install Script Schema](/features/apps/install-scripts/reference/schema) — the rest of the dictionary
