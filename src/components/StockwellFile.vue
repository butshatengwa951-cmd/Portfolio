<template>
  <div class="stock-file">
    <div class="doc-header">
      <div class="left"><span class="file-no">{{ project.file }} — EVIDENCE</span><h2>{{ project.name }}</h2><div class="meta">{{ project.type }} • {{ project.stack.join(' • ') }}</div></div>
      <div class="right"><div class="status-box"><span>STATUS</span><div class="bar"><div class="fill" style="width:100%"></div></div><b>COMPLETE</b></div></div>
    </div>

    <!-- LIVE PREVIEW INSIDE FOLDER — the key concept -->
    <div class="preview-label">CONTAINED PREVIEW — LIVE INTERACTIVE — FILE EMBED</div>
    <div class="preview-frame">
      <div class="browser-bar">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="url">stockwell.market — secure • wallet connected</div>
        <div class="cart-badge">CART ({{ cartCount }})</div>
      </div>
      
      <div class="stock-ui">
        <div class="stock-header">
          <div class="logo">STOCKWELL</div>
          <div class="search">Search community packs...</div>
          <div class="wallet">Wallet: R{{ wallet }}.00</div>
        </div>

        <div class="products">
          <div v-for="p in project.products" :key="p.id" class="product-card">
            <div class="p-tag" v-if="p.tag">{{ p.tag }}</div>
            <div class="p-name">{{ p.name }}</div>
            <div class="p-price">R{{ p.price }}</div>
            <button class="add-btn" @click="addToCart(p)">+ ADD TO CART</button>
          </div>
        </div>

        <div class="cart-preview" v-if="cartCount>0">
          <div class="cart-line">You added {{ cartCount }} item(s) — this interaction happens INSIDE the portfolio folder, no new tab.</div>
          <button class="checkout-btn" @click="checkout">CHECKOUT → PayFast flow → Wallet update</button>
        </div>
      </div>
    </div>

    <div class="doc-tabs">
      <button v-for="t in tabs" :key="t.id" class="dtab" :class="{active: activeTab===t.id}" @click="activeTab=t.id">[ {{ t.label }} ]</button>
    </div>

    <div class="doc-content">
      <p v-if="activeTab==='problem'">{{ project.problem }}</p>
      <p v-if="activeTab==='build'">{{ project.build }}</p>
      <pre v-if="activeTab==='challenge'" class="challenge">{{ project.challenge }}</pre>
      <div v-if="activeTab==='live'" class="live-links">
        <a href="#" class="live-link">→ VIEW LIVE PROJECT (opens externally)</a>
        <a href="#" class="live-link">→ GITHUB — SOURCE</a>
        <div class="note">The preview above is a recreation to demonstrate the concept: real project embedded inside portfolio folder.</div>
      </div>
    </div>

    <div class="flow-mini">
      <span>Customer</span><i>↓</i><span>Checkout</span><i>↓</i><span>PayFast</span><i>↓</i><span>Response</span><i>↓</i><span>Backend</span><i>↓</i><span>Wallet</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ project: Object })
const tabs = [{id:'problem',label:'PROBLEM'},{id:'build',label:'BUILD'},{id:'challenge',label:'CHALLENGE'},{id:'live',label:'LIVE'}]
const activeTab = ref('problem')
const cartCount = ref(0)
const wallet = ref(1250)
function addToCart(){ cartCount.value++ }
function checkout(){ wallet.value+=50; cartCount.value=0; alert('PayFast ITN simulated — wallet updated inside folder preview') }
</script>

<style scoped>
.doc-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid #e8ddd0}
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite',cursive;font-size:32px;letter-spacing:3px;margin:4px 0}
.meta{font-size:11px;opacity:.6}
.status-box{font-size:9px;text-align:right}
.status-box .bar{width:120px;height:4px;background:#e8ddd0;margin:6px 0}
.fill{height:100%;background:#a32626}
.preview-label{font-size:8px;letter-spacing:2px;background:#231b16;color:#d6a66f;display:inline-block;padding:5px 8px;margin-bottom:8px}
.preview-frame{background:#111;border:2px solid #111;box-shadow:0 12px 30px rgba(0,0,0,.2);margin-bottom:20px;overflow:hidden}
.browser-bar{display:flex;align-items:center;gap:12px;background:#1e1e1e;color:#888;padding:8px 12px;font-size:10px}
.dots{display:flex;gap:5px}
.dots span{width:9px;height:9px;border-radius:50%;display:block}
.dots span:nth-child(1){background:#ff5f56}.dots span:nth-child(2){background:#ffbd2e}.dots span:nth-child(3){background:#27c93f}
.url{flex:1;background:#111;padding:4px 8px;border-radius:3px}
.cart-badge{background:#a32626;color:#fff;padding:4px 8px;border-radius:3px;font-weight:700}
.stock-ui{background:#faf6ef;padding:18px}
.stock-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px}
.logo{font-family:'Special Elite';font-size:20px;letter-spacing:2px}
.search{border:1px solid #d6c9b8;background:#fff;padding:8px 12px;font-size:11px;flex:1;max-width:260px}
.wallet{font-size:11px;background:#231b16;color:#eee6d7;padding:8px 12px}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.product-card{position:relative;background:#fff;border:1px solid #d6c9b8;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.p-tag{position:absolute;top:8px;right:8px;background:#a32626;color:#fff;font-size:8px;padding:3px 6px;letter-spacing:1px}
.p-name{font-weight:700;font-size:13px;margin-bottom:6px}
.p-price{font-size:12px;opacity:.7;margin-bottom:12px}
.add-btn{background:#111;color:#eee6d7;border:1px solid #111;padding:8px 10px;font-family:inherit;font-size:10px;cursor:pointer;width:100%;letter-spacing:.8px}
.add-btn:hover{background:#222}
.cart-preview{margin-top:16px;background:#fff;border:1px dashed #a32626;padding:12px}
.cart-line{font-size:11px;margin-bottom:10px}
.checkout-btn{background:#a32626;color:#fff;border:none;padding:10px 14px;font-family:inherit;font-size:11px;cursor:pointer;width:100%;letter-spacing:1px}
.doc-tabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.dtab{background:#f5efe0;border:1px solid #d6c9b8;padding:8px 12px;font-family:inherit;font-size:11px;cursor:pointer}
.dtab.active{background:#231b16;color:#eee6d7;border-color:#231b16}
.doc-content{background:#fffdf7;border:1px solid #e8ddd0;padding:18px;min-height:90px}
.doc-content p{font-size:13px;line-height:1.7}
.challenge{white-space:pre-wrap;font-family:inherit;font-size:12px;line-height:1.7}
.live-links{display:flex;flex-direction:column;gap:10px}
.live-link{color:#a32626;text-decoration:none;border-bottom:1px solid #e8ddd0;font-size:12px;width:fit-content}
.note{font-size:10px;opacity:.5;margin-top:10px}
.flow-mini{margin-top:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:9px;letter-spacing:1px;background:#f5efe0;border:1px solid #e8ddd0;padding:10px}
.flow-mini i{color:#a32626;font-style:normal}
</style>
