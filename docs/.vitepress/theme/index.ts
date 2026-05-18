import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Breadcrumb from './Breadcrumb.vue'
import Layout from './Layout.vue'
import { h } from 'vue'
import type { EnhanceAppContext } from 'vitepress'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

const GTM_ID = 'GTM-524ZLZQB'

function injectGtmScript(): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`)) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(Layout, null, {
      'doc-before': () => h(Breadcrumb)
    })
  },
  enhanceApp({ router }: EnhanceAppContext) {
    if (typeof window === 'undefined') return

    injectGtmScript()

    router.onAfterRouteChanged = (to: string) => {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'page_view',
        page_path: to,
        page_location: window.location.href,
        page_title: document.title
      })
    }
  }
}
