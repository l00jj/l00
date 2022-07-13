<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import View from "./View/index";

//
//const props = defineProps<{}>();

/**
 * 视图元素
 */
const canvas = ref();
const viewArea = ref();

/**
 * 入口
 */
let view: View;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl);
  view.render();
  //
});

onUnmounted(() => {
  view?.destroy();
});
</script>

<template>
  <section ref="viewArea">
    <canvas class="" ref="canvas"></canvas>
  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 100vw;
  display: flex;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

canvas {
  pointer-events: none;
  position: relative;
}
</style>
