import { reactive, computed } from 'vue'
import { api } from './api.js'

const TOKEN_KEY = 'breathe_token'

const defaultActivities = () => [
  {
    id: 1,
    title: 'Respiración guiada',
    desc: '5 respiraciones con timer guiado.',
    icon: '🌬️',
    bg: '#e0f9f9',
    done: false,
  },
  {
    id: 2,
    title: 'Check-in emocional',
    desc: 'Registra cómo te sientes ahora.',
    icon: '🫀',
    bg: '#fde8e8',
    done: false,
  },
  {
    id: 3,
    title: 'Pausa activa',
    desc: 'Camina durante 3 minutos.',
    icon: '🚶',
    bg: '#e8f5e9',
    done: false,
  },
  {
    id: 4,
    title: 'Autocuidado',
    desc: 'Toma un vaso de agua.',
    icon: '💧',
    bg: '#e3f2fd',
    done: false,
  },
  {
    id: 5,
    title: 'Pensamiento positivo',
    desc: 'Escribe algo bueno que pasó hoy.',
    icon: '✨',
    bg: '#fff8e1',
    done: false,
  },
  {
    id: 6,
    title: 'Descanso digital',
    desc: 'Aleja el celular por 2 minutos.',
    icon: '🌿',
    bg: '#f1f8e9',
    done: false,
  },
]

const state = reactive({
  loggedIn: false,
  token: localStorage.getItem(TOKEN_KEY) || null,
  user: { name: '', email: '' },
  battery: 0,
  activities: defaultActivities(),
  moodHistory: [],
  thoughts: [],
  streakDays: [false, false, false, false, false, false, false],
  currentStreak: 0,
  activeTab: 'home',
  activeModal: null,
})

function setToken(token) {
  state.token = token
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  state.token = null
  localStorage.removeItem(TOKEN_KEY)
}

function applyProfile(data) {
  state.user = { name: data.name, email: data.email }
  state.battery = data.battery ?? 0
  state.streakDays = data.streakDays ?? [false, false, false, false, false, false, false]
  state.currentStreak = data.currentStreak ?? 0
  if (data.activities) {
    state.activities = defaultActivities().map((def) => {
      const match = data.activities.find((a) => a.id === def.id)
      return { ...def, done: match ? match.done : false }
    })
  }
}

export const store = {
  state,

  async tryAutoLogin() {
    if (!state.token) return
    try {
      const data = await api.getProfile()
      applyProfile(data.profile)
      state.loggedIn = true
    } catch {
      clearToken()
    }
  },

  async login(email, password) {
    const data = await api.login(email, password)
    setToken(data.token)
    applyProfile(data.user)
    state.loggedIn = true
  },

  async register(name, email, password) {
    const data = await api.register(name, email, password)
    setToken(data.token)
    applyProfile(data.user)
    state.loggedIn = true
  },

  logout() {
    clearToken()
    state.loggedIn = false
    state.user = { name: '', email: '' }
    state.battery = 0
    state.activities = defaultActivities()
    state.moodHistory = []
    state.thoughts = []
    state.streakDays = [false, false, false, false, false, false, false]
    state.currentStreak = 0
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

  async completeActivity(id) {
    const act = state.activities.find((a) => a.id === id)
    if (!act || act.done) return
    try {
      const data = await api.completeActivity(id)
      state.battery = data.battery
      state.streakDays = data.streakDays
      state.currentStreak = data.currentStreak
      state.activities = defaultActivities().map((def) => {
        const match = data.activities.find((a) => Number(a.id) === Number(def.id))
        return { ...def, done: match ? Boolean(match.done) : false }
      })
    } catch {
      act.done = true
      const total = state.activities.length
      const completed = state.activities.filter((a) => a.done).length
      state.battery = Math.round(((completed / total) * 100) / 5) * 5
    }
  },
  async uncompleteActivity(id) {
    const act = state.activities.find((a) => a.id === id)
    if (!act || !act.done) return
    try {
      const data = await api.uncompleteActivity(id)
      state.battery = data.battery
      state.streakDays = data.streakDays
      state.currentStreak = data.currentStreak
      state.activities = defaultActivities().map((def) => {
        const match = data.activities.find((a) => Number(a.id) === Number(def.id))
        return { ...def, done: match ? Boolean(match.done) : false }
      })
    } catch {
      act.done = false
      const total = state.activities.length
      const completed = state.activities.filter((a) => a.done).length
      state.battery = Math.round(((completed / total) * 100) / 5) * 5
    }
  },

  async addMoodEntry(mood, emoji, note) {
    try {
      const data = await api.createCheckin(mood, emoji, note)
      state.battery = data.battery
      state.moodHistory.unshift({
        mood,
        emoji,
        note,
        date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      })
    } catch {
      // fallback local
      state.moodHistory.unshift({
        mood,
        emoji,
        note,
        date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      })
    }
  },

  async addThought(text) {
    try {
      await api.createThought(text)
    } catch {
      // fallback local
    }
    state.thoughts.unshift({
      text,
      date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    })
  },

  completedCount: computed(() => state.activities.filter((a) => a.done).length),
  allDone: computed(() => state.activities.every((a) => a.done)),
  initials: computed(() => {
    const n = state.user.name || state.user.email || 'U'
    return n
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }),
  statusText: computed(() => {
    if (state.battery <= 30) return 'Recargando energía'
    if (state.battery <= 70) return 'Buen progreso'
    return 'Energía emocional alta'
  }),
}
