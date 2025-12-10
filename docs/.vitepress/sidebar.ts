import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting Started',
    link: '/getting-started/overview',
    collapsed: true,
    items: [
      { text: 'About HexOS', link: '/about-hexos/' },
      { text: 'Overview', link: '/getting-started/overview' },
      { text: 'Installation', link: '/getting-started/installation/InstallGuide' },
      { text: 'Complete Setup', link: '/getting-started/setup/CompleteSetup' },
    ]
  },
  {
    text: 'Features',
    link: '/features/',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/features/' },
      { text: 'Storage', link: '/features/storage/storage' },
      {         text: 'Folders', 
        link: '/features/folders/', 
      collapsed: true,
        items: [
          { text: 'Accessing Folders', link: '/features/folders/how-to-access-folder-contents' },
          { text: 'Folder Creation', link: '/features/folders/create-a-new-folder' },
          { text: 'User Creation', link: '/features/folders/create-a-new-user' },
          ]
     },
      { text: 'Notifications', link: '/features/notifications/' },
      {
        text: 'Apps',
        link: '/features/apps/',
        collapsed: true,
        items: [
          { text: 'Curated App Guides', link: '/features/apps/articles/' },
          {
            text: 'Install Scripts',
            link: '/features/apps/install-scripts/overview',
            collapsed: true,
            items: [
              { text: 'Curated Scripts', link: '/features/apps/install-scripts/curated/' },
              { text: 'Contributing', link: '/features/apps/install-scripts/contributing' },
              { text: 'Schema Reference', link: '/features/apps/install-scripts/reference/schema' },
              { text: 'Macros Reference', link: '/features/apps/install-scripts/reference/macros' },
              { text: 'Debugging', link: '/features/apps/install-scripts/advanced/debugging' },
            ]
          },
        ]
      },
      {
        text: 'Settings',
        link: '/features/settings/',
        collapsed: true,
        items: [
          { text: 'Experimental Features', link: '/features/settings/experimental-features/' },
        ]
      },
    ]
  },
  {
    text: 'Troubleshooting',
    link: '/troubleshooting/',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/troubleshooting/' },
      { text: 'Avoid USB Drives', link: '/troubleshooting/common-issues/AvoidUSBDrives' },
      { text: 'Clear Browser Cache', link: '/troubleshooting/common-issues/ClearCache' },
    ]
  },
  {
    text: 'Community',
    link: '/community/',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/community/' },
      { text: 'How to Contribute', link: '/community/how-to-contribute/' },
      {
        text: 'Community Guides',
        link: '/community/community-guides/',
        collapsed: true,
        items: [
          {
            text: 'Apps',
            collapsed: true,
            items: [
              { text: 'Immich Migration (Move)', link: '/community/community-guides/ImmichMigrationMove' },
              { text: 'Immich Migration (Rsync)', link: '/community/community-guides/ImmichMigrationRsync' },
            ]
          },
          {
            text: 'Backup & Storage',
            collapsed: true,
            items: [
              { text: 'Time Machine Setup', link: '/community/community-guides/TimeMachineInstall' },
            ]
          },
          {
            text: 'Networking',
            collapsed: true,
            items: [
              { text: 'Tailscale Setup', link: '/community/community-guides/SettingUpTailscale' },
            ]
          },
          {
            text: 'Virtual Machines',
            collapsed: true,
            items: [
              { text: 'VM Replication', link: '/community/community-guides/ReplicatingVirtualMachines' },
            ]
          },
        ]
      }
    ]
  },
  {
    text: 'Blog',
    link: '/blog/',
    collapsed: true,
    items: [
      { text: 'All Posts', link: '/blog/' },
      { text: 'HexOS Roadmap Update', link: '/blog/2025-11-26' },
      { text: 'Introducing HexOS Local', link: '/blog/2025-11-25' },
      { text: 'E2E Testing Suite', link: '/blog/2025-10-21' },
      { text: 'Q3 2025', link: '/blog/2025-10-01' },
      { text: 'Q2 2025', link: '/blog/2025-09-30' },
      { text: 'ZFS AnyRaid', link: '/blog/2025-05-22' },
      { text: 'ZFS Leadership Call', link: '/blog/2025-05-20' },
      { text: 'Q1 2025', link: '/blog/2025-03-07' },
      { text: 'The Road to 1.0', link: '/blog/2024-11-28' },
      { text: 'Magic Behind HexOS', link: '/blog/2024-07-30' },
    ]
  },
  {
    text: 'Release Notes',
    link: '/release-notes/command-deck/',
    collapsed: true,
    items: [
      // auto-generated-release-notes-start
            { text: '2025-11-25', link: '/release-notes/command-deck/2025-11-25' },
            { text: '2025-11-12', link: '/release-notes/command-deck/2025-11-12' },
            { text: '2025-11-08', link: '/release-notes/command-deck/2025-11-08' },
            { text: '2025-11-07', link: '/release-notes/command-deck/2025-11-07' },
            { text: '2025-11-06', link: '/release-notes/command-deck/2025-11-06' },
            { text: '2025-10-07', link: '/release-notes/command-deck/2025-10-07' },
            { text: '2025-09-29', link: '/release-notes/command-deck/2025-09-29' },
            { text: '2025-07-28', link: '/release-notes/command-deck/2025-07-28' },
            { text: '2025-07-07', link: '/release-notes/command-deck/2025-07-07' },
            { text: '2025-06-27', link: '/release-notes/command-deck/2025-06-27' },
            { text: '2025-02-07', link: '/release-notes/command-deck/2025-02-07' },
            { text: '2025-01-08', link: '/release-notes/command-deck/2025-01-08' },
            { text: '2024-11-29', link: '/release-notes/command-deck/2024-11-29' },
            // auto-generated-release-notes-end
    ]
  },
  {
    text: 'Careers',
    link: '/careers/',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/careers/' },
    ]
  }
]

// Generate nav from top-level sidebar items
export const nav: DefaultTheme.NavItem[] = sidebar.map(item => ({
  text: item.text,
  link: item.link || (item.items?.[0] as DefaultTheme.SidebarItem)?.link || '/',
  activeMatch: item.link ? `^${item.link.split('/').slice(0, 2).join('/')}` : undefined
}))

export default sidebar
