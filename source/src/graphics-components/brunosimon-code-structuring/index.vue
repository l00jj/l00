<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent, onMounted, onUnmounted } from "vue";
import Experience from "./Experience/Experience";

/**
 * 视图元素
 */
const canvas = ref();
const guiwrap = ref();
const viewraper = ref();

/**
 * 创建视图控制器
 */
let experience: Experience;

onUnmounted(() => {
  experience?.destroy();
});

onMounted(() => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewraperEl: HTMLElement = viewraper.value as HTMLElement;
  experience = new Experience(canvasEl);
  experience.render();
  //view = new View(canvasEl, viewraperEl);
  //view.init();
  //view.addGuiController(guiwrap.value);
  //view.mounted();
  //view.render();
});
</script>

<template>
  <div class="viewraper" ref="viewraper">
    <canvas ref="canvas"></canvas>
    <div guiwrap ref="guiwrap"></div>
  </div>
</template>

<style scoped>
.viewraper {
  position: fixed;
  width: 100vw;
  height: 100vh;
}

canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.container {
  position: relative;
  width: 100vw;
  height: 500vh;
}
</style>
