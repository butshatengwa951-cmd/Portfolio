<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string; url: string; number: string }>()
const previewLoaded = ref(false)
</script>

<template>
  <div class="project-visual live-project-preview" :class="'preview-' + number">
    <div class="preview-chrome">
      <div class="preview-window-controls" aria-hidden="true"><i></i><i></i><i></i></div>
      <span class="preview-site-name">{{ title.toLowerCase() }}</span>
      <span class="preview-live-label"><i></i> LIVE SITE</span>
    </div>
    <div class="preview-viewport" :class="{ 'preview-is-loaded': previewLoaded }">
      <iframe
        v-if="previewLoaded"
        :src="url"
        :title="title + ' live website preview'"
        loading="eager"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="clipboard-read; clipboard-write"
      ></iframe>
      <div v-else class="preview-placeholder">
        <span class="preview-placeholder-kicker">PROJECT FILE / {{ number }}</span>
        <strong>{{ title }}</strong>
        <p>Load the live application here when you want to explore it.</p>
        <button class="preview-load-button" type="button" @click="previewLoaded = true">
          LOAD LIVE PREVIEW <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
    <div class="preview-foot">
      <span>{{ previewLoaded ? 'LIVE PREVIEW · EXTERNAL SITE' : 'PREVIEW LOADS ON REQUEST' }}</span>
      <a :href="url" target="_blank" rel="noreferrer">OPEN SITE ↗</a>
    </div>
    <span class="preview-edge-number">{{ number }} / LIVE</span>
  </div>
</template>
