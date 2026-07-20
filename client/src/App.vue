<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">🇵🇹 PortugAI</router-link>
        <div class="nav-menu">
          <router-link v-if="!authStore.isAuthenticated" to="/login" class="nav-link">Login</router-link>
          <template v-else>
            <router-link to="/lessons" class="nav-link">Lessons</router-link>
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <button @click="logout" class="nav-link logout-btn">Logout</button>
          </template>
        </div>
      </div>
    </nav>
    <main class="main-content"><router-view /></main>
    <footer class="footer"><p>&copy; 2024 PortugAI. Learn Portuguese from Zero.</p></footer>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
authStore.initializeAuth()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; color: #333; }
#app { display: flex; flex-direction: column; min-height: 100vh; }
.navbar { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
.nav-logo { font-size: 1.5rem; font-weight: bold; text-decoration: none; color: white; }
.nav-menu { display: flex; gap: 2rem; align-items: center; }
.nav-link { color: white; text-decoration: none; border: none; background: none; cursor: pointer; font-size: 1rem; }
.logout-btn { padding: 0.5rem 1rem; background-color: rgba(255,255,255,0.2); border-radius: 4px; }
.main-content { flex: 1; max-width: 1200px; margin: 0 auto; width: 100%; padding: 2rem; }
.footer { background-color: #333; color: white; text-align: center; padding: 2rem; margin-top: 4rem; }
</style>
