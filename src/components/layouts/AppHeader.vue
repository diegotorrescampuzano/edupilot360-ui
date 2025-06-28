<template>
  <!-- Header bar with welcome message and logout button -->
  <header class="h-16 flex items-center justify-between px-6">
    <!-- Display the authenticated user's email or a default label -->
    <div class="text-textPrimary font-bold">
      Bienvenido, {{ user?.email || 'Usuario' }}
    </div>
    <!-- Logout button; triggers the logout action on click -->
    <button
      @click="logout"
      class="bg-primary text-textOnPrimary px-4 py-2 rounded hover:bg-secondary"
    >
      Cerrar sesión
    </button>
  </header>
</template>

<script setup>
// Import computed for reactive data
import { computed } from 'vue'
// Import the authentication store from Pinia
import { useAuthStore } from '@/stores/auth'

// Get the authentication store instance
const authStore = useAuthStore()
// Create a computed property for the current user from the store
const user = computed(() => authStore.user)
// Define the logout function that calls the store's logout action
const logout = () => authStore.logout()
</script>
