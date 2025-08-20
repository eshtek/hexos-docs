# Validation Pipeline

HexOS validates and processes an Install Script in this order:

1. **Parse JSON** – requires `"version": 1` and `app_values`.
2. **Replace Macros** – `$LOCATION`, `$RANDOM_STRING`, `"$HOST_PATH(...)"`, `"$MOUNTED_HOST_PATH(...)"`.
3. **Re-parse** – ensure the processed JSON matches the schema.
4. **Prepare FS** – create directories; apply default write perms for `apps` user; then enforce explicit `ensure_permissions_exists` entries.
5. **Install** – build `app.create` payload from `app_values` and submit the job.

On failures (unknown location key, malformed JSON after replacement, or TrueNAS validation), HexOS surfaces clear errors in the UI.
