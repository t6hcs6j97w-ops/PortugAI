import api from './api'

export const flashcardService = {
  getFlashcards(lessonId) {
    return api.get(`/flashcards/lesson/${lessonId}`)
  },
  createFlashcard(flashcard) {
    return api.post('/flashcards', flashcard)
  },
  updateFlashcard(id, flashcard) {
    return api.put(`/flashcards/${id}`, flashcard)
  },
  deleteFlashcard(id) {
    return api.delete(`/flashcards/${id}`)
  }
}
