<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


import L00View from "./L00View";

/**
 * 视图元素
 */
const canvas = ref();
const guiwrap = ref();
const viewraper = ref();

/**
 * 创建视图控制器
 */
let view: L00View;

onUnmounted(() => {
  view?.unmounted();
});

onMounted(() => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewraperEl: HTMLElement = viewraper.value as HTMLElement;
  view = new L00View(canvasEl, viewraperEl);
  view.init();
  view.mounted();
  view.render();
});
</script>

<template>
  <div class="viewraper" ref="viewraper">
    <canvas ref="canvas"></canvas>
    <div class="guiwrap" ref="guiwrap"></div>
  </div>
  
</template>

<style scoped>
.viewraper {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.guiwrap {
  position: absolute;
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
