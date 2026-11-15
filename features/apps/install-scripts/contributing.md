---
title: Contribute an app install script
description: Prepare, test and submit an app install script for the HexOS catalog.
published: true
date: 2026-10-19T00:00:00.000Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:39:57.416Z
---

# Contribute an app install script

Want to add your app curation to the official HexOS catalog? Install scripts now live in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository — this is the single source of truth for all curated and community install scripts.

## Contribution steps

1. Test your install script in HexOS using **Custom Install** in **Expert Mode**, and check the resulting app.
2. **Fork** the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository
3. **Add your install script** as a JSON file named after the TrueNAS app (e.g., `myapp.json`)
4. **If your script includes hooks** (V5 or V6), add the hook `.ts` files in a subdirectory (e.g., `myapp/myapp_hook.ts`) — or use inline `scriptContent` for simpler hooks
5. **Submit a Pull Request** with a description of:
   - What the app does
   - Any special requirements (unique mounts, GPU usage, special environment variables)
   - What the hooks do (if any)

## Repository structure

This example shows where files belong. The `myapp` files are placeholders.

```
hexos-app-catalog/
├── _lib/
│   └── hook_context.ts        # HookContext type stubs (import for autocompletion)
├── myapp.json                 # Your install script (V4, V5 or V6)
├── myapp/                     # Hook scripts directory (V5/V6, optional)
│   └── myapp_hook.ts          # Hook implementation
├── plex.json                  # Example: first-party script with hooks
├── plex/
│   └── plex_hook.ts
├── jellyfin.json              # Example: V6 script with hooks
└── ...
```

## Script format

- **V4**: Standard install scripts without hooks. Set `"version": 4`.
- **V5**: Install scripts with lifecycle hooks. Set `"version": 5` and add a `hooks` array.
- **V6**: One melded hook family — lifecycle automation, user-triggerable actions, cross-app links and widgets. Set `"version": 6`. See the [Hooks Reference](/features/apps/install-scripts/reference/hooks) for details.

All three are fully supported. Add hooks only if your app benefits from post-install automation.

## Using inline hooks (`scriptContent`)

The following is one declaration to add to the `hooks` array of a complete V5 install script. It is not a complete app configuration. Keep the required `script`, `requirements` and `app_values` fields. Replace `/health` with the health endpoint the app actually provides.

```json
{
  "id": "health-check",
  "event": "onAfterInstall",
  "scriptContent": "export async function setup(ctx) {\n  await ctx.registerCheckpoints([{ id: 'ready', message: 'Waiting for app' }]);\n  await ctx.waitForApp('/health');\n  await ctx.emitCheckpoint('ready');\n}",
  "entrypoint": "setup",
  "timeout": 120,
  "description": "Checking app health",
  "optional": true
}
```

> **Info:** Test the complete install script through **Custom Install** in **Expert Mode**. Test both installation and upgrades with a disposable app before submitting it. Inline and file-based hooks both need review.
{.is-info}

## Best practices

- Use the [Schema Reference](/features/apps/install-scripts/reference/schema) and [Macros Reference](/features/apps/install-scripts/reference/macros) to understand all available fields and template variables
- Browse existing scripts in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) for real-world examples
- Test thoroughly before submitting — both fresh installs and upgrades
- Keep hooks focused and use `optional: true` for non-critical automation
- Use `$LOCATION()` macros instead of hardcoded paths
- Declare `owner` on directories that need specific permissions

## Sharing before contributing

Not ready for a PR? Share your install script JSON in the [Applications forum on the HexOS Hub](https://hub.hexos.com/forum/8-applications/) to get feedback from other users first.
