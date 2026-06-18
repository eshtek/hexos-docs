# Contributing a New App

Want to add your app curation to the official HexOS catalog? Install scripts now live in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository — this is the single source of truth for all curated and community install scripts.

## Contribution Steps

1. **Test your install script** in HexOS using Custom Install (Expert Mode) and verify it works reliably
2. **Fork** the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository
3. **Add your install script** as a JSON file named after the TrueNAS app (e.g., `myapp.json`)
4. **If your script includes hooks** (V5), add the hook `.ts` files in a subdirectory (e.g., `myapp/myapp_hook.ts`) — or use inline `scriptContent` for simpler hooks
5. **Submit a Pull Request** with a description of:
   - What the app does
   - Any special requirements (unique mounts, GPU usage, special environment variables)
   - What the hooks do (if V5)

## Repository Structure

```
hexos-app-catalog/
├── _lib/
│   └── hook_context.ts        # HookContext type stubs (import for autocompletion)
├── myapp.json                 # Your install script (V4 or V5)
├── myapp/                     # Hook scripts directory (V5 only, optional)
│   └── myapp_hook.ts          # Hook implementation
├── plex.json                  # Example: first-party V5 with hooks
├── plex/
│   └── plex_hook.ts
├── jellyfin.json              # Example: V4 script (no hooks)
└── ...
```

## Script Format

- **V4**: Standard install scripts without hooks. Set `"version": 4`.
- **V5**: Install scripts with lifecycle hooks. Set `"version": 5` and add a `hooks` array. See the [Hooks Reference](/features/apps/install-scripts/reference/hooks) for details.

Both formats are fully supported. Use V5 only if your app benefits from post-install automation.

## Using Inline Hooks (`scriptContent`)

Community contributors who don't need separate `.ts` files can embed hook code directly in the JSON using the `scriptContent` field. This keeps everything in a single file:

```json
{
  "version": 5,
  "custom": true,
  "metadata": { "name": "My App", "description": "...", "icon": "...", "version": "1.0.0" },
  "hooks": [
    {
      "id": "health-check",
      "event": "onAfterInstall",
      "scriptContent": "export async function setup(ctx) {\n  await ctx.waitForApp('/health');\n  await ctx.emitCheckpoint('ready');\n}",
      "entrypoint": "setup",
      "timeout": 60,
      "description": "Post-install health check",
      "optional": true
    }
  ]
}
```

::: tip Testing with Custom Install
You can test inline hook scripts using **Custom Install in Expert Mode** — paste your V5 JSON with `scriptContent` hooks directly into the editor and run it. This is useful for development and testing before submitting a PR. Inline scripts should not be part of a PR submission for testing purposes only — submit them when they're ready for production use.
:::

## Best Practices

- Use the [Schema Reference](/features/apps/install-scripts/reference/schema) and [Macros Reference](/features/apps/install-scripts/reference/macros) to understand all available fields and template variables
- Browse existing scripts in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) for real-world examples
- Test thoroughly before submitting — both fresh installs and upgrades
- Keep hooks focused and use `optional: true` for non-critical automation
- Use `$LOCATION()` macros instead of hardcoded paths
- Declare `owner` on directories that need specific permissions

## Sharing Before Contributing

Not ready for a PR? Share your install script JSON in the [HexOS Community Forums](https://forums.hexos.com) to get feedback from other users first.
