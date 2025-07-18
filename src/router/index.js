// src/router/index.js

// Import necessary functions and components for Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Import the main layout component for protected routes
import DefaultLayout from '@/layouts/DefaultLayout.vue'
// Import the login view component
import AuthLogin from '@/views/auth/AuthLogin.vue'
// Import the dashboard view component
import HomeDashboard from '@/views/home/HomeDashboard.vue'
// Import Firebase auth instance to check authentication state
import { auth } from '../firebase/config'

// Import new views for admin sections
// (Create these files as you develop each screen.)
import UsersList from '@/views/admin/users/UsersList.vue'
/*import RolesList from '@/views/admin/roles/RolesList.vue'
import PermissionsList from '@/views/admin/permissions/PermissionsList.vue'*/

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
    component: DefaultLayout,
    // Meta flag to indicate this route requires authentication
    meta: { requiresAuth: true },
    // Route name for navigation to show in the navigation bar (breadcrumbs)
    name: 'Home',
    // Child routes within the protected layout
    children: [
      // Default route redirects to home dashboard
      { path: '', component: HomeDashboard, name: 'Dashboard' },
      // Explicit home dashboard route
      { path: 'home', component: HomeDashboard, name: 'Dashboard' },
      // --- Admin module screens under /admin/ path prefix ---
      // Users management list
      {
        path: 'admin/users',
        component: UsersList,
        name: 'Usuarios',
        meta: { requiresAuth: true }
      },
      // Roles management list
      /*{
        path: 'admin/roles',
        component: RolesList,
        name: 'Roles',
        meta: { requiresAuth: true }
      },
      // Permissions management list
      {
        path: 'admin/permissions',
        component: PermissionsList,
        name: 'Permisos',
        meta: { requiresAuth: true }
      },*/
      // You can add create/edit/detail child routes as you expand the module.
      // Example (recommended in future):
      // { path: 'admin/users/create', component: UserForm, name: 'CrearUsuario', meta: { requiresAuth: true } },
      // { path: 'admin/roles/create', component: RoleForm, name: 'CrearRol', meta: { requiresAuth: true } },
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

/*
  EXPLANATION:
  - We introduced nested child routes under `/admin/` for users, roles, and permissions management,
    organizing the admin screens following scalable best practices.
  - Route names for navigation and breadcrumbs are in Spanish for consistency with the UI.
  - All route meta and authentication logic are preserved.
  - The file preserves original comments, coding style, and expands your project architecture cleanly.
  - For each new feature screen (UsersList, RolesList, PermissionsList), create a corresponding .vue file under /views/admin/.
*/
