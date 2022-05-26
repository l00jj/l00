<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import MagicMenuA from "./l00-Magic-Menu-A.vue";
import SpreadMenuA from "./l00-Spread-Menu-A.vue";

const vMagicMenuA = ref();
const vMagicMenuA_styleBgColor = computed(() => vMagicMenuA?.value?.option?.bgColor);

const vSpreadMenuA = ref();
const vSpreadMenuA_styleBgColor = computed(() => vSpreadMenuA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: vMagicMenuA_styleBgColor }">
    <MagicMenuA ref="vMagicMenuA"></MagicMenuA>
  </section>
  <section :style="{ background: vSpreadMenuA_styleBgColor }">
    <SpreadMenuA ref="vSpreadMenuA"></SpreadMenuA>
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
