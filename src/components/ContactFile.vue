<template>
  <div class="contact-file">
    <div class="doc-header"><span class="file-no">FILE 07 — REQUEST FORM BT-C</span><h2>CONTACT / COLLABORATION REQUEST</h2></div>
    <div class="form-paper">
      <div class="form-row"><label>REQUEST TYPE</label><span>COLLABORATION • FREELANCE • FULL-TIME</span></div>
      <div class="form-row"><label>FILE REF</label><span>BT-002 — RESPONSE REQUIRED</span></div>
      <div class="form-row editable"><label>YOUR NAME</label><input placeholder="Type your name..." /></div>
      <div class="form-row editable"><label>YOUR EMAIL</label><input placeholder="email@company.com" /></div>
      <div class="form-row editable"><label>MESSAGE / BRIEF</label><textarea rows="4" placeholder="What are we building?"></textarea></div>
      <div class="form-actions">
        <button class="submit" @click="sent=true">{{ sent ? '✓ REQUEST FILED' : 'SUBMIT REQUEST →' }}</button>
        <div class="alt-contacts">
          <a href="https://github.com/butshatengwa951-cmd" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/butsha-tengwa-66378a313/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="mailto:butshatengwa951@gmail.com">Email ↗</a>
        </div>
      </div>
      <div v-if="sent" class="sent-note">Request filed to personal file. Expected response: 24h. File will remain open.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ person: Object })
const sent = ref(false)
</script>

<style scoped>
.file-no{font-size:9px;letter-spacing:2px;color:#a32626}
.doc-header h2{font-family:'Special Elite';font-size:22px;letter-spacing:1.5px;margin-bottom:18px}
.form-paper{background:#fff;border:1px solid #e8ddd0;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.05)}
.form-row{display:flex;gap:16px;padding:12px 0;border-bottom:1px dashed #e8ddd0;font-size:11px;align-items:center}
.form-row label{min-width:140px;color:#a32626;letter-spacing:1px;font-size:9px}
.form-row.editable input, .form-row.editable textarea{flex:1;background:#faf6ef;border:1px solid #d6c9b8;padding:10px 12px;font-family:inherit;font-size:12px}
.form-actions{display:flex;gap:16px;align-items:center;margin-top:18px;flex-wrap:wrap}
.submit{background:#231b16;color:#eee6d7;border:1px solid #231b16;padding:12px 18px;font-family:inherit;font-size:11px;letter-spacing:1px;cursor:pointer}
.submit:hover{background:#111}
.alt-contacts{display:flex;gap:12px}
.alt-contacts a{font-size:11px;color:#a32626;text-decoration:none;border-bottom:1px solid #e8ddd0}
.sent-note{margin-top:14px;background:#f5efe0;border-left:3px solid #a32626;padding:10px 12px;font-size:11px}
</style>
