<template>
  <ModalBase title="Respiración guiada" @close="handleClose">

    <!-- RUNNING STATE -->
    <div v-if="!finished">
      <p class="intro-txt">Sigue el ritmo del círculo. Inhala cuando crece, exhala cuando se reduce.</p>

      <div class="breath-wrap">
        <div class="breath-ring" :class="breathClass">
          <div class="breath-core">
            <div class="breath-count">{{ cycle + 1 }}</div>
            <div class="breath-of">de {{ TOTAL }}</div>
          </div>
        </div>
        <div class="phase-label">{{ phaseLabel }}</div>
      </div>

      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
      </div>
      <div class="progress-label">{{ cycle }} de {{ TOTAL }} respiraciones</div>

      <button v-if="!running" class="btn-teal" @click="start">Comenzar</button>
      <button v-else class="btn-outline" @click="handleClose">Pausar</button>
    </div>

    <!-- DONE STATE -->
    <div v-else class="done-state">
      <div class="done-circle">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="done-title">¡Excelente trabajo!</div>
      <div class="done-sub">Completaste 5 respiraciones guiadas. Tu mente está más tranquila.</div>
      <button class="btn-teal" @click="finish">Guardar progreso</button>
    </div>

  </ModalBase>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { store } from '../../useStore.js'
import ModalBase from './ModalBase.vue'

const TOTAL = 5
const PHASES = [
  { label: 'Inhala...', duration: 4000, expand: true },
  { label: 'Retén',     duration: 2000, expand: true },
  { label: 'Exhala...', duration: 4000, expand: false },
]

const running = ref(false)
const finished = ref(false)
const cycle = ref(0)
const phaseIdx = ref(0)
const breathClass = ref('')
const phaseLabel = ref('Prepárate')
let timer = null

const progressPct = computed(() => Math.round((cycle.value / TOTAL) * 100))

function start() {
  running.value = true
  cycle.value = 0
  nextPhase()
}

function nextPhase() {
  if (!running.value) return
  if (phaseIdx.value >= PHASES.length) {
    phaseIdx.value = 0
    cycle.value++
    if (cycle.value >= TOTAL) {
      running.value = false
      finished.value = true
      return
    }
  }
  const ph = PHASES[phaseIdx.value]
  phaseLabel.value = ph.label
  breathClass.value = ph.expand ? 'expand' : 'contract'
  phaseIdx.value++
  timer = setTimeout(nextPhase, ph.duration)
}

function stop() {
  clearTimeout(timer)
  running.value = false
}

function handleClose() {
  stop()
  store.closeModal()
}

function finish() {
  store.completeActivity(1)
  store.closeModal()
}

onUnmounted(stop)
</script>

<style scoped>
.intro-txt { font-size: 13px; color: var(--muted); margin-bottom: 22px; line-height: 1.6; text-align: center; }

.breath-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }

.breath-ring {
  width: 160px; height: 160px; border-radius: 50%;
  border: 3px solid var(--teal);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  transition: transform 4s ease-in-out, border-color 0.5s;
}
.breath-ring.expand   { transform: scale(1.3); border-color: var(--teal-dark); }
.breath-ring.contract { transform: scale(1);   border-color: var(--teal); }

.breath-core {
  width: 90px; height: 90px; border-radius: 50%;
  background: var(--teal-pale);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.breath-count { font-family: 'DM Serif Display', serif; font-size: 30px; color: var(--teal-dark); line-height: 1; }
.breath-of    { font-size: 11px; color: var(--muted); margin-top: 2px; }

.phase-label  { font-size: 15px; font-weight: 600; color: var(--text); min-height: 22px; }

.progress-track {
  background: #e0f0f0; border-radius: 8px; height: 7px; margin-bottom: 8px; overflow: hidden;
}
.progress-fill { height: 100%; background: var(--teal); border-radius: 8px; transition: width 0.5s ease; }
.progress-label { font-size: 11.5px; color: var(--muted); text-align: center; margin-bottom: 20px; }

/* Done state */
.done-state { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 10px 0; }
.done-circle {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--teal-pale);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  animation: popIn 0.5s cubic-bezier(0.22,0.68,0,1.4) both;
}
.done-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text); margin-bottom: 8px; }
.done-sub   { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 22px; }

@keyframes popIn { from{transform:scale(0);opacity:0;} to{transform:scale(1);opacity:1;} }
</style>