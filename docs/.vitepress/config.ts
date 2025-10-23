import { defineConfig } from 'vitepress'
import sidebar, { nav } from './sidebar'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'HexOS Docs',
    description: 'Install Scripts, TrueNAS integration, and platform guides',
    lang: 'en-US',
    lastUpdated: true,
    themeConfig: {
      logo: '/logo.svg',
      nav,
      sidebar,
      outline: {
        level: [2, 3],
        label: 'On this page'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/eshtek/hexos-docs' }
      ],
      editLink: {
        pattern: 'https://github.com/eshtek/hexos-docs/edit/dev/docs/:path',
        text: 'Edit this page on GitHub'
      },
      footer: {
        message: 'Released under the MIT License',
        copyright: '© HexOS'
      },
      search: { provider: 'local' }
    },
    base: '/',
    mermaid: {

    },
  })
)
