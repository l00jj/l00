<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import GlassmorphismA from "./l00-Loader-Glassmorphism-A.vue";

const vGlassmorphismA = ref();
const bgColor = computed(() => vGlassmorphismA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <GlassmorphismA ref="vGlassmorphismA" text="Glitch Text"></GlassmorphismA>
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
</style>
