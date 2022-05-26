<script setup lang="ts">
import { reactive } from "vue";
import SmoothLodingA from "./l00-SmoothLoding-A.vue";
import SmoothLodingB from "./l00-SmoothLoding-B.vue";
</script>

<template>
  <section style="background: linear-gradient(45deg, #006bc6, #1ecafc)">
    <SmoothLodingB>l00</SmoothLodingB>
  </section>
  <section style="background: #0ca0cc">
    <SmoothLodingA></SmoothLodingA>
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
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
