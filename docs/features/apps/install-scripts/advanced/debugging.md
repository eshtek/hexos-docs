## Debugging Workflow : Troubleshooting Failed Installations

If an install scripts fails, this will help:

### 1. Check HexOS Task Failure
1. In the HexOS UI, check your notifications for an app install failure
2. Click the notification to view the error message

### 2. Check TrueNAS Job Failure
1. Navigate to the TrueNAS web interface (e.g., `https://10.0.1.13`)
2. Go to **Jobs** section to view the installation job details
3. Look for error messages in the detailed job output

### 3. Check Application Logs (if app installed but won't start)
**Option A: TrueNAS Apps UI (if container is running)**
1. Navigate to `https://10.0.1.13/ui/apps/installed`
2. Click on the app, under `Workloads > Containers`, click the "View Logs" button
2. Review container logs for startup errors

**Option B: Shell Access (if container stopped or logs unavailable)**
1. Navigate to `https://10.0.1.13/ui/system/shell`
2. Run `sudo docker container list -a` to find your container
3. Copy the container ID
4. Run `sudo docker logs <container_id>` to view detailed logs

### 3. Common Issues and Solutions

#### Permission Errors
- **Symptom**: App fails to start, logs show permission denied errors
- **Solution**: Add appropriate entries to `ensure_permissions_exists` in your install script
- **Example**: PostgreSQL requires specific user/group permissions

#### Missing Directories
- **Symptom**: App fails during installation, "directory not found" errors
- **Solution**: Ensure all required paths are listed in `ensure_directories_exists`

#### Invalid App Configuration
- **Symptom**: TrueNAS job fails with validation errors
- **Solution**: Compare your `app_values` structure with the official TrueNAS app schema

### Future Improvements
The current debugging workflow requires accessing the TrueNAS interface directly, in the future we plan to expose more of this debugging workflow within HexOS's UI.
