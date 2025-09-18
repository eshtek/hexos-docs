import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/install-scripts/': [
    {
      text: 'Install Scripts',
      items: [
        { text: 'Overview', link: '/install-scripts/overview' },
        { text: 'Apps (Curated Scripts)', link: '/install-scripts/curated/' },
        { text: 'Contributing', link: '/install-scripts/contributing' },
        { text: 'Reference: Schema', link: '/install-scripts/reference/schema' },
        { text: 'Reference: Macros', link: '/install-scripts/reference/macros' },
        { text: 'Advanced: Debugging', link: '/install-scripts/advanced/debugging' },
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
