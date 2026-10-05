export const portfolio = {
  person: {
    name: "BUTSHA TENGWA",
    fileNo: "BT-001",
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
    { id: "notes", label: "08_NOTES", title: "NOTES", file: "FILE 08" },
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
        { id:1, name:"Community Stock Pack", price: 249, tag:"BESTSELLER" },
        { id:2, name:"Proposal Boost", price: 89, tag:"NEW" },
        { id:3, name:"Voting Power +10", price: 45, tag:"" },
      ]
    },
    moderntechhr: {
      name: "MODERNTECHHR",
      type: "Human resources platform",
      stack: [],
      file: "FILE 03",
      liveUrl: "https://module1-project-hr.onrender.com/",
      description: "Live ModerntechHR project preview embedded directly inside the portfolio folder."
    },
    lightningnews: {
      name: "LIGHTNING NEWS",
      type: "Web scraping news platform",
      stack: [],
      file: "FILE 04",
      liveUrl: "https://lightning-news.netlify.app/",
      description: "Live news platform built around web scraping and presented as an embedded portfolio preview."
    }
  },
  skills: [
    { id:"js", name:"JAVASCRIPT", level:"Core", files:["02","03","04"], related:["ES6+","DOM","Async","Event Handling"] },
    { id:"htmlcss", name:"HTML / CSS", level:"Frontend", files:["02","03","04"], related:["Semantic HTML","Responsive UI","Layouts","Styling"] },
    { id:"vue", name:"VUE.JS", level:"Framework", files:["02"], related:["Components","State","Router","Composition"] },
    { id:"node", name:"NODE / EXPRESS", level:"Backend", files:["02"], related:["REST API","Auth","Middleware","Server Logic"] },
    { id:"mysql", name:"MYSQL", level:"Database", files:["02"], related:["Relational Data","Transactions","Queries","Locks"] },
    { id:"payfast", name:"PAYFAST", level:"Payments", files:["02"], related:["ITN","Webhooks","Signatures","Payment Validation"] },
    { id:"chartjs", name:"CHART.JS", level:"Data UI", files:["03"], related:["Payroll Charts","Analytics","Visualisation"] },
    { id:"scraping", name:"WEB SCRAPING", level:"Data", files:["04"], related:["Data Extraction","News Aggregation","Parsing","Automation"] },
    { id:"python", name:"PYTHON", level:"Backend", files:["04"], related:["Flask","Requests","BeautifulSoup","lxml"] },
  ],
  otherSkills: [
    { id:"php", name:"PHP", description:"Server-side scripting for building dynamic web applications, handling backend logic, forms, sessions, and database-driven features." }
  ],
  journey: [
    {
      year:"MAY 2026",
      title:"HTML + JavaScript foundations",
      note:"05 May — started the JavaScript exercise track. 08–28 May — built out HTML/CSS work and progressively more JavaScript exercises, moving from basic syntax and functions into interactive browser projects."
    },
    {
      year:"MAY–JUN 2026",
      title:"First Python + browser projects",
      note:"19 May — built the Budget Tracker Python mini-toolkit. 08–23 June — developed projects such as Randomizer, Recipe Finder, Cooking Masterclass, the catalogue, and the Food Fest landing page."
    },
    {
      year:"JUL 2026",
      title:"Databases + PHP",
      note:"17 July — worked through the MySQL exercise track. 24–27 July — continued side-project work. 30 July–11 August — moved into the PHP Week 3 exercise series."
    },
    {
      year:"AUG 2026",
      title:"Backend + full-stack direction",
      note:"25 August — started the Module 3 e-commerce project. 27 August–01 September — progressed through the Node.js exercise series, building the backend skills needed for larger applications."
    },
    {
      year:"SEP 2026",
      title:"Vue becomes the framework",
      note:"01 September — started the Vue-3 project. This marked the shift from individual exercises toward component-based application development and the stack that would power the larger projects."
    },
    {
      year:"SEP 2026",
      title:"StockWell shipped",
      note:"17 September — StockWell-demo appeared, followed by the full StockWell e-commerce implementation and project documentation through 18 September. Built a governed e-commerce flow with Vue, Node/Express, MySQL and PayFast."
    },
    {
      year:"SEP–OCT 2026",
      title:"Interactive portfolio experiments",
      note:"21 September — started the interactive-3d-portfolio. Through 01 October, explored the isometric/3D portfolio concept, interaction patterns, previews and project presentation."
    },
    {
      year:"OCT 2026",
      title:"Portfolio / the file system",
      note:"03 October — started the new Portfolio repository. By 05 October, rebuilt it around the detective-folder concept, added live project previews, the Technology Map and the development Journey."
    },
  ]}
