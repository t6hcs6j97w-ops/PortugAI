<template>
  <div class="exercises">
    <router-link :to="`/lesson/${route.params.lessonId}`" class="back-link">← Back</router-link>
    <h1>🎯 Exercises</h1>
    <div v-if="exercises.length && !isFinished" class="exercise-card">
      <h3>{{ currentExercise.question }}</h3>
      <div class="options">
        <button v-for="(opt, i) in currentExercise.options" :key="i" @click="selectAnswer(opt)" :disabled="showResult">{{ opt }}</button>
      </div>
      <div v-if="showResult">
        <p>{{ isCorrect ? '✓ Correct!' : '✗ Incorrect' }}</p>
        <button @click="nextExercise">Next</button>
      </div>
    </div>
    <div v-else-if="isFinished">
      <h2>Done! Score: {{ score }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { exerciseService } from '../services/exerciseService'

const route = useRoute()
const exercises = ref([])
const currentIndex = ref(0)
const showResult = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const isFinished = ref(false)
const currentExercise = computed(() => exercises.value[currentIndex.value] || {})

onMounted(async () => {
  exercises.value = await exerciseService.getExercises(route.params.lessonId)
})

const selectAnswer = async (answer) => {
  const result = await exerciseService.submitExercise(currentExercise.value._id, answer, 0)
  isCorrect.value = result.correct
  if (result.correct) score.value += result.points
  showResult.value = true
}

const nextExercise = () => {
  if (currentIndex.value < exercises.value.length - 1) {
    currentIndex.value++
    showResult.value = false
  } else {
    isFinished.value = true
  }
}
</script>

<style scoped>
.exercise-card { background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto; }
.options { display: flex; flex-direction: column; gap: 0.75rem; margin: 1.5rem 0; }
.options button { padding: 1rem; border: 2px solid #ddd; border-radius: 8px; background: white; cursor: pointer; }
</style>
