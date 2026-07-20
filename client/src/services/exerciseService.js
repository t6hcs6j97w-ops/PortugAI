import api from './api'

export const exerciseService = {
  getExercises(lessonId) {
    return api.get(`/exercises/lesson/${lessonId}`)
  },
  submitExercise(exerciseId, answer, timeSpent) {
    return api.post(`/exercises/${exerciseId}/submit`, { answer, timeSpent })
  },
  createExercise(exercise) {
    return api.post('/exercises', exercise)
  },
  updateExercise(id, exercise) {
    return api.put(`/exercises/${id}`, exercise)
  },
  deleteExercise(id) {
    return api.delete(`/exercises/${id}`)
  }
}
