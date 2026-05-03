<template>
  <div class="home-screen">
    <!-- decorative elements -->
    <div class="blob-tr"></div>
    <div class="dot dot-a"></div>
    <div class="dot dot-b"></div>

    <!-- header -->
    <div class="home-header">
      <div class="logo-row">
        <div class="logo-circle">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3ecfcf"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" stroke-dasharray="2 2" />
          </svg>
        </div>
        <span class="brand">BatteryMe</span>
      </div>
      <button class="avatar-btn" @click="store.setTab('profile')">
        <span>{{ store.initials.value }}</span>
      </button>
    </div>
    <p class="greeting">Hola, {{ firstName }} 👋</p>

    <!-- emotional battery -->
    <div class="battery-card">
      <div class="bat-header">
        <span class="bat-label">Batería emocional</span>
        <span class="bat-pct">{{ displayBat }}%</span>
      </div>

      <div class="circ-area">
        <div class="circ-wrap">
          <svg viewBox="0 0 110 110" class="circ-svg">
            <circle cx="55" cy="55" r="45" fill="none" stroke="#e0f0f0" stroke-width="9" />
            <circle
              cx="55"
              cy="55"
              r="45"
              fill="none"
              stroke="#3ecfcf"
              stroke-width="9"
              stroke-linecap="round"
              :stroke-dasharray="CIRC"
              :stroke-dashoffset="dashOffset"
              transform="rotate(-90 55 55)"
              class="arc"
            />
          </svg>
          <div class="circ-inner">
            <div class="circ-num">{{ displayBat }}<span class="circ-sym">%</span></div>
            <div class="circ-status">{{ store.statusText.value }}</div>
          </div>
        </div>
      </div>

      <div class="dots-row">
        <span v-for="n in 10" :key="n" class="sdot" :class="{ on: n * 10 <= displayBat }"></span>
      </div>
    </div>

    <!-- activities -->
    <div class="acts-header">
      <span class="section-title">Actividades de hoy</span>
      <span class="count-pill">{{ store.completedCount.value }}/6</span>
    </div>

    <div class="acts-list">
      <ActivityCard
        v-for="act in store.state.activities"
        :key="act.id"
        :activity="act"
        @open="openActivity(act)"
        @uncomplete="store.uncompleteActivity(act.id)"
      />
    </div>

    <Transition name="pop">
      <div class="all-done-banner" v-if="store.allDone.value">
        🌿 ¡Completaste todas las actividades del día! 🌿
      </div>
    </Transition>

    <div style="height: 16px"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { store } from '../useStore.js'
import ActivityCard from './ActivityCard.vue'

const CIRC = 282.74

const displayBat = ref(0)

const dashOffset = computed(() => CIRC - (CIRC * displayBat.value) / 100)

const firstName = computed(() => {
  const n = store.state.user.name || store.state.user.email || 'amigo'
  return n.split(' ')[0]
})

function animateTo(target) {
  const start = displayBat.value
  const diff = target - start
  const dur = 700
  const t0 = performance.now()
  function step(now) {
    const p = Math.min((now - t0) / dur, 1)
    const e = 1 - Math.pow(1 - p, 3)
    displayBat.value = Math.round(start + diff * e)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch(
  () => store.state.battery,
  (val) => animateTo(val),
  { immediate: true },
)

const modalMap = {
  1: 'breath',
  2: 'checkin',
  3: 'pausa',
  4: 'agua',
  5: 'thought',
  6: 'descanso',
}

function openActivity(act) {
  if (act.done) return
  store.openModal(modalMap[act.id])
}
</script>

<style scoped>
.home-screen {
  padding: 26px 22px 0;
  position: relative;
  min-height: 100%;
  background: var(--teal-soft);
}

.blob-tr {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: #c8f0ee;
  opacity: 0.5;
  border-radius: 60% 80% 70% 50% / 70% 50% 80% 60%;
  animation: blobFloat 6s ease-in-out infinite;
  pointer-events: none;
}
.dot {
  position: absolute;
  border-radius: 50%;
  background: var(--teal);
  animation: dotFloat 4s ease-in-out infinite;
  pointer-events: none;
}
.dot-a {
  width: 8px;
  height: 8px;
  top: 70px;
  left: 18px;
  opacity: 0.35;
}
.dot-b {
  width: 5px;
  height: 5px;
  top: 120px;
  right: 30px;
  opacity: 0.25;
  animation-delay: 1.5s;
}
@keyframes blobFloat {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.06) rotate(5deg);
  }
}
@keyframes dotFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  position: relative;
  z-index: 2;
}
.logo-row {
  display: flex;
  align-items: center;
  gap: 9px;
}
.avatar-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--teal);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Serif Display', serif;
  font-size: 14px;
  color: #fff;
  transition: background 0.2s;
  flex-shrink: 0;
}
.avatar-btn:hover {
  background: var(--teal-dark);
}

.greeting {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 18px;
  position: relative;
  z-index: 2;
}

/* Battery card */
.battery-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 18px 18px 14px;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}
.bat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.bat-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.bat-pct {
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: var(--teal);
}

.circ-area {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.circ-wrap {
  position: relative;
  width: 115px;
  height: 115px;
}
.circ-svg {
  width: 100%;
  height: 100%;
}
.arc {
  transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 0.68, 0, 1.2);
}
.circ-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.circ-num {
  font-family: 'DM Serif Display', serif;
  font-size: 30px;
  color: var(--text);
  line-height: 1;
}
.circ-sym {
  font-size: 14px;
  color: var(--teal);
}
.circ-status {
  font-size: 9.5px;
  color: var(--muted);
  text-align: center;
  margin-top: 3px;
  max-width: 74px;
  line-height: 1.3;
}

.dots-row {
  display: flex;
  gap: 4px;
  justify-content: center;
}
.sdot {
  width: 22px;
  height: 6px;
  border-radius: 3px;
  background: #e0f0f0;
  transition: background 0.4s;
}
.sdot.on {
  background: var(--teal);
}

/* Activities */
.acts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
}
.count-pill {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--teal-dark);
  background: rgba(62, 207, 207, 0.12);
  padding: 3px 10px;
  border-radius: 20px;
}
.acts-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
  z-index: 2;
}

.all-done-banner {
  margin-top: 16px;
  padding: 13px 16px;
  background: rgba(62, 207, 207, 0.1);
  border: 1px solid rgba(62, 207, 207, 0.25);
  border-radius: 18px;
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--teal-dark);
  position: relative;
  z-index: 2;
}

.pop-enter-active {
  animation: popIn 0.5s cubic-bezier(0.22, 0.68, 0, 1.4) both;
}
@keyframes popIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
