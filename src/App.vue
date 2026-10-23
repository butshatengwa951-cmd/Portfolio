<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import LivePreview from './components/LivePreview.vue'
import SkillsConstellation from './components/SkillsConstellation.vue'
import { ArrowDownRight, ArrowUpRight, ArrowRight, Github, Menu, X, MoveUpRight, Sparkles, LayoutGrid, List as ListIcon, Flame, Waves, Sprout, Wind, ChevronDown, Check } from 'lucide-vue-next'

const route = useRoute()
const currentPage = computed(() => route.path === '/' ? 'home' : route.path.slice(1).replace(/\/$/, ''))
const mobileMenuOpen = ref(false)
const projectLayout = ref<'list' | 'grid'>('list')
const activeSection = ref('home')
const reducedMotion = ref(false)
const skillsMapProject = ref<'stockwell' | 'moderntechhr' | 'lightningnews' | 'budgettracker' | null>(null)
const skillsMapFocusVersion = ref(0)
const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim()
const contactForm = ref({ name: '', email: '', subject: '', message: '' })
const contactStatus = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const contactStatusMessage = ref('')
const contactHoneypot = ref('')
const profile = {
  role: "FULL-STACK DEVELOPER / CREATIVE",
  location: "SOUTH AFRICA",
  status: "OPEN TO OPPORTUNITIES",
  background: "Developer trained through the Life Choices Academy YouthCode programme/project. My development journey has grown from HTML, CSS and JavaScript into full-stack web development with Vue, Node/Express, MySQL, PostgreSQL, Python, Flask, REST APIs, web scraping, payment integrations and cloud deployment. I learn by building, researching difficult concepts and turning what I learn into working projects.",
  objective: "Explore new and creative ways for users to interact with web applications while developing a distinctive approach, perspective and identity as a developer.",
  interests: ["Backend Development","Backend Architecture","APIs & Integrations","Databases & Data Systems","Full-Stack Development","Interactive Web Experiences","Creative UI/UX"],
  learning: ["Advanced Three.js / R3F","Interaction Design","Web Animation & Motion","Creative Frontend Architecture","System Design","Backend Architecture"],
  goals: ["Build products people can actually use","Master full-stack architecture","Build reliable payment integrations","Create more advanced interactive web experiences"],
  lessons: "Real projects taught me that development is as much about researching, debugging and connecting systems as it is about writing code."
}
const year = new Date().getFullYear()
const journey = [{"date":"MAY 2026","title":"HTML, CSS + JavaScript foundations","note":"05–28 May — started with HTML/CSS structure and styling, then moved into JavaScript fundamentals, functions, DOM manipulation and event-driven browser behaviour through the Week 3–4 exercise work."},{"date":"MAY–JUN 2026","title":"Interactive browser projects","note":"19 May–23 June — applied the fundamentals to practical projects including the Python Budget Tracker, Randomizer, Recipe Finder, Cooking Masterclass, catalogue work and a Food Fest landing page. Learned to turn isolated exercises into complete user-facing experiences."},{"date":"JUL 2026","title":"ModerntechHR — building a real front-end system","note":"July — developed the ModerntechHR HR platform and learned to structure multi-page interfaces around real workflows: employee management, payroll calculations, search/filtering, modal interactions, responsive layouts, dynamic DOM updates and Chart.js data visualisation."},{"date":"JUL–AUG 2026","title":"PHP + backend foundations","note":"30 July–11 August — progressed through the PHP exercise series while strengthening server-side thinking, form handling and application logic. This built the bridge from browser-only JavaScript work toward backend development."},{"date":"JUL–AUG 2026","title":"Lightning News — Python web scraping","note":"20 July–07 August — with Team Charlie, learned Python web scraping and backend API development using Flask, Requests, BeautifulSoup, lxml and RSS/XML parsing. Built source-specific and generic scrapers, extracted article metadata, saved raw JSON, cleaned datasets and exposed scraping/search/statistics functionality through API routes and tests."},{"date":"AUG–SEP 2026","title":"Node.js + full-stack architecture","note":"25 August–01 September — started the Module 3 e-commerce work and progressed through the Node.js exercise series. Learned how frontend applications communicate with REST APIs, how backend logic is structured, and how databases, authentication and server-side business rules fit together."},{"date":"SEP 2026","title":"Vue becomes the framework","note":"01 September — moved into Vue and component-based application development, learning reactive state, reusable components, routing and structured frontend architecture."},{"date":"SEP 2026","title":"StockWell — first serious full-stack build","note":"17–18 September — turned the accumulated skills into StockWell: Vue 3 + Node/Express + MySQL + PayFast, with authentication, supplier comparison, cart, proposals, majority voting, governed wallet payments, orders and delivery tracking. Learned transactional thinking, role-based authorization and payment/webhook handling."},{"date":"SEP–OCT 2026","title":"Interactive portfolio experiments","note":"21 September–01 October — explored the interactive 3D portfolio, isometric interfaces, animation, interaction patterns and embedded project previews before evolving the presentation into the current portfolio system."},{"date":"OCT 2026","title":"Budget Tracker — full-stack persistence + deployment","note":"02–05 October — rebuilt the original Python budget/productivity toolkit as a Vue 3 + Flask application backed by PostgreSQL. Added persistent transactions, configurable budget cycles, budget history, task management and study planning, then deployed the frontend and API through Render with a cloud-hosted database."},{"date":"OCT 2026","title":"Exploring identity through interactive web development","note":"As my technical foundation has grown, my focus has started shifting beyond simply learning new technologies. I am exploring new and creative ways for users to interact with web applications, experimenting with motion, 3D, interface design and unconventional presentation. The goal is not only to build functional applications, but to develop a distinct perspective and identity as a developer."},{"date":"OCT 2026","title":"Portfolio — turning the work into a case file","note":"03–05 October — rebuilt the portfolio around the detective-folder concept, bringing the projects together with live previews, a technology-to-project map, persistent evidence selection and a chronological development journey."}]

type ElementName = 'water' | 'fire' | 'earth' | 'air'

const element = ref<ElementName>('water')
const elementPortalOpen = ref(false)
const elementTransitioning = ref(false)
const transitionTo = ref<ElementName>('water')
const portalRoot = ref<HTMLElement | null>(null)
let elementTransitionTimer: number | undefined

const elementalThemes = [
  { id: 'water', name: 'Water', mood: 'Living currents', description: 'An oceanic world of depth, turquoise light and refracted blue.', icon: Waves, swatches: ['#06171D', '#0C2832', '#43E4D6', '#609CFF', '#9A75FF'] },
  { id: 'fire', name: 'Fire', mood: 'Burning horizon', description: 'Volcanic shadows, molten light and a vivid ember horizon.', icon: Flame, swatches: ['#190D12', '#35151E', '#FF553D', '#FF9D45', '#FFC75E'] },
  { id: 'earth', name: 'Earth', mood: 'Ancient wild', description: 'Deep forests, moss-lit stone and warm natural textures.', icon: Sprout, swatches: ['#0E1711', '#1B3021', '#3D5E38', '#B7E36B', '#E6A071'] },
  { id: 'air', name: 'Air', mood: 'Above the storm', description: 'Monochrome storm clouds, drifting fog and a pale silver horizon.', icon: Wind, swatches: ['#17191B', '#31363B', '#626D77', '#A8B3BC', '#EDF2F5'] }
] as const

const activeElement = computed(() => elementalThemes.find((palette) => palette.id === element.value) ?? elementalThemes[0])

const projects = [ { number: '01', name: 'StockWell', kind: 'COMMUNITY COMMERCE PLATFORM', description: 'StockWell is a full e-commerce platform built around community purchasing, supplier comparison and shared decision-making. It combines a Vue frontend with Node/Express backend services, MySQL persistence and PayFast payments to support authentication, cart management, proposals, majority voting, wallet transactions, orders and delivery workflows.', caseStudy: { problem: 'Existing community proposals were fragmented across chats and sheets. No voting, no wallet, no payment traceability.', build: 'Vue frontend, Node API, PayFast ITN integration, wallet ledger with idempotency keys, cart persistence, proposal engine with vote weighting.', challenge: 'The main challenge was making the PayFast payment flow reliable from checkout to the wallet ledger. An early version appeared to succeed because the webhook returned a 200 response, but the wallet was not updated correctly and the PayFast signature could fail when parameters were handled in the wrong order. I logged and replayed the raw ITN request, checked payload encoding and signature validation, and added transaction protection and idempotency so a payment could not be processed twice.', features: ['Authentication and role-based workflows','Supplier comparison and cart management','Community proposals and majority voting','Governed group-wallet approvals','PayFast payment integration and transaction protection','Orders and delivery workflows'] }, stack: ['Vue', 'Node.js / Express', 'MySQL', 'PayFast'], access: { title: 'STOCKWELL DEMO ACCOUNTS', accounts: [{ role: 'ADMIN ACCOUNT', loginLabel: 'EMAIL / USERNAME', login: 'ADD LOGIN DETAILS', password: 'ADD PASSWORD', responsibility: 'Full administrative access for demo purposes.' }, { role: 'CHAIRPERSON', loginLabel: 'EMAIL / USERNAME', login: 'ADD LOGIN DETAILS', password: 'ADD PASSWORD', responsibility: 'Authorizes group orders after majority voting.' }, { role: 'TREASURER', loginLabel: 'EMAIL / USERNAME', login: 'ADD LOGIN DETAILS', password: 'ADD PASSWORD', responsibility: 'Approves funds from the group wallet.' }, { role: 'NORMAL MEMBER', loginLabel: 'EMAIL / USERNAME', login: 'ADD LOGIN DETAILS', password: 'ADD PASSWORD', responsibility: 'Participates in proposals and group voting.' }] }, detail: 'Engineering focus', outcome: 'Role-based workflows · Checkout and payment integration · Group decisions', link: 'https://stockwell-hl1e.onrender.com/', preview: 'https://stockwell-hl1e.onrender.com/', repo: '', visual: 'stockwell', }, { number: '02', name: 'Budget Tracker', kind: 'PERSONAL FINANCE & PRODUCTIVITY', description: 'Budget Tracker is a full-stack productivity application that brings personal budgeting, task management and study planning into one responsive dashboard. It supports persistent transactions, configurable daily, weekly, monthly and yearly budget cycles, budget history and study sessions in PostgreSQL.', caseStudy: { problem: 'The original project started as a Python command-line productivity suite. The challenge was turning separate budget, task and study tools into a practical web application with persistent data and a deployable full-stack architecture.', build: 'Rebuilt the experience as a Vue 3 + Vite frontend backed by a Flask REST API and PostgreSQL. Added persistent transactions, configurable budget periods, budget history, task management, study planning, South African local-date handling and Render deployment.', challenge: 'The biggest challenge was moving a local Python toolkit into a full-stack application without losing data integrity or introducing inconsistent dates and state. I tested across the frontend, Flask API and PostgreSQL layers and worked through period rollover, timezone handling, production dependencies and Render configuration.', features: ['Persistent transaction records','Daily, weekly, monthly and yearly budget cycles','Budget history and period rollover','Task management','Study planning and session tracking','South African local-date handling','Render deployment with a hosted database'] }, stack: ['Python', 'Vue 3', 'Flask', 'PostgreSQL'], access: null, detail: 'Engineering focus', outcome: 'API-driven workflows · Data persistence · Finance and productivity tools', link: 'https://budget-tracker-frontend-jf66.onrender.com/', preview: 'https://budget-tracker-frontend-jf66.onrender.com/', repo: 'https://github.com/butshatengwa951-cmd/Budget-Tracker-python-mini-toolkit/tree/main', visual: 'budget', }, { number: '03', name: 'Lightning News', kind: 'NEWS AGGREGATION & DATA EXTRACTION', description: 'Lightning News is a news aggregation platform built around automated data collection rather than manually entered articles. Python handles web scraping and feed processing with Requests, BeautifulSoup and lxml, while Flask exposes collected and cleaned information through API routes.', caseStudy: { problem: 'The project explored how a news platform could automatically collect and organise information from multiple online sources instead of relying on manually entered content.', build: 'Built a Python scraping backend using Requests, BeautifulSoup and lxml, with Flask API routes. Worked with RSS/XML feeds and webpage content, created source-specific and generic scrapers, extracted article metadata, stored raw JSON, cleaned results and exposed scraping, search and statistics functionality.', challenge: 'Web scraping and Three.js were both unfamiliar. We researched inconsistent HTML and RSS/XML structures, experimented with 3D work and applied repeated testing to the scraping pipeline, Flask API and interactive presentation.', features: ['Source-specific and generic web scrapers','RSS/XML feed parsing','Article metadata extraction','Raw JSON storage and data cleaning','Search and statistics API routes','Interactive visual presentation'] }, stack: ['Python', 'Flask', 'BeautifulSoup', 'Three.js'], access: null, detail: 'Engineering focus', outcome: 'Content extraction · Data processing · Search and statistics APIs', link: 'https://lightning-news.netlify.app/', preview: 'https://lightning-news.netlify.app/', repo: '', visual: 'news', }, { number: '04', name: 'ModernTechHR', kind: 'HUMAN RESOURCES MANAGEMENT', description: 'ModernTechHR is an HR management platform designed to bring employee records, attendance, payroll, leave management and reporting into one organised interface. JavaScript drives employee updates, searching, filtering, payroll calculations and modal interactions, while Chart.js turns HR information into visual reports.', caseStudy: { problem: 'The objective was to build an interactive HR management system bringing employee information, payroll, searching, filtering and reporting into one organised platform.', build: 'Built the frontend with HTML/CSS and JavaScript, dynamic employee data, DOM updates, search and filtering, modal workflows and payroll calculations. Chart.js turned HR and payroll data into visual reports, with frontend and backend services connected to a cloud-hosted MySQL database.', challenge: 'The main challenge was learning how separate frontend and backend repositories could be developed, deployed and connected as one application. Research, service-communication testing and deployment configuration helped connect the frontend, backend and cloud database.', features: ['Employee management and records','Attendance and leave workflows','Payroll calculations','Search and filtering','Modal interactions and responsive layouts','Chart.js dashboards and reporting','Separate frontend/backend deployment'] }, stack: ['JavaScript', 'MySQL', 'Chart.js'], access: { title: 'MODERNTECHHR DEMO ACCOUNT', accounts: [{ role: 'ADMIN ACCOUNT', loginLabel: 'USERNAME', login: 'ADD USERNAME', password: 'ADD PASSWORD', responsibility: 'Explore employee records, payroll and reporting workflows.' }] }, detail: 'Engineering focus', outcome: 'Structured records · Management workflows · Reporting', link: 'https://module1-project-hr.onrender.com/', preview: 'https://module1-project-hr.onrender.com/', repo: '', visual: 'hr', }, { number: '05', name: 'Voya Bite', kind: 'TRAVEL EXPERIENCES & BOOKING INTERFACE', description: 'Voya Bite explores a travel website experience for discovering activities, hotels and flights. The interface combines curated travel content with browsing, filtering and booking interactions.', stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'], access: { title: 'VOYA BITE DEMO ACCOUNT', accounts: [{ role: 'DEMO ACCOUNT', loginLabel: 'USERNAME / EMAIL', login: 'ADD USERNAME OR EMAIL', password: 'ADD PASSWORD', responsibility: 'Use this account to explore the travel experience and booking interactions.' }] }, detail: 'Engineering focus', outcome: 'Experience discovery · Filtering · Booking-modal flow', caseStudy: { problem: 'Travel discovery can feel fragmented when activities, destinations and booking actions are spread across disconnected interfaces.', build: 'Created a responsive static-site experience with navigation, filtering, booking-modal interactions and travel-oriented content for Cape Town hiking, a Kruger safari day, shark-cage diving, a Table Mountain abseil and a wine-tram tour.', challenge: 'The main design challenge was connecting browsing and booking interactions without making the page feel cluttered.', features: ['Curated travel activities','Filtering and browsing','Booking modal flow','Responsive navigation'] }, link: 'https://ihtishaamj63-web.github.io/Voya-Byte/', preview: 'https://ihtishaamj63-web.github.io/Voya-Byte/', repo: '', visual: '', }, ] 
let observer: IntersectionObserver | undefined

const faviconPaths: Record<ElementName, string> = {
  water: '/favicon.svg',
  fire: '/favicon-fire.svg',
  earth: '/favicon-earth.svg',
  air: '/favicon-air.svg'
}

const elementSurfaceColors: Record<ElementName, string> = {
  water: '#06171D',
  fire: '#190D12',
  earth: '#0E1711',
  air: '#191817'
}

function syncAppearance() {
  document.documentElement.dataset.theme = 'dark'
  document.documentElement.dataset.element = element.value

  const favicon = document.querySelector<HTMLLinkElement>('#site-favicon')
  if (favicon) favicon.href = faviconPaths[element.value]

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColor) themeColor.content = elementSurfaceColors[element.value]
}

function handlePortalOutside(event: PointerEvent) {
  if (portalRoot.value && !portalRoot.value.contains(event.target as Node)) elementPortalOpen.value = false
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.localStorage.removeItem('butsha-portfolio-theme')
  const savedElement = window.localStorage.getItem('butsha-portfolio-element')
  if (elementalThemes.some((palette) => palette.id === savedElement)) element.value = savedElement as ElementName
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeSection.value = entry.target.id
    })
  }, { rootMargin: '-25% 0px -60% 0px' })
  document.querySelectorAll('main section[id]').forEach((section) => observer?.observe(section))
  syncAppearance()
  document.addEventListener('pointerdown', handlePortalOutside)
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('pointerdown', handlePortalOutside)
  if (elementTransitionTimer !== undefined) window.clearTimeout(elementTransitionTimer)
})

function setElement(nextElement: ElementName) {
  elementPortalOpen.value = false
  closeMenu()
  if (nextElement === element.value) return
  if (elementTransitionTimer !== undefined) window.clearTimeout(elementTransitionTimer)

  transitionTo.value = nextElement
  element.value = nextElement
  syncAppearance()
  window.localStorage.setItem('butsha-portfolio-element', nextElement)

  if (reducedMotion.value) {
    elementTransitioning.value = false
    return
  }

  elementTransitioning.value = false
  window.requestAnimationFrame(() => {
    elementTransitioning.value = true
    elementTransitionTimer = window.setTimeout(() => {
      elementTransitioning.value = false
      elementTransitionTimer = undefined
    }, 780)
  })
}

function fallbackPortraitImage(event: Event) {
  const image = event.currentTarget
  if (!(image instanceof HTMLImageElement)) return
  image.onerror = null
  image.src = '/about-portrait.webp'
}

function fallbackCredentialImage(event: Event) {
  const image = event.currentTarget
  if (!(image instanceof HTMLImageElement)) return
  image.onerror = null
  image.src = '/credentials/credential-placeholder-03.svg'
  image.alt = 'Placeholder artwork for a certificate'
}

async function submitContactForm() {
  // Silently discard automated submissions that fill the hidden honeypot field.
  if (contactHoneypot.value.trim()) {
    contactStatus.value = 'success'
    contactStatusMessage.value = 'Message submitted. Thank you for getting in touch.'
    contactForm.value = { name: '', email: '', subject: '', message: '' }
    contactHoneypot.value = ''
    return
  }

  if (!contactEmail) {
    contactStatus.value = 'error'
    contactStatusMessage.value = 'Email delivery is not configured yet. Set VITE_CONTACT_EMAIL in the site build environment and redeploy.'
    return
  }

  contactStatus.value = 'sending'
  contactStatusMessage.value = ''

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: contactForm.value.name.trim(),
        email: contactForm.value.email.trim(),
        _replyto: contactForm.value.email.trim(),
        subject: contactForm.value.subject.trim(),
        message: contactForm.value.message.trim(),
        _subject: `Portfolio enquiry: ${contactForm.value.subject.trim()}`,
        _template: 'table',
        _honey: contactHoneypot.value.trim()
      })
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error(typeof result.message === 'string' ? result.message : 'The email service could not accept your message.')
    }

    contactStatus.value = 'success'
    contactStatusMessage.value = 'Message submitted. Thank you for getting in touch.'
    contactForm.value = { name: '', email: '', subject: '', message: '' }
    contactHoneypot.value = ''
  } catch (error) {
    contactStatus.value = 'error'
    contactStatusMessage.value = error instanceof Error
      ? `Your message could not be sent. ${error.message}`
      : 'Your message could not be sent. Please try again later.'
  }
}

function closeMenu() {
  mobileMenuOpen.value = false
  elementPortalOpen.value = false
}

function traceSkills(projectVisual: string) {
  const idByVisual: Record<string, 'stockwell' | 'moderntechhr' | 'lightningnews' | 'budgettracker'> = { stockwell: 'stockwell', hr: 'moderntechhr', news: 'lightningnews', budget: 'budgettracker' }
  skillsMapProject.value = idByVisual[projectVisual] ?? null
  skillsMapFocusVersion.value += 1
  window.location.hash = '/skills'
}
</script>

<template>
  <div class="site-shell" :class="{ 'reduce-motion': reducedMotion }" :data-element="element" data-theme="dark">
    <div class="elemental-landscape" :class="'landscape-' + element" aria-hidden="true">
      <svg class="landscape-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <g v-if="element === 'water'">
          <defs>
            <linearGradient id="waterSky" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-top)" />
              <stop offset=".58" style="stop-color:var(--landscape-mid)" />
              <stop offset="1" style="stop-color:var(--landscape-horizon)" />
            </linearGradient>
            <linearGradient id="waterFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-form-a)" />
              <stop offset="1" style="stop-color:var(--landscape-dark)" />
            </linearGradient>
            <linearGradient id="waterRay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.42" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </linearGradient>
            <radialGradient id="waterSun">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.75" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#waterSky)" />
          <ellipse cx="1050" cy="290" rx="510" ry="370" fill="url(#waterSun)" />
          <circle cx="1070" cy="260" r="90" fill="var(--landscape-orb)" opacity=".32" />
          <path d="M830 0 L940 0 L1180 620 L1110 620 Z" fill="url(#waterRay)" />
          <path d="M1020 0 L1050 0 L1320 650 L1240 650 Z" fill="url(#waterRay)" opacity=".7" />
          <path d="M1210 0 L1245 0 L1450 580 L1390 580 Z" fill="url(#waterRay)" opacity=".42" />
          <path d="M0 570 C150 500 225 420 365 445 C485 467 520 550 600 580 L600 900 L0 900 Z" fill="var(--landscape-form-b)" opacity=".82" />
          <path d="M1600 480 C1450 420 1385 445 1310 510 C1240 570 1215 650 1110 680 L1040 900 L1600 900 Z" fill="var(--landscape-form-a)" />
          <path d="M0 730 C190 665 330 710 470 685 C600 660 690 700 825 672 C970 642 1070 690 1200 665 C1370 632 1460 670 1600 625 L1600 900 L0 900 Z" fill="url(#waterFloor)" />
          <path class="landscape-current landscape-current-one" d="M0 710 C240 685 315 742 540 710 S930 720 1125 691 S1435 705 1600 665" />
          <path class="landscape-current landscape-current-two" d="M0 786 C190 755 380 800 585 772 S955 798 1170 758 S1450 775 1600 740" />
          <path class="landscape-current landscape-current-three" d="M0 840 C280 810 380 852 660 826 S1040 850 1280 815 S1490 826 1600 805" />
          <g fill="var(--landscape-glow)" opacity=".52">
            <circle cx="350" cy="490" r="2.5" /><circle cx="405" cy="532" r="1.8" /><circle cx="1280" cy="420" r="2" /><circle cx="1360" cy="515" r="2.5" /><circle cx="980" cy="570" r="1.6" /><circle cx="760" cy="620" r="1.8" />
          </g>
        </g>

        <g v-else-if="element === 'fire'">
          <defs>
            <linearGradient id="fireSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-top)" />
              <stop offset=".56" style="stop-color:var(--landscape-mid)" />
              <stop offset="1" style="stop-color:var(--landscape-horizon)" />
            </linearGradient>
            <radialGradient id="fireHorizon">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.8" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </radialGradient>
            <linearGradient id="lavaFlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-glow)" />
              <stop offset="1" style="stop-color:var(--landscape-orb)" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#fireSky)" />
          <ellipse cx="850" cy="535" rx="670" ry="350" fill="url(#fireHorizon)" />
          <circle cx="1050" cy="420" r="62" fill="var(--landscape-orb)" opacity=".65" />
          <path d="M0 660 L165 558 L300 615 L470 505 L610 603 L805 410 L930 590 L1085 460 L1220 590 L1400 485 L1600 620 L1600 900 L0 900 Z" fill="var(--landscape-form-a)" />
          <path d="M490 900 L575 700 L670 630 L760 470 L840 378 L908 515 L985 610 L1085 900 Z" fill="var(--landscape-dark)" />
          <path d="M760 470 L840 378 L908 515 L882 490 L849 523 L829 478 L803 535 L784 493 Z" fill="var(--landscape-form-b)" />
          <path d="M840 384 L851 503 L832 548 L858 587 L843 670 L873 726 L860 900 L815 900 L828 738 L808 682 L825 604 L805 557 L824 508 Z" fill="url(#lavaFlow)" opacity=".95" />
          <path d="M840 384 L851 503 L832 548 L858 587 L843 670 L873 726 L860 900" fill="none" stroke="var(--landscape-highlight)" stroke-width="4" opacity=".82" />
          <path d="M0 770 L180 700 L335 760 L500 720 L650 785 L790 760 L940 790 L1100 735 L1270 770 L1440 705 L1600 750 L1600 900 L0 900 Z" fill="var(--landscape-form-c)" />
          <path d="M0 818 C220 790 300 830 470 807 S760 842 960 812 S1330 838 1600 795 L1600 900 L0 900 Z" fill="var(--landscape-dark)" />
          <g fill="var(--landscape-glow)" opacity=".7">
            <circle cx="490" cy="490" r="2" /><circle cx="550" cy="430" r="3" /><circle cx="1030" cy="470" r="2.5" /><circle cx="1200" cy="555" r="2" /><circle cx="1320" cy="450" r="1.8" /><circle cx="690" cy="560" r="2" /><circle cx="380" cy="600" r="1.5" /><circle cx="1150" cy="405" r="1.7" />
          </g>
        </g>

        <g v-else-if="element === 'earth'">
          <defs>
            <linearGradient id="earthSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-top)" />
              <stop offset=".56" style="stop-color:var(--landscape-mid)" />
              <stop offset="1" style="stop-color:var(--landscape-horizon)" />
            </linearGradient>
            <radialGradient id="forestSun">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.65" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </radialGradient>
            <linearGradient id="forestRay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.25" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#earthSky)" />
          <ellipse cx="850" cy="360" rx="580" ry="410" fill="url(#forestSun)" />
          <path d="M520 0 L650 0 L1000 720 L850 720 Z" fill="url(#forestRay)" />
          <path d="M760 0 L820 0 L1170 730 L1085 730 Z" fill="url(#forestRay)" opacity=".7" />
          <path d="M0 540 L190 385 L320 490 L505 290 L690 490 L850 355 L1040 525 L1200 360 L1415 505 L1600 400 L1600 900 L0 900 Z" fill="var(--landscape-form-a)" opacity=".7" />
          <path d="M0 650 C190 555 350 655 520 600 S820 630 1000 570 S1320 632 1600 535 L1600 900 L0 900 Z" fill="var(--landscape-form-b)" />
          <path d="M0 720 C220 650 370 732 550 680 S900 710 1090 655 S1400 700 1600 625 L1600 900 L0 900 Z" fill="var(--landscape-form-c)" />
          <g fill="var(--landscape-dark)">
            <path d="M0 900 L0 430 L75 545 L28 545 L104 653 L58 653 L135 755 L90 755 L90 900 Z" />
            <path d="M125 900 L125 500 L205 616 L160 616 L240 720 L195 720 L263 807 L225 807 L225 900 Z" />
            <path d="M1280 900 L1280 445 L1358 565 L1315 565 L1395 675 L1348 675 L1424 780 L1378 780 L1378 900 Z" />
            <path d="M1430 900 L1430 390 L1515 530 L1470 530 L1555 650 L1510 650 L1580 760 L1540 760 L1540 900 Z" />
          </g>
          <g fill="var(--landscape-form-a)" opacity=".95">
            <path d="M260 900 L260 605 L326 705 L290 705 L355 790 L321 790 L370 850 L340 850 L340 900 Z" />
            <path d="M1170 900 L1170 600 L1236 696 L1200 696 L1265 785 L1230 785 L1280 850 L1250 850 L1250 900 Z" />
          </g>
          <path d="M0 858 C245 815 390 867 600 835 S1000 862 1210 830 S1435 850 1600 818 L1600 900 L0 900 Z" fill="var(--landscape-dark)" opacity=".8" />
        </g>

        <g v-else>
          <defs>
            <linearGradient id="airSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--landscape-top)" />
              <stop offset=".58" style="stop-color:var(--landscape-mid)" />
              <stop offset="1" style="stop-color:var(--landscape-horizon)" />
            </linearGradient>
            <radialGradient id="airSun">
              <stop offset="0" style="stop-color:var(--landscape-glow);stop-opacity:.72" />
              <stop offset="1" style="stop-color:var(--landscape-glow);stop-opacity:0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#airSky)" />
          <ellipse cx="1050" cy="250" rx="520" ry="340" fill="url(#airSun)" />
          <circle cx="1070" cy="240" r="77" fill="var(--landscape-orb)" opacity=".6" />
          <g fill="var(--landscape-cloud)" opacity=".55">
            <path d="M0 310 C75 230 180 242 240 290 C320 215 415 250 450 302 C530 285 580 328 590 360 L0 375 Z" />
            <path d="M960 350 C1040 280 1120 292 1178 330 C1245 270 1350 290 1395 345 C1470 328 1545 360 1600 395 L1600 430 L960 420 Z" />
            <path d="M500 240 C560 195 635 205 680 245 C740 205 812 222 842 260 L500 285 Z" opacity=".55" />
          </g>
          <path d="M0 610 L185 480 L320 570 L490 395 L670 585 L840 430 L1010 580 L1180 410 L1370 570 L1510 470 L1600 530 L1600 900 L0 900 Z" fill="var(--landscape-form-a)" />
          <path d="M0 715 L175 610 L325 705 L505 535 L680 710 L855 570 L1035 713 L1225 545 L1410 700 L1530 610 L1600 650 L1600 900 L0 900 Z" fill="var(--landscape-form-b)" />
          <path d="M0 808 L200 720 L360 790 L555 680 L740 817 L950 680 L1135 800 L1320 685 L1470 780 L1600 720 L1600 900 L0 900 Z" fill="var(--landscape-form-c)" />
          <path d="M0 850 C250 814 400 858 620 831 S1030 852 1220 826 S1450 840 1600 820 L1600 900 L0 900 Z" fill="var(--landscape-dark)" opacity=".68" />
          <path d="M360 0 L380 0 L760 630 L700 630 Z M1160 0 L1180 0 L1435 500 L1385 500 Z" fill="var(--landscape-glow)" opacity=".12" />
        </g>
      </svg>
    </div>
    <div class="elemental-transition" :class="{ 'is-active': elementTransitioning }" :data-next-element="transitionTo" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>
    <div class="fibre-texture" aria-hidden="true"></div>
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>
    <div class="topographic" aria-hidden="true"></div>
    <header class="site-header">
      <a class="wordmark" href="#/" @click="closeMenu" aria-label="Butsha Tengwa home">
        <span class="wordmark-mark">B<span>.</span></span>
        <span class="wordmark-name">BUTSHA TENGWA<small>SOFTWARE DEVELOPER</small></span>
      </a>
      <button class="menu-toggle" :aria-label="mobileMenuOpen ? 'Close navigation' : 'Open navigation'" @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" :size="21" /><Menu v-else :size="21" />
      </button>
      <nav class="main-nav" :class="{ 'nav-open': mobileMenuOpen }" aria-label="Main navigation">
        <a class="home-nav-link" href="#/" :class="{ active: currentPage === 'home' }" @click="closeMenu">Home</a>
        <a href="#/work" :class="{ active: currentPage === 'work' }" @click="closeMenu">Selected work</a>
        <a href="#/skills" :class="{ active: currentPage === 'skills' }" @click="closeMenu">Skills map</a>
        <a href="#/journey" :class="{ active: currentPage === 'journey' }" @click="closeMenu">Journey</a>
        <a href="#/about" :class="{ active: currentPage === 'about' }" @click="closeMenu">About</a>
        <a href="#/field-notes" :class="{ active: currentPage === 'field-notes' }" @click="closeMenu">Field notes</a>
        <a class="nav-contact" href="#/contact" @click="closeMenu">Let's connect <ArrowUpRight :size="14" /></a>
        <div ref="portalRoot" class="elemental-portal" @keydown.esc.stop="elementPortalOpen = false">
          <button
            class="elemental-portal-trigger"
            type="button"
            :aria-expanded="elementPortalOpen"
            aria-haspopup="true"
            aria-label="Choose an elemental theme"
            @click="elementPortalOpen = !elementPortalOpen"
          >
            <span class="portal-trigger-icon"><component :is="activeElement.icon" :size="15" /></span>
            <span class="portal-label">{{ activeElement.name }}</span>
            <ChevronDown :size="13" class="portal-chevron" />
          </button>
          <Transition name="portal-fade">
            <div v-if="elementPortalOpen" class="elemental-portal-menu" role="group" aria-label="Choose an element">
              <div class="portal-menu-heading"><span>CHOOSE YOUR ELEMENT</span></div>
              <button
                v-for="palette in elementalThemes"
                :key="palette.id"
                class="portal-option"
                :class="{ selected: element === palette.id }"
                type="button"
                :aria-pressed="element === palette.id"
                @click="setElement(palette.id)"
              >
                <span class="portal-option-icon"><component :is="palette.icon" :size="17" /></span>
                <span class="portal-option-copy">
                  <span class="portal-option-heading"><span>{{ palette.name }}</span><small>{{ palette.mood }}</small></span>
                  <span class="portal-option-description">{{ palette.description }}</span>
                  <span class="portal-swatches"><i v-for="swatch in palette.swatches" :key="swatch" :style="{ backgroundColor: swatch }"></i></span>
                </span>
                <Check v-if="element === palette.id" :size="15" class="portal-option-check" />
              </button>
            </div>
          </Transition>
        </div>

      </nav>
    </header>

    <main>
      <section v-if="currentPage === 'home'" id="home" class="hero section-wrap">
        <div class="hero-velvet" aria-hidden="true"></div>
        <div class="hero-copy">
          <div class="eyebrow"><span class="status-light"></span> FULL-STACK DEVELOPMENT <span class="eyebrow-slash">/</span> BACKEND & DATA</div>
          <h1>Built through<br/><em>persistence.</em><br/><span class="hero-small-line">Driven by</span> possibility<span class="violet-period">.</span></h1>
          <p class="hero-intro">I develop full-stack applications with a focus on intuitive experiences, robust backend architecture and data-driven systems.</p>
          <div class="hero-actions">
            <a href="#/work" class="button-primary">Explore the work <ArrowDownRight :size="17" /></a>
            <a href="#/skills" class="text-link">Trace the connections <span>↘</span></a>
          </div>
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
        </div>
      </section>

      <section v-if="currentPage === 'work'" id="work" class="work-section section-wrap">
        <div class="section-kicker"><span class="kicker-rule"></span><span>SELECTED WORK</span><span class="kicker-tail">SELECTED PROJECTS</span></div>
        <div class="section-intro">
          <h2>Built with intent.<br/><em>Made to matter.</em></h2>
          <p>A selection of projects exploring how interfaces, application logic and structured data work together to solve real problems.</p>
        </div>
        <div class="project-display-toolbar">
          <p class="project-display-hint">GRID VIEW FOR QUICK BROWSING · LIST VIEW FOR FULL CASE FILES</p>
          <div class="project-view-options" role="group" aria-label="Choose project display layout">
            <button
              class="project-view-button"
              :class="{ active: projectLayout === 'list' }"
              type="button"
              :aria-pressed="projectLayout === 'list'"
              @click="projectLayout = 'list'"
            >
              <ListIcon :size="15" />
              <span>LIST</span>
            </button>
            <button
              class="project-view-button"
              :class="{ active: projectLayout === 'grid' }"
              type="button"
              :aria-pressed="projectLayout === 'grid'"
              @click="projectLayout = 'grid'"
            >
              <LayoutGrid :size="15" />
              <span>GRID</span>
            </button>
          </div>
        </div>
        <div class="project-list" :class="{ 'is-grid': projectLayout === 'grid' }">
          <article v-for="project in projects" :key="project.number" class="project-row">
            <LivePreview :title="project.name" :url="project.preview" :number="project.number" />
            <div class="project-copy">
              <div class="project-meta"><span>{{ project.kind }}</span></div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-outcome"><span class="outcome-dot"></span><span>{{ project.outcome }}</span></div>
              <div class="tech-list"><span v-for="tech in project.stack" :key="tech">{{ tech }}</span></div>
              <details v-if="project.caseStudy" class="case-study">
                <summary><span>EXPLORE PROJECT</span><span class="case-study-toggle" aria-hidden="true">+</span></summary>
                <div class="case-study-content">
                  <h4>CASE FILE / THE PROBLEM</h4><p>{{ project.caseStudy.problem }}</p>
                  <h4>WHAT I BUILT</h4><p>{{ project.caseStudy.build }}</p>
                  <h4>THE CHALLENGE</h4><p>{{ project.caseStudy.challenge }}</p>
                  <h4>FEATURE RECORD</h4><ul><li v-for="feature in project.caseStudy.features" :key="feature">{{ feature }}</li></ul>
                  <section v-if="project.access" class="login-details-panel" aria-label="Project login details">
                    <div class="login-details-heading">
                      <div>
                        <h4>{{ project.access.title }}</h4>
                        <p>Demo credentials for exploring the project. Replace the placeholders with the current test-account details.</p>
                      </div>
                      <span class="login-details-tag">LOGIN DETAILS</span>
                    </div>
                    <div class="login-account-grid">
                      <article v-for="account in project.access.accounts" :key="account.role" class="login-account">
                        <h5>{{ account.role }}</h5>
                        <dl>
                          <div><dt>{{ account.loginLabel }}</dt><dd>{{ account.login }}</dd></div>
                          <div><dt>PASSWORD</dt><dd>{{ account.password }}</dd></div>
                        </dl>
                        <p>{{ account.responsibility }}</p>
                      </article>
                    </div>
                  </section>
                </div>
              </details>
              <div class="project-links">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer">Live project <MoveUpRight :size="14" /></a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer">Source & docs <Github :size="14" /></a>
                <button v-if="project.visual" class="map-project-link" type="button" @click="traceSkills(project.visual)">Trace its stack <ArrowRight :size="14" /></button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <SkillsConstellation v-if="currentPage === 'skills'" :focus-project="skillsMapProject" :focus-version="skillsMapFocusVersion" />

      <section v-if="currentPage === 'journey'" id="journey" class="journey-section section-wrap">
        <div class="section-kicker"><span class="kicker-rule"></span><span>JOURNEY</span><span class="kicker-tail">DEVELOPMENT TIMELINE</span></div>
        <div class="section-intro journey-intro">
          <h2>JOURNEY</h2>
          <p>A chronological record of the projects, problems and small breakthroughs that shaped the work.</p>
        </div>
        <div class="journey-timeline">
          <div v-for="(item, index) in journey" :key="`${item.date}-${index}`" class="journey-entry">
            <div class="journey-marker" aria-hidden="true"></div>
            <div class="journey-date">{{ item.date }}</div>
            <div class="journey-entry-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.note }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="currentPage === 'about'" id="about" class="about-section section-wrap">
        <div class="section-kicker"><span class="kicker-rule"></span><span>A LITTLE CONTEXT</span><span class="kicker-tail">STILL BECOMING</span></div>
        <div class="about-layout">
          <div class="about-heading">
            <figure class="about-portrait">
              <img src="https://i.ibb.co/8nCKbG5D/Chat-GPT-Image-Oct-23-2026-12-13-42-PM.png" alt="Portrait of Butsha Tengwa" width="240" height="240" loading="lazy" decoding="async" @error="fallbackPortraitImage" />
            </figure>
            <h2>Progress isn't<br/>always <em>linear.</em></h2>
            <div class="about-mark" aria-hidden="true">BT</div>
          </div>
          <div class="about-copy">
            <p class="about-lead">I believe good software comes from curiosity, patience and the willingness to work through complexity.</p>
            <p>My focus is full-stack development, with particular interest in backend systems, databases and the decisions that make digital products dependable. I enjoy making the technical structure and the user experience feel like parts of the same whole.</p>
            <p>This portfolio is a record of that practice: projects built, lessons learned, and the next things I want to understand more deeply.</p>
            <div class="about-signature">
              <span class="signature-line" aria-hidden="true"></span>
              <span class="signature-copy"><span class="signature-name">BUTSHA TENGWA</span><small>DEVELOPER / CONTINUOUSLY LEARNING</small></span>
            </div>
            <p class="about-meta">FULL-STACK DEVELOPER / CREATIVE · SOUTH AFRICA · OPEN TO OPPORTUNITIES</p>
          </div>
        </div>

        <div class="profile-extra" aria-label="Developer profile details">
          <section class="profile-detail profile-background">
            <span class="profile-detail-label">BACKGROUND</span>
            <p class="profile-detail-copy">{{ profile.background }}</p>
          </section>

          <section class="profile-detail profile-objective">
            <span class="profile-detail-label">OBJECTIVE</span>
            <p class="profile-detail-copy">{{ profile.objective }}</p>
          </section>

          <section class="profile-detail profile-interests">
            <h3>INTERESTS / FOCUS</h3>
            <div class="context-tags"><span v-for="item in profile.interests" :key="item">{{ item }}</span></div>
          </section>

          <section class="profile-detail profile-learning">
            <h3>LEARNING LOG</h3>
            <div class="context-tags"><span v-for="item in profile.learning" :key="item">{{ item }}</span></div>
          </section>

          <section class="profile-detail profile-goals">
            <h3>GOALS</h3>
            <ul><li v-for="item in profile.goals" :key="item">{{ item }}</li></ul>
          </section>

          <section class="profile-detail profile-certifications">
            <div class="certifications-heading">
              <div>
                <h3>CERTIFICATIONS / CREDENTIALS</h3>
                <p>Verified learning and achievements, collected as the journey develops.</p>
              </div>
            </div>
            <div class="certification-grid">
              <article class="credential-card">
                <div class="credential-art">
                  <img
                    src="https://i.ibb.co/gbq3LmZ1/Introduction-to-Cybersecurity-certificate-butshatengwa951-gmail-com-7f150461-4b70-442e-901d-4b4789c6.png"
                    alt="Cisco Introduction to Cybersecurity certificate"
                    loading="lazy"
                    decoding="async"
                    referrerpolicy="no-referrer"
                    @error="fallbackCredentialImage"
                  />
                  <span class="credential-status">CERTIFICATE</span>
                </div>
                <div class="credential-card-copy">
                  <span class="credential-type">CERTIFICATE</span>
                  <h4>Introduction to Cybersecurity</h4>
                  <p>Cisco · 01 September 2026</p>
                </div>
              </article>
              <article class="credential-card">
                <div class="credential-art">
                  <img
                    src="https://i.ibb.co/KxNW8tTS/Introduction-to-Data-Science-certificate-butshatengwa951-gmail-com-5c17c5d5-27dc-49c3-8cac-669b1a3ec.png"
                    alt="Cisco Introduction to Data Science certificate"
                    loading="lazy"
                    decoding="async"
                    referrerpolicy="no-referrer"
                    @error="fallbackCredentialImage"
                  />
                  <span class="credential-status">CERTIFICATE</span>
                </div>
                <div class="credential-card-copy">
                  <span class="credential-type">CERTIFICATE</span>
                  <h4>Introduction to Data Science</h4>
                  <p>Cisco · 01 September 2026</p>
                </div>
              </article>
              <article class="credential-card">
                <div class="credential-art">
                  <img
                    src="/credentials/credential-placeholder-03.svg"
                    alt="Placeholder artwork for a Life Choices Academy certificate of completion"
                    width="1200"
                    height="760"
                    loading="lazy"
                    decoding="async"
                  />
                  <span class="credential-status">PLACEHOLDER ARTWORK</span>
                </div>
                <div class="credential-card-copy">
                  <span class="credential-type">COURSE COMPLETION</span>
                  <h4>Certificate of Completion</h4>
                  <p>Life Choices Academy · 02 October 2026</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section v-if="currentPage === 'field-notes'" id="field-notes" class="section-wrap">
        <div class="section-kicker"><span class="kicker-rule"></span><span>FIELD NOTES</span><span class="kicker-tail">LESSONS FROM THE WORK</span></div>
        <div class="section-intro"><h2>What the work<br/><em>taught me.</em></h2><p>Lessons from the process of building, debugging and connecting systems.</p></div>
        <div class="field-notes-grid">
          <article class="field-note"><span class="field-note-label">LESSON — JAVASCRIPT</span><h3>The happy path is not enough</h3><p>Early JavaScript taught me to check inputs before calculating and to test more than one outcome. My isPrime logic, validation and edge cases improved when I broke problems into smaller checks and tested beyond a single successful example.</p></article>
          <article class="field-note"><span class="field-note-label">ERROR HANDLING</span><h3>Plan for failure</h3><p>Early validation and error-handling code exposed mistakes in how I checked arrays, types and exceptions. Later projects taught me to think about invalid input and failure states before they became bugs.</p></article>
          <article class="field-note"><span class="field-note-label">LESSON — SCOPE</span><h3>Where data lives</h3><p>Scope taught me that a variable can only be used where it is available. I now think about where data lives, who can access it and how information should move between functions.</p></article>
          <article class="field-note"><span class="field-note-label">GIT NOTE</span><h3>Version control is a workflow</h3><p>Recipe Finder was where Git stopped being just commands. Remote history, branch naming, upstream branches and merge conflicts taught me to understand the error and fix the workflow instead of ignoring it.</p></article>
          <article class="field-note"><span class="field-note-label">LESSON — FRONTEND</span><h3>DOM + interaction</h3><p>Buttons, prompts, event listeners, dynamic cards and timed UI behaviour showed me that JavaScript is not only about calculations — it is also about controlling an interface.</p></article>
          <article class="field-note"><span class="field-note-label">DATABASE NOTE</span><h3>Data supports the workflow</h3><p>A database is not just somewhere to store data. It has to connect correctly to backend logic, respect relationships and support the application's workflows.</p></article>
          <article class="field-note"><span class="field-note-label">LIGHTNING NEWS</span><h3>Research is part of development</h3><p>Web scraping and Three.js were new concepts for our team. Research and experimentation helped us work with Python, Flask, Requests, BeautifulSoup and lxml.</p></article>
          <article class="field-note"><span class="field-note-label">LESSON — DEPLOYMENT</span><h3>ModernTechHR</h3><p>Learning how separate frontend and backend repositories could be developed, deployed and connected to a cloud-hosted MySQL database introduced me to deployment as part of the application architecture.</p></article>
          <article class="field-note"><span class="field-note-label">LESSON — FULL STACK</span><h3>Budget Tracker</h3><p>PostgreSQL persistence, budget-period rollover, timezone handling and Render deployment taught me how the frontend, API and database layers need to work together.</p></article>
          <article class="field-note"><span class="field-note-label">LESSON — PAYMENTS</span><h3>StockWell</h3><p>PayFast taught me that integrations can fail even when a request appears successful. Logging the raw request, checking signatures and adding transaction protection taught me to debug the full system instead of trusting a 200 response.</p></article>
        </div>
        <p class="lessons-summary">{{ profile.lessons }}</p>
      </section>

      <section v-if="currentPage === 'contact'" id="contact" class="contact-section section-wrap">
        <div class="section-kicker"><span class="kicker-rule"></span><span>THE NEXT CONNECTION</span><span class="kicker-tail">CONTACT / OPEN CHANNEL</span></div>
        <div class="contact-heading">
          <div>
            <span class="contact-eyebrow"><Sparkles :size="14" /> THERE'S ALWAYS ANOTHER WAY FORWARD</span>
            <h2>Let's make<br/><em>something meaningful.</em></h2>
          </div>
          <p>Have a project in mind, a question about my work, or an opportunity to discuss? Send me a message using the form.</p>
        </div>
        <div class="contact-layout">
          <aside class="contact-aside">
            <span class="contact-aside-label">A NOTE BEFORE WE BEGIN</span>
            <h3>Good work starts<br/>with a conversation.</h3>
            <p>Share a little context, and I’ll get back to you by replying to the email address you provide.</p>
            <div class="contact-aside-links">
              <a href="https://github.com/butshatengwa951-cmd" target="_blank" rel="noreferrer">GitHub <Github :size="15" /></a>
              <a href="https://www.linkedin.com/in/butsha-tengwa-66378a313/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight :size="14" /></a>
            </div>
          </aside>
          <form class="contact-form" @submit.prevent="submitContactForm">
            <div class="contact-form-grid">
              <label class="contact-field">
                <span>YOUR NAME</span>
                <input v-model="contactForm.name" name="name" type="text" autocomplete="name" placeholder="How should I address you?" maxlength="100" required />
              </label>
              <label class="contact-field">
                <span>YOUR EMAIL</span>
                <input v-model="contactForm.email" name="email" type="email" autocomplete="email" placeholder="you@example.com" maxlength="254" required />
              </label>
            </div>
            <label class="contact-field">
              <span>SUBJECT</span>
              <input v-model="contactForm.subject" name="subject" type="text" placeholder="What would you like to discuss?" maxlength="140" required />
            </label>
            <label class="contact-field">
              <span>MESSAGE</span>
              <textarea v-model="contactForm.message" name="message" rows="6" minlength="10" maxlength="5000" placeholder="Tell me a little about it..." required></textarea>
            </label>
            <input v-model="contactHoneypot" class="contact-honeypot" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <div class="contact-submit-row">
              <p class="contact-form-note">Your email address is used so I can reply to your message.</p>
              <button class="button-primary contact-submit" type="submit" :disabled="contactStatus === 'sending'">
                {{ contactStatus === 'sending' ? 'Sending…' : 'Send message' }} <ArrowUpRight :size="16" />
              </button>
            </div>
            <p v-if="contactStatusMessage" class="contact-feedback" :class="'is-' + contactStatus" role="status" aria-live="polite">{{ contactStatusMessage }}</p>
            <p v-if="!contactEmail" class="contact-setup-note">Email delivery needs to be configured by setting <code>VITE_CONTACT_EMAIL</code> in the hosting build environment.</p>
          </form>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a class="footer-wordmark" href="#/">BT<span>.</span></a>
      <span>DESIGNED WITH INTENTION. BUILT IN MOTION.</span>
      <span>© {{ year }} BUTSHA TENGWA</span>
      <a href="#/" class="back-top">BACK TO TOP ↑</a>
    </footer>
  </div>
</template>