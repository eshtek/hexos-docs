# Getting Started

If you're ready to get started with HexOS then congratulations! This article will guide you through choosing hardware, and getting HexOS installed and set up. If you want to know more about HexOS first then you can [read about it here](/about-hexos/).

## System Requirements

For basic storage and folder capabilities, HexOS has the same underlying system requirements as TrueNAS SCALE:

- Processor:    2-Core Intel 64-Bit or AMD x86_64 processor
- Memory:      8 GB memory
- Boot Device:      16 GB SSD boot device
- Storage:  
  - One storage device for testing purposes*
  - Two storage devices for a mirrored pool**
  - Three storage devices for an expandable pool

<small>\* *single device configurations offer no redundancy and should only be used for test/dev purposes*  
** *mirrored pools cannot be expanded by adding additional storage devices*</small>

However, the apps you install on your NAS can significantly increase these requirements. [Read more about apps on HexOS here](/features/apps/). To be sure about your NAS system requirements, consult the documentation of each app you might want to install too.

## Get Yourself a Server

When it comes to the physical hardware of the NAS you have two choices: bring your own hardware or buy something pre-built (OEM).

### Bring Your Own Hardware (BYOH)

Do you have an old PC or gaming rig laying around? Can you get your hands on a decommissioned or refurbished server? Or do you want to build something new? One of the best things about HexOS is the ability to take almost any hardware that meets the system requirements and turn it into a home server.  

This said, to build an energy efficient and responsive NAS may require more thought and reading. Thankfully, TrueNAS provides a [comprehensive hardware guide](https://www.truenas.com/docs/scale/gettingstarted/scalehardwareguide/) that covers all aspects of selecting hardware including minimum system requirements, storage devices/controllers, etc.  

You can also introduce yourself to the HexOS community in [the forum](https://hub.hexos.com/) for further guidance and support on your hardware choices.

### Buy Pre-Built (OEM)

There are many OEM NAS appliances available for purchase in the hardware market.  However, for the best support, TrueNAS servers including their [Mini-R series](https://www.truenas.com/truenas-mini/) are tested to ensure smooth running of HexOS.  For non-TrueNAS based systems, make sure to seek community guidance. Avoid proprietary hardware vendors like Synology/QNAP: this is because the hardware is usually locked down and unable to run other software such as HexOS.

## Get Yourself Some Storage

Selecting storage drives for your home server comes down to how much storage capacity you need, how fast you want the storage to be and  what you have room and power for in your system. 

HDDs should be used for user data, and SSDs can offer faster speeds for running HexOS and more high-performance applications and use-cases.

Drives will be arranged into storage pools. "Pools" are groups of drives that will work together as one, allowing a larger amount of storage space than a single drive and also giving additional “redundancy” in case one or more drives fail.

[Read more about what kind of hard drives to use here](/articles/selectingDrives.html)

### Recommended Pool Layouts

While you can ultimately create as many pools in whatever configurations you want using HexOS, most users will benefit from one of three primary configurations.

#### The Minimalist

- 3 or more HDDs

Technically all features of HexOS can be achieved with a single pool.  Both data you and your apps create will live in the same pool of storage. If users, applications, and performance expectations are all low, HDDs are fine. Otherwise, SSDs may be preferred, though the price per TB is higher. Just remember to start with a minimum of 3 devices so that you can expand as you grow.   If you want the best of both worlds and better scalability, see the next layout.

#### The Enthusiast

- 3 HDDs
- 2+SSDs

If both HDD and SSD pools are available, HexOS will automatically optimize their usage with folders, applications, and in the future, virtual machines.  This will result in improved application performance and storage efficiency.  While we highly recommend a minimum of three storage devices for the HDD pool, a two-device SSD pool can be acceptable.  Consider your total expandability (storage ports) in your system when deciding on pool widths.

#### The Professional

- Multiple pools managed in TrueNAS

For the tech savvy IT admin or developer who wants more granular control over their storage configuration, HexOS also supports the use of TrueNAS-managed pools.  Simply create your storage pool via TrueNAS and it will appear as an option when configuring HexOS features like folders and apps.  HexOS will generate relevant alerts/notifications for pool issues including device failures and aggressive SMART errors.  However, all storage management operations (expansion, disk replacement, etc.) will need to be performed through the TrueNAS UI.
