import { defineStore } from 'pinia'
import { ref } from 'vue'
import { lessonService } from '../services/lessonService'

export const useLessonStore = defineStore('lessons', () => {
  const lessons = ref([])
  const currentLesson = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchLessons = async () => {
    isLoading.value = true
    error.value = null
    try {
      lessons.value = await lessonService.getAllLessons()
    } catch (err) {
      error.value = err.message || 'Failed to fetch lessons'
    } finally {
      isLoading.value = false
    }
  }

  const fetchLesson = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      currentLesson.value = await lessonService.getLesson(id)
    } catch (err) {
      error.value = err.message || 'Failed to fetch lesson'
    } finally {
      isLoading.value = false
    }
  }

  return { lessons, currentLesson, isLoading, error, fetchLessons, fetchLesson }
})
