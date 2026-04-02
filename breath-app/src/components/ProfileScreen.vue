<template>
  <div class="profile-screen">

    <!-- hero -->
    <div class="prof-hero">
      <div class="hero-blob"></div>
      <div class="avatar">{{ store.initials.value }}</div>
      <div class="prof-name">{{ store.state.user.name }}</div>
      <div class="prof-email">{{ store.state.user.email }}</div>
    </div>

    <!-- stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-num">{{ store.state.currentStreak }}</div>
        <div class="stat-lbl">🔥 Racha</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{ store.completedCount.value }}</div>
        <div class="stat-lbl">✅ Actividades</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{ store.state.battery }}%</div>
        <div class="stat-lbl">⚡ Batería</div>
      </div>
    </div>

    <!-- streak week -->
    <div class="section-card">
      <div class="section-label">Racha semanal</div>
      <div class="streak-row">
        <div v-for="(day, i) in weekDays" :key="i" class="streak-col">
          <div class="streak-dot" :class="{ done: store.state.streakDays[i], today: isToday(i) }">
            <svg v-if="store.state.streakDays[i]" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            <div v-else-if="isToday(i)" class="today-dot"></div>
          </div>
          <span class="day-lbl">{{ day }}</span>
        </div>
      </div>
    </div>

    <!-- mood history -->
    <div class="section-card">
      <div class="section-label">Historial emocional</div>
      <div v-if="store.state.moodHistory.length === 0" class="empty-state">
        Completa tu check-in emocional para ver el historial.
      </div>
      <div v-else class="mood-list">
        <div v-for="(entry, i) in store.state.moodHistory.slice(0, 5)" :key="i" class="mood-entry">
          <span class="mood-emoji">{{ entry.emoji }}</span>
          <div class="mood-info">
            <div class="mood-name">{{ entry.mood }}</div>
            <div v-if="entry.note" class="mood-note">"{{ entry.note.slice(0, 55) }}{{ entry.note.length > 55 ? '…' : '' }}"</div>
          </div>
          <span class="mood-date">{{ entry.date }}</span>
        </div>
      </div>
    </div>

    <!-- saved thoughts -->
    <div class="section-card">
      <div class="section-label">Mis pensamientos positivos</div>
      <div v-if="store.state.thoughts.length === 0" class="empty-state">
        Escribe tu primer pensamiento positivo en las actividades.
      </div>
      <div v-else class="thoughts-list">
        <div v-for="(t, i) in store.state.thoughts" :key="i" class="thought-card">
          <div class="thought-text">{{ t.text }}</div>
          <div class="thought-date">{{ t.date }}</div>
        </div>
      </div>
    </div>

    <div style="height:16px"></div>
  </div>
</template>

<script setup>
import { store } from '../useStore.js'

const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function isToday(i) {
  const d = new Date().getDay()
  const todayIdx = d === 0 ? 6 : d - 1
  return i === todayIdx
}
</script>

<style scoped>
.profile-screen {
  padding: 0 0 16px;
  background: var(--teal-soft);
  min-height: 100%;
}

/* Hero */
.prof-hero {
  background: var(--teal);
  padding: 36px 24px 28px;
  position: relative; overflow: hidden;
  margin-bottom: 20px;
}
.hero-blob {
  position: absolute; top: -30px; right: -30px;
  width: 120px; height: 120px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%; pointer-events: none;
}
.avatar {
  width: 60px; height: 60px;
  border-radius: 50%; background: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--teal);
  margin-bottom: 12px;
}
.prof-name { font-family: 'DM Serif Display', serif; font-size: 22px; color: #fff; margin-bottom: 4px; }
.prof-email { font-size: 12.5px; color: rgba(255,255,255,0.8); }

/* Stats */
.stats-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  padding: 0 18px; margin-bottom: 16px;
}
.stat-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 18px; padding: 14px 10px;
  text-align: center;
}
.stat-num { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--teal); line-height: 1; margin-bottom: 4px; }
.stat-lbl { font-size: 10px; color: var(--muted); font-weight: 500; }

/* Section cards */
.section-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px 16px;
  margin: 0 18px 14px;
}
.section-label {
  font-size: 10.5px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px;
}
.empty-state {
  font-size: 12px; color: var(--muted); text-align: center;
  padding: 10px 0; line-height: 1.5;
}

/* Streak */
.streak-row { display: flex; justify-content: space-between; }
.streak-col { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.streak-dot {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s;
}
.streak-dot.done { background: var(--teal); border-color: var(--teal); }
.streak-dot.today:not(.done) { border-color: var(--teal); border-width: 2px; }
.today-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); }
.day-lbl { font-size: 10px; color: var(--muted); font-weight: 500; }

/* Mood list */
.mood-list { display: flex; flex-direction: column; gap: 10px; }
.mood-entry { display: flex; align-items: flex-start; gap: 10px; }
.mood-emoji { font-size: 22px; flex-shrink: 0; line-height: 1.2; }
.mood-info { flex: 1; min-width: 0; }
.mood-name { font-size: 13px; font-weight: 600; color: var(--text); }
.mood-note { font-size: 11.5px; color: var(--muted); font-style: italic; margin-top: 2px; line-height: 1.4; }
.mood-date { font-size: 10.5px; color: var(--muted); flex-shrink: 0; margin-top: 2px; }

/* Thoughts */
.thoughts-list { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; }
.thoughts-list::-webkit-scrollbar { width: 3px; }
.thoughts-list::-webkit-scrollbar-thumb { background: #3ecfcf44; border-radius: 4px; }
.thought-card {
  background: var(--teal-pale);
  border-left: 3px solid var(--teal);
  border-radius: 0 12px 12px 0;
  padding: 10px 12px;
}
.thought-text { font-size: 12.5px; color: #085041; line-height: 1.5; margin-bottom: 4px; }
.thought-date { font-size: 10px; color: var(--muted); }
</style>