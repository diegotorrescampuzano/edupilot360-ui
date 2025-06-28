<template>
  <!-- Login page: centered form on a light background -->
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img
          src="@/assets/images/logo-edupilot360.webp"
          alt="Logo EduPilot360"
          class="h-32 w-auto"
        />
      </div>
      <!-- Title -->
      <h1 class="text-2xl font-bold text-center text-primary mb-6">Iniciar sesión test4</h1>
      <!-- Error message (friendly for user) -->
      <div v-if="friendlyError" class="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ friendlyError }}
      </div>
      <!-- Form -->
      <form @submit.prevent="login">
        <!-- Email input field -->
        <div class="mb-4">
          <label class="block text-textPrimary mb-2">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-2 border border-neutral rounded focus:outline-none focus:border-primary"
            required
          />
        </div>
        <!-- Password input field -->
        <div class="mb-6">
          <label class="block text-textPrimary mb-2">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border border-neutral rounded focus:outline-none focus:border-primary"
            required
          />
        </div>
        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-primary text-textOnPrimary py-2 rounded hover:bg-secondary"
        >
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Import Vue composition API functions
import { ref } from 'vue'
// Import Pinia auth store
import { useAuthStore } from '@/stores/auth'
// Import router for navigation
import { useRouter } from 'vue-router'

// State variables for form and errors
const email = ref('')
const password = ref('')
const friendlyError = ref(null) // Error message for the user

const authStore = useAuthStore()
const router = useRouter()

// Login handler
const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    // If the store has an error, show a friendly message
    if (authStore.error) {
      // Log the original Firebase error for debugging
      console.error('Login error:', authStore.error)
      // Show a friendly message to the user (in Spanish)
      friendlyError.value = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.'
    } else {
      // If login is successful, clear error and navigate to dashboard
      friendlyError.value = null
      router.push('/')
    }
  } catch (err) {
    // Log any unexpected error
    console.error('Unexpected login error:', err.message)
    friendlyError.value = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
  }
}
</script>
