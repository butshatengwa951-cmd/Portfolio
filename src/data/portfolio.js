export const portfolio = {
  person: {
    name: "BUTSHA TENGWA",
    fileNo: "BT-002",
    role: "DEVELOPER / CREATIVE",
    location: "SOUTH AFRICA",
    specialization: "WEB DEVELOPMENT",
    status: "OPEN TO OPPORTUNITIES",
    tagline: "I build products people pay for. Vue ecosystem, payment integrations, product-driven development.",
    background: "Developer and student based in South Africa. Focused on Vue, payment systems, and shipping real products. Self-taught with a bias for building over theorizing.",
    interests: ["Vue.js", "Product Design", "Payment Systems", "Indie Hacking", "Three.js"],
    learning: ["Advanced Three.js / R3F", "System Design", "Rust for tooling"],
    goals: ["Build products people pay for", "Master full-stack architecture", "Open source PayFast toolkit"],
    lessons: "PayFast taught me docs lie and webhooks never arrive when you expect them to."
  },

  files: [
    { id: "profile", label: "01_PROFILE", title: "PROFILE", file: "FILE 01" },
    { id: "stockwell", label: "02_STOCKWELL", title: "STOCKWELL", file: "FILE 02" },
    { id: "moderntechhr", label: "03_MODERNTECHHR", title: "MODERNTECHHR", file: "FILE 03" },
    { id: "lightningnews", label: "04_LIGHTNING_NEWS", title: "LIGHTNING NEWS", file: "FILE 04" },
    { id: "skills", label: "05_SKILLS", title: "SKILLS", file: "FILE 05" },
    { id: "journey", label: "06_JOURNEY", title: "JOURNEY", file: "FILE 06" },
    { id: "contact", label: "07_CONTACT", title: "CONTACT", file: "FILE 07" },
    { id: "notes", label: "08_NOTES", title: "NOTES", file: "FILE 08" }
  ],

  projects: {
    stockwell: {
      name: "STOCKWELL",
      type: "E-commerce platform",
      stack: ["Vue", "JavaScript", "Node", "PayFast"],
      file: "FILE 02",
      description: "Full e-commerce with proposals, voting, cart and wallet system. Built to handle real payments.",
      problem: "Existing community proposals were fragmented across chats and sheets. No voting, no wallet, no payment traceability.",
      build: "Vue frontend, Node API, PayFast ITN integration, wallet ledger with idempotency keys, cart persistence, proposal engine with vote weighting.",
      challenge: "CAUSE: PayFast ITN handler expected x-www-form-urlencoded but received JSON. Logs showed 200 OK but wallet never updated. Signature mismatch due to param ordering.\n\nINVESTIGATION: Replay webhooks, log raw body, compare sorted params.\n\nRESOLUTION: Parse raw body, verify signature with sorted params, implement transaction lock + idempotency.\n\nLESSON: Never trust happy path.",
      products: [
        { id: 1, name: "Community Stock Pack", price: 249, tag: "BESTSELLER" },
        { id: 2, name: "Proposal Boost", price: 89, tag: "NEW" },
        { id: 3, name: "Voting Power +10", price: 45, tag: "" }
      ]
    },

    moderntechhr: {
      name: "MODERNTECHHR",
      type: "Human resources platform",
      stack: ["JavaScript", "HTML/CSS", "Chart.js"],
      file: "FILE 03",
      liveUrl: "https://module1-project-hr.onrender.com/",
      description: "HR management platform with employee records, payroll calculations, filtering, modal workflows and data visualisation."
    },

    lightningnews: {
      name: "LIGHTNING NEWS",
      type: "Web scraping news platform",
      stack: ["Python", "Flask", "BeautifulSoup", "Requests"],
      file: "FILE 04",
      liveUrl: "https://lightning-news.netlify.app/",
      description: "Live news platform powered by Python web scraping, RSS/XML parsing, data cleaning and a Flask API.",
      problem: "The project focus was to explore how a news platform could automatically collect and organise information from multiple online sources instead of relying on manually entered content.",
      build: "Built the platform around a Python scraping backend using Requests, BeautifulSoup and lxml, with Flask providing API routes between the scraper and frontend. We worked with RSS/XML feeds as well as webpage content, created source-specific and generic scrapers, extracted article metadata, stored raw JSON data, cleaned the results and exposed scraping, search and statistics functionality through the API.",
      challenge: "One challenge our team overcame was learning webscraping and three.js due to it being a new concept for us which we solved by doing in depth research."
    }
  },

  skills: [
    { id: "js", name: "JAVASCRIPT", level: "Core", files: ["02", "03", "04"], related: ["ES6+", "DOM", "Async", "Event Handling"] },
    { id: "htmlcss", name: "HTML / CSS", level: "Frontend", files: ["02", "03", "04"], related: ["Semantic HTML", "Responsive UI", "Layouts", "Styling"] },
    { id: "vue", name: "VUE.JS", level: "Framework", files: ["02"], related: ["Components", "State", "Router", "Composition"] },
    { id: "node", name: "NODE / EXPRESS", level: "Backend", files: ["02"], related: ["REST API", "Auth", "Middleware", "Server Logic"] },
    { id: "mysql", name: "MYSQL", level: "Database", files: ["02"], related: ["Relational Data", "Transactions", "Queries", "Locks"] },
    { id: "payfast", name: "PAYFAST", level: "Payments", files: ["02"], related: ["ITN", "Webhooks", "Signatures", "Payment Validation"] },
    { id: "chartjs", name: "CHART.JS", level: "Data UI", files: ["03"], related: ["Payroll Charts", "Analytics", "Visualisation"] },
    { id: "scraping", name: "WEB SCRAPING", level: "Data", files: ["04"], related: ["Data Extraction", "News Aggregation", "Parsing", "Automation"] },
    { id: "python", name: "PYTHON", level: "Backend", files: ["04"], related: ["Flask", "Requests", "BeautifulSoup", "lxml"] }
  ],

  otherSkills: [
    {
      id: "php",
      name: "PHP",
      description: "Server-side scripting for building dynamic web applications, handling backend logic, forms, sessions, and database-driven features."
    }
  ],

  journey: [
    {
      year: "MAY 2026",
      title: "HTML, CSS + JavaScript foundations",
      note: "05–28 May — started with HTML/CSS structure and styling, then moved into JavaScript fundamentals, functions, DOM manipulation and event-driven browser behaviour through the Week 3–4 exercise work."
    },
    {
      year: "MAY–JUN 2026",
      title: "Interactive browser projects",
      note: "19 May–23 June — applied the fundamentals to practical projects including the Python Budget Tracker, Randomizer, Recipe Finder, Cooking Masterclass, catalogue work and a Food Fest landing page. Learned to turn isolated exercises into complete user-facing experiences."
    },
    {
      year: "JUL 2026",
      title: "ModerntechHR — building a real front-end system",
      note: "July — developed the ModerntechHR HR platform and learned to structure multi-page interfaces around real workflows: employee management, payroll calculations, search/filtering, modal interactions, responsive layouts, dynamic DOM updates and Chart.js data visualisation."
    },
    {
      year: "JUL–AUG 2026",
      title: "PHP + backend foundations",
      note: "30 July–11 August — progressed through the PHP exercise series while strengthening server-side thinking, form handling and application logic. This built the bridge from browser-only JavaScript work toward backend development."
    },
    {
      year: "AUG 2026",
      title: "Lightning News — Python web scraping",
      note: "20 July–07 August — with Team Charlie, learned Python web scraping and backend API development using Flask, Requests, BeautifulSoup, lxml and RSS/XML parsing. Built source-specific and generic scrapers, extracted article metadata, saved raw JSON, cleaned datasets and exposed scraping/search/statistics functionality through API routes and tests."
    },
    {
      year: "AUG–SEP 2026",
      title: "Node.js + full-stack architecture",
      note: "25 August–01 September — started the Module 3 e-commerce work and progressed through the Node.js exercise series. Learned how frontend applications communicate with REST APIs, how backend logic is structured, and how databases, authentication and server-side business rules fit together."
    },
    {
      year: "SEP 2026",
      title: "Vue becomes the framework",
      note: "01 September — moved into Vue and component-based application development, learning reactive state, reusable components, routing and structured frontend architecture."
    },
    {
      year: "SEP 2026",
      title: "StockWell — first serious full-stack build",
      note: "17–18 September — turned the accumulated skills into StockWell: Vue 3 + Node/Express + MySQL + PayFast, with authentication, supplier comparison, cart, proposals, majority voting, governed wallet payments, orders and delivery tracking. Learned transactional thinking, role-based authorization and payment/webhook handling."
    },
    {
      year: "SEP–OCT 2026",
      title: "Interactive portfolio experiments",
      note: "21 September–01 October — explored the interactive 3D portfolio, isometric interfaces, animation, interaction patterns and embedded project previews before evolving the presentation into the current portfolio system."
    },
    {
      year: "OCT 2026",
      title: "Portfolio — turning the work into a case file",
      note: "03–05 October — rebuilt the portfolio around the detective-folder concept, bringing the projects together with live previews, a technology-to-project map, persistent evidence selection and a chronological development journey."
    }
  ]
};
