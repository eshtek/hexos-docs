# Advanced Topics

## Idempotency
Install scripts should be re-runnable. Directory creation and permission application are safe to repeat.

## Multiple Instances
Use unique `app_name` values when installing multiple instances of the same app.

## GPU Access
Enable GPU drivers in TrueNAS Apps settings and use the chart’s GPU options to expose devices to the container.

## Debugging
- Inspect HexOS task logs.
- Inspect TrueNAS app logs and events.
- If `app.create` validation fails, reconcile your `values` with the app’s UI and the catalog schema.
