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
    { id:"vue", name:"VUE.JS", level:"Primary", files:["02","03","01"], related:["Components","State","Routing","Composition"] },
    { id:"js", name:"JAVASCRIPT", level:"Core", files:["02","01"], related:["ES6+","Async","DOM"] },
    { id:"payfast", name:"PAYFAST", level:"Integration", files:["02"], related:["Webhooks","ITN","Signatures"] },
    { id:"node", name:"NODE.JS", level:"Backend", files:["02"], related:["API","Auth","Ledger"] },
    { id:"firebase", name:"FIREBASE", level:"Realtime", files:["03"], related:["Firestore","Auth"] },
    { id:"three", name:"THREE.JS", level:"Creative", files:["01"], related:["Scenes","Shaders"] },
  ],
  journey: [
    { year:"2023", title:"Started Vue", note:"First component, first bug, first love. Built portfolio v1." },
    { year:"2024", title:"PayFast integration hell", note:"The month webhooks broke me and then taught me everything about idempotency." },
    { year:"2024", title:"StockWell shipped", note:"Proposals, voting, cart, wallet — first real e-commerce flow live." },
    { year:"2025", title:"Folder concept", note:"Stopped making pretty pages. Started making containers with meaning." },
  ]
}
