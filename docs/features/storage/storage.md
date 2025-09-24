# Storage

This is where you'll find all your pools and drives, and handle anything related to storage. Whether it's creating new pools, adding more space, swapping drives, or fixing any issues that pop up.

## Creating Storage Pools

When you first set up your server, you likely created at least one storage pool. If you have unused drives, you can create a new pool by selecting which drives to group together.

It's worth mentioning the number of drives you choose matters. Too few drives and you won't have proper redundancy, or the ability to add more storage later on.

## Growing Your Storage

As your server usage grows, you might need more storage capacity or need to
handle drive issues. HexOS gives you options to expand and maintain your
storage.

**Extending drives**: Add more drives to your existing pool for more space.

**Expanding drives**: Upgrade individual drives one at a time.

## Replacing Drives

Drives fail. It's not a matter of if, but when. The storage interface will show you when there are problems relating to your pools and drives.

When drives start having [SMART](https://kb.synology.com/en-global/DSM/tutorial/What_is_SMART) errors, I/O problems, or go missing entirely, you'll see visual indicators right in the interface. When a drive needs replacement, HexOS will look at your available unused drives and suggest suitable replacements.  

If you don't have a replacement drive on hand, check out our guide on [selecting drives](https://hexos.com/selecting-drives).

## Critical Errors

Sometimes storage issues are more serious than a single drive failure. Before assuming the world is falling apart, try restarting your server and seeing if some of the errors go away.  
If the errors persist, here's a quick overview of what you may see.

**Pool degradation**: Your pool is running but weakened. Check that all drives are properly connected and look for drive errors. Usually this means a drive needs replacement, but your data is still safe.

**Pool offline**: Your pool isn't accessible right now. This often happens when too many drives fail at once or there's a connection issue. Check drive connections first, then look for multiple drive failures.

**Multiple drive problems**: If you lose more drives than your redundancy can handle, you're in data loss territory. Stop using the system immediately and consider professional data recovery if the data is critical.

The key is acting quickly when you see alerts. Most pool problems start small and get worse if ignored.