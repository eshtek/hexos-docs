# Storage

This is where you'll find your pools, drives and handle storage related tasks.
This screen allows you to
- Create new pools.
- Swap drives.
- Fix problems related to storage.

## Creating Storage Pools

When first setting up your server, you likely created at least one storage pool. Pools are groups of drives that will work together as one, allowing a larger amount of storage space than a single drive and may also giving additional “redundancy” in case of drive failure.

If you have unused drives, you can create a new pool by selecting the create pool button.

It’s important to create pools with an appropriate amount of drives. Any pools with less than three drives cannot be expanded with additional drives.<br> [Read more about drives and pools here](https://docs.hexos.com/getting-started/overview.html#get-yourself-some-storage)

## Replacing Drives

Eventually every drive will fail. Storage pools with [parity](https://en.wikipedia.org/wiki/Parity_drive), like the ones that HexOS suggests, allow for failing drives to be replaced without losing the data.

The storage interface will show and alert when there are problems relating to your pools and drives. When drives start showing errors on  [SMART](https://www.truenas.com/docs/core/13.0/coretutorials/tasks/runningsmarttests/) tests, having I/O problems, or go missing entirely, you'll see visual indicators right in the interface. 

When a drive needs replacement, HexOS will look at your available unused drives and suggest suitable replacements.  

If you don't yet have a replacement drive, check out our guide before buying [selecting drives](/articles/selectingDrives).

### How to replace a drive

- First install the drive in the machine
- Next go to [deck.hexos.com](https://deck.hexos.com) and click to the Storage screen
- Then click on your storage pool
<img width="826" height="417" alt="Screenshot From 2025-10-01 11-26-58" src="https://github.com/user-attachments/assets/756974b0-e517-4fcb-a9dc-2a1c56b357ad" />

- Click on the View Drives button
<img width="1792" height="929" alt="Screenshot From 2025-10-01 11-32-46" src="https://github.com/user-attachments/assets/b80c4171-dc87-43f3-a15d-643cf9b64f55" />

- Then click on the drive you want to replace
<img width="1111" height="751" alt="Screenshot From 2025-10-01 11-33-37" src="https://github.com/user-attachments/assets/236667b6-f4e5-464a-910d-4cd87da538c3" />

- Next click the replace button
<img width="1971" height="896" alt="Screenshot From 2025-10-01 11-33-46" src="https://github.com/user-attachments/assets/436f9a2e-1246-482c-9942-c012b4e8e874" />

## Growing Your Storage

As your server usage grows, you might need more storage capacity. HexOS gives you options to expand your storage.

### Extending drives

This is how you can add more drives to your existing pool for more storage space.

To add another drive to your pool:

- First install the drive in the machine 
- Then go to [deck.hexos.com](https://deck.hexos.com) and click to the Storage screen.
-   You should see the drive appear under Unused Drives
- Click on the pool
<img width="826" height="417" alt="Screenshot From 2025-10-01 11-26-58" src="https://github.com/user-attachments/assets/7287e9a1-0112-4ad6-8210-6be6c35e5448" />

- Click Add drive
<img width="1971" height="896" alt="Screenshot From 2025-10-01 11-46-33" src="https://github.com/user-attachments/assets/2548c137-773d-4583-baa4-001bfebea986" />

### Expanding drives 

This is how you can upgrade individual drives one at a time. The process for this is the same as [replacing individual drives that have failed.](/###how-to-replace-a-drive)

## Critical Errors

Sometimes storage issues are more serious than a single drive failure. Before assuming the world is falling apart, try restarting your server and checking if any of the errors go away.<br> If the errors persist, here's a quick overview of what you may see.

**Pool degradation**: Your pool is running weakened. Check if all drives are properly connected and look for drive errors. Usually this means a drive needs replacement, but your data is still safe.

**Pool offline**: Your pool isn't accessible right now. This often happens when too many drives fail at once or there's a connection issue. Check drive connections first, then look for multiple drive failures.

**Multiple drive problems**: If you lose more drives than your redundancy can handle, by default 1 drive, you're in data loss territory. <span style="color: red;">**Stop using the system immediately**</span> and consider professional data recovery if the data is critical.

The key is acting quickly when you see alerts. Most pool problems start small and get worse if ignored.

