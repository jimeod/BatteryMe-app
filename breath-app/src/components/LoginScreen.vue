<template>
  <div class="login-root">
    <div class="blob-top"></div>
    <div class="blob-bottom"></div>
    <div class="dot d1"></div>
    <div class="dot d2"></div>
    <div class="dot d3"></div>

    <div class="login-inner">
      <div class="logo-row">
        <div class="logo-circle">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="2.5" stroke-linecap="round">
            <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4" stroke-dasharray="2 2"/>
          </svg>
        </div>
        <span class="brand">Breathe</span>
      </div>
      <p class="subtitle">Encuentra tu equilibrio interior.</p>

      <div class="tabs">
        <button class="tab" :class="{ active: mode === 'login' }" @click="mode = 'login'">Iniciar sesión</button>
        <button class="tab" :class="{ active: mode === 'register' }" @click="mode = 'register'">Registrarse</button>
      </div>

      <div class="form">
        <Transition name="slide-down">
          <div v-if="mode === 'register'" class="field">
            <label>Nombre</label>
            <div class="input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" v-model="name" placeholder="Tu nombre" :class="{ error: errors.name }" @input="errors.name = ''" />
            </div>
            <span class="err-msg" v-if="errors.name">{{ errors.name }}</span>
          </div>
        </Transition>

        <div class="field">
          <label>Correo electrónico</label>
          <div class="input-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <input type="email" v-model="email" placeholder="correo@ejemplo.com" :class="{ error: errors.email }" @input="errors.email = ''" />
          </div>
          <span class="err-msg" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label>Contraseña</label>
          <div class="input-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input :type="showPass ? 'text' : 'password'" v-model="password" placeholder="••••••••" :class="{ error: errors.password }" @input="errors.password = ''" />
            <button class="eye-btn" type="button" @click="showPass = !showPass">
              <svg v-if="!showPass" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
            </button>
          </div>
          <span class="err-msg" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="forgot" v-if="mode === 'login'"><a href="#">¿Olvidaste tu contraseña?</a></div>

        <button class="btn-teal" @click="submit" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span>{{ loading ? 'Verificando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}</span>
        </button>

        <div class="divider"><span>o continúa con</span></div>

        <div class="socials">
          <button class="btn-social">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button class="btn-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </button>
        </div>

        <p class="footer-link">
          <span v-if="mode === 'login'">¿No tienes cuenta? <a @click.prevent="mode = 'register'" href="#">Regístrate</a></span>
          <span v-else>¿Ya tienes cuenta? <a @click.prevent="mode = 'login'" href="#">Inicia sesión</a></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../useStore.js'

const mode = ref('login')
const name = ref('')
const email = ref('')
const password = ref('')
const showPass = ref(false)
const loading = ref(false)
const errors = reactive({ name: '', email: '', password: '' })

function validate() {
  let ok = true
  if (mode.value === 'register' && !name.value.trim()) { errors.name = 'Ingresa tu nombre.'; ok = false }
  if (!email.value.includes('@')) { errors.email = 'Ingresa un correo válido.'; ok = false }
  if (password.value.length < 6) { errors.password = 'Mínimo 6 caracteres.'; ok = false }
  return ok
}

async function submit() {
  if (!validate() || loading.value) return
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  store.login(name.value || email.value.split('@')[0], email.value)
  loading.value = false
}
</script>

<style scoped>
.login-root {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--white);
}
.login-root::-webkit-scrollbar { width: 3px; }
.login-root::-webkit-scrollbar-thumb { background: #3ecfcf44; border-radius: 4px; }

.login-inner { padding: 40px 30px 36px; position: relative; z-index: 2; }

.blob-top {
  position: absolute; top: -30px; right: -40px;
  width: 170px; height: 170px;
  background: #c8f0ee;
  border-radius: 60% 80% 70% 50% / 70% 50% 80% 60%;
  opacity: 0.8;
  animation: blobFloat 6s ease-in-out infinite;
}
.blob-bottom {
  position: absolute; bottom: -20px; left: -30px;
  width: 110px; height: 110px;
  background: var(--teal-light);
  border-radius: 70% 50% 60% 80% / 50% 70% 50% 80%;
  opacity: 0.45;
  animation: blobFloat 8s ease-in-out infinite reverse;
}
.dot { position: absolute; border-radius: 50%; background: var(--teal); animation: dotFloat 4s ease-in-out infinite; }
.d1 { width: 9px; height: 9px; top: 60px; left: 26px; opacity: 0.45; }
.d2 { width: 5px; height: 5px; top: 130px; right: 55px; opacity: 0.3; animation-delay: 1s; }
.d3 { width: 7px; height: 7px; bottom: 80px; right: 24px; opacity: 0.35; animation-delay: 2s; }

@keyframes blobFloat { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.06) rotate(6deg); } }
@keyframes dotFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
.subtitle { font-size: 13px; color: var(--muted); margin-bottom: 26px; line-height: 1.5; }

.tabs {
  display: flex; background: #eef8f8; border-radius: 14px; padding: 4px; margin-bottom: 22px;
}
.tab {
  flex: 1; padding: 9px; border: none; background: transparent; border-radius: 11px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  color: var(--muted); cursor: pointer; transition: all 0.25s;
}
.tab.active { background: #fff; color: var(--text); font-weight: 600; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }

.field { margin-bottom: 14px; }
label { display: block; font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }

.input-wrap { position: relative; }
.input-wrap svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--teal); pointer-events: none; }
.input-wrap input {
  width: 100%; padding: 12px 13px 12px 40px;
  border: 1.5px solid var(--border); border-radius: 14px;
  font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--text);
  background: #f7fdfd; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.input-wrap input:focus { border-color: var(--teal); background: #fff; box-shadow: 0 0 0 4px rgba(62,207,207,0.1); }
.input-wrap input.error { border-color: var(--error); }
.eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--muted); display: flex; }
.eye-btn:hover { color: var(--teal); }
.err-msg { font-size: 11px; color: var(--error); margin-top: 4px; display: block; padding-left: 2px; }

.forgot { text-align: right; margin: -4px 0 16px; }
.forgot a { font-size: 12px; color: var(--teal-dark); text-decoration: none; font-weight: 500; }

.spinner {
  display: inline-block; width: 15px; height: 15px;
  border: 2.5px solid rgba(255,255,255,0.4); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite;
  vertical-align: middle; margin-right: 8px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.divider { display: flex; align-items: center; gap: 10px; margin: 20px 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e6f3f3; }
.divider span { font-size: 12px; color: var(--muted); }

.socials { display: flex; gap: 10px; margin-bottom: 20px; }
.btn-social {
  flex: 1; padding: 10px; background: #f4fafa; border: 1.5px solid var(--border);
  border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  gap: 7px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text);
  font-weight: 500; transition: all 0.2s;
}
.btn-social:hover { border-color: var(--teal); background: #eefafa; }

.footer-link { text-align: center; font-size: 12.5px; color: var(--muted); }
.footer-link a { color: var(--teal-dark); font-weight: 600; text-decoration: none; }

.slide-down-enter-active { transition: all 0.25s ease; }
.slide-down-enter-from { opacity: 0; transform: translateY(-8px); }
</style>