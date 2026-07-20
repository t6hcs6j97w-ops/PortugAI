<template>
  <div class="lessons">
    <h1>📚 Lessons</h1>
    <div v-if="lessonStore.isLoading">Loading...</div>
    <div v-else class="lessons-grid">
      <router-link v-for="lesson in lessonStore.lessons" :key="lesson._id" :to="`/lesson/${lesson._id}`" class="lesson-card">
        <div class="lesson-number">Lesson {{ lesson.lessonNumber }}</div>
        <h3>{{ lesson.title }}</h3>
        <p>{{ lesson.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLessonStore } from '../stores/lessons'

const lessonStore = useLessonStore()
onMounted(() => lessonStore.fetchLessons())
</script>

<style scoped>
.lessons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.lesson-card { background: white; padding: 1.5rem; border-radius: 12px; text-decoration: none; color: #333; border-left: 4px solid #667eea; }
.lesson-number { color: #667eea; font-weight: bold; font-size: 0.9rem; }
</style>
