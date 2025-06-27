// Import necessary functions and components for Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Import the main layout component
import AppLayout from '@/components/layouts/AppLayout.vue'
// Import the login view component (renamed to multiword)
import AuthLogin from '@/views/auth/AuthLogin.vue'
// Import the dashboard view component (renamed to multiword)
import HomeDashboard from '@/views/home/HomeDashboard.vue'

// Define the application routes
const routes = [
  {
    // Route for the login page (public)
    path: '/auth/login',
    component: AuthLogin
  },
  {
    // Main route that uses the AppLayout as a base for all protected routes
    path: '/',
    component: AppLayout,
    // Child routes for the protected area (dashboard, etc.)
    children: [
      // Redirect empty path to the home dashboard
      { path: '', redirect: '/home' },
      // Home dashboard route
      { path: 'home', component: HomeDashboard }
    ]
  }
]

// Create the router instance with web history mode and the defined routes
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Export the router for use in the main app
export default router
