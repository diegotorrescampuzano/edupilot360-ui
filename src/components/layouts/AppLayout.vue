<template>
  <!-- Main layout container: sidebar on the left, header at the top, and main content -->
  <div class="min-h-screen flex bg-background">
    <!-- Sidebar component -->
    <AppSidebar class="w-64 bg-primary text-textOnPrimary" />
    <div class="flex-1 flex flex-col">
      <!-- Header component -->
      <AppHeader class="bg-white shadow" />
      <!-- Main content area (slot for child components) -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Importing layout components
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>
