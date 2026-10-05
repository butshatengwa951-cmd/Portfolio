<template>
  <div class="profile-file">
    <div class="file-header">
      <div class="stamp">FILE 01 — PROFILE</div>
      <h1>WHO IS BUTSHA<br/>TENGWA?</h1>
    </div>

    <div class="profile-grid">
      <div class="left">
        <p class="tagline">{{ portfolio.person.tagline }}</p>

        <div class="photo-clip">
          <div class="clip-photo">
            <img v-if="profilePhoto" :src="profilePhoto" alt="Butsha Tengwa" />
            <span v-else>BT</span>
          </div>
          <div class="clip"></div>
          <span>FILE PHOTO — CLIPPED</span>
        </div>

        <div class="details-list">
          <div class="d-row"><label>NAME</label><span>{{ portfolio.person.name }}</span></div>
          <div class="d-row"><label>FILE NO.</label><span>{{ portfolio.person.fileNo }}</span></div>
          <div class="d-row"><label>ROLE</label><span>{{ portfolio.person.role }}</span></div>
          <div class="d-row"><label>LOCATION</label><span>{{ portfolio.person.location }}</span></div>
          <div class="d-row"><label>SPECIALIZATION</label><span>{{ portfolio.person.specialization }}</span></div>
          <div class="d-row"><label>STATUS</label><span class="status-open">{{ portfolio.person.status }}</span></div>
        </div>

        <p class="bio">{{ portfolio.person.background }}</p>
      </div>

      <div class="right">
        <div class="section">
          <div class="sec-label">CURRENT OBJECTIVE</div>
          <p>Building better things — products with real payment flows, not demo carts.</p>
        </div>

        <div class="section">
          <div class="sec-label">INTERESTS / FOCUS</div>
          <div class="tags"><span v-for="i in portfolio.person.interests" :key="i" class="tag">{{ i }}</span></div>
        </div>

        <div class="section">
          <div class="sec-label">LEARNING LOG</div>
          <div class="tags"><span v-for="l in portfolio.person.learning" :key="l" class="tag muted">{{ l }}</span></div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  portfolio: Object,
  profilePhoto: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>
.file-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap;gap:12px}
.stamp{font-size:9px;letter-spacing:2px;background:#231b16;color:#eee6d7;padding:6px 10px}
.file-header h1{font-family:'Special Elite',cursive;font-size:42px;line-height:.9;letter-spacing:3px;text-align:right}
.profile-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:36px}
@media(max-width:800px){.profile-grid{grid-template-columns:1fr}.file-header h1{text-align:left;font-size:32px}}
.tagline{font-family:'Special Elite',cursive;font-size:20px;line-height:1.3;margin-bottom:22px;color:#2b211b}
.photo-clip{position:relative;display:inline-block;margin-bottom:20px}
.clip-photo{width:120px;height:140px;background:#111;color:#eee6d7;display:flex;align-items:center;justify-content:center;font-family:'Special Elite';font-size:40px;letter-spacing:4px;border:4px solid #fff;box-shadow:0 6px 14px rgba(0,0,0,.2);transform:rotate(-2deg);overflow:hidden}
.clip-photo img{width:100%;height:100%;object-fit:cover;display:block}
.clip{position:absolute;top:-12px;right:-12px;width:28px;height:46px;border:2px solid #888;border-left:none;border-bottom:none;border-radius:0 10px 0 0;transform:rotate(10deg)}
.photo-clip span{font-size:7px;letter-spacing:1px;display:block;margin-top:8px;opacity:.5}
.details-list{border-top:1px solid #e8ddd0;margin-bottom:18px}
.d-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e8ddd0;font-size:11px}
.d-row label{color:#a32626;letter-spacing:1px;font-size:9px}
.d-row span{font-weight:500}
.status-open{color:#a32626}
.bio{font-size:13px;line-height:1.7;opacity:.8;margin-top:12px}
.section{margin-bottom:22px;padding:16px;background:#fff;border:1px solid #e8ddd0;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.sec-label{font-size:9px;letter-spacing:2px;color:#a32626;margin-bottom:10px;font-weight:700}
.section p{font-size:13px;line-height:1.6}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{font-size:10px;padding:5px 8px;background:#f5efe0;border:1px solid #d6c9b8;letter-spacing:.6px}
.tag.muted{opacity:.7}
.cta-box{margin-top:18px;background:#231b16;color:#eee6d7;padding:18px;border:1px solid #231b16}
.cta-label{font-size:8px;letter-spacing:2px;opacity:.5;margin-bottom:10px}
.cta{background:#eee6d7;color:#11100e;border:none;padding:12px 16px;width:100%;font-family:inherit;font-weight:700;letter-spacing:1px;cursor:pointer;transition:.15s}
.cta:hover{background:#fff}
.cta-sub{font-size:9px;opacity:.5;margin-top:8px;letter-spacing:1px}
</style>
