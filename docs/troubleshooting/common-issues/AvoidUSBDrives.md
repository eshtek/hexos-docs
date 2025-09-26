# Why you should avoid USB attached drives for data pool disks

This subject has been coming up quite often since about 2022. Perhaps because of TrueNAS SCALE has brought forth some attention to TrueNAS in general and ZFS in specific.

Please note that this is about USB attached storage for ZFS data pools. On occasion, people use USB drives, (flash, USB->SATA, USB->NVMe, etc…), for booting. In general, these do work acceptably, (when not using the cheapest USB flash drives). Though, it is always recommended to backup your configuration in case of boot drive failure.

Some of the points also apply to Thunderbolt enclosures. But, Thunderbolt might even be worse because the drivers would be even less tested than USB on TrueNAS Core or SCALE.

Here is my take on why USB attached storage would make a poor selection for ZFS data pool device. Not all of them will apply in all circumstances.

## Connection and Hardware Issues

- The connector is not latched, which may lead to inadvertent dis-connects.
- Multi-drive USB enclosures funnel all traffic through a single USB port, which may limit drive speed as they share bandwidth. This becomes especially problematic during scrubs or disk replacements. Worse, if there is inadequate cooling.
- USB attached SATA disks may use the same serial number, confusing software that attempts to detect multipathed disks.
- Some multi-drive USB enclosures use a very light weight RAID controller chip, which sometimes can be set to JBOD. This is NOT the same as direct pass-through from a HBA.

## Performance and Compatibility Issues

- Using USB 2.0 is too slow for many NAS functions.
- Using USB without UASP feature, (on BOTH sides), wastes CPU time and reduces performance.
- Some USB enclosures are not intended for continuous or extended use. Which ZFS will do in a scrub or re-silver, potentially causing the drive to get so hot, it / they may fail.
- USB device chips tend to be as cheap as possible, potentially having unknown bugs, either firmware or logic, that high throughput systems like TrueNAS with ZFS can expose.

## System Integration Issues

- Some USB controllers are funneled using hubs on the system board. This hub may have other functions attached to it, like your keyboard or mouse USB port. Unless you know which ports do this, you may inadvertently use the "wrong" USB port.
- Many USB to SATA adapters do not pass through SMART data, so monitoring a USB attached SATA drive for preemptive failure is problematic.
- A host side powered USB port can hit 500ma on a standard 2.0 type A plug and it simply turns off. So if you use a hub, and mix powered and un-powered devices, it's possible for the hub to exceed 500ma and your disks get disconnected despite having their own power source.

## Power Supply Issues

Power for external USB devices, that can't be powered from host:

- External power bricks usually have press fit power connections, not latched. Thus, they can come loose, or accidentally pulled.
- External power bricks may have long cables that get in the way, so they may get un-plugged.
- USB disk chassis that need external power, likely don't support redundant power. But, an actual server computer may.
- If using a UPS on the server side, it would be necessary to include any USB power bricks on to the UPS, for any USB pool member disks.
- When using multiple external USB disks that require their own power supplies, you increase the potential for failure with each power supply.

## When USB Storage Is Acceptable

All that said, USB attached storage does have a place with TrueNAS:

- Occasionally USB has to be used as the boot device connection method, (or better yet, boot Mirror).
- Importing data to a NAS via USB storage may be faster than network copies.
- Backup disks attached via USB for temporary connection can be used successfully.

For the last, a failed backup can often be repeated without data loss. Coupled with planning and best practices, ZFS snapshots can preserve the previous backup, limiting the loss if it can't be repeated.
