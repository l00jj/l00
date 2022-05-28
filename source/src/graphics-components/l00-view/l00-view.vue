<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import L00View from "./L00View";

/**
 * 视图元素
 */
const canvas = ref();
const guiwraper = ref();
const viewraper = ref();

/**
 * 创建视图控制器
 */
let view: L00View;

onUnmounted(() => {
  view?.removeEventListener();
});

onMounted(() => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewraperEl: HTMLElement = viewraper.value as HTMLElement;
  const guiwraperEl: HTMLElement = guiwraper.value as HTMLElement;
  view = new L00View(canvasEl, viewraperEl);
  view.init();
  view.worldController.addGui(guiwraperEl);
  view.addEventListener();
  view.render();
});
</script>

<template>
  <Teleport to="body">
    <div class="guiwraper" ref="guiwraper"></div>
  </Teleport>
  <div class="viewraper" ref="viewraper">
    <canvas ref="canvas"></canvas>
  </div>
  <div class="container"></div>
</template>

<style scoped>
.viewraper {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.guiwraper {
  position: fixed;
  top: 0;
  right: 0;
  width: max-content;
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
