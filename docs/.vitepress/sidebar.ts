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
        { text: 'Apps', link: '/features/apps/',
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
        { text: 'Settings', link: '/features/settings/',
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
        { text: 'Common Issues', link: '/troubleshooting/' },
      ]
    }
  ],
  '/community/': [
    {
      text: 'Community',
      items: [
        { text: 'How to Contribute', link: '/community/' },
      ]
    }
  ],
  '/licensing/': [
    {
      text: 'Licensing',
      items: [
        { text: 'Usage Rights', link: '/licensing/' },
      ]
    }
  ],
  '/': [
    {
      text: 'Documentation',
      items: [
        { text: 'Home', link: '/' },
        { text: 'Getting Started', link: '/getting-started/overview' },
        { text: 'Features', link: '/features/' },
        { text: 'Troubleshooting', link: '/troubleshooting/' },
        { text: 'Community', link: '/community/' },
        { text: 'Licensing', link: '/licensing/' },
      ]
    }
  ]
}

export default sidebar
