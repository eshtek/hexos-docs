# Use NVIDIA GPU Errors with UUID Missing
Due to a [bug in TrueNAS](https://ixsystems.atlassian.net/browse/NAS-132086) you may come adross an essue when trying to use an NVIDIA GPU on an app.
<img width="310" height="243" alt="image" src="https://github.com/user-attachments/assets/aa127858-2f81-4f11-9359-71389b3133ee" />

After Selecting the "Use This GPU" this error shows a pop up with a large error ending in something like:
```
Expected [uuid] to be set for GPU in slot [0000:00:00.0] in [nvidia_gpu_selection] 
```

[A Workaround for this issue has been provided for this bug](https://forums.truenas.com/t/docker-apps-and-uuid-issue-with-nvidia-gpu-after-upgrade-to-24-10-or-25-04/22547) that is summariesd as followed:

## 1. Obtain the the PCI slot identifyer and the UUID
### GUI
At the end of the error the PCI slot id will be printed. With the example:
```
Expected [uuid] to be set for GPU in slot [0000:00:00.0] in [nvidia_gpu_selection] 
```
The PCI slot identifyer is `0000:00:00.0`.
For the UUID this can be seen by hovering over the `?` for the GPU you want to use as shown in the image below:

<img width="605" height="240" alt="image" src="https://github.com/user-attachments/assets/d9ae2a95-2bd0-41ba-b370-218b9407311e" />

The UUID is of the format `GPU-123abcde-1234-1234-1234-123456abcdef`. This may be case sensitive, The `GPU-` should be uppercase and any other letters should be lowercase.

### Shell
There are various ways to access the shell, one way is via the TrueNAS GUI with the URL path `/ui/system/shell` in something like `https://192.168.0.0/ui/system/shell`.
In the shell pase the following:
```sh
midclt call app.gpu_choices | jq '.[] | select(.vendor == "NVIDIA") | {description, pci_slot: .gpu_details.addr.pci_slot, uuid: .vendor_specific_config.uuid}'
```
Or if that doesn't work the unfiltered:
```sh
midclt call app.gpu_choices | jq
```
You are looking for the fields `pci_slot` and `uuid` of the NVIDIA GPU you wish to use.

## 2. Update Each app to use the GPU
### Shell
There are various ways to access the shell, one way is via the TrueNAS GUI with the URL path `/ui/system/shell` in something like `https://192.168.0.0/ui/system/shell`.
For the TrueNAS version `25.04` (Which is the latest supported version for HexOS at time of writing), write and enter the following in the shell with the data you found from step 1 replaced as apropreate.
```sh
midclt call -j app.update APP_NAME '{"values": {"resources": {"gpus": {"use_all_gpus": false, "nvidia_gpu_selection": {"PCI_SLOT": {"use_gpu": true, "uuid": "GPU_UUID"}}}}}}'
```
for other versions see [here](https://forums.truenas.com/t/docker-apps-and-uuid-issue-with-nvidia-gpu-after-upgrade-to-24-10-or-25-04/22547).
* `APP_NAME` is the app the GPU is failing to be added to maybe `jellyfin`.
* `PCI_SLOT` would be something like `0000:00:00.0` from the example above.
* `GPU_UUID` would be something like `GPU-123abcde-1234-1234-1234-123456abcdef` from the example above.
For this example it would look like
```sh
midclt call -j app.update jellyfin '{"values": {"resources": {"gpus": {"use_all_gpus": false, "nvidia_gpu_selection": {"0000:00:00.0": {"use_gpu": true, "uuid": "GPU-123abcde-1234-1234-1234-123456abcdef"}}}}}}'
```
After the `Total Progress` reaches 100% it will output some text and you can now verify in the TrueNAS GUI that the settings are now set.

## 3. Repeat
In step 2 you only need to change the `APP_NAME` for any other effected apps.
