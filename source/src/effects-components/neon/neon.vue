<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import NeonButtonA from "./l00-Neon-Button-A.vue";
import NeonTextA from "./l00-Neon-Text-A.vue";

const vNeonButtonA = ref();
const vNeonButtonA_styleBgColor = computed(() => vNeonButtonA?.value?.option?.neonBgColor);

const vNeonTextA = ref();
const vNeonTextA_styleBgColor = computed(() => vNeonTextA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: vNeonButtonA_styleBgColor }">
    <NeonButtonA ref="vNeonButtonA"></NeonButtonA>
  </section>
  <section :style="{ background: vNeonTextA_styleBgColor }">
    <NeonTextA ref="vNeonTextA" text="Happy Weekend"></NeonTextA>
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
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
