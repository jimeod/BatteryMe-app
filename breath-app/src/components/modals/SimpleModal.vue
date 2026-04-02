<template>
  <ModalBase :title="title" @close="handleClose">
    <div class="simple-body">

      <!-- Icon -->
      <div class="icon-circle">
        <svg v-if="icon === 'walk'" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="1.7" stroke-linecap="round">
          <circle cx="12" cy="4" r="2"/><path d="M9 10l-2 4h10l-2-4"/><path d="M12 10v4"/><path d="M9 20l1.5-4M15 20l-1.5-4"/>
        </svg>
        <svg v-else-if="icon === 'water'" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="1.7" stroke-linecap="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
        <svg v-else-if="icon === 'phone'" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="1.7" stroke-linecap="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      </div>

      <p class="act-message">{{ message }}</p>

      <!-- Timer (only if seconds > 0) -->
      <div v-if="seconds > 0" class="timer-display">{{ timerDisplay }}</div>

      <!-- Buttons -->
      <div class="btn-group">
        <button
          v-if="seconds > 0 && buttonLabel"
          class="btn-teal"
          :disabled="timerRunning || timerDone"
          @click="startTimer"
        >
          {{ timerRunning ? 'En curso...' : timerDone ? 'Completado' : buttonLabel }}
        </button>
        <button class="btn-outline" @click="complete">{{ doneLabel }}</button>
      </div>

    </div>
  </ModalBase>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { store } from '../../useStore.js'
import ModalBase from './ModalBase.vue'

const props = defineProps({
  modalId:     String,
  seconds:     { type: Number, default: 0 },
  title:       String,
  activityId:  Number,
  icon:        String,
  message:     String,
  buttonLabel: { type: String, default: '' },
  doneLabel:   String,
})

const remaining = ref(props.seconds)
const timerRunning = ref(false)
const timerDone = ref(false)
let interval = null

const timerDisplay = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${m}:${s < 10 ? '0' : ''}${s}`
})

function startTimer() {
  if (timerRunning.value || timerDone.value) return
  timerRunning.value = true
  interval = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) {
      clearInterval(interval)
      timerRunning.value = false
      timerDone.value = true
    }
  }, 1000)
}

function complete() {
  clearInterval(interval)
  store.completeActivity(props.activityId)
  store.closeModal()
}

function handleClose() {
  clearInterval(interval)
  store.closeModal()
}

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.simple-body { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8px 0 4px; }

.icon-circle {
  width: 96px; height: 96px; border-radius: 50%;
  background: var(--teal-pale);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}

.act-message { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; max-width: 260px; }

.timer-display {
  font-family: 'DM Serif Display', serif;
  font-size: 48px; color: var(--teal);
  line-height: 1; margin-bottom: 24px;
  letter-spacing: -1px;
}

.btn-group { display: flex; flex-direction: column; gap: 10px; width: 100%; }
</style>