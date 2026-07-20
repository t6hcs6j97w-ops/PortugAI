<template>
  <div class="home">
    <div class="hero">
      <h1>🇵🇹 Aprenda Português do Zero</h1>
      <p class="subtitle">Learn Portuguese from Zero - 100+ Interactive Lessons</p>
      <router-link to="/login" class="cta-button">Começar Agora / Start Now</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home { text-align: center; }
.hero { padding: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; }
.hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
.subtitle { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
.cta-button { display: inline-block; padding: 1rem 2rem; background-color: white; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: bold; }
</style>
