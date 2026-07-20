import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/lessons', name: 'Lessons', component: () => import('../views/Lessons.vue'), meta: { requiresAuth: true } },
  { path: '/lesson/:id', name: 'LessonDetail', component: () => import('../views/LessonDetail.vue'), meta: { requiresAuth: true } },
  { path: '/flashcards/:lessonId', name: 'Flashcards', component: () => import('../views/Flashcards.vue'), meta: { requiresAuth: true } },
  { path: '/exercises/:lessonId', name: 'Exercises', component: () => import('../views/Exercises.vue'), meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) next('/login')
  else if (to.path === '/login' && authStore.isAuthenticated) next('/lessons')
  else next()
})

export default router
