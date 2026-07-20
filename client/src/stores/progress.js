import { defineStore } from 'pinia'
import { ref } from 'vue'
import { progressService } from '../services/progressService'

export const useProgressStore = defineStore('progress', () => {
  const userProgress = ref([])
  const statistics = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchProgress = async () => {
    isLoading.value = true
    error.value = null
    try {
      userProgress.value = await progressService.getProgress()
    } catch (err) {
      error.value = err.message || 'Failed to fetch progress'
    } finally {
      isLoading.value = false
    }
  }

  const fetchStatistics = async () => {
    isLoading.value = true
    error.value = null
    try {
      statistics.value = await progressService.getStatistics()
    } catch (err) {
      error.value = err.message || 'Failed to fetch statistics'
    } finally {
      isLoading.value = false
    }
  }

  const updateProgress = async (lessonId, progressData) => {
    const updated = await progressService.updateProgress(lessonId, progressData)
    const index = userProgress.value.findIndex(p => p.lessonId === lessonId)
    if (index !== -1) userProgress.value[index] = updated
    else userProgress.value.push(updated)
    return updated
  }

  return { userProgress, statistics, isLoading, error, fetchProgress, fetchStatistics, updateProgress }
})
