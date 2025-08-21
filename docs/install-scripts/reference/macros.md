# Macros Catalog (canonical)

> This is the complete list for schema v1. CI fails if a curated script uses a macro not listed here.

| Macro | Purpose | Input | Output type | Example input | Example expansion | Quoted? | Common errors |
|---|---|---|---|---|---|---|---|
| `$LOCATION(<key>)` | Resolve user path by key | key | string | `$LOCATION(apps)` | `/mnt/tank/apps` | No | Unknown key |
| `$HOST_PATH(<path>)` | Host path object | path | JSON | `"$HOST_PATH(/mnt/data/app)"` | `{ "type": "hostPath", "hostPath": "/mnt/data/app" }` | Yes | Missing quotes |
| `$MOUNTED_HOST_PATH(<src>,<dest>)` | Bind mount | src,dest | JSON | `"$MOUNTED_HOST_PATH(/mnt/media,/media)"` | `{ "type": "hostPath", "hostPath": "/mnt/media", "mountPath": "/media" }` | Yes | Arg order |
| `$RANDOM_STRING(<n>)` | Generate secret | n | string | `$RANDOM_STRING(16)` | `af3D…` | No | Non-integer |
| `$TIMEZONE` | System timezone | — | string | `$TIMEZONE` | `America/New_York` | No | Unset |

> Add new rows here when you introduce a new macro. The CI check compares this table against curated usage.
