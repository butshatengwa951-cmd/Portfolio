<template>
  <aside v-if="selected" class="inspector">
    <button class="close" @click="$emit('close')">✕ CLOSE FILE</button>

    <section v-if="project" class="evidence">
      <div class="label">{{ project.label }}</div>
      <h2>{{ project.name }}</h2>
      <div class="meta">{{ project.type }} • {{ project.stack.join(' • ') }}</div>

      <div class="status">
        <span>STATUS</span>
        <div class="bar"><div class="fill" :style="{ width: project.progress + '%' }"></div></div>
        <span>{{ project.status }}</span>
      </div>

      <p class="desc">{{ project.description }}</p>

      <div v-if="project.subEvidence?.length" class="sub-label">SUB-EVIDENCE</div>
      <div v-if="project.subEvidence?.length" class="chips">
        <button
          v-for="item in project.subEvidence"
          :key="item.id"
          class="chip"
          :class="{ active: activeSub === item.id }"
          @click="activeSub = item.id"
        >
          [ {{ item.label }} ]
        </button>
      </div>

      <div v-if="activeSubData" class="flow-card">
        <div class="flow-title">{{ activeSubData.title }}</div>

        <div class="flow">
          <div v-for="(step, index) in activeSubData.flow" :key="step + index" class="flow-step">
            <div class="flow-dot"></div>
            <div class="flow-name">{{ step }}</div>
            <div v-if="index < activeSubData.flow.length - 1" class="flow-line">↓</div>
          </div>
        </div>

        <div v-if="activeSubData.note" class="note">NOTE: {{ activeSubData.note }}</div>
      </div>

      <div v-if="project.links?.live || project.links?.github" class="links">
        <a v-if="project.links.live" :href="project.links.live" target="_blank" rel="noreferrer" class="link">Live ↗</a>
        <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noreferrer" class="link">GitHub ↗</a>
      </div>
    </section>

    <section v-else-if="skill" class="evidence">
      <div class="label">EVIDENCE TAG</div>
      <h2>{{ skill.name }}</h2>
      <div class="meta">LEVEL: {{ skill.level }} • Found in {{ skill.foundIn.length }} projects</div>

      <div class="sub-label">FOUND IN</div>
      <div class="found-list">
        <span v-for="item in skill.foundIn" :key="item" class="found">{{ item }}</span>
      </div>

      <div class="sub-label">RELATED EVIDENCE</div>
      <div class="chips">
        <span v-for="item in skill.related" :key="item" class="chip static">[ {{ item }} ]</span>
      </div>
    </section>

    <section v-else-if="selected === 'person'" class="evidence">
      <div class="label">PERSON OF INTEREST</div>
      <h2>{{ portfolio.person.name }}</h2>
      <div class="meta">{{ portfolio.person.role }} • {{ portfolio.person.location }}</div>

      <div class="tabs">
        <button
          v-for="item in ['BACKGROUND', 'INTERESTS', 'LEARNING', 'GOALS']"
          :key="item"
          class="tab"
          :class="{ active: tab === item }"
          @click="tab = item"
        >
          {{ item }}
        </button>
      </div>

      <div class="tab-content">
        <p v-if="tab === 'BACKGROUND'">{{ portfolio.person.background }}</p>
        <p v-if="tab === 'INTERESTS'">{{ portfolio.person.interests.join(' • ') }}</p>
        <p v-if="tab === 'LEARNING'">{{ portfolio.person.learning.join(' • ') }}</p>
        <p v-if="tab === 'GOALS'">{{ portfolio.person.goals.join(' • ') }}</p>
      </div>

      <div class="case-file">
        <div class="cf-row">
          <span>LESSONS</span>
          <span>{{ portfolio.person.lessons }}</span>
        </div>
      </div>
    </section>

    <section v-else-if="selected === 'portrait'" class="evidence">
      <div class="label">PORTRAIT // IDENTITY UNKNOWN</div>
      <h2>THE SUBJECT</h2>
      <div class="meta">IMAGE RECORDED • FULL IDENTITY REQUIRES INVESTIGATION</div>
      <p class="desc">
        The portrait stays on the board throughout the investigation. As more clues are verified,
        the image becomes clearer and the redaction disappears.
      </p>

      <div class="portrait-note">
        <span>INITIAL STATE</span>
        <strong>BLACK & WHITE / SOFT FOCUS / ?</strong>
      </div>
    </section>

    <section v-else-if="selected === 'classified'" class="evidence">
      <div class="label">EVIDENCE [CLASSIFIED] — DECLASSIFIED</div>
      <h2>{{ portfolio.classified.title }}</h2>
      <div class="meta">{{ portfolio.classified.subtitle }}</div>
      <pre class="classified-body">{{ portfolio.classified.body }}</pre>
    </section>

    <section v-else-if="selected === 'casefile'" class="evidence">
      <div class="label">CASE FILE — 001</div>
      <h2>WHO IS BUTSHA TENGWA?</h2>
      <div class="meta">STATUS: OPEN • EVIDENCE: INCOMPLETE</div>

      <p class="desc">
        A collection of projects, experiments, lessons and skills belonging to one developer.
        Your job is to piece together the evidence.
      </p>

      <div class="sub-label">INVESTIGATION PROTOCOL</div>
      <ol class="protocol">
        <li>Inspect the photographs.</li>
        <li>Follow the red string.</li>
        <li>Verify the clues.</li>
        <li>Uncover the person behind the work.</li>
      </ol>
    </section>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  selected: { type: String, default: null },
  portfolio: { type: Object, required: true }
})

defineEmits(['close'])

const tab = ref('BACKGROUND')
const activeSub = ref(null)

const project = computed(() =>
  props.portfolio.projects.find(item => item.id === props.selected)
)

const skill = computed(() =>
  props.portfolio.skills.find(item => item.id === props.selected)
)

const activeSubData = computed(() =>
  project.value?.subEvidence?.find(item => item.id === activeSub.value)
)

watch(project, value => {
  activeSub.value = value?.subEvidence?.[0]?.id || null
})
</script>

<style scoped>
.inspector{
  position:absolute;
  z-index:20;
  right:0;
  top:0;
  bottom:0;
  width:420px;
  padding:26px;
  overflow-y:auto;
  border-left:1px solid #2a2722;
  background:rgba(14,13,12,.965);
  backdrop-filter:blur(15px);
  box-shadow:-24px 0 80px rgba(0,0,0,.3);
  animation:slide .3s ease;
}
@keyframes slide{from{transform:translateX(100%)}to{transform:translateX(0)}}
.close{
  background:transparent;
  border:1px solid #33302b;
  color:#888078;
  padding:7px 12px;
  font:9px 'JetBrains Mono',monospace;
  letter-spacing:1px;
  cursor:pointer;
  margin-bottom:22px;
}
.close:hover{color:#eee5d7;border-color:#59534b}
.label{
  font-size:9px;
  letter-spacing:2px;
  color:#817a72;
  margin-bottom:6px;
}
.evidence h2{
  margin:0 0 7px;
  font:28px 'Special Elite',serif;
  letter-spacing:2px;
  color:#e8dcc8;
}
.meta{
  font-size:10px;
  color:#756f67;
  line-height:1.5;
}
.status{
  display:flex;
  align-items:center;
  gap:9px;
  margin:15px 0;
  font-size:8px;
  color:#91897f;
}
.status .bar{
  flex:1;
  height:4px;
  background:#211f1c;
}
.fill{height:100%;background:#aa2b2b}
.desc{
  font-size:12px;
  line-height:1.7;
  color:#aaa298;
  margin:0 0 18px;
}
.sub-label{
  font-size:8px;
  letter-spacing:2px;
  color:#716b64;
  margin:18px 0 10px;
}
.chips,.found-list{
  display:flex;
  flex-wrap:wrap;
  gap:7px;
}
.chip,.found{
  background:#151412;
  border:1px solid #2b2925;
  color:#d4ccbF;
  padding:7px 9px;
  font:9px 'JetBrains Mono',monospace;
}
.chip{cursor:pointer}
.chip:hover{background:#1d1b18}
.chip.active{
  background:#e4dcce;
  color:#10100f;
}
.chip.static{cursor:default}
.flow-card{
  margin-top:16px;
  padding:15px;
  border:1px solid #24221f;
  background:#10100f;
}
.flow-title{
  color:#e7c48f;
  font-size:10px;
  letter-spacing:1.3px;
  margin-bottom:13px;
}
.flow{display:flex;flex-direction:column;gap:4px}
.flow-step{
  display:flex;
  align-items:center;
  gap:9px;
  position:relative;
  min-height:18px;
}
.flow-dot{
  width:7px;
  height:7px;
  background:#a92a2a;
  border-radius:50%;
}
.flow-name{font-size:10px;color:#c5bdb1}
.flow-line{
  position:absolute;
  left:0;
  top:16px;
  color:#3f3b36;
  font-size:9px;
}
.note{
  margin-top:14px;
  padding-left:10px;
  border-left:2px solid #8f2525;
  font-size:10px;
  line-height:1.6;
  color:#777168;
}
.links{
  display:flex;
  gap:14px;
  margin-top:18px;
}
.link{
  color:#e4bb80;
  text-decoration:none;
  font-size:9px;
  border-bottom:1px solid #453c33;
  padding-bottom:2px;
}
.tabs{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
  margin:17px 0;
}
.tab{
  border:1px solid #272521;
  background:#11110f;
  color:#77716a;
  padding:6px 9px;
  font:8px 'JetBrains Mono',monospace;
  letter-spacing:1px;
  cursor:pointer;
}
.tab.active{
  background:#e3dacd;
  color:#111;
}
.tab-content p{
  font-size:12px;
  line-height:1.7;
  color:#aaa298;
}
.case-file{
  margin-top:18px;
  padding-top:13px;
  border-top:1px solid #24211e;
}
.cf-row{
  display:flex;
  flex-direction:column;
  gap:6px;
}
.cf-row span:first-child{
  font-size:8px;
  letter-spacing:1.4px;
  color:#6f6961;
}
.cf-row span:last-child{
  font-size:11px;
  line-height:1.6;
  color:#a8a095;
}
.portrait-note{
  margin-top:20px;
  display:flex;
  flex-direction:column;
  gap:7px;
  padding:14px;
  border:1px solid #292621;
  background:#10100f;
}
.portrait-note span{
  font-size:8px;
  letter-spacing:1.5px;
  color:#6f6961;
}
.portrait-note strong{
  font:15px 'Special Elite',serif;
  color:#d4c9bb;
}
.protocol{
  margin:12px 0 0 18px;
  padding:0;
  color:#a9a198;
  font-size:11px;
  line-height:2;
}
.classified-body{
  white-space:pre-wrap;
  margin:14px 0 0;
  padding:14px;
  border:1px solid #24211f;
  background:#090908;
  color:#afa79c;
  font:10px/1.8 'JetBrains Mono',monospace;
}
@media (max-width:800px){
  .inspector{
    width:100%;
    top:auto;
    max-height:72vh;
    border-left:0;
    border-top:1px solid #2a2722;
  }
}
</style>
