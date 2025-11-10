import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Breadcrumb from './Breadcrumb.vue'
import Layout from './Layout.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(Layout, null, {
      'doc-before': () => h(Breadcrumb)
    })
  }
}
