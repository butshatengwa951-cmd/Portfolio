<template>
  <div v-if="selected" class="inspector">
    <button class="close" @click="$emit('close')">✕ CLOSE FILE</button>
    
    <div v-if="project" class="evidence">
      <div class="label">{{ project.label }}</div>
      <h2>{{ project.name }}</h2>
      <div class="meta">{{ project.type }} • {{ project.stack.join(' • ') }}</div>
      <div class="status"><span>STATUS</span><div class="bar"><div class="fill" :style="{width: project.progress+'%'}"></div></div><span>{{ project.status }}</span></div>
      <p class="desc">{{ project.description }}</p>
      
      <div class="sub-label">SUB-EVIDENCE</div>
      <div class="chips">
        <button v-for="s in project.subEvidence" :key="s.id" class="chip" :class="{active: activeSub===s.id}" @click="activeSub=s.id">[ {{ s.label }} ]</button>
      </div>

      <div v-if="activeSubData" class="flow-card">
        <div class="flow-title">{{ activeSubData.title }}</div>
        <div class="flow">
          <div v-for="(step,i) in activeSubData.flow" :key="i" class="flow-step">
            <div class="flow-dot"></div>
            <div class="flow-name">{{ step }}</div>
            <div v-if="i < activeSubData.flow.length-1" class="flow-line">↓</div>
          </div>
        </div>
        <div v-if="activeSubData.note" class="note">NOTE: {{ activeSubData.note }}</div>
      </div>

      <div class="links">
        <a v-if="project.links.live" href="#" class="link">Live ↗</a>
        <a v-if="project.links.github" href="#" class="link">GitHub ↗</a>
      </div>
    </div>

    <div v-else-if="skill" class="evidence">
      <div class="label">EVIDENCE TAG</div>
      <h2>{{ skill.name }}</h2>
      <div class="meta">LEVEL: {{ skill.level }} • Found in {{ skill.foundIn.length }} projects</div>
      <div class="sub-label">FOUND IN</div>
      <div class="found-list"><span v-for="f in skill.foundIn" :key="f" class="found">{{ f }}</span></div>
      <div class="sub-label">RELATED EVIDENCE</div>
      <div class="chips"><span v-for="r in skill.related" :key="r" class="chip static">[ {{ r }} ]</span></div>
      <p class="tip">Clicking this tag highlights connected projects on the board with red string.</p>
    </div>

    <div v-else-if="selected==='person'" class="evidence">
      <div class="label">PERSON OF INTEREST</div>
      <h2>{{ portfolio.person.name }}</h2>
      <div class="meta">{{ portfolio.person.role }} • {{ portfolio.person.location }}</div>
      <div class="tabs">
        <button v-for="t in ['BACKGROUND','INTERESTS','LEARNING','GOALS']" :key="t" class="tab" :class="{active: tab===t}" @click="tab=t">{{ t }}</button>
      </div>
      <div class="tab-content">
        <p v-if="tab==='BACKGROUND'">{{ portfolio.person.background }}</p>
        <p v-if="tab==='INTERESTS'">{{ portfolio.person.interests.join(' • ') }}</p>
        <p v-if="tab==='LEARNING'">{{ portfolio.person.learning.join(' • ') }}</p>
        <p v-if="tab==='GOALS'">{{ portfolio.person.goals.join(' • ') }}</p>
      </div>
      <div class="case-file">
        <div class="cf-row"><span>LESSONS</span><span>{{ portfolio.person.lessons }}</span></div>
      </div>
    </div>

    <div v-else-if="selected==='classified'" class="evidence classified-ev">
      <div class="label">EVIDENCE [CLASSIFIED] — DECLASSIFIED</div>
      <h2>{{ portfolio.classified.title }}</h2>
      <div class="meta">{{ portfolio.classified.subtitle }}</div>
      <pre class="classified-body">{{ portfolio.classified.body }}</pre>
    </div>

    <div v-else-if="selected==='casefile'" class="evidence">
      <div class="label">CASE FILE — 001</div>
      <h2>WHO IS BUTSHA TENGWA?</h2>
      <div class="meta">Status: OPEN • Evidence: Incomplete</div>
      <p class="desc">A collection of projects, experiments, failures and skills belonging to one developer. Your job is to piece together the evidence.</p>
      <div class="sub-label">INVESTIGATION PROTOCOL</div>
      <ol class="protocol">
        <li>Click photographs → inspect projects</li>
        <li>Follow red string → find connections</li>
        <li>Verify clues → unlock classified</li>
        <li>Solve case → contact</li>
      </ol>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({ selected: String, portfolio: Object })
defineEmits(['close','discover'])
const tab = ref('BACKGROUND')
const activeSub = ref(null)
const project = computed(()=> props.portfolio.projects.find(p=>p.id===props.selected))
const skill = computed(()=> props.portfolio.skills.find(s=>s.id===props.selected))
const activeSubData = computed(()=> project.value?.subEvidence.find(s=>s.id===activeSub.value))
watch(project, (p)=>{ if(p?.subEvidence[0]) activeSub.value=p.subEvidence[0].id })
</script>

<style scoped>
.inspector{position:absolute;right:0;top:0;bottom:0;width:420px;background:rgba(14,14,14,.96);border-left:1px solid #2a2a2a;padding:26px;z-index:20;overflow-y:auto;backdrop-filter:blur(12px);animation:slide .35s ease}
@keyframes slide{from{transform:translateX(100%)}to{transform:translateX(0)}}
.close{background:transparent;border:1px solid #333;color:#888;padding:6px 12px;font-family:inherit;font-size:10px;letter-spacing:1px;cursor:pointer;margin-bottom:20px}
.close:hover{color:#e8e0d0;border-color:#555}
.label{font-size:10px;letter-spacing:2px;opacity:.4;margin-bottom:6px}
.evidence h2{font-family:'Special Elite',cursive;font-size:28px;letter-spacing:2px;color:#e8dcc8;margin-bottom:6px}
.meta{font-size:11px;opacity:.5;margin-bottom:14px}
.status{display:flex;align-items:center;gap:10px;font-size:10px;margin-bottom:14px}
.status .bar{flex:1;height:4px;background:#222}
.fill{height:100%;background:#b11a1a}
.desc{font-size:13px;line-height:1.6;opacity:.8;margin-bottom:18px}
.sub-label{font-size:10px;letter-spacing:2px;opacity:.4;margin:18px 0 10px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{background:#1a1a1a;border:1px solid #2a2a2a;color:#e8e0d0;padding:6px 10px;font-family:inherit;font-size:11px;cursor:pointer}
.chip:hover{background:#222}
.chip.active{background:#e8e0d0;color:#0a0a0b}
.chip.static{cursor:default}
.flow-card{margin-top:16px;background:#111;border:1px solid #222;padding:16px}
.flow-title{font-size:12px;letter-spacing:1px;margin-bottom:12px;color:#ffcc88}
.flow{display:flex;flex-direction:column;gap:2px}
.flow-step{display:flex;align-items:center;gap:10px;position:relative}
.flow-dot{width:8px;height:8px;background:#b11a1a;border-radius:50%;flex-shrink:0}
.flow-name{font-size:12px}
.flow-line{position:absolute;left:3px;top:18px;color:#333;font-size:10px}
.note{margin-top:14px;font-size:11px;opacity:.5;font-style:italic;border-left:2px solid #b11a1a;padding-left:10px}
.links{margin-top:18px;display:flex;gap:12px}
.link{font-size:11px;color:#ffcc88;text-decoration:none;border-bottom:1px solid #333}
.found-list{display:flex;gap:8px;flex-wrap:wrap}
.found{background:#111;border:1px solid #222;padding:6px 10px;font-size:11px}
.tip{margin-top:16px;font-size:11px;opacity:.4}
.tabs{display:flex;gap:6px;margin:16px 0;flex-wrap:wrap}
.tab{background:#111;border:1px solid #222;color:#888;padding:6px 10px;font-size:10px;cursor:pointer;letter-spacing:1px}
.tab.active{background:#e8e0d0;color:#111}
.tab-content p{font-size:13px;line-height:1.7;opacity:.8}
.case-file{margin-top:18px;border-top:1px solid #222;padding-top:12px}
.cf-row{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.cf-row span:first-child{font-size:10px;opacity:.4;letter-spacing:1px}
.cf-row span:last-child{font-size:12px;line-height:1.6}
.protocol{margin:12px 0 0 18px;font-size:12px;line-height:1.9;opacity:.7}
.classified-body{white-space:pre-wrap;font-family:inherit;font-size:12px;line-height:1.7;background:#0a0a0a;border:1px solid #222;padding:14px;margin-top:12px;opacity:.85}
</style>
