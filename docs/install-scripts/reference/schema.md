# HexOS Install Script Schema (v1)

This page defines the **Install Script** JSON that HexOS uses to:
1. Prepare storage (create folders, set permissions)
2. Generate the TrueNAS **`app.create`** payload (`values`) for catalog app installation

---

## Why a schema?

Install Scripts let us keep app setups **portable, reproducible, and reviewable**. Authors write a small, declarative JSON file; HexOS resolves macros (e.g., `$LOCATION(...)`, `$HOST_PATH(...)`), ensures paths/permissions, and then calls TrueNAS `app.create` with the resulting chart `values`.

---

## Top-level structure

```jsonc
{
  "version": 1,
  "ensure_directories_exists": [],
  "ensure_permissions_exists": [],
  "app_values": {}
}
```

### Fields

- **version** (number, required)  
  Schema version. Currently must be `1`.

- **ensure_directories_exists** (array of strings, optional)  
  Paths to ensure exist on your server the app will require.  
  
- **ensure_permissions_exists** (array of objects, optional)  
  Ensures Unix-like ownership/permissions.  
  
- **app_values** (object, required)  
  Raw Helm values passed to `app.create` (https://api.truenas.com/v25.04.1/api_methods_app.create.html)

### Example (Immich)
```
{
  "version": 1,
  "ensure_directories_exists": [
    {
      "path": "$LOCATION(ApplicationsPerformance)",
      "network_share": true
    },
    {
      "path": "$LOCATION(ApplicationsCapacity)",
      "network_share": true
    },
    {
      "path": "$LOCATION(Photos)",
      "network_share": true
    },
    {
      "path": "$LOCATION(Music)",
      "network_share": true
    },
    {
      "path": "$LOCATION(Movies)",
      "network_share": true
    },
    {
      "path": "$LOCATION(Shows)",
      "network_share": true
    },
    {
      "path": "$LOCATION(Videos)",
      "network_share": true
    },
    "$LOCATION(ApplicationsCapacity)/immich/data",
    {
      "path": "$LOCATION(ApplicationsPerformance)/immich/postgres_data",
      "posix": true
    }
  ],
  "ensure_permissions_exists": [
    {
      "path": "$LOCATION(ApplicationsPerformance)/immich/postgres_data",
      "username": "netdata",
      "access": "read",
      "posix": {
        "groupname": "docker"
      }
    }
  ],
  "app_values": {
    "release_name": "immich",
    "immich": {
      "enable_ml": true,
      "ml_image_selector": "ml_image",
      "db_password": "$RANDOM_STRING(7)",
      "redis_password": "$RANDOM_STRING(7)",
      "log_level": "log",
      "hugging_face_endpoint": "",
      "db_storage_type": "SSD",
      "additional_envs": []
    },
    "network": {},
    "storage": {
      "use_old_storage_config": false,
      "data": "$HOST_PATH($LOCATION(ApplicationsCapacity)/immich/data)",
      "ml_cache": {
        "type": "temporary"
      },
      "postgres_data": "$HOST_PATH($LOCATION(ApplicationsPerformance)/immich/postgres_data)",
      "additional_storage": [
        {
          "type": "host_path",
          "read_only": false,
          "mount_path": "/photos",
          "host_path_config": {
            "acl_enable": true,
            "acl": {
              "path": "$LOCATION(Photos)",
              "entries": [
                {
                  "id_type": "USER",
                  "id": 568,
                  "access": "FULL_CONTROL"
                }
              ],
              "options": {
                "force": true
              }
            }
          }
        }
      ]
    },
    "resources": {
      "limits": {
        "cpus": 2,
        "memory": 4096
      },
      "gpus": {
        "use_all_gpus": true
      }
    }
  }
}
```

