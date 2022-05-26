<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import GlitchTextA from "./l00-GlitchText-A.vue";

const vGlitchTextA = ref();
const bgColor = computed(() => vGlitchTextA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <GlitchTextA ref="vGlitchTextA" text="Glitch Text"></GlitchTextA>
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
