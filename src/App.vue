<template>
  <div class="app">
    <BoardScene 
      :discovered="discovered" 
      :portfolio="portfolio"
      @select="onSelect"
      @discover="onDiscover"
    />
    
    <!-- Top HUD -->
    <div class="hud top">
      <div class="hud-left">
        <div class="case-title">CASE 001 — THE DEVELOPER</div>
        <div class="case-sub">WHO IS BUTSHA TENGWA? // STATUS: {{ solved ? 'SOLVED' : 'OPEN' }}</div>
      </div>
      <div class="hud-right">
        <div class="evidence-count">EVIDENCE: {{ discovered.size }}/{{ totalEvidence }} UNCOVERED</div>
        <div class="progress-bar"><div class="fill" :style="{width: (discovered.size/totalEvidence*100)+'%'}"></div></div>
      </div>
    </div>

    <!-- Left Log -->
    <div class="log">
      <div class="log-header">EVIDENCE LOG</div>
      <div v-for="id in Array.from(discovered)" :key="id" class="log-item">
        <span class="dot">●</span> {{ logLabel(id) }}
      </div>
      <div v-if="discovered.size===0" class="log-empty">No evidence collected. Click the board.</div>
    </div>

    <!-- Bottom Clue -->
    <div class="clue-box" v-if="currentClue">
      <div class="clue-label">CLUE #{{ currentClue.id }}</div>
      <div class="clue-text">“{{ currentClue.text }}”</div>
      <div class="clue-actions">
        <button class="verify-btn" @click="verifyClue" :class="{ok: clueOk}">{{ clueOk ? '✓ CONNECTION VERIFIED' : 'VERIFY CONNECTION' }}</button>
        <span v-if="clueOk" class="reward">+ {{ currentClue.reward }}</span>
      </div>
    </div>

    <!-- Inspector -->
    <EvidenceInspector :selected="selected" :portfolio="portfolio" @close="selected=null" @discover="onDiscover" />

    <!-- Solved Overlay -->
    <div v-if="solved" class="solved-overlay">
      <div class="solved-card">
        <div class="stamp">SOLVED</div>
        <h1>{{ portfolio.person.name }}</h1>
        <p>Case closed. You pieced together {{ discovered.size }} pieces of evidence.</p>
        <p class="solved-desc">Developer. Builder. Currently open for collaborations.</p>
        <div class="contact-row">
          <a class="contact-btn primary" href="mailto:butsha@example.com">Let's work together →</a>
          <a class="contact-btn" href="#" target="_blank">GitHub</a>
          <a class="contact-btn" href="#" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>

    <div class="hint" v-if="discovered.size===0">Drag to rotate • Scroll to zoom • Click evidence to inspect</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BoardScene from './components/BoardScene.vue'
import EvidenceInspector from './components/EvidenceInspector.vue'
import { portfolio } from './data/portfolio.js'

const discovered = ref(new Set(['casefile']))
const selected = ref(null)
const clueIndex = ref(0)
const clueOk = ref(false)

const totalEvidence = computed(() => portfolio.projects.length + portfolio.skills.length + 2) // + casefile + classified
const currentClue = computed(() => portfolio.clues[clueIndex.value])
const solved = computed(() => discovered.value.size >= 6)

function onSelect(id){ selected.value = id; onDiscover(id) }
function onDiscover(id){ if(!discovered.value.has(id)){ discovered.value = new Set([...discovered.value, id]) } }
function logLabel(id){
  if(id==='casefile') return 'CASE FILE — BUTSHA TENGWA'
  if(id==='classified') return 'CLASSIFIED — NOTE #07'
  const p = portfolio.projects.find(x=>x.id===id)
  if(p) return `${p.label} — ${p.name}`
  const s = portfolio.skills.find(x=>x.id===id)
  if(s) return `TAG — ${s.name}`
  return id.toUpperCase()
}
function verifyClue(){
  if(currentClue.value && currentClue.value.check(discovered.value)){
    clueOk.value = true
    setTimeout(()=>{ clueIndex.value = Math.min(clueIndex.value+1, portfolio.clues.length-1); clueOk.value=false }, 1800)
  } else {
    // shake
    const el = document.querySelector('.clue-box'); el?.classList.add('shake')
    setTimeout(()=>el?.classList.remove('shake'),400)
  }
}
</script>

<style scoped>
.app{position:relative;width:100%;height:100%}
.hud{position:absolute;left:0;right:0;display:flex;justify-content:space-between;padding:18px 24px;pointer-events:none;z-index:10}
.hud.top{top:0;background:linear-gradient(to bottom, rgba(0,0,0,.8), transparent)}
.case-title{font-family:'Special Elite', cursive;font-size:20px;letter-spacing:2px;color:#ffcc88}
.case-sub{font-size:10px;opacity:.6;margin-top:4px;letter-spacing:1px}
.hud-right{text-align:right;min-width:200px}
.evidence-count{font-size:11px;letter-spacing:1px}
.progress-bar{width:200px;height:3px;background:#222;margin-top:8px;overflow:hidden}
.fill{height:100%;background:#b11a1a;transition:width .6s}
.log{position:absolute;left:20px;top:90px;width:220px;background:rgba(12,12,12,.85);border:1px solid #222;padding:14px;z-index:10;backdrop-filter:blur(8px)}
.log-header{font-size:10px;letter-spacing:2px;opacity:.5;margin-bottom:10px;border-bottom:1px solid #222;padding-bottom:8px}
.log-item{font-size:11px;margin:6px 0;opacity:.8}
.dot{color:#b11a1a;margin-right:6px}
.log-empty{font-size:11px;opacity:.4;font-style:italic}
.clue-box{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(15,15,15,.92);border:1px solid #2a2a2a;padding:16px 20px;min-width:420px;z-index:10;backdrop-filter:blur(10px)}
.clue-label{font-size:10px;letter-spacing:2px;opacity:.5}
.clue-text{font-family:'Special Elite', cursive;font-size:16px;margin:6px 0 12px;color:#e8dcc8}
.clue-actions{display:flex;align-items:center;gap:12px}
.verify-btn{background:#1a1a1a;border:1px solid #333;color:#e8e0d0;padding:8px 14px;font-family:inherit;font-size:11px;cursor:pointer;letter-spacing:1px;transition:.2s}
.verify-btn:hover{background:#222}
.verify-btn.ok{background:#1a3a1a;border-color:#2a5a2a;color:#7fda7f}
.reward{font-size:10px;color:#7fda7f}
.shake{animation:shake .3s}
@keyframes shake{0%,100%{transform:translateX(-50%)}25%{transform:translateX(-52%)}75%{transform:translateX(-48%)}}
.hint{position:absolute;bottom:100px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:2px;opacity:.3;z-index:5;pointer-events:none}
.solved-overlay{position:absolute;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:30;backdrop-filter:blur(4px)}
.solved-card{background:#0e0e0e;border:1px solid #333;padding:36px 42px;text-align:center;max-width:520px;box-shadow:0 20px 80px rgba(0,0,0,.8)}
.stamp{font-family:'Special Elite';font-size:42px;color:#b11a1a;border:3px solid #b11a1a;display:inline-block;padding:6px 18px;transform:rotate(-4deg);margin-bottom:18px;letter-spacing:4px}
.solved-card h1{font-family:'Special Elite';font-size:32px;letter-spacing:3px;margin:8px 0}
.solved-desc{opacity:.6;margin:12px 0 22px;font-size:13px}
.contact-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px}
.contact-btn{padding:10px 18px;border:1px solid #333;text-decoration:none;color:#e8e0d0;font-size:12px;letter-spacing:1px;transition:.2s}
.contact-btn:hover{background:#1a1a1a}
.contact-btn.primary{background:#e8e0d0;color:#0a0a0b;border-color:#e8e0d0}
</style>
