<template>
  <div class="notes-file">
    <div class="doc-header"><span class="file-no">FILE 09 — PERSONAL NOTES</span><h2>NOTES / SCRAPS</h2></div>
    <div class="notes-grid">
      <div class="sticky s1"><div class="pin"></div><p>Early JavaScript taught me that getting the happy path working is not enough. I struggled with validation and edge cases. I improved by checking inputs before calculating and testing more than one outcome.</p><span>LESSON — JAVASCRIPT</span></div>

      <div class="typewritten"><p>EXERCISE NOTE: Early JavaScript showed me some real weak spots: my <strong>isPrime</strong> logic was incomplete, some input checks were too loose, and some solutions did not fully follow the brief. I improved by breaking problems into smaller checks, reading the requirements carefully, and testing edge cases instead of only testing one successful example.</p></div>

      <div class="sticky s2"><div class="pin"></div><p>Scope was a real lesson. I learned that a variable can only be used where it is actually available. Now I think about where data lives, who can access it and how information should move between functions.</p><span>LESSON — SCOPE</span></div>

      <div class="scrap"><p>ERROR HANDLING: My early validation and error-handling code worked in places but also exposed mistakes in how I checked arrays, types and exceptions. Projects later forced me to think about invalid input and failure states before they became bugs.</p><div class="tape"></div></div>

      <div class="typewritten"><p>GIT NOTE: Recipe Finder was where Git stopped being just commands and became part of development. Remote history, branch naming, upstream branches and merge conflicts showed me that version control problems need to be understood, not ignored. I became more comfortable reading the error, identifying what Git was asking for and then fixing the workflow.</p></div>

      <div class="sticky s3"><div class="pin"></div><p>DOM + INTERACTION: I moved from simple console exercises into buttons, prompts, event listeners, dynamic cards and timed UI behaviour. That progression helped me understand that JavaScript is not only about calculations — it is about controlling an interface.</p><span>LESSON — FRONTEND</span></div>

      <div class="typewritten"><p>DATABASE NOTE: MySQL started with tables, keys, relationships and queries. The bigger lesson came later with real applications: a database is not just somewhere to store data. It has to connect correctly to backend logic, respect relationships and support the application's workflows.</p></div>

      <div class="sticky s1"><div class="pin"></div><p>MODERNTECHHR: The hardest part was not only building features. It was learning how separate frontend and backend repositories could be developed together, deployed separately and still communicate with a MySQL database in the cloud.</p><span>LESSON — DEPLOYMENT</span></div>

      <div class="typewritten"><p>LIGHTNING NEWS: Web scraping and Three.js were new concepts for our team. We overcame that gap through in-depth research, then applied what we learned with Python, Flask, Requests, BeautifulSoup and lxml. The lesson: when a concept is unfamiliar, research becomes part of the development process.</p></div>

      <div class="sticky s3"><div class="pin"></div><p>BUDGET TRACKER: Rebuilding the original Python toolkit into a deployed Vue + Flask application taught me how frontend, API and database layers have to work together. PostgreSQL persistence, budget-period rollover, timezone handling and Render deployment turned a local tool into a real full-stack product.</p><span>LESSON — FULL-STACK DEPLOYMENT</span></div>

      <div class="sticky s2"><div class="pin"></div><p>STOCKWELL: PayFast was the reminder that integrations can fail even when the request appears successful. Logging the raw request, checking signatures, understanding ITN behaviour and adding transaction protection taught me to debug the full system instead of trusting a 200 response.</p><span>LESSON — PAYMENTS</span></div>
    </div>
  </div>
</template>

<style scoped>
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:28px;letter-spacing:2px;margin-bottom:18px}
.notes-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.sticky{position:relative;background:#f7e6b5;border:1px solid #d6c9b8;padding:18px 16px;box-shadow:0 6px 16px rgba(0,0,0,.12);transform:rotate(var(--r, -1deg));min-height:140px}
.sticky.s1{--r:-1.5deg}.sticky.s2{--r:1.2deg;background:#d6e4f0}.sticky.s3{--r:-0.8deg;background:#e8d6d6}
.sticky .pin{position:absolute;top:-8px;left:50%;width:14px;height:14px;background:#a32626;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.3)}
.sticky p{font-family:'Comic Sans MS','Trebuchet MS',sans-serif;font-size:13px;line-height:1.45}
.sticky span{font-size:8px;opacity:.5;letter-spacing:1px;margin-top:10px;display:block}
.typewritten{background:#fff;border:1px solid #e8ddd0;padding:16px;font-family:'Comic Sans MS','Trebuchet MS',sans-serif;font-size:12px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.scrap{position:relative;background:#fffdf7;border:1px dashed #d6a66f;padding:18px;transform:rotate(.8deg);font-family:'Comic Sans MS','Trebuchet MS',sans-serif;font-size:12px;line-height:1.6}
.tape{position:absolute;top:-10px;left:20px;width:60px;height:18px;background:rgba(214,166,111,.4);transform:rotate(-8deg)}
</style>
