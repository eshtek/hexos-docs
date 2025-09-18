### Install Script Schema

Install scripts are JSON objects with the following structure:

#### Root Properties

- **`version`** (required): Must be `1` currently. Used for future migration compatibility.
- **`ensure_directories_exists`** (optional): Array of directories to create before installation
- **`ensure_permissions_exists`** (optional): Array of permission modifications for specific paths
- **`app_values`** (required): Configuration object passed directly to TrueNAS API

#### Basic Example Structure
```json
{
  "version": 1,
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
    // TrueNAS app configuration
    // Structure varies by application
  }
}
```

#### Directory Creation (`ensure_directories_exists`)
- **String format**: Simple path string
- **Object format**: 
  - `path`: Directory path (required)
  - `network_share`: Boolean, whether to expose as network share
  - `posix`: Boolean, whether to use POSIX permissions

#### Permission Management (`ensure_permissions_exists`)
Required for apps that need specific user/group permissions (like PostgreSQL).
- `path`: Directory path to modify
- `username`: User to grant access to
- `access`: Access level ("read", "write", etc.)
- `posix`: Object with additional POSIX settings (e.g., `groupname`)

#### App Values (`app_values`)
This object is passed directly to TrueNAS's app installation API. The structure varies by application and corresponds to the app's configuration schema in the [TrueNAS apps repository](https://github.com/truenas/apps). For example, you can see Plex's schema for the `storage` property [here](https://github.com/truenas/apps/blob/1d2a6e9811f9af2ceae6529cc094a432a7da4e96/trains/stable/plex/app_versions.json#L422).
