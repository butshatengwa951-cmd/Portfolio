<template>
  <main class="app-shell">
    <BoardScene
      :discovered="discovered"
      :verified-clues="verifiedClues"
      :portfolio="portfolio"
      @select="onSelect"
      @discover="onDiscover"
    />

    <header class="hud">
      <div class="hud-copy">
        <div class="eyebrow">INVESTIGATION ARCHIVE // 001</div>
        <h1>CASE 001 — THE DEVELOPER</h1>
        <p>WHO IS BUTSHA TENGWA? <span>//</span> {{ solved ? 'CASE CLOSED' : 'INVESTIGATION ACTIVE' }}</p>
      </div>

      <div class="progress-wrap">
        <span>{{ discovered.size }} EVIDENCE PIECES FOUND</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <small>{{ verifiedClues.size }}/{{ portfolio.clues.length }} CONNECTIONS VERIFIED</small>
      </div>
    </header>

    <aside class="evidence-log">
      <div class="panel-title">EVIDENCE LOG</div>

      <div v-if="discovered.size === 1" class="log-empty">
        Start with the case file. The board will open up as you investigate.
      </div>

      <div v-for="id in discoveredList" :key="id" class="log-row">
        <span class="status-dot"></span>
        <span>{{ logLabel(id) }}</span>
      </div>
    </aside>

    <section v-if="currentClue" class="clue-panel">
      <div class="clue-meta">CLUE {{ String(currentClue.id).padStart(2, '0') }}</div>
      <p>{{ currentClue.text }}</p>

      <div class="clue-actions">
        <button
          class="verify-button"
          :class="{ verified: verifiedClues.has(currentClue.id) }"
          @click="verifyClue"
        >
          {{ verifiedClues.has(currentClue.id) ? '✓ CONNECTION VERIFIED' : 'VERIFY CONNECTION' }}
        </button>

        <span v-if="verifiedClues.has(currentClue.id)" class="reward">
          + {{ currentClue.reward }}
        </span>
      </div>
    </section>

    <EvidenceInspector
      :selected="selected"
      :portfolio="portfolio"
      @close="selected = null"
    />

    <div v-if="solved" class="solved-overlay">
      <div class="solved-card">
        <div class="stamp">CASE CLOSED</div>
        <div class="eyebrow">INVESTIGATION COMPLETE</div>
        <h2>{{ portfolio.person.name }}</h2>

        <p class="solved-lead">
          You connected the work, the skills and the person behind the evidence.
        </p>

        <div class="solved-stats">
          <div><strong>{{ discovered.size }}</strong><span>EVIDENCE</span></div>
          <div><strong>{{ verifiedClues.size }}</strong><span>CLUES</span></div>
          <div><strong>{{ portfolio.projects.length }}</strong><span>PROJECTS</span></div>
        </div>

        <div class="contact-row">
          <a class="contact primary" :href="'mailto:' + portfolio.links.email">START A CONVERSATION ↗</a>
          <a class="contact" :href="portfolio.links.github" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a class="contact" :href="portfolio.links.linkedin" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        </div>
      </div>
    </div>

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
const verifiedClues = ref(new Set())
const selected = ref(null)

const discoveredList = computed(() => Array.from(discovered.value))

const progress = computed(() => {
  const total = portfolio.projects.length + portfolio.skills.length + 4
  return Math.min(100, Math.round((discovered.value.size / total) * 100))
})

const currentClue = computed(() => {
  return (
    portfolio.clues.find(clue => !verifiedClues.value.has(clue.id)) ||
    portfolio.clues[portfolio.clues.length - 1]
  )
})

const solved = computed(() => verifiedClues.value.size === portfolio.clues.length)

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

function verifyClue() {
  if (!currentClue.value || verifiedClues.value.has(currentClue.value.id)) return

  if (currentClue.value.check(discovered.value)) {
    verifiedClues.value = new Set([
      ...verifiedClues.value,
      currentClue.value.id
    ])
    return
  }

  const panel = document.querySelector('.clue-panel')
  panel?.classList.remove('shake')
  requestAnimationFrame(() => panel?.classList.add('shake'))
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
.clue-panel{
  position:absolute;
  z-index:12;
  left:50%;
  bottom:30px;
  transform:translateX(-50%);
  width:min(560px,calc(100vw - 40px));
  padding:18px 20px;
  border:1px solid rgba(232,224,210,.12);
  background:rgba(12,11,10,.92);
  backdrop-filter:blur(14px);
  box-shadow:0 20px 70px rgba(0,0,0,.42);
}
.clue-meta{
  font-size:8px;
  letter-spacing:2px;
  color:#817a72;
}
.clue-panel p{
  margin:7px 0 14px;
  font:18px/1.4 'Special Elite',serif;
  color:#e3dacb;
}
.clue-actions{
  display:flex;
  align-items:center;
  gap:12px;
}
.verify-button{
  border:1px solid #37322d;
  background:#171512;
  color:#d9d1c5;
  padding:9px 13px;
  font:9px 'JetBrains Mono',monospace;
  letter-spacing:1.2px;
  cursor:pointer;
}
.verify-button:hover{border-color:#5b5248}
.verify-button.verified{
  border-color:#426642;
  color:#8cb58c;
}
.reward{
  font-size:8px;
  color:#8cb58c;
}
.shake{animation:shake .28s}
.interaction-hint{
  position:absolute;
  z-index:7;
  left:50%;
  bottom:116px;
  transform:translateX(-50%);
  font-size:8px;
  letter-spacing:1.8px;
  color:#6f6a63;
  white-space:nowrap;
}
.interaction-hint span{color:#b3aa9c}
.solved-overlay{
  position:absolute;
  inset:0;
  z-index:40;
  display:grid;
  place-items:center;
  background:rgba(2,2,2,.74);
  backdrop-filter:blur(10px);
  padding:24px;
}
.solved-card{
  width:min(620px,100%);
  padding:42px;
  border:1px solid rgba(232,224,210,.16);
  background:linear-gradient(145deg,#171512,#0e0d0c);
  box-shadow:0 30px 120px rgba(0,0,0,.65);
  text-align:center;
}
.stamp{
  display:inline-block;
  padding:9px 15px;
  border:2px solid #aa2b2b;
  color:#aa2b2b;
  font:700 26px 'Special Elite',serif;
  letter-spacing:3px;
  transform:rotate(-4deg);
  margin-bottom:24px;
}
.solved-card h2{
  font:32px 'Special Elite',serif;
  letter-spacing:3px;
  margin:7px 0 10px;
}
.solved-lead{
  font-size:11px;
  line-height:1.7;
  color:#aaa299;
  max-width:480px;
  margin:0 auto;
}
.solved-stats{
  display:flex;
  justify-content:center;
  gap:38px;
  margin:28px 0;
}
.solved-stats div{
  display:flex;
  flex-direction:column;
  gap:3px;
}
.solved-stats strong{
  font:24px 'Special Elite',serif;
}
.solved-stats span{
  font-size:8px;
  letter-spacing:1.5px;
  color:#706b63;
}
.contact-row{
  display:flex;
  justify-content:center;
  gap:9px;
  flex-wrap:wrap;
}
.contact{
  padding:10px 14px;
  border:1px solid #3a3530;
  color:#ddd5c9;
  text-decoration:none;
  font-size:8px;
  letter-spacing:1.3px;
}
.contact:hover{background:#1b1916}
.contact.primary{
  background:#e5ddcf;
  color:#111;
  border-color:#e5ddcf;
}
@keyframes shake{
  0%,100%{transform:translateX(-50%)}
  25%{transform:translateX(calc(-50% - 5px))}
  75%{transform:translateX(calc(-50% + 5px))}
}
@media (max-width:800px){
  .hud{padding:18px}
  .hud h1{font-size:17px}
  .progress-wrap{width:150px}
  .evidence-log{top:104px;left:14px;width:205px}
  .clue-panel{bottom:18px}
  .interaction-hint{display:none}
  .solved-card{padding:28px 20px}
}
</style>
