# Preferences

HexOS uses **Location Preferences** to resolve `$LOCATION(...)` macros:

- `ApplicationsPerformance`
- `ApplicationsCapacity`
- `Media`, `Photos`, `Music`, `Movies`, `Shows`, `Videos`

Example: `$LOCATION(Photos)` → `/mnt/tank/photos` (actual path depends on user settings).
Always use macros (not hard-coded paths) to keep scripts portable.
