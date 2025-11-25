### Install Script Schema

Install scripts are JSON objects with the following structure:

## Root Properties

- **`version`** (required): Schema version. Must be `1` or `2`.
- **`requirements`** (optional): System requirements that are validated before installation
- **`installation_questions`** (optional, introduced in version 2): Array of questions to ask the user during installation
- **`ensure_directories_exists`** (optional): Array of directories to create before installation
- **`ensure_permissions_exists`** (optional): Array of permission modifications for specific paths
- **`app_values`** (required): Configuration object passed directly to TrueNAS API

## Example Structure
```json
{
  "version": 2,
  "requirements": {
    "locations": ["ApplicationsPerformance", "Photos"],
    "specifications": ["2CORE", "200MB"],
    "permissions": ["READ_WRITE_LOCATIONS"],
    "ports": []
  },
  "installation_questions": [
    {
      "question": "Database Password",
      "description": "A secure password for the PostgreSQL database.",
      "type": "text",
      "key": "db_password",
      "required": true,
      "default": "$RANDOM_STRING(16)"
    },
    {
      "question": "Enable GPU acceleration for machine learning?",
      "description": "GPU acceleration significantly improves photo recognition speed but requires compatible hardware.",
      "type": "select",
      "key": "gpu_passthrough",
      "required": true,
      "options": [
        {
          "text": "Yes - Use GPU for faster photo recognition",
          "value": true
        },
        {
          "text": "No - Use CPU only",
          "value": false
        }
      ],
      "default": false
    },
    {
      "question": "Web Port",
      "description": "The port number where the web interface will be accessible.",
      "placeholder": "2283",
      "type": "number",
      "key": "web_port",
      "required": false,
      "default": 2283
    }
  ],
  "ensure_directories_exists": [
    "/path/to/directory",
    {
      "path": "/path/with/options",
      "network_share": true,
      "posix": true
    }
  ],
  "ensure_permissions_exists": [
    {
      "path": "/path/to/set/permissions",
      "username": "netdata",
      "access": "read",
      "posix": { "groupname": "docker" }
    }
  ],
  "app_values": {
    "network": {
      "web_port": {
        "bind_mode": "published",
        "port_number": "$QUESTION(web_port)"
      }
    },
    "resources": {
      "gpus": {
        "use_all_gpus": "$QUESTION(gpu_passthrough)"
      }
    }
  }
}
```

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
    "$LOCATION(ApplicationsPerformance)/immich/config",
    "$LOCATION(Photos)/immich"
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
  "version": 2,
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

![Installation Questions UI](/assets/screenshots/installation-questions-example.png)

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

## Directory Creation
- **String format**: Simple path string
- **Object format**: 
  - `path`: Directory path (required)
  - `network_share`: Boolean, whether to expose as network share
  - `posix`: Boolean, whether to use POSIX permissions

## Permission Management
Required for apps that need specific user/group permissions (like PostgreSQL).
- `path`: Directory path to modify
- `username`: User to grant access to
- `access`: Access level ("read", "write", etc.)
- `posix`: Object with additional POSIX settings (e.g., `groupname`)

## App Values
This object is passed directly to TrueNAS's app installation API. The structure varies by application and corresponds to the app's configuration schema in the [TrueNAS apps repository](https://github.com/truenas/apps). For example, you can see Plex's schema for the `storage` property [here](https://github.com/truenas/apps/blob/1d2a6e9811f9af2ceae6529cc094a432a7da4e96/trains/stable/plex/app_versions.json#L422).
