# Lifecycle Hooks Reference

Lifecycle hooks are TypeScript functions that execute at specific points during app install and upgrade. They enable post-install automation like health checks, service configuration, OAuth login, library creation, and more.

Hooks are a **V5** feature. To use hooks, set `"version": 5` in your install script and add a `hooks` array.

## Hook Events

| Event | When it fires |
|---|---|
| `onBeforeInstall` | Before `app.create` is called on TrueNAS |
| `onAfterInstall` | After `app.create` completes successfully |
| `onBeforeUpgrade` | Before `app.upgrade` is called on TrueNAS |
| `onAfterUpgrade` | After `app.upgrade` completes successfully |

## Hook Declaration

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

### Declaration Properties

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

::: warning script vs scriptContent
Every hook must have exactly one of `script` or `scriptContent` — never both, never neither. The schema enforces this with a validation rule.

- **`script`** — references an external `.ts` file in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repo. Used by first-party curated hooks.
- **`scriptContent`** — embeds the TypeScript code directly in the JSON. Used by community contributions for self-contained simplicity.
:::

## Writing a Hook Script

Hook scripts are TypeScript files that export an async function. The function receives a `HookContext` object with methods for interacting with the app and reporting progress.

### File-Based Hook (first-party)

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
  "version": 5,
  "hooks": [
    {
      "id": "configure-myapp",
      "event": "onAfterInstall",
      "script": "myapp/myapp_hook.ts",
      "entrypoint": "afterInstall",
      "timeout": 120,
      "description": "Setting up MyApp"
    }
  ]
}
```

### Inline Hook (community `scriptContent`)

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

::: tip Testing inline hooks
The `scriptContent` field is useful for **testing hooks via Custom Install in Expert Mode** — you can paste a V5 JSON with inline hooks directly into the editor and run it immediately. This is a development and testing workflow only; inline scripts submitted via PR go through the same review process as file-based hooks.
:::

## HookContext API

The `HookContext` object is passed to your hook function. It provides everything needed to interact with the installed app, report progress, and handle errors.

### Properties

| Property | Type | Description |
|---|---|---|
| `resourceType` | `string` | Always `"app"` (future: `"vm"`, etc.) |
| `resourceId` | `string` | The app ID (e.g., `"plex"`) |
| `event` | `string` | The triggering event (e.g., `"onAfterInstall"`) |
| `fromVersion` | `string?` | Previous app version (upgrade only) |
| `toVersion` | `string?` | Target app version (upgrade only) |
| `host` | `string?` | TrueNAS LAN IP address |
| `port` | `number?` | App's primary exposed port |
| `baseUrl` | `string` | `http://{host}:{port}` — empty string if unavailable |
| `inputs` | `Record<string, unknown>` | User-collected input values from [hook inputs](#hook-inputs) |

### Methods

#### Checkpoint Management

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

#### Error Handling

| Method | Description |
|---|---|
| `fail(message, context?)` | Throw a structured error. `context` is an array of `{ label, value }` pairs for diagnostic display. |
| `awaitCheckpointRetry(checkpointId, error, context?)` | Pause the hook at a failed checkpoint and wait for the user to click Retry or Skip. Returns `"retry"` or `"skip"`. |

#### Input Access

| Method | Description |
|---|---|
| `getInput<T>(inputId, schema?)` | Type-safe accessor for user-collected inputs. Throws if the input is missing. |

## Version Conditions

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

## Hook Inputs

Hooks can declare inputs that are collected from the user before the hook runs. The HexOS UI shows an input dialog when the hook enters the `AWAITING_INPUT` state.

### OAuth Input

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

### Question Input

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

## User Optional Hooks

Hooks with `userOptional` show a checkbox in the install dialog, letting the user decide whether to run the hook:

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

During upgrades, `userOptional` hooks are automatically excluded — only non-optional hooks run.

## Hook Execution Flow

### Install

1. User confirms install (with optional hook opt-ins)
2. `onBeforeInstall` hooks run sequentially (blocks app creation)
3. TrueNAS `app.create` executes
4. `onAfterInstall` hooks run sequentially (blocks task completion)
5. Parent install task completes when all required hooks finish

### Upgrade

Same pattern with `onBeforeUpgrade` and `onAfterUpgrade`. Only hooks matching the version [conditions](#version-conditions) run. `userOptional` hooks are excluded.

### Failure Handling

When a non-optional hook fails after all auto-retries:

1. The hook task enters `AWAITING_RETRY` state
2. The user sees Retry and Skip buttons in the activity center
3. **Retry** re-executes the hook from the beginning (or from the failed checkpoint if using `awaitCheckpointRetry`)
4. **Skip** marks the hook as skipped and allows the parent task to complete

Optional hooks (`optional: true`) are automatically skipped on failure without blocking the install.

## Checkpoint Retry Pattern

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

## Custom App Metadata

When `custom: true`, the `metadata` field is required:

```json
{
  "version": 5,
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

## Complete V5 Example

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
