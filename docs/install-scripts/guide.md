# Step-by-Step Guide

## 1) Skeleton
```json
{
  "version": 1,
  "ensure_directories_exists": [],
  "ensure_permissions_exists": [],
  "app_values": {}
}
```

## 2) Decide Storage Layout
Use `$LOCATION(...)` to choose host paths, then wrap with `$HOST_PATH(...)`.

## 3) Set Permissions
Add entries under `ensure_permissions_exists` for app-specific users/groups.

## 4) Fill `app_values`
Map chart fields from the TrueNAS UI or from the catalog repo.

## 5) Validate & Install
Paste into HexOS, validate, run install, and verify in TrueNAS.
