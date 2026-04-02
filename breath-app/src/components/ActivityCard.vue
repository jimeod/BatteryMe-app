<template>
  <div
    class="act-card"
    :class="{ done: activity.done }"
    @click="!activity.done && $emit('open')"
  >
    <div class="act-icon" :style="{ background: activity.bg }">
      {{ activity.icon }}
    </div>
    <div class="act-body">
      <div class="act-name">{{ activity.title }}</div>
      <div class="act-desc">{{ activity.desc }}</div>
    </div>
    <div class="act-action">
      <div v-if="activity.done" class="done-check">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <div v-else class="chevron">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3ecfcf" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ activity: { type: Object, required: true } })
defineEmits(['open'])
</script>

<style scoped>
.act-card {
  display: flex; align-items: center; gap: 12px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 13px 14px;
  cursor: pointer;
  transition: all 0.25s;
}
.act-card:hover:not(.done) {
  border-color: var(--teal);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(62,207,207,0.12);
}
.act-card.done {
  background: rgba(62,207,207,0.05);
  border-color: #aae0e0;
  cursor: default;
}

.act-icon {
  width: 44px; height: 44px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
  transition: transform 0.3s;
}
.act-card.done .act-icon { transform: scale(0.92); }

.act-body { flex: 1; min-width: 0; }
.act-name { font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.act-card.done .act-name { color: var(--teal-dark); }
.act-desc { font-size: 11.5px; color: var(--muted); line-height: 1.4; }

.done-check {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--teal);
  display: flex; align-items: center; justify-content: center;
  animation: popIn 0.4s cubic-bezier(0.22,0.68,0,1.4) both;
}
.chevron { display: flex; align-items: center; }

@keyframes popIn { from{transform:scale(0);opacity:0;} to{transform:scale(1);opacity:1;} }
</style>