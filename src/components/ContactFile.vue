<template>
  <div class="contact-file">
    <div class="doc-header"><span class="file-no">FILE 08 — REQUEST FORM BT-C</span><h2>CONTACT / COLLABORATION REQUEST</h2></div>
    <form class="form-paper" @submit.prevent="submitRequest">
      <div class="form-row"><label>REQUEST TYPE</label><span>COLLABORATION • FREELANCE • FULL-TIME</span></div>
      <div class="form-row"><label>FILE REF</label><span>BT-002 — RESPONSE REQUIRED</span></div>

      <div class="form-row editable">
        <label for="contact-name">YOUR NAME</label>
        <input id="contact-name" v-model.trim="form.name" name="name" placeholder="Type your name..." required />
      </div>

      <div class="form-row editable">
        <label for="contact-email">YOUR EMAIL</label>
        <input id="contact-email" v-model.trim="form.email" name="email" type="email" placeholder="email@company.com" required />
      </div>

      <div class="form-row editable">
        <label for="contact-message">MESSAGE / BRIEF</label>
        <textarea id="contact-message" v-model.trim="form.message" name="message" rows="4" placeholder="What are we building?" required></textarea>
      </div>

      <input type="hidden" name="_subject" value="New portfolio contact request — Butsha Tengwa" />

      <div class="form-actions">
        <button class="submit" type="submit" :disabled="sending || sent">
          {{ sending ? 'SENDING...' : sent ? '✓ REQUEST FILED' : 'SUBMIT REQUEST →' }}
        </button>
        <div class="alt-contacts">
          <a href="https://github.com/butshatengwa951-cmd" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/butsha-tengwa-66378a313/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="mailto:butshatengwa951@gmail.com">Email ↗</a>
        </div>
      </div>

      <div v-if="sent" class="sent-note">Request successfully sent. Expected response: 24h. File will remain open.</div>
      <div v-else-if="errorMessage" class="error-note">{{ errorMessage }}</div>
    </form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

defineProps({ person: Object })

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const sending = ref(false)
const sent = ref(false)
const errorMessage = ref('')

async function submitRequest() {
  if (sending.value || sent.value) return

  sending.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/mgaowjbe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: 'New portfolio contact request — Butsha Tengwa'
      })
    })

    if (!response.ok) {
      let detail = ''
      try {
        const data = await response.json()
        if (data?.errors?.length) {
          detail = data.errors.map((item) => item.message).join(' ')
        }
      } catch {
        // Keep the user-facing message generic if Formspree does not return JSON.
      }
      throw new Error(detail || 'The request could not be sent. Please try again or email me directly.')
    }

    sent.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    errorMessage.value = error instanceof Error
      ? error.message
      : 'The request could not be sent. Please try again or email me directly.'
  } finally {
    sending.value = false
  }
}
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
@media(max-width:700px){
  .doc-header h2{font-size:18px;line-height:1.15;letter-spacing:1px}
  .form-paper{padding:14px}
  .form-row{display:flex;flex-direction:column;align-items:stretch;gap:7px;padding:12px 0}
  .form-row label{min-width:0;font-size:8px}
  .form-row>span{font-size:10px;line-height:1.5;overflow-wrap:anywhere}
  .form-row.editable input,
  .form-row.editable textarea{width:100%;min-width:0;flex:none}
  .form-row.editable textarea{resize:vertical}
  .form-actions{display:flex;flex-direction:column;align-items:stretch;gap:12px}
  .submit{width:100%}
  .alt-contacts{display:flex;flex-wrap:wrap;gap:10px}
  .alt-contacts a{font-size:10px}
}
</style>
