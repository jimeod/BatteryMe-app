<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <Transition name="sheet" appear>
        <div class="modal-sheet">
          <div class="sheet-handle"></div>
          <div class="modal-header">
            <span class="modal-title">{{ title }}</span>
            <button class="close-btn" @click="$emit('close')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ title: String })
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(26, 46, 53, 0.5);
  z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}
.modal-sheet {
  background: var(--white);
  border-radius: 28px 28px 0 0;
  padding: 10px 22px 32px;
  width: 100%; max-width: 375px;
  max-height: 88vh;
  overflow-y: auto;
}
.modal-sheet::-webkit-scrollbar { width: 3px; }
.modal-sheet::-webkit-scrollbar-thumb { background: #3ecfcf44; border-radius: 4px; }

.sheet-handle {
  width: 36px; height: 4px;
  background: #d0e8e8; border-radius: 2px;
  margin: 0 auto 16px;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 18px;
}
.modal-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text); }
.close-btn {
  width: 30px; height: 30px;
  background: #f0fafa; border: none; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--muted);
  transition: background 0.2s;
}
.close-btn:hover { background: var(--teal-pale); color: var(--teal); }

.sheet-enter-active { transition: transform 0.35s cubic-bezier(0.22, 0.68, 0, 1.2); }
.sheet-leave-active { transition: transform 0.25s ease-in; }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>