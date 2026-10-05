export const portfolio = {
  person: {
    name: "BUTSHA TENGWA",
    fileNo: "BT-002",
    role: "FULL-STACK DEVELOPER / CREATIVE",
    location: "SOUTH AFRICA",
    specialization: "WEB DEVELOPMENT",
    status: "OPEN TO OPPORTUNITIES",
    tagline: "I build interactive web applications, real product workflows and systems that connect the frontend, backend and database.",
    background: "Developer trained through the Life Choices Academy YouthCode programme/project. My development journey has grown from HTML, CSS and JavaScript into full-stack web development with Vue, Node/Express, MySQL, Python, Flask, web scraping, REST APIs and payment integrations. I learn by building, researching difficult concepts and turning what I learn into working projects.",
    currentObjective: "Build polished, practical products while continuing to strengthen my full-stack architecture, cloud deployment and interactive web development skills.",
    interests: ["Full-Stack Development", "Vue.js", "Product Design", "Payment Systems", "Interactive Web", "Three.js"],
    learning: ["Advanced Three.js / R3F", "System Design", "Cloud Deployment", "Backend Architecture"],
    goals: ["Build products people can actually use", "Master full-stack architecture", "Build reliable payment integrations", "Create more advanced interactive web experiences"],
    lessons: "Real projects taught me that development is as much about researching, debugging and connecting systems as it is about writing code."
  },

  files: [
    { id: "profile", label: "01_PROFILE", title: "PROFILE", file: "FILE 01" },
    { id: "stockwell", label: "02_STOCKWELL", title: "STOCKWELL", file: "FILE 02" },
    { id: "moderntechhr", label: "03_MODERNTECHHR", title: "MODERNTECHHR", file: "FILE 03" },
    { id: "lightningnews", label: "04_LIGHTNING_NEWS", title: "LIGHTNING NEWS", file: "FILE 04" },
    { id: "budgettracker", label: "05_BUDGET_TRACKER", title: "BUDGET TRACKER", file: "FILE 05" },
    { id: "skills", label: "06_SKILLS", title: "SKILLS", file: "FILE 06" },
    { id: "journey", label: "07_JOURNEY", title: "JOURNEY", file: "FILE 07" },
    { id: "contact", label: "08_CONTACT", title: "CONTACT", file: "FILE 08" },
    { id: "notes", label: "09_NOTES", title: "NOTES", file: "FILE 09" }
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

    budgettracker: {
      name: "BUDGET TRACKER",
      type: "Full-stack productivity and budget application",
      stack: ["Vue 3", "Flask", "PostgreSQL", "Render"],
      file: "FILE 05",
      liveUrl: "https://budget-tracker-frontend-jf66.onrender.com",
      displayUrl: "budget-tracker-frontend-jf66.onrender.com",
      description: "Full-stack productivity suite combining budget tracking, tasks and study planning with persistent database storage, configurable budget cycles and a responsive dashboard.",
      problem: "The original project started as a Python command-line productivity suite. The challenge was turning those separate budget, task and study tools into a practical web application with persistent data, clear workflows and a deployable full-stack architecture.",
      build: "Rebuilt the experience as a Vue 3 + Vite frontend backed by a Flask REST API and PostgreSQL database. Added persistent transactions, configurable daily/weekly/monthly/yearly budget periods, budget history, task management, study planning with seconds/minutes/hours, South African local date handling and production deployment through Render.",
      challenge: "One of the biggest challenges was moving from local development to a real cloud deployment while keeping data persistent and dates accurate. The project required debugging the database layer, timezone handling, production dependencies and Render deployment configuration. The final result connects the Vue frontend to a Flask API and PostgreSQL database hosted in the cloud, with the database separated from the frontend so user data can persist independently of the interface."
    },

    moderntechhr: {
      name: "MODERNTECHHR",
      type: "Human resources platform",
      stack: ["JavaScript", "HTML/CSS", "Chart.js"],
      file: "FILE 03",
      liveUrl: "https://module1-project-hr.onrender.com/",
      description: "HR management platform with employee records, payroll calculations, filtering, modal workflows and data visualisation.",
      problem: "The project objective was to build an interactive HR management system that could bring employee information, payroll, searching, filtering and reporting features together in one organised platform.",
      build: "Built the frontend around HTML/CSS and JavaScript with dynamic employee data, DOM manipulation, search and filtering, modal workflows and payroll calculations. Chart.js was used to turn HR and payroll data into visual reports, while the application was structured so the frontend and backend could be developed, deployed and connected as separate parts of the system.",
      challenge: "One challenge we overcame was figuring out how to deploy a backend repository and frontend repository separately while still developing and connecting both repos as one application. This was also our first time deploying a MySQL database and deploying an application in general to a cloud server outside of GitHub. We solved this by researching deployment workflows, configuring the separate services and database connection, and learning how the frontend, backend and cloud-hosted database communicate in a deployed environment."
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
