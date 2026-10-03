# BUTSHA TENGWA — PERSONAL FILE BT-001
Physical folder portfolio. Everything belongs inside the file.

## Concept
Landing = closed folder on walnut desk (#2b211b). Click OPEN FILE → folder opens with animation. Inner border 14px walnut never goes away. Navigation = sorting through files inside same container.

## Stack
Vue 3 + Vite — no Three.js, pure CSS physicality (shadows, paper texture, grain, perspective).

## Run
```bash
npm install
npm run dev
# http://localhost:3000
```

## Customize
Edit `src/data/portfolio.js`:
- person — name, role, tagline
- projects.stockwell / voyabite — products, menu, challenge text
- skills — tags that connect to files
- journey — timeline log

Replace preview content in:
- `StockwellFile.vue` — recreate your real StockWell UI or embed screenshot
- `VoyaFile.vue` — menu + tracking
- `ProfileFile.vue` — photo: replace .clip-photo BT with <img src="/your-photo.jpg" />

## Design System
- Walnut: #2b211b desk, #231b16 folder
- Paper: #eee6d7, #f5efe0, #fffdf7
- Red: #a32626 for status, stamps, active
- Tan: #d6a66f accents
- Fonts: Special Elite (headings/file labels), JetBrains Mono (body/typewriter)

## Structure
Closed folder → Open animation (rotateX) → File tabs [01_PROFILE] ... [07_NOTES] → Current file document → Stacked papers indicator FILE X OF 7

Key interaction: StockWell preview — Add to Cart works INSIDE folder, proving "project lives inside portfolio, no new tab".

## Deploy
```bash
npm run build
# dist/ → Vercel / Netlify
```

Rule: Everything belongs inside the file.
