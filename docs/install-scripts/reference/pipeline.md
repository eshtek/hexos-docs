# Pipeline

Pipeline:

```mermaid
flowchart TD
  A[Parse Script] --> B[Replace Macros]
  B --> C[Prepare Filesystem]
  D --> E[Ensure permissions]
  F --> G[Install]
```
