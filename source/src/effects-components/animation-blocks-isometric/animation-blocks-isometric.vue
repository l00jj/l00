<script setup lang="ts">
import { ref } from "vue";
import BlocksIsometricA from "./l00-BlocksIsometric-A.vue";
</script>

<template>
  <section style="background: #434750">
    <BlocksIsometricA></BlocksIsometricA>
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
