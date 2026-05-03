const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

function getToken() {
  return localStorage.getItem('breathe_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Error del servidor')
  return data
}

export const api = {
  // Auth
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  // Profile
  getProfile: () => request('/profile'),

  // Checkins
  createCheckin: (mood, emoji, note) =>
    request('/checkins', { method: 'POST', body: JSON.stringify({ mood, emoji, note }) }),

  getCheckins: () => request('/checkins'),

  // Thoughts
  createThought: (text) => request('/thoughts', { method: 'POST', body: JSON.stringify({ text }) }),

  getThoughts: () => request('/thoughts'),

  completeActivity: (id) => request(`/profile/activity/${id}`, { method: 'POST' }),

  uncompleteActivity: (id) => request(`/profile/activity/${id}`, { method: 'DELETE' }),
}
