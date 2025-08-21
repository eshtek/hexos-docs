# Validation

Pipeline:

```mermaid
flowchart TD
  A[Parse JSON] --> B[Replace Macros]
  B --> C[Re-parse JSON]
  C --> D[Prepare Filesystem]
  D --> E[Install App]
```

| Step           | Typical errors    | Example message                 | Fix                                   |
| -------------- | ----------------- | ------------------------------- | ------------------------------------- |
| Parse JSON     | Missing version   | requires "version": 1           | Add version                           |
| Replace Macros | Unquoted macro    | expected JSON after replacement | Quote macro strings                   |
| Prepare FS     | Permission denied | failed to apply ACL             | Use POSIX fallback or adjust pool ACL |
| Install        | Chart validation  | invalid value for port          | Match the UI field type               |
