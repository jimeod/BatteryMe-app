import { reactive, computed } from 'vue'

const STORAGE_KEY = 'breathe_app_v2'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
  console.error(error)
}
}

const defaultActivities = () => [
  { id: 1, title: 'Respiración guiada',   desc: '5 respiraciones con timer guiado.',       icon: '🌬️', bg: '#e0f9f9', done: false },
  { id: 2, title: 'Check-in emocional',   desc: 'Registra cómo te sientes ahora.',          icon: '🫀', bg: '#fde8e8', done: false },
  { id: 3, title: 'Pausa activa',         desc: 'Camina durante 3 minutos.',                icon: '🚶', bg: '#e8f5e9', done: false },
  { id: 4, title: 'Autocuidado',          desc: 'Toma un vaso de agua.',                    icon: '💧', bg: '#e3f2fd', done: false },
  { id: 5, title: 'Pensamiento positivo', desc: 'Escribe algo bueno que pasó hoy.',         icon: '✨', bg: '#fff8e1', done: false },
  { id: 6, title: 'Descanso digital',     desc: 'Aleja el celular por 2 minutos.',          icon: '🌿', bg: '#f1f8e9', done: false },
]

const saved = loadState()

const state = reactive({
  loggedIn: false,
  user: saved?.user ?? { name: '', email: '' },
  battery: saved?.battery ?? 40,
  activities: saved?.activities ?? defaultActivities(),
  moodHistory: saved?.moodHistory ?? [],
  thoughts: saved?.thoughts ?? [],
  streakDays: saved?.streakDays ?? [false, false, false, false, false, false, false],
  currentStreak: saved?.currentStreak ?? 0,
  activeTab: 'home',
  activeModal: null,
})

function persist() {
  saveState({
    user: state.user,
    battery: state.battery,
    activities: state.activities,
    moodHistory: state.moodHistory,
    thoughts: state.thoughts,
    streakDays: state.streakDays,
    currentStreak: state.currentStreak,
  })
}

export const store = {
  state,

  login(name, email) {
    state.user = { name, email }
    state.loggedIn = true
    persist()
  },

  logout() {
    state.loggedIn = false
    state.activeTab = 'home'
  },

  setTab(tab) {
    state.activeTab = tab
  },

  openModal(modal) {
    state.activeModal = modal
  },

  closeModal() {
    state.activeModal = null
  },

  completeActivity(id) {
  const act = state.activities.find(a => a.id === id)
  if (!act || act.done) return

  act.done = true

  const total = state.activities.length
  const completed = state.activities.filter(a => a.done).length

  // 🔥 batería proporcional + bonita (múltiplos de 5)
  state.battery = Math.round((completed / total) * 100 / 5) * 5

  if (state.activities.every(a => a.done)) {
    const dayIdx = new Date().getDay()
    const idx = dayIdx === 0 ? 6 : dayIdx - 1
    state.streakDays[idx] = true
    state.currentStreak++
  }

  persist()
  },

  addMoodEntry(mood, emoji, note) {
    const now = new Date()
    state.moodHistory.unshift({
      mood, emoji, note,
      date: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    })
    persist()
  },

  addThought(text) {
    const now = new Date()
    state.thoughts.unshift({
      text,
      date: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    })
    persist()
  },

  completedCount: computed(() => state.activities.filter(a => a.done).length),
  allDone: computed(() => state.activities.every(a => a.done)),
  initials: computed(() => {
    const n = state.user.name || state.user.email || 'U'
    return n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }),
  statusText: computed(() => {
    if (state.battery <= 30) return 'Recargando energía'
    if (state.battery <= 70) return 'Buen progreso'
    return 'Energía emocional alta'
  }),
}