# Setting Up Tailscale

*by [@speedking456](https://hub.hexos.com/profile/7605-speedking456/?wr=eyJhcHAiOiJmb3J1bXMiLCJtb2R1bGUiOiJmb3J1bXMtY29tbWVudCIsImlkXzEiOjU1MCwiaWRfMiI6Mjk2NX0=)*

As a fellow Tailscale enjoyer, this was my first thought when I heard about HexOS, "But does it support Tailscale?" and I can confirm it does!

Currently, setup requires use of the TrueNAS UI, should be fairly safe but your mileage may vary.

## Step 1: Login to TrueNAS

Go to your HexOS deck → **Settings** → **TrueNAS**. Or navigate to your NAS's IP in a web browser `https://{nas-ip}/`

Sign in with username `truenas_admin` and whatever password you created during setup.

## Step 2: Install the Tailscale Docker App

On the left sidebar, go to **Apps**. Then click on **Discover Apps** in the top right. Search for Tailscale, click on the app, and hit install. If this is your first time, a warning will pop up. Tick the confirm box and click **Agree**.

## Step 3: Configure Tailscale

**Do not touch any settings unless specified:**

- **Hostname*** - Set the hostname you would like, this is the name that shows in Tailscale and is used for MagicDNS. This does not affect your system hostname and can be the same.
- **Auth Key*** - Generate an auth key for Tailscale, don't use an Ephemeral key, it can one-time or reusable. Paste the **whole** key in this field. For more info: [Auth Keys Documentation](https://tailscale.com/kb/1085/auth-keys#generate-an-auth-key)
- **Accept DNS** - Leave disabled, but if you have a specific use case this is safe to enable.
- **Advertise Exit Node** - Leave disabled, but if you have a specific use case this is safe to enable.

Once you've inputted those settings, select **Install** at the bottom.

## Step 4: Verify Installation

- Check in Tailscale if your machine is listed with the hostname you set
- Try pinging from another Tailscale client
- Try accessing the TrueNAS UI through MagicDNS

If all those work you are good to go. Enjoy scaling!