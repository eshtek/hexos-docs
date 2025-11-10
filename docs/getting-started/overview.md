# Getting Started

Congratulations for getting started with HexOS and self-hosting! This article will guide you through choosing hardware, and getting HexOS installed and set up. If you want to know more about HexOS first then you can [read about it here](/about-hexos/).

## System Requirements

For basic storage and folder capabilities, HexOS has the same underlying system requirements as TrueNAS SCALE:

| Component | Minimum requirements | 
|---|---|
| Processor | 2-Core Intel 64-Bit or AMD x86_64 processor |
| Memory | 8 GB memory |
| Boot Drive | 16 GB SSD boot device |
| Storage |  - One storage drive for testing purposes*<br> - Two storage drives for a mirrored pool**<br> - Three storage drives for an expandable pool |

<small>\* *single drive configurations offer no redundancy and should only be used for testing purposes only*  
** *mirrored pools cannot be expanded by adding additional storage devices*</small>

However, the apps you install on your server can significantly increase these requirements. [Read more about apps on HexOS here](/features/apps/). Consult the documentation of the apps you are interested in to see their recommended specifications.

## Preparing Server Hardware

When it comes to the physical hardware of the NAS you have two choices

1. Bring your own hardware
2. Buy something pre-built

### Bring Your Own Hardware

Do you have an old PC or gaming rig laying around? Can you get your hands on a decommissioned or refurbished server? Or do you want to build something new? One of the best things about HexOS is the ability to take almost any hardware that meets the system requirements and turn it into a home server.  

TrueNAS provides a [comprehensive hardware guide](https://www.truenas.com/docs/scale/gettingstarted/scalehardwareguide/) that covers all aspects of selecting hardware including minimum system requirements, storage devices/controllers, etc.  However, to build an energy efficient server additional research may be required. 

You are welcome to introduce yourself to the HexOS community in [the forum](https://hub.hexos.com/), where you can get further guidance and support on your hardware choices.

### Buy Pre-Built

There are many pre-built NAS devices available for purchase in the hardware market. For the best support, TrueNAS servers including their [Mini-R series](https://www.truenas.com/truenas-mini/) are tested to ensure smooth running of HexOS.  For non-TrueNAS based systems, make sure to seek community guidance and avoid proprietary hardware vendors like Synology or QNAP. Proprietary NAS hardware can be locked down and may be unable to run other operating systems such as HexOS.

## Storage considerations
  
There are various factors to consider when selecting storage for for a server. The table below will give a quick overview on the basic differences between Hard Disc Drive (HDD) and Solid State Drive (SSD).

| Factors | HDD | SSD |
|---|---|---|
| Budget | Lower cost per Terabyte (TB) | Higher cost per Terabyte (TB) |
| Storage Capacity | Readily available drives in sizes up to 30 TB| Readily available drives in sizes up to 8 TB |
| Storage Speed* | ~80 - 300 MB/s | ~500-8000 MB/s |
| Port Availability <br> (Per drive) | - Sata or SAS data port <br> - Sata power | Sata data and power port<br> or M.2 port |
| Recommended<br> Use-case | Large data storage | High performance applications |
| Other Factors | - CMR HDDs are recommended <br> - [SMR HDDs aren't recommended](https://www.xda-developers.com/smr-hdds-are-fine-for-your-nas-until-you-try-to-resilver/)<br> - Can make audible noise | - SLC, MLC, TLC SSDs are recommended**<br> - QLC SSDs are not recommended<br> - silent operation | 

<small>\* *Storage speeds vary based on drive model and technology.*  
** *SLC abd MLC SSDs are uncommon and may be difficult to procure*</small>

### Recommended Storage Templates

While you can create as many pools in whatever configurations you want using HexOS, most users will benefit from one of the following templates.

#### The Minimalist

- 3 or more HDDs of the same capacity

A pool consisting of 3 HDDs is the most cost efficient method to create a pool that can later be expanded with additional storage drives. In this configuration your data and applications will stay on the same storage pool. This is sufficient if high speed performance is unnecessary.

#### The Enthusiast

- 3 or more HDDs of the same capacity
- 2 or more SSDs of the same capacity

If both HDD and SSD pools are available, HexOS will automatically optimize their usage. Functionality that may benefit from higher performance storage will be installed to the SSD pool. While having 3 or more drives are recommend for HDDs for the option to expand the HDD pool in the future, a pool of 2 SSDs can be acceptable. If you would like to keep the option SSD pool expansion available then make sure to use 3 or more SSDs when creating the pool.
