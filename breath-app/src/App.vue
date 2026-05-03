<template>
  <div id="app">
    <div class="phone-frame">
      <Transition name="fade" mode="out-in">
        <LoginScreen v-if="!store.state.loggedIn" key="login" />
        <AppShell v-else key="app" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { store } from './useStore.js'
import LoginScreen from './components/LoginScreen.vue'
import AppShell from './components/AppShell.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --teal: #3ecfcf;
  --teal-dark: #2aafaf;
  --teal-light: #b2f0f0;
  --teal-pale: #e0f9f9;
  --teal-soft: #f0fdfd;
  --bg: #eaf6f6;
  --white: #ffffff;
  --text: #1a2e35;
  --muted: #7a9ea0;
  --border: #ddf0f0;
  --card: #ffffff;
  --error: #e06b6b;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle, var(--teal) 1.5px, transparent 1.5px),
    radial-gradient(circle, var(--teal-light) 1px, transparent 1px);
  background-size:
    120px 120px,
    60px 60px;
  background-position:
    0 0,
    30px 30px;
  opacity: 0.14;
  pointer-events: none;
}

#app {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.phone-frame {
  width: 375px;
  height: 780px;
  background: var(--white);
  border-radius: 44px;
  box-shadow:
    0 0 0 10px #d0eaea,
    0 30px 80px rgba(62, 207, 207, 0.18),
    0 8px 24px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Shared component styles ── */
.brand {
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  color: var(--text);
  letter-spacing: -0.3px;
}

.logo-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-teal {
  width: 100%;
  padding: 13px;
  background: var(--teal);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.1px;
  transition:
    background 0.2s,
    transform 0.15s;
}
.btn-teal:hover:not(:disabled) {
  background: var(--teal-dark);
  transform: translateY(-1px);
}
.btn-teal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1.5px solid var(--teal);
  border-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--teal);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline:hover {
  background: var(--teal);
  color: #fff;
}

.section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 16px;
  color: var(--text);
}

.screen-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.screen-scroll::-webkit-scrollbar {
  width: 3px;
}
.screen-scroll::-webkit-scrollbar-thumb {
  background: #3ecfcf44;
  border-radius: 4px;
}

@media (max-height: 800px) {
  .phone-frame {
    height: 100vh;
    border-radius: 0;
  }
}
</style>
