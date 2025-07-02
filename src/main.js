import { createApp } from 'vue'
import { createPinia } from 'pinia' // Remove if not using Pinia
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useAuthStore } from './stores/auth' // Ajusta la ruta según tu estructura

const app = createApp(App)

// Use Pinia (remove if not using)
app.use(createPinia())

app.use(router)
app.mount('#app')

// SOLO PARA PRUEBAS: expón el store en window
window.authStore = useAuthStore()