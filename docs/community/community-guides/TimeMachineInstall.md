
  
**TIME MACHINE INSTALL GUIDE (Hex + TrueNas)**

1.  Create a Folder & name it time machine (or a custom name)  
    [![Screenshot2024-12-13at15_46_41.thumb.png.1917b054bc6437c5946ee2766fb02d4f.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_46_41.thumb.png.1917b054bc6437c5946ee2766fb02d4f.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_46_41.png.9386bb6e03781d49b57ce13ca55b3a76.png)
2.  Set the Folder permissions (I left mine open, add user permissions here to restricted access)
3.  Navigate to the TrueNas UI (Server IP > Username: truenas\_admin Password: server password from install)
4.  Navigate to the Shares tab, you should see your newly created share. Click on edit (pencil)  
    [![Screenshot2024-12-13at15_47_45.thumb.png.513d6547fcee38836a81c7cab233887b.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_47_45.thumb.png.513d6547fcee38836a81c7cab233887b.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_47_45.png.ff190422d78a3976bb6cda71258d71a1.png "Fetching info...")
5.  On the Purpose drop down change to > Basic or multi user time machine.  
    [![Screenshot2024-12-13at15_48_05.thumb.png.99e532b6531decd97d958ad775a8ef12.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_48_05.thumb.png.99e532b6531decd97d958ad775a8ef12.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_48_05.png.3f8ef68435e6b85c0fc8b951476cc6af.png "Fetching info...")
6.  Press save/apply, and it'll prompt a restart of the SMB process.  
    [![Screenshot2024-12-13at15_48_17.thumb.png.5022511ce0efbd7133370ddc86549062.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_48_17.thumb.png.5022511ce0efbd7133370ddc86549062.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_48_17.png.6c1fccc32914f02654e9832470b8bf25.png "Fetching info...")
7.  Go to your mac settings > general > Time machine.  
    [![Screenshot2024-12-13at15_50_19.thumb.png.bc825ac5e3dfd2ae02cb7a5aeae1aae5.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_50_19.thumb.png.bc825ac5e3dfd2ae02cb7a5aeae1aae5.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_50_19.png.8866afcff2f0595f49423a67541b33c9.png "Fetching info...")
8.  Click the + icon and locate your time machine share, then click setup disk.  
    FYI if you aren't already connected to your Hex server, you'd need to do so now. Either search for the server in the network tab of finder OR connect to the server with finder > go > connect to server > SMB://\[THE IP OF YOUR HEX SERVER\]  
      
    [![Screenshot2024-12-13at15_49_38.png.2ab86d79a3c942718fa2015bdf2e5cbe.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_49_38.png.2ab86d79a3c942718fa2015bdf2e5cbe.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_49_38.png.2ab86d79a3c942718fa2015bdf2e5cbe.png "Fetching info...")
9.  You can now choose to encrypt your backup with a password + if you choose, restrict the total disk usage the backup will have.[![Screenshot2024-12-13at15_50_06.png.5de5035f6f6f12dfca8204fa27a59851.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_50_06.png.5de5035f6f6f12dfca8204fa27a59851.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_50_06.png.5de5035f6f6f12dfca8204fa27a59851.png "Fetching info...")
10.  You should now see your time machine backup setup. This will start automatically, but you can create a back up straight away if you choose.[![Screenshot2024-12-13at16_06_32.png.6dacd51310b756a3ca580273cd12d44e.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at16_06_32.png.6dacd51310b756a3ca580273cd12d44e.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at16_06_32.png.6dacd51310b756a3ca580273cd12d44e.png "Fetching info...")  
      
     

**AUTO CONNECT SHARED DRIVE SETUP**  
  
Now that could be it, but to ensure your Time machine backup will always occur, you need to ensure your Mac is always connected to your Hex server.  
to do this, we need to add the share to the login items

1.  Open Settings > general > Login items > click the + icon  
    [![Screenshot 2024-12-13 at 15.55.33.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_33.thumb.png.197885205c0c20c772d0d854ca65056e.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_33.png.0da534099a2f840ea09bd1b3517f267c.png)  
      
    [![Screenshot2024-12-13at15_55_40.png.2027b73598094c204f0e78e171386d1b.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_40.png.2027b73598094c204f0e78e171386d1b.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_40.png.2027b73598094c204f0e78e171386d1b.png)
2.  Locate your connected time machine share, then click open.  
    [![Screenshot2024-12-13at15_55_49.thumb.png.5fc7a2707bacf791c4d24a7394c00380.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_49.thumb.png.5fc7a2707bacf791c4d24a7394c00380.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_49.png.e97a0e93714553cf699ebf88ebf55138.png)
3.  You should now see the drive in the login items.  
    [![Screenshot2024-12-13at15_55_55.png.9f5e94a3a9a4fd321256c5c6c7aed01b.png](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_55.png.9f5e94a3a9a4fd321256c5c6c7aed01b.png)](https://hub.hexos.com/uploads/monthly_2024_12/Screenshot2024-12-13at15_55_55.png.9f5e94a3a9a4fd321256c5c6c7aed01b.png "Fetching info...")  
      
    That's it, you should be all setup and running.