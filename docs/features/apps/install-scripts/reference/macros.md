### Template Variables (Macros)

Install scripts support several template variables that are dynamically replaced during processing:

## `$LOCATION(LocationId)`
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

## `$SERVER_LAN_IP`
Resolves to the server's LAN IP address. Useful for constructing URLs that point to services running on the TrueNAS server.

**Example:**
```json
"additional_envs": [
  {
    "name": "ADVERTISE_IP",
    "value": "http://$SERVER_LAN_IP:32400"
  }
]
```

## `$SERVER_HOST_ID`
Resolves to the server's unique host ID. This is particularly useful for constructing HexOS Tunnels (e.g., `https://<host-id>.direct.hexos.com`) for remote tunneled access to your apps and services.

**Example:**
```json
{
  "value": "https://$SERVER_HOST_ID.direct.hexos.com"
}
```

## `$APP_INSTALLED(appName)`
Checks if a specific app is installed on the TrueNAS system. Returns `true` if installed, `false` otherwise. The check is case-insensitive.

**Example:**
```json
"$APP_INSTALLED(qbittorrent)"  // Returns "true" or "false"
```

## `$QUESTION(key)`
Accesses user responses from installation questions. The value is replaced with the user's response, which can be a boolean, string, number, or empty. When used in conditional expressions, values are converted appropriately:
- Boolean values become `"true"` or `"false"`
- Empty/null values become `"false"`
- String values are quoted unless they're "true" or "false"
- Numbers are converted to strings

**Examples:**
```json
"enabled": "$QUESTION(enable_feature)"  // Direct value replacement
"$IF($QUESTION(use_ssl), \"https\", \"http\")"  // Boolean check
"$IF($QUESTION(port) != \"\", $QUESTION(port), \"8080\")"  // Default value
```

## `$IF(condition, trueValue, [falseValue])`
Provides conditional logic in install scripts. Evaluates a condition and returns different values based on the result.

**Syntax Variations:**
1. **Basic if/else**: `$IF(condition, trueValue, falseValue)`
2. **If only**: `$IF(condition, trueValue)` - Returns empty string if false
3. **Multiple conditions with AND**: `$IF(['condition1', 'condition2'], trueValue, falseValue, 'AND')`
4. **Multiple conditions with OR**: `$IF(['condition1', 'condition2'], trueValue, falseValue, 'OR')`

**Supported Conditions:**
- Boolean literals: `true`, `false`
- Negation: `!condition`
- App installation checks: `$APP_INSTALLED(appName)`
- Question responses: `$QUESTION(key)`
- Equality comparison: `value1 == value2`
- Inequality comparison: `value1 != value2`

**Example:**
```json
"additional_storage": [
  "$IF($APP_INSTALLED(qbittorrent), '$MOUNTED_HOST_PATH($LOCATION(Downloads)/qbittorrent, /downloads)')",
  "$IF($QUESTION(use_qbittorent), '$MOUNTED_HOST_PATH($LOCATION(Downloads)/qbittorent, /downloads/transmission)')",
  ...
]
```
*Conditionally mounts download folders based on installed apps and user preferences*

#### `$MEMORY(percentage, minimum_mb)`
Dynamically allocates memory based on system resources. Takes the higher value between the percentage of system memory and the minimum specified in MB.

**Example:**
```json
"memory": "$MEMORY(10%, 2048)"
```
*This allocates either 10% of system memory or 2048MB, whichever is higher*

## `$HOST_PATH(path)`
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

## `$MOUNTED_HOST_PATH(host_path, container_path)`
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
