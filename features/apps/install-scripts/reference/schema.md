---
title: Install Script Schema
description: 
published: true
date: 2026-06-30T17:22:44.697Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:40:16.156Z
---

# Install Script Schema

Install scripts are JSON objects with the following structure. Scripts can use various macros (template variables) that are dynamically replaced during processing.

::: tip Source of Truth
Install scripts live in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository. See [Contributing](/features/apps/install-scripts/contributing) for how to submit new scripts.
:::

## Root Properties

- **`version`** (required): Schema version. Must be `4` or `5`. Versions 1-3 are deprecated. Use `5` if your script includes lifecycle hooks; otherwise `4` is fine.
- **`custom`** (optional): Set to `true` for community/custom apps that aren't in the default TrueNAS catalog
- **`internal`** (optional): Set to `true` for dev/test apps — hidden in production
- **`metadata`** (required if `custom: true`): Custom app metadata (see [Custom App Metadata](#custom-app-metadata))
- **`script`** (required): Metadata about the install script itself
  - **`version`** (required): Semantic version of this install script (e.g., "1.0.0", "2.1.3")
  - **`updateCompatibility`** (optional): Semver range expression defining which script versions can update to this version (e.g., ">=1.0.0" allows updates from any version 1.0.0 or higher, "^2.0.0" allows updates from 2.x.x versions). Supports all [semver range syntax](https://www.npmjs.com/package/semver#ranges) including `>=`, `>`, `<`, `<=`, `^`, `~`, and complex ranges like `">=1.0.0 <3.0.0"`
  - **`changeLog`** (optional): Description of changes in this version of the script
- **`requirements`** (required): System requirements that are validated before installation
- **`installation_questions`** (optional): Array of questions to ask the user during installation
- **`ensure_directories_exists`** (optional): Array of directory entry objects to create before installation, with optional ownership and snapshot declarations
- **`app_values`** (required): Configuration object passed directly to TrueNAS API
- **`hooks`** (optional, V5 only): Array of lifecycle hook declarations. See [Hooks Reference](/features/apps/install-scripts/reference/hooks)

## Available Macros

Install scripts support various macros that are replaced dynamically during script processing:

### Basic Macros
- **`$SERVER_LAN_IP`**: Server's LAN IP address
- **`$SERVER_HOST_ID`**: Server's unique host ID
- **`$LOCATION(locationId)`**: Resolves to configured location path
- **`$RANDOM_STRING(length)`**: Generates random alphanumeric string
- **`$MEMORY(percentage, minimum_mb)`**: Calculates memory allocation
- **`$HOST_PATH(path)`**: Creates host path configuration object
- **`$MOUNTED_HOST_PATH(path, mount_point)`**: Creates mounted host path configuration

### Conditional Macros
- **`$APP_INSTALLED(appName)`**: Returns "true" or "false" if app is installed
- **`$QUESTION(key)`**: References user's response to installation question
- **`$IF(condition, trueValue, [falseValue])`**: Conditional logic with support for:
  - Boolean literals: `true`, `false`
  - Negation: `!condition`
  - App checks: `$APP_INSTALLED(appName)`
  - Question values: `$QUESTION(key)`
  - Equality: `value1 == value2`
  - Inequality: `value1 != value2`
  - AND logic: `$IF(["condition1", "condition2"], trueValue, falseValue, "AND")`
  - OR logic: `$IF(["condition1", "condition2"], trueValue, falseValue, "OR")`

For detailed macro documentation and examples, see the [Macros Reference](/features/apps/install-scripts/reference/macros).

## Custom App Metadata

When `custom: true`, the `metadata` object is required:

| Property | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Display name in the HexOS app store |
| `description` | string | Yes | Brief description of what the app does |
| `icon` | string | Yes | URL to the app's icon (SVG or PNG) |
| `version` | string | Yes | Semantic version of the custom app |

## Example Structure

For complete, working examples of install scripts, browse the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository. These production-ready scripts demonstrate best practices and real-world usage patterns for popular applications like Plex, Jellyfin, Immich, and more.

## Requirements

The `requirements` object defines system requirements that HexOS validates before allowing app installation. This ensures users have properly configured their system with the necessary locations, resources, and permissions.

**Requirements Object Properties:**
- **`locations`** (array): Required folder locations that must be configured in HexOS Settings
- **`specifications`** (array): Minimum hardware/resource specifications needed
- **`permissions`** (array): Special permissions the app needs
- **`ports`** (array): Network ports that must be available

### Locations

Locations are folder paths configured in HexOS Settings → Locations. Each location maps to a specific use case:

**Available Locations:**
- `ApplicationsPerformance`: High-performance storage for app data (typically SSD)
- `ApplicationsCapacity`: High-capacity storage for app data (typically HDD)
- `Media`: General media files
- `Photos`: Photo library storage
- `Music`: Music library storage
- `Movies`: Movie library storage
- `Shows`: TV show library storage
- `Videos`: Video library storage
- `Downloads`: Download directory
- `Documents`: Document storage
- `Backups`: Backup storage

**Important:** Every `$LOCATION()` macro used anywhere in your install script (in `ensure_directories_exists`, `app_values`, etc.) must be listed in the `locations` requirements array.

**Example:**
```json
{
  "requirements": {
    "locations": ["ApplicationsPerformance", "Photos", "Media"]
  },
  "ensure_directories_exists": [
    { "path": "$LOCATION(ApplicationsPerformance)/immich/config", "owner": { "user": "apps" } },
    { "path": "$LOCATION(Photos)/immich", "owner": { "user": "apps" } }
  ],
  "app_values": {
    "storage": {
      "config": "$HOST_PATH($LOCATION(ApplicationsPerformance)/immich/config)",
      "photos": "$HOST_PATH($LOCATION(Photos)/immich)",
      "additional_storage": [
        "$MOUNTED_HOST_PATH($LOCATION(Media), /media)"
      ]
    }
  }
}
```

### Specifications

Hardware and resource specifications ensure the system meets minimum requirements:

**Available Specifications:**
- `100MB`, `200MB`, `500MB`, `1GB`, `2GB`: Minimum storage space needed
- `1CORE`, `2CORE`, `4CORE`, `8CORE`: Minimum CPU cores required
- `GPU`: Requires GPU hardware (for transcoding, ML, etc.)

**Example:**
```json
{
  "requirements": {
    "specifications": ["2CORE", "200MB", "GPU"]
  }
}
```

### Permissions

Special permissions that the app requires to function:

**Available Permissions:**
- `READ_WRITE_LOCATIONS`: App needs read/write access to configured locations

**Example:**
```json
{
  "requirements": {
    "permissions": ["READ_WRITE_LOCATIONS"]
  }
}
```

### Ports

Network ports that the application will use. HexOS can validate port availability before installation.

**Example:**
```json
{
  "requirements": {
    "ports": [8080, 8443]
  }
}
```

### Complete Requirements Example

```json
{
  "version": 4,
  "requirements": {
    "locations": [
      "ApplicationsPerformance",
      "ApplicationsCapacity",
      "Media",
      "Photos",
      "Music",
      "Movies",
      "Shows",
      "Videos"
    ],
    "specifications": ["2CORE", "200MB", "GPU"],
    "permissions": ["READ_WRITE_LOCATIONS"],
    "ports": [32400]
  }
}
```

### Requirements Validation

When users attempt to install an app, HexOS performs the following checks:

1. **Location Validation**: Verifies that all required locations are configured in Settings → Locations
   - If a location is not configured, it will be marked as "unmet"
   - Users must configure missing locations before installation can proceed
   - The install script's `ensure_directories_exists` will create subdirectories within configured locations

2. **Specifications Check**: Validates system meets minimum hardware requirements (coming soon)

3. **Permissions Check**: Confirms the app has necessary permissions (coming soon)

4. **Port Availability**: Validates required ports are available (coming soon)

**Important**: The `ensure_directories_exists` section of your install script will only create subdirectories and files. It does **not** create the base location paths themselves. Users must configure these locations in HexOS Settings first, and your requirements validation ensures this happens before installation begins.

## Installation Questions

Installation questions allow you to prompt users for configuration values during app installation. Question responses can be referenced in `app_values` using the `$QUESTION(key)` syntax.

![installation-questions-example.png](/installation-questions-example.png =750x){.align-center}

*Example of installation questions displayed during app installation*

**Question Object Properties:**
- **`question`** (required): The question text shown to the user
- **`description`** (optional): Additional help text explaining the question
- **`placeholder`** (optional): Placeholder text for input fields
- **`type`** (required): Question type - one of:
  - `"text"`: Text input field
  - `"number"`: Numeric input field
  - `"select"`: Dropdown/selection with predefined options
  - `"boolean"`: True/false toggle
- **`key`** (required): Unique identifier used to reference the answer with `$QUESTION(key)`
- **`options`** (required for `select` type): Array of option objects with `text` and `value` properties
- **`required`** (optional): Whether the question must be answered (default: false)
- **`default`** (optional): Default value or special syntax like `$RANDOM_STRING(16)`

**Using Question Responses:**

Reference question responses in your `app_values` using the `$QUESTION(key)` syntax:
```json
{
  "installation_questions": [
    {
      "question": "Web Port",
      "type": "number",
      "key": "web_port",
      "default": 8080
    }
  ],
  "app_values": {
    "network": {
      "web_port": {
        "port_number": "$QUESTION(web_port)"
      }
    }
  }
}
```

**Using Questions in Conditionals:**

Question responses can be used in conditional logic with the `$IF` macro. See the [$IF macro documentation](/features/apps/install-scripts/reference/macros#if-condition-truevalue-falsevalue) for examples of using questions in conditional expressions.

## Directory Creation, Ownership, and Snapshots

Each entry in `ensure_directories_exists` is an object with the following properties:

- `path` (required): Directory path, typically using `$LOCATION()` macros
- `network_share` (optional): Boolean, whether to expose as a network share
- `owner` (optional): Object specifying the TrueNAS user and group that should own this directory
  - `user` (required): TrueNAS username (e.g., `"apps"`, `"netdata"`)
  - `group` (optional): TrueNAS group name (e.g., `"docker"`). If omitted, uses the user's default group
- `snapshot` (optional): Object with an `id` field. When present, HexOS snapshots this dataset before app updates so support can assist with restoring your application and data if something goes wrong
  - `id` (required): Identifier included in the snapshot name and metadata (e.g., `"db"`, `"config"`)

**Example:**
```json
{
  "ensure_directories_exists": [
    { "path": "$LOCATION(Photos)", "network_share": true },
    { "path": "$LOCATION(ApplicationsPerformance)", "network_share": true },
    { "path": "$LOCATION(Photos)/immich", "owner": { "user": "apps" }, "snapshot": { "id": "data" } },
    { "path": "$LOCATION(ApplicationsPerformance)/immich/postgres_data", "owner": { "user": "netdata", "group": "docker" }, "snapshot": { "id": "db" } },
    { "path": "$LOCATION(ApplicationsPerformance)/immich/config", "owner": { "user": "apps" }, "snapshot": { "id": "config" } }
  ]
}
```

**How `owner` works:**
- HexOS calls `user.get_user_obj` and optionally `group.get_group_obj` on the TrueNAS system to resolve usernames and group names to numeric uid/gid
- After `app.update` completes, HexOS verifies and repairs ownership on declared paths if TrueNAS changed it
- If a path has a POSIX1E ACL (legacy), HexOS automatically migrates it to NFS4 with `aclmode: PASSTHROUGH`, snapshots the dataset first as a rollback point, then applies the canonical ACL with the declared uid/gid
- Only applies to app-specific paths (4+ path segments, e.g., `/mnt/pool/location/app/data`) — location roots are never modified
- Paths without `owner` are created with default permissions and not tracked for repair

**How `snapshot` works:**
- Before any app update, HexOS snapshots each dataset with a `snapshot` config so support can assist with restoring your application and data if something goes wrong
- Snapshots are named `hexos-app-{appId}-{id}-{timestamp}` and stamped with metadata: `hexos:purpose`, `hexos:app`, `hexos:snapshot_id`, `hexos:path`
- Only the latest 3 snapshots per app per dataset are kept — older snapshots are automatically pruned after each new snapshot
- Only applies to app-specific paths (4+ path segments) — location roots are never snapshotted

## App Values
This object is passed directly to TrueNAS's app installation API. The structure varies by application and corresponds to the app's configuration schema in the [TrueNAS apps repository](https://github.com/truenas/apps). For example, you can see Plex's schema for the `storage` property [here](https://github.com/truenas/apps/blob/1d2a6e9811f9af2ceae6529cc094a432a7da4e96/trains/stable/plex/app_versions.json#L422).

### Conditional Configuration

Install scripts support conditional logic to customize app configuration based on:
- Other installed apps using [`$APP_INSTALLED(appName)`](/features/apps/install-scripts/reference/macros#app_installedappname)
- User responses to installation questions using [`$QUESTION(key)`](/features/apps/install-scripts/reference/macros#questionkey)
- Complex conditions using the [`$IF`](/features/apps/install-scripts/reference/macros#if-condition-truevalue-falsevalue) macro
