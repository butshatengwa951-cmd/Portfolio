export const portfolio = {
  person: {
    name: "BUTSHA TENGWA",
    role: "Developer / Student",
    objective: "Building better things",
    location: "South Africa",
    background: "Focused on Vue ecosystem, payment integrations, and product-driven development. Self-taught, ship-fast mentality.",
    interests: ["Vue.js", "Product Design", "Payment Systems", "Indie Hacking"],
    learning: ["Advanced Three.js", "System Design", "Rust"],
    goals: ["Build products people pay for", "Master full-stack architecture"],
    lessons: "PayFast taught me that docs lie and webhooks never arrive when you expect them to."
  },
  projects: [
    {
      id: "stockwell",
      label: "EVIDENCE 04",
      name: "STOCKWELL",
      type: "E-commerce platform",
      stack: ["Vue", "JavaScript", "PayFast", "Node.js"],
      status: "COMPLETE",
      progress: 100,
      description: "Full e-commerce platform with proposals, voting, cart and wallet system.",
      subEvidence: [
        { id: "payment", label: "PAYMENT", title: "PAYFAST INTEGRATION", flow: ["Customer","Checkout","PayFast","Payment response","Backend","Wallet"], note: "Hardest part: webhook verification and idempotency." },
        { id: "cart", label: "CART", title: "CART SYSTEM", flow: ["Browse","Add to cart","Persist","Checkout"] },
        { id: "proposals", label: "PROPOSALS", title: "PROPOSAL ENGINE", flow: ["User creates proposal","Community votes","Stock allocation"] },
        { id: "database", label: "DATABASE", title: "DATA MODEL", flow: ["Users","Products","Orders","Wallets","Transactions"] }
      ],
      links: { live: "#", github: "#" }
    },
    {
      id: "voyabite",
      label: "EVIDENCE 06",
      name: "VOYA BITE",
      type: "Food delivery prototype",
      stack: ["Vue", "Firebase", "Tailwind"],
      status: "ARCHIVED",
      progress: 85,
      description: "Hyperlocal food delivery UI with real-time menu and order tracking.",
      subEvidence: [
        { id: "realtime", label: "REALTIME", title: "FIREBASE SYNC", flow: ["Order placed","Kitchen sees","Status push","Customer tracking"] }
      ],
      links: { live: "#", github: "#" }
    },
    {
      id: "portfolio",
      label: "EVIDENCE 01",
      name: "CASE 001 — THE DEVELOPER",
      type: "This portfolio",
      stack: ["Vue", "Three.js", "Vite"],
      status: "IN PROGRESS",
      progress: 90,
      description: "The investigative board you're investigating right now.",
      subEvidence: [],
      links: {}
    }
  ],
  skills: [
    { id: "vue", name: "VUE.JS", level: "Primary", foundIn: ["stockwell","voyabite","portfolio"], related: ["COMPONENTS","STATE","ROUTING"] },
    { id: "js", name: "JAVASCRIPT", level: "Core", foundIn: ["stockwell","portfolio"], related: ["ES6+","Async"] },
    { id: "payfast", name: "PAYFAST", level: "Integration", foundIn: ["stockwell"], related: ["Webhooks","Payments"] },
    { id: "three", name: "THREE.JS", level: "Creative", foundIn: ["portfolio"], related: ["Shaders","Scenes"] },
    { id: "node", name: "NODE.JS", level: "Backend", foundIn: ["stockwell"], related: ["API","Auth"] }
  ],
  clues: [
    { id: 1, text: "Find the project involving payments.", check: (discovered) => discovered.has('stockwell'), reward: "PayFast tag + connection revealed" },
    { id: 2, text: "Which technology appears across all projects?", check: (discovered) => discovered.has('vue'), reward: "Vue connections glow" },
    { id: 3, text: "Uncover a classified struggle.", check: (discovered) => discovered.has('classified'), reward: "Case Note #07 unlocked" }
  ],
  classified: {
    id: "classified",
    label: "EVIDENCE [CLASSIFIED]",
    title: "CASE NOTE #07",
    subtitle: "INITIAL PAYMENT FLOW FAILED",
    body: "CAUSE: PayFast ITN handler expected application/x-www-form-urlencoded but received JSON.\n\nINVESTIGATION: Logs showed 200 OK but wallet never updated. Webhook replay revealed signature mismatch due to param ordering.\n\nRESOLUTION: Rebuilt handler to parse raw body, verify signature with sorted params, implement idempotency key + transaction lock.\n\nLESSON: Never trust the happy path. Log everything."
  }
}
