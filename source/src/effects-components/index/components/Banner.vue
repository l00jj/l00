<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Text3D from "@src/effects-components/effect-3d-text/l00-Text3D-A.vue";

const vText3D = ref();
const bgColor = computed(() => vText3D?.value?.option?.bgColor);
</script>

<template>
  <section :style="{ 'background-color': bgColor }">
    <Text3D ref="vText3D" :perspective="[100, 300]">
      <span style="font-size: 3.5rem"><i style="color: #ff246f">l00</i>web<i style="color: #12b5ff">w</i>elcome</span>
    </Text3D>
  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@src/assets/logo/logo-backgroundMap-lightGray.png");
  opacity: 0.15;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
