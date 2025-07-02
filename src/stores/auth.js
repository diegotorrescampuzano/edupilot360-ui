// Import Pinia's defineStore to create a reactive store
import { defineStore } from 'pinia'
// Import the Firebase auth instance
import { auth } from '../firebase/config'
// Import Firebase authentication functions
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
// Import the router to perform navigation after login/logout
import router from '../router'

// Define the authentication store using Pinia
export const useAuthStore = defineStore('auth', {
  // State function returns the reactive state object
  state: () => ({
    user: null,         // Stores the authenticated user object
    error: null,        // Stores the raw error message from Firebase
    errorMessage: null  // Stores a friendly error message for the user (in Spanish)
  }),
  // Actions are methods that can modify the state and perform async logic
  actions: {
    // Action to log in a user with email and password
    async login(email, password) {
      try {
        // Reset errors before attempting login
        this.error = null
        this.errorMessage = null
        // Attempt to sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // If successful, store the user object
        this.user = userCredential.user
      } catch (err) {
        // Log the original error message for debugging
        console.error('Login error:', err.message)
        // Store the raw error message
        this.error = err.message
        // Store a friendly error message for the user (in Spanish)
        this.errorMessage = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.'
      }
    },
    // Action to log out the current user
    async logout() {
      try {
        // Attempt to sign out with Firebase Auth
        await signOut(auth)
        // Clear user and error state after logout
        this.user = null
        this.error = null
        this.errorMessage = null
        // Redirect the user to the login page
        router.push('/auth/login')
      } catch (err) {
        // Log the original error message for debugging
        console.error('Logout error:', err.message)
        // Store the raw error message
        this.error = err.message
        // Store a friendly error message for the user (in Spanish)
        this.errorMessage = 'No se pudo cerrar la sesión. Inténtalo de nuevo.'
      }
    },
    // Action to get the current user's ID token (for testing)
    async getIdToken() {
      if (!this.user) {
        console.warn('No user is logged in');
        return null;
      }
      // getIdToken() is an async method of the Firebase user object
      const token = await this.user.getIdToken();
      console.log('ID Token:', token);
      // Optionally, copy to clipboard for convenience
      try {
        await navigator.clipboard.writeText(token);
        console.log('Token copied to clipboard!');
      } catch (e) {
        // Clipboard API might not be available everywhere
        console.warn('Could not copy token to clipboard:', e.message);
      }
      return token;
    }
  }
})
