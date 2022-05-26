<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import Popup from "./l00-Popup-A.vue";

const vPopup = ref();
const bgColor = computed(() => vPopup?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <Popup ref="vPopup"></Popup>
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
