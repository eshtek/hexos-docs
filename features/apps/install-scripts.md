---
title: Install Scripts Overview
description: What install scripts are, what each schema version adds, and how to use them.
published: true
date: 2026-08-25T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:06.784Z
---

# Install scripts overview

## What are install scripts?

Install scripts are a curated, turnkey solution for installing applications through TrueNAS in an opinionated "one-click" way. They eliminate the need for users to manually configure networking, resources, folders, and other technical settings by providing pre-configured, best-practice templates.

### Key benefits
- **No manual configuration required** - Networking, resources, and folders are automatically configured
- **Best practices built-in** - All configurations follow recommended settings
- **One-click installation** - Simplified installation process
- **Curated experience** - Apps are pre-tested and optimized
- **Post-install automation** - Hooks can handle app setup after installation (V5 and V6)
- **User-triggerable actions** - The same hooks can be offered as buttons the user presses later (V6)

### Current capabilities
- Configures all fields that TrueNAS exposes during app installation
- Automatically sets up directory structures and permissions
- Configures resource allocation (CPU, memory, GPU)
- Sets up networking and port mappings
- Manages storage mounts and paths
- **Hooks** — run automated setup steps before or after install and upgrade (V5 and V6)
- **User-triggerable hooks** — the same declarations surfaced as app-card buttons, install-time cross-app links, and file-browser verbs (V6)
- **Widgets** — dashboard glances declared in the same dictionary (V6)
- **Upfront pairing config collection** — when a pairing target is checked in the install picker, its install questions and consent hooks render inline so all config is collected in one dialog (V6)
- **Cross-app hook discovery** — HexOS scans all catalog dictionaries to discover hooks across apps, powering the pairing picker and **Also pairs well with** suggestions (V6)

### What's new in V5: lifecycle hooks

V5 install scripts introduce **lifecycle hooks** — TypeScript functions that execute at specific points during app install and upgrade. Hooks enable post-install automation like health checks, service configuration, OAuth login, and more — all without the user needing to open the app's own UI.

V5 is a strict superset of V4. The only new field is `hooks`. An existing V4 script can be promoted to V5 by changing `"version": 4` to `"version": 5` and optionally adding a `hooks` array.

For full details, see the [Hooks Reference](/features/apps/install-scripts/reference/hooks).

### What's new in V6: one melded hook family

V6 declares everything through **one shape — a hook**. Its `events` decide *when* it runs; a hook whose events include `userAction` is user-triggerable, and its `surfaces` decide *where* the user can fire it.

> Users see user-triggerable hooks as the app's **Actions** in the interface.
{.is-info}

One `hooks` array now covers all of it:

| What you want | How you declare it |
|---|---|
| Automation during install or upgrade | `"events": ["onAfterInstall"]` |
| A button on the app card | no `events` at all (absent means `["userAction"]`) |
| A cross-app link offered at install time | a `userAction` hook whose `conditions` reference another app (the pairing target) |
| A verb in the file browser | a `userAction` hook with a `target` of type `files` |
| A button on a dashboard widget | a `userAction` hook, referenced by id from the widget's `buttons` |

#### Event objects

`events` is an array, and each entry is either a string or an object. The object form carries per-trigger configuration — `from` and `to` are semver ranges that gate an upgrade transition:

```json
{
  "id": "migrate-config",
  "title": "Migrate configuration",
  "events": [{ "event": "onBeforeUpgrade", "from": "< 2.0.0", "to": ">= 2.0.0" }],
  "script": "myapp/migrate.ts",
  "entrypoint": "migrateConfig"
}
```

#### Conditions

`conditions` gate a hook against live system state. Each condition carries a `role`: `visibility` hides the hook entirely, `availability` shows it but disabled with a reason. Conditions that reference another app are also what HexOS reads to build cross-app pairings — no catalog code runs to produce them.

```json
{
  "id": "connect-tautulli",
  "title": "Connect to Tautulli",
  "description": "Link Tautulli to this Plex server for watch history and stats.",
  "kind": "connect",
  "conditions": [
    { "role": "visibility", "type": "appInstalled", "app": "tautulli" },
    { "role": "availability", "type": "appRunning", "app": "tautulli" },
    { "role": "availability", "type": "appRunning", "app": "plex" }
  ],
  "rerun": "converge",
  "script": "plex/connect_tautulli.ts",
  "entrypoint": "run",
  "timeout": 300
}
```

#### Surfaces

`surfaces` narrows where a user-triggerable hook appears — `installPicker`, `card`, `fileBrowser`, `widget`. Most scripts omit it, because HexOS derives the right answer from the declaration itself: a hook with a file `target` belongs to the file browser, a hook whose conditions reference another app (a pairing target) belongs to the install picker and the app card, and everything else is an app-card verb.

#### Widgets alongside

A V6 dictionary also declares dashboard widgets — read-only cached queries — with `widgetsSchema: 2` and a `widgets` array. A widget can reference the app's own user-triggerable hooks by id in its `buttons`, so one hook declaration serves the card and the widget.

#### Migrating from V5

V6 is a superset of V5. A V5 script becomes V6 by changing `"version": 5` to `"version": 6`; its `event` field becomes an `events` array.

**V5:**

```json
{
  "id": "configure-plex",
  "event": "onAfterInstall",
  "description": "Setting up Plex server",
  "script": "plex/plex_hook.ts",
  "entrypoint": "afterInstall"
}
```

**V6:**

```json
{
  "id": "configure-plex",
  "title": "Pre-configure Plex",
  "events": ["onAfterInstall"],
  "description": "Setting up Plex server",
  "script": "plex/plex_hook.ts",
  "entrypoint": "afterInstall"
}
```

Three details go with the rename:

- Every V6 hook needs a `title` — the user-facing name. A `userOptional` consent checkbox labels itself with it, so V5's `userOptional.label` moves up to `title`
- The singular `event` field is rejected inside a V6 entry rather than silently ignored, so a half-converted hook fails loudly
- A V5 upgrade `condition` moves onto the event object: `"condition": { "fromVersionRange": "< 2.0.0" }` becomes `"events": [{ "event": "onBeforeUpgrade", "from": "< 2.0.0" }]`. A leftover `condition` field is dropped, and the hook would then fire on every upgrade

Everything else — `script`, `scriptContent`, `entrypoint`, `timeout`, `retries`, `optional`, `inputs`, and the rest of `userOptional` — is unchanged, field for field.

V5 scripts remain fully supported. Nothing forces the move; a V5 dictionary keeps parsing and running exactly as it does today.

For full details, see the [Hooks Reference](/features/apps/install-scripts/reference/hooks), [Surfaces Reference](/features/apps/install-scripts/reference/surfaces), [Widgets Reference](/features/apps/install-scripts/reference/widgets), and [Pairings Reference](/features/apps/install-scripts/reference/pairings).

## How to use install scripts

### Curated app installation
For supported applications, the installation process is streamlined:

1. Navigate to the **Apps** section in the UI
2. Browse the list of curated applications
3. Click the **Install** button next to your desired app
4. The pre-configured install script will automatically:
   - Set up all necessary directories and permissions
   - Configure networking and ports
   - Allocate appropriate system resources
   - Mount required storage paths
   - Handle any app-specific requirements
   - Run lifecycle hooks for post-install setup (V5 and V6 apps)

### Custom installation
For apps not yet curated or when you need to customize the configuration:

1. Navigate to the **Apps** section in the UI
2. For curated apps: Click **Custom Install** instead of **Install**
3. For non-curated apps: Click **Custom Install** (the only available option)
4. A JSON editor will open where you can:
   - Modify existing curated configurations
   - Create entirely new install scripts
   - Use template variables for dynamic configuration

### Best practices and common pitfalls

#### Best practices
- **Use V6 for new scripts with hooks or widgets**, **V5 for lifecycle-only hooks**, or **V4 for scripts with neither** — all three are fully supported
- **Always use `$LOCATION()` macros** for paths instead of hardcoded paths
- **Use `$HOST_PATH()` and `$MOUNTED_HOST_PATH()`** for storage configuration instead of manual object creation
- **All directory entries must be objects** — bare strings in `ensure_directories_exists` are no longer supported
- **Declare ownership** with the `owner` field for apps that require specific user/group ownership (e.g., `"postgres"`, `"apps"`)
- **Add `snapshot` config** on data and config directories to enable automatic pre-update ZFS snapshots
- **Use `$MEMORY()` for dynamic memory allocation** to ensure apps work across different system configurations
- **Reference TrueNAS app schemas** from the [official apps repository](https://github.com/truenas/apps) for `app_values` structure
- **Keep hook scripts focused** — each hook should do one thing (health check, configuration, library setup)
- **Use `optional: true`** on hooks that are nice-to-have but shouldn't block app installation if they fail
- **Let surfaces derive themselves** (V6) — only set `surfaces` when you need to narrow the default placement
- **Gate cross-app hooks with conditions** (V6) — `visibility` for "this app isn't installed", `availability` for "it's installed but not running"

#### Common pitfalls
- **Permission issues** are the most common cause of failures - both during installation and at runtime
- **Hardcoded paths** break when users have custom location preferences
- **Missing directory creation** can cause apps to fail during installation
- **Incorrect `app_values` structure** for the specific TrueNAS app version
- **Missing `await`** in hook scripts — all `ctx` methods are async and must be awaited
- **Hook timeout too short** — apps can take 30-60 seconds to become responsive after container creation; use `ctx.waitForApp()` with appropriate timeouts