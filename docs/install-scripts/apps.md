# Apps (Curated Scripts)

The install scripts we publish are **real-world examples** of how to use HexOS Install Scripts with TrueNAS `app.create` values and macros and our current curation lists.

These JSON files live in the repository under:

```
docs/public/install-scripts/
```

and are automatically indexed on this page by the generator script.

---

## How to understand these

1. Download one of the curated JSON files below (or open the raw URL).
2. In HexOS, open the **Install Script** UI and paste the JSON.
3. Validate and run the install. HexOS will:
   - create required directories (`ensure_directories_exists`),
   - set permissions (`ensure_permissions_exists`),
   - and submit your chart values to TrueNAS via `app.create`.

If you’re new to the script format, read: [/install-scripts/intro](/install-scripts/intro), [/install-scripts/macros](/install-scripts/macros), and [/install-scripts/validation](/install-scripts/validation).

---

## Walkthrough: Jellyfin (what to look for)

- **Storage layout** using `$LOCATION(...)`, wrapped in `$HOST_PATH(...)`
- **Additional mounts** via `$MOUNTED_HOST_PATH(...)` to expose media
- **Ports** (8096/8920) defined in values
- **Conservative resources** (CPU/memory) you can adjust later

**Direct download:** [/install-scripts/jellyfin.json](/install-scripts/jellyfin.json)
## Contributing a new app

1. Add your JSON file to `docs/public/install-scripts/` (e.g., `jellyfin.json`).  
2. Run `npm run gen:curated` to refresh this page.  
3. In your PR description, include a short note about what your example demonstrates (unique mounts, GPU usage, special env, etc.).


<!-- curated:index:start -->
| App | Download | Size | Last Modified |
|---|---|---:|---|
| `home-assistant` | [home-assistant.json](/install-scripts/home-assistant.json) | 1.0 KB | 2025-08-20 |
| `immich` | [immich.json](/install-scripts/immich.json) | 2.3 KB | 2025-08-20 |
| `jellyfin` | [jellyfin.json](/install-scripts/jellyfin.json) | 1.6 KB | 2025-08-20 |
| `minecraft` | [minecraft.json](/install-scripts/minecraft.json) | 460 B | 2025-08-20 |
| `plex` | [plex.json](/install-scripts/plex.json) | 1.6 KB | 2025-08-20 |
| `postgres` | [postgres.json](/install-scripts/postgres.json) | 716 B | 2025-08-20 |
| `qbittorrent` | [qbittorrent.json](/install-scripts/qbittorrent.json) | 473 B | 2025-08-20 |
| `wg-easy` | [wg-easy.json](/install-scripts/wg-easy.json) | 317 B | 2025-08-20 |
<!-- curated:index:end -->
