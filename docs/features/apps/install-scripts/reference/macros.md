### Template Variables (Macros)

Install scripts support several template variables that are dynamically replaced during processing:

#### `$LOCATION(LocationId)`
Resolves to user-configured or default paths for common directories.

**Available Location IDs:**
- `ApplicationsPerformance` - High-performance storage for app data
- `ApplicationsCapacity` - High-capacity storage for app data  
- `Downloads` - Download directory
- `Documents` - Documents directory
- `Media` - General media storage
- `Photos` - Photo storage
- `Music` - Music storage
- `Movies` - Movie storage
- `Shows` - TV show storage
- `Videos` - Video storage
- `VirtualizationPerformance` - High-performance VM storage
- `VirtualizationCapacity` - High-capacity VM storage
- `InstallMedia` - Installation media storage
- `VirtualDisks` - Virtual disk storage

**Example:**
```json
"path": "$LOCATION(ApplicationsPerformance)/plex/data"
```

#### `$RANDOM_STRING(length)`
Generates a random alphanumeric string of specified length. Useful for passwords, keys, and database names.

**Example:**
```json
"password": "$RANDOM_STRING(12)"
```

#### `$MEMORY(percentage, minimum_mb)`
Dynamically allocates memory based on system resources. Takes the higher value between the percentage of system memory and the minimum specified in MB.

**Example:**
```json
"memory": "$MEMORY(10%, 2048)"
```
*This allocates either 10% of system memory or 2048MB, whichever is higher*

#### `$HOST_PATH(path)`
Creates a TrueNAS host path configuration object for predefined storage options.

**Example:**
```json
"storage": {
  "data": "$HOST_PATH($LOCATION(ApplicationsPerformance)/app/data)"
}
```

**Expands to:**
```json
"storage": {
  "data": {
    "type": "host_path",
    "host_path_config": {
      "acl_enable": false,
      "path": "/mnt/pool/apps/app/data"
    }
  }
}
```

#### `$MOUNTED_HOST_PATH(host_path, container_path)`
Creates a TrueNAS host path configuration for additional storage mounts, mapping a host directory to a container path.

**Example:**
```json
"additional_storage": [
  "$MOUNTED_HOST_PATH($LOCATION(Movies), /movies)",
  "$MOUNTED_HOST_PATH($LOCATION(Shows), /shows)"
]
```

**Expands to:**
```json
"additional_storage": [
  {
    "type": "host_path",
    "read_only": false,
    "mount_path": "/movies",
    "host_path_config": {
      "acl_enable": false,
      "path": "/mnt/pool/movies"
    }
  }
]
```
