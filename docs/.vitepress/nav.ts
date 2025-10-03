import type { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/' },
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
      { text: 'Features', link: '/features/' },
      { text: 'Troubleshooting', link: '/troubleshooting/' },
    ]
  },
  {
    text: 'Resources',
    items: [
      { text: 'Community', link: '/community/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Release Notes', link: '/release-notes/command-deck/' },
    ]
  },
]

export default nav
