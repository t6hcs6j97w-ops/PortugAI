# PortugAI Project Structure

See README.md for setup instructions. Full-stack app: Node/Express + MongoDB backend, Vue 3 + Vite frontend.

## Backend
- server/models: User, Lesson, Flashcard, Exercise, UserProgress
- server/routes: auth, lessons, flashcards, exercises, progress
- server/middleware/auth.js: JWT auth middleware
- server/index.js: entry point

## Frontend
- client/src/views: Home, Login, Lessons, LessonDetail, Flashcards, Exercises, Dashboard, Profile
- client/src/stores: auth, lessons, progress (Pinia)
- client/src/services: api, authService, lessonService, flashcardService, exerciseService, progressService
- client/src/router/index.js: Vue Router with auth guards
