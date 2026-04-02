<template>
  <div class="app-shell">
    <div class="screen-scroll">
      <Transition name="slide" mode="out-in">
        <HomeScreen  v-if="store.state.activeTab === 'home'"    key="home" />
        <ProfileScreen v-else-if="store.state.activeTab === 'profile'" key="profile" />
      </Transition>
    </div>

    <nav class="nav-bar">
      <button class="nav-item" :class="{ active: store.state.activeTab === 'home' }" @click="store.setTab('home')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Inicio</span>
      </button>
      <button class="nav-item" :class="{ active: store.state.activeTab === 'profile' }" @click="store.setTab('profile')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Perfil</span>
      </button>
    </nav>

    <!-- MODALS -->
    <BreathModal    v-if="store.state.activeModal === 'breath'"  />
    <CheckinModal   v-if="store.state.activeModal === 'checkin'" />
    <ThoughtModal   v-if="store.state.activeModal === 'thought'" />
    <SimpleModal    v-if="store.state.activeModal === 'pausa'"   modal-id="pausa"    :seconds="180" title="Pausa activa"    :activity-id="3" icon="walk"  message="Aléjate de tu pantalla, mueve tu cuerpo y respira aire fresco." button-label="Iniciar caminata"  done-label="Ya lo hice" />
    <SimpleModal    v-if="store.state.activeModal === 'agua'"    modal-id="agua"     :seconds="0"   title="Autocuidado"    :activity-id="4" icon="water" message="La hidratación es clave para tu bienestar mental y físico."    button-label=""               done-label="¡Lo tomé!" />
    <SimpleModal    v-if="store.state.activeModal === 'descanso'" modal-id="descanso" :seconds="120" title="Descanso digital" :activity-id="6" icon="phone" message="Pon el teléfono boca abajo y respira. Vuelve cuando el timer suene." button-label="Iniciar descanso" done-label="Ya descansé" />
  </div>
</template>

<script setup>
import { store } from '../useStore.js'
import HomeScreen    from './HomeScreen.vue'
import ProfileScreen from './ProfileScreen.vue'
import BreathModal   from './modals/BreathModal.vue'
import CheckinModal  from './modals/CheckinModal.vue'
import ThoughtModal  from './modals/ThoughtModal.vue'
import SimpleModal   from './modals/SimpleModal.vue'
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--teal-soft);
}

.screen-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.screen-scroll::-webkit-scrollbar { width: 3px; }
.screen-scroll::-webkit-scrollbar-thumb { background: #3ecfcf44; border-radius: 4px; }

.nav-bar {
  display: flex;
  background: var(--white);
  border-top: 1px solid var(--border);
  padding: 6px 0 10px;
  flex-shrink: 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  color: #aac8c8;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-item.active { color: var(--teal); }
.nav-item svg { transition: stroke 0.2s; }

.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from { opacity: 0; transform: translateX(16px); }
.slide-leave-to   { opacity: 0; transform: translateX(-16px); }
</style>