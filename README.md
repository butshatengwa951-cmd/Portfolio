# CASE 001 — THE DEVELOPER
3D Investigative Board Portfolio — Butsha Tengwa

> Don't make a portfolio that *looks* like a detective board. Make the portfolio *itself* a mystery.

## Concept
Visitor investigates: Evidence → Clues → Connections → Discovery. Projects become photographs, skills become evidence tags, red string connects everything.

## Stack
- Vue 3 + Vite
- Three.js (OrbitControls, CanvasTexture for papers)
- No heavy deps — Vue handles portfolio state, Three.js handles scene.

## Quick Start
```bash
npm install
npm run dev
# → http://localhost:3000
```

## How to customize
Edit `src/data/portfolio.js`:
- `person` — your bio, interests, goals
- `projects` — each becomes a Polaroid. Add `subEvidence` for inspectable flows.
- `skills` — evidence tags that highlight projects
- `clues` — verification logic
- `classified` — hidden struggle story

Add your real links in `links: { live, github }`

## Structure
```
src/
  components/
    BoardScene.vue — 3D board, pins, strings, raycasting
    EvidenceInspector.vue — clean modern inspector UI
  data/portfolio.js — all content (edit this)
  App.vue — HUD, log, clue system, solved overlay
```

## Deployment
```bash
npm run build
# deploy dist/ to Vercel / Netlify
```

## Design Notes
- Colors: dark walnut #1c1814, cork #2a211c, paper #e8e0d0, red string #a41d1d, lamp #ffcc88
- Typography: Special Elite for headings, JetBrains Mono for body
- Language: Use Case / Evidence / Clue / Connection / Verified / Classified — not murder tropes
- Board evolves: starts sparse, reveals strings + classified as you investigate

Built with purpose — Three.js is the investigation, Vue is the portfolio.
