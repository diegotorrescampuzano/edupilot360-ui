<script setup>
import { onMounted, ref, computed } from 'vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import { useSidebarStore } from '@/stores/sidebar.js'
import { useAuthStore } from '@/stores/auth'

const headerClassNames = ref('mb-4 p-0')
const sidebar = useSidebarStore()
// Tu auth store para obtener usuario y logout
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const logout = () => authStore.logout()
onMounted(() => {
  document.addEventListener('scroll', () => {
    headerClassNames.value = document.documentElement.scrollTop > 0 ? 'mb-4 p-0 shadow-sm' : 'mb-4 p-0'
  })
})
</script>

<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderToggler @click="sidebar.toggleVisible()" style="margin-inline-start: -14px">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex">
        <CNavItem>
          <CNavLink href="/home">Dashboard</CNavLink>
        </CNavItem>
        <CNavItem><CNavLink href="#">Profesores</CNavLink></CNavItem>
        <CNavItem><CNavLink href="#">Estudiantes</CNavLink></CNavItem>
      </CHeaderNav>
      <CHeaderNav class="ms-auto">
        <CNavItem>
          <CNavLink href="#"><CIcon icon="cil-bell" size="lg" /></CNavLink>
        </CNavItem>
      </CHeaderNav>
      <!-- Menú usuario personalizado -->
      <CHeaderNav>
        <AppHeaderDropdownAccnt :user="user" @logout="logout"/>
      </CHeaderNav>
    </CContainer>
    <CContainer class="px-4" fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>
