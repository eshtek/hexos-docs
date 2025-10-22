<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const route = useRoute()

// Watch for route changes and ensure only the active section is expanded
watch(
  () => route.path,
  () => {
    // Small delay to let VitePress update the DOM
    setTimeout(() => {
      const sidebar = document.querySelector('.VPSidebar')
      if (!sidebar) return

      // Get all top-level sidebar items
      const topLevelItems = sidebar.querySelectorAll('.VPSidebarItem.level-0')

      topLevelItems.forEach((item) => {
        const link = item.querySelector('.link')
        const hasActive = item.classList.contains('has-active')
        const isCollapsed = item.classList.contains('collapsed')

        // If this section doesn't contain the active page and is not collapsed, collapse it
        if (!hasActive && !isCollapsed) {
          const caret = item.querySelector('.caret')
          if (caret instanceof HTMLElement) {
            caret.click()
          }
        }
      })
    }, 50)
  },
  { immediate: true }
)
</script>

<template>
  <DefaultTheme.Layout />
</template>
