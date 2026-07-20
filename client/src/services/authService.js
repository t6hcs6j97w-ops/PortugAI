import api from './api'

export const authService = {
  googleLogin(token) {
    return api.post('/auth/google', { token })
  },
  getCurrentUser() {
    return api.get('/auth/me')
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  setToken(token) {
    localStorage.setItem('token', token)
  },
  getToken() {
    return localStorage.getItem('token')
  },
  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}
