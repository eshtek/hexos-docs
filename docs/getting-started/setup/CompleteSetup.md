---
next:
  text: 'Features'
  link: '/features/'
---

# Complete Server Setup

Now that HexOS is installed, it’s time to log in and set up your server!

### Before You Start

You'll need:
- Your **HexOS username and password**  
- The **root password** from installation  
- Your **server connected to your Wi-Fi router** with a network cable  
- A **computer on the same network** as your server

## Login to HexOS

First, go to [deck.hexos.com](https://deck.hexos.com) and log in.   
If you have not already signed up you can [sign up](https://hub.hexos.com/register/) here.

<img width="2256" height="1504" alt="Screenshot From 2025-09-30 11-20-17" src="https://github.com/user-attachments/assets/bad810b2-5525-4eed-b029-99ea7467ba4e" />

:::tip Note 
*This is the username and password you created when buying HexOS, it's not the root password you used when installing HexOS.*
:::

## Claiming Your Server

Once logged in, you'll need to claim your server.

<img width="1426" height="642" alt="Screenshot-from-2025-01-28-11-36-15-1536x864" src="https://github.com/user-attachments/assets/849718a1-ff66-47e2-8d22-a03e6dac4754" />

Your server should appear in the panel where it says "Looking for servers..." on the right of the screen. Click the `Claim` button.

### Server Not Showing Up?

First check that the server is connected to your wifi network, check that the cables are fully plugged in. Then refresh the page.

If this does not let the server be detected you may need to connect manually.  
- Click the "Having Problems" link at the bottom of the “Lets get started!” section
- Then click "enter your ip manually".
- Enter your WAN IP address (if you are unsure what that is you can find yours [here](https://whatismyipaddress.com/)).

Once entered, your server should appear and can be claimed.

## Server Setup Process

### Step 1: Health and Capabilities 

After claiming your server, you'll be brought to a display containing all of your server's hardware.

<img width="1210" height="669" alt="Screenshot-from-2025-01-28-11-37-25-1536x864" src="https://github.com/user-attachments/assets/d9037d2e-f4ca-4868-a979-f2a8b8ec14fc" />

Make sure you see the correct number of drives and that no errors are being displayed.
If you see green checks/ticks on everything then you're good to go. Click the `Continue` button.

### Step 2: Storage Pools

You will now see a suggested arrangement of your drives into storage pools. "Pools" are groups of drives that will work together as one, allowing a larger amount of storage space than a single drive and also giving additional “redundancy” in case one or more drives fail.

<img width="1425" height="722" alt="Screenshot-from-2025-01-28-11-38-03-1536x864" src="https://github.com/user-attachments/assets/9a82426a-c98f-4648-b3bb-7598a3d15a42" />

HexOS will suggest a storage pool layout based on your hardware. 

Ideally you will have at least 3 drives in your pool, this means you can add more later.  
[Read more about storage pool layouts here](https://docs.hexos.com/getting-started/overview.html#recommended-layouts).

For most people, the recommended configuration is the best path forward. To use the default suggested layout click the `Continue` button again.

You will now see the setup process running

<img width="2051" height="939" alt="Screenshot-from-2025-01-28-11-39-57" src="https://github.com/user-attachments/assets/ad59b25f-f974-4fa9-81c9-1d3afd7f1dd7" />

#### Manually configuring pools

If you are more of a tinkerer you can remove drives from default pools or skip pool creation and manually configure it later. Just remember that:

- removing drives can reduce redundancy
- this affects how safely your pools handle failures
- if you have fewer than 3 drives in a pool you can't add more drives to the pool later on

### Step 3: Name Your Server

You are just about done setting up your server.
All that's left is to give your server a name and then the initialization process will begin.

### Step 4: Welcome to your HexOS NAS

Now your setup is complete and it's time to take a look at your HexOS NAS for the first time. Click `Go to the dashboard`. You will see the Welcome to HexOS welcome wizard.

<img width="1026" height="663" alt="Screenshot-from-2025-01-28-11-40-32-1536x864" src="https://github.com/user-attachments/assets/f92630cd-cf9e-4b4c-aafb-14317e927a6e" />

## What's Next?

This is a good point to check that the install has worked well and that your system is running smoothly. 

Whenever you go to [deck.hexos.com](https://deck.hexos.com) you will see your HexOS [dashboard](/features/). This is your control center where you can monitor your server, manage storage, install apps, and configure settings. 

Try clicking on each item on the Dash now and check the details as they pop out from the right hand side of the screen. There should be no warnings or errors and the pool should match what you chose during setup. If you have any problems [try the forums](https://hub.hexos.com/).

Ready to explore? Check out our [Features Guide](/features/) to learn about everything HexOS can do!
