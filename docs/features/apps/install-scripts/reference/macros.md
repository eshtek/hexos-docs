# Template Variables (Macros)

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

## `$GPU_CONFIG()`
Automatically detects and configures GPU resources for applications. The macro queries the system's available GPUs and generates the appropriate TrueNAS GPU configuration object.

**Basic Usage:**
```json
"resources": {
  "gpus": "$GPU_CONFIG()"
}
```

**Conditional Usage:**
```json
"gpus": "$IF($QUESTION(enable_gpu), '$GPU_CONFIG()', {'use_all_gpus': false})"
```

**Detected Configurations & Expanded Values:**

**No GPU detected:**
```json
// System has no GPUs
"$GPU_CONFIG()" → {"use_all_gpus": false}
```

**Intel integrated GPU detected:**
```json
// System has Intel UHD Graphics 770
"$GPU_CONFIG()" → {"use_all_gpus": true}
```

**AMD GPU detected:**
```json
// System has AMD Radeon RX 6700 XT
"$GPU_CONFIG()" → {"use_all_gpus": true}
```

**Single NVIDIA GPU detected (with drivers):**
```json
// System has NVIDIA RTX 4090
"$GPU_CONFIG()" → {
  "use_all_gpus": true,
  "nvidia_gpu_selection": {
    "0000:01:00.0": {
      "use_gpu": true,
      "uuid": "GPU-8a5f3c21-b4e9-4d72-a123-456789abcdef"
    }
  }
}
```

**Multiple NVIDIA GPUs detected (with drivers):**
```json
// System has 2x NVIDIA RTX A4000
"$GPU_CONFIG()" → {
  "use_all_gpus": true,
  "nvidia_gpu_selection": {
    "0000:01:00.0": {
      "use_gpu": true,
      "uuid": "GPU-1a2b3c4d-5e6f-7890-abcd-ef1234567890"
    },
    "0000:02:00.0": {
      "use_gpu": true,
      "uuid": "GPU-9f8e7d6c-5b4a-3210-fedc-ba0987654321"
    }
  }
}
```

**Mixed GPUs (Intel + NVIDIA with drivers):**
```json
// System has Intel UHD 770 + NVIDIA RTX 3060
"$GPU_CONFIG()" → {
  "use_all_gpus": true,
  "nvidia_gpu_selection": {
    "0000:03:00.0": {
      "use_gpu": true,
      "uuid": "GPU-7c8d9e0f-1a2b-3c4d-5e6f-789012345678"
    }
  }
}
```

**NVIDIA GPU without drivers (falls back to disabled):**
```json
// System has NVIDIA GPU but drivers not installed
"$GPU_CONFIG()" → {"use_all_gpus": false}
```

**Common Use Cases:**
- **Media Servers**: Plex, Jellyfin, Emby (hardware transcoding)
- **AI/ML Applications**: Ollama, Stable Diffusion, ComfyUI
- **Photo Management**: Immich (ML face detection)
- **Video Processing**: Handbrake, FFmpeg-based apps
- **Game Streaming**: Sunshine, Steam Link

**NVIDIA Driver Update Steps:**
NVIDIA drivers were installed already if this was a fresh install, however if this system was adopted or for whatever reason they require manual updating of the drivers from within the TrueNAS ui they can perform the following:

1. Apps → Settings (gear icon) → Advanced Settings
2. Toggle "Enable GPU Support" or "NVIDIA Runtime" OFF → Save
3. Wait 10-30 seconds
4. Toggle back ON → Save
5. This triggers a `docker.update` with latest compatible NVIDIA drivers

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
  "$IF($APP_INSTALLED(sabnzbd), '$MOUNTED_HOST_PATH($LOCATION(Downloads)/sabnzbd, /downloads)')",  
  "$IF($QUESTION(use_qbittorent), '$MOUNTED_HOST_PATH($LOCATION(Downloads)/qbittorent, /downloads/qbittorent)')",
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
