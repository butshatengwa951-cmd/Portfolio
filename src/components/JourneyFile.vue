<template>
  <div class="journey-file">
    <div class="doc-header"><span class="file-no">FILE 07 — DEVELOPMENT LOG</span><h2>JOURNEY</h2></div>
    <div class="timeline">
      <div v-for="(j,i) in journey" :key="i" class="entry">
        <div class="year">{{ j.year }}</div>
        <div class="line"><div class="dot"></div><div class="vline"></div></div>
        <div class="content"><div class="title">{{ j.title }}</div><div class="note">{{ j.note }}</div><div class="handwritten" v-if="i===1">← webhook hell, never again</div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ journey: Array })
</script>

<style scoped>
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:28px;letter-spacing:2px;margin-bottom:18px}
.timeline{position:relative}
.entry{display:grid;grid-template-columns:70px 30px 1fr;gap:14px;margin-bottom:26px}
.year{font-family:'Special Elite';font-size:18px;color:#a32626;transform:rotate(-2deg)}
.line{display:flex;flex-direction:column;align-items:center}
.dot{width:10px;height:10px;background:#231b16;border-radius:50%;border:2px solid #a32626}
.vline{flex:1;width:1px;background:#d6c9b8;margin-top:6px}
.content{background:#fff;border:1px solid #e8ddd0;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.title{font-weight:700;font-size:13px;margin-bottom:6px}
.note{font-size:12px;line-height:1.6;opacity:.8}
.handwritten{font-family:'Special Elite';font-size:11px;color:#a32626;margin-top:8px;transform:rotate(-1deg)}
</style>
