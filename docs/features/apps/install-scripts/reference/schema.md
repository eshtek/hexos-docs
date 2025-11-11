### Install Script Schema

Install scripts are JSON objects with the following structure:

## Root Properties

- **`version`** (required): Schema version. Must be `1` or `2`.
- **`installation_questions`** (optional, introduced in version 2): Array of questions to ask the user during installation
- **`ensure_directories_exists`** (optional): Array of directories to create before installation
- **`ensure_permissions_exists`** (optional): Array of permission modifications for specific paths
- **`app_values`** (required): Configuration object passed directly to TrueNAS API

## Example Structure
```json
{
  "version": 2,
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
