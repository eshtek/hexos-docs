# Fix For Missing UUID ERROR When Using Nvidia Gpus
*by [@G-M0N3Y-2503](https://hub.hexos.com/profile/29328-g-m0n3y-2503/)*

Due to a [bug in TrueNAS](https://ixsystems.atlassian.net/browse/NAS-132086) you may come across an issue when trying to use an NVIDIA GPU on an app.
<img width="310" height="243" alt="image" src="https://github.com/user-attachments/assets/aa127858-2f81-4f11-9359-71389b3133ee" />

After Selecting "Use This GPU" this error shows a pop up with a large error ending in something like:
```
Expected [uuid] to be set for GPU in slot [0000:00:00.0] in [nvidia_gpu_selection] 
```

[A Workaround for this issue has been provided by HoneyBadger](https://forums.truenas.com/t/docker-apps-and-uuid-issue-with-nvidia-gpu-after-upgrade-to-24-10-or-25-04/22547) and summarized below.

## 1. Obtain the the PCI slot identifier, UUID & App Name
### GUI method
#### PCI Slot ID
At the end of the error message shown above the PCI slot id will be printed. With the example:
```
Expected [uuid] to be set for GPU in slot [0000:00:00.0] in [nvidia_gpu_selection] 
```
The PCI slot identifier is `0000:00:00.0`.

#### UUID
You can find the UUID by opening the app settings for any application where you want to use your GPU in TrueNAS UI. Scroll all the way down and you can view the UUID by hovering over the `?` for the GPU you want to use as shown in the image below:

<img width="605" height="240" alt="image" src="https://github.com/user-attachments/assets/d9ae2a95-2bd0-41ba-b370-218b9407311e" />

The UUID is of the format `GPU-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`. 
> Note: This may be case sensitive, The `GPU-` should be uppercase and any other letters should be lowercase.

#### App name
The exact app name that you will need can be found by
1) Open TrueNAS UI
2) Select `Apps` tab
3) Select the target application
4) View the `Application Info` card
5) Find Application Name
    1) Method 1
        1) The Application `Name` is listed on the card
    2) Method 2
        1) Press `Edit`
        2) The first line will be `Application Name`

### Shell method
#### How to access shell
1. Log into TrueNAS UI
2. Select `System`
3. Select `Shell`

#### PCI Slot ID & UUID
In the shell paste the following:
```sh
midclt call app.gpu_choices | jq '.[] | select(.vendor == "NVIDIA") | {description, pci_slot: .gpu_details.addr.pci_slot, uuid: .vendor_specific_config.uuid}'
```
Or if that doesn't work, you can also try:
```sh
midclt call app.gpu_choices | jq
```
You are looking for the fields `pci_slot` and `uuid` of the NVIDIA GPU you wish to use.

## 2. Updating App Configurations  to use the GPU
### How to access shell

1. Log into TrueNAS UI
2. Select `System`
3. Select `Shell`

#Shell Commands
For the TrueNAS version `25.04` (Which is the latest supported version for HexOS at time of writing), write and enter the following in the shell with the data you found from step 1 replaced as appropriate.
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
> Note: `APP_NAME` does not have quotes around it in the final command but `UUID` and `PCI_SLOT` will have quotes around them.

After the `Total Progress` reaches 100% it will output some text and you can now verify in the TrueNAS GUI that the settings are now set.

> Note: Repeat this step for other other affected apps. Only the `APP_NAME` needs to be changed for any other affected apps.