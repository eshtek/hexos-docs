---
title: Untitled
description: 
published: true
date: 2026-06-09T20:02:50.700Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:39:52.956Z
---

## Debugging Workflow : Troubleshooting Failed Installations

If an install script fails, this will help:

### 1. Check HexOS Task Failure
1. In the HexOS UI, check your notifications for an app install failure
2. Click the notification to view the error message

### 2. Check Hook Failures (V5 Scripts)

If your install script uses lifecycle hooks, hook tasks appear as children of the main install task in the HexOS activity center:

1. Open the **Activity Center** (bell icon) in the HexOS UI
2. Expand the install task to see individual hook steps
3. Each hook shows its checkpoints and current status
4. If a hook failed:
   - Click **View Details** to see structured error context (endpoint, status code, etc.)
   - Click **Retry** to re-run the hook from the failed checkpoint
   - Click **Skip** to skip the hook and continue (if allowed)

**Common hook failure causes:**
- **App not ready** — the container hasn't finished starting. Increase the hook's `timeout` or add a longer delay in `waitForApp()`
- **Network unreachable** — the hook can't reach the app's HTTP endpoint. Check that the port is correct and the app binds to `0.0.0.0`
- **OAuth timeout** — the user didn't complete the OAuth flow within the time limit. Retry the hook to get a fresh OAuth prompt
- **Missing input** — a required hook input wasn't provided. Check your `inputs` declarations

### 3. Check TrueNAS Job Failure
1. Navigate to the TrueNAS web interface (e.g., `https://10.0.1.13`)
2. Go to **Jobs** section to view the installation job details
3. Look for error messages in the detailed job output

### 4. Check Application Logs (if app installed but won't start)
**Option A: TrueNAS Apps UI (if container is running)**
1. Navigate to `https://10.0.1.13/ui/apps/installed`
2. Click on the app, under `Workloads > Containers`, click the "View Logs" button
2. Review container logs for startup errors

**Option B: Shell Access (if container stopped or logs unavailable)**
1. Navigate to `https://10.0.1.13/ui/system/shell`
2. Run `sudo docker container list -a` to find your container
3. Copy the container ID
4. Run `sudo docker logs <container_id>` to view detailed logs

### 5. Common Issues and Solutions

#### Permission Errors
- **Symptom**: App fails to start, logs show permission denied errors
- **Solution**: Add the `owner` field to the relevant entry in `ensure_directories_exists` with the correct TrueNAS user and group (e.g., `{ "user": "netdata", "group": "docker" }`)
- **Example**: PostgreSQL data directories typically require `"owner": { "user": "netdata", "group": "docker" }`

#### Missing Directories
- **Symptom**: App fails during installation, "directory not found" errors
- **Solution**: Ensure all required paths are listed in `ensure_directories_exists`

#### Invalid App Configuration
- **Symptom**: TrueNAS job fails with validation errors
- **Solution**: Compare your `app_values` structure with the official TrueNAS app schema

#### Hook Script Errors
- **Symptom**: Hook task shows `AWAITING_RETRY` with an error message
- **Solution**: Check the error context details for the specific failure. Common fixes:
  - Ensure the `entrypoint` function name matches what's exported in your script
  - Verify the app's API endpoint path is correct
  - Confirm all `await` keywords are present on async calls

### Future Improvements
The current debugging workflow requires accessing the TrueNAS interface directly, in the future we plan to expose more of this debugging workflow within HexOS's UI.
