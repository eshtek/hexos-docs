

# Setting Up Tailscale (How-to)

**by speedking456**

As a fellow Tailscale enjoyer, this was my first thought when I heard about HexOS, "But does it support Tailscale?" and I can confirm it does!

Currently, setup requires use of the TrueNAS UI, should be fairly safe but your mileage may vary.

**Step 1: Login to TrueNAS**  
Go to your HexOS deck -> Settings -> TrueNAS. Or navigate to your NAS's IP in a web browser https://{nas-ip}/  
Sign in with username truenas\_admin and whatever password you created during setup.

**Step 2: Install the Tailscale docker app**  
On the left sidebar, go to Apps. Then click on Discover Apps in the top right. Search for Tailscale, click on the app, and hit install. If this is your first time, a warning will pop up. Tick the confirm box and click Agree.

**Step 3:** **Configuring Tailscale  
Do not touch any settings unless specified**

-   Hostname\* - Set the hostname you would like, this is the name that shows in Tailscale and is used for MagicDNS. This does not affect your system hostname and can be the same.
-   Auth Key\* - Generate an auth key for Tailscale, don't use an Ephemeral key, it can one-time or reusable. Paste the **whole** key in this field. For more info: [https://tailscale.com/kb/1085/auth-keys#generate-an-auth-key](https://tailscale.com/kb/1085/auth-keys#generate-an-auth-key)
-   Accept DNS - Leave disabled, but if you have a specific use case this is safe to enable.
-   Advertise Exit Node - Leave disabled, but if you have a specific use case this is safe to enable.

Once you've inputted those settings, select install at the bottom.

**Step 4: Verify Install**

-   Check in Tailscale if your machine is listed with the hostname you set.
-   Try pinging from another Tailscale client
-   Try accessing the TrueNAS UI through MagicDNS

If all those work you are good to go. Enjoy scaling!