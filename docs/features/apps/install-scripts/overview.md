# Install Scripts Overview

## What are Install Scripts?

Install scripts are a curated, turnkey solution for installing applications through TrueNAS in an opinionated "one-click" way. They eliminate the need for users to manually configure networking, resources, folders, and other technical settings by providing pre-configured, best-practice templates.

### Key Benefits
- **No manual configuration required** - Networking, resources, and folders are automatically configured
- **Best practices built-in** - All configurations follow recommended settings
- **One-click installation** - Simplified installation process
- **Curated experience** - Apps are pre-tested and optimized

### Current Capabilities
- Configures all fields that TrueNAS exposes during app installation
- Automatically sets up directory structures and permissions
- Configures resource allocation (CPU, memory, GPU)
- Sets up networking and port mappings
- Manages storage mounts and paths

### Future Capabilities (Local UI)
Once the Local UI feature is complete, these install scripts are able to do much more; ultimately bypassing any post-installation setup of these apps entirely. 

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
- **Always use `$LOCATION()` macros** for paths instead of hardcoded paths
- **Use `$HOST_PATH()` and `$MOUNTED_HOST_PATH()`** for storage configuration instead of manual object creation
- **Include necessary directories** in `ensure_directories_exists` - assume no directories exist
- **Set proper permissions** with `ensure_permissions_exists` for apps that require specific user/group access
- **Use `$MEMORY()` for dynamic memory allocation** to ensure apps work across different system configurations
- **Reference TrueNAS app schemas** from the [official apps repository](https://github.com/truenas/apps) for `app_values` structure

#### Common Pitfalls
- **Permission issues** are the most common cause of failures - both during installation and at runtime
- **Hardcoded paths** break when users have custom location preferences
- **Missing directory creation** can cause apps to fail during installation
- **Incorrect `app_values` structure** for the specific TrueNAS app version