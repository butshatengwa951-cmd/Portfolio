<template>
  <div class="portfolio-root">
    <div class="desk-vignette"></div>
    <div class="film-noise" aria-hidden="true"></div>

    <transition name="folder-cover">
      <section v-if="!folderOpen" class="closed-stage">
        <div class="folder-scene">
          <div class="folder-shadow"></div>

          <div
            class="folder-cover"
            :class="{ 'is-opening': opening }"
          >
            <div class="cover-inner-border"></div>
            <div class="cover-top-strip"></div>

            <div class="cover-content">
              <div class="cover-meta">
                <span>PERSONAL PORTFOLIO — FILE NO. BT-002</span>
                <span class="cover-rule"></span>
              </div>

              <div class="cover-center">
                <h1>BUTSHA<br />TENGWA</h1>

                <div class="cover-photo-wrap">
                  <div class="cover-photo">
                    <img
                      v-if="profilePhoto"
                      :src="profilePhoto"
                      alt="Butsha Tengwa"
                    />
                    <div v-else class="cover-photo-placeholder">
                      <span>BT</span>
                      <small>FILE PHOTO — 2024</small>
                    </div>
                  </div>

                  <div class="cover-photo-caption">
                    ATTACHED PHOTOGRAPH — FILE PHOTO
                  </div>
                </div>

                <div class="cover-details">
                  <div
                    v-for="row in coverDetails"
                    :key="row[0]"
                    class="cover-detail-row"
                  >
                    <span>{{ row[0] }}</span>
                    <strong>{{ row[1] }}</strong>
                  </div>

                  <div class="cover-detail-row cover-status">
                    <span>STATUS</span>
                    <strong>
                      <i></i>
                      OPEN TO OPPORTUNITIES
                    </strong>
                  </div>
                </div>
              </div>

              <div class="cover-bottom">
                <div class="classified-stamp">CLASSIFIED — OPEN ON REQUEST</div>
                <div class="cover-est">CASE 001 — EST. 2023</div>
              </div>
            </div>

            <button
              type="button"
              class="open-file-tab"
              :disabled="opening"
              @click.stop.prevent="openFolder"
            >
              <span>OPEN FILE</span>
              <b>→</b>
            </button>

            <div v-if="opening" class="paper-fan" aria-hidden="true">
              <div class="fan fan-one"></div>
              <div class="fan fan-two"></div>
            </div>
          </div>
        </div>

        <div class="closed-hint">
          CLICK TAB TO OPEN <span>•</span> EVERYTHING LIVES INSIDE
        </div>
      </section>
    </transition>

    <section
      v-if="folderOpen"
      class="open-stage"
      :class="{ 'is-closing': closing }"
    >
      <div class="open-folder-shell">
        <header class="folder-header">
          <div class="folder-header-left">
            <div class="folder-file-title">
              BUTSHA TENGWA — FILE: {{ activeFileNumber }}
            </div>
            <div class="active-file-indicator">
              <span></span>
              ACTIVE FILE
            </div>
          </div>

          <div class="folder-header-right">
            <span>PERSONAL FILE — BT-002</span>
            <button type="button" @click="closeFolder">
              CLOSE FILE ×
            </button>
          </div>
        </header>

        <nav class="file-tabs" aria-label="Portfolio files">
          <button
            v-for="file in portfolio.files"
            :key="file.id"
            type="button"
            :class="{ active: activeFile === file.id }"
            @click="selectFile(file.id)"
          >
            <span>{{ file.label.slice(0, 2) }}</span>
            {{ file.label.slice(3) }}
          </button>
        </nav>

        <main class="paper-page">
          <div class="punched-holes" aria-hidden="true">
            <span v-for="n in 3" :key="n"></span>
          </div>

          <div class="paper-content">
            <Transition name="file-swap" mode="out-in">
              <ProfileFile
                v-if="activeFile === 'profile'"
                key="profile"
                :portfolio="portfolio"
                :profile-photo="profilePhoto"
                @go="selectFile"
              />
              <StockwellFile
                v-else-if="activeFile === 'stockwell'"
                key="stockwell"
                :project="portfolio.projects.stockwell"
              />
              <ModerntechHRFile
                v-else-if="activeFile === 'moderntechhr'"
                key="moderntechhr"
                :project="portfolio.projects.moderntechhr"
              />
              <LightningNewsFile
                v-else-if="activeFile === 'lightningnews'"
                key="lightningnews"
                :project="portfolio.projects.lightningnews"
              />
              <BudgetTrackerFile
                v-else-if="activeFile === 'budgettracker'"
                key="budgettracker"
                :project="portfolio.projects.budgettracker"
              />
              <SkillsFile
                v-else-if="activeFile === 'skills'"
                key="skills"
                :skills="portfolio.skills"
                :files="portfolio.files"
                :other-skills="portfolio.otherSkills"
                @go="selectFile"
              />
              <JourneyFile
                v-else-if="activeFile === 'journey'"
                key="journey"
                :journey="portfolio.journey"
              />
              <ContactFile
                v-else-if="activeFile === 'contact'"
                key="contact"
                :person="portfolio.person"
              />
              <NotesFile
                v-else
                key="notes"
              />
            </Transition>
          </div>
        </main>

        <footer class="folder-footer">
          <div class="file-stack">
            <span></span>
            <span></span>
            <strong>FILE STACK</strong>
          </div>

          <div class="footer-label">
            FILE {{ activeFileNumber }} OF {{ portfolio.files.length }}
            — {{ activeFileObject.label }}
          </div>

          <div class="footer-dots">
            <button
              v-for="file in portfolio.files"
              :key="file.id"
              type="button"
              :class="{ active: activeFile === file.id }"
              @click="selectFile(file.id)"
              :aria-label="'Open ' + file.title"
            ></button>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProfileFile from './components/ProfileFile.vue'
import StockwellFile from './components/StockwellFile.vue'
import ModerntechHRFile from './components/ModerntechHRFile.vue'
import LightningNewsFile from './components/LightningNewsFile.vue'
import BudgetTrackerFile from './components/BudgetTrackerFile.vue'
import SkillsFile from './components/SkillsFile.vue'
import JourneyFile from './components/JourneyFile.vue'
import ContactFile from './components/ContactFile.vue'
import NotesFile from './components/NotesFile.vue'
import { portfolio } from './data/portfolio.js'

const profilePhoto = 'https://i.ibb.co/zWLg2Br8/ME.jpg'

const coverDetails = [
  ['ROLE', 'DEVELOPER / CREATIVE'],
  ['LOCATION', 'SOUTH AFRICA'],
  ['SPECIALIZATION', 'WEB DEVELOPMENT']
]

const folderOpen = ref(false)
const opening = ref(false)
const closing = ref(false)
const activeFile = ref('profile')

const activeIndex = computed(() =>
  portfolio.files.findIndex((file) => file.id === activeFile.value)
)

const activeFileObject = computed(() =>
  portfolio.files[activeIndex.value] || portfolio.files[0]
)

const activeFileNumber = computed(() =>
  String(activeIndex.value + 1).padStart(2, '0')
)

function openFolder() {
  if (opening.value || folderOpen.value) return

  opening.value = true

  window.setTimeout(() => {
    folderOpen.value = true
    opening.value = false
  }, 900)
}

function closeFolder() {
  if (closing.value || !folderOpen.value) return

  closing.value = true

  window.setTimeout(() => {
    closing.value = false
    folderOpen.value = false
  }, 600)
}

function selectFile(id) {
  if (!portfolio.files.some((file) => file.id === id)) return
  activeFile.value = id
}
</script>

<style>
:root {
  --walnut: #2b211b;
  --leather: #231b16;
  --ink: #11100e;
  --paper: #eee6d7;
  --paper-light: #f5efe0;
  --paper-inner: #fffdf7;
  --paper-dark: #e8ddd0;
  --tan: #d6a66f;
  --red: #a32626;
}
*,*::before,*::after{box-sizing:border-box}
html,body,#app{width:100%;min-height:100%;margin:0}
body{background:var(--walnut);color:var(--ink);font-family:'JetBrains Mono',monospace;overflow-x:hidden}
button{font:inherit}
.portfolio-root{position:relative;min-height:100vh;overflow:hidden;background:var(--walnut)}
.desk-vignette{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 90% at 50% 20%,rgba(214,166,111,.08) 0%,transparent 50%),radial-gradient(80% 60% at 20% 80%,rgba(0,0,0,.4) 0%,transparent 70%),repeating-linear-gradient(90deg,rgba(255,255,255,.015) 0 1px,transparent 1px 3px),radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,.55) 100%)}
.film-noise{position:fixed;inset:0;z-index:100;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");mix-blend-mode:overlay}
.closed-stage{position:relative;z-index:10;min-height:100vh;display:grid;place-items:center;padding:16px;perspective:1200px}
.folder-scene{position:relative}.folder-shadow{position:absolute;left:6%;right:6%;bottom:-42px;height:68px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.8) 0%,transparent 70%);filter:blur(18px);opacity:.7}
.folder-cover{position:relative;width:min(520px,86vw);height:min(700px,88vh);min-height:620px;overflow:visible;border:1px solid #1a1410;border-width:1px 1px 2px;border-radius:6px;background-color:var(--leather);box-shadow:0 30px 80px rgba(0,0,0,.7),0 5px 15px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08);background-image:linear-gradient(180deg,rgba(255,255,255,.04),transparent 20%),radial-gradient(600px 400px at 30% 20%,rgba(214,166,111,.08),transparent 60%);transition:transform .2s ease}
.cover-inner-border{position:absolute;inset:8px;z-index:0;pointer-events:none;border:1px solid var(--paper);border-radius:3px;opacity:.15}
.cover-top-strip{position:absolute;top:0;left:32px;right:32px;height:14px;z-index:1;border-radius:0 0 2px 2px;background:var(--paper-dark);opacity:.9;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.cover-content{position:relative;z-index:5;height:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:40px 32px;text-align:center}
.cover-meta{width:100%;color:var(--tan);font-size:10px;font-weight:500;letter-spacing:.22em}.cover-rule{display:block;width:100%;height:1px;margin-top:12px;background:linear-gradient(90deg,transparent,var(--tan) 20%,var(--tan) 80%,transparent)}
.cover-center{display:flex;flex-direction:column;align-items:center;gap:20px;margin-top:8px}.cover-center h1{margin:0;color:var(--paper);font-family:'Special Elite',serif;font-size:42px;line-height:.9;letter-spacing:-.02em}
.cover-photo-wrap{position:relative}.cover-photo{position:relative;width:160px;height:200px;overflow:hidden;border:3px solid #fff;background:#e8ddd0;box-shadow:0 4px 18px rgba(0,0,0,.4),0 1px 3px rgba(0,0,0,.3);transform:rotate(-1.2deg)}
.cover-photo img{width:100%;height:100%;object-fit:cover}.cover-photo-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--ink);background:linear-gradient(180deg,#ddd 0%,#c8b8a0 100%);filter:grayscale(1) contrast(1.1)}
.cover-photo-placeholder span{width:86px;height:86px;display:grid;place-items:center;border:1px solid rgba(0,0,0,.1);border-radius:50%;background:var(--paper-inner);font-family:'Special Elite',serif;font-size:36px;font-weight:700}.cover-photo-placeholder small{margin-top:12px;color:rgba(0,0,0,.6);font-size:9px;letter-spacing:.2em}
.cover-photo-caption{position:absolute;right:-8px;bottom:-8px;padding:2px 8px;color:rgba(0,0,0,.7);background:#fff;font-size:8px;letter-spacing:.12em;transform:rotate(1deg);white-space:nowrap}
.cover-details{width:260px;margin-top:4px;text-align:left}.cover-detail-row{display:flex;gap:16px;align-items:center;margin-bottom:12px;color:var(--paper);font-size:11px;line-height:1.2}.cover-detail-row>span{flex:0 0 110px;color:var(--tan);letter-spacing:.12em}.cover-detail-row strong{color:var(--paper);font-weight:700;letter-spacing:.04em}.cover-status strong{display:flex;align-items:center;gap:8px}.cover-status i{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);box-shadow:0 0 8px rgba(163,38,38,.55);animation:pulse-dot 1.7s ease-in-out infinite}
.cover-bottom{width:100%;display:flex;flex-direction:column;align-items:center;gap:16px}.classified-stamp{padding:4px 16px;color:var(--red);border:2px solid var(--red);font-family:'Special Elite',serif;font-size:11px;font-weight:700;letter-spacing:.18em;transform:rotate(-2deg)}.cover-est{color:rgba(214,166,111,.6);font-size:9px;letter-spacing:.2em}
.open-file-tab{position:absolute;z-index:30;top:38%;right:0;display:flex;align-items:center;gap:8px;min-height:48px;padding:12px 24px 12px 20px;border:1px solid var(--tan);border-left:0;border-radius:0 4px 4px 0;color:var(--ink);background:var(--paper-light);box-shadow:4px 4px 12px rgba(0,0,0,.3),0 1px 3px rgba(0,0,0,.2);font-family:'Special Elite',serif;font-size:13px;letter-spacing:.18em;cursor:pointer;transform:translateX(calc(100% - 14px));transition:transform .2s ease,box-shadow .2s ease}
.open-file-tab:hover:not(:disabled){transform:translateX(calc(100% - 8px)) translateY(-2px);box-shadow:6px 8px 18px rgba(0,0,0,.4)}.open-file-tab:disabled{cursor:wait;opacity:.75}.open-file-tab b{color:var(--red);font-size:14px;transition:transform .2s ease}.open-file-tab:hover b{transform:translateX(4px)}
.paper-fan{position:absolute;inset:0;z-index:-1;pointer-events:none}.fan{position:absolute;inset:0;border-radius:6px}.fan-one{background:var(--paper-light);transform:rotate(-2deg) translateY(12px);animation:fan-one .6s ease forwards}.fan-two{background:var(--paper);transform:rotate(1.5deg) translateY(8px);animation:fan-two .7s ease forwards}
.closed-hint{position:absolute;bottom:30px;left:50%;z-index:10;transform:translateX(-50%);color:rgba(214,166,111,.5);font-size:10px;letter-spacing:.18em;white-space:nowrap}.closed-hint span{margin:0 6px}
.open-stage{position:relative;z-index:10;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:40px 16px}
.open-folder-shell{width:min(1100px,96vw);min-height:82vh;position:relative;border:14px solid var(--leather);border-radius:4px;background:var(--paper-light);box-shadow:0 30px 80px rgba(0,0,0,.7),0 5px 15px rgba(0,0,0,.5),inset 0 0 0 1px rgba(0,0,0,.1);background-image:radial-gradient(900px 500px at 20% 0%,rgba(214,166,111,.08),transparent 60%),linear-gradient(180deg,rgba(255,255,255,.6),transparent 12%);animation:folder-open-in .7s cubic-bezier(.16,1,.3,1)}
.open-stage.is-closing .open-folder-shell{animation:folder-close-out .6s cubic-bezier(.76,0,.24,1) forwards}
.folder-header{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;min-height:62px;padding:16px 36px;border-bottom:1px solid var(--tan);background:linear-gradient(180deg,var(--paper) 0%,var(--paper-light) 100%)}.folder-header-left,.folder-header-right{display:flex;align-items:center;gap:16px}.folder-file-title{font-family:'Special Elite',serif;font-size:11px;letter-spacing:.2em}.active-file-indicator{display:flex;align-items:center;gap:8px;color:rgba(17,16,14,.6);font-size:9px;letter-spacing:.15em}.active-file-indicator span{width:8px;height:8px;border-radius:50%;background:var(--red)}.folder-header-right>span{color:rgba(17,16,14,.5);font-size:9px;letter-spacing:.2em}.folder-header-right button{padding:6px 12px;border:1px solid var(--tan);background:#fff;color:var(--ink);font-family:'Special Elite',serif;font-size:10px;letter-spacing:.16em;cursor:pointer;transition:background .15s ease}.folder-header-right button:hover{background:#fffdf7}
.file-tabs{display:flex;flex-wrap:wrap;gap:2px;align-items:flex-end;padding:16px 24px 0;overflow-x:auto}.file-tabs button{position:relative;padding:8px 14px;border:1px solid var(--tan);border-bottom:1px solid var(--tan);color:#5a4a3a;background:var(--paper-dark);font-family:'Special Elite',serif;font-size:10px;letter-spacing:.12em;white-space:nowrap;cursor:pointer;transform:translateY(4px);transition:.15s ease}.file-tabs button span{margin-right:4px;opacity:.6}.file-tabs button:hover{opacity:1;transform:translateY(1px)}.file-tabs button.active{z-index:2;color:var(--ink);background:var(--paper-inner);border-bottom-color:var(--paper-inner);box-shadow:0 -2px 10px rgba(0,0,0,.08),0 2px 0 #fffdf7;transform:translateY(1px)}.file-tabs button.active::after{content:'';position:absolute;left:8px;right:8px;bottom:-1px;height:2px;background:var(--red)}
.paper-page{position:relative;margin:0 24px 24px;min-height:560px;border:1px solid var(--tan);background:var(--paper-inner);box-shadow:inset 0 2px 12px rgba(0,0,0,.06),0 2px 10px rgba(0,0,0,.08)}.punched-holes{position:absolute;left:12px;top:0;bottom:0;width:24px;display:flex;flex-direction:column;justify-content:space-around;padding:64px 0;opacity:.3;pointer-events:none}.punched-holes span{width:12px;height:12px;border:1px solid #c8b8a0;border-radius:50%;background:#e8ddd0;box-shadow:inset 0 1px 2px rgba(0,0,0,.15)}.paper-content{position:relative;padding:28px 32px 36px 56px}
.folder-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 36px 24px}.file-stack{position:relative;flex:0 0 110px;height:38px}.file-stack span,.file-stack strong{position:absolute;left:0;width:100px;height:28px;border:1px solid #c8b8a0;border-radius:2px}.file-stack span:nth-child(1){top:8px;background:#e8ddd0;transform:rotate(-2deg)}.file-stack span:nth-child(2){top:4px;left:4px;background:#f0e6d3;transform:rotate(1deg)}.file-stack strong{top:0;left:8px;display:grid;place-items:center;color:var(--ink);background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.12);font-size:8px;letter-spacing:.12em;font-weight:500}.footer-label{flex:1;color:rgba(17,16,14,.6);font-size:10px;letter-spacing:.18em}.footer-dots{display:flex;align-items:center;gap:8px}.footer-dots button{width:24px;height:4px;border:0;border-radius:99px;background:var(--tan);opacity:.35;cursor:pointer;transition:.2s ease}.footer-dots button.active{background:var(--red);opacity:1;transform:scaleX(1.8)}
.file-swap-enter-active,.file-swap-leave-active{transition:opacity .18s ease,transform .18s ease}.file-swap-enter-from,.file-swap-leave-to{opacity:0;transform:translateX(10px)}
@keyframes pulse-dot{0%,100%{box-shadow:0 0 0 rgba(163,38,38,0)}50%{box-shadow:0 0 10px rgba(163,38,38,.65)}}@keyframes fan-one{from{transform:rotate(-2deg) translateY(4px);opacity:.4}to{transform:rotate(-3deg) translateY(18px) translateX(-10px);opacity:1}}@keyframes fan-two{from{transform:rotate(1deg) translateY(4px);opacity:.3}to{transform:rotate(2deg) translateY(12px) translateX(8px);opacity:1}}@keyframes folder-open-in{from{opacity:0;transform:translateY(40px) scale(.96) rotateX(8deg)}to{opacity:1;transform:translateY(0) scale(1) rotateX(0)}}@keyframes folder-close-out{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(30px) scale(.98)}}.folder-cover.is-opening{animation:cover-open-out .9s cubic-bezier(.76,0,.24,1) forwards}@keyframes cover-open-out{0%{transform:translateY(0) rotateX(0) scale(1)}40%{transform:translateY(-30%) rotateX(25deg) scale(.98)}100%{transform:translateY(-110%) rotateX(35deg) scale(.9);opacity:0}}
.folder-cover-enter-active,.folder-cover-leave-active{transition:opacity .18s ease}.folder-cover-enter-from,.folder-cover-leave-to{opacity:0}
@media (max-width:700px){.closed-stage{padding:12px}.folder-cover{width:min(92vw,520px);min-height:590px;height:84vh}.cover-content{padding:30px 22px}.cover-center h1{font-size:34px}.open-file-tab{right:-2px;transform:translateX(66%);padding-right:18px}.open-file-tab:hover:not(:disabled){transform:translateX(62%) translateY(-2px)}.closed-hint{display:none}.open-stage{padding:12px 8px}.open-folder-shell{width:98vw;border-width:9px}.folder-header{padding:13px 14px}.folder-header-right>span{display:none}.file-tabs{padding:12px 10px 0}.paper-page{margin:0 10px 14px}.paper-content{padding:24px 14px 28px 38px}.folder-footer{padding:0 14px 14px}.footer-label{font-size:8px}.footer-dots{display:none}.cover-photo-caption{right:-4px;font-size:7px}}
</style>