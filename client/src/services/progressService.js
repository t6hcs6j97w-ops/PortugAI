import api from './api'

export const progressService = {
  getProgress() {
    return api.get('/progress')
  },
  getLessonProgress(lessonId) {
    return api.get(`/progress/${lessonId}`)
  },
  updateProgress(lessonId, progressData) {
    return api.post(`/progress/${lessonId}`, progressData)
  },
  getStatistics() {
    return api.get('/progress/stats/overview')
  }
}
