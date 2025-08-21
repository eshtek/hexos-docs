# HexOS Install Script Schema (v1)

This page defines the **Install Script** JSON that HexOS uses to:
1. Prepare storage (create folders, set permissions)
2. Generate the TrueNAS **`app.create`** payload (`values`) for catalog app installation

---

## Why a schema?

Install Scripts let us keep app setups **portable, reproducible, and reviewable**. Authors write a small, declarative JSON file; HexOS resolves macros (e.g., `$LOCATION(...)`, `$HOST_PATH(...)`), ensures paths/permissions, and then calls TrueNAS `app.create` with the resulting chart `values`.

---

## Top-level structure

```jsonc
{
  "version": 1,
  "ensure_directories_exists": [],
  "ensure_permissions_exists": [],
  "app_values": {}
}
```

### Fields

- **version** (number, required)  
  Schema version. Currently must be `1`.

- **ensure_directories_exists** (array of strings, optional)  
  Paths (with macros) to ensure exist on the host.  
  Example: `"$HOST_PATH(/mnt/tank/media)"`

- **ensure_permissions_exists** (array of objects, optional)  
  Ensures Unix-like ownership/permissions.  
  

- **app_values** (object, required)  
  Raw Helm values passed to `app.create`.  
  This maps 1:1 to TrueNAS SCALE [App Values Schema](https://github.com/truenas/charts).

---

## Payload Glossary (HexOS → TrueNAS)

| Field     | Description                         | Source                                     |
| --------- | ----------------------------------- | ------------------------------------------ |
| `catalog` | Which catalog to pull from          | HexOS default or user-specified            |
| `item`    | App chart name                      | From curated JSON                          |
| `train`   | Chart train (`stable`, `community`) | JSON field or user choice                  |
| `values`  | Helm values for chart               | From `app_values` after macro substitution |

See [TrueNAS API Reference](https://www.truenas.com/docs/scale/scaletutorials/apps/) for `app.create`.

