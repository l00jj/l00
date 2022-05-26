<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import NeumorphismBaseA from "./l00-Neumorphism-Base-A.vue";

const vNeumorphismBaseA = ref();
const bgColor = computed(() => vNeumorphismBaseA?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <NeumorphismBaseA ref="vNeumorphismBaseA"></NeumorphismBaseA>
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
