# TrueNAS API

HexOS communicates with TrueNAS SCALE using its official REST API. 

## Key API Categories

- **Authentication**: HexOS uses API keys generated in the TrueNAS UI.
- **Catalogs**: App discovery and sync.
- **Apps**: Core lifecycle (`create`, `query`, `update`, `delete`).
- **Tasks**: Long-running job tracking.
- **Storage**: Pools, datasets, and permissions.

## References

- [Generating API Keys in TrueNAS](https://www.truenas.com/docs/scale/scaletutorials/credentials/apikeys/)
- [TrueNAS SCALE API Docs](https://www.truenas.com/docs/scale/scaletutorials/api/)
