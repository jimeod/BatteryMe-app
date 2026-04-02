<template>
  <ModalBase title="Pensamiento positivo" @close="store.closeModal()">
    <p class="intro-txt">Escribe algo bueno que pasó hoy o algo por lo que estás agradecido.</p>

    <div class="notebook">
      <div class="notebook-lines">
        <div class="nb-line" v-for="n in 5" :key="n"></div>
      </div>
      <textarea
        v-model="thought"
        class="nb-area"
        placeholder="Hoy me siento agradecido por..."
        rows="4"
      ></textarea>
    </div>

    <div class="btn-row">
      <button class="btn-outline" style="flex:1" :disabled="!thought.trim()" @click="saveNote">
        Guardar nota
      </button>
      <button class="btn-teal" style="flex:1" :disabled="!hasSaved" @click="finish">
        Completar
      </button>
    </div>

    <Transition name="slide-down">
      <div v-if="store.state.thoughts.length" class="saved-section">
        <div class="saved-label">Notas guardadas</div>
        <div class="saved-list">
          <div
            v-for="(t, i) in store.state.thoughts.slice(0, 4)"
            :key="i"
            class="saved-note"
          >
            <div class="note-text">{{ t.text }}</div>
            <div class="note-date">{{ t.date }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </ModalBase>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../../useStore.js'
import ModalBase from './ModalBase.vue'

const thought = ref('')
const hasSaved = ref(false)

function saveNote() {
  const txt = thought.value.trim()
  if (!txt) return
  store.addThought(txt)
  thought.value = ''
  hasSaved.value = true
}

function finish() {
  store.completeActivity(5)
  store.closeModal()
}
</script>

<style scoped>
.intro-txt { font-size: 13px; color: var(--muted); margin-bottom: 16px; line-height: 1.6; }

.notebook {
  position: relative;
  background: #fafff9;
  border: 1.5px solid var(--border);
  border-radius: 16px;
  margin-bottom: 14px;
  overflow: hidden;
}
.notebook-lines {
  position: absolute; inset: 0; padding: 16px 14px;
  display: flex; flex-direction: column; justify-content: space-around;
  pointer-events: none;
}
.nb-line { height: 1px; background: #e8f6f0; }
.nb-area {
  position: relative; width: 100%;
  padding: 16px 14px;
  background: transparent;
  border: none; outline: none; resize: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: var(--text); line-height: 1.8;
  z-index: 1;
}
.nb-area::placeholder { color: #b0cece; }
.nb-area:focus { background: rgba(255,255,255,0.5); }

.btn-row { display: flex; gap: 10px; margin-bottom: 18px; }

.saved-section { padding-top: 4px; }
.saved-label {
  font-size: 10.5px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;
}
.saved-list { display: flex; flex-direction: column; gap: 8px; max-height: 160px; overflow-y: auto; }
.saved-list::-webkit-scrollbar { width: 3px; }
.saved-list::-webkit-scrollbar-thumb { background: #3ecfcf44; border-radius: 4px; }
.saved-note {
  background: var(--teal-pale);
  border-left: 3px solid var(--teal);
  border-radius: 0 12px 12px 0;
  padding: 10px 12px;
}
.note-text { font-size: 12.5px; color: #085041; line-height: 1.5; }
.note-date { font-size: 10px; color: var(--muted); margin-top: 3px; }

.slide-down-enter-active { transition: all 0.3s ease; }
.slide-down-enter-from   { opacity: 0; transform: translateY(-8px); }
</style>