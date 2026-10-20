<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LivePreview from './components/LivePreview.vue'
import SkillsConstellation from './components/SkillsConstellation.vue'
import { ArrowDownRight, ArrowUpRight, ArrowRight, Github, Menu, X, MoveUpRight, Sparkles } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const activeSection = ref('home')
const reducedMotion = ref(false)
const skillsMapProject = ref<'stockwell' | 'moderntechhr' | 'lightningnews' | 'budgettracker' | null>(null)
const skillsMapFocusVersion = ref(0)
const year = new Date().getFullYear()

const projects = [
  {
    number: '01',
    name: 'StockWell',
    kind: 'COMMUNITY COMMERCE PLATFORM',
    description: 'A multi-role commerce experience bringing supplier comparison, shared proposals, group voting, shopping and payment workflows together.',
    stack: ['Vue', 'Node.js / Express', 'MySQL', 'PayFast'],
    detail: 'Engineering focus',
    outcome: 'Role-based workflows · Checkout and payment integration · Group decisions',
    link: 'https://stockwell-hl1e.onrender.com/',
    preview: 'https://stockwell-hl1e.onrender.com/',
    repo: '',
    visual: 'stockwell',
  },
  {
    number: '02',
    name: 'Budget Tracker',
    kind: 'PERSONAL FINANCE & PRODUCTIVITY',
    description: 'A Python toolkit and Vue-oriented application project exploring budgeting workflows, transactions, tasks and study planning with persistent data.',
    stack: ['Python', 'Vue 3', 'Flask', 'PostgreSQL'],
    detail: 'Engineering focus',
    outcome: 'API-driven workflows · Data persistence · Finance and productivity tools',
    link: 'https://budget-tracker-frontend-jf66.onrender.com/',
    preview: 'https://budget-tracker-frontend-jf66.onrender.com/',
    repo: 'https://github.com/butshatengwa951-cmd/Budget-Tracker-python-mini-toolkit/tree/main',
    visual: 'budget',
  },
  {
    number: '03',
    name: 'Lightning News',
    kind: 'NEWS AGGREGATION & DATA EXTRACTION',
    description: 'A data-focused project exploring the path from source content through extraction and parsing to structured information and useful endpoints.',
    stack: ['Python', 'Flask', 'BeautifulSoup', 'Three.js'],
    detail: 'Engineering focus',
    outcome: 'Content extraction · Data processing · Search and statistics APIs',
    link: 'https://lightning-news.netlify.app/',
    preview: 'https://lightning-news.netlify.app/',
    repo: '',
    visual: 'news',
  },
  {
    number: '04',
    name: 'ModernTechHR',
    kind: 'HUMAN RESOURCES MANAGEMENT',
    description: 'A data-driven HR application concept focused on employee workflows, records and reporting. The final case study will be expanded with verified implementation details.',
    stack: ['JavaScript', 'MySQL', 'Chart.js'],
    detail: 'Engineering focus',
    outcome: 'Structured records · Management workflows · Reporting',
    link: 'https://module1-project-hr.onrender.com/',
    preview: 'https://module1-project-hr.onrender.com/',
    repo: '',
    visual: 'hr',
  },
]

let observer: IntersectionObserver | undefined
onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeSection.value = entry.target.id
    })
  }, { rootMargin: '-25% 0px -60% 0px' })
  document.querySelectorAll('main section[id]').forEach((section) => observer?.observe(section))
})
onUnmounted(() => observer?.disconnect())

function closeMenu() {
  mobileMenuOpen.value = false
}

function traceSkills(projectVisual: string) {
  const idByVisual: Record<string, 'stockwell' | 'moderntechhr' | 'lightningnews' | 'budgettracker'> = { stockwell: 'stockwell', hr: 'moderntechhr', news: 'lightningnews', budget: 'budgettracker' }
  skillsMapProject.value = idByVisual[projectVisual] ?? null
  skillsMapFocusVersion.value += 1
  document.getElementById('skills')?.scrollIntoView({ behavior: reducedMotion.value ? 'auto' : 'smooth' })
}
</script>

<template>
  <div class="site-shell" :class="{ 'reduce-motion': reducedMotion }">
    <div class="grain" aria-hidden="true"></div>
    <div class="fibre-texture" aria-hidden="true"></div>
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>
    <div class="topographic" aria-hidden="true"></div>
    <div class="flow-field" aria-hidden="true">
      <svg class="flow-svg" viewBox="0 0 1440 1200" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="current" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#6d55bd" stop-opacity="0"/>
            <stop offset=".42" stop-color="#a48cff" stop-opacity=".4"/>
            <stop offset=".64" stop-color="#d4c5ff" stop-opacity=".9"/>
            <stop offset="1" stop-color="#7255c5" stop-opacity="0"/>
          </linearGradient>
          <filter id="blurGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9"/>
          </filter>
        </defs>
        <path class="flow-glow" d="M-80 310 C250 130 410 520 690 380 S1080 180 1510 330" />
        <path class="flow-line flow-line-a" d="M-80 310 C250 130 410 520 690 380 S1080 180 1510 330" />
        <path class="flow-line flow-line-b" d="M-100 350 C190 180 420 560 710 420 S1100 230 1510 370" />
        <path class="flow-line flow-line-c" d="M-90 275 C210 100 430 460 670 340 S1100 145 1510 290" />
        <path class="flow-line flow-line-d" d="M-60 770 C300 600 500 910 760 760 S1110 650 1500 820" />
      </svg>
    </div>

    <header class="site-header">
      <a class="wordmark" href="#home" @click="closeMenu" aria-label="Butsha Tengwa home">
        <span class="wordmark-mark">B<span>.</span></span>
        <span class="wordmark-name">BUTSHA TENGWA<small>SOFTWARE DEVELOPER</small></span>
      </a>
      <button class="menu-toggle" :aria-label="mobileMenuOpen ? 'Close navigation' : 'Open navigation'" @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" :size="21" /><Menu v-else :size="21" />
      </button>
      <nav class="main-nav" :class="{ 'nav-open': mobileMenuOpen }" aria-label="Main navigation">
        <a href="#work" :class="{ active: activeSection === 'work' }" @click="closeMenu">Selected work</a>
        <a href="#skills" :class="{ active: activeSection === 'skills' }" @click="closeMenu">Skills map</a>
        <a href="#about" :class="{ active: activeSection === 'about' }" @click="closeMenu">About</a>
        <a class="nav-contact" href="#contact" @click="closeMenu">Let's connect <ArrowUpRight :size="14" /></a>
      </nav>
    </header>

    <main>
      <section id="home" class="hero section-wrap">
        <div class="hero-index"><span>BT / FIELD NOTES</span><span>26°12′ S — 28°02′ E</span></div>
        <div class="hero-copy">
          <div class="eyebrow"><span class="status-light"></span> FULL-STACK DEVELOPMENT <span class="eyebrow-slash">/</span> BACKEND & DATA</div>
          <h1>Built through<br/><em>persistence.</em><br/><span class="hero-small-line">Driven by</span> possibility<span class="violet-period">.</span></h1>
          <p class="hero-intro">I develop full-stack applications with a focus on intuitive experiences, robust backend architecture and data-driven systems.</p>
          <div class="hero-actions">
            <a href="#work" class="button-primary">Explore the work <ArrowDownRight :size="17" /></a>
            <a href="#skills" class="text-link">Trace the connections <span>↘</span></a>
          </div>
          <div class="hero-footnote"><span>AN ONGOING PRACTICE</span><span class="footnote-line"></span><span>BUILT BY MAKING</span></div>
        </div>
        <div class="hero-art" aria-label="Textured abstract artwork inspired by silk, shadow and pearl embroidery">
          <div class="art-halo"></div>
          <svg class="embroidered-thread" viewBox="0 0 500 500" aria-hidden="true">
            <path class="thread-shadow" d="M62 355 C108 286 100 206 169 182 S266 259 307 189 S360 113 438 139" />
            <path class="thread-path" d="M62 355 C108 286 100 206 169 182 S266 259 307 189 S360 113 438 139" />
            <path class="thread-detail" d="M74 370 C118 300 113 225 177 200 S271 275 318 205 S371 128 446 153" />
            <g class="pearl-set">
              <circle cx="62" cy="355" r="5" /><circle cx="169" cy="182" r="4" />
              <circle cx="238" cy="226" r="3" /><circle cx="307" cy="189" r="5" />
              <circle cx="371" cy="128" r="3.5" /><circle cx="438" cy="139" r="5.5" />
            </g>
          </svg>
          <div class="art-disc"></div>
          <div class="art-ribbon ribbon-one"></div>
          <div class="art-ribbon ribbon-two"></div>
          <div class="art-ribbon ribbon-three"></div>
          <div class="art-contour contour-one"></div>
          <div class="art-contour contour-two"></div>
          <div class="art-contour contour-three"></div>
          <div class="art-orbit orbit-one"></div>
          <div class="art-orbit orbit-two"></div>
          <div class="art-node node-one"></div>
          <div class="art-node node-two"></div>
          <div class="art-node node-three"></div>
          <span class="art-label label-top">FIG. 01 — THREAD / TENSION</span>
          <span class="art-label label-bottom">A SOFTER KIND OF SIGNAL</span>
          <span class="art-coord">STUDY / 001</span>
        </div>
        <div class="hero-side-note">CURIOUS BY NATURE<br/>BUILT THROUGH PRACTICE</div>
        <a class="scroll-cue" href="#work"><span class="scroll-line"></span><span>FOLLOW THE CURRENT</span><ArrowDownRight :size="13" /></a>
      </section>

      <section id="work" class="work-section section-wrap">
        <div class="section-kicker"><span>01</span><span class="kicker-rule"></span><span>SELECTED WORK</span><span class="kicker-tail">SELECTED PROJECTS</span></div>
        <div class="section-intro">
          <h2>Built with intent.<br/><em>Made to matter.</em></h2>
          <p>A selection of projects exploring how interfaces, application logic and structured data work together to solve real problems.</p>
        </div>
        <div class="project-list">
          <article v-for="project in projects" :key="project.number" class="project-row">
            <LivePreview :title="project.name" :url="project.preview" :number="project.number" />
            <div class="project-copy">
              <div class="project-meta"><span>{{ project.kind }}</span><span class="project-number">{{ project.number }}</span></div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-outcome"><span class="outcome-dot"></span><span>{{ project.outcome }}</span></div>
              <div class="tech-list"><span v-for="tech in project.stack" :key="tech">{{ tech }}</span></div>
              <div class="project-links">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer">Live project <MoveUpRight :size="14" /></a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer">Source & docs <Github :size="14" /></a>
                <button class="map-project-link" type="button" @click="traceSkills(project.visual)">Trace its stack <ArrowRight :size="14" /></button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <SkillsConstellation :focus-project="skillsMapProject" :focus-version="skillsMapFocusVersion" />

      <section id="about" class="about-section section-wrap">
        <div class="section-kicker"><span>03</span><span class="kicker-rule"></span><span>A LITTLE CONTEXT</span><span class="kicker-tail">STILL BECOMING</span></div>
        <div class="about-layout">
          <div class="about-heading"><h2>Progress isn't<br/>always <em>linear.</em></h2><div class="about-mark">BT<span>—</span>001</div></div>
          <div class="about-copy">
            <p class="about-lead">I believe good software comes from curiosity, patience and the willingness to work through complexity.</p>
            <p>My focus is full-stack development, with particular interest in backend systems, databases and the decisions that make digital products dependable. I enjoy making the technical structure and the user experience feel like parts of the same whole.</p>
            <p>This portfolio is a record of that practice: projects built, lessons learned, and the next things I want to understand more deeply.</p>
            <div class="about-signature"><span class="signature-line"></span><span>BUTSHA TENGWA <small>DEVELOPER / CONTINUOUSLY LEARNING</small></span></div>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section section-wrap">
        <div class="contact-art" aria-hidden="true"><div class="contact-glow"></div><div class="contact-ripple ripple-one"></div><div class="contact-ripple ripple-two"></div><div class="contact-ripple ripple-three"></div></div>
        <div class="section-kicker"><span>04</span><span class="kicker-rule"></span><span>THE NEXT CONNECTION</span><span class="kicker-tail">OPEN TO WHAT'S NEXT</span></div>
        <div class="contact-content">
          <span class="contact-eyebrow"><Sparkles :size="14" /> THERE'S ALWAYS ANOTHER WAY FORWARD</span>
          <h2>Let's make<br/><em>something meaningful.</em></h2>
          <p>Open to conversations about software, collaboration and opportunities to build thoughtful things.</p>
          <div class="contact-actions">
            <a class="button-primary" href="https://github.com/butshatengwa951-cmd" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight :size="17" /></a>
            <a class="text-link" href="https://github.com/butshatengwa951-cmd" target="_blank" rel="noreferrer">GitHub <Github :size="15" /></a>
          </div>
          
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a class="footer-wordmark" href="#home">BT<span>.</span></a>
      <span>DESIGNED WITH INTENTION. BUILT IN MOTION.</span>
      <span>© {{ year }} BUTSHA TENGWA</span>
      <a href="#home" class="back-top">BACK TO TOP ↑</a>
    </footer>
  </div>
</template>