# Permissions

HexOS prepares the filesystem before installation:

- For each `ensure_directories_exists` entry, ensure the directory exists.
- Apply default write permission for the `apps` user.
- Apply additional entries in `ensure_permissions_exists` for app users/groups (POSIX).

Use `network_share: true` where you want to expose directories via SMB/NFS (where supported).
