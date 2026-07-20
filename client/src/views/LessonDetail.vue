<template>
  <div class="lesson-detail">
    <div v-if="lessonStore.currentLesson">
      <router-link to="/lessons" class="back-link">← Back to Lessons</router-link>
      <h1>{{ lessonStore.currentLesson.title }}</h1>
      <p>{{ lessonStore.currentLesson.description }}</p>
      <div class="action-buttons">
        <router-link :to="`/flashcards/${lessonStore.currentLesson._id}`" class="action-btn">📇 Flashcards</router-link>
        <router-link :to="`/exercises/${lessonStore.currentLesson._id}`" class="action-btn">🎯 Exercises</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonStore } from '../stores/lessons'

const route = useRoute()
const lessonStore = useLessonStore()
onMounted(() => lessonStore.fetchLesson(route.params.id))
</script>

<style scoped>
.action-buttons { display: flex; gap: 1rem; margin-top: 2rem; }
.action-btn { flex: 1; padding: 1rem 2rem; text-align: center; border-radius: 8px; text-decoration: none; font-weight: bold; color: white; background-color: #667eea; }
</style>
