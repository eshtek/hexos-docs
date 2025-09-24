
# Selecting Drives for HexOS

When selecting storage devices for HexOS, consider type, size, and speed to ensure maximum performance and space efficiency.

## Important: Avoid SMR Drives

**Stay away from HDDs that use SMR (shingled magnetic recording).** These drives use a different method for writing data that is not conducive to good performance in RAID-based storage solutions. HexOS actively detects and alerts users to the presence of these drives.

## Drive Types

### HDDs (Hard Disk Drives)
- **Best for:** General purpose file storage and bulk data (pictures, videos, audio)
- **Pros:** More cost effective per TB
- **Cons:** Require more power

### SSDs (Solid State Drives)
- **Best for:** High-performance needs (video editing, virtual machines, media servers)
- **Pros:** Require less power, faster performance
- **Cons:** More expensive per TB

## Drive Sizing

Devices in a single storage pool are size-limited by the smallest disk in that pool. Mixing devices of different sizes is limited in HexOS to prevent wasting storage capacity.

**Best practice:** Use drives of the same size within each pool.

## Drive Speed

Storage pool performance is limited by the slowest devices in the pool. Speed factors include:

- **HDD RPMs:** 5400, 7200, 10,000 RPM, etc.
- **Interface:** SATA, SAS, NVMe
- **SSD Type:** SATA SSDs (500-600MB/s) vs NVMe SSDs (1,000MB/s+)

### SSD Mixing
For most home self-hosting applications, you can mix NVMe and SATA SSDs in the same pool. The performance difference is often negligible unless you have specific high-performance requirements.

## Are SSDs Required?

SSDs are **highly beneficial** but not required:

- **With SSDs:** Applications and VMs perform optimally
- **Without SSDs:** Apps on HDD-based pools may perform slower (e.g., slower loading of poster art and metadata in media servers)

### Future Migration
If you start with HDDs and add SSDs later, there will be a migration process to move applications to faster storage. For now, post in the forums for manual migration steps.

## Need More Help?

If you have more questions regarding storage and drives, please consider [posting in our forums!](https://hub.hexos.com/)
