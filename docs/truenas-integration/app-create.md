# Understanding `app.create`

`app.create` is the TrueNAS API method HexOS uses to install applications from a catalog. 

## Payload Anatomy

- **catalog**: Which catalog to pull the app chart from (e.g. `TRUENAS`).
- **item**: The name of the app (e.g. `jellyfin`).
- **train**: Catalog train (e.g. `stable`).
- **version**: Chart version to install.
- **values**: Expanded YAML/JSON values that configure the app.

## Glossary of Parameters

| Parameter | Description                                    |
| --------- | ---------------------------------------------- |
| `catalog` | Catalog ID where the app resides               |
| `item`    | App identifier within the catalog              |
| `train`   | Chart train, usually `stable`                  |
| `version` | Specific version of the chart                  |
| `values`  | Configuration values (ports, storage, secrets) |

HexOS compiles your **Install Script** into this payload and submits it to TrueNAS for execution.

See [interface for `app.create`](https://github.com/truenas/webui/blob/0041bdfaeffbf89306fd5f1a591ba0fa25ad7b6f/src/app/interfaces/app.interface.ts#L130).
