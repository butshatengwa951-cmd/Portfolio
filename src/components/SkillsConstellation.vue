<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, X } from 'lucide-vue-next'

type ProjectId = 'stockwell' | 'moderntechhr' | 'lightningnews' | 'budgettracker'
type SkillId = 'js' | 'htmlcss' | 'vue' | 'node' | 'mysql' | 'payfast' | 'chartjs' | 'scraping' | 'threejs' | 'python' | 'flask' | 'postgresql' | 'render'
interface ProjectItem { id: ProjectId; name: string; description: string }
interface SkillItem { id: SkillId; name: string; category: string; projects: ProjectId[]; related: string[]; x: number; y: number }

const props = defineProps<{ focusProject: ProjectId | null; focusVersion: number }>()

const technologies: SkillItem[] = [
  { id:'js', name:'JAVASCRIPT', category:'LANGUAGE', projects:['stockwell','moderntechhr','lightningnews','budgettracker'], related:['ES6+','DOM','Async','Event handling'], x:350,y:43 },
  { id:'htmlcss',name:'HTML / CSS',category:'INTERFACE',projects:['stockwell','moderntechhr','lightningnews','budgettracker'],related:['Semantic HTML','Responsive UI','Layouts','Styling'],x:650,y:43 },
  { id:'vue',name:'VUE.JS',category:'FRAMEWORK',projects:['stockwell','lightningnews','budgettracker'],related:['Components','State','Composition','Reusable interfaces'],x:120,y:155 },
  { id:'mysql',name:'MYSQL',category:'DATABASE',projects:['stockwell','moderntechhr'],related:['Relational data','Transactions','Queries'],x:310,y:155 },
  { id:'render',name:'RENDER',category:'DEPLOYMENT',projects:['moderntechhr','budgettracker'],related:['Web services','Static sites','Environment variables'],x:500,y:155 },
  { id:'python',name:'PYTHON',category:'LANGUAGE',projects:['lightningnews','budgettracker'],related:['Requests','BeautifulSoup','lxml'],x:700,y:155 },
  { id:'flask',name:'FLASK',category:'BACKEND',projects:['lightningnews','budgettracker'],related:['REST API','Routes','JSON','CORS'],x:875,y:155 },
  { id:'node',name:'NODE / EXPRESS',category:'BACKEND',projects:['stockwell'],related:['REST API','Authentication','Middleware','Server logic'],x:85,y:290 },
  { id:'payfast',name:'PAYFAST',category:'PAYMENTS',projects:['stockwell'],related:['ITN','Webhooks','Signatures','Payment validation'],x:260,y:290 },
  { id:'chartjs',name:'CHART.JS',category:'DATA UI',projects:['moderntechhr'],related:['Payroll charts','Analytics','Visualisation'],x:430,y:290 },
  { id:'postgresql',name:'POSTGRESQL',category:'DATABASE',projects:['budgettracker'],related:['Relational data','Queries','Persistence','History'],x:600,y:290 },
  { id:'scraping',name:'WEB SCRAPING',category:'DATA',projects:['lightningnews'],related:['Data extraction','News aggregation','Parsing','Automation'],x:760,y:290 },
  { id:'threejs',name:'THREE.JS',category:'3D / INTERACTION',projects:['lightningnews'],related:['3D scenes','Animation','Interaction','Visualisation'],x:900,y:290 },
]
const projectItems: ProjectItem[] = [
  { id:'stockwell',name:'StockWell',description:'Community commerce with supplier comparison, role-based workflows, group proposals, voting and payment integration.' },
  { id:'moderntechhr',name:'ModernTechHR',description:'HR records, attendance, payroll calculations, search, filtering and visual reporting.' },
  { id:'lightningnews',name:'Lightning News',description:'Content extraction, feed parsing, structured data, and search/statistics APIs.' },
  { id:'budgettracker',name:'Budget Tracker',description:'Persistent budgets, transaction history, tasks and study planning backed by PostgreSQL.' },
]
const positions: Record<ProjectId,{x:number;y:number}> = {
  stockwell:{x:125,y:530},moderntechhr:{x:375,y:530},budgettracker:{x:625,y:530},lightningnews:{x:875,y:530}
}
const selectedSkill = ref<SkillId|null>(null)
const selectedProject = ref<ProjectId|null>(null)
watch(() => props.focusVersion, () => {
  if (props.focusProject) {
    selectedProject.value = props.focusProject
    selectedSkill.value = null
  }
})
const activeSkill = computed(()=>technologies.find(item=>item.id===selectedSkill.value) ?? null)
const activeProject = computed(()=>projectItems.find(item=>item.id===selectedProject.value) ?? null)
const activeProjectSkills = computed(()=>selectedProject.value ? technologies.filter(item=>item.projects.includes(selectedProject.value as ProjectId)) : [])
const connections = computed(()=>technologies.flatMap(item=>item.projects.map(id=>{
  const target=positions[id]
  const dx=target.x-item.x
  const sign=dx>=0?1:-1
  const bend=Math.min(100,Math.max(30,Math.abs(dx)*.32))
  return { id:item.id+'-'+id, skill:item.id, project:id, d:'M '+item.x+' '+(item.y+20)+' C '+(item.x+bend*sign)+' '+(item.y+80)+', '+(target.x-bend*sign)+' '+(target.y-65)+', '+target.x+' '+target.y }
})))
function skillPosition(item:SkillItem){return {left:(item.x/10)+'%',top:(item.y/6)+'%'}}
function toggleSkill(id:SkillId){selectedSkill.value=selectedSkill.value===id?null:id;selectedProject.value=null}
function toggleProject(id:ProjectId){selectedProject.value=selectedProject.value===id?null:id;selectedSkill.value=null}
function skillDimmed(id:SkillId){if(!selectedSkill.value&&!selectedProject.value)return false;if(selectedSkill.value)return selectedSkill.value!==id;return !technologies.find(item=>item.id===id)?.projects.includes(selectedProject.value as ProjectId)}
function projectDimmed(id:ProjectId){if(!selectedSkill.value&&!selectedProject.value)return false;if(selectedProject.value)return selectedProject.value!==id;return !technologies.find(item=>item.id===selectedSkill.value)?.projects.includes(id)}
function projectName(id:ProjectId){return projectItems.find(item=>item.id===id)?.name ?? id}
</script>

<template>
  <section id="skills" class="skills-section section-wrap">
    <div class="section-kicker"><span class="kicker-rule"></span><span>THE SKILLS CONSTELLATION</span><span class="kicker-tail">TECHNOLOGY → PROJECT EVIDENCE</span></div>
    <div class="map-heading">
      <div><h2>Nothing exists<br/><em>in isolation.</em></h2><p>Every technology belongs to a context. Select a skill to trace its project connections, or select a project to reveal the tools associated with it.</p></div>
      <div class="map-legend"><span><i class="legend-dot"></i> DOCUMENTED CONNECTION</span><span><i class="legend-dot legend-muted"></i> OTHER NODES</span><small>SELECT ANY NODE TO EXPLORE</small></div>
    </div>
    <div class="constellation-frame">
      <div class="map-edge-label"><span>TECHNOLOGY FIELD</span><span>PROJECT CONNECTIONS</span></div>
      <div class="map-scroller">
        <div class="map-canvas">
          <svg class="map-lines" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="skillFlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--element-accent)" stop-opacity=".1"/><stop offset=".58" stop-color="var(--element-accent)" stop-opacity=".75"/><stop offset="1" stop-color="var(--landscape-highlight)" stop-opacity=".9"/></linearGradient></defs>
            <path v-for="connection in connections" :key="connection.id" :d="connection.d" class="map-connection" :class="{'is-lit':selectedSkill===connection.skill||selectedProject===connection.project,'is-dimmed':Boolean(selectedSkill||selectedProject)&&selectedSkill!==connection.skill&&selectedProject!==connection.project}"/>
          </svg>
          <div class="map-axis axis-a">FOUNDATION</div><div class="map-axis axis-b">SHARED STACK</div><div class="map-axis axis-c">PROJECT-SPECIFIC</div>
          <button v-for="item in technologies" :key="item.id" type="button" class="skill-node" :style="skillPosition(item)" :class="{'is-selected':selectedSkill===item.id,'is-dimmed':skillDimmed(item.id)}" :aria-pressed="selectedSkill===item.id" @click="toggleSkill(item.id)">
            <span class="skill-node-name">{{item.name}}</span><span class="skill-node-type">{{item.category}}</span>
          </button>
          <button v-for="item in projectItems" :key="item.id" type="button" class="project-node" :style="{left:(positions[item.id].x/10)+'%',top:(positions[item.id].y/6)+'%'}" :class="{'is-selected':selectedProject===item.id,'is-dimmed':projectDimmed(item.id)}" :aria-pressed="selectedProject===item.id" @click="toggleProject(item.id)">
            <span class="project-node-label">PROJECT</span><span class="project-node-name">{{item.name}}</span><ArrowUpRight :size="13"/>
          </button>
          <div class="map-core-mark" aria-hidden="true"><i>∿</i></div>
        </div>
      </div>
      <div class="map-bottom-line"><span>THE SKILLS MAP</span><span>LINES INDICATE PROJECT USE, NOT PROFICIENCY</span></div>
    </div>
    <div class="map-readout" aria-live="polite">
      <template v-if="activeSkill">
        <div class="readout-overline"><span class="readout-dot"></span> TECHNICAL NOTE / {{activeSkill.category}}</div>
        <div class="readout-layout"><h3>{{activeSkill.name}}<em> in practice</em></h3><div class="readout-content"><p>Mapped to {{activeSkill.projects.length}} {{activeSkill.projects.length===1?'project':'projects'}} in the original portfolio.</p><div class="readout-pills"><span v-for="detail in activeSkill.related" :key="detail">{{detail}}</span></div><div class="readout-projects"><button v-for="id in activeSkill.projects" :key="id" type="button" @click="toggleProject(id)">{{projectName(id)}} <ArrowUpRight :size="12"/></button></div></div></div>
      </template>
      <template v-else-if="activeProject">
        <div class="readout-overline"><span class="readout-dot"></span> PROJECT CONNECTIONS</div>
        <div class="readout-layout"><h3>{{activeProject.name}}<em> connected stack</em></h3><div class="readout-content"><p>Technologies associated with this project in the original skills map.</p><div class="readout-pills"><button v-for="item in activeProjectSkills" :key="item.id" type="button" @click="toggleSkill(item.id)">{{item.name}}</button></div><p class="readout-note">{{activeProject.description}}</p></div></div>
      </template>
      <template v-else>
        <div class="readout-overline"><span class="readout-dot"></span> FIELD GUIDE / HOW TO READ THE MAP</div>
        <div class="readout-layout"><h3>Follow a connection.</h3><div class="readout-content"><p>Choose a technology to illuminate its project paths or select a project to isolate its stack. This follows the original folder portfolio relationships, including Vue in Lightning News and MySQL in StockWell and ModernTechHR.</p><div class="readout-pills"><span>Choose a node</span><span>Trace its links</span><span>Explore the work</span></div></div></div>
      </template>
      <button v-if="selectedSkill||selectedProject" class="clear-map" type="button" @click="selectedSkill=null;selectedProject=null">RESET MAP <X :size="12"/></button>
    </div>
    <div class="additional-skill"><span>ADDITIONAL EXPERIENCE</span><b>PHP</b><p>Server-side scripting experience documented separately from the four project connections above.</p></div>
  </section>
</template>
