# BUTSHA TENGWA — PERSONAL FILE BT-002

**CASE 002 — EST. 2026**

An interactive developer portfolio presented as a physical case file. Instead of a traditional portfolio website, the entire experience is designed to feel like opening and investigating a personal developer file.


## Concept

The portfolio opens as a closed case folder sitting on a dark walnut desk.

- **Closed state** — the landing page presents the portfolio as a physical folder.
- **Open File** — opens the case with a physical-style animation.
- **File tabs** — projects, skills, journey, profile and contact live inside the same folder.
- **Paper interface** — each section is presented as a document inside the case.
- **Project previews** — selected projects can be explored directly inside the portfolio.
- **Evidence-style presentation** — technologies, projects and development history are connected as part of the case-file experience.

The goal is to make the portfolio feel less like navigating a collection of webpages and more like discovering the developer behind the work.

## Projects

### 01 — Profile
Background, development philosophy, interests, goals and current direction.

### 02 — StockWell
Full-stack community e-commerce platform built with Vue, Node/Express, MySQL and PayFast.

Key areas:
- Authentication and role-based workflows
- Supplier comparison
- Cart and checkout
- Community proposals
- Majority voting
- Group wallet
- PayFast payment integration
- Orders and delivery workflows

### 03 — ModernTechHR
Human resources management platform using JavaScript, HTML/CSS, MySQL and Chart.js.

Key areas:
- Employee management
- Attendance
- Payroll calculations
- Search and filtering
- Interactive dashboards
- Chart.js reporting
- Frontend/backend deployment

### 04 — Lightning News
News aggregation platform using Python, Flask, Requests, BeautifulSoup, lxml and Three.js.

Key areas:
- Web scraping
- RSS/XML parsing
- Article metadata extraction
- Data cleaning
- JSON storage
- Search and statistics APIs
- Interactive presentation

### 05 — Budget Tracker
Full-stack productivity and budgeting application rebuilt from a Python toolkit into a Vue 3 + Flask + PostgreSQL application.

Key areas:
- Persistent transactions
- Daily, weekly, monthly and yearly budget cycles
- Budget history
- Task management
- Study planning
- South African local date handling
- PostgreSQL persistence
- Render deployment

Live project: https://budget-tracker-frontend-jf66.onrender.com

## Technology

The portfolio itself uses:

- **Vue 3**
- **Vite**
- **JavaScript**
- **CSS**
- Component-based architecture
- CSS animation and transitions
- Responsive layouts

The portfolio deliberately does **not** use Three.js for its main interface. The physical folder aesthetic is created with CSS, perspective, shadows, gradients, textures, transitions and layered elements.

The projects inside the portfolio demonstrate a much broader technology set:

**Frontend**
- HTML / CSS
- JavaScript
- Vue 3
- Chart.js

**Backend**
- Node.js / Express
- Python
- Flask
- PHP
- REST APIs

**Databases**
- MySQL
- PostgreSQL

**Other**
- PayFast
- Web scraping
- BeautifulSoup
- Requests
- lxml
- Three.js
- Render

## Structure

```text
Portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ProfileFile.vue
│   │   ├── StockwellFile.vue
│   │   ├── ModerntechHRFile.vue
│   │   ├── LightningNewsFile.vue
│   │   ├── BudgetTrackerFile.vue
│   │   ├── SkillsFile.vue
│   │   ├── JourneyFile.vue
│   │   ├── ContactFile.vue
│   │   └── NotesFile.vue
│   ├── data/
│   │   └── portfolio.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

## File System

The current portfolio contains **9 files**:

| File | Section |
|---|---|
| 01 | Profile |
| 02 | StockWell |
| 03 | ModernTechHR |
| 04 | Lightning News |
| 05 | Budget Tracker |
| 06 | Skills |
| 07 | Journey |
| 08 | Contact |
| 09 | Notes |

The project data is centralised in `src/data/portfolio.js`, allowing the file contents, project information, skills map and development journey to be updated without rebuilding the application structure.

## Design System

The interface uses a physical-document palette:

| Element | Colour |
|---|---|
| Walnut desk | `#2b211b` |
| Leather folder | `#231b16` |
| Paper | `#eee6d7` |
| Light paper | `#f5efe0` |
| Inner paper | `#fffdf7` |
| Tan accent | `#d6a66f` |
| Case red | `#a32626` |

Typography combines **Special Elite** for headings/file labels with **JetBrains Mono** for technical and body text.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Customisation

Most portfolio content can be changed from:

```text
src/data/portfolio.js
```

This includes:

- Personal information
- Project descriptions
- Project technology stacks
- Live project URLs
- Skills
- Technology relationships
- Development journey
- Portfolio file ordering

The main visual shell lives in:

```text
src/App.vue
```

Individual case-file pages live in:

```text
src/components/
```

## Development Journey

The portfolio is also a record of the progression from foundational web development into full-stack application development.

The journey currently covers:

- HTML, CSS and JavaScript foundations
- Interactive browser projects
- ModernTechHR
- PHP and backend foundations
- Python web scraping
- Node.js and REST APIs
- Vue and component architecture
- StockWell and payment integration
- Interactive portfolio experiments
- Budget Tracker and PostgreSQL
- Deployment through Render
- Experimentation with motion, 3D and creative interaction

The **Journey** file documents this progression chronologically rather than presenting the projects as isolated finished products.

## Deployment

The application can be built with:

```bash
npm run build
```

The generated `dist/` directory can be deployed to a static hosting provider such as Render, Netlify or Vercel.

## Design Principle

This portfolio is intentionally more than a list of projects.

It is an attempt to turn the development process itself into an interactive experience — combining software development, interface design, storytelling and experimentation.

**CASE 002 — EST. 2026**

**BUTSHA TENGWA**

*Everything belongs inside the file.*
