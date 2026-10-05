<template>
  <div class="project-file">
    <div class="doc-header">
      <div class="left">
        <span class="file-no">{{ project.file }} — EVIDENCE</span>
        <h2>{{ project.name }}</h2>
        <div class="meta">{{ project.type }}<span v-if="project.stack?.length"> • {{ project.stack.join(' • ') }}</span></div>
      </div>
      <div class="right">
        <div class="status-box">
          <span>STATUS</span>
          <div class="bar"><div class="fill"></div></div>
          <b>COMPLETE</b>
        </div>
      </div>
    </div>

    <div class="preview-heading">
      <div class="preview-label">CONTAINED PREVIEW — LIVE SITE — FILE EMBED</div>
      <a class="full-project" href="https://module1-project-hr.onrender.com/" target="_blank" rel="noopener noreferrer">OPEN FULL PROJECT ↗</a>
    </div>

    <div class="preview-frame">
      <div class="browser-bar">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="url">module1-project-hr.onrender.com</div>
        <div class="live-badge">LIVE</div>
      </div>
      <div class="iframe-shell">
        <iframe title="MODERNTECHHR live project preview" src="https://module1-project-hr.onrender.com/" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <div class="preview-loading">LIVE PREVIEW</div>
      </div>
    </div>

    <div class="doc-tabs">
      <button v-for="tab in tabs" :key="tab.id" type="button" class="dtab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">[ {{ tab.label }} ]</button>
    </div>

    <div class="doc-content">
      <p v-if="activeTab === 'problem'">{{ project.problem }}</p>
      <p v-else-if="activeTab === 'build'">{{ project.build }}</p>
      <pre v-else-if="activeTab === 'challenge'" class="challenge">{{ project.challenge }}</pre>
      <p v-else class="project-description">{{ project.description }}</p>
    </div>

    <div class="flow-mini">
        <span>Employee</span><i>↓</i><span>Records</span><i>↓</i><span>Payroll</span><i>↓</i><span>Calculations</span><i>↓</i><span>Charts</span>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const tabs = [
  { id: 'problem', label: 'PROBLEM' },
  { id: 'build', label: 'BUILD' },
  { id: 'challenge', label: 'CHALLENGE' },
  { id: 'description', label: 'DESCRIPTION' }
]

const activeTab = ref('problem')
</script>

<style scoped>
.doc-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #e8ddd0}
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite',cursive;font-size:32px;letter-spacing:3px;margin:4px 0}
.meta{font-size:11px;opacity:.6}
.status-box{font-size:9px;text-align:right}
.status-box .bar{width:120px;height:4px;background:#e8ddd0;margin:6px 0}
.status-box .fill{height:100%;width:100%;background:#a32626}
.preview-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.preview-label{font-size:8px;letter-spacing:2px;background:#231b16;color:#d6a66f;display:inline-block;padding:5px 8px}
.full-project{color:#a32626;text-decoration:none;border:1px solid #a32626;background:#fffdf7;padding:6px 10px;font-size:9px;letter-spacing:1.2px;transition:.15s ease}
.full-project:hover{background:#a32626;color:#fff}
.preview-frame{background:#111;border:2px solid #111;box-shadow:0 12px 30px rgba(0,0,0,.2);margin-bottom:20px;overflow:hidden}
.browser-bar{display:flex;align-items:center;gap:12px;background:#1e1e1e;color:#888;padding:8px 12px;font-size:10px}
.dots{display:flex;gap:5px}.dots span{width:9px;height:9px;border-radius:50%;display:block}
.dots span:nth-child(1){background:#ff5f56}.dots span:nth-child(2){background:#ffbd2e}.dots span:nth-child(3){background:#27c93f}
.url{flex:1;background:#111;padding:4px 8px;border-radius:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.live-badge{background:#a32626;color:#fff;padding:4px 8px;border-radius:3px;font-weight:700}
.iframe-shell{position:relative;height:560px;background:#fff}
.iframe-shell iframe{display:block;width:100%;height:100%;border:0;background:#fff}
.preview-loading{position:absolute;left:12px;bottom:12px;padding:5px 8px;background:rgba(17,17,17,.88);color:#d6a66f;font-size:8px;letter-spacing:1.5px;pointer-events:none}
.doc-tabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.dtab{background:#f5efe0;border:1px solid #d6c9b8;padding:8px 12px;font-family:inherit;font-size:11px;cursor:pointer}
.dtab.active{background:#231b16;color:#eee6d7;border-color:#231b16}
.doc-content{background:#fffdf7;border:1px solid #e8ddd0;padding:18px;min-height:90px}
.doc-content p{font-size:13px;line-height:1.7;margin:0}
.challenge{white-space:pre-wrap;font-family:inherit;font-size:12px;line-height:1.7;margin:0}
.project-description{margin:0}
.flow-mini{margin-top:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:9px;letter-spacing:1px;background:#f5efe0;border:1px solid #e8ddd0;padding:10px}
.flow-mini i{color:#a32626;font-style:normal}
@media(max-width:700px){.iframe-shell{height:460px}.doc-header h2{font-size:25px;letter-spacing:2px}}
</style>
