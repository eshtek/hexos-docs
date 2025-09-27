import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/getting-started/': [
    {
      text: 'Getting Started',
      items: [
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
        { text: 'Common Issues', link: '/troubleshooting/common-issues/',
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
        { text: 'Command Deck', link: '/release-notes/command-deck/',
          items: [
            // auto-generated-release-notes-start
            { text: 'September 29, 2025', link: '/release-notes/command-deck/2025-09-29' },
            { text: 'July 28, 2025', link: '/release-notes/command-deck/2025-07-28' },
            { text: 'July 7, 2025', link: '/release-notes/command-deck/2025-07-07' },
            { text: 'June 27, 2025', link: '/release-notes/command-deck/2025-06-27' },
            { text: 'February 7, 2025', link: '/release-notes/command-deck/2025-02-07' },
            { text: 'January 8, 2025', link: '/release-notes/command-deck/2025-01-08' },
            { text: 'July 24, 2024', link: '/release-notes/command-deck/2024-07-24' },
            { text: 'July 4, 2024', link: '/release-notes/command-deck/2024-07-04' },
            { text: 'June 27, 2024', link: '/release-notes/command-deck/2024-06-27' },
            // auto-generated-release-notes-end
          ]
        },
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
        { text: 'Getting Started', link: '/getting-started/overview' },
        { text: 'Features', link: '/features/' },
        { text: 'Troubleshooting', link: '/troubleshooting/' },
        { text: 'Community', link: '/community/' },
        { text: 'Release Notes', link: '/release-notes/command-deck/' },
        // { text: 'Licensing', link: '/licensing/' },
      ]
    }
  ]
}

export default sidebar
