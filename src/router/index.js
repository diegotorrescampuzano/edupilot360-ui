// Import necessary functions and components for Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Import the main layout component for protected routes
import AppLayout from '@/components/layouts/AppLayout.vue'
// Import the login view component
import AuthLogin from '@/views/auth/AuthLogin.vue'
// Import the dashboard view component
import HomeDashboard from '@/views/home/HomeDashboard.vue'
// Import Firebase auth instance to check authentication state
import { auth } from '../firebase/config'

// Define application routes
const routes = [
  {
    // Public route for login page
    path: '/auth/login',
    component: AuthLogin,
    // Meta flag to indicate this route doesn't require authentication
    meta: { requiresAuth: false }
  },
  {
    // Main protected route that uses the application layout
    path: '/',
    component: AppLayout,
    // Meta flag to indicate this route requires authentication
    meta: { requiresAuth: true },
    // Child routes within the protected layout
    children: [
      // Default route redirects to home dashboard
      { path: '', component: HomeDashboard },
      // Explicit home dashboard route
      { path: 'home', component: HomeDashboard }
    ]
  }
]

// Create router instance with web history mode
const router = createRouter({
  // Use HTML5 history mode for clean URLs
  history: createWebHistory(),
  // Pass the defined routes
  routes
})

// Global route guard to handle authentication redirection
router.beforeEach(async (to, from, next) => {
  // Check if the target route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Get current user from Firebase auth
  // Wrap in promise to handle async auth state
  const currentUser = await new Promise((resolve) => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      // Unsubscribe immediately after getting the first state
      unsubscribe()
      // Resolve with user object (or null if not authenticated)
      resolve(user)
    })
  })

  // Handle route access based on authentication status
  if (requiresAuth && !currentUser) {
    // Redirect to login if route requires auth and user is not authenticated
    next('/auth/login')
  } else if (!requiresAuth && currentUser && to.path === '/auth/login') {
    // Redirect to home if user is authenticated but tries to access login page
    next('/')
  } else {
    // Proceed to the requested route
    next()
  }
})

// Export the configured router for use in the main app
export default router
