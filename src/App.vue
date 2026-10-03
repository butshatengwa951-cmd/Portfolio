<template>
  <div class="app-root" :class="{open: isOpen}">
    <!-- Grain overlay -->
    <div class="grain"></div>
    <div class="vignette"></div>

    <!-- CLOSED STATE -->
    <div v-if="!isOpen" class="closed-stage">
      <div class="closed-folder" @click="openFile">
        <div class="folder-paper-edge"></div>
        <div class="folder-cover">
          <div class="cover-top">
            <span class="file-meta">PERSONAL PORTFOLIO — FILE NO. {{ portfolio.person.fileNo }} — CASE 001</span>
            <div class="line"></div>
          </div>

          <div class="cover-center">
            <h1 class="cover-name">{{ portfolio.person.name }}</h1>
            
            <div class="photo-wrap">
              <div class="photo">
                <div class="photo-inner">BT</div>
                <div class="photo-grain"></div>
              </div>
              <div class="paperclip"></div>
              <div class="photo-label">ATTACHED PHOTOGRAPH — FILE PHOTO — BT-001</div>
            </div>

            <div class="cover-details">
              <div class="detail"><span>ROLE</span><b>{{ portfolio.person.role }}</b></div>
              <div class="detail"><span>LOCATION</span><b>{{ portfolio.person.location }}</b></div>
              <div class="detail"><span>SPECIALIZATION</span><b>{{ portfolio.person.specialization }}</b></div>
              <div class="detail status"><span>STATUS</span><b><i class="dot"></i>{{ portfolio.person.status }}</b></div>
            </div>
          </div>

          <div class="cover-bottom">
            <div class="stamp">CLASSIFIED — OPEN ON REQUEST</div>
            <div class="open-hint">Click to open →</div>
          </div>
        </div>

        <!-- OPEN TAB -->
        <button class="open-tab" @click.stop="openFile">
          <span>OPEN FILE</span>
          <i>→</i>
        </button>
      </div>

      <div class="desk-label">WALNUT DESK — FILE BT-001 — HANDLE WITH CARE</div>
    </div>

    <!-- OPEN STATE -->
    <div v-else class="open-stage">
      <div class="open-folder-outer" :class="{animateIn: animateOpen}">
        <!-- Top bar -->
        <div class="folder-topbar">
          <div class="top-left">BUTSHA TENGWA <em>— FILE: {{ activeFileObj.file }} — {{ activeFileObj.title }}</em></div>
          <div class="top-right">PERSONAL FILE — {{ portfolio.person.fileNo }} <span class="red-dot"></span></div>
        </div>

        <!-- File tabs -->
        <div class="file-tabs">
          <button v-for="f in portfolio.files" :key="f.id" class="file-tab" :class="{active: activeId===f.id}" @click="activeId=f.id">
            [ {{ f.label }} ]
          </button>
          <button class="close-file" @click="closeFile">✕ CLOSE</button>
        </div>

        <!-- Inner paper -->
        <div class="folder-inner">
          <!-- punch holes -->
          <div class="punch-holes"><span></span><span></span><span></span><span></span></div>

          <!-- Content -->
          <div class="file-content" :key="activeId">
            <ProfileFile v-if="activeId==='profile'" :portfolio="portfolio" @go="activeId=$event" />
            <StockwellFile v-if="activeId==='stockwell'" :project="portfolio.projects.stockwell" />
            <VoyaFile v-if="activeId==='voyabite'" :project="portfolio.projects.voyabite" />
            <SkillsFile v-if="activeId==='skills'" :skills="portfolio.skills" :files="portfolio.files" @go="activeId=$event" />
            <JourneyFile v-if="activeId==='journey'" :journey="portfolio.journey" />
            <ContactFile v-if="activeId==='contact'" :person="portfolio.person" />
            <NotesFile v-if="activeId==='notes'" />
          </div>

          <!-- Bottom stacked papers indicator -->
          <div class="bottom-meta">
            <div class="stack">
              <div class="stack-paper p3"></div>
              <div class="stack-paper p2"></div>
              <div class="stack-paper p1"></div>
            </div>
            <div class="file-count">FILE {{ activeIndex+1 }} OF {{ portfolio.files.length }} — {{ activeFileObj.label }} — SORTING THROUGH FILES</div>
            <div class="mini-tabs">
              <button v-for="(f,i) in portfolio.files" :key="f.id" class="mini-tab" :class="{active: i===activeIndex}" @click="activeId=f.id" :style="{zIndex: portfolio.files.length - i}">{{ f.label.split('_')[1] || f.label }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolio } from './data/portfolio.js'
import ProfileFile from './components/ProfileFile.vue'
import StockwellFile from './components/StockwellFile.vue'
import VoyaFile from './components/VoyaFile.vue'
import SkillsFile from './components/SkillsFile.vue'
import JourneyFile from './components/JourneyFile.vue'
import ContactFile from './components/ContactFile.vue'
import NotesFile from './components/NotesFile.vue'

const isOpen = ref(false)
const animateOpen = ref(false)
const activeId = ref('profile')

const activeIndex = computed(()=> portfolio.files.findIndex(f=>f.id===activeId.value))
const activeFileObj = computed(()=> portfolio.files[activeIndex.value] || portfolio.files[0])

function openFile(){
  isOpen.value=true
  setTimeout(()=> animateOpen.value=true, 30)
}
function closeFile(){
  animateOpen.value=false
  setTimeout(()=> isOpen.value=false, 450)
}
</script>

<style scoped>
.app-root{position:relative;min-height:100vh;width:100vw;background:#2b211b;overflow:hidden;display:flex;align-items:center;justify-content:center}
.grain{position:fixed;inset:0;pointer-events:none;opacity:.06;z-index:1;background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.vignette{position:fixed;inset:0;pointer-events:none;z-index:2;background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.55) 100%)}

/* CLOSED */
.closed-stage{position:relative;z-index:5;width:100%;height:100vh;display:flex;align-items:center;justify-content:center;perspective:1200px}
.closed-folder{position:relative;width:520px;height:700px;cursor:pointer;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.closed-folder:hover{transform: translateY(-6px) rotateX(4deg)}
.folder-paper-edge{position:absolute;inset:0;transform: translateZ(-10px);background:#e8ddd0;box-shadow: 0 2px 0 #d6c9b8, 0 4px 0 #c9bba9;border-radius:2px}
.folder-cover{position:relative;width:100%;height:100%;background:#231b16;border:1px solid #1a1410;border-radius:3px;box-shadow: 0 30px 80px rgba(0,0,0,.7), 0 5px 18px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06);padding:28px 32px;display:flex;flex-direction:column;justify-content:space-between}
.cover-top .file-meta{font-size:9px;letter-spacing:2.2px;color:#d6a66f;opacity:.7}
.cover-top .line{height:1px;background:linear-gradient(to right, #d6a66f, transparent);margin-top:10px;opacity:.5}
.cover-center{text-align:center}
.cover-name{font-family:'Special Elite', cursive;font-size:44px;letter-spacing:4px;color:#eee6d7;line-height:.9;margin-bottom:26px;text-shadow: 0 1px 0 rgba(0,0,0,.8)}
.photo-wrap{position:relative;display:inline-block;margin-bottom:24px}
.photo{width:160px;height:200px;background:#111;border:4px solid #faf6ef;box-shadow: 0 8px 20px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.8);transform: rotate(-1.5deg);overflow:hidden;position:relative}
.photo-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background: linear-gradient(145deg, #222, #0a0a0a);color:#eee6d7;font-family:'Special Elite';font-size:54px;letter-spacing:6px;filter: grayscale(1) contrast(1.1)}
.photo-grain{position:absolute;inset:0;background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.95'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E");mix-blend-mode: overlay}
.paperclip{position:absolute;top:-10px;right:-14px;width:28px;height:56px;border:2px solid #888;border-left:none;border-bottom:none;border-radius:0 12px 0 0;transform: rotate(12deg)}
.photo-label{font-size:7.5px;letter-spacing:1.2px;color:#a99f8f;margin-top:10px;opacity:.6}
.cover-details{text-align:left;max-width:280px;margin:0 auto}
.detail{display:flex;justify-content:space-between;border-bottom:1px dashed rgba(214,166,111,.2);padding:7px 0;font-size:10px}
.detail span{color:#d6a66f;letter-spacing:1.5px;opacity:.6}
.detail b{color:#eee6d7;font-weight:500;letter-spacing:.8px}
.dot{width:7px;height:7px;background:#a32626;border-radius:50%;display:inline-block;margin-right:6px;box-shadow:0 0 6px #a32626}
.cover-bottom{display:flex;justify-content:space-between;align-items:flex-end}
.stamp{font-family:'Special Elite';font-size:11px;color:#a32626;border:2px solid #a32626;padding:5px 10px;transform: rotate(-2.5deg);letter-spacing:1.5px;opacity:.9}
.open-hint{font-size:9px;letter-spacing:2px;color:#d6a66f;opacity:.5}
.open-tab{position:absolute;right:-34px;top:120px;width:56px;height:120px;background:#f5efe0;border:1px solid #d6c9b8;border-left:none;box-shadow: 6px 6px 18px rgba(0,0,0,.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:.2s}
.open-tab span{writing-mode:vertical-rl;font-size:10px;letter-spacing:2px;color:#11100e;font-weight:700}
.open-tab i{font-style:normal;color:#a32626;font-weight:700}
.open-tab:hover{transform: translateX(4px)}
.desk-label{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);font-size:8px;letter-spacing:3px;color:#d6a66f;opacity:.25}

/* OPEN */
.open-stage{position:relative;z-index:5;width:100%;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:30px 20px;overflow-y:auto}
.open-folder-outer{width:92vw;max-width:1100px;background:#f5efe0;border:14px solid #231b16;box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 10px 30px rgba(0,0,0,.5);transform: translateY(40px) scale(.97);opacity:0;transition: all .6s cubic-bezier(.2,.8,.2,1)}
.open-folder-outer.animateIn{transform: translateY(0) scale(1);opacity:1}
.folder-topbar{display:flex;justify-content:space-between;padding:10px 18px;background:#231b16;color:#d6a66f;font-size:10px;letter-spacing:1.5px}
.folder-topbar em{font-style:normal;opacity:.6;color:#eee6d7;margin-left:6px}
.red-dot{width:6px;height:6px;background:#a32626;border-radius:50%;display:inline-block;margin-left:8px;vertical-align:middle}
.file-tabs{display:flex;gap:6px;padding:12px 14px 0;background:#e8ddd0;border-bottom:1px solid #d6c9b8;overflow-x:auto;flex-wrap:wrap}
.file-tab{background:#fffdf7;border:1px solid #d6c9b8;border-bottom:none;padding:9px 14px;font-family:'JetBrains Mono';font-size:11px;letter-spacing:1px;cursor:pointer;color:#11100e;transition:.15s;white-space:nowrap;box-shadow: 0 -2px 6px rgba(0,0,0,.06)}
.file-tab:hover{transform: translateY(-2px)}
.file-tab.active{background:#fffdf7;color:#11100e;border-top:2px solid #a32626;box-shadow: 0 -4px 12px rgba(0,0,0,.12);transform: translateY(-2px);font-weight:700}
.close-file{margin-left:auto;background:#a32626;color:#fffdf7;border:1px solid #a32626;padding:9px 14px;font-size:10px;letter-spacing:1px;cursor:pointer}
.folder-inner{position:relative;background:#fffdf7;min-height:640px;padding:28px 28px 0 52px}
.punch-holes{position:absolute;left:14px;top:0;bottom:0;display:flex;flex-direction:column;gap:120px;padding-top:80px}
.punch-holes span{width:14px;height:14px;border-radius:50%;background:#2b211b;box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.1)}
.file-content{animation: paperIn .35s ease}
@keyframes paperIn{from{opacity:0;transform: translateY(8px)}to{opacity:1;transform:translateY(0)}}
.bottom-meta{margin-top:30px;border-top:1px solid #e8ddd0;padding:16px 0 18px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.stack{position:relative;width:70px;height:32px}
.stack-paper{position:absolute;width:50px;height:32px;background:#fffdf7;border:1px solid #d6c9b8;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.stack-paper.p1{left:0;top:0;transform:rotate(-2deg);z-index:3}
.stack-paper.p2{left:10px;top:-3px;transform:rotate(1deg);z-index:2;opacity:.8}
.stack-paper.p3{left:20px;top:-6px;transform:rotate(3deg);z-index:1;opacity:.6}
.file-count{font-size:9px;letter-spacing:1.5px;opacity:.45}
.mini-tabs{display:flex;gap:4px;margin-left:auto;flex-wrap:wrap}
.mini-tab{background:#f5efe0;border:1px solid #d6c9b8;padding:5px 8px;font-size:8px;letter-spacing:.8px;cursor:pointer;transform: rotate(var(--r,0deg));transition:.15s}
.mini-tab.active{background:#231b16;color:#eee6d7;border-color:#231b16}

@media(max-width:700px){
  .closed-folder{width:88vw;height:560px}
  .folder-inner{padding:18px 14px 0 36px}
  .file-tabs{gap:4px}
  .file-tab{font-size:10px;padding:7px 10px}
}
</style>
