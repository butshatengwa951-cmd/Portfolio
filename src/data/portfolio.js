export const portfolio = {
  person: {
    name: "BUTSHA TENGWA",
    fileNo: "BT-002",
    role: "FULL-STACK DEVELOPER / CREATIVE",
    location: "SOUTH AFRICA",
    specialization: "WEB DEVELOPMENT",
    status: "OPEN TO OPPORTUNITIES",
    tagline: "I develop full-stack web applications with a focus on intuitive user experiences, combining strong frontend experiences with robust backend architecture and data-driven systems.",
    background: "Developer trained through the Life Choices Academy YouthCode programme/project. My development journey has grown from HTML, CSS and JavaScript into full-stack web development with Vue, Node/Express, MySQL, PostgreSQL, Python, Flask, REST APIs, web scraping, payment integrations and cloud deployment. I learn by building, researching difficult concepts and turning what I learn into working projects.",
    currentObjective: "Explore new and creative ways for users to interact with web applications while developing a distinctive approach, perspective and identity as a developer.",
    interests: ["Backend Development", "Backend Architecture", "APIs & Integrations", "Databases & Data Systems", "Full-Stack Development", "Interactive Web Experiences", "Creative UI/UX"],
    learning: ["Advanced Three.js / R3F", "Interaction Design", "Web Animation & Motion", "Creative Frontend Architecture", "System Design", "Backend Architecture"],
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
      access: { requiresLogin: true, title: "ACCOUNT ACCESS", detail: "Login is required for member features. The live project provides a Sign Up flow for creating an account; no shared demo credentials are published in the project source." },
      description: "StockWell is a full e-commerce platform built around community purchasing, supplier comparison and shared decision-making. It combines a Vue frontend with Node/Express backend services, MySQL persistence and PayFast payments to support authentication, cart management, proposals, majority voting, wallet transactions, orders and delivery workflows. The project was designed as a complete product flow rather than a collection of isolated pages, with the frontend, business rules, database operations and payment processing working together.",
      problem: "Existing community proposals were fragmented across chats and sheets. No voting, no wallet, no payment traceability.",
      build: "Vue frontend, Node API, PayFast ITN integration, wallet ledger with idempotency keys, cart persistence, proposal engine with vote weighting.",
      challenge: "The main challenge was making the PayFast payment flow reliable all the way from checkout to the wallet ledger. An early version appeared to succeed because the webhook returned a 200 response, but the wallet was not being updated correctly and the PayFast signature could fail when parameters were handled in the wrong order. I worked through the issue by logging and replaying the raw ITN request, checking how the payload was encoded and signed, validating the parameters in the correct order, and then adding transaction protection and idempotency so a payment could not be processed twice. The experience reinforced the importance of tracing an integration across the entire system instead of assuming a successful HTTP response means the business operation succeeded.",
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
      description: "Budget Tracker is a full-stack productivity application that brings personal budgeting, task management and study planning into one responsive dashboard. The application supports persistent transactions, configurable daily, weekly, monthly and yearly budget cycles, budget history, task workflows and study sessions while keeping the underlying data in PostgreSQL. It grew from a Python command-line toolkit into a deployed Vue 3 and Flask application, giving the project a clear separation between the user interface, API layer and database.",
      problem: "The original project started as a Python command-line productivity suite. The challenge was turning those separate budget, task and study tools into a practical web application with persistent data, clear workflows and a deployable full-stack architecture.",
      build: "Rebuilt the experience as a Vue 3 + Vite frontend backed by a Flask REST API and PostgreSQL database. Added persistent transactions, configurable daily/weekly/monthly/yearly budget periods, budget history, task management, study planning with seconds/minutes/hours, South African local date handling and production deployment through Render.",
      challenge: "The biggest challenge was moving the original local Python toolkit into a real full-stack application without losing data integrity or introducing inconsistent dates and state. I had to work through the database layer, API communication, South African local date handling, production dependencies and Render configuration while keeping the budget-cycle logic predictable when periods rolled over. Solving those issues meant testing the application across the frontend, Flask API and PostgreSQL layers rather than treating deployment as a separate final step, and it gave me a much clearer understanding of how a production application behaves outside a local development environment."
    },

    moderntechhr: {
      name: "MODERNTECHHR",
      type: "Human resources platform",
      stack: ["JavaScript", "HTML/CSS", "MySQL", "Chart.js"],
      file: "FILE 03",
      access: { requiresLogin: true, title: "LOGIN DETAILS", detail: "The live application requires a username and password. The project repository does not publish a working demo account, so the portfolio does not display unverified credentials." },
      liveUrl: "https://module1-project-hr.onrender.com/",
      description: "ModernTechHR is an HR management platform designed to bring employee records, attendance, payroll, leave management and reporting into one organised interface. JavaScript drives the dynamic workflows, including employee data updates, searching, filtering, payroll calculations and modal interactions, while Chart.js turns the underlying HR information into visual reports. The project also introduced the practical challenge of connecting separately deployed frontend and backend services to a cloud-hosted MySQL database, making it a useful step toward more complete full-stack development.",
      problem: "The project objective was to build an interactive HR management system that could bring employee information, payroll, searching, filtering and reporting features together in one organised platform.",
      build: "Built the frontend around HTML/CSS and JavaScript with dynamic employee data, DOM manipulation, search and filtering, modal workflows and payroll calculations. Chart.js was used to turn HR and payroll data into visual reports, while the application was structured so the frontend and backend could be developed, deployed and connected as separate parts of the system.",
      challenge: "The main challenge was understanding how separate frontend and backend repositories could be developed, deployed and connected as one application. This was also our first experience deploying an application outside GitHub and working with a cloud-hosted MySQL database, so several parts of the workflow were new to us at once. We overcame it through research, testing the communication between services, configuring the deployment correctly and learning how the frontend, backend and database each fit into the final system."
    },

    lightningnews: {
      name: "LIGHTNING NEWS",
      type: "Web scraping news platform",
      stack: ["Python", "Flask", "BeautifulSoup", "Requests", "Three.js"],
      file: "FILE 04",
      liveUrl: "https://lightning-news.netlify.app/",
      description: "Lightning News is a news aggregation platform built around automated data collection rather than manually entered articles. Python handles web scraping and feed processing with Requests, BeautifulSoup and lxml, while Flask exposes the collected and cleaned information through API routes for the frontend. The project explores the full path from external sources to structured data, including source-specific and generic scrapers, RSS/XML parsing, metadata extraction, raw JSON storage, cleaning, searching and statistics.",
      problem: "The project focus was to explore how a news platform could automatically collect and organise information from multiple online sources instead of relying on manually entered content.",
      build: "Built the platform around a Python scraping backend using Requests, BeautifulSoup and lxml, with Flask providing API routes between the scraper and frontend. We worked with RSS/XML feeds as well as webpage content, created source-specific and generic scrapers, extracted article metadata, stored raw JSON data, cleaned the results and exposed scraping, search and statistics functionality through the API.",
      challenge: "The main challenge was learning two unfamiliar areas at the same time: web scraping and Three.js. We had to understand how different news sources expose information, how to parse inconsistent HTML and RSS/XML structures, and how to approach interactive 3D work without an established workflow to rely on. We overcame that gap through in-depth research, experimentation and repeated testing, then applied what we learned to the scraping pipeline, Flask API and interactive presentation. The project taught us that researching an unfamiliar technology is part of the development process, not something that happens separately from it."
    }
  },

  skills: [
    { id: "js", name: "JAVASCRIPT", level: "Core", files: ["02", "03", "04", "05"], related: ["ES6+", "DOM", "Async", "Event Handling"] },
    { id: "htmlcss", name: "HTML / CSS", level: "Frontend", files: ["02", "03", "04", "05"], related: ["Semantic HTML", "Responsive UI", "Layouts", "Styling"] },
    { id: "vue", name: "VUE.JS", level: "Framework", files: ["02", "05"], related: ["Components", "State", "Router", "Composition"] },
    { id: "node", name: "NODE / EXPRESS", level: "Backend", files: ["02"], related: ["REST API", "Auth", "Middleware", "Server Logic"] },
    { id: "mysql", name: "MYSQL", level: "Database", files: ["02", "03"], related: ["Relational Data", "Transactions", "Queries", "Locks"] },
    { id: "payfast", name: "PAYFAST", level: "Payments", files: ["02"], related: ["ITN", "Webhooks", "Signatures", "Payment Validation"] },
    { id: "chartjs", name: "CHART.JS", level: "Data UI", files: ["03"], related: ["Payroll Charts", "Analytics", "Visualisation"] },
    { id: "scraping", name: "WEB SCRAPING", level: "Data", files: ["04"], related: ["Data Extraction", "News Aggregation", "Parsing", "Automation"] },
    { id: "threejs", name: "THREE.JS", level: "3D / INTERACTION", files: ["04"], related: ["3D Scenes", "Animation", "Interaction", "Visualisation"] },
    { id: "python", name: "PYTHON", level: "Backend", files: ["04", "05"], related: ["Flask", "Requests", "BeautifulSoup", "lxml"] },
    { id: "flask", name: "FLASK", level: "Backend", files: ["04", "05"], related: ["REST API", "Routes", "JSON", "CORS"] },
    { id: "postgresql", name: "POSTGRESQL", level: "Database", files: ["05"], related: ["Relational Data", "Migrations", "Queries", "Persistence"] },
    { id: "render", name: "RENDER", level: "Deployment", files: ["03", "05"], related: ["Web Services", "Static Sites", "Environment Variables", "Production"] }
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
      title: "Budget Tracker — full-stack persistence + deployment",
      note: "02–05 October — rebuilt the original Python budget/productivity toolkit as a Vue 3 + Flask application backed by PostgreSQL. Added persistent transactions, configurable budget cycles, budget history, task management and study planning, then deployed the frontend and API through Render with a cloud-hosted database.",
    },
    {
      year: "OCT 2026",
      title: "Exploring identity through interactive web development",
      note: "As my technical foundation has grown, my focus has started shifting beyond simply learning new technologies. I am exploring new and creative ways for users to interact with web applications, experimenting with motion, 3D, interface design and unconventional presentation. The goal is not only to build functional applications, but to develop a distinct perspective and identity as a developer."
    },
    {
      year: "OCT 2026",
      title: "Portfolio — turning the work into a case file",
      note: "03–05 October — rebuilt the portfolio around the detective-folder concept, bringing the projects together with live previews, a technology-to-project map, persistent evidence selection and a chronological development journey."
    }

  ]
};
