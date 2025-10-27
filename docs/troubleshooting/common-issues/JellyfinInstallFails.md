# Jellyfin Installation Fails at 80%

## Problem

Jellyfin installation gets stuck at around 80% progress and never completes. HexOS shows an endless loading spinner.

If you check TrueNAS, you may see a generic error message about the app failing to start. This issue is related to GPU hardware compatibility - the installation attempts to enable GPU transcoding by default, which fails on some systems.

## Solution

Install Jellyfin without GPU hardware transcoding:

1. In HexOS, go to **Settings > Preferences** and enable **Experimental Features**
2. Go to install Jellyfin and click **Custom Install** instead of Install
3. Scroll to the bottom of the script and find the `resources` section
4. Remove the `gpus` section as shown below:

**Before:**
```json
"resources": {
  "limits": {
    "cpus": 2,
    "memory": 4096
  },
  "gpus": {
    "use_all_gpus": true
  }
}
```

**After:**
```json
"resources": {
  "limits": {
    "cpus": 2,
    "memory": 4096
  }
}
```

5. Click **Install**

Jellyfin will now install successfully using CPU transcoding instead of GPU. This works on all systems regardless of your GPU hardware.

:::info Confirmed Solution
Users have reported that installing through TrueNAS with "GPU passthrough" unchecked works successfully, while enabling GPU passthrough causes the same failure. This confirms the issue is related to GPU compatibility.
:::
