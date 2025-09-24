# Troubleshooting

## Cannot Image USB Stick with ISO

If you're having trouble creating a bootable USB drive from the HexOS ISO, try these steps:

**Use a different imaging tool**: If Rufus isn't working, try balenaEtcher or the official tool recommended for your operating system.

**Try a different USB drive**: Some older or damaged USB drives can cause imaging problems.

**Download the ISO again**: Sometimes download corruption can cause imaging issues.

## Failures During the Installation Process

Installation problems can happen for various reasons:

**Hardware compatibility**: Check that your hardware meets the minimum requirements and is supported.

**Corrupted installation media**: Re-create your USB installation drive with a fresh ISO download.

**Memory issues**: Run a memory test if the installer crashes or behaves erratically.

## Server Fails to Get an IP Address on First Boot After Install

Network connectivity problems after installation:

**Check network cable**: Ensure your ethernet cable is properly connected and working.

**Router/switch issues**: Try connecting to a different network port or restarting your network equipment.

**Network configuration**: Some networks require manual IP configuration rather than DHCP.

## Problems Claiming Your Server

If you can't claim your server on deck.hexos.com:

**Network connectivity**: Ensure your server can reach the internet and deck.hexos.com is accessible.

**Account issues**: Verify you're logged into the correct HexOS account.

**Server already claimed**: Check if the server might already be claimed by another account.

## Can't Login to deck.hexos.com

Authentication problems with the HexOS management portal:

**Password reset**: Use the forgot password feature if you can't remember your credentials.

**Account verification**: Check if your account email needs to be verified.

**Browser issues**: Try a different browser or clear your browser cache and cookies.

## Server Not Discovered

If deck.hexos.com can't find your server:

**Network discovery**: Ensure your server and the device you're browsing from are on the same network.

**Firewall settings**: Check that your network firewall isn't blocking discovery.

**Server status**: Verify the server has finished booting and is running properly.

## Password Incorrect

When you can't authenticate to your server:

**Default credentials**: Check if you're using the correct default username and password from the installation.

**Caps lock**: Verify caps lock isn't affecting your password entry.

**Keyboard layout**: Ensure your keyboard layout matches what you used during setup.