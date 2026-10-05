<template>
  <div class="skills-file">
    <div class="doc-header">
      <span class="file-no">FILE 06 — EVIDENCE TAGS</span>
      <h2>SKILLS / TECHNOLOGY MAP</h2>
    </div>

    <div class="map-intro">
      <span>TECHNOLOGIES</span>
      <i>→</i>
      <span>PROJECT EVIDENCE</span>
      <small>LINES SHOW WHERE EACH TECHNOLOGY WAS USED</small>
    </div>

    <div class="map-wrap">
      <svg class="lines" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path
          v-for="l in lines"
          :key="l.id"
          :d="l.d"
          :class="{ active: highlightedSkill === l.skill }"
        />
      </svg>

      <div class="row-caption row-core">CORE ACROSS PROJECTS</div>
      <div class="row-caption row-shared">SHARED STACK</div>
      <div class="row-caption row-specific">PROJECT-SPECIFIC</div>

      <div class="tags-layer">
        <div
          v-for="s in skills"
          :key="s.id"
          class="skill-tag"
          :style="skillStyle(s.id)"
          :class="{ selected: selectedSkill === s.id }"
          @click="toggleSkill(s.id)"
        >
          <div class="tag-top">{{ s.name }}</div>
          <div class="tag-bottom">{{ s.level }} • FILES: {{ s.files.join(', ') }}</div>
        </div>

        <div
          v-for="f in projectFiles"
          :key="f.id"
          class="file-node"
          :style="projectStyle(f.id)"
        >
          <span>{{ f.label }}</span>
        </div>
      </div>
    </div>

    <div class="related" v-if="selectedSkill && activeSkill">
      <div class="rel-label">RELATED EVIDENCE FOR {{ activeSkill.name }}</div>
      <div class="rel-tags">
        <span v-for="r in activeSkill.related" :key="r" class="rel-tag">[ {{ r }} ]</span>
      </div>
    </div>

    <section v-if="otherSkills?.length" class="other-skills">
      <div class="other-header">
        <span>OTHER SKILLS</span>
        <small>ADDITIONAL TECHNOLOGY</small>
      </div>
      <div class="other-list">
        <article v-for="skill in otherSkills" :key="skill.id" class="other-card">
          <div class="other-name">{{ skill.name }}</div>
          <p>{{ skill.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  skills: Array,
  files: Array,
  otherSkills: Array
})

const selectedSkill = ref(null)

function toggleSkill(id) {
  selectedSkill.value = selectedSkill.value === id ? null : id
}

const projectOrder = ['stockwell', 'moderntechhr', 'budgettracker', 'lightningnews']

const projectCenters = {
  stockwell: 12.5,
  moderntechhr: 37.5,
  budgettracker: 62.5,
  lightningnews: 87.5
}

const skillLayout = {
  js: { x: 35, y: 42 },
  htmlcss: { x: 65, y: 42 },

  vue: { x: 18, y: 155 },
  render: { x: 48, y: 155 },
  python: { x: 73, y: 155 },
  flask: { x: 89, y: 155 },

  node: { x: 8, y: 290 },
  mysql: { x: 22, y: 290 },
  payfast: { x: 36, y: 290 },
  chartjs: { x: 50, y: 290 },
  postgresql: { x: 68, y: 290 },
  scraping: { x: 88, y: 290 }
}

const projectFiles = computed(() =>
  projectOrder
    .map(id => (props.files || []).find(file => file.id === id))
    .filter(Boolean)
)

const activeSkill = computed(() =>
  props.skills?.find(s => s.id === selectedSkill.value)
)

const highlightedSkill = computed(() => selectedSkill.value)

function skillStyle(id) {
  const pos = skillLayout[id]
  if (!pos) return {}
  return {
    left: pos.x + '%',
    top: (pos.y / 600 * 100) + '%'
  }
}

function projectStyle(id) {
  const x = projectCenters[id]
  return {
    left: x + '%',
    top: '86%'
  }
}

const fileMap = {
  '02': 'stockwell',
  '03': 'moderntechhr',
  '04': 'lightningnews',
  '05': 'budgettracker'
}

const lines = computed(() => {
  const arr = []

  ;(props.skills || []).forEach(skill => {
    const pos = skillLayout[skill.id]
    if (!pos) return

    skill.files.forEach(fileNumber => {
      const projectId = fileMap[fileNumber]
      const targetX = projectCenters[projectId]
      if (targetX == null) return

      const targetY = 525
      const startY = pos.y + 42

      // Keep project-specific links almost vertical; shared links use a
      // gentle curve so the network reads as a map instead of a tangle.
      const delta = Math.abs(targetX - pos.x)
      const controlOffset = Math.min(90, Math.max(34, delta * 0.45))
      const direction = targetX >= pos.x ? 1 : -1

      const d = delta < 6
        ? `M ${pos.x * 10} ${startY} L ${targetX * 10} ${targetY}`
        : `M ${pos.x * 10} ${startY}
            C ${(pos.x * 10) + (controlOffset * direction)} ${startY + 35},
              ${(targetX * 10) - (controlOffset * direction)} ${targetY - 55},
              ${targetX * 10} ${targetY}`

      arr.push({
        id: skill.id + '-' + fileNumber,
        skill: skill.id,
        d
      })
    })
  })

  return arr
})
</script>

<style scoped>
.doc-header{margin-bottom:10px}
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:28px;letter-spacing:2px;margin:0}

.map-intro{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;color:#6d5f51;font-size:8px;letter-spacing:1.4px}
.map-intro i{color:#a32626;font-style:normal}
.map-intro small{margin-left:auto;color:#a32626;font-size:7px;letter-spacing:1px}

.map-wrap{position:relative;width:100%;height:600px;background:#fffdf7;border:1px solid #e8ddd0;overflow:hidden}
.map-wrap::before{content:'';position:absolute;left:0;right:0;top:104px;border-top:1px dashed #e8ddd0}
.map-wrap::after{content:'';position:absolute;left:0;right:0;top:235px;border-top:1px dashed #e8ddd0}

.lines{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.lines path{fill:none;stroke:#b5a694;stroke-width:1.4;stroke-dasharray:6 5;stroke-linecap:round;opacity:.55;transition:stroke .18s,opacity .18s,stroke-width .18s}
.lines path.active{stroke:#a32626;opacity:1;stroke-dasharray:none;stroke-width:2.5}

.row-caption{position:absolute;left:10px;z-index:2;padding:3px 6px;background:#fffdf7;color:#a32626;border-left:2px solid #a32626;font-size:7px;letter-spacing:1.3px}
.row-core{top:10px}
.row-shared{top:121px}
.row-specific{top:256px}

.tags-layer{position:absolute;inset:0;z-index:3}
.skill-tag{position:absolute;transform:translateX(-50%);min-width:118px;padding:9px 10px;background:#f5efe0;border:1px solid #231b16;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.07);transition:.15s;white-space:nowrap}
.skill-tag:hover{transform:translate(-50%,-2px)}
.skill-tag.selected{background:#231b16;color:#eee6d7;box-shadow:0 7px 16px rgba(0,0,0,.14);border-color:#a32626}
.tag-top{font-weight:700;font-size:11px;letter-spacing:.9px}
.tag-bottom{font-size:7px;opacity:.6;margin-top:4px;letter-spacing:.4px}

.file-node{position:absolute;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;min-width:150px;min-height:54px;padding:10px 12px;background:#231b16;color:#eee6d7;border:1px solid #a32626;box-shadow:0 8px 18px rgba(0,0,0,.16)}
.file-node::before{content:'PROJECT';position:absolute;top:-9px;left:10px;padding:2px 5px;background:#a32626;color:#fff;font-size:6px;letter-spacing:1.2px}
.file-node span{font-family:'Special Elite';font-size:10px;letter-spacing:1.2px;text-align:center}

.related{margin-top:14px;background:#fff;border:1px solid #e8ddd0;padding:12px}
.rel-label{font-size:9px;letter-spacing:1.5px;color:#a32626;margin-bottom:8px}
.rel-tags{display:flex;gap:6px;flex-wrap:wrap}
.rel-tag{font-size:10px;background:#f5efe0;border:1px solid #d6c9b8;padding:4px 8px}

.other-skills{margin-top:18px;padding-top:16px;border-top:1px solid #e8ddd0}
.other-header{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}
.other-header span{font-family:'Special Elite';font-size:16px;letter-spacing:1.5px}
.other-header small{font-size:8px;letter-spacing:1.5px;color:#a32626}
.other-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.other-card{background:#f5efe0;border:1px solid #d6c9b8;padding:12px}
.other-name{font-size:11px;font-weight:700;letter-spacing:1px;margin-bottom:6px}
.other-card p{margin:0;font-size:10px;line-height:1.65;opacity:.72}

@media(max-width:900px){
  .map-wrap{height:640px;overflow-x:auto}
  .map-wrap > .lines{min-width:900px}
  .tags-layer{min-width:900px}
  .skill-tag{min-width:108px}
  .file-node{min-width:140px}
}

@media(max-width:600px){
  .map-intro small{width:100%;margin-left:0}
  .map-wrap{height:650px;overflow-x:auto}
  .map-wrap > .lines{min-width:900px}
  .tags-layer{min-width:900px}
  .other-list{grid-template-columns:1fr}
  .other-header{align-items:flex-start;flex-direction:column;gap:4px}
}
</style>
