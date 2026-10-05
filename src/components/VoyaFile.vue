<template>
  <div class="voya-file">
    <div class="doc-header">
      <div>
        <span class="file-no">{{ project.file }} — PROTOTYPE</span>
        <h2>{{ project.name }}</h2>
        <div class="meta">{{ project.type }} • {{ project.stack.join(' • ') }}</div>
      </div>
    </div>
    <div class="preview-heading">
      <div class="preview-label">CONTAINED PREVIEW — LIVE SITE — FILE EMBED</div>
      <a v-if="project.liveUrl" class="full-project" :href="project.liveUrl" target="_blank" rel="noopener noreferrer">OPEN FULL PROJECT ↗</a>
      <span v-else class="full-project disabled">LIVE URL NOT CONFIGURED</span>
    </div>
    <div v-if="project.liveUrl" class="preview-frame">
      <div class="browser-bar">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="url">{{ displayUrl }}</div>
        <div class="live-badge">LIVE</div>
      </div>
      <div class="iframe-shell">
        <iframe :title="project.name + ' live project preview'" :src="project.liveUrl" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <div class="preview-loading">LIVE PREVIEW</div>
      </div>
    </div>
    <div v-else class="missing-live">
      <strong>LIVE PREVIEW NOT CONFIGURED YET</strong>
      <p>Add the deployed Voya Bite URL as <code>liveUrl</code> in <code>src/data/portfolio.js</code>.</p>
    </div>
    <p class="desc">{{ project.description }}</p>
    <div v-if="project.liveUrl" class="preview-actions">
      <a :href="project.liveUrl" target="_blank" rel="noopener noreferrer">→ OPEN FULL VOYA BITE PROJECT</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ project: { type: Object, required: true } })
const displayUrl = computed(() => {
  if (!props.project.liveUrl) return ''
  try { return new URL(props.project.liveUrl).host } catch { return props.project.liveUrl }
})
</script>

<style scoped>
.doc-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:16px}
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:32px;letter-spacing:3px;margin:4px 0}
.meta{font-size:11px;opacity:.6}
.preview-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.preview-label{font-size:8px;letter-spacing:2px;background:#231b16;color:#d6a66f;display:inline-block;padding:5px 8px}
.full-project{color:#a32626;text-decoration:none;border:1px solid #a32626;background:#fffdf7;padding:6px 10px;font-size:9px;letter-spacing:1.2px;transition:.15s ease}
.full-project:hover{background:#a32626;color:#fff}
.full-project.disabled{opacity:.5;cursor:not-allowed}
.preview-frame{background:#111;border:2px solid #111;box-shadow:0 12px 30px rgba(0,0,0,.2);margin-bottom:18px;overflow:hidden}
.browser-bar{display:flex;align-items:center;gap:12px;background:#1e1e1e;color:#888;padding:8px 12px;font-size:10px}
.dots{display:flex;gap:5px}.dots span{width:9px;height:9px;border-radius:50%;display:block}
.dots span:nth-child(1){background:#ff5f56}.dots span:nth-child(2){background:#ffbd2e}.dots span:nth-child(3){background:#27c93f}
.url{flex:1;background:#111;padding:4px 8px;border-radius:3px}
.live-badge{background:#a32626;color:#fff;padding:4px 8px;border-radius:3px;font-weight:700}
.iframe-shell{position:relative;width:100%;height:560px;background:#fff}
.iframe-shell iframe{display:block;width:100%;height:100%;border:0;background:#fff}
.preview-loading{position:absolute;left:12px;bottom:12px;padding:5px 8px;background:rgba(17,17,17,.88);color:#d6a66f;font-size:8px;letter-spacing:1.5px;pointer-events:none}
.missing-live{padding:22px;margin-bottom:18px;border:1px dashed #d6a66f;background:#f5efe0}
.missing-live strong{font-size:10px;letter-spacing:1.5px;color:#a32626}
.missing-live p{margin:9px 0 0;font-size:11px;line-height:1.7;opacity:.7}
.missing-live code{font-family:inherit}
.desc{font-size:13px;line-height:1.7;opacity:.8}
.preview-actions{margin-top:14px}
.preview-actions a{display:inline-block;color:#a32626;text-decoration:none;border:1px solid #a32626;padding:8px 10px;font-size:10px;letter-spacing:1px}
.preview-actions a:hover{background:#a32626;color:#fff}
@media(max-width:700px){.iframe-shell{height:460px}.doc-header h2{font-size:25px;letter-spacing:2px}}
</style>