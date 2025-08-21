# Schema (v1)

## version
- number, required, must be 1

## ensure_directories_exists
- array of `{ path: string, network_share?: boolean, posix?: boolean }`
- examples for SMB/NFS vs local pools

## ensure_permissions_exists
- array of permission entries
- show user/group matrix examples

## app_values
- object
- passed to TrueNAS app create/update
- link to UI mapping tips
