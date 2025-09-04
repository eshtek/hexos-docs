import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/install-scripts/': [
    {
      text: 'Install Scripts',
      items: [
        { text: 'Overview', link: '/install-scripts/overview' },
        { text: 'Quickstart', link: '/install-scripts/quickstart' },
        { text: 'Contributors Guide', link: '/install-scripts/contributing' },
        { text: 'Reference: Schema', link: '/install-scripts/reference/schema' },
        { text: 'Reference: Pipeline', link: '/install-scripts/reference/pipeline' },
        { text: 'Apps (Curated Scripts)', link: '/install-scripts/curated/' },


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
