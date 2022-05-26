<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import Text3D from "./l00-3DViews-A.vue";
const viewSize = reactive({
  width: 0,
  height: 0,
});

const updateViewSize = () => {
  viewSize.width = window.innerWidth;
  viewSize.height = window.innerHeight;
};

updateViewSize();
window.addEventListener("resize", updateViewSize);

onUnmounted(() => {
  window.removeEventListener("resize", updateViewSize);
});
</script>

<template>
  <div id="main">
    <Text3D :width="viewSize.width" :height="viewSize.height"></Text3D>
  </div>
</template>

<style scoped></style>
