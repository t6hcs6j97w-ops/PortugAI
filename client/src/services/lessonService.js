import api from './api'

export const lessonService = {
  getAllLessons() {
    return api.get('/lessons')
  },
  getLesson(id) {
    return api.get(`/lessons/${id}`)
  },
  createLesson(lesson) {
    return api.post('/lessons', lesson)
  },
  updateLesson(id, lesson) {
    return api.put(`/lessons/${id}`, lesson)
  },
  deleteLesson(id) {
    return api.delete(`/lessons/${id}`)
  }
}
