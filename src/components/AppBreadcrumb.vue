<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'

const breadcrumbs = ref([])

const getBreadcrumbs = () =>
  router.currentRoute.value.matched.map(route => ({
    active: route.path === router.currentRoute.value.fullPath,
    name: route.name || route.path,
    path: route.path,
  }))

router.afterEach(() => { breadcrumbs.value = getBreadcrumbs() })
onMounted(() => { breadcrumbs.value = getBreadcrumbs() })
</script>

<template>
  <CBreadcrumb class="my-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item.path"
      :href="item.active ? '' : item.path"
      :active="item.active"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>
