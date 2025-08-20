# Macros & Variables

Install Scripts support macros resolved at install time.

| Macro | Description |
|------|-------------|
| `$LOCATION(<LocationPreferenceId>)` | Expands to a user-configured path (e.g. `/mnt/tank/apps-performance`). |
| `$HOST_PATH(<path>)` | Produces a hostPath object for chart storage values (must be a quoted string for replacement). |
| `$MOUNTED_HOST_PATH(<src>, <dest>)` | Produces a hostPath mount bound to container path `<dest>` (quoted string before replacement). |
| `$RANDOM_STRING(n)` | Generates an n-length random alphanumeric string. |
| `$TIMEZONE` | System time zone (substituted in values). |

**Important**: `$HOST_PATH(...)` and `$MOUNTED_HOST_PATH(...)` must be **quoted** so the processor can replace them with JSON objects.
