# Replicating Virtual Machines from one TrueNAS Server to Another

*by [@ShinobiRen](https://hub.hexos.com/profile/27485-shinobiren/?wr=eyJhcHAiOiJmb3J1bXMiLCJtb2R1bGUiOiJmb3J1bXMtY29tbWVudCIsImlkXzEiOjMwNjMsImlkXzIiOjE4MTk2fQ==)*

Hello everyone!

I wanted to setup a secondary server - one for testing to break things and one for a more stable NAS environment that I will wait for HexOS to support updates and etc. To do this I needed to get some things off of my test server - primarily my VMs that I had created. Here is how I setup replication and moved the VMs. Hope you find this useful!

## Prerequisites

1. Find the VM you would like to move
2. TrueNAS should be able to make the connection to the other server but it sometimes (frequently) fails to do so, so I will dive into how to do it manually

## Step 1: Setup Backup Credentials on Source Server

Setup the backup credentials on the server you are transferring from. In my case this is my 01 server.

1. Navigate to **Credentials** → **Backup credentials** on the left side:

   [![image.png.ba5671896e8101a6c00b6ca46afb8139.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.ba5671896e8101a6c00b6ca46afb8139.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.ba5671896e8101a6c00b6ca46afb8139.png "Enlarge image")

2. In SSH Keypairs section click the **Add** button

   [![image.thumb.png.db7cc680574195ddc4707f6a415dbbe7.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.db7cc680574195ddc4707f6a415dbbe7.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.52480c092ffb8d2dcfcfd9e0c616b87f.png)

3. Give your keypair a name and click the **Generate Keypair** button:

   [![image.thumb.png.d719b13cec2a3728451249320c047d5c.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.d719b13cec2a3728451249320c047d5c.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.6597985bb444a7acbaad747ef9f91148.png)

4. Copy your Public Key. You will need this on your new server.

## Step 2: Setup the Keypair on Your New Server

1. Navigate to your new server and **Credentials** → **Users**

   [![image.png.fbcf402e4fddbd56cd88dfdada6f9db4.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.fbcf402e4fddbd56cd88dfdada6f9db4.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.fbcf402e4fddbd56cd88dfdada6f9db4.png "Enlarge image")

2. Select the user you will be using to do your ZFS replication task and click **Edit**

   [![image.png.2d577d12e332e0bf1fd15eb1690e1073.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.2d577d12e332e0bf1fd15eb1690e1073.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.2d577d12e332e0bf1fd15eb1690e1073.png "Enlarge image")

3. In the Authentication section of the edit dialog for the user you should see "Authorized Keys". This is where you will paste your public key that you generated.

   [![image.thumb.png.31475c065b1c3a6bc7676f18f957e432.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.31475c065b1c3a6bc7676f18f957e432.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.818d1b42519305f8830a75eba4e509e6.png)

4. Scroll down and check the box that says **"Allow all sudo commands"** and **"Allow all sudo commands with no password"**.

   [![image.png.3799dbc527d612923f2065c09ecc54d9.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.3799dbc527d612923f2065c09ecc54d9.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.3799dbc527d612923f2065c09ecc54d9.png "Enlarge image")

## Step 3: Setup SSH Connection on Primary Server

1. Time to setup the SSH link on your primary server. Navigate back to it.
2. On the primary server navigate back to **Credentials** → **Backup Credentials** and click **Add** on SSH Connections

   [![image.png.fbf4abf80194476b01eb8ecde0ad1a86.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.fbf4abf80194476b01eb8ecde0ad1a86.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.fbf4abf80194476b01eb8ecde0ad1a86.png "Enlarge image")

3. In the new dialog give it a name, change the Setup Method to **Manual**, and fill out the rest of this information (including selecting the Private Key you generated):

   [![image.thumb.png.6174347f436204c4c822c20d3b9d48b2.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.6174347f436204c4c822c20d3b9d48b2.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.38aaebfb9d26942706938e9f45a8b466.png)

4. Once you select your Private Key you can click the **Discover Remote Host Key** button.
5. Click **Save**. Now it is time to generate a replication task.

## Step 4: Create Replication Task

1. Navigate to **Data Protection** on the left side and click **Add** on Replication Task:

   [![image.png.5b6d42a076acdc8e20ba6c32606cc9c6.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.5b6d42a076acdc8e20ba6c32606cc9c6.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.5b6d42a076acdc8e20ba6c32606cc9c6.png "Enlarge image")

   [![image.thumb.png.850e0effea90cb5ef70189faa44a8367.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.850e0effea90cb5ef70189faa44a8367.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.4fe6ab083601e2cdc2f6454712f0ba38.png)

2. Fill out this information and click **Next**:

   [![image.thumb.png.ccbd4daf97503036476fef4a9e07acdf.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.ccbd4daf97503036476fef4a9e07acdf.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.f46240a94a07cb415dc6822c6c0e6cdc.png)

3. When you select your SSH credentials this dialog opens. Select **"Use Sudo for ZFS Commands"** or check the box with the arrow above.

   [![image.png.c3e9ceb670ccb396c48285e3c00dc124.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.c3e9ceb670ccb396c48285e3c00dc124.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.c3e9ceb670ccb396c48285e3c00dc124.png "Enlarge image")

4. If you have snapshots for VMs you can select **"Recursive"** to copy those snapshots over.
5. Keep your name that TrueNAS generates for you or rename it to something else and click **Next**.
6. In the When section I selected **"Run Once"**.
7. **Save** it and the replication will start. If on the same network it is incredibly fast - Moved two VMs roughly 120 GB in less than 5 minutes.

## Step 5: Verify and Recreate VMs

1. Verify on your new server the zVOL disks you copied over are present and recreate your virtual machines as you would setting up a new VM, linking the VirtIO disks you just replicated.

[![image.png](https://hub.hexos.com/uploads/monthly_2025_04/image.thumb.png.cba475dc9359559a1d03648381ba7199.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.e40a92042a3f6a172d540a55b3a4d46c.png)

[![image.png](https://hub.hexos.com/uploads/monthly_2025_04/image.png.bd3c253eca7787e6ba656ae6ebcfe501.png)](https://hub.hexos.com/uploads/monthly_2025_04/image.png.bd3c253eca7787e6ba656ae6ebcfe501.png)