# Getting Started

Congratulations on taking the first step on your journey towards digital self-reliance and self-hosting.  This article will guide you to getting HexOS installed and set up on your home server.

## System Requirements

For basic storage and folder capabilities, HexOS has the same underlying system requirements as TrueNAS SCALE:

- Processor:	2-Core Intel 64-Bit or AMD x86_64 processor
- Memory:  	8 GB memory
- Boot Device:  	16 GB SSD boot device
- Storage:  
  - One storage device for testing purposes*
  - Two storage devices for a mirrored pool**
  - Three storage devices for an expandable pool

<small>\* *single device configurations offer no redundancy and should only be used for test/dev purposes*  
** *mirrored pools cannot be expanded by adding additional storage devices*</small>

However, the applications you intend to deploy can significantly increase these requirements.  Consult documentation of the applications you intend to install for their respective recommendations.

## Get Yourself a Server

When it comes to the physical hardware itself, you have two choices:  bring your own or buy something pre-built (OEM).

### Bring-Your-Own-Hardware (BYOH)

Have an old PC or gaming rig laying around?  Can you get your hands on a decommissioned or refurbished server?  Want to build something new?  One of the beautiful things about HexOS and Linux is the ability to use just about any capable hardware and turn it into a home server.  This is an ideal path for technology enthusiasts and IT professionals.  DIY approaches do require a bit of technical aptitude and light reading, as hardware selection is important.  Thankfully, TrueNAS provides a [comprehensive hardware guide](https://www.truenas.com/docs/scale/gettingstarted/scalehardwareguide/) that covers all aspects of selecting your gear including minimum system requirements, storage devices/controllers, etc.  You can also introduce yourself to our community in the forum for further guidance and support on your setup.

### Buy Pre-Built

There are many OEM NAS appliance vendors available for purchase in the hardware market.  However, for the best support, TrueNAS servers including their Mini-R series are constantly tested to ensure solid support with SCALE and HexOS.  For non-TrueNAS based systems, seek community guidance and avoid proprietary hardware vendors like Synology/QNAP.

## Get Yourself Some Storage

Selecting storage devices for your home server comes down to your capacity requirements, performance expectations, and hardware capabilities.  HDDs should be used for user data and SSDs can offer faster speeds for high-performance applications and use-cases.  

### Recommended Layouts

While you can ultimately create as many pools in whatever configurations you want using HexOS, most users will benefit from one of three primary configurations.

#### The Minimalist

Technically all features of HexOS can be achieved with a single pool.  Both data you and your apps create will live in the same pool of storage.  If users, applications, and performance expectations are all low, HDDs are fine.  Otherwise, SSDs may be preferred, though the price per TB is higher. Just remember to start with a minimum of 3 devices so that you can expand as you grow.   If you want the best of both worlds and better scalability, see the next layout.

#### The Enthusiast

If both HDD and SSD pools are available, HexOS will automatically optimize their usage with folders, applications, and in the future, virtual machines.  This will result in improved application performance and storage efficiency.  While we highly recommend a minimum of three storage devices for the HDD pool, a two-device SSD pool can be acceptable.  Consider your total expandability (storage ports) in your system when deciding on pool widths.

#### The Professional

For the tech savvy IT admin or developer who wants more granular control over their storage configuration, HexOS also supports the use of TrueNAS-managed pools.  Simply create your storage pool via TrueNAS and it will appear as an option when configuring HexOS features like folders and apps.  HexOS will generate relevant alerts/notifications for pool issues including device failures and aggressive SMART errors.  However, all storage management operations (expansion, disk replacement, etc.) will need to be performed through the TrueNAS UI.
