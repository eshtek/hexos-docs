# TrueNAS Integration (Overview)

HexOS integrates with **TrueNAS SCALE** to deliver a complete apps + storage experience across discovery, provisioning, lifecycle, security, and observability. 

## What HexOS Adds on Top of TrueNAS

- **Unified Authentication**: Tie TrueNAS nodes to your HexOS identity, removing the need for per-host credentials.
- **Install Scripts**: Declarative JSON templates that become `app.create` payloads, portable across hosts and catalogs.
- **Lifecycle Automation**: Tasks, retries, rollbacks, and upgrade orchestration beyond the basics of TrueNAS SCALE.
- **Cross-Host Federation**: Manage multiple SCALE nodes under a single HexOS project.
- **Observability**: Performance, error reporting, and state tracking for all apps and storage.

## Where to Start

- [TrueNAS Apps Documentation](https://www.truenas.com/docs/scale/scaletutorials/apps/)
- [TrueNAS API Reference](https://github.com/truenas/webui/tree/master/src/app/interfaces/api)

HexOS builds on these foundations, aiming to make **multi-host TrueNAS app management simple, safe, and powerful**.
