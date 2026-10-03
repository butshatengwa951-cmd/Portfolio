<template>
  <main class="app-shell">
    <BoardScene
      :discovered="discovered"
      :portfolio="portfolio"
      @select="onSelect"
      @discover="onDiscover"
    />

    <header class="hud">
      <div class="hud-copy">
        <div class="eyebrow">INVESTIGATION ARCHIVE // 001</div>
        <h1>CASE 001 — THE DEVELOPER</h1>
        <p>WHO IS BUTSHA TENGWA? <span>//</span> INVESTIGATION ACTIVE</p>
      </div>

      <div class="progress-wrap">
        <span>{{ discovered.size }} EVIDENCE PIECES FOUND</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <small>FOLLOW THE RED STRING</small>
      </div>
    </header>

    <aside class="evidence-log">
      <div class="panel-title">EVIDENCE LOG</div>

      <div v-if="discovered.size === 1" class="log-empty">
        Start with the case file. The board is already connected — follow the evidence and investigate.
      </div>

      <div v-for="id in discoveredList" :key="id" class="log-row">
        <span class="status-dot"></span>
        <span>{{ logLabel(id) }}</span>
      </div>
    </aside>

    <EvidenceInspector
      :selected="selected"
      :portfolio="portfolio"
      @close="selected = null"
    />

    <div v-if="discovered.size === 1" class="interaction-hint">
      <span>DRAG</span> rotate <span>•</span> <span>SCROLL</span> zoom <span>•</span> <span>CLICK</span> inspect
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import BoardScene from './components/BoardScene.vue'
import EvidenceInspector from './components/EvidenceInspector.vue'
import { portfolio } from './data/portfolio.js'

const discovered = ref(new Set(['casefile']))
const selected = ref(null)

const discoveredList = computed(() => Array.from(discovered.value))

const progress = computed(() => {
  const total = portfolio.projects.length + portfolio.skills.length + 4
  return Math.min(100, Math.round((discovered.value.size / total) * 100))
})

function onSelect(id) {
  selected.value = id
  onDiscover(id)
}

function onDiscover(id) {
  if (!id || discovered.value.has(id)) return
  discovered.value = new Set([...discovered.value, id])
}

function logLabel(id) {
  if (id === 'casefile') return 'CASE FILE — 001'
  if (id === 'portrait') return 'PORTRAIT — IDENTITY UNKNOWN'
  if (id === 'person') return 'PERSON OF INTEREST — BUTSHA TENGWA'
  if (id === 'classified') return 'CLASSIFIED — CASE NOTE #07'

  const project = portfolio.projects.find(item => item.id === id)
  if (project) return project.name

  const skill = portfolio.skills.find(item => item.id === id)
  if (skill) return skill.name

  return id.toUpperCase()
}
</script>

<style scoped>
.app-shell{
  position:relative;
  width:100vw;
  height:100vh;
  overflow:hidden;
  background:#090908;
  color:#ede5d7;
}
.hud{
  position:absolute;
  z-index:10;
  pointer-events:none;
  display:flex;
  justify-content:space-between;
  gap:32px;
  top:0;
  left:0;
  right:0;
  padding:28px 34px;
  background:linear-gradient(180deg,rgba(5,5,5,.94),rgba(5,5,5,.43),transparent);
}
.eyebrow{
  font-size:9px;
  letter-spacing:2px;
  color:#9e978c;
}
.hud h1{
  margin:5px 0 6px;
  font:700 24px/1.1 'Special Elite',serif;
  letter-spacing:2px;
}
.hud p{
  margin:0;
  font-size:10px;
  letter-spacing:1.6px;
  color:#aaa49a;
}
.hud p span{color:#a32727}
.progress-wrap{
  width:250px;
  text-align:right;
  font-size:9px;
  letter-spacing:1.2px;
  color:#bbb4aa;
}
.progress-track{
  height:3px;
  background:#26231f;
  margin:9px 0 6px;
  overflow:hidden;
}
.progress-fill{
  height:100%;
  background:#a62a2a;
  transition:width .45s ease;
}
.progress-wrap small{
  font-size:8px;
  color:#706b63;
}
.evidence-log{
  position:absolute;
  z-index:10;
  left:26px;
  top:132px;
  width:250px;
  max-height:48vh;
  overflow:auto;
  padding:16px;
  border:1px solid rgba(232,224,210,.1);
  background:rgba(12,11,10,.84);
  backdrop-filter:blur(12px);
  box-shadow:0 18px 50px rgba(0,0,0,.28);
}
.panel-title{
  font-size:9px;
  letter-spacing:2px;
  color:#817a72;
  border-bottom:1px solid rgba(232,224,210,.09);
  padding-bottom:9px;
  margin-bottom:10px;
}
.log-empty{
  font-size:10px;
  line-height:1.6;
  color:#777168;
}
.log-row{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:9px;
  line-height:1.5;
  color:#bdb5a9;
  margin:8px 0;
}
.status-dot{
  width:5px;
  height:5px;
  border-radius:50%;
  background:#a42626;
  box-shadow:0 0 10px rgba(164,38,38,.6);
}
.interaction-hint{
  position:absolute;
  z-index:7;
  left:50%;
  bottom:24px;
  transform:translateX(-50%);
  font-size:8px;
  letter-spacing:1.8px;
  color:#6f6a63;
  white-space:nowrap;
  padding:7px 11px;
  border:1px solid rgba(232,224,210,.07);
  background:rgba(8,8,7,.48);
  backdrop-filter:blur(5px);
}
.interaction-hint span{color:#b3aa9c}
@media (max-width:800px){
  .hud{
    padding:18px;
    gap:14px;
  }
  .hud h1{font-size:17px}
  .progress-wrap{width:150px}
  .evidence-log{
    top:104px;
    left:14px;
    width:205px;
    max-height:38vh;
  }
  .interaction-hint{display:none}
}
</style>
