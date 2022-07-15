<script setup lang="ts">
import { reactive, ref, computed, watch, inject, onMounted, onUnmounted } from "vue";
import View from "./View/index";
/**
 * 视图元素
 */
const canvas = ref<HTMLElement>();
const viewArea = ref<HTMLElement>();
const viewReactArea = ref<HTMLElement>();
const viewControlsArea = ref<HTMLElement>();

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
  const viewControlsAreaEl: HTMLElement = viewControlsArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl, viewControlsAreaEl);
  view.render();
});

onUnmounted(() => {
  view?.destroy();
});
</script>

<template>
  <div class="viewArea" ref="viewArea">
    <div class="viewReactArea" ref="viewReactArea"></div>
    <canvas class="" ref="canvas"></canvas>
    <div class="viewControlsArea" ref="viewControlsArea"></div>
  </div>
</template>

<style scoped>
.viewReactArea {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 0vh;
  margin-top: 0vh;
  background: none;
}
.viewArea {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.viewArea canvas {
  position: relative;
}
.viewArea .viewControlsArea {
  position: absolute;
  width: 100%;
  height: 100%;
}
/*竖屏*/
@media all and (orientation: portrait) {
  .viewArea .viewControlsArea {
    position: absolute;
    width: 50%;
    height: 50%;
  }
}
</style>
