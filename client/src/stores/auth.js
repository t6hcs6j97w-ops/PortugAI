import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (googleToken) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.googleLogin(googleToken)
      token.value = response.token
      user.value = response.user
      authService.setToken(response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    authService.logout()
    localStorage.removeItem('user')
  }

  const initializeAuth = () => {
    const storedToken = authService.getToken()
    const storedUser = localStorage.getItem('user')
    if (storedToken) {
      token.value = storedToken
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    }
  }

  return { user, token, isLoading, error, isAuthenticated, login, logout, initializeAuth }
})
