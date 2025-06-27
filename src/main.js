// Import Vue core and the main App component
import { createApp } from 'vue'
import App from './App.vue'
// Import TailwindCSS global styles
import '@/assets/css/main.css'
// Import router configuration
import router from './router'

// Create and mount the Vue app with the router
createApp(App)
  .use(router)
  .mount('#app')
