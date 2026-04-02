<template>
  <ModalBase title="Check-in emocional" @close="store.closeModal()">
    <p class="intro-txt">¿Cómo te sientes en este momento?</p>

    <div class="moods-grid">
      <button
        v-for="m in moods" :key="m.key"
        class="mood-btn"
        :class="{ selected: selectedMood === m.key }"
        @click="selectedMood = m.key"
      >
        <span class="mood-face">{{ m.emoji }}</span>
        <span class="mood-lbl">{{ m.label }}</span>
      </button>
    </div>

    <Transition name="slide-down">
      <div v-if="selectedMood" class="note-section">
        <label class="field-label">¿Algo más que quieras expresar?</label>
        <textarea
          v-model="note"
          class="note-area"
          placeholder="Escribe cómo te sientes..."
          rows="3"
        ></textarea>
      </div>
    </Transition>

    <button
      class="btn-teal"
      :disabled="!selectedMood"
      @click="save"
    >
      Guardar check-in
    </button>
  </ModalBase>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../../useStore.js'
import ModalBase from './ModalBase.vue'

const moods = [
  { key: 'Feliz',     emoji: '😄', label: 'Feliz' },
  { key: 'Tranquilo', emoji: '😌', label: 'Tranquilo' },
  { key: 'Ansioso',   emoji: '😰', label: 'Ansioso' },
  { key: 'Triste',    emoji: '😔', label: 'Triste' },
  { key: 'Enojado',   emoji: '😤', label: 'Enojado' },
  { key: 'Cansado',   emoji: '😴', label: 'Cansado' },
  { key: 'Motivado',  emoji: '🔥', label: 'Motivado' },
  { key: 'Asustado',  emoji: '😨', label: 'Asustado' },
]

const selectedMood = ref('')
const note = ref('')

const selectedEmoji = computed(() => moods.find(m => m.key === selectedMood.value)?.emoji ?? '')

function save() {
  if (!selectedMood.value) return
  store.addMoodEntry(selectedMood.value, selectedEmoji.value, note.value.trim())
  store.completeActivity(2)
  store.closeModal()
}
</script>

<style scoped>
.intro-txt { font-size: 13px; color: var(--muted); margin-bottom: 16px; }

.moods-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 8px; margin-bottom: 16px;
}
.mood-btn {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  padding: 10px 6px;
  border: 1.5px solid var(--border);
  border-radius: 16px;
  background: var(--white);
  cursor: pointer;
  transition: all 0.2s;
}
.mood-btn:hover { border-color: var(--teal); background: var(--teal-soft); }
.mood-btn.selected { border-color: var(--teal); background: var(--teal-pale); }
.mood-face { font-size: 24px; line-height: 1; }
.mood-lbl  { font-size: 10px; color: var(--muted); font-weight: 500; text-align: center; }
.mood-btn.selected .mood-lbl { color: var(--teal-dark); }

.note-section { margin-bottom: 16px; }
.field-label {
  display: block; font-size: 11px; font-weight: 600;
  color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.note-area {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--border); border-radius: 14px;
  font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--text);
  background: #f7fdfd; outline: none; resize: none;
  transition: border-color 0.2s, background 0.2s;
  line-height: 1.6;
}
.note-area:focus { border-color: var(--teal); background: #fff; box-shadow: 0 0 0 4px rgba(62,207,207,0.1); }

.slide-down-enter-active { transition: all 0.25s ease; }
.slide-down-enter-from   { opacity: 0; transform: translateY(-8px); }
.slide-down-leave-active { transition: all 0.2s ease; }
.slide-down-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>