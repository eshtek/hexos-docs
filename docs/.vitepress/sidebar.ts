import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  // About section
  '/about-hexos/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'About HexOS',
      link: '/about-hexos/',
      items: []
    }
  ],

  // Getting Started section
  '/getting-started/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Getting Started',
      link: '/getting-started/overview',
      items: [
        { text: 'Install HexOS', link: '/getting-started/installation/InstallGuide' },
        { text: 'Complete Setup', link: '/getting-started/setup/CompleteSetup' },
      ]
    }
  ],

  // Apps subsections - Install Scripts
  '/features/apps/install-scripts/': [
    { text: '← Back to Apps', link: '/features/apps/' },
    {
      text: 'Install Scripts',
      link: '/features/apps/install-scripts/overview',
      items: [
        { text: 'Curated Scripts', link: '/features/apps/install-scripts/curated/' },
        { text: 'Contributing', link: '/features/apps/install-scripts/contributing' },
        { text: 'Schema Reference', link: '/features/apps/install-scripts/reference/schema' },
        { text: 'Macros Reference', link: '/features/apps/install-scripts/reference/macros' },
        { text: 'Debugging', link: '/features/apps/install-scripts/advanced/debugging' },
      ]
    }
  ],

  // Apps subsections - Curated App Guides
  '/features/apps/articles/': [
    { text: '← Back to Apps', link: '/features/apps/' },
    {
      text: 'Curated App Guides',
      link: '/features/apps/articles/',
      items: [
        // { text: 'Immich', link: '/features/apps/articles/immich/' },
      ]
    }
  ],

  // Features section
  '/features/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Features',
      link: '/features/',
      // collapsed: true,
      items: [
        { text: 'Storage', link: '/features/storage/storage' },
        { text: 'Folders', link: '/features/folders/' },
        { text: 'Notifications', link: '/features/notifications/' },
        {
          text: 'Settings',
          link: '/features/settings/',
          // collapsed: true,
          items: [
            { text: 'Experimental Features', link: '/features/settings/experimental-features/' },
          ]
        },
      ]
    },
    {
      text: 'Apps',
      link: '/features/apps/',
      collapsed: true,
      items: [
        { text: 'Curated App Guides', link: '/features/apps/articles/' },
        { text: 'Install Scripts', link: '/features/apps/install-scripts/overview' },
      ]
    }
  ],

  // Troubleshooting section
  '/troubleshooting/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Troubleshooting',
      link: '/troubleshooting/',
      collapsed: true,
      items: [
        { text: 'Avoid USB Drives', link: '/troubleshooting/common-issues/AvoidUSBDrives' },
        { text: 'Clear Browser Cache', link: '/troubleshooting/common-issues/ClearCache' },
      ]
    }
  ],

  // Community section
  '/community/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Community',
      link: '/community/',
      items: [
        { text: 'How to Contribute', link: '/community/how-to-contribute/' },
        {
          text: 'Guides',
          link: '/community/community-guides/',
          items: [
            {
              text: 'Apps',
              collapsed: true,
              items: [
                { text: 'Immich Migration (Move Method)', link: '/community/community-guides/ImmichMigrationMove' },
                { text: 'Immich Migration (Rsync Method)', link: '/community/community-guides/ImmichMigrationRsync' },
              ]
            },
            {
              text: 'Backup & Storage',
              collapsed: true,
              items: [
                { text: 'Time Machine Install', link: '/community/community-guides/TimeMachineInstall' },
              ]
            },
            {
              text: 'Networking',
              collapsed: true,
              items: [
                { text: 'Setting Up Tailscale', link: '/community/community-guides/SettingUpTailscale' },
              ]
            },
            {
              text: 'Virtual Machines',
              collapsed: true,
              items: [
                { text: 'Replicating Virtual Machines', link: '/community/community-guides/ReplicatingVirtualMachines' },
              ]
            },
          ]
        }
      ]
    }
  ],

  // Release Notes section
  '/release-notes/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Release Notes',
      link: '/release-notes/command-deck/',
      items: [
        // auto-generated-release-notes-start
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
    }
  ],

  // Blog section
  '/blog/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Blog',
      link: '/blog/',
      items: [
        { text: 'E2E Testing Suite', link: '/blog/2025-10-17' },
        { text: 'Q3 2025', link: '/blog/2025-10-01' },
        { text: 'Q2 2025', link: '/blog/2025-09-30' },
        { text: 'Introducing ZFS AnyRaid', link: '/blog/2025-05-22' },
        { text: 'Status Update & ZFS Leadership Call', link: '/blog/2025-05-20' },
        { text: 'Q1 2025', link: '/blog/2025-03-07' },
        { text: 'The Road to 1.0', link: '/blog/2024-11-28' },
        { text: 'The Magic Behind HexOS', link: '/blog/2024-07-30' },
      ]
    }
  ],

  // Careers section (both main and subsections)
  '/careers/': [
    { text: '← Back to Home', link: '/' },
    {
      text: 'Careers',
      link: '/careers/',
      items: [
        { text: 'App Curator', link: '/careers/app-curator/' },
      ]
    }
  ],

  // Home/root section
  '/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'About HexOS', link: '/about-hexos/' },
        { text: 'Installation & Setup', link: '/getting-started/overview' },
      ]
    },
    {
      text: 'Documentation',
      items: [
        {
          text: 'Features',
          link: '/features/',
          collapsed: true,
          items: [
            { text: 'Storage', link: '/features/storage/storage' },
            { text: 'Folders', link: '/features/folders/' },
            { text: 'Notifications', link: '/features/notifications/' },
            { text: 'Settings', link: '/features/settings/' },
            { text: 'Apps', link: '/features/apps/' },
          ]
        },
        {
          text: 'Troubleshooting',
          link: '/troubleshooting/',
          collapsed: true,
          items: [
            { text: 'Avoid USB Drives', link: '/troubleshooting/common-issues/AvoidUSBDrives' },
            { text: 'Clear Browser Cache', link: '/troubleshooting/common-issues/ClearCache' },
          ]
        },
      ]
    },
    {
      text: 'Resources',
      items: [
        { text: 'Community', link: '/community/' },
        { text: 'Blog', link: '/blog/' },
        { text: 'Release Notes', link: '/release-notes/command-deck/' },
        { text: 'Careers', link: '/careers/' },
      ]
    }
  ]
}

export default sidebar
