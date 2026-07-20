<template>
  <div class="login">
    <div class="login-card">
      <h1>🇵🇹 PortugAI</h1>
      <p>Sign in to start learning Portuguese</p>
      <div v-if="authStore.error" class="error-message">{{ authStore.error }}</div>
      <div id="google-signin-button" ref="googleButton"></div>
      <p v-if="authStore.isLoading" class="loading">Signing in...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const googleButton = ref(null)

const handleCredentialResponse = async (response) => {
  try {
    await authStore.login(response.credential)
    router.push('/lessons')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    })
    window.google.accounts.id.renderButton(googleButton.value, { theme: 'outline', size: 'large', width: 300 })
  }
})
</script>

<style scoped>
.login { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
.login-card { background: white; padding: 3rem; border-radius: 12px; text-align: center; max-width: 400px; width: 100%; }
.login-card h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #667eea; }
.error-message { background-color: #fee; color: #c33; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
</style>
