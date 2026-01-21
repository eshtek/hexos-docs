# Troubleshooting

This guide helps you resolve common issues with HexOS installation, setup, and operation. Issues are organized by category for quick reference.

:::tip Quick Help
Check our [Common Issues](./common-issues/) section for frequently encountered problems:
- [Application Errors](./common-issues/ApplicationErrors) - App installation, updates, and startup issues
- [Immich Migration Guide](./common-issues/ImmichMigration) - Migrating existing Immich installations
- [Clear Browser Cache](./common-issues/ClearCache) - Fixing login and UI issues
- [Avoid USB Drives](./common-issues/AvoidUSBDrives) - Why USB drives cause problems

Visit the [HexOS Community](https://hub.hexos.com/) for additional support from other users.
:::

## Installation Issues

### Cannot Image USB Stick with ISO

If you're having trouble creating a bootable USB drive from the HexOS ISO:

1. **Use a different imaging tool**
   - Try [balenaEtcher](https://www.balena.io/etcher/) (recommended)
   - On Windows: Use Rufus in DD mode
   - On macOS: Use built-in Disk Utility or `dd` command
   - On Linux: Use `dd` command or GNOME Disks

2. **Try a different USB drive**
   - Use a high-quality USB 3.0+ drive (minimum 8GB)
   - Some older or damaged USB drives can cause imaging problems
   - Avoid using cheap or no-name USB drives

3. **Download the ISO again**
   - Sometimes download corruption can cause imaging issues
   - Verify the ISO checksum if provided

### Installation Process Failures

Installation problems can happen for various reasons:

1. **Hardware compatibility**
   - Check the [system requirements](/getting-started/overview#system-requirements)
   - Ensure your hardware is on the supported hardware list
   - Disable any hardware features that might interfere (virtualization, secure boot)

2. **Corrupted installation media**
   - Re-create your USB installation drive with a fresh ISO download
   - Try a different USB port (preferably USB 2.0 for compatibility)

3. **Memory issues**
   - Run a memory test (memtest86+) if the installer crashes
   - Try installing with minimal RAM configuration

## Network & Connectivity Issues

### Server Fails to Get an IP Address

Network connectivity problems after installation:

1. **Physical connection**
   - Ensure ethernet cable is properly connected and working
   - Try a different ethernet cable
   - Check that network port LEDs are active

2. **Network equipment issues**
   - Try connecting to a different network port
   - Restart your router/switch
   - Check if other devices can get IP addresses

3. **Network configuration**
   - Some networks require manual IP configuration instead of DHCP
   - Check if your network uses static IP assignments
   - Verify network subnet and DHCP range

### Server Discovery Problems

If deck.hexos.com can't find your server:

1. **Network discovery requirements**
   - Server and browsing device must be on the same local network
   - Some corporate/guest networks block device discovery

2. **Firewall settings**
   - Check that your router/firewall isn't blocking mDNS discovery
   - Ensure ports 80, 443, and 5353 are not blocked

3. **Server status**
   - Verify the server has finished booting (wait 2-3 minutes)
   - Check server status lights/indicators
   - Try refreshing the discovery page

## Account & Authentication Issues

### Problems Claiming Your Server

If you can't claim your server on deck.hexos.com:

1. **Network connectivity**
   - Ensure your server can reach the internet
   - Test that deck.hexos.com is accessible from your network
   - Check for corporate firewall restrictions

2. **Account issues**
   - Verify you're logged into the correct HexOS account
   - Ensure your account is verified and active

3. **Server already claimed**
   - Check if the server might already be claimed by another account
   - Contact support if you need to transfer ownership

### Login Issues with deck.hexos.com

Authentication problems with the HexOS management portal:

1. **Password problems**
   - Use the "Forgot Password" feature to reset your credentials
   - Ensure you're using the correct email address
   - Check that Caps Lock isn't affecting password entry

2. **Account verification**
   - Check your email for account verification messages
   - Look in spam/junk folders for verification emails

3. **Browser issues**
   - Try clearing your browser cache and cookies ([detailed instructions](./common-issues/ClearCache))
   - Try a different browser or incognito/private mode
   - Disable browser extensions that might interfere

### Server Authentication Problems

When you can't authenticate to your local server:

1. **Credential verification**
   - Use the default credentials from the installation process
   - Check the server console for the correct username/password

2. **Input issues**
   - Verify Caps Lock isn't affecting your password entry
   - Ensure your keyboard layout matches what you used during setup
   - Try typing the password in a text editor first to verify

## Storage & Drive Issues

### Drive Not Recognized

If your drives aren't showing up:

1. **Physical connections**
   - Ensure all SATA/power cables are properly connected
   - Try different SATA ports or cables
   - Check that drives spin up during boot

2. **Drive compatibility**
   - Verify drives are supported by your hardware
   - Check for any drive-specific firmware requirements

3. **Power supply**
   - Ensure adequate power supply capacity for all drives
   - Check that all power connectors are secure

### Pool Creation Issues

Problems creating storage pools:

1. **Drive preparation**
   - Drives must be unpartitioned for ZFS pool creation
   - Use the HexOS interface to wipe drives if needed

2. **Insufficient drives**
   - Mirror pools require at least 2 drives
   - RAIDZ1 requires at least 3 drives
   - RAIDZ2 requires at least 4 drives

## Task & Operation Issues

### Dismissing Stale Tasks

If a task is taking too long or appears stuck in the Activities panel, you can manually dismiss it by enabling [Experimental Features](/features/settings/experimental-features/) and clicking the X icon next to the task.

## Getting Additional Help

If your issue isn't covered here:

- Check [Common Issues](./common-issues/) for community-reported problems
- Visit the [HexOS Community](https://hub.hexos.com/) for user support
- Review the [Getting Started Guide](/getting-started/overview) for setup help
- Contact HexOS support through the official channels

:::warning Important
Always backup important data before making system changes or troubleshooting storage issues.
:::