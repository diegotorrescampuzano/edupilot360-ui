<template>
  <!-- Login page: centered form on a light background -->
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">Iniciar sesión</h1>
      <form>
        <!-- Email input field -->
        <div class="mb-4">
          <label class="block text-textPrimary mb-2">Correo electrónico</label>
          <input
            type="email"
            class="w-full p-2 border border-neutral rounded focus:outline-none focus:border-primary"
          />
        </div>
        <!-- Password input field -->
        <div class="mb-6">
          <label class="block text-textPrimary mb-2">Contraseña</label>
          <input
            type="password"
            class="w-full p-2 border border-neutral rounded focus:outline-none focus:border-primary"
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
