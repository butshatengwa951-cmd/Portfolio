<template>
  <div class="voya-file">
    <div class="doc-header"><span class="file-no">{{ project.file }} — PROTOTYPE</span><h2>{{ project.name }}</h2><div class="meta">{{ project.type }} • {{ project.stack.join(' • ') }}</div></div>

    <div class="preview-label">CONTAINED PREVIEW — ORDER TRACKING — FILE EMBED</div>
    <div class="preview-frame">
      <div class="browser-bar"><div class="dots"><span></span><span></span><span></span></div><div class="url">voyabite.app — real-time</div></div>
      <div class="voya-ui">
        <div class="menu">
          <div v-for="m in project.menu" :key="m.id" class="menu-card" @click="order(m)">
            <div class="m-name">{{ m.name }}</div><div class="m-meta">{{ m.time }} • R{{ m.price }}</div><button class="order-btn">ORDER</button>
          </div>
        </div>
        <div class="tracking" v-if="activeOrder">
          <div class="track-title">ORDER: {{ activeOrder.name }} — TRACKING</div>
          <div class="steps"><div v-for="(s,i) in steps" :key="i" class="step" :class="{done: i<=stepIndex}"><div class="s-dot"></div><span>{{ s }}</span></div></div>
        </div>
      </div>
    </div>

    <p class="desc">{{ project.description }} Hyperlocal, built with Firebase real-time sync. Kitchen sees order instantly.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ project: Object })
const activeOrder = ref(null)
const stepIndex = ref(0)
const steps = ["Order placed","Kitchen confirmed","Cooking","Rider picked up","On the way","Delivered"]
function order(m){
  activeOrder.value=m; stepIndex.value=0
  const iv=setInterval(()=>{ stepIndex.value++; if(stepIndex.value>=steps.length) clearInterval(iv) }, 900)
}
</script>

<style scoped>
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:32px;letter-spacing:3px;margin:4px 0}
.meta{font-size:11px;opacity:.6;margin-bottom:14px}
.preview-label{font-size:8px;letter-spacing:2px;background:#231b16;color:#d6a66f;display:inline-block;padding:5px 8px;margin-bottom:8px}
.preview-frame{background:#111;border:2px solid #111;box-shadow:0 12px 30px rgba(0,0,0,.2);margin-bottom:18px;overflow:hidden}
.browser-bar{display:flex;align-items:center;gap:12px;background:#1e1e1e;color:#888;padding:8px 12px;font-size:10px}
.dots{display:flex;gap:5px}.dots span{width:9px;height:9px;border-radius:50%;display:block}.dots span:nth-child(1){background:#ff5f56}.dots span:nth-child(2){background:#ffbd2e}.dots span:nth-child(3){background:#27c93f}
.url{flex:1;background:#111;padding:4px 8px;border-radius:3px}
.voya-ui{background:#faf6ef;padding:18px;display:grid;grid-template-columns:1fr 220px;gap:18px}
@media(max-width:700px){.voya-ui{grid-template-columns:1fr}}
.menu{display:grid;gap:10px}
.menu-card{background:#fff;border:1px solid #d6c9b8;padding:14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
.m-name{font-weight:700;font-size:13px}.m-meta{font-size:11px;opacity:.6}
.order-btn{background:#111;color:#eee6d7;border:none;padding:6px 10px;font-family:inherit;font-size:10px;cursor:pointer}
.tracking{background:#fff;border:1px solid #d6c9b8;padding:14px}
.track-title{font-size:10px;letter-spacing:1px;margin-bottom:12px;font-weight:700}
.steps{display:flex;flex-direction:column;gap:10px}
.step{display:flex;align-items:center;gap:8px;font-size:11px;opacity:.4}
.step.done{opacity:1}.s-dot{width:8px;height:8px;border-radius:50%;background:#d6c9b8}.step.done .s-dot{background:#a32626}
.desc{font-size:13px;line-height:1.7;opacity:.8}
</style>
