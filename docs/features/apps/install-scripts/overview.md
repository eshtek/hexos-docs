# Install Scripts Overview

## What are Install Scripts?

Install scripts are a curated, turnkey solution for installing applications through TrueNAS in an opinionated "one-click" way. They eliminate the need for users to manually configure networking, resources, folders, and other technical settings by providing pre-configured, best-practice templates.

### Key Benefits
- **No manual configuration required** - Networking, resources, and folders are automatically configured
- **Best practices built-in** - All configurations follow recommended settings
- **One-click installation** - Simplified installation process
- **Curated experience** - Apps are pre-tested and optimized
- **Post-install automation** - Lifecycle hooks can handle app setup after installation (V5)

### Current Capabilities
- Configures all fields that TrueNAS exposes during app installation
- Automatically sets up directory structures and permissions
- Configures resource allocation (CPU, memory, GPU)
- Sets up networking and port mappings
- Manages storage mounts and paths
- **Lifecycle hooks** — run automated setup steps before or after install and upgrade (V5)

### What's New in V5: Lifecycle Hooks

V5 install scripts introduce **lifecycle hooks** — TypeScript functions that execute at specific points during app install and upgrade. Hooks enable post-install automation like health checks, service configuration, OAuth login, and more — all without the user needing to open the app's own UI.

V5 is a strict superset of V4. The only new field is `hooks`. An existing V4 script can be promoted to V5 by changing `"version": 4` to `"version": 5` and optionally adding a `hooks` array.

For full details, see the [Hooks Reference](/features/apps/install-scripts/reference/hooks).

## How to Use Install Scripts

### Curated App Installation
For supported applications, the installation process is streamlined:

1. Navigate to the **Apps** section in the UI
2. Browse the list of curated applications
3. Click the **Install** button next to your desired app
4. The pre-configured install script will automatically:
   - Set up all necessary directories and permissions
   - Configure networking and ports
   - Allocate appropriate system resources
   - Mount required storage paths
   - Handle any app-specific requirements
   - Run lifecycle hooks for post-install setup (V5 apps)

### Custom Installation
For apps not yet curated or when you need to customize the configuration:

1. Navigate to the **Apps** section in the UI
2. For curated apps: Click **Custom Install** instead of **Install**
3. For non-curated apps: Click **Custom Install** (the only available option)
4. A JSON editor will open where you can:
   - Modify existing curated configurations
   - Create entirely new install scripts
   - Use template variables for dynamic configuration

### Best Practices and Common Pitfalls

#### Best Practices
- **Use V5 format for new scripts with hooks**, or **V4 for scripts without hooks** — both are fully supported
- **Always use `$LOCATION()` macros** for paths instead of hardcoded paths
- **Use `$HOST_PATH()` and `$MOUNTED_HOST_PATH()`** for storage configuration instead of manual object creation
- **All directory entries must be objects** — bare strings in `ensure_directories_exists` are no longer supported
- **Declare ownership** with the `owner` field for apps that require specific user/group ownership (e.g., `"postgres"`, `"apps"`)
- **Add `snapshot` config** on data and config directories to enable automatic pre-update ZFS snapshots
- **Use `$MEMORY()` for dynamic memory allocation** to ensure apps work across different system configurations
- **Reference TrueNAS app schemas** from the [official apps repository](https://github.com/truenas/apps) for `app_values` structure
- **Keep hook scripts focused** — each hook should do one thing (health check, configuration, library setup)
- **Use `optional: true`** on hooks that are nice-to-have but shouldn't block app installation if they fail

#### Common Pitfalls
- **Permission issues** are the most common cause of failures - both during installation and at runtime
- **Hardcoded paths** break when users have custom location preferences
- **Missing directory creation** can cause apps to fail during installation
- **Incorrect `app_values` structure** for the specific TrueNAS app version
- **Missing `await`** in hook scripts — all `ctx` methods are async and must be awaited
- **Hook timeout too short** — apps can take 30-60 seconds to become responsive after container creation; use `ctx.waitForApp()` with appropriate timeouts