import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/getting-started/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Overview', link: '/getting-started/' },
        { text: 'Prerequisites', link: '/getting-started/prerequisites' }
      ]
    }
  ],
  '/truenas-integration/': [
    {
      text: 'TrueNAS Integration',
      items: [
        { text: 'Overview', link: '/truenas-integration/' },
        { text: 'API', link: '/truenas-integration/api' },
        { text: 'app.create', link: '/truenas-integration/app-create' }
      ]
    }
  ],
  '/install-scripts/': [
    {
      text: 'Install Scripts',
      items: [
        { text: 'Overview', link: '/install-scripts/overview' },
        { text: 'Contributors Guide', link: '/install-scripts/contributing' },
        { text: 'Reference: Schema', link: '/install-scripts/reference/schema' },
        { text: 'Reference: Macros', link: '/install-scripts/reference/macros' },
        { text: 'Reference: Validation', link: '/install-scripts/reference/validation' },
        { text: 'Apps (Curated Scripts)', link: '/install-scripts/curated/' },


      ]
    }
  ],
  '/platform/': [
    {
      text: 'Platform Internals',
      items: [
        { text: 'Tasks', link: '/platform/tasks' },
        { text: 'Preferences', link: '/platform/preferences' },
        { text: 'Permissions', link: '/platform/permissions' }
      ]
    }
  ],
  '/contributing/': [
    {
      text: 'Contributing',
      items: [
        { text: 'How to Contribute', link: '/contributing/' },
        { text: 'Style Guide', link: '/contributing/style-guide' }
      ]
    }
  ],
  '/': [
    {
      text: 'Documentation',
      items: [
        { text: 'Home', link: '/' },
        { text: 'Install Scripts', link: '/install-scripts/overview' }
      ]
    }
  ]
}

export default sidebar
