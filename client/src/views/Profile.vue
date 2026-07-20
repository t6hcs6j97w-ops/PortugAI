<template>
  <div class="profile">
    <h1>👤 Profile</h1>
    <div class="profile-card">
      <h2>{{ authStore.user?.name }}</h2>
      <p>{{ authStore.user?.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>

<style scoped>
.profile-card { background: white; padding: 3rem; border-radius: 12px; text-align: center; }
</style>
