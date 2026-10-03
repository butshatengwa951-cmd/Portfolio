<template>
  <div
    class="min-h-screen w-full relative overflow-x-hidden select-none"
    :style="{ backgroundColor: colors.walnut, fontFamily: '\'JetBrains Mono\', monospace' }"
  >
    <!-- walnut + vignette -->
    <div
      class="pointer-events-none fixed inset-0 z-0"
      :style="{
        background:
          'radial-gradient(120% 90% at 50% 20%, rgba(214,166,111,0.08) 0%, transparent 50%),' +
          'radial-gradient(80% 60% at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 70%),' +
          'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)'
      }"
    ></div>
    <div
      class="pointer-events-none fixed inset-0 z-[100]"
      style="opacity:0.04; background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')"
    ></div>

    <!-- CLOSED -->
    <div
      v-if="!folderOpen"
      class="relative z-10 min-h-screen flex items-center justify-center p-4"
      style="perspective:1200px"
    >
      <div class="relative" :class="opening ? 'animate-open-folder' : closing ? 'animate-close-folder' : ''">
        <div
          class="relative w-[86vw] sm:w-[92vw] max-w-[520px] h-[680px] sm:h-[700px] rounded-[6px] overflow-hidden flex flex-col"
          :style="{
            backgroundColor: colors.leather,
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 5px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 20%), radial-gradient(600px 400px at 30% 20%, rgba(214,166,111,0.08) 0%, transparent 60%)',
          }"
        >
          <!-- top meta -->
          <div class="px-8 pt-8">
            <div class="text-[10px] tracking-[0.22em]" :style="{ color: colors.tan }">PERSONAL PORTFOLIO — FILE NO. BT-001</div>
            <div class="mt-3 h-[1px] w-full" :style="{ background: `linear-gradient(90deg, transparent, ${colors.tan} 80%, transparent)` }"></div>
          </div>

          <!-- center -->
          <div class="flex-1 flex flex-col items-center justify-between px-8 py-10 text-center relative z-10">
            <h1 class="text-[38px] sm:text-[42px] leading-[0.9] tracking-[-0.02em]" :style="{ fontFamily: '\'Special Elite\', serif', color: colors.paper }">
              BUTSHA<br />TENGWA
            </h1>

            <div class="relative">
              <div class="w-[160px] h-[200px] flex items-center justify-center text-[36px] font-bold tracking-widest bg-[#e8ddd0]" style="border:3px solid white; transform:rotate(-1.2deg); box-shadow:0 4px 12px rgba(0,0,0,0.3)">BT</div>
              <div class="absolute -top-2 -right-3 w-4 h-6 bg-[#c0c0c0] rotate-[-12deg] rounded-full opacity-80"></div>
              <div class="mt-2 text-[9px] tracking-widest opacity-60" :style="{ color: colors.paper }">ATTACHED PHOTOGRAPH — FILE PHOTO</div>
            </div>

            <div class="w-[260px] text-left space-y-3 mt-2">
              <div v-for="row in coverDetails" :key="row[0]" class="flex gap-4 text-[11px]">
                <div class="w-[110px] shrink-0 tracking-widest opacity-70" :style="{ color: colors.tan }">{{ row[0] }}</div>
                <div class="font-bold tracking-wide" :style="{ color: colors.paper }">{{ row[1] }}</div>
              </div>
            </div>

            <div class="w-full flex flex-col items-center gap-4">
              <div class="border-[2px] border-[#a32626] text-[#a32626] px-4 py-1 text-[11px] tracking-[0.18em] font-bold" :style="{ borderColor: colors.red, color: colors.red, fontFamily: '\'Special Elite\'', transform:'rotate(-2deg)' }">
              CLASSIFIED — OPEN ON REQUEST
            </div>
          </div>

          <!-- FIXED TAB: no window.innerWidth in template, CSS handles it -->
          <button @click="openFolder" class="open-file-tab group absolute top-[38%] right-0 flex items-center gap-2 pl-5 pr-6 py-3 text-[13px] tracking-widest bg-[#f5efe0] border shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all" :style="{ borderColor: colors.tan, color: colors.ink }">
            OPEN FILE <span class="text-[#a32626] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <!-- back papers fan -->
        <div v-if="opening" class="absolute inset-0 -z-10">
          <div class="absolute inset-0 bg-[#f5efe0] animate-fan-1" style="transform:rotate(-2deg)"></div>
          <div class="absolute inset-0 bg-[#e8ddd0] animate-fan-2" style="transform:rotate(1.5deg)"></div>
        </div>
      </div>
    </div>

    <!-- OPEN - 14px border never goes away -->
    <div v-else class="relative z-10 min-h-screen flex items-start justify-center p-3 sm:p-6 md:p-10">
      <div
        class="w-[96vw] max-w-[1100px] min-h-[82vh] relative"
        :class="closing? 'animate-folder-close' : 'animate-folder-open'"
        :style="{
          backgroundColor: colors.paperLight,
          border: '14px solid ' + colors.leather,
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 5px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 20%), radial-gradient(600px 400px at 30% 20%, rgba(214,166,111,0.08) 0%, transparent 60%)',
          borderRadius: '4px'
        }"
      >
        <!-- topbar -->
        <div class="flex flex-wrap items-center justify-between gap-2 px-6 sm:px-9 py-4 border-b" :style="{ borderColor: colors.tan, background: 'linear-gradient(180deg, ' + colors.paper + ' 0%, ' + colors.paperLight + ' 100%)' }">
          <div style="font-family:'Special Elite'">BUTSHA TENGWA — FILE: {{ activeFileIndexDisplay }} — {{ activeFileObj?.label }}</div>
          <div class="flex items-center gap-3">
            <span class="opacity-60">PERSONAL FILE — BT-001</span>
            <span class="w-2 h-2 rounded-full bg-[#a32626] inline-block"></span>
            <button @click="closeFolder" class="ml-3 px-3 py-1 border bg-white hover:bg-black hover:text-white transition">CLOSE ×</button>
          </div>
        </div>

        <!-- file tabs -->
        <div class="px-3 sm:px-6 pt-4 pb-0 flex flex-wrap gap-[2px] items-end overflow-x-auto">
          <button
            v-for="file in files"
            :key="file.id"
            @click="selectFile(file.id)"
            class="relative px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.12em] border-t border-l border-r transition-all"
            :style="{
              background: activeFile===file.id? colors.paperInner : colors.paperDark,
              borderColor: activeFile===file.id? colors.red : 'transparent',
              color: activeFile===file.id? colors.ink : '#6b5d52'
            }"
          >
            <span class="opacity-60 mr-1">{{ file.num }}</span> {{ file.label }}
            <span v-if="activeFile === file.id" class="absolute left-2 right-2 bottom-0 h-[2px] bg-[#a32626]"></span>
          </button>
        </div>

        <!-- inner paper with punch holes -->
        <div class="relative m-3 sm:m-6 p-6 sm:p-10 bg-[#fffdf7] border min-h-[560px]" :style="{ borderColor: colors.tan, boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.05)' }">
          <div class="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center opacity-20">
            <div v-for="i in 4" :key="i" class="w-3 h-3 rounded-full border bg-white" :style="{ borderColor: colors.tan }"></div>
          </div>

          <div :key="activeFile" class="animate-file-in ml-6">
            <!-- PROFILE -->
            <section v-if="activeFile==='01_PROFILE'">
              <div class="flex gap-8">
                <div class="flex-1">
                  <h2 class="text-[30px] leading-tight" style="font-family:'Special Elite'">I build products<br/>people pay for.</h2>
                  <p class="mt-4 text-[13px] leading-relaxed opacity-80 max-w-[380px]">Vue ecosystem, payment integrations, product-driven development. Based in SA, shipping real e-commerce flows.</p>
                  <div class="mt-8 grid grid-cols-2 gap-4 text-[11px]">
                    <div><div class="opacity-40 tracking-widest">ROLE</div><div class="font-bold mt-1">{{ portfolio.person.role }}</div></div>
                    <div><div class="opacity-40 tracking-widest">LOCATION</div><div class="font-bold mt-1">{{ portfolio.person.location }}</div></div>
                    <div><div class="opacity-40 tracking-widest">SPECIALIZATION</div><div class="font-bold mt-1">{{ portfolio.person.specialization }}</div></div>
                    <div><div class="opacity-40 tracking-widest">STATUS</div><div class="font-bold mt-1 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#a32626]"></span>{{ portfolio.person.status }}</div></div>
                  </div>
                  <button @click="selectFile('02_STOCKWELL')" class="mt-8 px-5 py-2 bg-black text-white text-[11px] tracking-widest">OPEN FILE 02 → STOCKWELL</button>
                </div>
                <div class="w-[260px] hidden sm:block">
                  <div v-for="item in profileTimeline" :key="item.year" class="border-l pl-4 py-3 ml-2" :style="{ borderColor: colors.tan }">
                    <div class="text-[9px] opacity-40">{{ item.year }}</div>
                    <div class="text-[11px] font-bold mt-1">{{ item.title }}</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- STOCKWELL -->
            <section v-else-if="activeFile==='02_STOCKWELL'">
              <div class="flex justify-between"><h2 style="font-family:'Special Elite'" class="text-[20px]">STOCKWELL — FILE 02 — E-COMMERCE PLATFORM</h2><span class="text-[10px] border px-2 py-1 bg-[#f5efe0]">Vue • JS • Node • PayFast</span></div>
              <div class="mt-6 border-2 rounded-[4px] overflow-hidden" :style="{ borderColor: colors.ink }">
                <div class="h-9 bg-black text-white flex items-center px-4 text-[11px] tracking-widest">
                  <div class="flex gap-1 mr-4"><span class="w-2 h-2 rounded-full bg-[#ff5f56]"></span><span class="w-2 h-2 rounded-full bg-[#ffbd2e]"></span><span class="w-2 h-2 rounded-full bg-[#27c93f]"></span></div>
                  <div class="opacity-60">stockwell.market — Live preview — inside file</div>
                  <div class="ml-auto flex items-center gap-3">
                    <span>Wallet: R 1,240.00</span>
                    <span class="bg-white text-black px-2 py-0.5 rounded-full font-bold text-[11px] transition-transform" :class="{ 'cart-pop': cartAnim }">🛒 {{ cartCount }}</span>
                  </div>
                </div>
                <div class="p-4 grid grid-cols-3 gap-3 bg-[#fffdf7]">
                  <div v-for="p in stockProducts" :key="p.id" class="border p-3 bg-white hover:shadow-md transition">
                    <div class="text-[20px]">{{ p.img }}</div>
                    <div class="text-[11px] font-bold mt-2">{{ p.name }}</div>
                    <div class="text-[13px] opacity-60">R {{ p.price }} • {{ p.tag }}</div>
                    <button @click="addToCart" class="mt-3 w-full py-1 bg-black text-white text-[10px] tracking-widest hover:bg-[#a32626] transition">ADD TO CART +</button>
                  </div>
                </div>
                <div class="h-10 bg-[#111] text-white flex items-center justify-center gap-6 text-[10px]">
                  <span>Customer ↓</span><span>Checkout ↓</span><span>PayFast ↓</span><span>Wallet ✓</span>
                </div>
              </div>
              <div class="mt-4 flex gap-2"><button v-for="t in stockTabs" :key="t" @click="stockTab=t" class="px-3 py-1 text-[10px] border" :style="{ background: stockTab===t? colors.ink : 'white', color: stockTab===t? 'white' : colors.ink }">[ {{ t }} ]</button></div>
              <pre v-if="stockTab==='CHALLENGE'" class="mt-3 p-4 bg-[#0a0a0b] text-[#e8ddd0] text-[10px] leading-relaxed whitespace-pre-wrap border-l-4 border-[#a32626]">CAUSE: PayFast ITN handler expected x-www-form-urlencoded but received JSON. Logs 200 OK but wallet never updated. Signature mismatch due to param ordering.

INVESTIGATION: Replay webhooks, log raw body, compare sorted params.

RESOLUTION: Parse raw body, verify signature with sorted params, transaction lock + idempotency key.

LESSON: Never trust happy path.</pre>
            </section>

            <!-- other files placeholder -->
            <section v-else>
              <h2 style="font-family:'Special Elite'" class="text-[20px]">{{ activeFile }} — FILE {{ activeFileIndexDisplay }}</h2>
              <p class="mt-4 text-[13px] opacity-70">Everything belongs inside the file. Content for {{ activeFile }} lives here — add your real copy in src/data/portfolio.js</p>
              <div class="mt-6 text-[10px] tracking-widest opacity-40">FILE {{ activeFileIndexDisplay }} OF 07 — SORTING THROUGH FILES</div>
            </section>
          </div>
        </div>

        <div class="px-6 pb-6 flex justify-between items-center">
          <div class="flex gap-1">
            <div class="w-10 h-1 bg-[#231b16] rounded-full opacity-20"></div>
            <div class="w-10 h-1 bg-[#231b16] rounded-full opacity-10 rotate-[-1deg]"></div>
          </div>
          <div class="text-[9px] opacity-40">FILE {{ activeFileIndexDisplay }} OF 07 — {{ activeFileObj?.label }} — SORTING THROUGH FILES</div>
          <div class="flex gap-1"><button v-for="f in files" :key="f.id" @click="selectFile(f.id)" class="w-6 h-1 rounded-full transition-all" :style="{ background: activeFile===f.id? colors.red : colors.tan, width: activeFile===f.id? '20px' : '12px' }"></button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const colors = { walnut: '#2b211b', leather: '#231b16', ink: '#11100e', paper: '#eee6d7', paperLight: '#f5efe0', paperInner: '#fffdf7', paperDark: '#e8ddd0', tan: '#d6a66f', red: '#a32626' }

const folderOpen = ref(false)
const opening = ref(false)
const closing = ref(false)
const activeFile = ref('01_PROFILE')
const cartCount = ref(2)
const cartAnim = ref(false)
const stockTab = ref('PROBLEM')
const isMobile = ref(false)

const files = [
  { id: '01_PROFILE', label: 'PROFILE', num: '01' },
  { id: '02_STOCKWELL', label: 'STOCKWELL', num: '02' },
  { id: '03_VOYA_BITE', label: 'VOYA_BITE', num: '03' },
  { id: '04_SKILLS', label: 'SKILLS', num: '04' },
  { id: '05_JOURNEY', label: 'JOURNEY', num: '05' },
  { id: '06_CONTACT', label: 'CONTACT', num: '06' },
  { id: '07_NOTES', label: 'NOTES', num: '07' },
]
const coverDetails = [['ROLE','DEVELOPER / CREATIVE'],['LOCATION','SOUTH AFRICA'],['SPECIALIZATION','WEB DEVELOPMENT']]
const stockProducts = [{ id:1, name:'Community Pack', price:249, img:'📦', tag:'BESTSELLER' }, { id:2, name:'Proposal Boost', price:89, img:'🚀', tag:'NEW' }, { id:3, name:'Voting +10', price:45, img:'🗳️', tag:'POWER' }]
const stockTabs = ['PROBLEM','BUILD','CHALLENGE','LIVE']
const profileTimeline = [{ year:'2023', title:'Started Vue' }, { year:'2024', title:'PayFast hell' }, { year:'2024', title:'StockWell shipped' }]

const portfolio = { person: { role:'DEVELOPER / CREATIVE', location:'SOUTH AFRICA', specialization:'WEB DEVELOPMENT', status:'OPEN TO OPPORTUNITIES' } }

const activeIndex = computed(() => files.findIndex(f => f.id === activeFile.value))
const activeFileIndexDisplay = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
const activeFileObj = computed(() => files[activeIndex.value])

function checkMobile(){ isMobile.value = window.innerWidth < 640 }

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onBeforeUnmount(() => window.removeEventListener('resize', checkMobile))

function openFolder(){
  if (opening.value) return
  opening.value = true
  setTimeout(() => { folderOpen.value = true; opening.value = false }, 900)
}
function closeFolder(){
  closing.value = true
  setTimeout(() => { folderOpen.value = false; closing.value = false }, 700)
}
function selectFile(id){ activeFile.value = id }
function addToCart(){
  cartCount.value++
  cartAnim.value = false
  requestAnimationFrame(() => {
    cartAnim.value = true
    setTimeout(() => cartAnim.value = false, 300)
  })
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=JetBrains+Mono:wght@400;700&display=swap');

/* FIXED: responsive tab uses CSS, not window.innerWidth in template */
.open-file-tab{ transform: translateX(68%); transition: transform 200ms ease, box-shadow 200ms ease; }
@media(min-width:640px){.open-file-tab{ transform: translateX(calc(100% - 14px)); } }
.open-file-tab:hover{ transform: translateX(62%) translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.35); }
@media(min-width:640px){.open-file-tab:hover{ transform: translateX(calc(100% - 8px)) translateY(-2px); } }

.animate-open-folder{ animation: openFolderAnim 0.9s cubic-bezier(0.76,0,0.24,1) forwards; }
.animate-folder-open{ animation: folderOpenIn 0.8s cubic-bezier(0.16,1,0.3,1); }
.animate-folder-close{ animation: folderCloseOut 0.6s cubic-bezier(0.76,0,0.24,1) forwards; }
.animate-file-in{ animation: fileIn 0.4s ease; }
.animate-fan-1{ animation: fan1 0.9s ease forwards; }
.animate-fan-2{ animation: fan2 0.9s 0.05s ease forwards; }
.cart-pop{ animation: cartPop 0.3s ease; }

@keyframes openFolderAnim{ 0%{ transform: translateY(0) rotateX(0deg); } 40%{ transform: translateY(-30%) rotateX(25deg) scale(0.98); } 100%{ transform: translateY(-110%) rotateX(35deg) scale(0.9); opacity:0; } }
@keyframes folderOpenIn{ from{ opacity:0; transform: translateY(30px) scale(0.96); } to{ opacity:1; transform: translateY(0) scale(1); } }
@keyframes folderCloseOut{ from{ opacity:1; transform: scale(1); } to{ opacity:0; transform: scale(0.96); } }
@keyframes fileIn{ from{ opacity:0; transform: translateX(12px); } to{ opacity:1; transform: translateX(0); } }
@keyframes fan1{ from{ transform: rotate(0deg) translateY(0); } to{ transform: rotate(-2deg) translateY(-8px); } }
@keyframes fan2{ from{ transform: rotate(0deg) translateY(0); } to{ transform: rotate(1.5deg) translateY(-4px); } }
@keyframes cartPop{ 0%{ transform: scale(1); } 50%{ transform: scale(1.3); } 100%{ transform: scale(1); } }
</style>