<template>
  <div class="flashcards">
    <router-link :to="`/lesson/${route.params.lessonId}`" class="back-link">← Back</router-link>
    <h1>📇 Flashcards</h1>
    <div v-if="flashcards.length" class="flashcard-container">
      <div class="flashcard" :class="{ flipped: isFlipped }" @click="isFlipped = !isFlipped">
        <div class="flashcard-inner">
          <div class="flashcard-front"><p>{{ currentCard.front }}</p></div>
          <div class="flashcard-back"><p>{{ currentCard.back }}</p></div>
        </div>
      </div>
      <div class="navigation">
        <button @click="prev" :disabled="currentIndex === 0">← Prev</button>
        <button @click="next" :disabled="currentIndex === flashcards.length - 1">Next →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { flashcardService } from '../services/flashcardService'

const route = useRoute()
const flashcards = ref([])
const currentIndex = ref(0)
const isFlipped = ref(false)
const currentCard = computed(() => flashcards.value[currentIndex.value] || {})

onMounted(async () => {
  flashcards.value = await flashcardService.getFlashcards(route.params.lessonId)
})

const next = () => { if (currentIndex.value < flashcards.value.length - 1) { currentIndex.value++; isFlipped.value = false } }
const prev = () => { if (currentIndex.value > 0) { currentIndex.value--; isFlipped.value = false } }
</script>

<style scoped>
.flashcard { perspective: 1000px; height: 300px; cursor: pointer; margin-bottom: 2rem; }
.flashcard-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
.flashcard.flipped .flashcard-inner { transform: rotateY(180deg); }
.flashcard-front, .flashcard-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
.flashcard-front { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.flashcard-back { background: white; transform: rotateY(180deg); }
.navigation { display: flex; justify-content: center; gap: 1rem; }
</style>
