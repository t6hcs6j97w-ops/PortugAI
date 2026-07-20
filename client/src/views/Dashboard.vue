<template>
  <div class="dashboard">
    <h1>📊 Dashboard</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ progressStore.statistics?.totalLessonsCompleted || 0 }}</div>
        <div class="stat-label">Lessons Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ progressStore.statistics?.averageScore || 0 }}%</div>
        <div class="stat-label">Average Score</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProgressStore } from '../stores/progress'

const progressStore = useProgressStore()
onMounted(async () => {
  await progressStore.fetchStatistics()
})
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.stat-card { background: white; padding: 2rem; border-radius: 12px; text-align: center; }
.stat-value { font-size: 2rem; font-weight: bold; color: #667eea; }
</style>
