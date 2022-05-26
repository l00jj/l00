<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import BlobFigureLoaderA from "./l00-BlobFigure-Loader-A.vue";

const vBlobFigureLoaderA = ref();
const bgColor = computed(() => vBlobFigureLoaderA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <BlobFigureLoaderA ref="vBlobFigureLoaderA"></BlobFigureLoaderA>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

section > * {
  margin: 3em;
}

.float {
  position: absolute;
}

.float > * {
  transform: translateX(-50%) translateY(-50%);
}
</style>
