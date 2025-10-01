import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/about-hexos/': [
    {
      text: 'About HexOS',
      items: [
        { text: 'Home', link: '/' },
      ]
    }
  ],
  '/getting-started/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'About HexOS', link: '/about-hexos/' },
        { text: 'Overview', link: '/getting-started/overview' },
        { text: 'Install HexOS', link: '/getting-started/installation/InstallGuide' },
        { text: 'Complete Setup', link: '/getting-started/setup/CompleteSetup' },
      ]
    }
  ],
  '/features/': [
    {
      text: 'Features',
      items: [
        { text: 'Overview', link: '/features/' },
        { text: 'Storage', link: '/features/storage/storage' },
        { text: 'Folders', link: '/features/folders/' },
        {
          text: 'Apps', link: '/features/apps/',
          items: [
            { text: 'Install Scripts Overview', link: '/features/apps/install-scripts/overview' },
            { text: 'Curated Scripts', link: '/features/apps/install-scripts/curated/' },
            { text: 'Contributing', link: '/features/apps/install-scripts/contributing' },
            { text: 'Schema Reference', link: '/features/apps/install-scripts/reference/schema' },
            { text: 'Macros Reference', link: '/features/apps/install-scripts/reference/macros' },
            { text: 'Debugging', link: '/features/apps/install-scripts/advanced/debugging' },
          ]
        },
        { text: 'Notifications', link: '/features/notifications/' },
        {
          text: 'Settings', link: '/features/settings/',
          items: [
            { text: 'Experimental Features', link: '/features/settings/experimental-features/' },
          ]
        },
      ],
    }
  ],
  '/troubleshooting/': [
    {
      text: 'Troubleshooting',
      items: [
        { text: 'Overview', link: '/troubleshooting/' },
        {
          text: 'Common Issues', link: '/troubleshooting/common-issues/',
          items: [
            { text: 'Avoid USB Drives', link: '/troubleshooting/common-issues/AvoidUSBDrives' },
            { text: 'Clear Browser Cache', link: '/troubleshooting/common-issues/ClearCache' },
          ]
        },
      ]
    }
  ],
  '/community/': [
    {
      text: 'Community',
      items: [
        { text: 'How to Contribute', link: '/community/' },
        {
          text: 'Community Guides', link: '/community/community-guides/',
          items: [
            { text: 'Replicating Virtual Machines', link: '/community/community-guides/ReplicatingVirtualMachines' },
            { text: 'Setting Up Tailscale', link: '/community/community-guides/SettingUpTailscale' },
          ]
        },
      ]
    }
  ],
  '/release-notes/': [
    {
      text: 'Release Notes',
      items: [
        {
          text: 'Command Deck', link: '/release-notes/command-deck/',
          items: [
            // auto-generated-release-notes-start
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
      ]
    }
  ],
  '/blog/': [
    {
      text: 'Blog',
      link: '/blog/',
      items: [
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
  // '/licensing/': [
  //   {
  //     text: 'Licensing',
  //     items: [
  //       { text: 'Usage Rights', link: '/licensing/' },
  //     ]
  //   }
  // ],
  '/': [
    {
      text: 'Documentation',
      items: [
        { text: 'Home', link: '/' },
        { text: 'About HexOS', link: '/about-hexos/' },
        { text: 'Getting Started', link: '/getting-started/overview' },
        { text: 'Features', link: '/features/' },
        { text: 'Troubleshooting', link: '/troubleshooting/' },
        { text: 'Community', link: '/community/' },
        { text: 'Blog', link: '/blog/' },
        { text: 'Release Notes', link: '/release-notes/command-deck/' },
        // { text: 'Licensing', link: '/licensing/' },
      ]
    }
  ]
}

export default sidebar
