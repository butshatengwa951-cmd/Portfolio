<template>
  <div class="skills-file">
    <div class="doc-header"><span class="file-no">FILE 05 — EVIDENCE TAGS</span><h2>SKILLS / TECHNOLOGY MAP</h2></div>
    <div class="map-wrap">
      <svg class="lines" viewBox="0 0 800 400">
        <path v-for="l in lines" :key="l.id" :d="l.d" :class="{active: highlightedSkill===l.skill}" />
      </svg>
      <div class="tags-layer">
        <div
          v-for="s in skills"
          :key="s.id"
          class="skill-tag"
          :style="positions[s.id]"
          @mouseenter="hoverSkill=s.id"
          @mouseleave="hoverSkill=null"
          @click="selectedSkill=s.id"
        >
          <div class="tag-top">{{ s.name }}</div>
          <div class="tag-bottom">{{ s.level }} • FILES: {{ s.files.join(', ') }}</div>
        </div>

        <div
          v-for="f in projectFiles"
          :key="f.id"
          class="file-node"
          :style="filePos[f.id]"
        >
          [ {{ f.label }} ]
        </div>
      </div>
    </div>
    <div class="related" v-if="hoverSkill">
      <div class="rel-label">RELATED EVIDENCE FOR {{ hoverSkill.toUpperCase() }}</div>
      <div class="rel-tags"><span v-for="r in activeSkill.related" :key="r" class="rel-tag">[ {{ r }} ]</span></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ skills: Array, files: Array })

const hoverSkill = ref(null)
const selectedSkill = ref(null)

const positions = {
  js:{left:'8%',top:'12%'},
  htmlcss:{left:'34%',top:'8%'},
  vue:{left:'66%',top:'12%'},
  node:{left:'14%',top:'42%'},
  mysql:{left:'43%',top:'40%'},
  payfast:{left:'72%',top:'42%'},
  chartjs:{left:'28%',top:'69%'},
  scraping:{left:'63%',top:'69%'}
}

const filePos = {
  stockwell:{left:'28%',top:'88%'},
  moderntechhr:{left:'58%',top:'88%'},
  lightningnews:{left:'88%',top:'88%'}
}

const projectFiles = computed(() =>
  (props.files || []).filter(f => ['stockwell', 'moderntechhr', 'lightningnews'].includes(f.id))
)

const activeSkill = computed(() =>
  props.skills?.find(s => s.id === (selectedSkill.value || hoverSkill.value))
)

const highlightedSkill = computed(() => selectedSkill.value || hoverSkill.value)

const lines = computed(() => {
  const arr = []
  const fileMap = {
    '02': 'stockwell',
    '03': 'moderntechhr',
    '04': 'lightningnews'
  }

  ;(props.skills || []).forEach(skill => {
    skill.files.forEach(fileNumber => {
      const projectId = fileMap[fileNumber]
      const skillPos = positions[skill.id]
      const projectPos = filePos[projectId]

      if (!skillPos || !projectPos) return

      arr.push({
        id: skill.id + fileNumber,
        skill: skill.id,
        d: `M ${skillPos.left.replace('%','') * 8} ${skillPos.top.replace('%','') * 4}
            L ${projectPos.left.replace('%','') * 8} 360`
      })
    })
  })

  return arr
})
</script>

<style scoped>
.doc-header{margin-bottom:16px}
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:28px;letter-spacing:2px}
.map-wrap{position:relative;width:100%;height:420px;background:#fffdf7;border:1px solid #e8ddd0;overflow:hidden}
.lines{position:absolute;inset:0;width:100%;height:100%}
.lines path{fill:none;stroke:#d6c9b8;stroke-width:1;stroke-dasharray:4 4;opacity:.5;transition:.2s}
.lines path.active{stroke:#a32626;opacity:1;stroke-dasharray:none;stroke-width:1.5}
.tags-layer{position:absolute;inset:0}
.skill-tag{position:absolute;background:#f5efe0;border:1px solid #231b16;padding:10px 12px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.08);transition:.15s;min-width:120px}
.skill-tag:hover{transform:translateY(-3px);background:#231b16;color:#eee6d7}
.tag-top{font-weight:700;font-size:12px;letter-spacing:1px}
.tag-bottom{font-size:8px;opacity:.6;margin-top:4px;letter-spacing:.6px}
.file-node{position:absolute;background:#231b16;color:#eee6d7;padding:6px 10px;font-size:9px;letter-spacing:1px;transform:translateX(-50%)}
.related{margin-top:14px;background:#fff;border:1px solid #e8ddd0;padding:12px}
.rel-label{font-size:9px;letter-spacing:1.5px;color:#a32626;margin-bottom:8px}
.rel-tags{display:flex;gap:6px;flex-wrap:wrap}
.rel-tag{font-size:10px;background:#f5efe0;border:1px solid #d6c9b8;padding:4px 8px}
</style>
