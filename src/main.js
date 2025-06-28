import { createApp } from 'vue'
import { createPinia } from 'pinia' // Remove if not using Pinia
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

// Use Pinia (remove if not using)
app.use(createPinia())

app.use(router)
app.mount('#app')
