<template>
  <div class="notes-file">
    <div class="doc-header"><span class="file-no">FILE 07 — PERSONAL NOTES</span><h2>NOTES / SCRAPS</h2></div>
    <div class="notes-grid">
      <div class="sticky s1"><div class="pin"></div><p>Don't make portfolio that looks like detective board. Make portfolio itself a mystery. — The best advice I got.</p><span>BT</span></div>
      <div class="typewritten"><p>CASE NOTE: The folder is the website's container. Everything else happens inside it. That one rule makes it cohesive.</p></div>
      <div class="sticky s2"><div class="pin"></div><p>PayFast will break. Log raw body first. Always.</p><span>Lesson #07</span></div>
      <div class="scrap"><p>TODO: Build better things. Ship fast. Fix in prod (kinda).</p><div class="tape"></div></div>
      <div class="typewritten"><p>Personal file concept = professional website + personal physical object + interactive navigation. Not a gimmick if the structure is real.</p></div>
      <div class="sticky s3"><div class="pin"></div><p>Photo matters. Keep face part of identity without taking over every page.</p><span>BT-001</span></div>
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
.sticky p{font-family:'Special Elite';font-size:13px;line-height:1.4}
.sticky span{font-size:8px;opacity:.5;letter-spacing:1px;margin-top:10px;display:block}
.typewritten{background:#fff;border:1px solid #e8ddd0;padding:16px;font-size:12px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.scrap{position:relative;background:#fffdf7;border:1px dashed #d6a66f;padding:18px;transform:rotate(.8deg)}
.tape{position:absolute;top:-10px;left:20px;width:60px;height:18px;background:rgba(214,166,111,.4);transform:rotate(-8deg)}
</style>
