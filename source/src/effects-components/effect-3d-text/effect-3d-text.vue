<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import Text3D from "./l00-Text3D-A.vue";

const vText3D = ref();
const bgColor = computed(() => vText3D?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ background: bgColor }">
    <Text3D ref="vText3D">
      <span style="font-size: 3.5rem"><i style="color: #ff246f">l00</i>web<i style="color: #12b5ff">w</i>elcome</span>
    </Text3D>
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
