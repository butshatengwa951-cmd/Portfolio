export const portfolio = {
  links: {
    email: 'butsha.tengwa@gmail.com',
    github: 'https://github.com/butshatengwa951-cmd',
    linkedin: 'https://www.linkedin.com/'
  },

  person: {
    name: 'BUTSHA TENGWA',
    role: 'Developer / Student',
    objective: 'Building better things',
    location: 'South Africa',

    // Replace this URL with /assets/profile.jpg when you add your own local portrait.
    // The current fallback is the GitHub profile avatar so the board is not empty.
    portrait: 'https://avatars.githubusercontent.com/u/274642102?v=4',

    background:
      'Focused on building polished web experiences, learning through real projects, and turning difficult implementation problems into working systems.',

    interests: [
      'Vue.js',
      'Product Design',
      'Interactive Interfaces',
      'Payment Systems'
    ],

    learning: [
      'Advanced Three.js',
      'System Design',
      'Better UX',
      'Full-stack architecture'
    ],

    goals: [
      'Build products people actually use',
      'Become a stronger full-stack developer'
    ],

    lessons:
      'The difficult parts of development are usually where the useful lessons are.'
  },

  projects: [
    {
      id: 'stockwell',
      label: 'EVIDENCE 04',
      name: 'STOCKWELL',
      type: 'E-commerce platform',
      stack: ['Vue', 'JavaScript', 'PayFast', 'Node.js'],
      status: 'COMPLETE',
      progress: 100,
      description:
        'A full e-commerce platform with shopping, supplier comparison, cart, proposals, voting, wallet and delivery flows.',

      subEvidence: [
        {
          id: 'payment',
          label: 'PAYMENT',
          title: 'PAYFAST INTEGRATION',
          flow: ['Customer', 'Checkout', 'PayFast', 'Payment response', 'Backend', 'Wallet'],
          note:
            'The payment flow was one of the hardest parts of the project because the sandbox response and wallet state had to remain consistent.'
        },
        {
          id: 'cart',
          label: 'CART',
          title: 'CART SYSTEM',
          flow: ['Browse', 'Add to cart', 'Persist', 'Checkout']
        },
        {
          id: 'proposals',
          label: 'PROPOSALS',
          title: 'GROUP PROPOSAL FLOW',
          flow: ['Create proposal', 'Community votes', 'Majority reached', 'Approval']
        },
        {
          id: 'database',
          label: 'DATA',
          title: 'DATA MODEL',
          flow: ['Users', 'Products', 'Orders', 'Wallets', 'Transactions']
        }
      ],

      links: {
        live: 'https://stockwell-hl1e.onrender.com/'
      }
    },

    {
      id: 'voyabite',
      label: 'EVIDENCE 06',
      name: 'VOYA BITE',
      type: 'Travel / booking web project',
      stack: ['HTML', 'CSS', 'JavaScript'],
      status: 'ARCHIVED',
      progress: 90,
      description:
        'A travel experience interface with services, booking interactions, filtering and a live booking ledger concept.',

      subEvidence: [
        {
          id: 'booking',
          label: 'BOOKING',
          title: 'BOOKING FLOW',
          flow: ['Browse experience', 'Filter', 'Book', 'Ledger update']
        }
      ],

      links: {}
    },

    {
      id: 'portfolio',
      label: 'EVIDENCE 01',
      name: 'CASE 001 — THE DEVELOPER',
      type: 'This portfolio',
      stack: ['Vue', 'Three.js', 'Vite'],
      status: 'IN PROGRESS',
      progress: 90,
      description:
        'A 3D investigative board that turns the portfolio into an interactive case file.',

      subEvidence: [
        {
          id: 'scene',
          label: 'SCENE',
          title: 'THREE.JS BOARD',
          flow: ['Scene', 'Camera', 'Evidence', 'Raycasting', 'Interaction']
        }
      ],

      links: {
        github: 'https://github.com/butshatengwa951-cmd/Portfolio'
      }
    }
  ],

  skills: [
    {
      id: 'vue',
      name: 'VUE.JS',
      level: 'Primary',
      foundIn: ['stockwell', 'voyabite', 'portfolio'],
      related: ['COMPONENTS', 'STATE', 'ROUTING']
    },
    {
      id: 'js',
      name: 'JAVASCRIPT',
      level: 'Core',
      foundIn: ['stockwell', 'voyabite', 'portfolio'],
      related: ['ES6+', 'ASYNC', 'DOM']
    },
    {
      id: 'payfast',
      name: 'PAYFAST',
      level: 'Integration',
      foundIn: ['stockwell'],
      related: ['WEBHOOKS', 'PAYMENTS']
    },
    {
      id: 'node',
      name: 'NODE.JS',
      level: 'Backend',
      foundIn: ['stockwell'],
      related: ['API', 'AUTH']
    },
    {
      id: 'three',
      name: 'THREE.JS',
      level: 'Creative',
      foundIn: ['portfolio'],
      related: ['SCENE', 'CAMERA', 'RAYCASTING']
    }
  ],

  clues: [
    {
      id: 1,
      text: 'Find the project involving payments.',
      check: discovered => discovered.has('stockwell'),
      reward: 'PAYFAST CONNECTION REVEALED'
    },
    {
      id: 2,
      text: 'Which technology appears across the project evidence?',
      check: discovered => discovered.has('vue'),
      reward: 'VUE CONNECTIONS REVEALED'
    },
    {
      id: 3,
      text: 'Uncover the classified development struggle.',
      check: discovered => discovered.has('classified'),
      reward: 'CASE NOTE #07 DECLASSIFIED'
    }
  ],

  classified: {
    id: 'classified',
    label: 'EVIDENCE [CLASSIFIED]',
    title: 'CASE NOTE #07',
    subtitle: 'INITIAL PAYMENT FLOW FAILED',
    body:
      'INVESTIGATION LOG\\n\\nThe PayFast flow looked successful on the happy path, but the wallet state did not update as expected.\\n\\nThe investigation focused on the callback data, verification flow, persistence and the gap between a payment response and the application state.\\n\\nRESOLUTION\\n\\nTreat payment notifications as their own backend workflow, validate the incoming data, log every transition, and keep the update idempotent.\\n\\nLESSON\\n\\nNever trust the happy path. Log everything.'
  }
}
