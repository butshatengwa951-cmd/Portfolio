<script setup lang="ts">
defineProps<{ title: string; url: string; number: string }>()
</script>

<template>
  <div class="project-visual live-project-preview" :class="'preview-' + number">
    <div class="preview-chrome">
      <div class="preview-window-controls" aria-hidden="true"><i></i><i></i><i></i></div>
      <span class="preview-site-name">{{ title.toLowerCase() }}</span>
      <span class="preview-live-label"><i></i> LIVE SITE</span>
    </div>
    <div class="preview-viewport">
      <iframe :src="url" :title="title + ' live website preview'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="clipboard-read; clipboard-write"></iframe>
    </div>
    <div class="preview-foot">
      <span>EMBED PREVIEW · OPEN IF BLOCKED</span>
      <a :href="url" target="_blank" rel="noreferrer">OPEN SITE ↗</a>
    </div>
    <span class="preview-edge-number">{{ number }} / LIVE</span>
  </div>
</template>
