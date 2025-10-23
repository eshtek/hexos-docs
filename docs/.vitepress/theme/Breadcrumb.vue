<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()

interface BreadcrumbItem {
  text: string
  link: string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  const parts = path.split('/').filter(Boolean)
  const crumbs: BreadcrumbItem[] = [{ text: 'Home', link: '/' }]

  let currentPath = ''
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    currentPath += `/${part}`

    // Convert path segment to readable text
    let text = part
      .replace(/-/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Use page title for last segment if available
    if (i === parts.length - 1 && page.value.title) {
      text = page.value.title
    }

    crumbs.push({ text, link: currentPath })
  }

  return crumbs
})
</script>

<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.link">
        <a v-if="index < breadcrumbs.length - 1" :href="crumb.link">{{ crumb.text }}</a>
        <span v-else class="current">{{ crumb.text }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  padding: 0 0 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 20px;
}

.breadcrumb ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.breadcrumb li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}

.breadcrumb .current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.breadcrumb .separator {
  color: var(--vp-c-text-3);
}
</style>
